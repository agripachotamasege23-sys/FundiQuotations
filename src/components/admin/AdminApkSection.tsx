import React, { useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
  writeBatch
} from 'firebase/firestore';
import {
  deleteObject,
  getBlob,
  getDownloadURL,
  ref,
  uploadBytesResumable
} from 'firebase/storage';
import {
  AlertCircle,
  Archive,
  CheckCircle2,
  FileArchive,
  Link2,
  Rocket,
  ShieldCheck,
  Trash2,
  Upload
} from 'lucide-react';
import { db, handleFirestoreError, OperationType, storage } from '../../lib/firebase';
import {
  computeSha256Hex,
  formatFileSize,
  isSafePublicUrl,
  normalizeApkDownloadUrl,
  validateApkFile
} from '../../lib/apkUtils';
import { AppVersion } from '../../types/portal';

function parseDisplaySizeToBytes(display: string): number {
  const match = display.trim().match(/^(\d+(?:\.\d+)?)\s*(B|KB|MB|GB)$/i);
  if (!match) return 0;
  const num = parseFloat(match[1]);
  const unit = match[2].toUpperCase();
  const mult =
    unit === 'GB'
      ? 1024 * 1024 * 1024
      : unit === 'MB'
        ? 1024 * 1024
        : unit === 'KB'
          ? 1024
          : 1;
  return Math.round(num * mult);
}

interface AdminApkSectionProps {
  mode: 'upload' | 'versions';
  versions: AppVersion[];
  adminUid: string;
  onRefresh: () => Promise<void>;
}

