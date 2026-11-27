import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../types/portal';

interface RouteMetaEntry {
  title: string;
  description: string;
}

const ROUTE_META: Record<Language, Record<string, RouteMetaEntry>> = {
  en: {
    '/': {
      title: 'FundiQuotations – Mobile Quotations, Invoices & Materials App',
      description:
        'Create itemized quotations, generate invoices, manage materials, and share branded PDFs over WhatsApp or Email—even offline.'
    },
    '/features': {
      title: 'Features – FundiQuotations Android App',
      description:
        'Explore quotation creation, invoicing, customer management, categorized materials catalog, PDF export, and offline Android workflows.'
    },
    '/download': {
      title: 'Download Customer APK – FundiQuotations',
      description:
        'Download the official FundiQuotations Customer APK for Android directly to your device.'
    },
    '/install-guide': {
      title: 'Android Installation Guide – FundiQuotations',
      description:
        'Step-by-step instructions for downloading and installing the FundiQuotations Customer APK safely on Android.'
    },
    '/user-guide': {
      title: 'User Guide & Tutorials – FundiQuotations',
      description:
        'Learn how to set up your business profile, manage materials, create quotations, generate invoices, and export PDFs.'
    },
    '/faq': {
      title: 'Frequently Asked Questions – FundiQuotations',
      description:
        'Answers to common questions about installing the Customer APK, working offline, PDF exports, and data backup.'
    },
    '/support': {
      title: 'Support & Contact Us – FundiQuotations',
      description:
        'Contact Agritech Electrical Solutions in Morogoro Region, Tanzania for FundiQuotations support and technical assistance.'
    },
    '/about': {
      title: 'About Us – FundiQuotations',
      description:
        'Built by Agritech Electrical Solutions to help electricians, plumbers, builders, and contractors issue accurate quotes and invoices.'
    },
    '/privacy': {
      title: 'Privacy Policy – FundiQuotations',
      description:
        'Read the official FundiQuotations Privacy Policy by Agritech Electrical Solutions explaining data collection, security, and user rights.'
    },
    '/terms': {
      title: 'Terms & Conditions – FundiQuotations',
      description:
        'Review the official FundiQuotations Terms & Conditions governing the web portal and Android mobile application.'
    },
    '/account-deletion': {
      title: 'Account Deletion Request – FundiQuotations',
      description:
        'Instructions on how to permanently delete your FundiQuotations account and associated data from the app or by email.'
    },
    '/admin': {
      title: 'Admin Console – FundiQuotations',
      description: 'Protected administration portal for managing Customer APK releases and portal content.'
    }
  },
  sw: {
    '/': {
      title: 'FundiQuotations – Programu ya Nukuu za Bei, Ankara na Vifaa',
      description:
        'Andaa nukuu za bei, tengeneza ankara, simamia stoo ya vifaa, na tuma PDF zenye nembo ya biashara yako WhatsApp—hata bila intaneti.'
    },
    '/features': {
      title: 'Vipengele – FundiQuotations ya Android',
      description:
        'Gundua uandaaji wa nukuu za bei, ankara, usimamizi wa wateja na vifaa, kutoa PDF, na ufanyaji kazi bila intaneti.'
    },
    '/download': {
      title: 'Pakua Customer APK – FundiQuotations',
      description:
        'Pakua Customer APK rasmi ya FundiQuotations ya Android moja kwa moja kwenye simu yako.'
    },
    '/install-guide': {
      title: 'Mwongozo wa Usakinishaji wa Android – FundiQuotations',
      description:
        'Hatua sita rahisi za kupakua na kusakinisha Customer APK ya FundiQuotations kwa usalama kwenye simu ya Android.'
    },
    '/user-guide': {
      title: 'Mwongozo wa Mtumiaji – FundiQuotations',
      description:
        'Mafunzo ya hatua kwa hatua ya kuweka wasifu wa biashara, vifaa, nukuu za bei, ankara, na kuhifadhi PDF.'
    },
    '/faq': {
      title: 'Maswali Yanayoulizwa Mara kwa Mara – FundiQuotations',
      description:
        'Majibu ya haraka kuhusu kupakua Customer APK, kufanya kazi offline, kutoa PDF, na nakala za akiba.'
    },
    '/support': {
      title: 'Msaada na Mawasiliano – FundiQuotations',
      description:
        'Wasiliana na Agritech Electrical Solutions, Mkoa wa Morogoro, Tanzania kwa msaada wa kiufundi wa FundiQuotations.'
    },
    '/about': {
      title: 'Kuhusu Sisi – FundiQuotations',
      description:
        'Imetengenezwa na Agritech Electrical Solutions kusaidia mafundi umeme, bomba, wajenzi, na wakandarasi kutoa nukuu bora.'
    },
    '/privacy': {
      title: 'Sera ya Faragha – FundiQuotations',
      description:
        'Soma Sera rasmi ya Faragha ya FundiQuotations kutoka Agritech Electrical Solutions kuhusu ulinzi wa taarifa na haki zako.'
    },
    '/terms': {
      title: 'Sheria na Masharti – FundiQuotations',
      description:
        'Soma Sheria na Masharti rasmi ya matumizi ya tovuti na programu ya simu ya FundiQuotations.'
    },
    '/account-deletion': {
      title: 'Ombi la Kufuta Akaunti – FundiQuotations',
      description:
        'Maelekezo ya jinsi ya kufuta kabisa akaunti yako ya FundiQuotations na data zinazohusiana kupitia programu au barua pepe.'
    },
    '/admin': {
      title: 'Dashibodi ya Admin – FundiQuotations',
      description: 'Sehemu salama ya wasimamizi ya kusimamia Customer APK na maudhui ya tovuti.'
    }
  }
};

const CANONICAL_BASE_URL = 'https://fundiquotations.com';

function setMetaContent(selector: string, content: string) {
  const el = document.querySelector(selector);
  if (el) {
    el.setAttribute('content', content);
  }
}

export function RouteMetaUpdater() {
  const { pathname } = useLocation();
  const { lang } = useLanguage();

  useEffect(() => {
    const localizedMap = ROUTE_META[lang];
    const entry = localizedMap[pathname] ?? localizedMap['/'];

    document.documentElement.lang = lang;
    document.title = entry.title;

    setMetaContent('meta[name="description"]', entry.description);
    setMetaContent('meta[property="og:title"]', entry.title);
    setMetaContent('meta[property="og:description"]', entry.description);
    setMetaContent('meta[name="twitter:title"]', entry.title);
    setMetaContent('meta[name="twitter:description"]', entry.description);

    const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
    const canonicalUrl = `${CANONICAL_BASE_URL}${normalizedPath}`;
    setMetaContent('meta[property="og:url"]', canonicalUrl);

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);
  }, [pathname, lang]);

  return null;
}
