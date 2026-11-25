import {
  AppScreenshot,
  FaqItem,
  InstallationGuideStep,
  TutorialSection,
  WebsiteSettings
} from '../types/portal';
import sanitizedDashboardImg from '../assets/images/sanitized_dashboard_screen_1795562975604.jpg';
import sanitizedQuotationModalImg from '../assets/images/sanitized_quotation_modal_1795562973156.jpg';
import sanitizedInvoicesImg from '../assets/images/sanitized_invoices_screen_1795562972002.jpg';
import sanitizedCustomersImg from '../assets/images/sanitized_customers_screen_1795562972053.jpg';
import sanitizedQuotationPdfImg from '../assets/images/sanitized_quotation_pdf_1795562976728.jpg';

export const APP_SCREENSHOT_PATHS = {
  appIcon: '/assets/aistudio/1791321174061_51b70ad5.jpg',
  dashboard: sanitizedDashboardImg,
  selectItems: '/assets/aistudio/Screenshot_20261125_001841_FundiQuotations_76f0804b.jpg',
  materials: '/assets/aistudio/Screenshot_20261125_001746_FundiQuotations_2aa4e3fa.jpg',
  shareWhatsapp: '/assets/aistudio/file_00000000917881f4a70fcb26e02bf5f9_286116ad.png',
  pdfSample: sanitizedQuotationPdfImg,
  register: '/assets/aistudio/Screenshot_20261125_020315_FundiQuotations_98cd3424.jpg',
  settings: '/assets/aistudio/Screenshot_20261125_020904_FundiQuotations_f104a984.jpg',
  quotationSummary: sanitizedQuotationModalImg,
  invoices: sanitizedInvoicesImg,
  customers: sanitizedCustomersImg
} as const;

export const HERO_WORKSHOP_IMAGE = APP_SCREENSHOT_PATHS.dashboard;

export const DEFAULT_WEBSITE_SETTINGS: WebsiteSettings = {
  brandName: 'FundiQuotations',
  supportEmail: 'support.fundiquotations@gmail.com',
  supportPhone: '+255 627 318 891',
  whatsappNumber: '+255 627 318 891',
  officeAddressEn: 'Morogoro Region, Tanzania',
  officeAddressSw: 'Mkoa wa Morogoro, Tanzania',
  heroHeadlineEn: 'Professional Quotations & Invoices Built for Contractors and Artisans',
  heroHeadlineSw: 'Nukuu za Bei na Ankara za Kitaalamu kwa Mafundi na Wakandarasi',
  heroSubheadlineEn:
    'Prepare itemized quotations, generate invoices, manage construction materials, and share branded PDF documents on WhatsApp or Email—even offline.',
  heroSubheadlineSw:
    'Andaa nukuu za bei zenye mpangilio mzuri, tengeneza ankara, simamia vifaa vya ujenzi, na tuma PDF zenye nembo ya biashara yako kupitia WhatsApp au Barua Pepe—hata bila intaneti.',
  showDownloadCounter: false
};