export function AdminApkSection({
  mode,
  versions,
  adminUid,
  onRefresh
}: AdminApkSectionProps) {
  const [sourceMode, setSourceMode] = useState<'external' | 'storage'>('external');
  const [externalUrl, setExternalUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [appName, setAppName] = useState('FundiQuotations');
  const [versionName, setVersionName] = useState('');
  const [versionCode, setVersionCode] = useState('1');
  const [releaseDate, setReleaseDate] = useState(new Date().toISOString().slice(0, 10));
  const [minAndroidVersion, setMinAndroidVersion] = useState('Android 8.0+');
  const [descriptionEn, setDescriptionEn] = useState(
    'Official FundiQuotations Customer Android application for offline quotations, invoicing, materials tracking, and PDF sharing.'
  );
  const [descriptionSw, setDescriptionSw] = useState(
    'Programu rasmi ya wateja ya FundiQuotations kwa ajili ya nukuu za bei, ankara, vifaa, na kutuma PDF hata bila intaneti.'
  );
  const [releaseNotesEn, setReleaseNotesEn] = useState('');
  const [releaseNotesSw, setReleaseNotesSw] = useState('');
  const [sha256Checksum, setSha256Checksum] = useState('');
  const [fileSizeBytes, setFileSizeBytes] = useState(0);
  const [fileSizeDisplay, setFileSizeDisplay] = useState('');
  const [publishImmediately, setPublishImmediately] = useState(true);

  const [computingHash, setComputingHash] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [submittingExternal, setSubmittingExternal] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormError(null);
    setFormSuccess(null);
    const file = e.target.files?.[0];
    if (!file) {
      setSelectedFile(null);
      return;
    }

    const validation = await validateApkFile(file);
    if (!validation.valid) {
      setSelectedFile(null);
      setFormError(validation.error || 'Invalid APK file.');
      return;
    }

    setSelectedFile(file);
    setFileSizeBytes(file.size);
    setFileSizeDisplay(formatFileSize(file.size));

    setComputingHash(true);
    try {
      const hash = await computeSha256Hex(file);
      setSha256Checksum(hash);
    } catch {
      setFormError('Could not calculate SHA-256 checksum for this file.');
    } finally {
      setComputingHash(false);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    if (sourceMode === 'storage' && !selectedFile) {
      setFormError('Please select a valid Customer .apk file first.');
      return;
    }

    const normalizedExternalUrl =
      sourceMode === 'external' ? normalizeApkDownloadUrl(externalUrl) : '';

    if (sourceMode === 'external') {
      if (!isSafePublicUrl(normalizedExternalUrl) || !normalizedExternalUrl.startsWith('https://')) {
        setFormError(
          'Please enter a valid HTTPS download link (e.g., from GitHub Releases or Google Drive).'
        );
        return;
      }
      if (normalizedExternalUrl.toLowerCase().includes('admin')) {
        setFormError('Links referencing an Admin APK are blocked. Only Customer APKs are permitted.');
        return;
      }
    }

    if (!versionName.trim() || Number(versionCode) < 1) {
      setFormError('Version name and a positive integer version code are required.');
      return;
    }

    const resolvedSizeBytes =
      fileSizeBytes > 0 ? fileSizeBytes : parseDisplaySizeToBytes(fileSizeDisplay);
    if (resolvedSizeBytes <= 0 || !fileSizeDisplay.trim()) {
      setFormError(
        'Select your local .apk file (no upload needed) or enter File Size like "24.5 MB".'
      );
      return;
    }

    if (!/^[a-fA-F0-9]{64}$/.test(sha256Checksum.trim())) {
      setFormError(
        'A valid 64-character SHA-256 checksum is required. Select your .apk file above to calculate it automatically.'
      );
      return;
    }
    if (releaseNotesEn.trim().length < 2 || releaseNotesSw.trim().length < 2) {
      setFormError('Please provide release notes in both English and Kiswahili.');
      return;
    }

    if (sourceMode === 'external') {
      setSubmittingExternal(true);
      try {
        if (publishImmediately) {
          const batch = writeBatch(db);
          versions
            .filter((v) => v.isLatest)
            .forEach((v) => {
              batch.update(doc(db, 'appVersions', v.id), {
                isLatest: false,
                updatedAt: serverTimestamp()
              });
            });
          await batch.commit();
        }

        const storagePath = `external/direct-link/v${versionName.trim().replace(/[^a-zA-Z0-9._-]/g, '_')}`;
        await addDoc(collection(db, 'appVersions'), {
          appName: appName.trim(),
          versionName: versionName.trim(),
          versionCode: Math.floor(Number(versionCode)),
          apkChannel: 'customer',
          status: publishImmediately ? 'published' : 'draft',
          isLatest: publishImmediately,
          fileSizeBytes: resolvedSizeBytes,
          fileSizeDisplay: fileSizeDisplay.trim(),
          releaseDate: releaseDate.trim(),
          minAndroidVersion: minAndroidVersion.trim(),
          descriptionEn: descriptionEn.trim(),
          descriptionSw: descriptionSw.trim(),
          releaseNotesEn: releaseNotesEn.trim(),
          releaseNotesSw: releaseNotesSw.trim(),
          sha256Checksum: sha256Checksum.trim().toLowerCase(),
          apkStoragePath: storagePath,
          apkDownloadUrl: normalizedExternalUrl,
          createdBy: adminUid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });

        setExternalUrl('');
        setSelectedFile(null);
        setVersionName('');
        setReleaseNotesEn('');
        setReleaseNotesSw('');
        setSha256Checksum('');
        setFileSizeBytes(0);
        setFileSizeDisplay('');
        setFormSuccess(
          publishImmediately
            ? 'Customer APK link saved to Firestore and published live on the Download page!'
            : 'Customer APK link saved privately as a Draft. Publish it from Version Management when ready.'
        );
        await onRefresh();
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, 'appVersions');
      } finally {
        setSubmittingExternal(false);
      }
      return;
    }

    // Firebase Storage Upload mode (requires Blaze plan enabled in Firebase Console)
    const fileToUpload = selectedFile!;
    const versionSlug = `v${versionName.trim().replace(/[^a-zA-Z0-9._-]/g, '_')}-${Date.now()}`;
    const safeFilename = fileToUpload.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const storagePath = publishImmediately
      ? `apk/customer/${versionSlug}/${safeFilename}`
      : `apk/drafts/${versionSlug}/${safeFilename}`;

    try {
      const storageRef = ref(storage, storagePath);
      const uploadTask = uploadBytesResumable(storageRef, fileToUpload, {
        contentType: 'application/vnd.android.package-archive',
        customMetadata: {
          apkChannel: 'customer',
          versionName: versionName.trim(),
          sha256: sha256Checksum.trim()
        }
      });

      const downloadUrl = await new Promise<string>((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setUploadProgress(pct);
          },
          (err) => reject(err),
          async () => {
            try {
              const url = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(url);
            } catch (urlErr) {
              reject(urlErr);
            }
          }
        );
      });

      if (publishImmediately) {
        const batch = writeBatch(db);
        versions
          .filter((v) => v.isLatest)
          .forEach((v) => {
            batch.update(doc(db, 'appVersions', v.id), {
              isLatest: false,
              updatedAt: serverTimestamp()
            });
          });
        await batch.commit();
      }

      await addDoc(collection(db, 'appVersions'), {
        appName: appName.trim(),
        versionName: versionName.trim(),
        versionCode: Math.floor(Number(versionCode)),
        apkChannel: 'customer',
        status: publishImmediately ? 'published' : 'draft',
        isLatest: publishImmediately,
        fileSizeBytes: resolvedSizeBytes,
        fileSizeDisplay: fileSizeDisplay.trim(),
        releaseDate: releaseDate.trim(),
        minAndroidVersion: minAndroidVersion.trim(),
        descriptionEn: descriptionEn.trim(),
        descriptionSw: descriptionSw.trim(),
        releaseNotesEn: releaseNotesEn.trim(),
        releaseNotesSw: releaseNotesSw.trim(),
        sha256Checksum: sha256Checksum.trim().toLowerCase(),
        apkStoragePath: storagePath,
        apkDownloadUrl: downloadUrl,
        createdBy: adminUid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      setSelectedFile(null);
      setVersionName('');
      setReleaseNotesEn('');
      setReleaseNotesSw('');
      setSha256Checksum('');
      setFileSizeBytes(0);
      setFileSizeDisplay('');
      setUploadProgress(null);
      setFormSuccess(
        publishImmediately
          ? 'Customer APK uploaded and published live on the Download page.'
          : 'Customer APK uploaded privately as a Draft. Publish it from Version Management when ready.'
      );
      await onRefresh();
    } catch (err) {
      setUploadProgress(null);
      const msg =
        err instanceof Error
          ? err.message
          : 'Upload failed. Ensure Firebase Storage is enabled in Firebase Console, or switch to the free External HTTPS Link option.';
      setFormError(msg);
    }
  };

  const handlePublishVersion = async (ver: AppVersion) => {
    setBusyId(ver.id);
    setFormError(null);
    setFormSuccess(null);
    try {
      let nextStoragePath = ver.apkStoragePath;
      let nextDownloadUrl = ver.apkDownloadUrl;

      // Move private draft APK to public customer path if stored under apk/drafts/
      if (ver.apkStoragePath.startsWith('apk/drafts/')) {
        const draftRef = ref(storage, ver.apkStoragePath);
        const blob = await getBlob(draftRef);
        const fileName = ver.apkStoragePath.split('/').pop() || `FundiQuotations-v${ver.versionName}.apk`;
        const publicPath = `apk/customer/${ver.id}/${fileName}`;
        const publicRef = ref(storage, publicPath);
        await uploadBytesResumable(publicRef, blob, {
          contentType: 'application/vnd.android.package-archive'
        });
        nextDownloadUrl = await getDownloadURL(publicRef);
        nextStoragePath = publicPath;
        await deleteObject(draftRef).catch(() => null);
      }

      const batch = writeBatch(db);
      versions
        .filter((item) => item.id !== ver.id && item.isLatest)
        .forEach((item) => {
          batch.update(doc(db, 'appVersions', item.id), {
            isLatest: false,
            updatedAt: serverTimestamp()
          });
        });

      batch.update(doc(db, 'appVersions', ver.id), {
        status: 'published',
        isLatest: true,
        apkStoragePath: nextStoragePath,
        apkDownloadUrl: nextDownloadUrl,
        updatedAt: serverTimestamp()
      });

      await batch.commit();
      setFormSuccess(`Version v${ver.versionName} is now the active published Customer APK.`);
      await onRefresh();
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `appVersions/${ver.id}`);
    } finally {
      setBusyId(null);
    }
  };

  const handleArchiveVersion = async (ver: AppVersion) => {
    setBusyId(ver.id);
    setFormError(null);
    try {
      await updateDoc(doc(db, 'appVersions', ver.id), {
        status: 'archived',
        isLatest: false,
        updatedAt: serverTimestamp()
      });
      await onRefresh();
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `appVersions/${ver.id}`);
    } finally {
      setBusyId(null);
    }
  };

  const handleDeleteVersion = async (ver: AppVersion) => {
    setBusyId(ver.id);
    setFormError(null);
    try {
      if (ver.apkStoragePath && !ver.apkStoragePath.startsWith('external/')) {
        await deleteObject(ref(storage, ver.apkStoragePath)).catch(() => null);
      }
      await deleteDoc(doc(db, 'appVersions', ver.id));
      await onRefresh();
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `appVersions/${ver.id}`);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-6">
      {formError && (
        <div
          role="alert"
          className="p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-800 flex items-start gap-2.5"
        >
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <span>{formError}</span>
        </div>
      )}

      {formSuccess && (
        <div
          role="status"
          className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-900 flex items-start gap-2.5"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <span>{formSuccess}</span>
        </div>
      )}

      {mode === 'upload' && (
        <form
          onSubmit={(e) => void handleUploadSubmit(e)}
          className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
            <div>
              <h2 className="font-display text-lg font-bold text-[#0B1F3A]">
                Publish Customer APK Release
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Use a 100% free External HTTPS Link (GitHub Releases / Google Drive) without Firebase Storage billing, or upload directly to Firebase Storage.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B1F3A] shrink-0">
              <ShieldCheck className="w-4 h-4 text-[#D99B16]" />
              <span>Channel: Customer APK Only</span>
            </div>
          </div>

          {/* Hosting Mode Switcher */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setSourceMode('external');
                setFormError(null);
              }}
              className={`p-4 rounded-xl border text-left transition-colors ${
                sourceMode === 'external'
                  ? 'border-[#0B1F3A] bg-[#0B1F3A]/5'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2 text-sm font-bold text-[#0B1F3A]">
                <Link2 className="w-4 h-4 text-[#D99B16]" />
                <span>Free APK Link (GitHub Releases / Drive)</span>
              </div>
              <p className="mt-1 text-xs text-slate-600">
                100% free (no credit card). Host your .apk on GitHub Releases or Google Drive and save the link in Firestore.
              </p>
            </button>

            <button
              type="button"
              onClick={() => {
                setSourceMode('storage');
                setFormError(null);
              }}
              className={`p-4 rounded-xl border text-left transition-colors ${
                sourceMode === 'storage'
                  ? 'border-[#0B1F3A] bg-[#0B1F3A]/5'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2 text-sm font-bold text-[#0B1F3A]">
                <Upload className="w-4 h-4 text-slate-500" />
                <span>Firebase Storage Upload (Blaze Plan)</span>
              </div>
              <p className="mt-1 text-xs text-slate-600">
                Direct upload to Firebase Storage bucket (only if Blaze billing is enabled in Firebase Console).
              </p>
            </button>
          </div>

          {sourceMode === 'external' && (
            <div>
              <label
                htmlFor="apk-external-url"
                className="block text-sm font-semibold text-[#0B1F3A] mb-1.5"
              >
                Direct Customer APK HTTPS Link *
              </label>
              <input
                id="apk-external-url"
                type="url"
                required
                value={externalUrl}
                onChange={(e) => setExternalUrl(e.target.value)}
                placeholder="https://github.com/username/fundiquotations-releases/releases/download/v1.0.0/FundiQuotations.apk"
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm font-mono"
              />
              <p className="mt-1.5 text-xs text-slate-500">
                GitHub Releases URLs download directly in one tap. Google Drive / Dropbox share links are automatically converted to direct download links.
              </p>
            </div>
          )}

          {/* Local File Selector (for upload OR automatic local SHA-256 + size detection) */}
          <div>
            <label
              htmlFor="apk-file-input"
              className="block text-sm font-semibold text-[#0B1F3A] mb-2"
            >
              {sourceMode === 'external'
                ? 'Select Local .apk File to Auto-Fill Size & SHA-256 (Not Uploaded — 100% Local)'
                : 'Android Customer APK File (.apk, max 150 MB)'}
            </label>
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 bg-[#F4F6F9] text-center">
              <FileArchive className="w-8 h-8 text-[#0B1F3A] mx-auto mb-2" />
              <input
                id="apk-file-input"
                type="file"
                accept=".apk,application/vnd.android.package-archive"
                onChange={(e) => void handleFileChange(e)}
                className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#0B1F3A] file:text-white hover:file:bg-[#163A66] cursor-pointer"
              />
              {selectedFile && (
                <p className="mt-3 font-mono text-xs text-[#0B1F3A]">
                  Verified locally: {selectedFile.name} · {fileSizeDisplay}
                </p>
              )}
              {computingHash && (
                <p className="mt-2 text-xs text-[#9A6B06] font-medium">
                  Calculating SHA-256 checksum...
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                App Name
              </label>
              <input
                type="text"
                required
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Version Number (e.g. 2.4.0)
              </label>
              <input
                type="text"
                required
                value={versionName}
                onChange={(e) => setVersionName(e.target.value)}
                placeholder="2.4.0"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Version Code (Integer)
              </label>
              <input
                type="number"
                min={1}
                required
                value={versionCode}
                onChange={(e) => setVersionCode(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono tabular-nums"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Release Date
              </label>
              <input
                type="date"
                required
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                File Size Display
              </label>
              <input
                type="text"
                required
                value={fileSizeDisplay}
                onChange={(e) => setFileSizeDisplay(e.target.value)}
                placeholder="Auto-filled on APK selection"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Minimum Android Version
              </label>
              <input
                type="text"
                required
                value={minAndroidVersion}
                onChange={(e) => setMinAndroidVersion(e.target.value)}
                placeholder="Android 8.0+"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                SHA-256 Checksum (64 hex chars)
              </label>
              <input
                type="text"
                required
                pattern="[a-fA-F0-9]{64}"
                value={sha256Checksum}
                onChange={(e) => setSha256Checksum(e.target.value)}
                placeholder="Auto-calculated from APK"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                APK Description (English)
              </label>
              <textarea
                rows={3}
                required
                value={descriptionEn}
                onChange={(e) => setDescriptionEn(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                APK Description (Kiswahili)
              </label>
              <textarea
                rows={3}
                required
                value={descriptionSw}
                onChange={(e) => setDescriptionSw(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Release Notes (English)
              </label>
              <textarea
                rows={3}
                required
                value={releaseNotesEn}
                onChange={(e) => setReleaseNotesEn(e.target.value)}
                placeholder="- Improved offline PDF generation&#10;- Faster material search"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Release Notes (Kiswahili)
              </label>
              <textarea
                rows={3}
                required
                value={releaseNotesSw}
                onChange={(e) => setReleaseNotesSw(e.target.value)}
                placeholder="- Maboresho ya kutoa PDF bila intaneti&#10;- Utafutaji wa haraka wa vifaa"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-200">
            <label className="inline-flex items-center gap-2.5 text-sm font-medium text-[#0B1F3A] cursor-pointer">
              <input
                type="checkbox"
                checked={publishImmediately}
                onChange={(e) => setPublishImmediately(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-[#0B1F3A]"
              />
              <span>Publish immediately as latest Customer APK</span>
            </label>

            <button
              type="submit"
              disabled={uploadProgress !== null || submittingExternal || computingHash}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#0B1F3A] bg-[#EAB308] hover:bg-[#D99B16] disabled:opacity-60 rounded-lg transition-colors"
            >
              {sourceMode === 'external' ? <Link2 className="w-4 h-4" /> : <Upload className="w-4 h-4" />}
              <span>
                {submittingExternal
                  ? 'Saving Release...'
                  : uploadProgress !== null
                    ? `Uploading (${uploadProgress}%)...`
                    : sourceMode === 'external'
                      ? publishImmediately
                        ? 'Save & Publish Customer APK'
                        : 'Save Draft APK Link'
                      : publishImmediately
                        ? 'Upload & Publish Customer APK'
                        : 'Upload Private Draft'}
              </span>
            </button>
          </div>
        </form>
      )}

      {/* Version Management Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-display text-base font-bold text-[#0B1F3A]">
            Customer APK Versions ({versions.length})
          </h2>
          <span className="text-xs text-slate-500">
            Draft & archived releases are hidden from public Download page
          </span>
        </div>

        {versions.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-600">
            No Customer APK versions uploaded yet. Use the APK Management tab to upload your first build.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F4F6F9] text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3 font-semibold">Version</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Size</th>
                  <th className="px-5 py-3 font-semibold">Release Date</th>
                  <th className="px-5 py-3 font-semibold">SHA-256</th>
                  <th className="px-5 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {versions.map((ver) => (
                  <tr key={ver.id} className="hover:bg-slate-50">
                    <td className="px-5 py-3.5">
                      <div className="font-mono font-semibold text-[#0B1F3A] tabular-nums">
                        v{ver.versionName} ({ver.versionCode})
                      </div>
                      <div className="text-xs text-slate-500">
                        {ver.minAndroidVersion}
                        {ver.isLatest ? ' · Latest Live' : ''}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`text-xs font-semibold uppercase tracking-wide ${
                          ver.status === 'published'
                            ? 'text-emerald-700'
                            : ver.status === 'draft'
                            ? 'text-amber-700'
                            : 'text-slate-500'
                        }`}
                      >
                        {ver.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-mono text-slate-600 tabular-nums">
                      {ver.fileSizeDisplay}
                    </td>
                    <td className="px-5 py-3.5 font-mono text-slate-600 tabular-nums">
                      {ver.releaseDate}
                    </td>
                    <td className="px-5 py-3.5 font-mono text-xs text-slate-500">
                      {ver.sha256Checksum.slice(0, 14)}...
                    </td>
                    <td className="px-5 py-3.5 text-right space-x-2 whitespace-nowrap">
                      {ver.status !== 'published' && (
                        <button
                          type="button"
                          disabled={busyId === ver.id}
                          onClick={() => void handlePublishVersion(ver)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-white bg-[#0B1F3A] hover:bg-[#163A66] rounded-md"
                        >
                          <Rocket className="w-3.5 h-3.5" />
                          <span>Publish</span>
                        </button>
                      )}
                      {ver.status === 'published' && (
                        <button
                          type="button"
                          disabled={busyId === ver.id}
                          onClick={() => void handleArchiveVersion(ver)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 border border-slate-300 hover:bg-slate-100 rounded-md"
                        >
                          <Archive className="w-3.5 h-3.5" />
                          <span>Archive</span>
                        </button>
                      )}
                      <button
                        type="button"
                        disabled={busyId === ver.id}
                        onClick={() => void handleDeleteVersion(ver)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-red-700 border border-red-200 hover:bg-red-50 rounded-md"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
