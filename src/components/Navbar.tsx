import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Download, Menu, Moon, Sun, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePortalData } from '../context/PortalDataContext';
import { useTheme } from '../context/ThemeContext';
import { BrandMark } from './BrandMark';

export function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const { settings } = usePortalData();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [guidesOpen, setGuidesOpen] = useState(false);
  const guidesRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setGuidesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (guidesRef.current && !guidesRef.current.contains(e.target as Node)) {
        setGuidesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors duration-150 ${
      isActive
        ? 'text-[#0B1F3A] border-[#D99B16]'
        : 'text-slate-600 border-transparent hover:text-[#0B1F3A] hover:border-slate-300'
    }`;

  const isGuidesActive =
    location.pathname === '/install-guide' ||
    location.pathname === '/user-guide' ||
    location.pathname === '/faq';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <Link
          to="/"
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B1F3A] rounded-md"
        >
          <BrandMark className="w-9 h-9 shrink-0" />
          <span className="font-display text-lg font-bold tracking-tight text-[#0B1F3A] whitespace-nowrap">
            {settings.brandName || 'FundiQuotations'}
          </span>
        </Link>

        {/* Zone 2: 5 concise single-line nav links */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation">
          <NavLink to="/" end className={navLinkClass}>
            {t.nav.home}
          </NavLink>
          <NavLink to="/features" className={navLinkClass}>
            {t.nav.features}
          </NavLink>
          <NavLink to="/download" className={navLinkClass}>
            {t.nav.download}
          </NavLink>

          <div className="relative" ref={guidesRef}>
            <button
              type="button"
              onClick={() => setGuidesOpen((prev) => !prev)}
              aria-expanded={guidesOpen}
              className={`inline-flex items-center gap-1 text-sm font-medium whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors duration-150 ${
                isGuidesActive
                  ? 'text-[#0B1F3A] border-[#D99B16]'
                  : 'text-slate-600 border-transparent hover:text-[#0B1F3A] hover:border-slate-300'
              }`}
            >
              <span>{t.nav.guides}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-150 ${
                  guidesOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {guidesOpen && (
              <div className="absolute left-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50">
                <Link
                  to="/install-guide"
                  className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#0B1F3A] font-medium"
                >
                  {t.nav.installGuide}
                </Link>
                <Link
                  to="/user-guide"
                  className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#0B1F3A] font-medium"
                >
                  {t.nav.userGuide}
                </Link>
                <Link
                  to="/faq"
                  className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#0B1F3A] font-medium"
                >
                  {t.nav.faq}
                </Link>
                <Link
                  to="/about"
                  className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#0B1F3A] font-medium border-t border-slate-100 mt-1 pt-2"
                >
                  {t.nav.about}
                </Link>
              </div>
            )}
          </div>

          <NavLink to="/support" className={navLinkClass}>
            {t.nav.support}
          </NavLink>
        </nav>

        {/* Zone 3: Language Switcher + Primary Download Action */}
        <div className="flex items-center gap-3 shrink-0">
          <div
            className="inline-flex items-center p-0.5 bg-slate-100 border border-slate-200 rounded-lg"
            role="group"
            aria-label="Language switcher"
          >
            <button
              type="button"
              onClick={() => setLang('en')}
              aria-pressed={lang === 'en'}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                lang === 'en'
                  ? 'bg-[#0B1F3A] text-white'
                  : 'text-slate-600 hover:text-[#0B1F3A]'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang('sw')}
              aria-pressed={lang === 'sw'}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                lang === 'sw'
                  ? 'bg-[#0B1F3A] text-white'
                  : 'text-slate-600 hover:text-[#0B1F3A]'
              }`}
            >
              SW
            </button>
          </div>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shrink-0"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-[#EAB308]" /> : <Moon className="w-4 h-4 text-[#0B1F3A]" />}
          </button>

          <Link
            to="/download"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#0B1F3A] bg-[#EAB308] hover:bg-[#D99B16] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B1F3A]"
          >
            <Download className="w-4 h-4 shrink-0" />
            <span>{t.nav.downloadApk}</span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={t.nav.menu}
            aria-expanded={mobileOpen}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 text-[#0B1F3A] hover:bg-slate-50"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-1">
          {[
            { to: '/', label: t.nav.home },
            { to: '/features', label: t.nav.features },
            { to: '/download', label: t.nav.download },
            { to: '/install-guide', label: t.nav.installGuide },
            { to: '/user-guide', label: t.nav.userGuide },
            { to: '/faq', label: t.nav.faq },
            { to: '/support', label: t.nav.support },
            { to: '/about', label: t.nav.about },
            { to: '/privacy', label: t.nav.privacy },
            { to: '/terms', label: t.nav.terms },
            { to: '/account-deletion', label: t.nav.accountDeletion }
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `block px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-[#0B1F3A] text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="pt-2">
            <Link
              to="/download"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#0B1F3A] bg-[#EAB308] hover:bg-[#D99B16] rounded-lg"
            >
              <Download className="w-4 h-4" />
              <span>{t.nav.downloadApk}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
