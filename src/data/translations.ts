import { Language } from '../types/portal';

export interface TranslationDictionary {
  nav: {
    home: string;
    features: string;
    download: string;
    guides: string;
    installGuide: string;
    userGuide: string;
    faq: string;
    support: string;
    about: string;
    privacy: string;
    terms: string;
    accountDeletion: string;
    admin: string;
    downloadApk: string;
    menu: string;
  };
  hero: {
    kicker: string;
    headlineFallback: string;
    subheadlineFallback: string;
    primaryCta: string;
    secondaryCta: string;
    trust1: string;
    trust2: string;
    trust3: string;
    imageAlt: string;
  };
  home: {
    screenshotsTitle: string;
    screenshotsSubtitle: string;
    featuresTitle: string;
    featuresSubtitle: string;
    viewAllFeatures: string;
    howItWorksTitle: string;
    howItWorksSubtitle: string;
    howSteps: { number: string; title: string; body: string }[];
    benefitsTitle: string;
    benefitsSubtitle: string;
    benefits: { metric: string; title: string; body: string }[];
    faqPreviewTitle: string;
    faqPreviewSubtitle: string;
    viewAllFaqs: string;
    ctaBannerTitle: string;
    ctaBannerSubtitle: string;
  };
  features: {
    pageTitle: string;
    pageSubtitle: string;
    offlineBadgeTitle: string;
    offlineBadgeBody: string;
    items: {
      id: string;
      number: string;
      title: string;
      summary: string;
      highlights: string[];
    }[];
  };
  download: {
    pageTitle: string;
    pageSubtitle: string;
    appNameLabel: string;
    versionLabel: string;
    sizeLabel: string;
    releaseDateLabel: string;
    minAndroidLabel: string;
    descriptionLabel: string;
    releaseNotesLabel: string;
    downloadBtn: string;
    downloadingBtn: string;
    installGuideLink: string;
    noApkTitle: string;
    noApkBody: string;
    noApkAction: string;
    previousVersionsTitle: string;
    downloadStartedToast: string;
  };
  installGuide: {
    pageTitle: string;
    pageSubtitle: string;
    beforeYouStartTitle: string;
    beforeYouStartBody: string;
    stepPrefix: string;
    tipLabel: string;
    needHelpTitle: string;
    needHelpBody: string;
    goToDownload: string;
    goToSupport: string;
  };
  userGuide: {
    pageTitle: string;
    pageSubtitle: string;
    searchPlaceholder: string;
    allTopics: string;
    watchVideo: string;
    noResults: string;
    sectionsCountLabel: string;
  };
  faq: {
    pageTitle: string;
    pageSubtitle: string;
    searchPlaceholder: string;
    allCategories: string;
    noResults: string;
    stillNeedHelpTitle: string;
    stillNeedHelpBody: string;
    contactSupportBtn: string;
  };
  support: {
    pageTitle: string;
    pageSubtitle: string;
    formTitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitBtn: string;
    submittingBtn: string;
    successTitle: string;
    successBody: string;
    sendAnotherBtn: string;
    directChannelsTitle: string;
    emailChannelLabel: string;
    phoneChannelLabel: string;
    whatsappChannelLabel: string;
    officeLabel: string;
    validation: {
      nameRequired: string;
      emailInvalid: string;
      subjectRequired: string;
      messageMin: string;
    };
  };
  about: {
    pageTitle: string;
    pageSubtitle: string;
    missionTitle: string;
    missionBody: string;
    whoWeServeTitle: string;
    whoWeServeItems: { title: string; body: string }[];
    principlesTitle: string;
    principles: { title: string; body: string }[];
  };
  privacy: {
    pageTitle: string;
    lastUpdated: string;
    intro: string;
    sections: { heading: string; body: string }[];
  };
  terms: {
    pageTitle: string;
    lastUpdated: string;
    intro: string;
    sections: { heading: string; body: string }[];
  };
  footer: {
    tagline: string;
    productHeading: string;
    resourcesHeading: string;
    companyHeading: string;
    contactHeading: string;
    rights: string;
  };
  common: {
    loading: string;
    errorTitle: string;
    retry: string;
    allRights: string;
    backHome: string;
  };
  releaseBanner: {
    badge: string;
    headlinePrefix: string;
    whatsNewLabel: string;
    ctaLabel: string;
    dismissLabel: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    nav: {
      home: 'Home',
      features: 'Features',
      download: 'Download',
      guides: 'Guides',
      installGuide: 'Installation Guide',
      userGuide: 'User Guide',
      faq: 'FAQ',
      support: 'Support',
      about: 'About Us',
      privacy: 'Privacy Policy',
      terms: 'Terms & Conditions',
      accountDeletion: 'Account Deletion',
      admin: 'Admin Portal',
      downloadApk: 'Download APK',
      menu: 'Menu'
    },
    hero: {
      kicker: 'Official Android Customer App',
      headlineFallback: 'Professional Quotations & Invoices Built for Contractors and Artisans',
      subheadlineFallback:
        'Prepare itemized quotations, generate invoices, track construction materials, and share branded PDF documents on WhatsApp or Email—even without an internet connection.',
      primaryCta: 'Download APK',
      secondaryCta: 'Learn How It Works',
      trust1: 'Works offline after initial sign-in',
      trust2: 'Verified Customer APK releases',
      trust3: 'Instant PDF export & WhatsApp sharing',
      imageAlt: 'Builder reviewing project quotations on the FundiQuotations Android app in a workshop'
    },
    home: {
      screenshotsTitle: 'Designed for Fast Job-Site Workflows',
      screenshotsSubtitle:
        'Inspect real Android screens for creating itemized quotations, managing materials inventory, and exporting branded PDFs.',
      featuresTitle: 'Everything a Modern Fundi or Contracting Business Needs',
      featuresSubtitle:
        'Replace handwritten notebooks and broken spreadsheets with structured mobile estimating, billing, and customer records.',
      viewAllFeatures: 'Explore All Features',
      howItWorksTitle: 'How It Works',
      howItWorksSubtitle:
        'Go from downloading the Customer APK to sending accurate itemized quotations and invoices in four clear steps.',
      howSteps: [
        {
          number: '01.',
          title: 'Download & Set Up Business Profile',
          body: 'Install the Customer APK, sign in once, and save your business name, phone, TIN, logo, and payment details.'
        },
        {
          number: '02.',
          title: 'Organize Materials or Import Excel',
          body: 'Add Electrical, Plumbing, and Construction materials with unit prices in TSh or import your full catalog from Excel.'
        },
        {
          number: '03.',
          title: 'Select Inventory Items & Add Labor',
          body: 'Tap New Quote, filter and select saved materials in seconds, enter quantities, and add your labor charges.'
        },
        {
          number: '04.',
          title: 'Track Dashboard & Export PDF Offline',
          body: 'Monitor quotes and invoices on your Dashboard, export branded A4 PDFs, and share via WhatsApp or Email offline.'
        }
      ],
      benefitsTitle: 'Built for Accuracy, Speed, and Client Trust',
      benefitsSubtitle: 'Practical advantages that help independent fundis and engineering teams win more projects.',
      benefits: [
        {
          metric: '100% Offline Ready',
          title: 'Work Anywhere on Site',
          body: 'After your first online sign-in, create quotations, check material prices, and generate PDFs even in areas with zero mobile signal.'
        },
        {
          metric: 'Zero Math Errors',
          title: 'Automated Subtotals & Totals',
          body: 'Quantities, material rates, labor lines, discounts, and taxes calculate automatically so you never underprice a job.'
        },
        {
          metric: 'Client-Ready PDF',
          title: 'Win Confidence with Branded Documents',
          body: 'Every PDF includes your company header, logo, itemized breakdown, and clear payment terms ready for WhatsApp or Email.'
        }
      ],
      faqPreviewTitle: 'Frequently Asked Questions',
      faqPreviewSubtitle: 'Quick answers about downloading, installing, and running FundiQuotations offline.',
      viewAllFaqs: 'View All FAQs',
      ctaBannerTitle: 'Ready to Standardize Your Quotations and Invoices?',
      ctaBannerSubtitle:
        'Download the official FundiQuotations Customer APK and start issuing professional estimates from your Android phone.'
    },
    features: {
      pageTitle: 'Built for Field Contractors, Technicians, and Hardware Suppliers',
      pageSubtitle:
        'Every tool inside FundiQuotations is engineered around real East African workshop and job-site workflows—from material costing to PDF delivery.',
      offlineBadgeTitle: 'Offline Business Operations',
      offlineBadgeBody:
        'Sign in online once to verify your account. Afterwards, FundiQuotations runs full quotation, invoice, customer, and inventory workflows offline and syncs securely when connectivity returns.',
      items: [
        {
          id: 'quotations',
          number: '01.',
          title: 'Create Professional Quotations',
          summary:
            'Build numbered estimates (e.g. QTN-001) combining itemized materials from your inventory and labour charges (Gharama ya Ufundi) with clear issue and expiry dates.',
          highlights: [
            'Select multiple inventory items at once with automatic line totals in TSh',
            'Separate materials subtotal and workmanship/labour charges automatically',
            'Instant WhatsApp, Download PDF, Preview, and Make Invoice actions on every quote'
          ]
        },
        {
          id: 'invoices',
          number: '02.',
          title: 'Generate Invoices & Track Payment Status',
          summary:
            'Convert approved quotations into official numbered invoices (INV-001, INV-002) with one tap and clearly monitor PAID and UNPAID client balances.',
          highlights: [
            'One-tap Make Invoice conversion directly from any quotation summary',
            'Clear PAID and UNPAID badges with client names, dates, and TSh totals',
            'Quick-add button to create standalone official invoices anytime'
          ]
        },
        {
          id: 'customers',
          number: '03.',
          title: 'Manage Customers & Client Projects',
          summary:
            'Keep a searchable client directory by name or phone number showing saved site locations, linked project counts, and direct quote shortcuts.',
          highlights: [
            'Search clients instantly and view project counts (Miradi) and site location (Eneo)',
            'Tap Call, SMS, Edit, or Delete right from each customer card',
            'Start a New Quote pre-linked to any customer with one tap'
          ]
        },
        {
          id: 'materials',
          number: '04.',
          title: 'Manage Materials Inventory & Excel Import',
          summary:
            'Organize all Electrical, Plumbing, and Construction materials in TSh with fast search, unit types, quick price edits, and bulk Excel upload.',
          highlights: [
            'Filter materials cleanly across All, Electrical, Plumbing, and Construction tabs',
            'Bulk-import material catalogs via Import Excel or add items individually',
            'Track units (Pcs, Boxes, Bags, Meters) and update unit prices anytime'
          ]
        },
        {
          id: 'pdf',
          number: '05.',
          title: 'Export Branded A4 PDF Quotations & Invoices',
          summary:
            'Generate clean, print-ready A4 PDF documents displaying your company logo, Bill To client block, itemized table, terms, and authorized signature & stamp.',
          highlights: [
            'Displays company header, logo, Tel, Email, Location, and quotation validity status',
            'Structured # / Description / Qty & Unit / Price / Total (TZS) breakdown table',
            'Includes payment details, Grand Total box, and Authorized Signature & Stamp'
          ]
        },
        {
          id: 'sharing',
          number: '06.',
          title: 'Share as PDF or JPG via WhatsApp, Email & Print',
          summary:
            'Send finished quotations and invoices straight from the app in PDF or JPG format via WhatsApp, Gmail, Bluetooth, or direct Print.',
          highlights: [
            'Export and share documents in either PDF or JPG image format',
            'One-tap Share As sheet supporting WhatsApp, Gmail, Bluetooth, and Print',
            'Fast client delivery directly from QTN/INV summary or preview screen'
          ]
        },
        {
          id: 'branding',
          number: '07.',
          title: 'Business Information, Payment Details & Themes',
          summary:
            'Customize everything inside Settings: your business logo and contacts, Bank & Lipa Namba payment details, 12 visual themes, app lock, and expiry alerts.',
          highlights: [
            'Configure Business Information (logo, name, contacts, address) & Payment Details (Bank, Lipa Namba, Mobile Money)',
            'Switch between Light/Dark mode and 12 visual themes under Appearance & Themes',
            'Protect records with Security & Lock (App Password, Auto-lock) and Quotation expiry notifications'
          ]
        },
        {
          id: 'offline',
          number: '08.',
          title: 'Live Dashboard, Offline Mode & Cloud Backup',
          summary:
            'Monitor Total Quotes, Official Invoices, Material Items, Saved Customers, Labour Charges, and Total Project Value offline—with Cloud Sync when online.',
          highlights: [
            'Real-time Dashboard KPIs and Quick Actions (New Quote, Add Customer, Materials Stock, Invoices History)',
            'Works completely offline on site after your first online verification sign-in',
            'Cloud Sync, Backup Email, and Export/Import under Settings -> Backup & Restore'
          ]
        }
      ]
    },
    download: {
      pageTitle: 'Download FundiQuotations for Android',
      pageSubtitle: 'Download the official FundiQuotations Customer APK directly for your Android device.',
      appNameLabel: 'Application Name',
      versionLabel: 'Latest Version',
      sizeLabel: 'APK File Size',
      releaseDateLabel: 'Release Date',
      minAndroidLabel: 'Minimum Android',
      descriptionLabel: 'Package Summary',
      releaseNotesLabel: 'Release Notes',
      downloadBtn: 'Download Customer APK',
      downloadingBtn: 'Preparing Download...',
      installGuideLink: 'Read Step-by-Step Installation Guide',
      noApkTitle: 'No Published Customer APK Available Yet',
      noApkBody:
        'Our engineering team has not published a public Customer APK release in this portal yet. Please check back shortly or contact support for release timing.',
      noApkAction: 'Contact Support',
      previousVersionsTitle: 'Previous Published Customer Releases',
      downloadStartedToast: 'Your Customer APK download has started. Open your Downloads folder once complete.'
    },
    installGuide: {
      pageTitle: 'Android APK Installation Guide',
      pageSubtitle:
        'Follow these six clear steps to install the FundiQuotations Customer APK safely on any supported Android smartphone or tablet.',
      beforeYouStartTitle: 'Before You Begin',
      beforeYouStartBody:
        'Make sure you download the APK directly from our official Download page and confirm your phone runs the minimum supported Android version.',
      stepPrefix: 'Step',
      tipLabel: 'Helpful Tip',
      needHelpTitle: 'Having Trouble Installing?',
      needHelpBody:
        'If Android blocks the installation or you see a parsing error, verify the APK finished downloading completely and check our FAQ or contact support.',
      goToDownload: 'Go to Download Page',
      goToSupport: 'Ask Support'
    },
    userGuide: {
      pageTitle: 'FundiQuotations User Guide',
      pageSubtitle:
        'Step-by-step tutorials covering everything from initial sign-in and business branding to offline quotations and cloud backup.',
      searchPlaceholder: 'Search tutorials (e.g. PDF, offline, materials, backup)...',
      allTopics: 'All Topics',
      watchVideo: 'Watch Video Walkthrough',
      noResults: 'No tutorials matched your search. Try clearing the search filter.',
      sectionsCountLabel: 'Tutorial Sections'
    },
    faq: {
      pageTitle: 'Frequently Asked Questions',
      pageSubtitle:
        'Find clear answers on installing the Customer APK, managing offline data, exporting PDFs, and backing up your business records.',
      searchPlaceholder: 'Search questions...',
      allCategories: 'All Categories',
      noResults: 'No questions matched your search query.',
      stillNeedHelpTitle: 'Still Need Assistance?',
      stillNeedHelpBody:
        'Send a message to our technical support team and we will respond directly to your email.',
      contactSupportBtn: 'Contact Support'
    },
    support: {
      pageTitle: 'Support & Contact Us',
      pageSubtitle:
        'Reach the FundiQuotations support team for installation help, account assistance, or business feedback.',
      formTitle: 'Send a Support Message',
      nameLabel: 'Customer Name',
      namePlaceholder: 'e.g. Juma Mwangi',
      emailLabel: 'Email Address',
      emailPlaceholder: 'you@example.com',
      subjectLabel: 'Subject',
      subjectPlaceholder: 'e.g. Assistance with PDF logo setup',
      messageLabel: 'Message',
      messagePlaceholder: 'Describe your question, Android device model, or issue in detail...',
      submitBtn: 'Submit Support Request',
      submittingBtn: 'Sending Message...',
      successTitle: 'Message Received',
      successBody:
        'Thank you for contacting FundiQuotations. Our support team has received your inquiry and will reply to your email address.',
      sendAnotherBtn: 'Send Another Message',
      directChannelsTitle: 'Direct Support Channels',
      emailChannelLabel: 'Support Email',
      phoneChannelLabel: 'Phone Support',
      whatsappChannelLabel: 'WhatsApp Desk',
      officeLabel: 'Office Location',
      validation: {
        nameRequired: 'Please enter your full name (at least 2 characters).',
        emailInvalid: 'Please enter a valid email address.',
        subjectRequired: 'Please enter a brief subject.',
        messageMin: 'Please enter a detailed message (at least 10 characters).'
      }
    },
    about: {
      pageTitle: 'About FundiQuotations',
      pageSubtitle:
        'We build dependable mobile business software that empowers skilled artisans, contractors, and suppliers across East Africa.',
      missionTitle: 'Our Mission',
      missionBody:
        'Skilled tradespeople spend hours pricing materials and chasing handwritten estimates. FundiQuotations was created to give every fundi, workshop owner, and contractor fast, accurate, offline-capable quoting and invoicing right on their Android phone.',
      whoWeServeTitle: 'Who Uses FundiQuotations',
      whoWeServeItems: [
        {
          title: 'Builders & Civil Contractors',
          body: 'Estimate masonry, roofing, plastering, and finishing materials accurately before stepping onto the site.'
        },
        {
          title: 'Electricians & Plumbers',
          body: 'Maintain standard catalogs of cables, breakers, pipes, and fittings for instant itemized customer quotes.'
        },
        {
          title: 'Carpenters, Welders & Fabricators',
          body: 'Price timber, steel profiles, hardware, and workshop labor cleanly and share PDF invoices over WhatsApp.'
        }
      ],
      principlesTitle: 'Our Engineering Commitments',
      principles: [
        {
          title: 'Offline-First Reliability',
          body: 'Construction sites rarely have stable broadband. Your quotations, invoices, and materials remain available offline after initial sign-in.'
        },
        {
          title: 'Transparent APK Distribution',
          body: 'Every Customer APK release includes version history, release dates, file sizes, and minimum Android requirements.'
        },
        {
          title: 'Bilingual Accessibility',
          body: 'Full support for both English and Kiswahili ensures teams and clients communicate clearly in their preferred language.'
        }
      ]
    },
    privacy: {
      pageTitle: 'Privacy Policy',
      lastUpdated: 'Last updated: November 2026',
      intro:
        'FundiQuotations respects your privacy and handles business, customer, and support data with strict security controls.',
      sections: [
        {
          heading: '1. Information Collected via This Web Portal',
          body: 'When you submit a message through our Support / Contact Us form, we collect your name, email address, subject, message content, and preferred language strictly to respond to your inquiry. When you download the Customer APK, we record anonymous aggregate version download metrics (version identifier, source page, and language) without tracking personal device identifiers.'
        },
        {
          heading: '2. Application Data & Business Records',
          body: 'Inside the FundiQuotations Android application, your company profile, logo, customer directory, materials catalog, quotations, and invoices belong to your business. Offline data is stored securely on your device and synchronized only when you use authenticated backup or sync features.'
        },
        {
          heading: '3. Data Protection & Access Controls',
          body: 'Support inquiries and administrative records are protected by role-based access rules and encrypted transport (HTTPS). We never sell, rent, or expose customer contact lists to third-party advertisers.'
        },
        {
          heading: '4. Your Rights & Data Deletion',
          body: 'You may request updates or deletion of any support inquiry submitted through this portal by contacting our support team via email.'
        }
      ]
    },
    terms: {
      pageTitle: 'Terms & Conditions',
      lastUpdated: 'Last updated: November 2026',
      intro:
        'By downloading the FundiQuotations Customer APK or using the FundiQuotations Web Portal, you agree to the following terms.',
      sections: [
        {
          heading: '1. Permitted Use of the Customer APK',
          body: 'FundiQuotations grants you a non-exclusive license to install and use the official Customer APK on your Android devices for managing legitimate business quotations, invoices, customers, and materials. You must only download installation packages from official FundiQuotations channels.'
        },
        {
          heading: '2. Accuracy of Quotations & Financial Records',
          body: 'While FundiQuotations automates line-item totals and PDF formatting, you remain responsible for reviewing final prices, tax rates, currency figures, and client terms before sending quotations or invoices to customers.'
        },
        {
          heading: '3. Prohibited Actions',
          body: 'You may not reverse-engineer, redistribute modified APK files, impersonate official FundiQuotations releases, or attempt unauthorized access to administrative portals or backend storage.'
        },
        {
          heading: '4. Updates & Support',
          body: 'We periodically publish updated Customer APK versions with bug fixes and new capabilities. Regular cloud backups are recommended prior to upgrading or changing Android devices.'
        }
      ]
    },
    footer: {
      tagline:
        'Professional Android software for contractors, artisans, and technical workshops across East Africa.',
      productHeading: 'Product',
      resourcesHeading: 'Guides & Help',
      companyHeading: 'Company & Legal',
      contactHeading: 'Contact',
      rights: 'All rights reserved.'
    },
    common: {
      loading: 'Loading portal content...',
      errorTitle: 'Unable to Load Data',
      retry: 'Try Again',
      allRights: 'All rights reserved.',
      backHome: 'Back to Home'
    },
    releaseBanner: {
      badge: 'New APK Update',
      headlinePrefix: 'FundiQuotations',
      whatsNewLabel: "What's new:",
      ctaLabel: 'Download Update',
      dismissLabel: 'Dismiss update notification'
    }
  },
  sw: {
    nav: {
      home: 'Nyumbani',
      features: 'Vipengele',
      download: 'Pakua',
      guides: 'Miongozo',
      installGuide: 'Mwongozo wa Usakinishaji',
      userGuide: 'Mwongozo wa Mtumiaji',
      faq: 'Maswali (FAQ)',
      support: 'Msaada',
      about: 'Kuhusu Sisi',
      privacy: 'Sera ya Faragha',
      terms: 'Sheria na Masharti',
      accountDeletion: 'Kufuta Akaunti',
      admin: 'Dashibodi ya Admin',
      downloadApk: 'Pakua APK',
      menu: 'Menyu'
    },
    hero: {
      kicker: 'Programu Rasmi ya Wateja ya Android',
      headlineFallback: 'Nukuu za Bei na Ankara za Kitaalamu kwa Mafundi na Wakandarasi',
      subheadlineFallback:
        'Andaa nukuu za bei zenye mpangilio mzuri, tengeneza ankara, simamia vifaa vya ujenzi, na tuma PDF zenye nembo ya biashara yako kupitia WhatsApp au Barua Pepe—hata bila intaneti.',
      primaryCta: 'Pakua APK',
      secondaryCta: 'Jifunze Jinsi Inavyofanya Kazi',
      trust1: 'Inafanya kazi bila intaneti baada ya kuingia mara ya kwanza',
      trust2: 'Matoleo rasmi ya Customer APK yaliyothibitishwa',
      trust3: 'Hifadhi PDF na tuma moja kwa moja WhatsApp',
      imageAlt: 'Fundi akikagua nukuu za miradi kwenye simu ya Android kupitia programu ya FundiQuotations'
    },
    home: {
      screenshotsTitle: 'Imeundwa kwa Kazi za Haraka Kwenye Miradi',
      screenshotsSubtitle:
        'Tazama muonekano halisi wa Android wa kutengeneza nukuu za bei, kusimamia stoo ya vifaa, na kutoa PDF.',
      featuresTitle: 'Kila Kitu Ambacho Fundi au Mkandarasi wa Kisasa Anahitaji',
      featuresSubtitle:
        'Ondokana na daftari zinazopotea na mahesabu yenye makosa kwa kutumia mfumo wa kidijitali wa nukuu, ankara, na kumbukumbu za wateja.',
      viewAllFeatures: 'Tazama Vipengele Vyote',
      howItWorksTitle: 'Jinsi Inavyofanya Kazi',
      howItWorksSubtitle:
        'Kuanzia kupakua Customer APK hadi kutuma nukuu za bei na ankara sahihi kwa hatua nne rahisi.',
      howSteps: [
        {
          number: '01.',
          title: 'Pakua APK na Weka Wasifu wa Biashara',
          body: 'Sakinisha Customer APK, ingia mara ya kwanza, na hifadhi jina la biashara, simu, TIN, nembo, na njia za malipo.'
        },
        {
          number: '02.',
          title: 'Panga Stoo ya Vifaa au Pakia Excel',
          body: 'Ongeza vifaa vya Umeme, Bomba, na Ujenzi pamoja na bei zake kwa TSh au pakia orodha yako moja kwa moja kutoka Excel.'
        },
        {
          number: '03.',
          title: 'Chagua Vifaa na Weka Gharama za Ufundi',
          body: 'Bonyeza New Quote, chuja na chagua vifaa kutoka stoo kwa sekunde, weka idadi, na ongeza gharama za ufundi (labour).'
        },
        {
          number: '04.',
          title: 'Fuatilia Dashboard na Tuma PDF Offline',
          body: 'Kagua nukuu na ankara kwenye Dashboard, toa PDF zenye nembo ya kampuni, na tuma WhatsApp au Barua Pepe bila intaneti.'
        }
      ],
      benefitsTitle: 'Imeundwa kwa Usahihi, Kasi, na Imani ya Wateja',
      benefitsSubtitle: 'Faida za vitendo zinazowasaidia mafundi na kampuni za ufundi kupata miradi mingi zaidi.',
      benefits: [
        {
          metric: 'Inafanya Kazi Offline',
          title: 'Fanya Kazi Popote Site',
          body: 'Baada ya kuingia mara ya kwanza ukiwa na intaneti, endelea kuandaa nukuu, kukagua bei za vifaa, na kutoa PDF hata pasipo na mtandao.'
        },
        {
          metric: 'Hakuna Makosa ya Hesabu',
          title: 'Jumla na Kodi Kiotomatiki',
          body: 'Idadi, bei ya kimoja, gharama za ufundi, punguzo, na kodi huhesabiwa kiotomatiki ili usipate hasara kwenye makadirio.'
        },
        {
          metric: 'PDF Yenye Hadhi',
          title: 'Jenga Imani na Nyaraka Zenye Nembo',
          body: 'Kila PDF hubeba kichwa cha kampuni yako, nembo, mchanganuo wa vifaa, na masharti ya malipo tayari kwa WhatsApp.'
        }
      ],
      faqPreviewTitle: 'Maswali Yanayoulizwa Mara kwa Mara',
      faqPreviewSubtitle: 'Majibu ya haraka kuhusu kupakua, kusakinisha, na kutumia FundiQuotations bila intaneti.',
      viewAllFaqs: 'Tazama Maswali Yote',
      ctaBannerTitle: 'Uko Tayari Kufanya Nukuu na Ankara Zako Kuwa za Kitaalamu?',
      ctaBannerSubtitle:
        'Pakua Customer APK rasmi ya FundiQuotations leo na uanze kutoa makadirio bora kutoka kwenye simu yako ya Android.'
    },
    features: {
      pageTitle: 'Imeundwa kwa Wakandarasi, Mafundi, na Wauzaji wa Vifaa',
      pageSubtitle:
        'Kila kipengele ndani ya FundiQuotations kimebuniwa kuendana na mazingira halisi ya kazi za ufundi na ujenzi Afrika Mashariki.',
      offlineBadgeTitle: 'Uendeshaji wa Biashara Bila Intaneti (Offline)',
      offlineBadgeBody:
        'Ingia ukiwa na intaneti mara ya kwanza kuthibitisha akaunti yako. Baada ya hapo, tumia nukuu, ankara, wateja, na vifaa bila intaneti na kusawazisha ukirejea mtandaoni.',
      items: [
        {
          id: 'quotations',
          number: '01.',
          title: 'Tengeneza Nukuu za Bei za Kitaalamu',
          summary:
            'Andaa nukuu zenye namba (mf. QTN-001) zinazochanganya orodha ya vifaa kutoka stoo na gharama za ufundi (Labour) pamoja na tarehe ya mwisho wa nukuu.',
          highlights: [
            'Chagua vifaa vingi kwa pamoja kutoka stoo na uone Jumla Kuu kwa TSh kiotomatiki',
            'Tenganisha Jumla ya Vifaa na Gharama ya Ufundi (Labour) kwa uwazi',
            'Vitufe vya haraka vya WhatsApp, Download PDF, Preview, na Make Invoice kwenye kila nukuu'
          ]
        },
        {
          id: 'invoices',
          number: '02.',
          title: 'Tengeneza Ankara (Invoices) na Fuatilia Malipo',
          summary:
            'Badilisha nukuu iliyokubaliwa kuwa ankara rasmi yenye namba (INV-001, INV-002) kwa mguso mmoja na fuatilia hali ya PAID na UNPAID.',
          highlights: [
            'Kitufe cha Make Invoice kinachobadilisha nukuu kuwa ankara papo hapo',
            'Lebo za PAID na UNPAID zenye jina la mteja, tarehe, na kiasi cha TSh',
            'Kitufe cha (+) cha kuongeza ankara mpya muda wowote'
          ]
        },
        {
          id: 'customers',
          number: '03.',
          title: 'Simamia Wateja na Miradi Yao',
          summary:
            'Tunza orodha ya wateja unayoweza kuitafuta kwa jina au simu, ikionyesha eneo la mradi, idadi ya miradi, na kitufe cha kutengeneza nukuu moja kwa moja.',
          highlights: [
            'Tafuta mteja haraka na angalia Eneo lake na idadi ya Miradi aliyokupa',
            'Piga simu, tuma ujumbe, hariri au futa taarifa za mteja moja kwa moja',
            'Anzisha New Quote kwa mteja husika kwa kubonyeza kitufe kimoja'
          ]
        },
        {
          id: 'materials',
          number: '04.',
          title: 'Simamia Vifaa, Bei na Kupakia Excel',
          summary:
            'Panga vifaa vya Umeme (Electrical), Mabomba (Plumbing), na Ujenzi (Construction) kwa bei ya TSh ukiwa na utafutaji wa haraka na Import Excel.',
          highlights: [
            'Chuja vifaa kwa makundi: All, Electrical, Plumbing, na Construction',
            'Pakia orodha kubwa ya vifaa kwa Import Excel au ongeza kimoja kwa (+ Add Item)',
            'Hariri au futa vifaa na sasisha bei kwa kipimo (Pcs, Box, Mfuko, Mita)'
          ]
        },
        {
          id: 'pdf',
          number: '05.',
          title: 'Toa Nyaraka Rasmi za PDF za A4',
          summary:
            'Zalisha waraka safi wa PDF ya A4 wenye nembo ya kampuni yako, taarifa za mteja, jedwali la vifaa, masharti ya nukuu, na sahihi ya idhini.',
          highlights: [
            'Huonyesha nembo ya biashara, namba ya simu, barua pepe, eneo, na hali ya nukuu',
            'Jedwali nadhifu la #, Description/Material, Qty/Unit, Price (TZS), na Total',
            'Sehemu ya Grand Total, masharti ya nukuu, na Authorized Signature & Stamp'
          ]
        },
        {
          id: 'sharing',
          number: '06.',
          title: 'Shiriki PDF au JPG kwa WhatsApp, Email & Print',
          summary:
            'Tuma nukuu na ankara zilizokamilika moja kwa moja kwa mteja katika muundo wa PDF au JPG kupitia WhatsApp, Gmail, Bluetooth, au Print.',
          highlights: [
            'Chaguo la kushiriki kama PDF au picha ya JPG safi kwa mteja',
            'Menyu ya Share As inayounganisha WhatsApp, Gmail, Bluetooth, na Print',
            'Tuma moja kwa moja kutoka kwenye muhtasari wa nukuu au hakiki ya waraka'
          ]
        },
        {
          id: 'branding',
          number: '07.',
          title: 'Mipangilio ya Biashara, Malipo na Muonekano',
          summary:
            'Dhibiti kila kitu ndani ya Settings: Business Information (nembo na anwani), Payment Account Details, Appearance & Themes (12), na Security & Lock.',
          highlights: [
            'Weka Business Information (nembo, anwani) na Payment Details (Benki, Lipa Namba, Mobile Money)',
            'Badilisha Light/Dark mode na uchague kati ya mionekano 12 (Visual themes)',
            'Linda akaunti kwa App Password/Auto-lock na pata arifa nukuu zinapokaribia kuisha muda'
          ]
        },
        {
          id: 'offline',
          number: '08.',
          title: 'Dashibodi, Matumizi ya Offline & Cloud Backup',
          summary:
            'Fuatilia Total Quotes, Official Invoices, Material Items, Saved Customers, Labour Charges, na Total Project Value hata ukiwa offline.',
          highlights: [
            'Dashibodi yenye takwimu za TSh na Quick Actions (New Quote, Add Customer, Materials Stock, Invoices History)',
            'Inafanya kazi kikamilifu bila intaneti baada ya uthibitisho wa kwanza mtandaoni',
            'Cloud Sync, Backup Email, na Export/Import kupitia Settings -> Backup & Restore'
          ]
        }
      ]
    },
    download: {
      pageTitle: 'Pakua FundiQuotations ya Android',
      pageSubtitle: 'Pakua Customer APK rasmi ya FundiQuotations moja kwa moja kwa simu yako ya Android.',
      appNameLabel: 'Jina la Programu',
      versionLabel: 'Toleo Jipya Zaidi',
      sizeLabel: 'Ukubwa wa Faili la APK',
      releaseDateLabel: 'Tarehe ya Kutolewa',
      minAndroidLabel: 'Toleo la Chini la Android',
      descriptionLabel: 'Maelezo ya Toleo',
      releaseNotesLabel: 'Mabadiliko katika Toleo Hili',
      downloadBtn: 'Pakua Customer APK',
      downloadingBtn: 'Inaandaa Upakuaji...',
      installGuideLink: 'Soma Mwongozo wa Usakinishaji Hatua kwa Hatua',
      noApkTitle: 'Hakuna Customer APK Iliyochapishwa Bado',
      noApkBody:
        'Timu yetu bado haijachapisha toleo la umma la Customer APK katika tovuti hii. Tafadhali rudi tena hivi karibuni au wasiliana na kitengo cha msaada.',
      noApkAction: 'Wasiliana na Msaada',
      previousVersionsTitle: 'Matoleo ya Awali ya Customer APK',
      downloadStartedToast: 'Upakuaji wa Customer APK umeanza. Fungua folda ya Downloads ukikamilika.'
    },
    installGuide: {
      pageTitle: 'Mwongozo wa Usakinishaji wa APK Kwenye Android',
      pageSubtitle:
        'Fuata hatua hizi sita rahisi kusakinisha Customer APK ya FundiQuotations kwa usalama kwenye simu au kompyuta kibao yako ya Android.',
      beforeYouStartTitle: 'Kabla Hujaanza',
      beforeYouStartBody:
        'Hakikisha umepakua faili la APK kutoka kwenye ukurasa wetu rasmi wa Pakua na simu yako ina toleo la Android linalokubalika.',
      stepPrefix: 'Hatua',
      tipLabel: 'Kidokezo Muhimu',
      needHelpTitle: 'Umepata Changamoto Wakati wa Kusakinisha?',
      needHelpBody:
        'Ikiwa Android inazuia usakinishaji au inaonyesha hitilafu, hakikisha faili la APK limepakuliwa kikamilifu na kagua FAQ au wasiliana nasi.',
      goToDownload: 'Nenda Ukurasa wa Pakua',
      goToSupport: 'Omba Msaada'
    },
    userGuide: {
      pageTitle: 'Mwongozo wa Mtumiaji wa FundiQuotations',
      pageSubtitle:
        'Masomo ya hatua kwa hatua kuanzia kuingia mara ya kwanza na kuweka nembo hadi kuandaa nukuu offline na kuhifadhi nakala.',
      searchPlaceholder: 'Tafuta somo (mf. PDF, offline, vifaa, backup)...',
      allTopics: 'Mada Zote',
      watchVideo: 'Tazama Video ya Maelekezo',
      noResults: 'Hakuna somo lililolingana na utafutaji wako. Jaribu kufuta neno la utafutaji.',
      sectionsCountLabel: 'Sehemu za Mafunzo'
    },
    faq: {
      pageTitle: 'Maswali Yanayoulizwa Mara kwa Mara',
      pageSubtitle:
        'Pata majibu ya wazi kuhusu kusakinisha Customer APK, kutumia programu bila intaneti, kutoa PDF, na kulinda taarifa zako.',
      searchPlaceholder: 'Tafuta swali...',
      allCategories: 'Makundi Yote',
      noResults: 'Hakuna swali lililopatikana kwa maneno uliyoandika.',
      stillNeedHelpTitle: 'Bado Unahitaji Msaada?',
      stillNeedHelpBody:
        'Tuma ujumbe kwa timu yetu ya msaada wa kiufundi nasi tutakujibu moja kwa moja kupitia barua pepe yako.',
      contactSupportBtn: 'Wasiliana na Msaada'
    },
    support: {
      pageTitle: 'Msaada na Wasiliana Nasi',
      pageSubtitle:
        'Wasiliana na timu ya FundiQuotations kwa msaada wa usakinishaji, akaunti, au maoni ya kuboresha huduma.',
      formTitle: 'Tuma Ujumbe wa Msaada',
      nameLabel: 'Jina la Mteja',
      namePlaceholder: 'mf. Juma Mwangi',
      emailLabel: 'Barua Pepe',
      emailPlaceholder: 'wewe@mfano.com',
      subjectLabel: 'Kichwa cha Ujumbe',
      subjectPlaceholder: 'mf. Msaada wa kuweka nembo kwenye PDF',
      messageLabel: 'Ujumbe',
      messagePlaceholder: 'Eleza swali lako, aina ya simu ya Android, au tatizo kwa kina...',
      submitBtn: 'Tuma Ombi la Msaada',
      submittingBtn: 'Inatuma Ujumbe...',
      successTitle: 'Ujumbe Umepokelewa',
      successBody:
        'Asante kwa kuwasiliana na FundiQuotations. Timu yetu imepokea ujumbe wako na itakujibu kupitia barua pepe yako.',
      sendAnotherBtn: 'Tuma Ujumbe Mwingine',
      directChannelsTitle: 'Njia za Mawasiliano ya Moja kwa Moja',
      emailChannelLabel: 'Barua Pepe ya Msaada',
      phoneChannelLabel: 'Simu ya Msaada',
      whatsappChannelLabel: 'Huduma ya WhatsApp',
      officeLabel: 'Anwani ya Ofisi',
      validation: {
        nameRequired: 'Tafadhali andika jina lako kamili (angalau herufi 2).',
        emailInvalid: 'Tafadhali andika anwani sahihi ya barua pepe.',
        subjectRequired: 'Tafadhali andika kichwa kifupi cha ujumbe.',
        messageMin: 'Tafadhali andika ujumbe wa kina (angalau herufi 10).'
      }
    },
    about: {
      pageTitle: 'Kuhusu FundiQuotations',
      pageSubtitle:
        'Tunatengeneza programu imara za simu zinazowawezesha mafundi, wakandarasi, na wauzaji wa vifaa kote Afrika Mashariki.',
      missionTitle: 'Dhamira Yetu',
      missionBody:
        'Mafundi wenye ujuzi hutumia saa nyingi kukadiria vifaa na kupoteza makaratasi ya nukuu. FundiQuotations ilianzishwa ili kumpa kila fundi na mkandarasi mfumo wa haraka, sahihi, unaofanya kazi offline kwenye simu ya Android.',
      whoWeServeTitle: 'Wanaotumia FundiQuotations',
      whoWeServeItems: [
        {
          title: 'Wajenzi na Wakandarasi',
          body: 'Kadiria gharama za matofali, mabati, plasta, na vifaa vya kumalizia kazi kwa usahihi kabla ya kuanza mradi.'
        },
        {
          title: 'Mafundi Umeme na Mabomba',
          body: 'Tunza orodha ya nyaya, swichi, mabomba, na viungio kwa ajili ya kutoa nukuu za papo hapo kwa wateja.'
        },
        {
          title: 'Mafundi Seremala na Uchomeleaji',
          body: 'Piga hesabu ya mbao, vyuma, na gharama za ufundi kwa mpangilio na tuma ankara za PDF kupitia WhatsApp.'
        }
      ],
      principlesTitle: 'Ahadi Zetu za Kiufundi',
      principles: [
        {
          title: 'Uimara Bila Intaneti (Offline-First)',
          body: 'Maeneo ya ujenzi mara nyingi hayana mtandao imara. Nukuu, ankara, na vifaa vyako huendelea kufanya kazi offline baada ya kuingia.'
        },
        {
          title: 'Usambazaji Wazi wa APK',
          body: 'Kila toleo la Customer APK linajumuisha historia ya toleo, tarehe ya kutolewa, ukubwa wa faili, na mahitaji ya Android.'
        },
        {
          title: 'Upatikanaji kwa Lugha Mbili',
          body: 'Msaada kamili wa Kiingereza na Kiswahili unahakikisha timu na wateja wanaelewana bila vikwazo.'
        }
      ]
    },
    privacy: {
      pageTitle: 'Sera ya Faragha',
      lastUpdated: 'Ilisasishwa mwisho: Novemba 2026',
      intro:
        'FundiQuotations inaheshimu faragha yako na inalinda taarifa za biashara, wateja, na maombi ya msaada kwa uangalifu mkubwa.',
      sections: [
        {
          heading: '1. Taarifa Zinazokusanywa Kupitia Tovuti Hii',
          body: 'Unapotuma ujumbe kupitia fomu ya Msaada / Wasiliana Nasi, tunakusanya jina lako, barua pepe, kichwa, ujumbe, na lugha uliyochagua kwa lengo la kujibu ombi lako pekee. Unapopakua Customer APK, tunarekodi takwimu za jumla za upakuaji bila kukusanya taarifa binafsi za simu yako.'
        },
        {
          heading: '2. Taarifa za Biashara Ndani ya Programu',
          body: 'Ndani ya programu ya Android ya FundiQuotations, wasifu wa kampuni, nembo, wateja, vifaa, nukuu, na ankara ni mali ya biashara yako. Taarifa za offline huhifadhiwa kwenye kifaa chako na kusawazishwa tu unapotumia huduma za backup.'
        },
        {
          heading: '3. Ulinzi wa Data na Udhibiti wa Ufikiaji',
          body: 'Ujumbe wa msaada na kumbukumbu za usimamizi hulindwa kwa sheria za usalama na usimbaji fiche wa HTTPS. Hatuuzi wala hatutoi taarifa za wateja kwa watangazaji.'
        },
        {
          heading: '4. Haki Zako na Ufutaji wa Taarifa',
          body: 'Unaweza kuomba mabadiliko au ufutaji wa ujumbe wowote wa msaada uliotuma kupitia tovuti hii kwa kuwasiliana na timu yetu kwa barua pepe.'
        }
      ]
    },
    terms: {
      pageTitle: 'Sheria na Masharti',
      lastUpdated: 'Ilisasishwa mwisho: Novemba 2026',
      intro:
        'Kwa kupakua Customer APK ya FundiQuotations au kutumia Tovuti ya FundiQuotations, unakubaliana na masharti yafuatayo.',
      sections: [
        {
          heading: '1. Matumizi Yanayoruhusiwa ya Customer APK',
          body: 'FundiQuotations inakupa leseni isiyo ya kipekee ya kusakinisha na kutumia Customer APK rasmi kwenye simu zako za Android kwa ajili ya kusimamia nukuu, ankara, wateja, na vifaa vya biashara halali. Pakua kutoka vyanzo rasmi pekee.'
        },
        {
          heading: '2. Usahihi wa Nukuu na Kumbukumbu za Kifedha',
          body: 'Ingawa FundiQuotations huhesabu jumla na kuandaa PDF kiotomatiki, mtumiaji anawajibika kukagua bei za mwisho, viwango vya kodi, na masharti ya malipo kabla ya kutuma kwa wateja.'
        },
        {
          heading: '3. Matumizi Yaliyokatazwa',
          body: 'Hairuhusiwi kubadilisha msimbo wa APK, kusambaza matoleo yasiyo rasmi, au kujaribu kuingia bila idhini kwenye mifumo ya usimamizi.'
        },
        {
          heading: '4. Masasisho na Hifadhi Nakala (Backup)',
          body: 'Tunatoa matoleo mapya ya Customer APK mara kwa mara ili kuboresha utendaji. Tunashauri kufanya backup ya taarifa zako mara kwa mara kabla ya kubadilisha simu.'
        }
      ]
    },
    footer: {
      tagline:
        'Programu ya kisasa ya Android kwa wakandarasi, mafundi, na karakana za ufundi kote Afrika Mashariki.',
      productHeading: 'Bidhaa',
      resourcesHeading: 'Miongozo & Msaada',
      companyHeading: 'Kampuni & Sheria',
      contactHeading: 'Mawasiliano',
      rights: 'Haki zote zimehifadhiwa.'
    },
    common: {
      loading: 'Inapakia taarifa za tovuti...',
      errorTitle: 'Imeshindwa Kupakia Taarifa',
      retry: 'Jaribu Tena',
      allRights: 'Haki zote zimehifadhiwa.',
      backHome: 'Rudi Nyumbani'
    },
    releaseBanner: {
      badge: 'Toleo Jipya la APK',
      headlinePrefix: 'FundiQuotations',
      whatsNewLabel: 'Kilichoboreshwa:',
      ctaLabel: 'Pakua Toleo Jipya',
      dismissLabel: 'Funga taarifa ya toleo jipya'
    }
  }
};
