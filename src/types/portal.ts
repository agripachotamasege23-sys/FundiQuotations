export type Language = 'en' | 'sw';

export type ApkStatus = 'draft' | 'published' | 'archived';
export type ContentStatus = 'draft' | 'published';
export type SupportStatus = 'new' | 'in_progress' | 'resolved';

export interface AppVersion {
  id: string;
  appName: string;
  versionName: string;
  versionCode: number;
  apkChannel: 'customer';
  status: ApkStatus;
  isLatest: boolean;
  fileSizeBytes: number;
  fileSizeDisplay: string;
  releaseDate: string;
  minAndroidVersion: string;
  descriptionEn: string;
  descriptionSw: string;
  releaseNotesEn: string;
  releaseNotesSw: string;
  sha256Checksum: string;
  apkStoragePath: string;
  apkDownloadUrl: string;
  createdBy: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface AppScreenshot {
  id: string;
  titleEn: string;
  titleSw: string;
  captionEn: string;
  captionSw: string;
  imageUrl: string;
  storagePath: string;
  sortOrder: number;
  status: ContentStatus;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface InstallationGuideStep {
  id: string;
  stepNumber: number;
  titleEn: string;
  titleSw: string;
  descriptionEn: string;
  descriptionSw: string;
  tipEn: string;
  tipSw: string;
  imageUrl: string;
  status: ContentStatus;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface TutorialSection {
  id: string;
  slug: string;
  category: string;
  sortOrder: number;
  titleEn: string;
  titleSw: string;
  summaryEn: string;
  summarySw: string;
  contentEn: string;
  contentSw: string;
  imageUrl: string;
  videoUrl: string;
  status: ContentStatus;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface FaqItem {
  id: string;
  category: string;
  sortOrder: number;
  questionEn: string;
  questionSw: string;
  answerEn: string;
  answerSw: string;
  status: ContentStatus;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface WebsiteSettings {
  brandName: string;
  supportEmail: string;
  supportPhone: string;
  whatsappNumber: string;
  officeAddressEn: string;
  officeAddressSw: string;
  heroHeadlineEn: string;
  heroHeadlineSw: string;
  heroSubheadlineEn: string;
  heroSubheadlineSw: string;
  showDownloadCounter: boolean;
  updatedBy?: string;
  updatedAt?: unknown;
}

export interface SupportMessage {
  id: string;
  customerName: string;
  email: string;
  subject: string;
  message: string;
  language: Language;
  status: SupportStatus;
  adminNotes: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface DownloadStatistic {
  id: string;
  versionId: string;
  versionName: string;
  apkChannel: 'customer';
  sourcePage: string;
  language: Language;
  createdAt?: unknown;
}

export interface AdminUser {
  uid: string;
  email: string;
  displayName: string;
  role: 'super_admin' | 'admin';
  createdAt?: unknown;
}
