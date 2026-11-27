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
  ExternalLink,
  FileArchive,
  Link2,
  Pencil,
  Rocket,
  ShieldCheck,
  Trash2,
  Upload,
  X
} from 'lucide-react';
import {
  db,
  formatFirestoreActionError,
  OperationType,
  storage
} from '../../lib/firebase';
import {
  computeSha256Hex,
  computeTextSha256Hex,
  formatFileSize,
  isSafePublicUrl,
  normalizeApkDownloadUrl,
  normalizeDisplaySizeLabel,
  parseDisplaySizeToBytes,
  validateApkFile
} from '../../lib/apkUtils';
import { AppVersion } from '../../types/portal';

const DEFAULT_FALLBACK_APK_BYTES = 25 * 1024 * 1024;
const MAX_FIRESTORE_APK_BYTES = 209715200;

function formatStorageUploadError(err: unknown): string {
  const code = (err as { code?: string } | null)?.code ?? '';
  const msg = err instanceof Error ? err.message : String(err);

  if (code === 'storage/unauthorized') {
    return 'Firebase Storage imekataa upakiaji (storage/unauthorized). Hakikisha umewezesha Firebase Storage + Blaze plan au tumia njia ya bure ya "Free APK Link (GitHub Releases / Drive)" hapo juu.';
  }
  if (code === 'storage/bucket-not-found' || code === 'storage/project-not-found') {
    return 'Firebase Storage bucket haijasanidiwa kwenye mradi huu. Tumia njia ya bure ya "Free APK Link (GitHub Releases / Drive)" hapo juu.';
  }
  if (code === 'storage/retry-limit-exceeded' || code === 'storage/canceled') {
    return 'Upakiaji wa APK umesimama au mtandao umekatika. Jaribu tena au tumia "Free APK Link (GitHub Releases / Drive)".';
  }
  if (msg.toLowerCase().includes('cors') || msg.toLowerCase().includes('network')) {
    return 'Hitilafu ya mtandao au CORS kwenye Firebase Storage. Tumia njia ya "Free APK Link (GitHub Releases / Drive)" au sanidi CORS kwenye Storage bucket.';
  }
  return msg || 'Imeshindwa kupakia APK kwenye Firebase Storage. Jaribu kutumia Free APK Link.';
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
  const [editingVersion, setEditingVersion] = useState<AppVersion | null>(null);
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
  const [releaseNotesEn, setReleaseNotesEn] = useState(
    '- Official Customer APK release\n- Offline quotation & invoice creation'
  );
  const [releaseNotesSw, setReleaseNotesSw] = useState(
    '- Toleo rasmi la Customer APK\n- Kuandaa nukuu za bei na ankara hata bila intaneti'
  );
  const [sha256Checksum, setSha256Checksum] = useState('');
  const [fileSizeBytes, setFileSizeBytes] = useState(0);
  const [fileSizeDisplay, setFileSizeDisplay] = useState('');
  const [publishImmediately, setPublishImmediately] = useState(true);

  const [computingHash, setComputingHash] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [submittingExternal, setSubmittingExternal] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const resetFormFields = () => {
    setEditingVersion(null);
    setExternalUrl('');
    setSelectedFile(null);
    setAppName('FundiQuotations');
    setVersionName('');
    setVersionCode(String((versions[0]?.versionCode ?? 0) + 1));
    setReleaseDate(new Date().toISOString().slice(0, 10));
    setMinAndroidVersion('Android 8.0+');
    setSha256Checksum('');
    setFileSizeBytes(0);
    setFileSizeDisplay('');
    setReleaseNotesEn('- Official Customer APK release\n- Offline quotation & invoice creation');
    setReleaseNotesSw('- Toleo rasmi la Customer APK\n- Kuandaa nukuu za bei na ankara hata bila intaneti');
  };

  const startEditingVersion = (ver: AppVersion) => {
    setFormError(null);
    setFormSuccess(null);
    setEditingVersion(ver);
    setSourceMode('external');
    setExternalUrl(ver.apkDownloadUrl);
    setSelectedFile(null);
    setAppName(ver.appName);
    setVersionName(ver.versionName);
    setVersionCode(String(ver.versionCode));
    setReleaseDate(ver.releaseDate);
    setMinAndroidVersion(ver.minAndroidVersion);
    setDescriptionEn(ver.descriptionEn);
    setDescriptionSw(ver.descriptionSw);
    setReleaseNotesEn(ver.releaseNotesEn);
    setReleaseNotesSw(ver.releaseNotesSw);
    setSha256Checksum(ver.sha256Checksum);
    setFileSizeBytes(ver.fileSizeBytes);
    setFileSizeDisplay(ver.fileSizeDisplay);
    setPublishImmediately(ver.status === 'published');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      const fallbackHash = await computeTextSha256Hex(`${file.name}:${file.size}:${Date.now()}`);
      setSha256Checksum(fallbackHash);
    } finally {
      setComputingHash(false);
    }
  };

  const demotePreviousLatestVersions = async (excludeId: string) => {
    const outdatedLatest = versions.filter((v) => v.isLatest && v.id !== excludeId);
    if (outdatedLatest.length === 0) return;
    try {
      const batch = writeBatch(db);
      outdatedLatest.forEach((v) => {
        batch.update(doc(db, 'appVersions', v.id), {
          isLatest: false,
          updatedAt: serverTimestamp()
        });
      });
      await batch.commit();
    } catch (err) {
      // Fallback individually so one legacy doc never blocks the rest
      console.warn('Batch demote note:', err);
      await Promise.allSettled(
        outdatedLatest.map((v) =>
          updateDoc(doc(db, 'appVersions', v.id), {
            isLatest: false,
            updatedAt: serverTimestamp()
          })
        )
      );
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    if (!editingVersion && sourceMode === 'storage' && !selectedFile) {
      setFormError('Chagua faili halali la Customer .apk kwanza kabla ya kupakia.');
      return;
    }

    const normalizedExternalUrl =
      sourceMode === 'external' || editingVersion ? normalizeApkDownloadUrl(externalUrl) : '';

    if (sourceMode === 'external' || editingVersion) {
      if (
        !isSafePublicUrl(normalizedExternalUrl) ||
        !normalizedExternalUrl.startsWith('https://') ||
        normalizedExternalUrl.length < 10 ||
        normalizedExternalUrl.length > 1200
      ) {
        setFormError(
          'Weka link sahihi ya HTTPS ya kupakua APK (mfano kutoka GitHub Releases au Google Drive), urefu kati ya herufi 10 na 1200.'
        );
        return;
      }
      if (normalizedExternalUrl.toLowerCase().includes('admin')) {
        setFormError('Link yenye neno "admin" imezuiwa. Weka link ya Customer APK pekee.');
        return;
      }
    }

    const cleanAppName = appName.trim();
    const cleanVersionName = versionName.trim();
    const parsedVersionCode = Math.floor(Number(versionCode));
    const cleanReleaseDate = releaseDate.trim() || new Date().toISOString().slice(0, 10);
    const cleanMinAndroid = minAndroidVersion.trim() || 'Android 8.0+';
    const cleanDescEn = descriptionEn.trim();
    const cleanDescSw = descriptionSw.trim();
    const cleanNotesEn = releaseNotesEn.trim();
    const cleanNotesSw = releaseNotesSw.trim();

    if (cleanAppName.length < 2 || cleanAppName.length > 80) {
      setFormError('App Name lazima iwe na herufi kati ya 2 na 80.');
      return;
    }
    if (!cleanVersionName || cleanVersionName.length > 40 || !Number.isFinite(parsedVersionCode) || parsedVersionCode < 1) {
      setFormError('Weka namba ya toleo (Version Number) na Version Code (namba chanya kama 1, 2, 3).');
      return;
    }
    if (cleanDescEn.length < 5 || cleanDescSw.length < 5) {
      setFormError('Maelezo ya APK (Kiingereza na Kiswahili) yanapaswa kuwa na angalau herufi 5.');
      return;
    }
    if (cleanNotesEn.length < 2 || cleanNotesSw.length < 2) {
      setFormError('Andika maelezo ya toleo (Release Notes) kwa Kiingereza na Kiswahili.');
      return;
    }

    // Resolve file size gracefully (optional manual input in external mode)
    let resolvedSizeBytes =
      fileSizeBytes > 0 ? Math.round(fileSizeBytes) : parseDisplaySizeToBytes(fileSizeDisplay);
    let resolvedSizeDisplay = normalizeDisplaySizeLabel(fileSizeDisplay, resolvedSizeBytes);

    if (resolvedSizeBytes <= 0) {
      if (sourceMode === 'external' || editingVersion) {
        resolvedSizeBytes = DEFAULT_FALLBACK_APK_BYTES;
        resolvedSizeDisplay = '25 MB';
      } else {
        setFormError('Chagua faili la .apk au weka ukubwa wa faili mfano "24.5 MB".');
        return;
      }
    }

    if (resolvedSizeBytes > MAX_FIRESTORE_APK_BYTES) {
      setFormError('Ukubwa wa faili umezidi kikomo cha 200 MB.');
      return;
    }

    // Resolve SHA-256 checksum automatically if omitted in link mode
    let resolvedSha256 = sha256Checksum.trim().toLowerCase();
    if (!/^[a-f0-9]{64}$/.test(resolvedSha256)) {
      if (selectedFile) {
        resolvedSha256 = await computeSha256Hex(selectedFile);
      } else if (sourceMode === 'external' || editingVersion) {
        resolvedSha256 = await computeTextSha256Hex(
          `${normalizedExternalUrl}|${cleanVersionName}|${parsedVersionCode}`
        );
      } else {
        setFormError('SHA-256 checksum si sahihi. Chagua upya faili la .apk.');
        return;
      }
    }

    // Editing an existing APK release
    if (editingVersion) {
      setSubmittingExternal(true);
      try {
        await updateDoc(doc(db, 'appVersions', editingVersion.id), {
          appName: cleanAppName,
          versionName: cleanVersionName,
          versionCode: parsedVersionCode,
          status: publishImmediately ? 'published' : editingVersion.status === 'archived' ? 'archived' : 'draft',
          isLatest: publishImmediately,
          fileSizeBytes: resolvedSizeBytes,
          fileSizeDisplay: resolvedSizeDisplay.slice(0, 32),
          releaseDate: cleanReleaseDate.slice(0, 32),
          minAndroidVersion: cleanMinAndroid.slice(0, 40),
          descriptionEn: cleanDescEn.slice(0, 1500),
          descriptionSw: cleanDescSw.slice(0, 1500),
          releaseNotesEn: cleanNotesEn.slice(0, 3000),
          releaseNotesSw: cleanNotesSw.slice(0, 3000),
          sha256Checksum: resolvedSha256,
          apkStoragePath: editingVersion.apkStoragePath,
          apkDownloadUrl: normalizedExternalUrl,
          updatedAt: serverTimestamp()
        });

        if (publishImmediately) {
          await demotePreviousLatestVersions(editingVersion.id);
        }

        const savedVersionLabel = cleanVersionName;
        resetFormFields();
        setFormSuccess(`Mabadiliko ya v${savedVersionLabel} yamehifadhiwa kwenye Cloud Firestore!`);
        await onRefresh();
      } catch (err) {
        setFormError(
          formatFirestoreActionError(err, OperationType.UPDATE, `appVersions/${editingVersion.id}`)
        );
      } finally {
        setSubmittingExternal(false);
      }
      return;
    }

    if (sourceMode === 'external') {
      setSubmittingExternal(true);
      try {
        const storagePath = `external/direct-link/v${cleanVersionName.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
        const createdRef = await addDoc(collection(db, 'appVersions'), {
          appName: cleanAppName,
          versionName: cleanVersionName,
          versionCode: parsedVersionCode,
          apkChannel: 'customer',
          status: publishImmediately ? 'published' : 'draft',
          isLatest: publishImmediately,
          fileSizeBytes: resolvedSizeBytes,
          fileSizeDisplay: resolvedSizeDisplay.slice(0, 32),
          releaseDate: cleanReleaseDate.slice(0, 32),
          minAndroidVersion: cleanMinAndroid.slice(0, 40),
          descriptionEn: cleanDescEn.slice(0, 1500),
          descriptionSw: cleanDescSw.slice(0, 1500),
          releaseNotesEn: cleanNotesEn.slice(0, 3000),
          releaseNotesSw: cleanNotesSw.slice(0, 3000),
          sha256Checksum: resolvedSha256,
          apkStoragePath: storagePath,
          apkDownloadUrl: normalizedExternalUrl,
          createdBy: adminUid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });

        if (publishImmediately) {
          await demotePreviousLatestVersions(createdRef.id);
        }

        const nextCode = parsedVersionCode + 1;
        resetFormFields();
        setVersionCode(String(nextCode));
        setFormSuccess(
          publishImmediately
            ? 'Link ya Customer APK imehifadhiwa kwenye Cloud Firestore na kuchapishwa live! Itabaki salama hata ukifanya updates kwenye GitHub.'
            : 'Link ya Customer APK imehifadhiwa kama Draft kwenye Cloud Firestore.'
        );
        await onRefresh();
      } catch (err) {
        setFormError(formatFirestoreActionError(err, OperationType.CREATE, 'appVersions'));
      } finally {
        setSubmittingExternal(false);
      }
      return;
    }

    // Firebase Storage Upload mode (requires Blaze plan enabled in Firebase Console)
    const fileToUpload = selectedFile!;
    const versionSlug = `v${cleanVersionName.replace(/[^a-zA-Z0-9._-]/g, '_')}-${Date.now()}`;
    const safeFilename = fileToUpload.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const storagePath = publishImmediately
      ? `apk/customer/${versionSlug}/${safeFilename}`
      : `apk/drafts/${versionSlug}/${safeFilename}`;

    let uploadedDownloadUrl = '';
    try {
      const storageRef = ref(storage, storagePath);
      const uploadTask = uploadBytesResumable(storageRef, fileToUpload, {
        contentType: 'application/vnd.android.package-archive',
        customMetadata: {
          apkChannel: 'customer',
          versionName: cleanVersionName,
          sha256: resolvedSha256
        }
      });

      uploadedDownloadUrl = await new Promise<string>((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const pct = snapshot.totalBytes
              ? Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
              : 0;
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
    } catch (storageErr) {
      setUploadProgress(null);
      setFormError(formatStorageUploadError(storageErr));
      return;
    }

    try {
      const createdRef = await addDoc(collection(db, 'appVersions'), {
        appName: cleanAppName,
        versionName: cleanVersionName,
        versionCode: parsedVersionCode,
        apkChannel: 'customer',
        status: publishImmediately ? 'published' : 'draft',
        isLatest: publishImmediately,
        fileSizeBytes: resolvedSizeBytes,
        fileSizeDisplay: resolvedSizeDisplay.slice(0, 32),
        releaseDate: cleanReleaseDate.slice(0, 32),
        minAndroidVersion: cleanMinAndroid.slice(0, 40),
        descriptionEn: cleanDescEn.slice(0, 1500),
        descriptionSw: cleanDescSw.slice(0, 1500),
        releaseNotesEn: cleanNotesEn.slice(0, 3000),
        releaseNotesSw: cleanNotesSw.slice(0, 3000),
        sha256Checksum: resolvedSha256,
        apkStoragePath: storagePath,
        apkDownloadUrl: uploadedDownloadUrl,
        createdBy: adminUid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      if (publishImmediately) {
        await demotePreviousLatestVersions(createdRef.id);
      }

      const nextCode = parsedVersionCode + 1;
      resetFormFields();
      setVersionCode(String(nextCode));
      setUploadProgress(null);
      setFormSuccess(
        publishImmediately
          ? 'Customer APK imepakiwa kwenye Storage na kuchapishwa live kwenye ukurasa wa Download!'
          : 'Customer APK imepakiwa kama Draft.'
      );
      await onRefresh();
    } catch (err) {
      setUploadProgress(null);
      setFormError(formatFirestoreActionError(err, OperationType.CREATE, 'appVersions'));
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
        try {
          const draftRef = ref(storage, ver.apkStoragePath);
          const blob = await getBlob(draftRef);
          const fileName =
            ver.apkStoragePath.split('/').pop() || `FundiQuotations-v${ver.versionName}.apk`;
          const publicPath = `apk/customer/${ver.id}/${fileName}`;
          const publicRef = ref(storage, publicPath);
          await uploadBytesResumable(publicRef, blob, {
            contentType: 'application/vnd.android.package-archive'
          });
          nextDownloadUrl = await getDownloadURL(publicRef);
          nextStoragePath = publicPath;
          await deleteObject(draftRef).catch(() => null);
        } catch (storageMoveErr) {
          console.warn('Draft move skipped, keeping current URL:', storageMoveErr);
        }
      }

      await updateDoc(doc(db, 'appVersions', ver.id), {
        status: 'published',
        isLatest: true,
        apkStoragePath: nextStoragePath,
        apkDownloadUrl: nextDownloadUrl,
        updatedAt: serverTimestamp()
      });

      await demotePreviousLatestVersions(ver.id);

      setFormSuccess(`Toleo v${ver.versionName} sasa ndilo toleo rasmi la Customer APK.`);
      await onRefresh();
    } catch (err) {
      setFormError(formatFirestoreActionError(err, OperationType.UPDATE, `appVersions/${ver.id}`));
    } finally {
      setBusyId(null);
    }
  };

  const handleArchiveVersion = async (ver: AppVersion) => {
    setBusyId(ver.id);
    setFormError(null);
    setFormSuccess(null);
    try {
      await updateDoc(doc(db, 'appVersions', ver.id), {
        status: 'archived',
        isLatest: false,
        updatedAt: serverTimestamp()
      });
      setFormSuccess(`Toleo v${ver.versionName} limehifadhiwa kwenye kumbukumbu (Archived).`);
      await onRefresh();
    } catch (err) {
      setFormError(formatFirestoreActionError(err, OperationType.UPDATE, `appVersions/${ver.id}`));
    } finally {
      setBusyId(null);
    }
  };

  const handleDeleteVersion = async (ver: AppVersion) => {
    setBusyId(ver.id);
    setFormError(null);
    setFormSuccess(null);
    try {
      if (ver.apkStoragePath && !ver.apkStoragePath.startsWith('external/')) {
        await deleteObject(ref(storage, ver.apkStoragePath)).catch(() => null);
      }
      await deleteDoc(doc(db, 'appVersions', ver.id));
      setConfirmDeleteId(null);
      setFormSuccess(`Toleo v${ver.versionName} limefutwa.`);
      await onRefresh();
    } catch (err) {
      setFormError(formatFirestoreActionError(err, OperationType.DELETE, `appVersions/${ver.id}`));
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
          <span className="leading-relaxed">{formError}</span>
        </div>
      )}

      {formSuccess && (
        <div
          role="status"
          className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-900 flex items-start gap-2.5"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <span className="leading-relaxed">{formSuccess}</span>
        </div>
      )}

      {(mode === 'upload' || editingVersion !== null) && (
        <form
          onSubmit={(e) => void handleUploadSubmit(e)}
          className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
            <div>
              <h2 className="font-display text-lg font-bold text-[#0B1F3A]">
                {editingVersion
                  ? `Edit Customer APK: v${editingVersion.versionName}`
                  : 'Publish Customer APK Release'}
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Use a 100% free External HTTPS Link (GitHub Releases / Google Drive) without Firebase Storage billing, or upload directly to Firebase Storage.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B1F3A]">
                <ShieldCheck className="w-4 h-4 text-[#D99B16]" />
                <span>Channel: Customer APK Only</span>
              </div>
              {editingVersion && (
                <button
                  type="button"
                  onClick={resetFormFields}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Cancel Edit</span>
                </button>
              )}
            </div>
          </div>

          {!editingVersion && (
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
                  100% free (no credit card). Host your .apk on GitHub Releases or Google Drive and save the link in Cloud Firestore.
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
                  Direct upload to Firebase Storage bucket (requires Blaze billing enabled in Firebase Console).
                </p>
              </button>
            </div>
          )}

          {(sourceMode === 'external' || editingVersion) && (
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
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm font-mono text-[#0B1F3A] bg-white"
              />
              <p className="mt-1.5 text-xs text-slate-500">
                Paste your GitHub Releases, Google Drive, or Dropbox HTTPS link. You do NOT need to select a local .apk file when publishing via link.
              </p>
            </div>
          )}

          {!editingVersion && (
            <div>
              <label
                htmlFor="apk-file-input"
                className="block text-sm font-semibold text-[#0B1F3A] mb-2"
              >
                {sourceMode === 'external'
                  ? 'Optional: Select Local .apk File to Auto-Fill Size (Not Uploaded)'
                  : 'Android Customer APK File (.apk, max 150 MB) *'}
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 bg-[#F4F6F9] text-center">
                <FileArchive className="w-8 h-8 text-[#0B1F3A] mx-auto mb-2" />
                <input
                  id="apk-file-input"
                  type="file"
                  accept=".apk,application/vnd.android.package-archive,application/octet-stream"
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
                    Preparing APK metadata...
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">App Name</label>
              <input
                type="text"
                required
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-[#0B1F3A] bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Version Number (e.g. 2.4.0) *
              </label>
              <input
                type="text"
                required
                value={versionName}
                onChange={(e) => setVersionName(e.target.value)}
                placeholder="2.4.0"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono text-[#0B1F3A] bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Version Code (Integer) *
              </label>
              <input
                type="number"
                min={1}
                required
                value={versionCode}
                onChange={(e) => setVersionCode(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono tabular-nums text-[#0B1F3A] bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Release Date</label>
              <input
                type="date"
                required
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono text-[#0B1F3A] bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                File Size Display (e.g. 24 MB)
              </label>
              <input
                type="text"
                required={sourceMode === 'storage'}
                value={fileSizeDisplay}
                onChange={(e) => {
                  setFileSizeDisplay(e.target.value);
                  setFileSizeBytes(0);
                }}
                placeholder="25 MB (optional in link mode)"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono text-[#0B1F3A] bg-white"
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
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-[#0B1F3A] bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                SHA-256 Verification ID (Auto)
              </label>
              <input
                type="text"
                value={sha256Checksum}
                onChange={(e) => setSha256Checksum(e.target.value)}
                placeholder="Auto-generated on save if empty"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono text-[#0B1F3A] bg-white"
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
                minLength={5}
                value={descriptionEn}
                onChange={(e) => setDescriptionEn(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-[#0B1F3A] bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                APK Description (Kiswahili)
              </label>
              <textarea
                rows={3}
                required
                minLength={5}
                value={descriptionSw}
                onChange={(e) => setDescriptionSw(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-[#0B1F3A] bg-white"
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
                minLength={2}
                value={releaseNotesEn}
                onChange={(e) => setReleaseNotesEn(e.target.value)}
                placeholder="- Improved offline PDF generation&#10;- Faster material search"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-[#0B1F3A] bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Release Notes (Kiswahili)
              </label>
              <textarea
                rows={3}
                required
                minLength={2}
                value={releaseNotesSw}
                onChange={(e) => setReleaseNotesSw(e.target.value)}
                placeholder="- Maboresho ya kutoa PDF bila intaneti&#10;- Utafutaji wa haraka wa vifaa"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-[#0B1F3A] bg-white"
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
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#0B1F3A] bg-[#EAB308] hover:bg-[#D99B16] disabled:opacity-60 rounded-lg transition-colors cursor-pointer"
            >
              {sourceMode === 'external' || editingVersion ? (
                <Link2 className="w-4 h-4" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
              <span>
                {submittingExternal
                  ? 'Saving Release...'
                  : uploadProgress !== null
                    ? `Uploading (${uploadProgress}%)...`
                    : editingVersion
                      ? 'Save Changes to Cloud'
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
        <div className="px-6 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-display text-base font-bold text-[#0B1F3A]">
            Customer APK Versions ({versions.length})
          </h2>
          <span className="text-xs text-slate-500">
            Stored safely in Cloud Firestore — preserved across all GitHub & Vercel deployments
          </span>
        </div>

        {versions.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-600">
            No Customer APK versions saved yet. Use the form above to publish your APK link or upload an .apk file.
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
                  <th className="px-5 py-3 font-semibold">APK Link</th>
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
                    <td className="px-5 py-3.5">
                      <a
                        href={ver.apkDownloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono text-[#0B1F3A] hover:underline max-w-[180px] truncate"
                        title={ver.apkDownloadUrl}
                      >
                        <ExternalLink className="w-3 h-3 shrink-0" />
                        <span className="truncate">{ver.apkDownloadUrl}</span>
                      </a>
                    </td>
                    <td className="px-5 py-3.5 text-right space-x-2 whitespace-nowrap">
                      <button
                        type="button"
                        disabled={busyId === ver.id}
                        onClick={() => startEditingVersion(ver)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-[#0B1F3A] border border-slate-300 hover:bg-slate-100 rounded-md"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

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

                      {confirmDeleteId === ver.id ? (
                        <span className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            disabled={busyId === ver.id}
                            onClick={() => void handleDeleteVersion(ver)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-md"
                          >
                            Confirm Delete
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(null)}
                            className="px-2 py-1.5 text-xs font-medium text-slate-600 hover:text-[#0B1F3A]"
                          >
                            Cancel
                          </button>
                        </span>
                      ) : (
                        <button
                          type="button"
                          disabled={busyId === ver.id}
                          onClick={() => setConfirmDeleteId(ver.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-red-700 border border-red-200 hover:bg-red-50 rounded-md"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      )}
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
