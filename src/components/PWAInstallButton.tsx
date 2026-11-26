import { useState } from 'react';
import { MonitorSmartphone, Share, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePWAInstall } from '../hooks/usePWAInstall';

export function PWAInstallButton() {
  const { lang } = useLanguage();
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={() => void install()}
        className="mt-4 inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#0B1F3A] bg-[#EAB308] hover:bg-[#D99B16] rounded-lg transition-colors"
      >
        <MonitorSmartphone className="w-3.5 h-3.5 shrink-0" />
        <span>{lang === 'sw' ? 'Weka Kwenye Skrini (PWA)' : 'Add Portal to Home Screen'}</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          className="mt-4 inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-white bg-[#163A66] hover:bg-[#1E4A7D] border border-slate-600 rounded-lg transition-colors"
        >
          <Share className="w-3.5 h-3.5 shrink-0 text-[#EAB308]" />
          <span>{lang === 'sw' ? 'Weka Kwenye Skrini ya iPhone' : 'Add to iPhone Home Screen'}</span>
        </button>

        {showIOSGuide && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="ios-pwa-title"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          >
            <div className="w-full max-w-sm bg-white text-[#0B1F3A] rounded-2xl border border-slate-200 p-6 shadow-xl">
              <div className="flex items-start justify-between gap-3">
                <h3 id="ios-pwa-title" className="font-display text-lg font-bold">
                  {lang === 'sw' ? 'Ongeza Kwenye Skrini ya Mwanzo' : 'Add to Home Screen'}
                </h3>
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(false)}
                  aria-label="Close"
                  className="p-1 rounded-lg text-slate-500 hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <ol className="mt-3 space-y-2 text-sm text-slate-600 list-decimal list-inside leading-relaxed">
                <li>
                  {lang === 'sw'
                    ? 'Bonyeza kitufe cha Share (mraba wenye mshale kwenda juu) kwenye Safari.'
                    : 'Tap the Share button in your Safari browser toolbar.'}
                </li>
                <li>
                  {lang === 'sw'
                    ? 'Shuka chini kisha chagua "Add to Home Screen".'
                    : 'Scroll down and tap "Add to Home Screen".'}
                </li>
              </ol>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full py-2.5 text-sm font-semibold text-white bg-[#0B1F3A] hover:bg-[#163A66] rounded-lg transition-colors"
              >
                {lang === 'sw' ? 'Sawa, Nimeelewa' : 'Got it'}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
}
