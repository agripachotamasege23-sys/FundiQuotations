import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  BookOpen,
  Check,
  Download,
  FileArchive,
  Smartphone
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePortalData } from '../context/PortalDataContext';
import { isSafePublicUrl, recordApkDownload } from '../lib/apkUtils';
import { AppVersion } from '../types/portal';

export function DownloadPage() {
  const { lang, t } = useLanguage();
  const { latestVersion, publishedVersions, settings, loading, error, refreshPublicData } =
    usePortalData();
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadFeedback, setDownloadFeedback] = useState<string | null>(null);

  const handleDownloadApk = async (version: AppVersion) => {
    if (
      version.apkChannel !== 'customer' ||
      version.status !== 'published' ||
      !isSafePublicUrl(version.apkDownloadUrl)
    ) {
      return;
    }

    setDownloadingId(version.id);
    setDownloadFeedback(null);
    try {
      await recordApkDownload(version, 'download', lang);
      const anchor = document.createElement('a');
      anchor.href = version.apkDownloadUrl;
      anchor.download = `FundiQuotations-Customer-v${version.versionName}.apk`;
      anchor.rel = 'noopener noreferrer';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      setDownloadFeedback(t.download.downloadStartedToast);
    } finally {
      setDownloadingId(null);
    }
  };

  const olderVersions = publishedVersions.filter((v) => v.id !== latestVersion?.id);

  return (
    <div className="bg-[#F4F6F9] min-h-[calc(100vh-8rem)]">
      <section className="bg-[#0B1F3A] text-white py-14 border-b border-[#163A66]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-balance">
            {t.download.pageTitle}
          </h1>
          <p className="mt-3 text-base text-slate-300 leading-relaxed max-w-2xl">
            {t.download.pageSubtitle}
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 animate-pulse space-y-6">
            <div className="h-7 bg-slate-200 rounded w-1/3" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="h-16 bg-slate-100 rounded-lg" />
              <div className="h-16 bg-slate-100 rounded-lg" />
              <div className="h-16 bg-slate-100 rounded-lg" />
              <div className="h-16 bg-slate-100 rounded-lg" />
            </div>
            <div className="h-24 bg-slate-100 rounded-lg" />
          </div>
        ) : error ? (
          <div className="bg-white border border-red-200 rounded-2xl p-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h2 className="font-display text-lg font-bold text-[#0B1F3A]">
                  {t.common.errorTitle}
                </h2>
                <p className="mt-1 text-sm text-slate-600">{error}</p>
                <button
                  type="button"
                  onClick={() => void refreshPublicData()}
                  className="mt-4 px-4 py-2 text-sm font-semibold text-white bg-[#0B1F3A] rounded-lg hover:bg-[#163A66]"
                >
                  {t.common.retry}
                </button>
              </div>
            </div>
          </div>
        ) : !latestVersion ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto">
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#0B1F3A] flex items-center justify-center mx-auto">
              <FileArchive className="w-6 h-6" />
            </div>
            <h2 className="mt-5 font-display text-2xl font-bold text-[#0B1F3A]">
              {t.download.noApkTitle}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              {t.download.noApkBody}
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/support"
                className="px-5 py-2.5 text-sm font-semibold text-white bg-[#0B1F3A] hover:bg-[#163A66] rounded-lg transition-colors"
              >
                {t.download.noApkAction}
              </Link>
              <Link
                to="/install-guide"
                className="px-5 py-2.5 text-sm font-semibold text-[#0B1F3A] border border-slate-300 hover:border-[#0B1F3A] rounded-lg transition-colors"
              >
                {t.download.installGuideLink}
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Primary Latest Customer APK Release Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-200">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
                    <span>{t.download.appNameLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-[#0B1F3A] font-semibold">
                      Customer APK
                    </span>
                    {settings.showDownloadCounter && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono text-slate-600 tabular-nums">
                          {publishedVersions.length}{' '}
                          {lang === 'sw' ? 'Toleo Rasmi' : 'Verified Releases'}
                        </span>
                      </>
                    )}
                  </div>
                  <h2 className="mt-1.5 font-display text-2xl sm:text-3xl font-bold text-[#0B1F3A]">
                    {latestVersion.appName}{' '}
                    <span className="font-mono text-xl sm:text-2xl text-[#9A6B06] tabular-nums">
                      v{latestVersion.versionName}
                    </span>
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    disabled={downloadingId === latestVersion.id}
                    onClick={() => void handleDownloadApk(latestVersion)}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-[#0B1F3A] bg-[#EAB308] hover:bg-[#D99B16] disabled:opacity-60 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <Download className="w-4 h-4 shrink-0" />
                    <span>
                      {downloadingId === latestVersion.id
                        ? t.download.downloadingBtn
                        : t.download.downloadBtn}
                    </span>
                  </button>

                  <Link
                    to="/install-guide"
                    className="inline-flex items-center gap-2 px-4 py-3.5 text-sm font-semibold text-[#0B1F3A] border border-slate-300 hover:border-[#0B1F3A] rounded-lg transition-colors whitespace-nowrap"
                  >
                    <BookOpen className="w-4 h-4 shrink-0" />
                    <span>{t.download.installGuideLink}</span>
                  </Link>
                </div>
              </div>

              {downloadFeedback && (
                <div
                  role="status"
                  className="mt-6 p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-sm text-emerald-900 flex items-center gap-2.5"
                >
                  <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{downloadFeedback}</span>
                </div>
              )}

              {/* Release Specification Grid */}
              <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-[#F4F6F9] border border-slate-200 rounded-xl">
                  <div className="text-xs text-slate-500">{t.download.versionLabel}</div>
                  <div className="mt-1 font-mono text-base font-semibold text-[#0B1F3A] tabular-nums">
                    v{latestVersion.versionName} ({latestVersion.versionCode})
                  </div>
                </div>

                <div className="p-4 bg-[#F4F6F9] border border-slate-200 rounded-xl">
                  <div className="text-xs text-slate-500">{t.download.sizeLabel}</div>
                  <div className="mt-1 font-mono text-base font-semibold text-[#0B1F3A] tabular-nums">
                    {latestVersion.fileSizeDisplay}
                  </div>
                </div>

                <div className="p-4 bg-[#F4F6F9] border border-slate-200 rounded-xl">
                  <div className="text-xs text-slate-500">{t.download.releaseDateLabel}</div>
                  <div className="mt-1 font-mono text-base font-semibold text-[#0B1F3A] tabular-nums">
                    {latestVersion.releaseDate}
                  </div>
                </div>

                <div className="p-4 bg-[#F4F6F9] border border-slate-200 rounded-xl">
                  <div className="text-xs text-slate-500">{t.download.minAndroidLabel}</div>
                  <div className="mt-1 font-mono text-base font-semibold text-[#0B1F3A] inline-flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-slate-500" />
                    <span>{latestVersion.minAndroidVersion}</span>
                  </div>
                </div>
              </div>

              {/* Description & Release Notes */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
                <div>
                  <h3 className="font-display text-sm font-bold text-[#0B1F3A]">
                    {t.download.descriptionLabel}
                  </h3>
                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    {lang === 'sw' ? latestVersion.descriptionSw : latestVersion.descriptionEn}
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-[#0B1F3A]">
                    {t.download.releaseNotesLabel}
                  </h3>
                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    {lang === 'sw' ? latestVersion.releaseNotesSw : latestVersion.releaseNotesEn}
                  </p>
                </div>
              </div>
            </div>

            {/* Older Published Customer Versions */}
            {olderVersions.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200">
                  <h3 className="font-display text-base font-bold text-[#0B1F3A]">
                    {t.download.previousVersionsTitle}
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-[#F4F6F9] text-slate-600 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-3 font-semibold">{t.download.versionLabel}</th>
                        <th className="px-6 py-3 font-semibold">{t.download.releaseDateLabel}</th>
                        <th className="px-6 py-3 font-semibold">{t.download.sizeLabel}</th>
                        <th className="px-6 py-3 font-semibold">{t.download.minAndroidLabel}</th>
                        <th className="px-6 py-3 font-semibold text-right">APK</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {olderVersions.map((ver) => (
                        <tr key={ver.id} className="hover:bg-slate-50">
                          <td className="px-6 py-3.5 font-mono font-semibold text-[#0B1F3A] tabular-nums">
                            v{ver.versionName}
                          </td>
                          <td className="px-6 py-3.5 font-mono text-slate-600 tabular-nums">
                            {ver.releaseDate}
                          </td>
                          <td className="px-6 py-3.5 font-mono text-slate-600 tabular-nums">
                            {ver.fileSizeDisplay}
                          </td>
                          <td className="px-6 py-3.5 text-slate-600">{ver.minAndroidVersion}</td>
                          <td className="px-6 py-3.5 text-right">
                            <button
                              type="button"
                              onClick={() => void handleDownloadApk(ver)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#0B1F3A] border border-slate-300 hover:border-[#0B1F3A] rounded-lg"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>{t.nav.download}</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
