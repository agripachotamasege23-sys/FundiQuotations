import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, doc, getDocs, serverTimestamp, writeBatch } from 'firebase/firestore';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Circle,
  Database,
  FileArchive,
  HelpCircle,
  Image as ImageIcon,
  LayoutDashboard,
  ListChecks,
  Lock,
  LogOut,
  MessageSquare,
  Settings,
  ShieldAlert,
  Upload
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePortalData } from '../context/PortalDataContext';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import {
  DEFAULT_FAQS,
  DEFAULT_INSTALLATION_GUIDES,
  DEFAULT_SCREENSHOTS,
  DEFAULT_TUTORIALS,
  DEFAULT_WEBSITE_SETTINGS
} from '../data/defaultContent';
import {
  AppScreenshot,
  AppVersion,
  DownloadStatistic,
  FaqItem,
  InstallationGuideStep,
  SupportMessage,
  TutorialSection
} from '../types/portal';
import { BrandMark } from '../components/BrandMark';
import { AdminApkSection } from '../components/admin/AdminApkSection';
import { AdminContentSection } from '../components/admin/AdminContentSection';
import {
  AdminSettingsSection,
  AdminSupportSection
} from '../components/admin/AdminSupportSettingsSection';

type AdminTab =
  | 'overview'
  | 'apk'
  | 'versions'
  | 'screenshots'
  | 'guides'
  | 'tutorials'
  | 'faqs'
  | 'support'
  | 'settings';

const NAV_ITEMS: { id: AdminTab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'apk', label: 'APK Management', icon: Upload },
  { id: 'versions', label: 'Version Management', icon: FileArchive },
  { id: 'screenshots', label: 'App Screenshots', icon: ImageIcon },
  { id: 'guides', label: 'Installation Guides', icon: ListChecks },
  { id: 'tutorials', label: 'User Tutorials', icon: BookOpen },
  { id: 'faqs', label: 'FAQ Management', icon: HelpCircle },
  { id: 'support', label: 'Support Messages', icon: MessageSquare },
  { id: 'settings', label: 'Website Settings', icon: Settings }
];