export const DEFAULT_SCREENSHOTS: AppScreenshot[] = [
  {
    id: 'default-dashboard-overview',
    titleEn: 'Business & Project Dashboard',
    titleSw: 'Dashibodi ya Biashara na Miradi',
    captionEn:
      'Monitor total quotations, official invoices, material items, saved customers, labor charges, and recent project values at a glance.',
    captionSw:
      'Fuatilia idadi ya nukuu, ankara rasmi, vifaa vilivyopo stoo, wateja, gharama za ufundi, na thamani ya miradi yako papo hapo.',
    imageUrl: APP_SCREENSHOT_PATHS.dashboard,
    storagePath: '',
    sortOrder: 1,
    status: 'published'
  },
  {
    id: 'default-quotation-builder',
    titleEn: 'Select Materials from Inventory',
    titleSw: 'Chagua Vifaa Kutoka Stoo Kwenye Nukuu',
    captionEn:
      'Filter Electrical, Plumbing, or Construction items and check multiple materials in seconds to build accurate client quotations.',
    captionSw:
      'Chuja vifaa vya Umeme, Bomba, au Ujenzi na chagua vitu vingi kwa pamoja ili kuandaa nukuu ya mteja kwa sekunde chache.',
    imageUrl: APP_SCREENSHOT_PATHS.selectItems,
    storagePath: '',
    sortOrder: 2,
    status: 'published'
  },
  {
    id: 'default-materials-inventory',
    titleEn: 'Materials Catalog & Excel Import',
    titleSw: 'Orodha ya Vifaa na Kupakia Excel',
    captionEn:
      'Organize unit prices in TSh by trade category, import bulk price lists from Excel, and update item rates anytime.',
    captionSw:
      'Panga bei za vifaa kwa TSh kulingana na fani, pakia orodha nyingi kwa Excel, na sasisha bei wakati wowote.',
    imageUrl: APP_SCREENSHOT_PATHS.materials,
    storagePath: '',
    sortOrder: 3,
    status: 'published'
  }
];

export const DEFAULT_INSTALLATION_GUIDES: InstallationGuideStep[] = [
  {
    id: 'step-1',
    stepNumber: 1,
    titleEn: 'Download the Customer APK',
    titleSw: 'Pakua Faili la Customer APK',
    descriptionEn:
      'Tap the Download Customer APK button on our official Download page using Chrome or your Android browser. Wait until the download notification confirms 100% completion.',
    descriptionSw:
      'Bonyeza kitufe cha Pakua Customer APK kwenye ukurasa wetu rasmi wa Pakua ukitumia Chrome au kivinjari cha Android. Subiri hadi upakuaji ukamilike 100%.',
    tipEn: 'Verify that your internet connection stays steady during download so the APK file is not truncated.',
    tipSw: 'Hakikisha intaneti yako iko imara wakati wa kupakua ili faili la APK lisikatike katikati.',
    imageUrl: '',
    status: 'published'
  },
  {
    id: 'step-2',
    stepNumber: 2,
    titleEn: 'Open the Downloads Folder',
    titleSw: 'Fungua Folda ya Downloads',
    descriptionEn:
      'Open the Files or My Files app on your Android phone and navigate to the Downloads folder, or tap the completed download directly in your browser notification.',
    descriptionSw:
      'Fungua programu ya Files au My Files kwenye simu yako ya Android kisha nenda kwenye folda ya Downloads, au bonyeza taarifa ya upakuaji iliyokamilika.',
    tipEn: 'Look for a file ending in .apk named FundiQuotations-Customer.',
    tipSw: 'Tafuta faili linaloishia na .apk lenye jina la FundiQuotations-Customer.',
    imageUrl: '',
    status: 'published'
  },
  {
    id: 'step-3',
    stepNumber: 3,
    titleEn: 'Select the Downloaded APK',
    titleSw: 'Chagua Faili la APK Ulilopakua',
    descriptionEn:
      'Tap the FundiQuotations Customer APK file to launch the Android Package Installer prompt.',
    descriptionSw:
      'Gusa faili la FundiQuotations Customer APK ili kuanzisha mchakato wa kusakinisha kwenye Android.',
    tipEn: 'If your phone asks which app to open with, choose Package Installer.',
    tipSw: 'Simu ikiuliza itumie programu gani kufungua, chagua Package Installer.',
    imageUrl: '',
    status: 'published'
  },
  {
    id: 'step-4',
    stepNumber: 4,
    titleEn: 'Allow Installation from This Source',
    titleSw: 'Ruhusu Usakinishaji Kutoka Chanzo Hiki',
    descriptionEn:
      'When Android displays a security prompt for unknown apps, tap Settings and toggle ON "Allow from this source" for your browser or Files app, then press Back.',
    descriptionSw:
      'Android ikionyesha ujumbe wa usalama, bonyeza Settings kisha washa "Allow from this source" kwa kivinjari au Files app yako, halafu rudi nyuma.',
    tipEn: 'This standard Android permission only needs to be enabled once for direct APK installations.',
    tipSw: 'Ruhusa hii ya kawaida ya Android huwashwa mara moja tu kwa usakinishaji wa APK.',
    imageUrl: '',
    status: 'published'
  },
  {
    id: 'step-5',
    stepNumber: 5,
    titleEn: 'Install the Application',
    titleSw: 'Sakinisha Programu',
    descriptionEn:
      'Tap Install and wait a few seconds while Android verifies the package signature and copies the application onto your device.',
    descriptionSw:
      'Bonyeza Install na subiri sekunde chache wakati Android ikikagua sahihi ya faili na kusakinisha programu kwenye simu yako.',
    tipEn: 'Ensure you have at least 100 MB of free storage space before installing.',
    tipSw: 'Hakikisha simu yako ina nafasi ya angalau MB 100 kabla ya kusakinisha.',
    imageUrl: '',
    status: 'published'
  },
  {
    id: 'step-6',
    stepNumber: 6,
    titleEn: 'Open FundiQuotations',
    titleSw: 'Fungua FundiQuotations',
    descriptionEn:
      'Tap Open once installation finishes. Sign in online for the first time to activate your account, set up your business profile, and unlock offline mode.',
    descriptionSw:
      'Bonyeza Open usakinishaji ukikamilika. Ingia mtandaoni kwa mara ya kwanza kuwezesha akaunti yako, weka taarifa za biashara, na anza kutumia hata offline.',
    tipEn: 'After your first online sign-in, you can create quotes and export PDFs without internet.',
    tipSw: 'Baada ya kuingia mara ya kwanza ukiwa na intaneti, unaweza kuandaa nukuu na kutoa PDF bila mtandao.',
    imageUrl: '',
    status: 'published'
  }
];

