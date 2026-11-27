import { WifiOff, RefreshCw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function OfflineScreen() {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F4F6F9] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white border border-slate-200 shadow-xl rounded-2xl p-8 text-center space-y-6">
        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto">
          <WifiOff className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="font-display text-2xl font-bold text-[#0B1F3A]">
            This site can't be reached
          </h1>
          <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            ERR_INTERNET_DISCONNECTED
          </p>
          <p className="text-sm text-slate-600 leading-relaxed pt-2">
            {lang === 'sw'
              ? 'Tafadhali washa intaneti yako (Mobile Data au Wi-Fi) ili kuweza kufungua tovuti ya FundiQuotations.'
              : 'Please check your internet connection, mobile data, or Wi-Fi settings and try again.'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 text-sm font-semibold text-white bg-[#0B1F3A] hover:bg-[#163A66] rounded-xl transition-colors cursor-pointer shadow-md"
        >
          <RefreshCw className="w-4 h-4" />
          <span>{lang === 'sw' ? 'Jaribu Tena (Reload)' : 'Reload'}</span>
        </button>
      </div>
    </div>
  );
}