export function AdminPage() {
  const { user, authReady, isAdmin, checkingAdmin, authError, signInWithGoogle, signOutUser } =
    useAuth();
  const { settings, refreshPublicData } = usePortalData();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [loadingAdminData, setLoadingAdminData] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState<string | null>(null);

  const [versions, setVersions] = useState<AppVersion[]>([]);
  const [screenshots, setScreenshots] = useState<AppScreenshot[]>([]);
  const [guides, setGuides] = useState<InstallationGuideStep[]>([]);
  const [tutorials, setTutorials] = useState<TutorialSection[]>([]);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [downloads, setDownloads] = useState<DownloadStatistic[]>([]);

  const loadAdminData = useCallback(async () => {
    if (!isAdmin) return;
    setLoadingAdminData(true);
    try {
      const [vSnap, sSnap, gSnap, tSnap, fSnap, mSnap, dSnap] = await Promise.all([
        getDocs(collection(db, 'appVersions')),
        getDocs(collection(db, 'appScreenshots')),
        getDocs(collection(db, 'installationGuides')),
        getDocs(collection(db, 'tutorials')),
        getDocs(collection(db, 'faqs')),
        getDocs(collection(db, 'supportMessages')),
        getDocs(collection(db, 'downloadStatistics'))
      ]);

      setVersions(
        vSnap.docs
          .map((d) => ({ id: d.id, ...(d.data() as Omit<AppVersion, 'id'>) }))
          .sort((a, b) => (b.versionCode ?? 0) - (a.versionCode ?? 0))
      );
      setScreenshots(
        sSnap.docs
          .map((d) => ({ id: d.id, ...(d.data() as Omit<AppScreenshot, 'id'>) }))
          .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
      );
      setGuides(
        gSnap.docs
          .map((d) => ({ id: d.id, ...(d.data() as Omit<InstallationGuideStep, 'id'>) }))
          .sort((a, b) => (a.stepNumber ?? 0) - (b.stepNumber ?? 0))
      );
      setTutorials(
        tSnap.docs
          .map((d) => ({ id: d.id, ...(d.data() as Omit<TutorialSection, 'id'>) }))
          .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
      );
      setFaqs(
        fSnap.docs
          .map((d) => ({ id: d.id, ...(d.data() as Omit<FaqItem, 'id'>) }))
          .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
      );
      setMessages(
        mSnap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<SupportMessage, 'id'>) }))
      );
      setDownloads(
        dSnap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<DownloadStatistic, 'id'>) }))
      );
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, 'admin_dashboard');
    } finally {
      setLoadingAdminData(false);
    }
  }, [isAdmin]);

  useEffect(() => {
    if (isAdmin) {
      void loadAdminData();
    }
  }, [isAdmin, loadAdminData]);

  const handleRefreshAll = async () => {
    await Promise.all([loadAdminData(), refreshPublicData()]);
  };

  const handleSeedDefaults = async () => {
    if (!user) return;
    setSeeding(true);
    setSeedMessage(null);
    try {
      const batch = writeBatch(db);
      if (screenshots.length === 0) {
        DEFAULT_SCREENSHOTS.forEach((item) => {
          batch.set(doc(db, 'appScreenshots', item.id), {
            titleEn: item.titleEn,
            titleSw: item.titleSw,
            captionEn: item.captionEn,
            captionSw: item.captionSw,
            imageUrl: item.imageUrl,
            storagePath: item.storagePath,
            sortOrder: item.sortOrder,
            status: item.status,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
        });
      }
      if (guides.length === 0) {
        DEFAULT_INSTALLATION_GUIDES.forEach((step) => {
          batch.set(doc(db, 'installationGuides', step.id), {
            stepNumber: step.stepNumber,
            titleEn: step.titleEn,
            titleSw: step.titleSw,
            descriptionEn: step.descriptionEn,
            descriptionSw: step.descriptionSw,
            tipEn: step.tipEn,
            tipSw: step.tipSw,
            imageUrl: step.imageUrl,
            status: step.status,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
        });
      }
      if (tutorials.length === 0) {
        DEFAULT_TUTORIALS.forEach((tut) => {
          batch.set(doc(db, 'tutorials', tut.id), {
            slug: tut.slug,
            category: tut.category,
            sortOrder: tut.sortOrder,
            titleEn: tut.titleEn,
            titleSw: tut.titleSw,
            summaryEn: tut.summaryEn,
            summarySw: tut.summarySw,
            contentEn: tut.contentEn,
            contentSw: tut.contentSw,
            imageUrl: tut.imageUrl,
            videoUrl: tut.videoUrl,
            status: tut.status,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
        });
      }
      if (faqs.length === 0) {
        DEFAULT_FAQS.forEach((faq) => {
          batch.set(doc(db, 'faqs', faq.id), {
            category: faq.category,
            sortOrder: faq.sortOrder,
            questionEn: faq.questionEn,
            questionSw: faq.questionSw,
            answerEn: faq.answerEn,
            answerSw: faq.answerSw,
            status: faq.status,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
        });
      }

      batch.set(doc(db, 'websiteSettings', 'global'), {
        brandName: DEFAULT_WEBSITE_SETTINGS.brandName,
        supportEmail: DEFAULT_WEBSITE_SETTINGS.supportEmail,
        supportPhone: DEFAULT_WEBSITE_SETTINGS.supportPhone,
        whatsappNumber: DEFAULT_WEBSITE_SETTINGS.whatsappNumber,
        officeAddressEn: DEFAULT_WEBSITE_SETTINGS.officeAddressEn,
        officeAddressSw: DEFAULT_WEBSITE_SETTINGS.officeAddressSw,
        heroHeadlineEn: DEFAULT_WEBSITE_SETTINGS.heroHeadlineEn,
        heroHeadlineSw: DEFAULT_WEBSITE_SETTINGS.heroHeadlineSw,
        heroSubheadlineEn: DEFAULT_WEBSITE_SETTINGS.heroSubheadlineEn,
        heroSubheadlineSw: DEFAULT_WEBSITE_SETTINGS.heroSubheadlineSw,
        showDownloadCounter: DEFAULT_WEBSITE_SETTINGS.showDownloadCounter,
        updatedBy: user.uid,
        updatedAt: serverTimestamp()
      });

      await batch.commit();
      setSeedMessage('Default bilingual guides, tutorials, FAQs, screenshots, and settings initialized in Firestore.');
      await handleRefreshAll();
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'seed_defaults');
    } finally {
      setSeeding(false);
    }
  };

  if (!authReady || checkingAdmin) {
    return (
      <div className="min-h-screen bg-[#F4F6F9] flex items-center justify-center p-6">
        <div className="text-sm font-medium text-slate-600">
          Verifying administrator session...
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F4F6F9] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8">
          <div className="flex items-center gap-3">
            <BrandMark className="w-9 h-9" />
            <div>
              <h1 className="font-display text-xl font-bold text-[#0B1F3A]">
                FundiQuotations Admin
              </h1>
              <p className="text-xs text-slate-500">Protected Administration Portal</p>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-[#F4F6F9] border border-slate-200 flex items-start gap-3">
            <Lock className="w-5 h-5 text-[#0B1F3A] shrink-0 mt-0.5" />
            <p className="text-sm text-slate-600 leading-relaxed">
              Sign in with an authorized Google administrator account to upload Customer APKs,
              manage guides, and review support messages.
            </p>
          </div>

          {authError && (
            <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
              {authError}
            </div>
          )}

          <button
            type="button"
            onClick={() => void signInWithGoogle()}
            className="mt-6 w-full py-3 px-4 text-sm font-semibold text-[#0B1F3A] bg-[#EAB308] hover:bg-[#D99B16] rounded-lg transition-colors"
          >
            Sign In with Google
          </button>

          <div className="mt-6 pt-5 border-t border-slate-200 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-[#0B1F3A]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Portal</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#F4F6F9] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 text-center">
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-700 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h1 className="mt-4 font-display text-xl font-bold text-[#0B1F3A]">
            Administrator Access Required
          </h1>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            The signed-in account (<span className="font-mono">{user.email}</span>) is not listed
            as an authorized FundiQuotations portal administrator.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => void signOutUser()}
              className="px-4 py-2 text-sm font-semibold text-white bg-[#0B1F3A] rounded-lg hover:bg-[#163A66]"
            >
              Sign Out
            </button>
            <Link
              to="/"
              className="px-4 py-2 text-sm font-semibold text-[#0B1F3A] border border-slate-300 rounded-lg hover:bg-slate-50"
            >
              Back to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const publishedApk = versions.find((v) => v.status === 'published' && v.isLatest) ?? null;
  const openMessagesCount = messages.filter((m) => m.status !== 'resolved').length;
  const activeNav = NAV_ITEMS.find((n) => n.id === activeTab)!;

  return (
    <div className="min-h-screen bg-[#F4F6F9] flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="lg:w-64 bg-[#0B1F3A] text-white shrink-0 flex flex-col justify-between">
        <div>
          <div className="h-16 px-5 flex items-center gap-2.5 border-b border-[#163A66]">
            <BrandMark className="w-7 h-7" />
            <span className="font-display text-base font-bold tracking-tight">
              Admin Console
            </span>
          </div>

          <nav className="p-3 flex lg:flex-col gap-1 overflow-x-auto" aria-label="Admin sections">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    active
                      ? 'bg-[#EAB308] text-[#0B1F3A] font-semibold'
                      : 'text-slate-300 hover:bg-[#163A66] hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="hidden lg:block p-4 border-t border-[#163A66] space-y-3">
          <div className="text-xs text-slate-300 truncate">{user.email}</div>
          <div className="flex items-center justify-between gap-2">
            <Link
              to="/"
              className="text-xs font-medium text-slate-300 hover:text-[#EAB308]"
            >
              Public Site
            </Link>
            <button
              type="button"
              onClick={() => void signOutUser()}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-200 hover:text-white"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between gap-4">
          <div className="text-sm font-medium text-slate-500">
            Admin <span className="mx-1.5">/</span>
            <span className="font-semibold text-[#0B1F3A]">{activeNav.label}</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/download"
              className="text-xs font-semibold text-[#0B1F3A] hover:underline whitespace-nowrap"
            >
              View Public Download Page
            </Link>
            <button
              type="button"
              onClick={() => void signOutUser()}
              className="lg:hidden inline-flex items-center gap-1 text-xs font-semibold text-[#0B1F3A]"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </header>

        <main className="p-6 lg:p-8 max-w-6xl w-full">
          {loadingAdminData && (
            <div className="mb-4 text-xs font-medium text-slate-500">
              Synchronizing Firestore records...
            </div>
          )}

          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200 rounded-xl p-5">
                  <div className="text-xs text-slate-500">Published Customer APK</div>
                  <div className="mt-1.5 font-mono text-xl font-bold text-[#0B1F3A] tabular-nums">
                    {publishedApk ? `v${publishedApk.versionName}` : 'None'}
                  </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-5">
                  <div className="text-xs text-slate-500">Tracked APK Downloads</div>
                  <div className="mt-1.5 font-mono text-xl font-bold text-[#0B1F3A] tabular-nums">
                    {downloads.length}
                  </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-5">
                  <div className="text-xs text-slate-500">Open Support Messages</div>
                  <div className="mt-1.5 font-mono text-xl font-bold text-[#0B1F3A] tabular-nums">
                    {openMessagesCount}
                  </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-5">
                  <div className="text-xs text-slate-500">Tutorials & FAQs</div>
                  <div className="mt-1.5 font-mono text-xl font-bold text-[#0B1F3A] tabular-nums">
                    {tutorials.length} / {faqs.length}
                  </div>
                </div>
              </div>

              {/* Launch Readiness Checklist */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="font-display text-base font-bold text-[#0B1F3A]">
                      Portal Launch Readiness Checklist
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Verify core portal configuration, legal pages, and Customer APK publishing before sharing publicly.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-[#F4F6F9] border border-slate-200 flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-semibold text-[#0B1F3A]">
                          Contact & Legal Pages
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                          {settings.supportEmail} · {settings.supportPhone} · Morogoro Region
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('settings')}
                      className="text-xs font-semibold text-[#0B1F3A] hover:underline shrink-0"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F4F6F9] border border-slate-200 flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      {publishedApk ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div className="text-sm font-semibold text-[#0B1F3A]">
                          Customer APK Release
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                          {publishedApk
                            ? `v${publishedApk.versionName} published`
                            : 'Upload & publish your first Android APK'}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('apk')}
                      className="text-xs font-semibold text-[#0B1F3A] hover:underline shrink-0"
                    >
                      {publishedApk ? 'Manage' : 'Upload'}
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F4F6F9] border border-slate-200 flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      {guides.length > 0 && tutorials.length > 0 && faqs.length > 0 ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div className="text-sm font-semibold text-[#0B1F3A]">
                          Firestore Content Sync
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                          {screenshots.length} screens · {guides.length} steps · {tutorials.length} guides
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('screenshots')}
                      className="text-xs font-semibold text-[#0B1F3A] hover:underline shrink-0"
                    >
                      Open
                    </button>
                  </div>
                </div>
              </div>

              {/* Firestore Seed Card */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-display text-base font-bold text-[#0B1F3A]">
                    Initialize Default Portal Content in Firestore
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    Populates empty Firestore collections (screenshots, 6 install steps, 10 user
                    tutorials, 6 FAQs, and global settings) so you can customize them here.
                  </p>
                </div>
                <button
                  type="button"
                  disabled={seeding}
                  onClick={() => void handleSeedDefaults()}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#0B1F3A] bg-[#EAB308] hover:bg-[#D99B16] rounded-lg whitespace-nowrap shrink-0"
                >
                  <Database className="w-4 h-4" />
                  <span>{seeding ? 'Initializing...' : 'Sync Defaults to Firestore'}</span>
                </button>
              </div>

              {seedMessage && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-900">
                  {seedMessage}
                </div>
              )}

              {/* Download Statistics Table */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200">
                  <h2 className="font-display text-base font-bold text-[#0B1F3A]">
                    Recent Customer APK Downloads
                  </h2>
                </div>
                {downloads.length === 0 ? (
                  <div className="p-8 text-center text-sm text-slate-500">
                    No Customer APK downloads have been logged yet.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-[#F4F6F9] text-slate-600 border-b border-slate-200">
                        <tr>
                          <th className="px-5 py-3 font-semibold">Version</th>
                          <th className="px-5 py-3 font-semibold">Channel</th>
                          <th className="px-5 py-3 font-semibold">Source Page</th>
                          <th className="px-5 py-3 font-semibold">Language</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {downloads.slice(0, 15).map((dl) => (
                          <tr key={dl.id}>
                            <td className="px-5 py-3 font-mono font-semibold text-[#0B1F3A] tabular-nums">
                              v{dl.versionName}
                            </td>
                            <td className="px-5 py-3 text-slate-600">{dl.apkChannel}</td>
                            <td className="px-5 py-3 text-slate-600">{dl.sourcePage}</td>
                            <td className="px-5 py-3 font-mono text-slate-600">
                              {dl.language.toUpperCase()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {(activeTab === 'apk' || activeTab === 'versions') && (
            <AdminApkSection
              mode={activeTab === 'apk' ? 'upload' : 'versions'}
              versions={versions}
              adminUid={user.uid}
              onRefresh={handleRefreshAll}
            />
          )}

          {(activeTab === 'screenshots' ||
            activeTab === 'guides' ||
            activeTab === 'tutorials' ||
            activeTab === 'faqs') && (
            <AdminContentSection
              section={activeTab}
              screenshots={screenshots}
              guides={guides}
              tutorials={tutorials}
              faqs={faqs}
              onRefresh={handleRefreshAll}
            />
          )}

          {activeTab === 'support' && (
            <AdminSupportSection messages={messages} onRefresh={handleRefreshAll} />
          )}

          {activeTab === 'settings' && (
            <AdminSettingsSection
              settings={settings}
              adminUid={user.uid}
              onRefresh={handleRefreshAll}
            />
          )}
        </main>
      </div>
    </div>
  );
}
