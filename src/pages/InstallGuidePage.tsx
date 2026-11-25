import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Download,
  FileArchive,
  FolderOpen,
  PackageCheck,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  ToggleRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePortalData } from '../context/PortalDataContext';
import { APP_SCREENSHOT_PATHS } from '../data/defaultContent';
import { ResilientImage } from '../components/ResilientImage';

function ApkMiniIcon({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const dims =
    size === 'sm'
      ? 'w-8 h-8 rounded-lg'
      : size === 'lg'
        ? 'w-12 h-12 rounded-xl'
        : 'w-10 h-10 rounded-xl';
  return (
    <span
      className={`inline-flex items-center justify-center overflow-hidden bg-[#061124] ring-1 ring-white/25 shadow-sm shrink-0 ${dims}`}
    >
      <img
        src={APP_SCREENSHOT_PATHS.appIcon}
        alt="FundiQuotations APK icon"
        className="w-full h-full object-cover scale-[1.24]"
      />
    </span>
  );
}

function StepIllustration({
  stepNumber,
  lang
}: {
  stepNumber: number;
  lang: 'en' | 'sw';
}) {
  const sw = lang === 'sw';

  return (
    <div className="w-full min-h-[216px] rounded-xl bg-gradient-to-br from-[#071426] via-[#0B1F3A] to-[#163A66] p-4 flex flex-col justify-between border border-[#163A66] relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(234,179,8,0.14),transparent_55%)]"
      />

      {/* Android mini status header */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-300 font-mono tabular-nums">
        <span className="inline-flex items-center gap-1.5">
          <Smartphone className="w-3.5 h-3.5 text-[#EAB308]" />
          <span>Android Setup</span>
        </span>
        <span>{String(stepNumber).padStart(2, '0')}/06</span>
      </div>

      {/* Step-specific realistic Android UI card */}
      <div className="relative z-10 my-3">
        {stepNumber === 1 && (
          <div className="bg-[#0E223D]/95 border border-white/15 rounded-xl p-3.5 space-y-3 shadow-lg">
            <div className="flex items-center gap-3">
              <ApkMiniIcon size="md" />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold text-white truncate">
                  FundiQuotations-Customer.apk
                </div>
                <div className="text-[11px] text-emerald-300 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3 h-3 shrink-0" />
                  <span>{sw ? 'Imepakuliwa 100%' : 'Download complete · 100%'}</span>
                </div>
              </div>
              <Download className="w-4 h-4 text-[#EAB308] shrink-0" />
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-full bg-[#EAB308] rounded-full" />
            </div>
          </div>
        )}

        {stepNumber === 2 && (
          <div className="bg-[#0E223D]/95 border border-white/15 rounded-xl overflow-hidden shadow-lg">
            <div className="px-3.5 py-2 border-b border-white/10 flex items-center gap-2 text-[11px] font-semibold text-slate-200">
              <FolderOpen className="w-3.5 h-3.5 text-[#EAB308]" />
              <span>{sw ? 'Files › Downloads' : 'My Files › Downloads'}</span>
            </div>
            <div className="p-3 space-y-2">
              <div className="flex items-center gap-2.5 p-2 rounded-lg bg-[#EAB308]/15 border border-[#EAB308]/45">
                <ApkMiniIcon size="sm" />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-white truncate">
                    FundiQuotations-Customer.apk
                  </div>
                  <div className="text-[10px] text-slate-300">
                    {sw ? 'Bonyeza kufungua' : 'Tap to install package'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 px-2 py-1 opacity-45">
                <FileArchive className="w-4 h-4 text-slate-400" />
                <div className="h-2 bg-white/20 rounded w-2/3" />
              </div>
            </div>
          </div>
        )}

        {stepNumber === 3 && (
          <div className="bg-white rounded-xl p-3.5 text-[#0B1F3A] shadow-lg space-y-3">
            <div className="flex items-center gap-3">
              <ApkMiniIcon size="md" />
              <div className="min-w-0">
                <div className="text-xs font-bold text-[#0B1F3A]">FundiQuotations</div>
                <div className="text-[11px] text-slate-500 leading-snug">
                  {sw
                    ? 'Je, unataka kusakinisha programu hii?'
                    : 'Do you want to install this app?'}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-1">
              <span className="px-2.5 py-1 text-[11px] font-medium text-slate-500">
                {sw ? 'Ghairi' : 'Cancel'}
              </span>
              <span className="px-3 py-1 rounded-md bg-[#EAB308] text-[#0B1F3A] text-[11px] font-bold inline-flex items-center gap-1">
                <PackageCheck className="w-3 h-3" />
                <span>{sw ? 'Sakinisha' : 'Install'}</span>
              </span>
            </div>
          </div>
        )}

        {stepNumber === 4 && (
          <div className="bg-white rounded-xl p-3.5 text-[#0B1F3A] shadow-lg space-y-2.5">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 pb-1.5 border-b border-slate-100">
              <ArrowLeft className="w-3.5 h-3.5 text-[#0B1F3A]" />
              <span>{sw ? 'Sakinisha programu zisizojulikana' : 'Install unknown apps'}</span>
            </div>
            <div className="flex items-center justify-between gap-3 pt-0.5">
              <div className="flex items-center gap-2.5 min-w-0">
                <ApkMiniIcon size="sm" />
                <div className="text-xs font-semibold text-[#0B1F3A] leading-tight">
                  {sw ? 'Ruhusu kutoka chanzo hiki' : 'Allow from this source'}
                </div>
              </div>
              <div
                aria-hidden="true"
                className="w-10 h-5.5 rounded-full bg-emerald-600 p-0.5 flex items-center justify-end shrink-0"
              >
                <span className="w-4.5 h-4.5 rounded-full bg-white shadow-xs" />
              </div>
            </div>
          </div>
        )}

        {stepNumber === 5 && (
          <div className="bg-white rounded-xl p-3.5 text-[#0B1F3A] shadow-lg space-y-3">
            <div className="flex items-center gap-3">
              <ApkMiniIcon size="md" />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-[#0B1F3A]">FundiQuotations</div>
                <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>{sw ? 'Inasakinisha programu...' : 'Installing application...'}</span>
                </div>
              </div>
            </div>
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full w-4/5 bg-[#0B1F3A] rounded-full relative">
                <span className="absolute right-0 top-0 bottom-0 w-3 bg-[#EAB308]" />
              </div>
            </div>
          </div>
        )}

        {stepNumber >= 6 && (
          <div className="bg-white rounded-xl p-3.5 text-[#0B1F3A] shadow-lg space-y-3">
            <div className="flex items-center gap-3">
              <ApkMiniIcon size="md" />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-[#0B1F3A]">FundiQuotations</div>
                <div className="text-[11px] font-medium text-emerald-700 flex items-center gap-1 mt-0.5">
                  <Check className="w-3.5 h-3.5 shrink-0" />
                  <span>{sw ? 'Programu imesakinishwa' : 'App installed'}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-0.5">
              <span className="px-2.5 py-1 text-[11px] font-medium text-slate-500">
                {sw ? 'Maliza' : 'Done'}
              </span>
              <span className="px-3.5 py-1 rounded-md bg-[#EAB308] text-[#0B1F3A] text-[11px] font-bold">
                {sw ? 'Fungua (Open)' : 'Open'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Footer note */}
      <div className="relative z-10 flex items-center justify-between pt-2.5 border-t border-white/10 text-[11px] text-slate-300">
        <span>FundiQuotations-Customer.apk</span>
        <span className="inline-flex items-center gap-1 text-[#EAB308] font-semibold">
          <ToggleRight className="w-3.5 h-3.5" />
          <span>{sw ? 'Salama' : 'Verified'}</span>
        </span>
      </div>
    </div>
  );
}

export function InstallGuidePage() {
  const { lang, t } = useLanguage();
  const { installationGuides } = usePortalData();

  return (
    <div className="bg-[#F4F6F9] min-h-[calc(100vh-8rem)]">
      <section className="bg-[#0B1F3A] text-white py-14 border-b border-[#163A66]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-balance">
            {t.installGuide.pageTitle}
          </h1>
          <p className="mt-3 text-base text-slate-300 leading-relaxed max-w-2xl">
            {t.installGuide.pageSubtitle}
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-start gap-4">
          <ShieldAlert className="w-6 h-6 text-[#D99B16] shrink-0 mt-0.5" />
          <div>
            <h2 className="font-display text-base font-bold text-[#0B1F3A]">
              {t.installGuide.beforeYouStartTitle}
            </h2>
            <p className="mt-1 text-sm text-slate-600 leading-relaxed">
              {t.installGuide.beforeYouStartBody}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {installationGuides.map((step) => {
            const title = lang === 'sw' ? step.titleSw : step.titleEn;
            const description = lang === 'sw' ? step.descriptionSw : step.descriptionEn;
            const tip = lang === 'sw' ? step.tipSw : step.tipEn;

            return (
              <article
                key={step.id}
                className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between gap-5"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-semibold text-[#9A6B06] tabular-nums">
                      {t.installGuide.stepPrefix} {step.stepNumber}
                    </span>
                  </div>

                  {step.imageUrl ? (
                    <div className="w-full h-52 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                      <ResilientImage
                        src={step.imageUrl}
                        alt={title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <StepIllustration stepNumber={step.stepNumber} lang={lang} />
                  )}

                  <h2 className="mt-5 font-display text-lg font-bold text-[#0B1F3A]">
                    {title}
                  </h2>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{description}</p>
                </div>

                {tip && (
                  <div className="p-3.5 rounded-lg bg-[#F4F6F9] border border-slate-200 text-xs text-slate-700 leading-relaxed">
                    <span className="font-semibold text-[#0B1F3A]">
                      {t.installGuide.tipLabel}:{' '}
                    </span>
                    {tip}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-lg font-bold text-[#0B1F3A]">
              {t.installGuide.needHelpTitle}
            </h2>
            <p className="mt-1 text-sm text-slate-600 max-w-xl">
              {t.installGuide.needHelpBody}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/download"
              className="px-4 py-2.5 text-sm font-semibold text-[#0B1F3A] bg-[#EAB308] hover:bg-[#D99B16] rounded-lg transition-colors"
            >
              {t.installGuide.goToDownload}
            </Link>
            <Link
              to="/support"
              className="px-4 py-2.5 text-sm font-semibold text-[#0B1F3A] border border-slate-300 hover:border-[#0B1F3A] rounded-lg transition-colors"
            >
              {t.installGuide.goToSupport}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
