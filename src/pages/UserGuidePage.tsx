import { useMemo, useState } from 'react';
import { ExternalLink, PlayCircle, Search, WifiOff } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePortalData } from '../context/PortalDataContext';
import { isSafePublicUrl } from '../lib/apkUtils';
import { APP_SCREENSHOT_PATHS } from '../data/defaultContent';
import { ResilientImage } from '../components/ResilientImage';
import { PhoneMockup } from '../components/PhoneMockup';

export function UserGuidePage() {
  const { lang, t } = useLanguage();
  const { tutorials } = usePortalData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSlug, setSelectedSlug] = useState<string>('all');

  const filteredTutorials = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return tutorials.filter((item) => {
      const matchesTopic = selectedSlug === 'all' || item.slug === selectedSlug;
      if (!matchesTopic) return false;
      if (!q) return true;
      const title = (lang === 'sw' ? item.titleSw : item.titleEn).toLowerCase();
      const summary = (lang === 'sw' ? item.summarySw : item.summaryEn).toLowerCase();
      const content = (lang === 'sw' ? item.contentSw : item.contentEn).toLowerCase();
      return title.includes(q) || summary.includes(q) || content.includes(q);
    });
  }, [tutorials, searchQuery, selectedSlug, lang]);

  return (
    <div className="bg-[#F4F6F9] min-h-[calc(100vh-8rem)]">
      <section className="bg-[#0B1F3A] text-white py-14 border-b border-[#163A66]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-balance">
            {t.userGuide.pageTitle}
          </h1>
          <p className="mt-3 text-base text-slate-300 leading-relaxed max-w-2xl">
            {t.userGuide.pageSubtitle}
          </p>

          <div className="mt-7 max-w-xl relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.userGuide.searchPlaceholder}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white text-[#0B1F3A] placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#EAB308]"
            />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Topic Index Sidebar */}
          <aside className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 lg:sticky lg:top-24">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h2 className="font-display text-sm font-bold text-[#0B1F3A]">
                {t.userGuide.sectionsCountLabel}
              </h2>
              <span className="font-mono text-xs text-slate-500 tabular-nums">
                {tutorials.length}
              </span>
            </div>

            <nav className="mt-3 space-y-1" aria-label="Tutorial topics">
              <button
                type="button"
                onClick={() => setSelectedSlug('all')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedSlug === 'all'
                    ? 'bg-[#0B1F3A] text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {t.userGuide.allTopics}
              </button>
              {tutorials.map((tut, idx) => {
                const label = lang === 'sw' ? tut.titleSw : tut.titleEn;
                const active = selectedSlug === tut.slug;
                return (
                  <button
                    key={tut.id}
                    type="button"
                    onClick={() => setSelectedSlug(tut.slug)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-start gap-2.5 ${
                      active
                        ? 'bg-[#0B1F3A] text-white font-semibold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="font-mono text-xs opacity-70 tabular-nums mt-0.5">
                      {String(idx + 1).padStart(2, '0')}.
                    </span>
                    <span className="leading-snug">{label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Tutorial Sections */}
          <div className="lg:col-span-8 space-y-6">
            {filteredTutorials.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-10 text-center text-sm text-slate-600">
                {t.userGuide.noResults}
              </div>
            ) : (
              filteredTutorials.map((tut, idx) => {
                const title = lang === 'sw' ? tut.titleSw : tut.titleEn;
                const summary = lang === 'sw' ? tut.summarySw : tut.summaryEn;
                const content = lang === 'sw' ? tut.contentSw : tut.contentEn;
                const hasSafeVideo = isSafePublicUrl(tut.videoUrl);

                return (
                  <article
                    key={tut.id}
                    className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8"
                  >
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="font-mono font-semibold text-[#9A6B06] tabular-nums">
                        {String(tut.sortOrder || idx + 1).padStart(2, '0')}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{tut.category}</span>
                    </div>

                    <h2 className="mt-2 font-display text-xl sm:text-2xl font-bold text-[#0B1F3A]">
                      {title}
                    </h2>
                    <p className="mt-2 text-sm sm:text-base font-medium text-slate-700">
                      {summary}
                    </p>

                    <div className="mt-5 pt-5 border-t border-slate-100 text-sm sm:text-base text-slate-600 leading-relaxed whitespace-pre-line">
                      {content}
                    </div>

                    {(tut.imageUrl || tut.id === 'tut-offline-usage') && (
                      <div className="mt-6 rounded-xl overflow-hidden border border-[#163A66] bg-gradient-to-br from-[#071426] via-[#0B1F3A] to-[#163A66] py-6 px-4 flex items-center justify-center max-w-md">
                        {tut.id === 'tut-offline-usage' ? (
                          <PhoneMockup
                            src={APP_SCREENSHOT_PATHS.selectItems}
                            alt={title}
                            size="sm"
                            screenOverlay={
                              <div className="absolute inset-x-1.5 top-4 z-10 flex flex-col gap-1.5">
                                {/* Android Offline Status Bar with Crossed Wi-Fi Icon */}
                                <div className="rounded-lg bg-[#071426]/95 border border-amber-400/50 px-2.5 py-2 shadow-lg backdrop-blur-xs flex items-center gap-2">
                                  <span className="w-7 h-7 rounded-md bg-amber-400/15 border border-amber-400/40 flex items-center justify-center shrink-0">
                                    <WifiOff className="w-4 h-4 text-[#EAB308]" />
                                  </span>
                                  <div className="min-w-0 leading-tight">
                                    <div className="text-[10px] font-bold text-[#EAB308] tracking-wide uppercase">
                                      {lang === 'sw' ? 'Bila Intaneti' : 'Offline Mode'}
                                    </div>
                                    <div className="text-[9px] text-slate-200 truncate">
                                      {lang === 'sw'
                                        ? 'Inaandaa Nukuu Hata Offline'
                                        : 'Building Quote Offline'}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            }
                          />
                        ) : tut.imageUrl === APP_SCREENSHOT_PATHS.shareWhatsapp ? (
                          <div className="w-[175px] aspect-[9/18.2] rounded-xl overflow-hidden bg-white ring-1 ring-white/25 shadow-lg">
                            <ResilientImage
                              src={tut.imageUrl}
                              alt={title}
                              className="w-full h-full object-cover object-top"
                            />
                          </div>
                        ) : tut.imageUrl === APP_SCREENSHOT_PATHS.pdfSample ? (
                          <div className="w-[210px] sm:w-[240px] rounded-xl overflow-hidden ring-1 ring-white/25 shadow-lg">
                            <ResilientImage
                              src={tut.imageUrl}
                              alt={title}
                              className="w-full h-auto object-contain"
                            />
                          </div>
                        ) : (
                          <PhoneMockup src={tut.imageUrl} alt={title} size="sm" />
                        )}
                      </div>
                    )}

                    {hasSafeVideo && (
                      <div className="mt-6">
                        <a
                          href={tut.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#0B1F3A] bg-[#F4F6F9] border border-slate-300 hover:border-[#0B1F3A] rounded-lg transition-colors"
                        >
                          <PlayCircle className="w-4 h-4 text-[#D99B16]" />
                          <span>{t.userGuide.watchVideo}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                        </a>
                      </div>
                    )}
                  </article>
                );
              })
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
