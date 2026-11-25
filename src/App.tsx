import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { ReleaseBanner } from './components/ReleaseBanner';
import { RouteMetaUpdater } from './components/RouteMetaUpdater';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { PortalDataProvider } from './context/PortalDataContext';
import { AboutPage } from './pages/AboutPage';
import { AccountDeletionPage } from './pages/AccountDeletionPage';
import { AdminPage } from './pages/AdminPage';
import { DownloadPage } from './pages/DownloadPage';
import { FaqPage } from './pages/FaqPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { HomePage } from './pages/HomePage';
import { InstallGuidePage } from './pages/InstallGuidePage';
import { PrivacyPage } from './pages/PrivacyPage';
import { SupportPage } from './pages/SupportPage';
import { TermsPage } from './pages/TermsPage';
import { UserGuidePage } from './pages/UserGuidePage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F9]">
      <Navbar />
      <ReleaseBanner />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <AuthProvider>
          <PortalDataProvider>
            <BrowserRouter>
              <ScrollToTop />
              <RouteMetaUpdater />
              <Routes>
                <Route
                  path="/"
                  element={
                    <PublicLayout>
                      <HomePage />
                    </PublicLayout>
                  }
                />
                <Route
                  path="/features"
                  element={
                    <PublicLayout>
                      <FeaturesPage />
                    </PublicLayout>
                  }
                />
                <Route
                  path="/download"
                  element={
                    <PublicLayout>
                      <DownloadPage />
                    </PublicLayout>
                  }
                />
                <Route
                  path="/install-guide"
                  element={
                    <PublicLayout>
                      <InstallGuidePage />
                    </PublicLayout>
                  }
                />
                <Route
                  path="/user-guide"
                  element={
                    <PublicLayout>
                      <UserGuidePage />
                    </PublicLayout>
                  }
                />
                <Route
                  path="/faq"
                  element={
                    <PublicLayout>
                      <FaqPage />
                    </PublicLayout>
                  }
                />
                <Route
                  path="/support"
                  element={
                    <PublicLayout>
                      <SupportPage />
                    </PublicLayout>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <PublicLayout>
                      <AboutPage />
                    </PublicLayout>
                  }
                />
                <Route
                  path="/privacy"
                  element={
                    <PublicLayout>
                      <PrivacyPage />
                    </PublicLayout>
                  }
                />
                <Route
                  path="/terms"
                  element={
                    <PublicLayout>
                      <TermsPage />
                    </PublicLayout>
                  }
                />
                <Route
                  path="/account-deletion"
                  element={
                    <PublicLayout>
                      <AccountDeletionPage />
                    </PublicLayout>
                  }
                />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </PortalDataProvider>
        </AuthProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