export const DEFAULT_TUTORIALS: TutorialSection[] = [
  {
    id: 'tut-getting-started',
    slug: 'getting-started',
    category: 'Basics',
    sortOrder: 1,
    titleEn: 'Getting Started with FundiQuotations',
    titleSw: 'Kuanza Kutumia FundiQuotations',
    summaryEn: 'Understand the home dashboard, navigation tabs, and core workflow from materials to client PDFs.',
    summarySw: 'Elewa dashibodi kuu, menyu za chini, na mtiririko wa kazi kuanzia vifaa hadi kutoa PDF kwa mteja.',
    contentEn:
      'Once you open FundiQuotations, you will see quick actions for Quotations, Invoices, Customers, and Materials.\n\nStart by completing your Business Profile so your company header and logo appear automatically on every document. Next, add your common materials and key customers so creating quotes on a job site takes less than two minutes.',
    contentSw:
      'Ukifungua FundiQuotations, utaona sehemu kuu za Nukuu (Quotations), Ankara (Invoices), Wateja (Customers), na Vifaa (Materials).\n\nAnza kwa kujaza Wasifu wa Biashara ili jina na nembo yako vionekane kiotomatiki kwenye kila waraka. Kisha ongeza vifaa vyako vya kawaida na wateja wako muhimu ili kutengeneza nukuu kazini kuchukue chini ya dakika mbili.',
    imageUrl: APP_SCREENSHOT_PATHS.dashboard,
    videoUrl: '',
    status: 'published'
  },
  {
    id: 'tut-account-signin',
    slug: 'account-registration-signin',
    category: 'Account',
    sortOrder: 2,
    titleEn: 'Account Registration and Sign-In',
    titleSw: 'Usajili wa Akaunti na Kuingia',
    summaryEn: 'Create your FundiQuotations account and complete your first online verification.',
    summarySw: 'Fungua akaunti yako ya FundiQuotations na kamilisha uthibitisho wa kwanza ukiwa mtandaoni.',
    contentEn:
      '1. Connect your Android phone to mobile data or Wi-Fi for initial setup.\n2. Open FundiQuotations and choose Register or Sign In.\n3. Enter your email and password or authorized sign-in method.\n4. Once signed in, your local workspace is initialized and licensed for offline use.',
    contentSw:
      '1. Unganisha simu yako ya Android na intaneti (data au Wi-Fi) kwa usajili wa awali.\n2. Fungua FundiQuotations kisha chagua Sajili (Register) au Ingia (Sign In).\n3. Weka barua pepe na nenosiri lako.\n4. Ukishaingia, nafasi yako ya kazi kwenye simu inaanzishwa na kuwa tayari kwa matumizi ya offline.',
    imageUrl: APP_SCREENSHOT_PATHS.register,
    videoUrl: '',
    status: 'published'
  },
  {
    id: 'tut-business-profile',
    slug: 'business-profile-setup',
    category: 'Setup',
    sortOrder: 3,
    titleEn: 'Business Profile & Company Logo Setup',
    titleSw: 'Kuweka Taarifa za Biashara na Nembo',
    summaryEn: 'Add your company name, phone, TIN/registration number, payment instructions, and logo.',
    summarySw: 'Ongeza jina la biashara, simu, namba ya TIN, maelezo ya malipo, na nembo ya kampuni.',
    contentEn:
      'Go to Settings -> Business Profile.\n\nEnter your registered business name, physical address, phone number, and email. Tap Upload Logo to pick a clean PNG or JPG image from your phone gallery. Add default payment notes (such as bank account or mobile money paybill details) so they print neatly at the bottom of every invoice and quotation.',
    contentSw:
      'Nenda Mipangilio -> Wasifu wa Biashara.\n\nJaza jina la kampuni, anwani, namba ya simu, na barua pepe. Bonyeza Pakia Nembo kuchagua picha ya nembo kutoka kwenye simu yako. Ongeza maelezo ya malipo (benki au namba ya lipa) ili yachapishwe vizuri chini ya kila ankara na nukuu.',
    imageUrl: APP_SCREENSHOT_PATHS.settings,
    videoUrl: '',
    status: 'published'
  },
  {
    id: 'tut-adding-customers',
    slug: 'adding-customers',
    category: 'Directory',
    sortOrder: 4,
    titleEn: 'Adding and Managing Customers',
    titleSw: 'Kuongeza na Kusimamia Wateja',
    summaryEn: 'Save client contact details and view all linked quotations and invoices in one place.',
    summarySw: 'Hifadhi mawasiliano ya wateja na angalia historia ya nukuu na ankara zao kwa pamoja.',
    contentEn:
      'Open the Customers tab and tap + Add Customer.\n\nRecord the client name, phone number, email address, and project site location. Whenever you open a customer profile later, you can review every quotation and invoice issued to that client or start a new document pre-filled with their details.',
    contentSw:
      'Fungua kichupo cha Wateja (Customers) kisha bonyeza + Ongeza Mteja.\n\nRekodi jina la mteja, namba ya simu, barua pepe, na eneo la mradi. Kila unapofungua wasifu wa mteja baadaye, utaona nukuu na ankara zake zote au kuanzisha waraka mpya moja kwa moja.',
    imageUrl: APP_SCREENSHOT_PATHS.customers,
    videoUrl: '',
    status: 'published'
  },
  {
    id: 'tut-adding-materials',
    slug: 'adding-materials',
    category: 'Inventory',
    sortOrder: 5,
    titleEn: 'Adding Materials and Unit Prices',
    titleSw: 'Kuongeza Vifaa na Bei za Vipimo',
    summaryEn: 'Build your reusable material catalog with units, stock counts, and current market prices.',
    summarySw: 'Jenga orodha yako ya vifaa yenye vipimo, idadi iliyopo stoo, na bei za soko za sasa.',
    contentEn:
      'Open Materials and tap + New Material.\n\nEnter the item name (e.g., Portland Cement 50kg, 2.5mm Twin & Earth Cable), unit of measure (Bag, Roll, Piece, Meter), current unit price, and available stock quantity. Saved items appear in autocomplete whenever you build a quotation.',
    contentSw:
      'Fungua sehemu ya Vifaa (Materials) kisha bonyeza + Kifaa Kipya.\n\nAndika jina la kifaa (mf. Saruji 50kg, Waya wa 2.5mm), kipimo (Mfuko, Rola, Kipande, Mita), bei ya kimoja, na idadi iliyopo stoo. Vifaa vilivyohifadhiwa huonekana papo hapo unapoandaa nukuu.',
    imageUrl: APP_SCREENSHOT_PATHS.materials,
    videoUrl: '',
    status: 'published'
  },
  {
    id: 'tut-creating-quotations',
    slug: 'creating-quotations',
    category: 'Documents',
    sortOrder: 6,
    titleEn: 'Creating Professional Quotations',
    titleSw: 'Kutengeneza Nukuu za Bei za Kitaalamu',
    summaryEn: 'Combine saved materials, custom items, and labor charges into a clean client estimate.',
    summarySw: 'Unganisha vifaa vilivyohifadhiwa, bidhaa mpya, na gharama ya ufundi kwenye makadirio safi.',
    contentEn:
      'Tap + Create Quotation, select an existing customer (or add a new one inline), and set the quotation title and validity date.\n\nAdd material rows from your catalog or enter custom items, then add labor lines separately. Review any discount or tax percentage and tap Save Quotation.',
    contentSw:
      'Bonyeza + Tengeneza Nukuu, chagua mteja (au ongeza mpya hapo hapo), na weka kichwa cha mradi pamoja na tarehe ya ukomo wa nukuu.\n\nOngeza vifaa kutoka stoo au andika kipengele kipya, kisha ongeza gharama za ufundi. Kagua punguzo au kodi kama ipo kisha bonyeza Hifadhi Nukuu.',
    imageUrl: APP_SCREENSHOT_PATHS.pdfSample,
    videoUrl: '',
    status: 'published'
  },
  {
    id: 'tut-generating-invoices',
    slug: 'generating-invoices',
    category: 'Documents',
    sortOrder: 7,
    titleEn: 'Generating Invoices from Quotations',
    titleSw: 'Kutengeneza Ankara Kutoka Kwenye Nukuu',
    summaryEn: 'Convert accepted estimates into numbered invoices and track partial or full payments.',
    summarySw: 'Badilisha nukuu zilizokubaliwa kuwa ankara zenye namba na fuatilia malipo ya awali au kamili.',
    contentEn:
      'Open any approved quotation and tap Convert to Invoice.\n\nFundiQuotations copies all line items automatically and assigns your next sequential invoice number. You can record advance deposits paid by the client so the generated PDF clearly shows Total, Amount Paid, and Balance Due.',
    contentSw:
      'Fungua nukuu yoyote iliyokubaliwa na mteja kisha bonyeza Badilisha Kuwa Ankara (Convert to Invoice).\n\nProgramu itanakili vifaa vyote kiotomatiki na kutoa namba mpya ya ankara. Unaweza kurekodi malipo ya awali ili PDF ionyeshe Jumla, Kiasi Kilicholipwa, na Baki.',
    imageUrl: APP_SCREENSHOT_PATHS.invoices,
    videoUrl: '',
    status: 'published'
  },
  {
    id: 'tut-saving-sharing-pdf',
    slug: 'saving-sharing-pdf',
    category: 'Export',
    sortOrder: 8,
    titleEn: 'Saving and Sharing PDF Documents',
    titleSw: 'Kuhifadhi na Kutuma Nyaraka za PDF',
    summaryEn: 'Export formatted A4 PDFs offline and send via WhatsApp, Email, or Android Share.',
    summarySw: 'Toa PDF zenye mpangilio wa A4 hata bila intaneti na tuma kwa WhatsApp au Barua Pepe.',
    contentEn:
      'Open your saved quotation or invoice and tap Export PDF.\n\nPreview the document with your company logo and itemized table. Tap Save to Device to keep a local copy in your PDF folder, or tap Share to send directly through WhatsApp, Gmail/Email, or a connected printer.',
    contentSw:
      'Fungua nukuu au ankara uliyohifadhi kisha bonyeza Toa PDF (Export PDF).\n\nHakiki waraka ukiwa na nembo ya biashara yako. Bonyeza Hifadhi Kwenye Simu au Shiriki (Share) kutuma moja kwa moja kwa mteja kupitia WhatsApp, Barua Pepe, au kuchapisha.',
    imageUrl: APP_SCREENSHOT_PATHS.shareWhatsapp,
    videoUrl: '',
    status: 'published'
  },
  {
    id: 'tut-backup-restore',
    slug: 'backup-and-restore',
    category: 'Data Safety',
    sortOrder: 9,
    titleEn: 'Backup and Restore',
    titleSw: 'Kuhifadhi Nakala (Backup) na Kurejesha',
    summaryEn: 'Protect your customers, materials, and quotation history before changing or resetting phones.',
    summarySw: 'Linda taarifa za wateja, vifaa, na historia ya nukuu kabla ya kubadilisha au kufuta simu.',
    contentEn:
      'Navigate to Settings -> Backup & Restore while connected to the internet.\n\nTap Back Up Now to securely upload your encrypted local business snapshot to your account. When signing into a new Android device, tap Restore Backup to bring back all customers, materials, quotations, and invoices.',
    contentSw:
      'Nenda Mipangilio -> Backup & Restore ukiwa umeunganishwa na intaneti.\n\nBonyeza Hifadhi Nakala Sasa ili kulinda taarifa zako zote za biashara kwenye akaunti yako. Ukiingia kwenye simu mpya ya Android, bonyeza Rejesha Nakala (Restore) kupata wateja, vifaa, nukuu, na ankara zako zote.',
    imageUrl: APP_SCREENSHOT_PATHS.settings,
    videoUrl: '',
    status: 'published'
  },
  {
    id: 'tut-offline-usage',
    slug: 'offline-usage',
    category: 'Offline',
    sortOrder: 10,
    titleEn: 'Offline Business Operations',
    titleSw: 'Matumizi Bila Intaneti (Offline)',
    summaryEn: 'Work smoothly on remote sites after your initial online sign-in without losing any data.',
    summarySw: 'Fanya kazi kwa ufanisi maeneo yasiyo na mtandao baada ya kuingia mara ya kwanza.',
    contentEn:
      'FundiQuotations requires one successful online sign-in to verify your account and download your initial workspace.\n\nAfterwards, you can turn off mobile data or work in zero-signal basements and rural sites: adding customers, editing material prices, creating quotations, converting to invoices, and generating PDFs all operate locally on-device. When internet returns, run Sync/Backup to keep your cloud copy current.',
    contentSw:
      'FundiQuotations inahitaji uingie ukiwa na intaneti mara ya kwanza ili kuthibitisha akaunti yako.\n\nBaada ya hapo, hata kama uko site pasipo na mtandao, unaweza kuongeza wateja, kurekebisha bei za vifaa, kuandaa nukuu, kutengeneza ankara, na kutoa PDF moja kwa moja kwenye simu. Mtandao ukirejea, fanya Sync/Backup kuhifadhi nakala yako.',
    imageUrl: '',
    videoUrl: '',
    status: 'published'
  }
];

