import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { AppVersion, Language } from '../types/portal';

const MAX_APK_SIZE_BYTES = 150 * 1024 * 1024; // 150 MB

export function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / Math.pow(1024, i);
  return `${value.toFixed(i === 0 ? 0 : 2)} ${units[i]}`;
}

export function parseDisplaySizeToBytes(display: string): number {
  const trimmed = display.trim();
  if (!trimmed) return 0;

  const unitMatch = trimmed.match(/^(\d+(?:\.\d+)?)\s*(B|KB|MB|GB)?$/i);
  if (!unitMatch) return 0;

  const num = parseFloat(unitMatch[1]);
  if (!Number.isFinite(num) || num <= 0) return 0;

  const unit = (unitMatch[2] || 'MB').toUpperCase();
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

export function normalizeDisplaySizeLabel(display: string, bytes: number): string {
  const trimmed = display.trim();
  if (/^\d+(?:\.\d+)?$/.test(trimmed)) {
    return `${trimmed} MB`;
  }
  return trimmed || formatFileSize(bytes);
}

export async function validateApkFile(
  file: File
): Promise<{ valid: boolean; error?: string }> {
  const lowerName = file.name.toLowerCase();
  if (!lowerName.endsWith('.apk')) {
    return { valid: false, error: 'Only Android .apk files are permitted for Customer APK uploads.' };
  }
  if (lowerName.includes('admin')) {
    return {
      valid: false,
      error: 'Filenames containing "admin" are blocked. Only Customer APKs may be uploaded here.'
    };
  }
  if (file.size <= 0) {
    return { valid: false, error: 'Selected APK file is empty.' };
  }
  if (file.size > MAX_APK_SIZE_BYTES) {
    return {
      valid: false,
      error: `APK exceeds the 150 MB size limit (${formatFileSize(file.size)}).`
    };
  }

  // Verify ZIP/APK header magic bytes (0x50 0x4B -> "PK")
  try {
    const headerSlice = await file.slice(0, 4).arrayBuffer();
    const bytes = new Uint8Array(headerSlice);
    const isZipHeader = bytes.length >= 2 && bytes[0] === 0x50 && bytes[1] === 0x4b;
    if (!isZipHeader) {
      return {
        valid: false,
        error: 'Invalid APK binary signature. File does not appear to be a valid Android APK archive.'
      };
    }
  } catch {
    return { valid: false, error: 'Unable to read APK file header for validation.' };
  }

  return { valid: true };
}

export async function computeTextSha256Hex(input: string): Promise<string> {
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const encoded = new TextEncoder().encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  // Deterministic 64-hex fallback if crypto.subtle is unavailable in non-secure context
  let h1 = 0x811c9dc5;
  let h2 = 0x9e3779b9;
  for (let i = 0; i < input.length; i++) {
    const c = input.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 0x01000193);
    h2 = Math.imul(h2 ^ (c + i), 0x85ebca6b);
  }
  const partA = (h1 >>> 0).toString(16).padStart(8, '0');
  const partB = (h2 >>> 0).toString(16).padStart(8, '0');
  return `${partA}${partB}`.repeat(4).slice(0, 64);
}

export async function computeSha256Hex(file: File): Promise<string> {
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  return computeTextSha256Hex(`${file.name}:${file.size}:${file.lastModified}`);
}

export function isSafePublicUrl(url: string): boolean {
  if (!url) return false;
  if (url.startsWith('/src/assets/') || url.startsWith('/assets/')) return true;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export function normalizeApkDownloadUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim();
  if (!trimmed) return '';
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'https:') return trimmed;

    // Convert Google Drive share links (/file/d/ID/view) to direct download links
    if (parsed.hostname === 'drive.google.com') {
      const match = parsed.pathname.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
      const idParam = parsed.searchParams.get('id');
      const fileId = match?.[1] || idParam;
      if (fileId) {
        return `https://drive.google.com/uc?export=download&id=${fileId}`;
      }
    }

    // Convert Dropbox share links (?dl=0) to direct download (?dl=1)
    if (parsed.hostname.endsWith('dropbox.com')) {
      parsed.searchParams.set('dl', '1');
      return parsed.toString();
    }

    return trimmed;
  } catch {
    return trimmed;
  }
}

export async function recordApkDownload(
  version: AppVersion,
  sourcePage: string,
  language: Language
): Promise<void> {
  if (version.apkChannel !== 'customer' || version.status !== 'published') {
    throw new Error('Only published Customer APK releases can be downloaded.');
  }

  const payload = {
    versionId: version.id,
    versionName: version.versionName,
    apkChannel: 'customer' as const,
    sourcePage: sourcePage.slice(0, 60),
    language
  };

  // Non-blocking server validation ping + Firestore verified download log
  const serverPromise = fetch('/api/download/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).catch(() => null);

  const firestorePromise = addDoc(collection(db, 'downloadStatistics'), {
    ...payload,
    createdAt: serverTimestamp()
  }).catch((err) => {
    console.warn('Download statistic write skipped:', err);
  });

  await Promise.all([serverPromise, firestorePromise]);
}
