import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { usePortalData } from '../context/PortalDataContext';
import { BrandMark } from './BrandMark';
import { PWAInstallButton } from './PWAInstallButton';

export function Footer() {
  const { lang, t } = useLanguage();
  const { settings } = usePortalData();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0B1F3A] text-slate-300 border-t border-[#163A66]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5 text-white">
              <BrandMark className="w-8 h-8" />
              <span className="font-display text-lg font-bold tracking-tight">
                {settings.brandName || 'FundiQuotations'}
              </span>
            </Link>
            <p className="mt-4 text-sm text-slate-300 leading-relaxed max-w-xs">
              {t.footer.tagline}
            </p>
            <PWAInstallButton />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">
              {t.footer.productHeading}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/features" className="hover:text-[#EAB308] transition-colors">
                  {t.nav.features}
                </Link>
              </li>
              <li>
                <Link to="/download" className="hover:text-[#EAB308] transition-colors">
                  {t.nav.download}
                </Link>
              </li>
              <li>
                <Link to="/install-guide" className="hover:text-[#EAB308] transition-colors">
                  {t.nav.installGuide}
                </Link>
              </li>
              <li>
                <Link to="/user-guide" className="hover:text-[#EAB308] transition-colors">
                  {t.nav.userGuide}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">
              {t.footer.companyHeading}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/faq" className="hover:text-[#EAB308] transition-colors">
                  {t.nav.faq}
                </Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-[#EAB308] transition-colors">
                  {t.nav.support}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#EAB308] transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-[#EAB308] transition-colors">
                  {t.nav.privacy}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[#EAB308] transition-colors">
                  {t.nav.terms}
                </Link>
              </li>
              <li>
                <Link to="/account-deletion" className="hover:text-[#EAB308] transition-colors">
                  {t.nav.accountDeletion}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">
              {t.footer.contactHeading}
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <a
                  href={`mailto:${settings.supportEmail}`}
                  className="hover:text-[#EAB308] transition-colors"
                >
                  {settings.supportEmail}
                </a>
              </li>
              <li className="tabular-nums">
                <a
                  href={`tel:${settings.supportPhone.replace(/\s+/g, '')}`}
                  className="hover:text-[#EAB308] transition-colors"
                >
                  {settings.supportPhone}
                </a>
              </li>
              <li>
                {lang === 'sw' ? settings.officeAddressSw : settings.officeAddressEn}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#163A66] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {year} {settings.brandName || 'FundiQuotations'} · Agritech Electrical Solutions.{' '}
            {t.footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">
              {t.nav.privacy}
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              {t.nav.terms}
            </Link>
            <Link to="/account-deletion" className="hover:text-white transition-colors">
              {t.nav.accountDeletion}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