export const DEFAULT_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Download',
    sortOrder: 1,
    questionEn: 'Where do I download the official FundiQuotations Android app?',
    questionSw: 'Ninapakua wapi programu rasmi ya Android ya FundiQuotations?',
    answerEn:
      'Always download the Customer APK from the Download page of this official FundiQuotations Web Portal. We publish version numbers, file sizes, and SHA-256 checksums so you can verify authenticity.',
    answerSw:
      'Pakua Customer APK rasmi kupitia ukurasa wa Pakua (Download) kwenye tovuti hii ya FundiQuotations pekee. Tunaweka namba ya toleo, ukubwa wa faili, na SHA-256 ili uthibitishe usalama wake.',
    status: 'published'
  },
  {
    id: 'faq-2',
    category: 'Offline',
    sortOrder: 2,
    questionEn: 'Does FundiQuotations work without an internet connection?',
    questionSw: 'Je, FundiQuotations inafanya kazi bila intaneti?',
    answerEn:
      'Yes. After your first successful online sign-in, all core business features—customers, materials, quotations, invoices, and PDF generation—work completely offline.',
    answerSw:
      'Ndiyo. Baada ya kuingia mara ya kwanza ukiwa na intaneti, vipengele vyote vikuu—wateja, vifaa, nukuu, ankara, na kutengeneza PDF—hufanya kazi kikamilifu bila intaneti.',
    status: 'published'
  },
  {
    id: 'faq-3',
    category: 'Installation',
    sortOrder: 3,
    questionEn: 'Why does Android ask me to "Allow from this source" when installing the APK?',
    questionSw: 'Kwa nini Android inaomba ruhusa ya "Allow from this source" ninaposakinisha APK?',
    answerEn:
      'Android requires one-time permission before your browser or Files manager can install an APK downloaded outside the Play Store. Enable the toggle for that installation, complete setup, and you are ready to go.',
    answerSw:
      'Android huhitaji ruhusa ya mara moja kabla kivinjari au meneja wa faili kusakinisha APK iliyopakuliwa moja kwa moja. Washa ruhusa hiyo wakati wa usakinishaji kisha endelea.',
    status: 'published'
  },
  {
    id: 'faq-4',
    category: 'Documents',
    sortOrder: 4,
    questionEn: 'Can I put my company logo and payment details on PDF quotations?',
    questionSw: 'Je, ninaweza kuweka nembo ya kampuni yangu na maelezo ya malipo kwenye PDF?',
    answerEn:
      'Yes. Open Business Profile inside the app to upload your company logo, phone, address, TIN, and bank or mobile money payment instructions. They automatically appear on every PDF.',
    answerSw:
      'Ndiyo. Fungua Wasifu wa Biashara ndani ya programu ili kupakia nembo ya kampuni, simu, anwani, TIN, na maelezo ya malipo ya benki au simu. Yataonekana kwenye kila PDF.',
    status: 'published'
  },
  {
    id: 'faq-5',
    category: 'Documents',
    sortOrder: 5,
    questionEn: 'How do I send a quotation to my client on WhatsApp?',
    questionSw: 'Ninatumaje nukuu kwa mteja wangu kupitia WhatsApp?',
    answerEn:
      'Open any saved quotation or invoice, tap Export PDF, and select Share -> WhatsApp. The formatted PDF document attaches directly to your client chat.',
    answerSw:
      'Fungua nukuu au ankara uliyohifadhi, bonyeza Toa PDF (Export PDF), kisha chagua Shiriki -> WhatsApp. Faili la PDF litaambatanishwa moja kwa moja kwenye mazungumzo ya mteja.',
    status: 'published'
  },
  {
    id: 'faq-6',
    category: 'Backup',
    sortOrder: 6,
    questionEn: 'How do I keep my quotations safe if I change phones?',
    questionSw: 'Ninalindaje nukuu zangu nikibadilisha simu?',
    answerEn:
      'Use the Backup & Restore option in Settings whenever you are online. When you install FundiQuotations on a new Android phone and sign in with the same account, you can restore all records immediately.',
    answerSw:
      'Tumia kipengele cha Backup & Restore kwenye Mipangilio ukiwa mtandaoni. Ukisakinisha FundiQuotations kwenye simu mpya na kuingia kwa akaunti hiyohiyo, utarejesha kumbukumbu zako zote.',
    status: 'published'
  }
];
