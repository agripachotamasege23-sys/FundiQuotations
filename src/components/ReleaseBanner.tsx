import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Sparkles, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePortalData } from '../context/PortalDataContext';

const DISMISS_KEY_PREFIX = 'fq_dismissed_release_';

function extractHighlightLine(notes: string): string {
  const lines = notes
    .split('\n')
    .map((line) => line.replace(/^[-•*]\s*/, '').trim())
    .filter(Boolean);
  return lines[0] ?? '';
}

export function ReleaseBanner() {
  const { lang, t } = useLanguage();
  const { latestVersion, loading } = usePortalData();
  const location = useLocation();
  const [dismissedId, setDismissedId] = useState<string | null>(null);

  useEffect(() => {
    if (!latestVersion) {
      setDismissedId(null);
      return;
    }
    try {
      const stored = window.localStorage.getItem(`${DISMISS_KEY_PREFIX}${latestVersion.id}`);
      setDismissedId(stored === '1' ? latestVersion.id : null);
    } catch {
      setDismissedId(null);
    }
  }, [latestVersion]);

  if (loading || !latestVersion) {
    return null;
  }

  if (location.pathname === '/download' || dismissedId === latestVersion.id) {
    return null;
  }

  const releaseSummary = extractHighlightLine(
    lang === 'sw' ? latestVersion.releaseNotesSw : latestVersion.releaseNotesEn
  );

  const handleDismiss = () => {
    setDismissedId(latestVersion.id);
    try {
      window.localStorage.setItem(`${DISMISS_KEY_PREFIX}${latestVersion.id}`, '1');
    } catch {
      // Ignore storage access errors in private contexts
    }
  };

  return (
    <div
      role="region"
      aria-label={t.releaseBanner.badge}
      className="bg-[#0B1F3A] text-white border-b border-[#163A66]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 min-w-0 text-xs sm:text-sm">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#EAB308] text-[#0B1F3A] font-semibold tracking-tight shrink-0">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>{t.releaseBanner.badge}</span>
          </span>

          <span className="font-semibold text-white whitespace-nowrap">
            {latestVersion.appName || t.releaseBanner.headlinePrefix}{' '}
            <span className="font-mono text-[#EAB308] tabular-nums">
              v{latestVersion.versionName}
            </span>
          </span>

          {releaseSummary && (
            <span className="hidden md:inline text-slate-300 truncate max-w-md">
              <span className="text-slate-400 mr-1">{t.releaseBanner.whatsNewLabel}</span>
              {releaseSummary}
            </span>
          )}

          <span className="hidden sm:inline font-mono text-xs text-slate-400 tabular-nums whitespace-nowrap">
            {latestVersion.fileSizeDisplay} · {latestVersion.releaseDate}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            to="/download"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#0B1F3A] bg-[#EAB308] hover:bg-[#D99B16] rounded-md transition-colors whitespace-nowrap"
          >
            <span>{t.releaseBanner.ctaLabel}</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </Link>

          <button
            type="button"
            onClick={handleDismiss}
            aria-label={t.releaseBanner.dismissLabel}
            className="p-1.5 rounded-md text-slate-300 hover:text-white hover:bg-[#163A66] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
