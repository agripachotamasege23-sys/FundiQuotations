import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import {
  AppScreenshot,
  AppVersion,
  FaqItem,
  InstallationGuideStep,
  TutorialSection,
  WebsiteSettings
} from '../types/portal';
import {
  APP_SCREENSHOT_PATHS,
  DEFAULT_FAQS,
  DEFAULT_INSTALLATION_GUIDES,
  DEFAULT_SCREENSHOTS,
  DEFAULT_TUTORIALS,
  DEFAULT_WEBSITE_SETTINGS
} from '../data/defaultContent';

interface PortalDataContextValue {
  latestVersion: AppVersion | null;
  publishedVersions: AppVersion[];
  screenshots: AppScreenshot[];
  installationGuides: InstallationGuideStep[];
  tutorials: TutorialSection[];
  faqs: FaqItem[];
  settings: WebsiteSettings;
  loading: boolean;
  error: string | null;
  refreshPublicData: () => Promise<void>;
}

const PortalDataContext = createContext<PortalDataContextValue | undefined>(undefined);

export function PortalDataProvider({ children }: { children: React.ReactNode }) {
  const [latestVersion, setLatestVersion] = useState<AppVersion | null>(null);
  const [publishedVersions, setPublishedVersions] = useState<AppVersion[]>([]);
  const [screenshots, setScreenshots] = useState<AppScreenshot[]>(DEFAULT_SCREENSHOTS);
  const [installationGuides, setInstallationGuides] = useState<InstallationGuideStep[]>(
    DEFAULT_INSTALLATION_GUIDES
  );
  const [tutorials, setTutorials] = useState<TutorialSection[]>(DEFAULT_TUTORIALS);
  const [faqs, setFaqs] = useState<FaqItem[]>(DEFAULT_FAQS);
  const [settings, setSettings] = useState<WebsiteSettings>(DEFAULT_WEBSITE_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshPublicData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [
        versionsRes,
        screenshotsRes,
        guidesRes,
        tutorialsRes,
        faqsRes,
        settingsRes
      ] = await Promise.allSettled([
        getDocs(
          query(
            collection(db, 'appVersions'),
            where('status', '==', 'published'),
            where('apkChannel', '==', 'customer')
          )
        ),
        getDocs(query(collection(db, 'appScreenshots'), where('status', '==', 'published'))),
        getDocs(query(collection(db, 'installationGuides'), where('status', '==', 'published'))),
        getDocs(query(collection(db, 'tutorials'), where('status', '==', 'published'))),
        getDocs(query(collection(db, 'faqs'), where('status', '==', 'published'))),
        getDoc(doc(db, 'websiteSettings', 'global'))
      ]);

      if (versionsRes.status === 'fulfilled') {
        const fetchedVersions = versionsRes.value.docs
          .map((d) => ({ id: d.id, ...(d.data() as Omit<AppVersion, 'id'>) }))
          .filter((v) => v.apkChannel === 'customer' && v.status === 'published')
          .sort((a, b) => (b.versionCode ?? 0) - (a.versionCode ?? 0));

        setPublishedVersions(fetchedVersions);
        const explicitLatest = fetchedVersions.find((v) => v.isLatest) ?? fetchedVersions[0] ?? null;
        setLatestVersion(explicitLatest);
      } else {
        console.warn('App versions fetch skipped:', versionsRes.reason);
      }

      const legacyScreenshotMap: Record<string, string> = {
        '/src/assets/images/app_preview_quotation_1795508411190.jpg':
          DEFAULT_SCREENSHOTS[1].imageUrl,
        '/src/assets/images/app_preview_materials_1795508411729.jpg':
          DEFAULT_SCREENSHOTS[2].imageUrl,
        '/src/assets/images/app_preview_pdf_share_1795508411199.jpg':
          DEFAULT_SCREENSHOTS[0].imageUrl,
        '/assets/aistudio/Screenshot_20261125_001725_FundiQuotations_eca35f9a.jpg':
          APP_SCREENSHOT_PATHS.dashboard,
        '/assets/aistudio/Screenshot_20261125_002031_Drive_31f4a1e0.jpg':
          APP_SCREENSHOT_PATHS.pdfSample,
        '/assets/aistudio/Screenshot_20261125_020006_FundiQuotations_7fa3df8b.jpg':
          APP_SCREENSHOT_PATHS.quotationSummary,
        '/assets/aistudio/Screenshot_20261125_020831_FundiQuotations_13d8d137.jpg':
          APP_SCREENSHOT_PATHS.invoices,
        '/assets/aistudio/Screenshot_20261125_001756_FundiQuotations_218ed16b.jpg':
          APP_SCREENSHOT_PATHS.customers
      };

      if (screenshotsRes.status === 'fulfilled') {
        const fetchedScreenshots = screenshotsRes.value.docs
          .map((d) => {
            const data = d.data() as Omit<AppScreenshot, 'id'>;
            return {
              id: d.id,
              ...data,
              imageUrl: legacyScreenshotMap[data.imageUrl] ?? data.imageUrl
            };
          })
          .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
        if (fetchedScreenshots.length > 0) {
          setScreenshots(fetchedScreenshots);
        }
      }

      if (guidesRes.status === 'fulfilled') {
        const fetchedGuides = guidesRes.value.docs
          .map((d) => ({ id: d.id, ...(d.data() as Omit<InstallationGuideStep, 'id'>) }))
          .sort((a, b) => (a.stepNumber ?? 0) - (b.stepNumber ?? 0));
        if (fetchedGuides.length > 0) {
          setInstallationGuides(fetchedGuides);
        }
      }

      if (tutorialsRes.status === 'fulfilled') {
        const defaultTutorialImageById = Object.fromEntries(
          DEFAULT_TUTORIALS.map((tut) => [tut.id, tut.imageUrl])
        );

        const fetchedTutorials = tutorialsRes.value.docs
          .map((d) => {
            const data = d.data() as Omit<TutorialSection, 'id'>;
            const mappedUrl = legacyScreenshotMap[data.imageUrl];
            const isLegacyOrEmpty =
              !data.imageUrl || data.imageUrl.startsWith('/src/assets/images/');
            return {
              id: d.id,
              ...data,
              imageUrl: mappedUrl
                ? mappedUrl
                : isLegacyOrEmpty
                  ? defaultTutorialImageById[d.id] ?? ''
                  : data.imageUrl
            };
          })
          .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
        if (fetchedTutorials.length > 0) {
          setTutorials(fetchedTutorials);
        }
      }

      if (faqsRes.status === 'fulfilled') {
        const fetchedFaqs = faqsRes.value.docs
          .map((d) => {
            const data = d.data() as Omit<FaqItem, 'id'>;
            const isLegacyFaq1 =
              d.id === 'faq-1' &&
              (/sha-?256|verify authenticity/i.test(data.answerEn ?? '') ||
                /sha-?256/i.test(data.answerSw ?? ''));
            return {
              id: d.id,
              ...data,
              answerEn: isLegacyFaq1 ? DEFAULT_FAQS[0].answerEn : data.answerEn,
              answerSw: isLegacyFaq1 ? DEFAULT_FAQS[0].answerSw : data.answerSw
            };
          })
          .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
        if (fetchedFaqs.length > 0) {
          setFaqs(fetchedFaqs);
        }
      }

      if (settingsRes.status === 'fulfilled' && settingsRes.value.exists()) {
        const remote = settingsRes.value.data() as Partial<WebsiteSettings>;
        const normalizeEmail = (value: string | undefined, fallback: string) =>
          !value || value.trim() === 'support@fundiquotations.com' ? fallback : value;
        const normalizePhone = (value: string | undefined, fallback: string) =>
          !value ||
          value.trim() === '+255 700 000 100' ||
          value.trim() === '0627318891'
            ? fallback
            : value;
        const normalizeAddress = (
          value: string | undefined,
          legacyValue: string,
          fallback: string
        ) => (!value || value.trim() === legacyValue ? fallback : value);

        setSettings({
          ...DEFAULT_WEBSITE_SETTINGS,
          ...remote,
          supportEmail: normalizeEmail(
            remote.supportEmail,
            DEFAULT_WEBSITE_SETTINGS.supportEmail
          ),
          supportPhone: normalizePhone(
            remote.supportPhone,
            DEFAULT_WEBSITE_SETTINGS.supportPhone
          ),
          whatsappNumber: normalizePhone(
            remote.whatsappNumber,
            DEFAULT_WEBSITE_SETTINGS.whatsappNumber
          ),
          officeAddressEn: normalizeAddress(
            remote.officeAddressEn,
            'Dar es Salaam & Nairobi Regional Support Desk',
            DEFAULT_WEBSITE_SETTINGS.officeAddressEn
          ),
          officeAddressSw: normalizeAddress(
            remote.officeAddressSw,
            'Ofisi za Msaada Dar es Salaam na Nairobi',
            DEFAULT_WEBSITE_SETTINGS.officeAddressSw
          )
        });
      }
    } catch (err) {
      console.warn('Portal data fetch note:', err instanceof Error ? err.message : err);
      setError(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshPublicData();
  }, [refreshPublicData]);

  return (
    <PortalDataContext.Provider
      value={{
        latestVersion,
        publishedVersions,
        screenshots,
        installationGuides,
        tutorials,
        faqs,
        settings,
        loading,
        error,
        refreshPublicData
      }}
    >
      {children}
    </PortalDataContext.Provider>
  );
}

export function usePortalData() {
  const ctx = useContext(PortalDataContext);
  if (!ctx) {
    throw new Error('usePortalData must be used within a PortalDataProvider');
  }
  return ctx;
}
