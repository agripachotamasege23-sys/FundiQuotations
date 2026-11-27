import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  ChevronDown,
  Download,
  FileText,
  Layers,
  Share2,
  ShieldCheck,
  Smartphone,
  WifiOff,
  X
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePortalData } from '../context/PortalDataContext';
import { APP_SCREENSHOT_PATHS, DEFAULT_SCREENSHOTS } from '../data/defaultContent';
import { isSafePublicUrl, recordApkDownload } from '../lib/apkUtils';
import { AppScreenshot } from '../types/portal';
import { PhoneMockup } from '../components/PhoneMockup';
import { ResilientImage } from '../components/ResilientImage';

export function HomePage() {
  const { lang, t } = useLanguage();
  const { latestVersion, screenshots, faqs, settings } = usePortalData();
  const navigate = useNavigate();
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  const [activePreview, setActivePreview] = useState<AppScreenshot | null>(null);
  const [showStickyDownload, setShowStickyDownload] = useState(false);
  const [downloadingApk, setDownloadingApk] = useState(false);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);

  const canDirectDownload = Boolean(
    latestVersion &&
      latestVersion.apkChannel === 'customer' &&
      latestVersion.status === 'published' &&
      isSafePublicUrl(latestVersion.apkDownloadUrl)
  );

  const handleDirectDownload = () => {
    if (!latestVersion || !canDirectDownload) {
      navigate('/download');
      return;
    }

    setDownloadingApk(true);
    setDownloadToast(t.download.downloadStartedToast);

    // Trigger file download synchronously inside the user tap gesture
    const anchor = document.createElement('a');
    anchor.href = latestVersion.apkDownloadUrl;
    anchor.download = `FundiQuotations-Customer-v${latestVersion.versionName}.apk`;
    anchor.rel = 'noopener noreferrer';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    void recordApkDownload(latestVersion, 'home', lang);

    window.setTimeout(() => setDownloadingApk(false), 1200);
    window.setTimeout(() => setDownloadToast(null), 5000);
  };

  useEffect(() => {
    const el = heroCtaRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky bottom bar only once user scrolls past the Hero Download button
        const scrolledPast = !entry.isIntersecting && entry.boundingClientRect.top < 80;
        setShowStickyDownload(scrolledPast);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const heroHeadline =
    (lang === 'sw' ? settings.heroHeadlineSw : settings.heroHeadlineEn) ||
    t.hero.headlineFallback;
  const heroSubheadline =
    (lang === 'sw' ? settings.heroSubheadlineSw : settings.heroSubheadlineEn) ||
    t.hero.subheadlineFallback;

  const previewFaqs = faqs.slice(0, 4);

  const dashboardShot =
    screenshots.find((s) => s.imageUrl === APP_SCREENSHOT_PATHS.dashboard) ??
    DEFAULT_SCREENSHOTS[0];
  const selectItemsShot =
    screenshots.find((s) => s.imageUrl === APP_SCREENSHOT_PATHS.selectItems) ??
    DEFAULT_SCREENSHOTS[1];
  const materialsShot =
    screenshots.find((s) => s.imageUrl === APP_SCREENSHOT_PATHS.materials) ??
    DEFAULT_SCREENSHOTS[2];

  const quotationDocumentShot: AppScreenshot = {
    id: 'quotation-document-showcase',
    titleEn: t.features.items[0].title,
    titleSw: t.features.items[0].title,
    captionEn: t.features.items[0].summary,
    captionSw: t.features.items[0].summary,
    imageUrl: APP_SCREENSHOT_PATHS.pdfSample,
    storagePath: '',
    sortOrder: 4,
    status: 'published'
  };

  const shareWhatsappShot: AppScreenshot = {
    id: 'share-whatsapp-showcase',
    titleEn: t.features.items[5].title,
    titleSw: t.features.items[5].title,
    captionEn: t.features.items[5].summary,
    captionSw: t.features.items[5].summary,
    imageUrl: APP_SCREENSHOT_PATHS.shareWhatsapp,
    storagePath: '',
    sortOrder: 5,
    status: 'published'
  };

  const featureHighlights = [
    {
      icon: FileText,
      num: '01.',
      title: t.features.items[0].title,
      body: t.features.items[0].summary,
      wide: true,
      previewShot: quotationDocumentShot,
      isPreFramedGraphic: true
    },
    {
      icon: Layers,
      num: '02.',
      title: t.features.items[3].title,
      body: t.features.items[3].summary,
      wide: false,
      previewShot: materialsShot,
      isPreFramedGraphic: false
    },
    {
      icon: Share2,
      num: '03.',
      title: t.features.items[5].title,
      body: t.features.items[5].summary,
      wide: false,
      previewShot: shareWhatsappShot,
      isPreFramedGraphic: true
    },
    {
      icon: WifiOff,
      num: '04.',
      title: t.features.items[7].title,
      body: t.features.items[7].summary,
      wide: true,
      previewShot: dashboardShot,
      isPreFramedGraphic: false
    }
  ];

  return (
    <div>
      {/* 1. Hero Section with Dual Phone Mockup Banner */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#9A6B06]">
                {t.hero.kicker}
              </p>
              <h1 className="mt-3 font-display text-[clamp(2.25rem,4vw,3.5rem)] font-bold tracking-tight leading-[1.1] text-[#0B1F3A] text-balance">
                {heroHeadline}
              </h1>
              <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                {heroSubheadline}
              </p>

              <div ref={heroCtaRef} className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  disabled={downloadingApk}
                  onClick={handleDirectDownload}
                  className="w-full sm:w-auto min-w-[260px] inline-flex items-center justify-between gap-4 pl-6 pr-2.5 py-3 text-base font-bold text-[#0B1F3A] bg-[#EAB308] hover:bg-[#D99B16] disabled:opacity-70 rounded-full shadow-md shadow-[#EAB308]/25 transition-all cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B1F3A]"
                >
                  <span className="inline-flex items-center gap-2.5">
                    <Download className="w-5 h-5 shrink-0" />
                    <span>
                      {downloadingApk ? t.download.downloadingBtn : t.hero.primaryCta}
                    </span>
                    {latestVersion && !downloadingApk && (
                      <span className="font-mono text-xs font-semibold opacity-80 tabular-nums">
                        v{latestVersion.versionName}
                      </span>
                    )}
                  </span>
                  <span className="w-9 h-9 rounded-full bg-[#0B1F3A] text-white flex items-center justify-center shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>

                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-[#0B1F3A] bg-white border border-slate-300 hover:border-[#0B1F3A] hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <span>{t.hero.secondaryCta}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-slate-600">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#D99B16]" />
                  {t.hero.trust1}
                </span>
                <span aria-hidden="true" className="text-slate-300">
                  ·
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D99B16]" />
                  {t.hero.trust2}
                </span>
                <span aria-hidden="true" className="text-slate-300">
                  ·
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-[#D99B16]" />
                  {t.hero.trust3}
                </span>
              </div>
            </div>

            {/* Dual Phone Mockup Banner showcasing Dashboard first + Quotation Inventory Selection */}
            <div className="lg:col-span-6">
              <div className="relative h-full min-h-[390px] lg:min-h-[470px] rounded-2xl overflow-hidden border border-[#163A66] bg-gradient-to-br from-[#071426] via-[#0B1F3A] to-[#132C4E] flex items-center justify-center px-4 py-8 sm:px-8">
                {/* Ambient warm gold lighting matching dark phone-mockup banner */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_35%_35%,rgba(234,179,8,0.16),transparent_55%),radial-gradient(circle_at_78%_72%,rgba(22,58,102,0.55),transparent_55%)]"
                />

                <div className="relative z-10 flex items-center justify-center">
                  {/* First Primary Phone: Dashboard */}
                  <button
                    type="button"
                    onClick={() => setActivePreview(dashboardShot)}
                    aria-label={lang === 'sw' ? dashboardShot.titleSw : dashboardShot.titleEn}
                    className="relative z-20 -mr-7 sm:-mr-10 -translate-y-2 transition-transform duration-200 hover:-translate-y-3 focus-visible:outline-2 focus-visible:outline-[#EAB308] rounded-[2.25rem]"
                  >
                    <PhoneMockup
                      src={APP_SCREENSHOT_PATHS.dashboard}
                      alt={lang === 'sw' ? dashboardShot.titleSw : dashboardShot.titleEn}
                      size="md"
                      className="-rotate-[4deg]"
                    />
                  </button>

                  {/* Second Overlapping Phone: Select Items from Inventory */}
                  <button
                    type="button"
                    onClick={() => setActivePreview(selectItemsShot)}
                    aria-label={lang === 'sw' ? selectItemsShot.titleSw : selectItemsShot.titleEn}
                    className="relative z-10 translate-y-6 transition-transform duration-200 hover:translate-y-4 focus-visible:outline-2 focus-visible:outline-[#EAB308] rounded-[2.1rem]"
                  >
                    <PhoneMockup
                      src={APP_SCREENSHOT_PATHS.selectItems}
                      alt={lang === 'sw' ? selectItemsShot.titleSw : selectItemsShot.titleEn}
                      size="sm"
                      className="rotate-[7deg]"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Android App Preview & Screenshots inside Phone Mockup Banners */}
      <section className="py-16 lg:py-20 bg-[#F4F6F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1F3A] text-balance">
              {t.home.screenshotsTitle}
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              {t.home.screenshotsSubtitle}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {screenshots.map((shot) => {
              const title = lang === 'sw' ? shot.titleSw : shot.titleEn;
              const caption = lang === 'sw' ? shot.captionSw : shot.captionEn;
              return (
                <button
                  key={shot.id}
                  type="button"
                  onClick={() => setActivePreview(shot)}
                  className="group text-left bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-[#0B1F3A]/40 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B1F3A] flex flex-col"
                >
                  <div className="relative bg-gradient-to-br from-[#071426] via-[#0B1F3A] to-[#163A66] py-7 px-4 flex items-center justify-center overflow-hidden">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(234,179,8,0.14),transparent_60%)]"
                    />
                    <PhoneMockup
                      src={shot.imageUrl}
                      alt={title}
                      size="sm"
                      className="relative z-10 transition-transform duration-200 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-5 border-t border-slate-100 flex-1">
                    <h3 className="font-display text-base font-semibold text-[#0B1F3A]">
                      {title}
                    </h3>
                    <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{caption}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Core Features Asymmetric Bento ("Everything a Modern Fundi or Contracting Business Needs") */}
      <section className="py-16 lg:py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1F3A] text-balance">
                {t.home.featuresTitle}
              </h2>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                {t.home.featuresSubtitle}
              </p>
            </div>
            <Link
              to="/features"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B1F3A] hover:text-[#9A6B06] whitespace-nowrap shrink-0"
            >
              <span>{t.home.viewAllFeatures}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {featureHighlights.map((item) => {
              const Icon = item.icon;
              const previewTitle = item.previewShot
                ? lang === 'sw'
                  ? item.previewShot.titleSw
                  : item.previewShot.titleEn
                : '';

              if (item.wide && item.previewShot) {
                const shot = item.previewShot;
                return (
                  <div
                    key={item.num}
                    className="md:col-span-2 p-7 bg-[#F4F6F9] border border-slate-200 rounded-xl grid grid-cols-1 sm:grid-cols-12 gap-6 items-center"
                  >
                    <div className="sm:col-span-7 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="font-mono text-xs font-semibold text-[#9A6B06] tabular-nums">
                            {item.num}
                          </span>
                          <Icon className="w-5 h-5 text-[#0B1F3A]" />
                        </div>
                        <h3 className="mt-4 font-display text-xl font-bold text-[#0B1F3A]">
                          {item.title}
                        </h3>
                        <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
                          {item.body}
                        </p>
                      </div>
                      <div className="mt-5 pt-4 border-t border-slate-200/80">
                        <button
                          type="button"
                          onClick={() => setActivePreview(shot)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B1F3A] hover:text-[#9A6B06] transition-colors"
                        >
                          <Smartphone className="w-3.5 h-3.5 text-[#D99B16]" />
                          <span>{previewTitle}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="sm:col-span-5">
                      <button
                        type="button"
                        onClick={() => setActivePreview(shot)}
                        aria-label={previewTitle}
                        className="w-full relative bg-gradient-to-br from-[#071426] via-[#0B1F3A] to-[#163A66] rounded-xl py-5 px-4 flex items-center justify-center overflow-hidden border border-[#163A66] group"
                      >
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(234,179,8,0.16),transparent_60%)]"
                        />
                        {shot.imageUrl === APP_SCREENSHOT_PATHS.pdfSample ? (
                          <div className="relative z-10 w-[180px] sm:w-[210px] rounded-xl overflow-hidden ring-1 ring-white/25 shadow-[0_20px_45px_-12px_rgba(3,9,20,0.7)] transition-transform duration-200 group-hover:scale-[1.03]">
                            <ResilientImage
                              src={shot.imageUrl}
                              alt={previewTitle}
                              className="w-full h-auto object-contain"
                            />
                          </div>
                        ) : (
                          <PhoneMockup
                            src={shot.imageUrl}
                            alt={previewTitle}
                            size="xs"
                            className="relative z-10 transition-transform duration-200 group-hover:scale-[1.03]"
                          />
                        )}
                      </button>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={item.num}
                  className="md:col-span-1 p-7 bg-[#F4F6F9] border border-slate-200 rounded-xl flex flex-col justify-between gap-5"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-mono text-xs font-semibold text-[#9A6B06] tabular-nums">
                        {item.num}
                      </span>
                      <Icon className="w-5 h-5 text-[#0B1F3A]" />
                    </div>
                    <h3 className="mt-4 font-display text-xl font-bold text-[#0B1F3A]">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
                      {item.body}
                    </p>
                  </div>

                  {item.previewShot && item.isPreFramedGraphic ? (
                    <button
                      type="button"
                      onClick={() => setActivePreview(item.previewShot)}
                      aria-label={previewTitle}
                      className="w-full relative bg-gradient-to-br from-[#071426] via-[#0B1F3A] to-[#163A66] rounded-xl py-4 px-4 flex items-center justify-center overflow-hidden border border-[#163A66] group"
                    >
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(234,179,8,0.16),transparent_60%)]"
                      />
                      <div className="relative z-10 w-[166px] sm:w-[180px] aspect-[9/18.2] rounded-xl overflow-hidden bg-white ring-1 ring-white/25 shadow-[0_20px_45px_-12px_rgba(3,9,20,0.7)] transition-transform duration-200 group-hover:scale-[1.03]">
                        <ResilientImage
                          src={item.previewShot.imageUrl}
                          alt={previewTitle}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </button>
                  ) : (
                    item.previewShot && (
                      <button
                        type="button"
                        onClick={() => setActivePreview(item.previewShot)}
                        aria-label={previewTitle}
                        className="w-full relative bg-gradient-to-br from-[#071426] via-[#0B1F3A] to-[#163A66] rounded-xl py-5 px-4 flex items-center justify-center overflow-hidden border border-[#163A66] group"
                      >
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(234,179,8,0.16),transparent_60%)]"
                        />
                        <PhoneMockup
                          src={item.previewShot.imageUrl}
                          alt={previewTitle}
                          size="xs"
                          className="relative z-10 transition-transform duration-200 group-hover:scale-[1.03]"
                        />
                      </button>
                    )
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. How It Works (Hatua za Utengenezaji Quotations) */}
      <section id="how-it-works" className="py-16 lg:py-20 bg-[#F4F6F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1F3A] text-balance">
                {t.home.howItWorksTitle}
              </h2>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                {t.home.howItWorksSubtitle}
              </p>
            </div>
            <Link
              to="/user-guide"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B1F3A] hover:text-[#9A6B06] whitespace-nowrap shrink-0"
            >
              <span>{t.nav.userGuide}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.home.howSteps.map((step, idx) => {
              const stepScreens = [
                APP_SCREENSHOT_PATHS.settings,
                APP_SCREENSHOT_PATHS.materials,
                APP_SCREENSHOT_PATHS.selectItems,
                APP_SCREENSHOT_PATHS.quotationSummary
              ];
              const stepImage = stepScreens[idx] ?? APP_SCREENSHOT_PATHS.dashboard;
              const stepShot: AppScreenshot = {
                id: `how-step-${step.number}`,
                titleEn: `${step.number} ${step.title}`,
                titleSw: `${step.number} ${step.title}`,
                captionEn: step.body,
                captionSw: step.body,
                imageUrl: stepImage,
                storagePath: '',
                sortOrder: idx + 1,
                status: 'published'
              };

              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setActivePreview(stepShot)}
                  className="group text-left bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-[#0B1F3A]/40 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B1F3A] flex flex-col justify-between"
                >
                  <div className="relative bg-gradient-to-br from-[#071426] via-[#0B1F3A] to-[#163A66] py-6 px-4 flex items-center justify-center overflow-hidden border-b border-[#163A66]">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(234,179,8,0.16),transparent_60%)]"
                    />
                    <span className="absolute top-3 left-3.5 z-20 font-mono text-xs font-bold text-[#EAB308] tabular-nums">
                      {step.number}
                    </span>
                    <PhoneMockup
                      src={stepImage}
                      alt={step.title}
                      size="xs"
                      className="relative z-10 transition-transform duration-200 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-lg font-bold text-[#0B1F3A]">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">{step.body}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Benefits Navy Band */}
      <section className="py-16 lg:py-20 bg-[#0B1F3A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white text-balance">
              {t.home.benefitsTitle}
            </h2>
            <p className="mt-3 text-base text-slate-300 leading-relaxed">
              {t.home.benefitsSubtitle}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.home.benefits.map((b) => (
              <div
                key={b.title}
                className="p-7 rounded-xl bg-[#0F294A] border border-[#1E4473]"
              >
                <p className="font-mono text-xs font-semibold text-[#EAB308] tracking-wide">
                  {b.metric}
                </p>
                <h3 className="mt-3 font-display text-lg font-bold text-white">{b.title}</h3>
                <p className="mt-2.5 text-sm text-slate-300 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ Preview */}
      <section className="py-16 lg:py-20 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1F3A]">
                {t.home.faqPreviewTitle}
              </h2>
              <p className="mt-2 text-base text-slate-600">{t.home.faqPreviewSubtitle}</p>
            </div>
            <Link
              to="/faq"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B1F3A] hover:text-[#9A6B06] whitespace-nowrap shrink-0"
            >
              <span>{t.home.viewAllFaqs}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
            {previewFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              const q = lang === 'sw' ? faq.questionSw : faq.questionEn;
              const a = lang === 'sw' ? faq.answerSw : faq.answerEn;
              return (
                <div key={faq.id} className="py-4">
                  <button
                    type="button"
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 text-left py-1.5 focus-visible:outline-2 focus-visible:outline-[#0B1F3A] rounded"
                  >
                    <span className="font-display text-base font-semibold text-[#0B1F3A]">
                      {q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-150 ${
                        isOpen ? 'rotate-180 text-[#0B1F3A]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed pr-8">
                      {a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Bottom Conversion Callout */}
      <section className="py-16 bg-[#F4F6F9]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1F3A] text-balance">
                {t.home.ctaBannerTitle}
              </h2>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                {t.home.ctaBannerSubtitle}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <button
                type="button"
                disabled={downloadingApk}
                onClick={handleDirectDownload}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#0B1F3A] bg-[#EAB308] hover:bg-[#D99B16] disabled:opacity-70 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                <Download className="w-4 h-4" />
                <span>{downloadingApk ? t.download.downloadingBtn : t.nav.downloadApk}</span>
              </button>
              <Link
                to="/install-guide"
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-[#0B1F3A] border border-slate-300 hover:border-[#0B1F3A] rounded-lg transition-colors whitespace-nowrap"
              >
                <span>{t.nav.installGuide}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshot Zoom Modal inside Phone Mockup */}
      {activePreview && (
        <div
          className="fixed inset-0 z-50 bg-[#071426]/85 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActivePreview(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full overflow-hidden border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
              <h3 className="font-display text-base font-bold text-[#0B1F3A]">
                {lang === 'sw' ? activePreview.titleSw : activePreview.titleEn}
              </h3>
              <button
                type="button"
                onClick={() => setActivePreview(null)}
                aria-label="Close preview"
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-[#0B1F3A]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative bg-gradient-to-br from-[#071426] via-[#0B1F3A] to-[#163A66] py-7 px-6 flex items-center justify-center">
              {activePreview.imageUrl === APP_SCREENSHOT_PATHS.shareWhatsapp ? (
                <div className="w-[240px] sm:w-[270px] aspect-[9/18.2] rounded-2xl overflow-hidden bg-white ring-1 ring-white/25 shadow-[0_24px_55px_-14px_rgba(3,9,20,0.75)]">
                  <ResilientImage
                    src={activePreview.imageUrl}
                    alt={lang === 'sw' ? activePreview.titleSw : activePreview.titleEn}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              ) : activePreview.imageUrl === APP_SCREENSHOT_PATHS.pdfSample ? (
                <div className="w-full max-w-[320px] max-h-[70vh] rounded-xl overflow-hidden ring-1 ring-white/25 shadow-[0_24px_55px_-14px_rgba(3,9,20,0.75)] flex items-center justify-center">
                  <ResilientImage
                    src={activePreview.imageUrl}
                    alt={lang === 'sw' ? activePreview.titleSw : activePreview.titleEn}
                    className="w-full h-auto max-h-[70vh] object-contain"
                  />
                </div>
              ) : (
                <PhoneMockup
                  src={activePreview.imageUrl}
                  alt={lang === 'sw' ? activePreview.titleSw : activePreview.titleEn}
                  size="lg"
                />
              )}
            </div>
            <div className="p-5 text-sm text-slate-600 leading-relaxed">
              {lang === 'sw' ? activePreview.captionSw : activePreview.captionEn}
            </div>
          </div>
        </div>
      )}

      {/* Download Started Feedback Toast */}
      {downloadToast && (
        <div
          role="status"
          className={`fixed left-1/2 -translate-x-1/2 z-40 px-4 w-full max-w-md ${
            showStickyDownload && !activePreview ? 'bottom-20' : 'bottom-5'
          }`}
        >
          <div className="bg-[#0B1F3A] text-white border border-[#163A66] rounded-xl px-4 py-3 shadow-xl flex items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 min-w-0">
              <Check className="w-4 h-4 text-[#EAB308] shrink-0" />
              <span>{downloadToast}</span>
            </div>
            <button
              type="button"
              onClick={() => setDownloadToast(null)}
              aria-label="Close notification"
              className="p-1 rounded-md text-slate-300 hover:text-white hover:bg-[#163A66] shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Sticky Bottom Floating Download Bar on Scroll */}
      {showStickyDownload && !activePreview && (
        <div className="fixed bottom-4 left-0 right-0 z-30 px-4 pointer-events-none">
          <div className="max-w-md mx-auto pointer-events-auto">
            <button
              type="button"
              disabled={downloadingApk}
              onClick={handleDirectDownload}
              className="w-full flex items-center justify-between gap-3 pl-6 pr-2.5 py-2.5 rounded-full bg-[#EAB308] hover:bg-[#D99B16] disabled:opacity-70 text-[#0B1F3A] shadow-[0_14px_34px_-6px_rgba(11,31,58,0.45)] ring-1 ring-[#0B1F3A]/15 transition-all cursor-pointer"
            >
              <span className="w-8 h-8 rounded-full bg-[#0B1F3A]/10 flex items-center justify-center shrink-0">
                <Download className="w-4 h-4 text-[#0B1F3A]" />
              </span>
              <span className="font-display text-base font-bold tracking-tight text-center">
                {downloadingApk ? t.download.downloadingBtn : t.hero.primaryCta}
                {latestVersion && !downloadingApk && (
                  <span className="ml-2 font-mono text-xs font-semibold opacity-80 tabular-nums">
                    v{latestVersion.versionName}
                  </span>
                )}
              </span>
              <span className="w-9 h-9 rounded-full bg-[#0B1F3A] text-white flex items-center justify-center shrink-0">
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
