import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="bg-[#F4F6F9] min-h-[calc(100vh-8rem)]">
      <section className="bg-[#0B1F3A] text-white py-14 border-b border-[#163A66]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-balance">
            {t.about.pageTitle}
          </h1>
          <p className="mt-3 text-base text-slate-300 leading-relaxed max-w-2xl">
            {t.about.pageSubtitle}
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="bg-white border border-slate-200 rounded-2xl p-8">
          <h2 className="font-display text-2xl font-bold text-[#0B1F3A]">
            {t.about.missionTitle}
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed max-w-3xl">
            {t.about.missionBody}
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold text-[#0B1F3A] mb-6">
            {t.about.whoWeServeTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.about.whoWeServeItems.map((item) => (
              <div
                key={item.title}
                className="bg-white border border-slate-200 rounded-xl p-6"
              >
                <h3 className="font-display text-lg font-bold text-[#0B1F3A]">{item.title}</h3>
                <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold text-[#0B1F3A] mb-6">
            {t.about.principlesTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.about.principles.map((p, idx) => (
              <div
                key={p.title}
                className="bg-white border border-slate-200 rounded-xl p-6"
              >
                <span className="font-mono text-xs font-semibold text-[#9A6B06] tabular-nums">
                  0{idx + 1}.
                </span>
                <h3 className="mt-2 font-display text-lg font-bold text-[#0B1F3A]">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0B1F3A] text-white rounded-2xl p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-xl font-bold">{t.home.ctaBannerTitle}</h2>
            <p className="mt-1 text-sm text-slate-300">{t.home.ctaBannerSubtitle}</p>
          </div>
          <Link
            to="/download"
            className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#0B1F3A] bg-[#EAB308] hover:bg-[#D99B16] rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>{t.nav.downloadApk}</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
