import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Check,
  Download,
  FileCheck2,
  FileText,
  Package,
  Receipt,
  Share2,
  Users,
  WifiOff,
  X
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { APP_SCREENSHOT_PATHS } from '../data/defaultContent';
import { ResilientImage } from '../components/ResilientImage';
import { PhoneMockup } from '../components/PhoneMockup';

const FEATURE_ICONS = [
  FileText,
  Receipt,
  Users,
  Package,
  FileCheck2,
  Share2,
  Building2,
  WifiOff
];

interface FeatureVisual {
  src: string;
  mode: 'phone' | 'framed';
  aspectClass?: string;
  modalClass?: string;
  objectClass?: string;
}

const FEATURE_VISUALS: Record<string, FeatureVisual> = {
  quotations: {
    src: APP_SCREENSHOT_PATHS.quotationSummary,
    mode: 'phone'
  },
  invoices: {
    src: APP_SCREENSHOT_PATHS.invoices,
    mode: 'phone'
  },
  customers: {
    src: APP_SCREENSHOT_PATHS.customers,
    mode: 'phone'
  },
  materials: {
    src: APP_SCREENSHOT_PATHS.materials,
    mode: 'phone'
  },
  pdf: {
    src: APP_SCREENSHOT_PATHS.pdfSample,
    mode: 'framed',
    aspectClass: 'w-[190px] sm:w-[220px]',
    modalClass: 'w-full max-w-[320px] max-h-[70vh]',
    objectClass: 'w-full h-auto max-h-[70vh] object-contain'
  },
  sharing: {
    src: APP_SCREENSHOT_PATHS.shareWhatsapp,
    mode: 'framed',
    aspectClass: 'aspect-[9/18.2] w-[170px] sm:w-[186px]',
    modalClass: 'aspect-[9/18.2] w-[250px] sm:w-[270px]',
    objectClass: 'h-full object-cover object-top'
  },
  branding: {
    src: APP_SCREENSHOT_PATHS.settings,
    mode: 'phone'
  },
  offline: {
    src: APP_SCREENSHOT_PATHS.dashboard,
    mode: 'phone'
  }
};

export function FeaturesPage() {
  const { t } = useLanguage();
  const [zoomedFeature, setZoomedFeature] = useState<{
    title: string;
    summary: string;
    visual: FeatureVisual;
  } | null>(null);

  return (
    <div className="bg-[#F4F6F9]">
      {/* Header */}
      <section className="bg-[#0B1F3A] text-white py-14 lg:py-20 border-b border-[#163A66]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
              {t.features.pageTitle}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              {t.features.pageSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Offline Guarantee Summary */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-lg bg-[#0B1F3A] text-[#EAB308] flex items-center justify-center shrink-0">
              <WifiOff className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-[#0B1F3A]">
                {t.features.offlineBadgeTitle}
              </h2>
              <p className="mt-1 text-sm text-slate-600 leading-relaxed max-w-3xl">
                {t.features.offlineBadgeBody}
              </p>
            </div>
          </div>
          <Link
            to="/download"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#0B1F3A] bg-[#EAB308] hover:bg-[#D99B16] rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>{t.nav.downloadApk}</span>
          </Link>
        </div>
      </section>

      {/* All 8 Feature Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.features.items.map((item, idx) => {
            const Icon = FEATURE_ICONS[idx] || FileText;
            const visual = FEATURE_VISUALS[item.id];
            return (
              <article
                key={item.id}
                className="bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-xs font-semibold text-[#9A6B06] tabular-nums">
                      {item.number}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-slate-100 text-[#0B1F3A] flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h2 className="mt-4 font-display text-xl font-bold text-[#0B1F3A]">
                    {item.title}
                  </h2>
                  <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                {visual && (
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() =>
                        setZoomedFeature({
                          title: item.title,
                          summary: item.summary,
                          visual
                        })
                      }
                      aria-label={item.title}
                      className="w-full relative bg-gradient-to-br from-[#071426] via-[#0B1F3A] to-[#163A66] rounded-xl py-5 px-4 flex items-center justify-center overflow-hidden border border-[#163A66] group"
                    >
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(234,179,8,0.16),transparent_60%)]"
                      />
                      {visual.mode === 'phone' ? (
                        <PhoneMockup
                          src={visual.src}
                          alt={item.title}
                          size="xs"
                          className="relative z-10 transition-transform duration-200 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div
                          className={`relative z-10 max-w-full rounded-xl overflow-hidden ring-1 ring-white/25 shadow-[0_20px_45px_-12px_rgba(3,9,20,0.7)] transition-transform duration-200 group-hover:scale-[1.02] ${visual.aspectClass ?? ''}`}
                        >
                          <ResilientImage
                            src={visual.src}
                            alt={item.title}
                            className={`w-full ${visual.objectClass ?? 'h-full object-cover'}`}
                          />
                        </div>
                      )}
                    </button>
                  </div>
                )}

                <ul className="mt-6 pt-5 border-t border-slate-100 space-y-2.5">
                  {item.highlights.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <Check className="w-4 h-4 text-[#D99B16] shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      {zoomedFeature && (
        <div
          className="fixed inset-0 z-50 bg-[#071426]/85 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setZoomedFeature(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
              <h3 className="font-display text-base font-bold text-[#0B1F3A]">
                {zoomedFeature.title}
              </h3>
              <button
                type="button"
                onClick={() => setZoomedFeature(null)}
                aria-label="Close preview"
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-[#0B1F3A]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative bg-gradient-to-br from-[#071426] via-[#0B1F3A] to-[#163A66] py-6 px-6 flex items-center justify-center">
              {zoomedFeature.visual.mode === 'phone' ? (
                <PhoneMockup
                  src={zoomedFeature.visual.src}
                  alt={zoomedFeature.title}
                  size="lg"
                />
              ) : (
                <div
                  className={`rounded-xl overflow-hidden ring-1 ring-white/25 shadow-[0_24px_55px_-14px_rgba(3,9,20,0.75)] flex items-center justify-center ${zoomedFeature.visual.modalClass ?? ''}`}
                >
                  <ResilientImage
                    src={zoomedFeature.visual.src}
                    alt={zoomedFeature.title}
                    className={`w-full ${zoomedFeature.visual.objectClass ?? 'h-full object-cover'}`}
                  />
                </div>
              )}
            </div>
            <div className="p-5 text-sm text-slate-600 leading-relaxed">
              {zoomedFeature.summary}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
