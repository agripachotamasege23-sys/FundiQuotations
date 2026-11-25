import { Language } from '../types/portal';

export interface LegalBulletItem {
  lead?: string;
  text: string;
}

export interface LegalLinkItem {
  label: string;
  url: string;
}

export interface LegalSubsection {
  title: string;
  paragraphs?: string[];
  bullets?: LegalBulletItem[];
}

export interface LegalSection {
  id: string;
  heading: string;
  paragraphs?: string[];
  bullets?: LegalBulletItem[];
  bulletGroups?: {
    title?: string;
    bullets: LegalBulletItem[];
    afterParagraphs?: string[];
  }[];
  subsections?: LegalSubsection[];
  afterParagraphs?: string[];
  linksHeading?: string;
  links?: LegalLinkItem[];
  contactDetails?: { label: string; value: string; isEmail?: boolean }[];
  relatedPolicyLinks?: boolean;
}

export interface LegalDocumentData {
  title: string;
  effectiveDateLabel: string;
  effectiveDateValue: string;
  developerLabel: string;
  developerValue: string;
  contactEmailLabel: string;
  contactEmailValue: string;
  contentsHeading?: string;
  sections: LegalSection[];
}

export interface AccountDeletionDocumentData {
  title: string;
  appNameLabel: string;
  appNameValue: string;
  developerLabel: string;
  developerValue: string;
  howToTitle: string;
  howToIntro: string;
  option1Title: string;
  option1Body: string;
  option2Title: string;
  option2Intro: string;
  subjectLabel: string;
  exactSubjectLine: string;
  copySubjectBtn: string;
  copiedSubjectBtn: string;
  emailIncludeIntro: string;
  emailIncludeBullets: string[];
  emailSecurityWarning: string;
  whatHappensTitle: string;
  whatHappensParagraphs: string[];
  retainedTitle: string;
  retainedIntro: string;
  retainedBullets: string[];
  retainedOutro: string;
  importantNoticeTitle: string;
  importantNoticeBody: string;
  contactTitle: string;
  contactIntro: string;
  contactOrg: string;
  contactEmailLabel: string;
  contactEmailValue: string;
  privacyOutroPrefix: string;
  privacyLinkLabel: string;
  privacyOutroSuffix: string;
  sendEmailBtn: string;
}

export const TERMS_DOCUMENTS: Record<Language, LegalDocumentData> = {
  en: {
    title: 'FundiQuotations – Terms & Conditions',
    effectiveDateLabel: 'Effective Date',
    effectiveDateValue: 'October 26, 2026',
    developerLabel: 'Developer',
    developerValue: 'Agritech Electrical Solutions',
    contactEmailLabel: 'Contact Email',
    contactEmailValue: 'support.fundiquotations@gmail.com',
    sections: [
      {
        id: 'section-1',
        heading: '1. Acceptance of Terms',
        paragraphs: [
          'Welcome to FundiQuotations. These Terms & Conditions (“Terms”) govern your access to and use of the FundiQuotations platform, which includes the web application and the mobile application (Android APK) (collectively referred to as the “Service” or “Application”).',
          'By creating an account, accessing, or using the Service in any way, you agree to be bound by these Terms. If you do not agree to these Terms, you must not access or use the Service.'
        ]
      },
      {
        id: 'section-2',
        heading: '2. About FundiQuotations',
        paragraphs: [
          'FundiQuotations is a business tool designed to help electricians, plumbers, contractors, and other service providers create quotations, generate invoices, manage customer information, organize material costs, and calculate labor charges.',
          'The Service is intended solely as a business administration and productivity tool. It does not replace your professional judgment, technical expertise, or legal responsibility for the work you perform or the documents you issue.'
        ]
      },
      {
        id: 'section-3',
        heading: '3. User Accounts',
        paragraphs: [
          'You are responsible for providing accurate, complete, and up-to-date information when creating and maintaining your account.',
          'You are solely responsible for safeguarding your login credentials and for all activities that occur under your account. You must not share your password or other confidential account information with any unauthorized person.',
          'If you suspect any unauthorized access to your account, you must notify us immediately at support.fundiquotations@gmail.com.',
          'You must not use another person’s account without permission or provide false information in order to gain unauthorized access to the Service.'
        ]
      },
      {
        id: 'section-4',
        heading: '4. Quotations and Invoices',
        paragraphs: [
          'FundiQuotations provides tools to assist you in preparing quotations and invoices. You remain fully responsible for reviewing and verifying all information before sharing, printing, sending, or issuing any document to a customer.',
          'This includes, but is not limited to:'
        ],
        bullets: [
          { text: 'Customer names and contact details' },
          { text: 'Material descriptions, quantities, units, and prices' },
          { text: 'Labor charges, taxes (where applicable), discounts, and totals' },
          { text: 'Payment terms, due dates, and other commercial conditions' }
        ],
        afterParagraphs: [
          'You are solely responsible for ensuring that any quotation or invoice accurately reflects the agreement between you and your customer.',
          'FundiQuotations does not guarantee that every calculated amount will be correct in every situation. You must always carefully review the final figures before issuing any document.'
        ]
      },
      {
        id: 'section-5',
        heading: '5. Material Prices and Calculations',
        paragraphs: [
          'Material prices may vary depending on supplier, location, availability, and time. Any prices entered into or displayed by the Service are provided for convenience only and must be independently verified by you before use.',
          'You are solely responsible for confirming current prices, quantities, labor rates, taxes, and the final amount payable by your customer.',
          'Agritech Electrical Solutions shall not be liable for any losses arising from outdated prices, incorrect data entry, or calculations that were not properly reviewed by the user.'
        ]
      },
      {
        id: 'section-6',
        heading: '6. Customer Information',
        paragraphs: [
          'You must have a legitimate reason and any legally required consent or authorization before collecting, storing, or processing customer information within the Service.',
          'You agree to use customer information responsibly, protect it against unauthorized access, and comply with all applicable data protection and privacy laws.',
          'You must not use FundiQuotations to collect, store, or share any person’s information in an unlawful manner.'
        ]
      },
      {
        id: 'section-7',
        heading: '7. Plans, Trials, and Payments',
        paragraphs: [
          'Certain features or continued use of the Service may be subject to trial periods, subscription plans, or other usage limitations as displayed within the Application.',
          'Where a trial or paid plan is offered, its duration, limits, pricing, and conditions will be clearly communicated through the Application or the applicable purchase process.',
          'You are responsible for reviewing all plan details before making any purchase. Prices and features may be changed from time to time, subject to applicable law and the terms presented at the time of purchase.',
          'Where payments are processed by a third-party payment provider, that provider’s terms and conditions shall also apply.'
        ]
      },
      {
        id: 'section-8',
        heading: '8. Acceptable Use',
        paragraphs: ['You agree not to:'],
        bullets: [
          { text: 'Use the Service for any unlawful, fraudulent, or deceptive purpose' },
          { text: 'Attempt to gain unauthorized access to the Service, its systems, or another user’s account' },
          { text: 'Interfere with or disrupt the security, integrity, or proper functioning of the Service' },
          { text: 'Copy, modify, reverse-engineer, distribute, or commercially exploit the Service without authorization' },
          { text: 'Use the Service to create fraudulent quotations, invoices, or business records' }
        ],
        afterParagraphs: [
          'We reserve the right to suspend or restrict access where we reasonably believe these Terms have been violated, subject to applicable law.'
        ]
      },
      {
        id: 'section-9',
        heading: '9. Data Storage, Backup, and Loss',
        paragraphs: [
          'Your ability to access information stored in the Service may depend on your device, internet connection, application version, account status, and available backup options.',
          'You are solely responsible for making and securely retaining backups of important business records.',
          'Do not assume that uninstalling the application, changing devices, reinstalling the application, or signing out will automatically preserve or restore all of your data.',
          'While we take reasonable steps to maintain the Service, we cannot guarantee that data will never be lost, corrupted, or become inaccessible. Nothing in these Terms excludes any liability that cannot be excluded under applicable law.'
        ]
      },
      {
        id: 'section-10',
        heading: '10. Intellectual Property',
        paragraphs: [
          'The FundiQuotations name, branding, design, software, and all related materials are owned by or licensed to Agritech Electrical Solutions.',
          'You are granted a limited, non-exclusive, non-transferable right to use the Service for its intended business purposes only. You may not copy, resell, redistribute, or commercially exploit the Service or any of its protected elements without prior written authorization.',
          'You retain full ownership of and responsibility for the business content and documents you create using the Service.'
        ]
      },
      {
        id: 'section-11',
        heading: '11. Availability and Updates',
        paragraphs: [
          'We may update, improve, modify, suspend, or discontinue certain features of the Service at any time in order to improve performance, enhance security, or support ongoing development.',
          'We do not guarantee uninterrupted or error-free operation of the Service on every device or under all network conditions. Some features may require an active internet connection.'
        ]
      },
      {
        id: 'section-12',
        heading: '12. Account Suspension and Termination',
        paragraphs: [
          'We may suspend, restrict, or terminate an account where necessary to protect users, prevent fraud or abuse, address security risks, or comply with legal obligations.',
          'You may stop using the Service at any time. If you wish to delete your account and associated data, please follow the account deletion instructions within the Application or visit the FundiQuotations Account Deletion page.',
          'Account deletion and data retention are governed by the applicable Privacy Policy and relevant legal requirements.'
        ],
        relatedPolicyLinks: true
      },
      {
        id: 'section-13',
        heading: '13. Third-Party Services',
        paragraphs: [
          'The Service may rely on third-party providers for functions such as authentication, hosting, cloud storage, or payment processing.',
          'The availability of such functions depends on the relevant third-party provider. Your use of any third-party service may also be subject to that provider’s own terms and privacy policy.'
        ]
      },
      {
        id: 'section-14',
        heading: '14. Disclaimer',
        paragraphs: [
          'The Service is provided on an “as is” and “as available” basis as a business assistance tool. To the maximum extent permitted by applicable law, we do not warrant that the Service will be error-free, continuously available, or suitable for every user’s specific business requirements.',
          'You remain fully responsible for all professional decisions, technical work, safety practices, customer agreements, pricing, and compliance with applicable laws and regulations.'
        ]
      },
      {
        id: 'section-15',
        heading: '15. Limitation of Liability',
        paragraphs: [
          'To the maximum extent permitted by applicable law, Agritech Electrical Solutions shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of, or inability to use, the Service.',
          'Nothing in these Terms excludes or limits any liability that cannot be excluded or limited under the laws of the United Republic of Tanzania.'
        ]
      },
      {
        id: 'section-16',
        heading: '16. Changes to These Terms',
        paragraphs: [
          'We may revise these Terms from time to time. The updated version will be published on the FundiQuotations website or within the Application, together with a revised effective date.',
          'Your continued use of the Service after the updated Terms become effective constitutes your acceptance of the revised Terms, to the extent permitted by applicable law. If you do not agree to any material change, you should discontinue use of the Service.'
        ]
      },
      {
        id: 'section-17',
        heading: '17. Governing Law',
        paragraphs: [
          'These Terms shall be governed by and construed in accordance with the laws of the United Republic of Tanzania, without prejudice to any mandatory consumer protection or other legal rights that may apply to you.',
          'Any dispute arising out of or in connection with these Terms shall be resolved through the appropriate legal processes under applicable Tanzanian law.'
        ]
      },
      {
        id: 'section-18',
        heading: '18. Contact Us',
        paragraphs: ['If you have any questions regarding these Terms & Conditions, please contact us at:'],
        contactDetails: [
          { label: 'Developer', value: 'Agritech Electrical Solutions' },
          { label: 'Email', value: 'support.fundiquotations@gmail.com', isEmail: true }
        ]
      },
      {
        id: 'section-19',
        heading: '19. Related Policies',
        paragraphs: [
          'Please also review the FundiQuotations Privacy Policy to understand how we handle personal information, and the Account Deletion page for instructions on how to request deletion of your account and associated data.'
        ],
        relatedPolicyLinks: true
      }
    ]
  },
  sw: {
    title: 'FundiQuotations – Sheria na Masharti',
    effectiveDateLabel: 'Tarehe ya Kuanza Kutumika',
    effectiveDateValue: 'Oktoba 26, 2026',
    developerLabel: 'Msanidi (Developer)',
    developerValue: 'Agritech Electrical Solutions',
    contactEmailLabel: 'Barua Pepe ya Mawasiliano',
    contactEmailValue: 'support.fundiquotations@gmail.com',
    sections: [
      {
        id: 'section-1',
        heading: '1. Kukubali Masharti',
        paragraphs: [
          'Karibu FundiQuotations. Sheria na Masharti haya (“Masharti”) yanasimamia ufikiaji na matumizi yako ya jukwaa la FundiQuotations, ambalo linajumuisha programu ya wavuti (web application) na programu ya simu (Android APK) (kwa pamoja vikirejelewa kama “Huduma” au “Programu”).',
          'Kwa kufungua akaunti, kufikia, au kutumia Huduma kwa namna yoyote ile, unakubali kufungwa na Masharti haya. Ikiwa hukubaliani na Masharti haya, hupaswi kufikia wala kutumia Huduma.'
        ]
      },
      {
        id: 'section-2',
        heading: '2. Kuhusu FundiQuotations',
        paragraphs: [
          'FundiQuotations ni zana ya kibiashara iliyoundwa kuwasaidia mafundi umeme, mafundi bomba, wakandarasi, na watoa huduma wengine kutengeneza nukuu za bei (quotations), kutoa ankara (invoices), kusimamia taarifa za wateja, kupanga gharama za vifaa, na kukokotoa gharama za ufundi.',
          'Huduma imekusudiwa tu kama zana ya usimamizi wa biashara na kuongeza tija. Haichukui nafasi ya uamuzi wako wa kitaaluma, utaalamu wa kiufundi, au uwajibikaji wako wa kisheria kwa kazi unazofanya au nyaraka unazotoa.'
        ]
      },
      {
        id: 'section-3',
        heading: '3. Akaunti za Watumiaji',
        paragraphs: [
          'Unawajibika kutoa taarifa sahihi, kamili, na za sasa unapofungua na kudumisha akaunti yako.',
          'Unawajibika kikamilifu kulinda taarifa zako za kuingia (login credentials) na kwa shughuli zote zinazofanyika chini ya akaunti yako. Hupaswi kushiriki nenosiri lako au taarifa nyingine za siri za akaunti na mtu yeyote asiye na idhini.',
          'Ikiwa unashuku ufikiaji wowote usioidhinishwa kwenye akaunti yako, ni lazima utujulishe mara moja kupitia support.fundiquotations@gmail.com.',
          'Hupaswi kutumia akaunti ya mtu mwingine bila ruhusa au kutoa taarifa za uongo ili kupata ufikiaji usioidhinishwa kwenye Huduma.'
        ]
      },
      {
        id: 'section-4',
        heading: '4. Nukuu za Bei na Ankara',
        paragraphs: [
          'FundiQuotations hutoa zana za kukusaidia kuandaa nukuu za bei na ankara. Unaendelea kuwajibika kikamilifu kukagua na kuthibitisha taarifa zote kabla ya kushiriki, kuchapisha, kutuma, au kutoa waraka wowote kwa mteja.',
          'Hii inajumuisha, lakini haiko mipaka kwa:'
        ],
        bullets: [
          { text: 'Majina ya wateja na taarifa za mawasiliano' },
          { text: 'Maelezo ya vifaa, idadi, vipimo, na bei' },
          { text: 'Gharama za ufundi, kodi (pale inapohusika), punguzo, na jumla kuu' },
          { text: 'Masharti ya malipo, tarehe za mwisho wa malipo, na masharti mengine ya kibiashara' }
        ],
        afterParagraphs: [
          'Unawajibika pekee kuhakikisha kuwa nukuu au ankara yoyote inaakisi kwa usahihi makubaliano kati yako na mteja wako.',
          'FundiQuotations haihakikishi kuwa kila kiasi kilichokokotolewa kitakuwa sahihi katika kila hali. Ni lazima ukague kwa makini takwimu za mwisho kabla ya kutoa waraka wowote.'
        ]
      },
      {
        id: 'section-5',
        heading: '5. Bei za Vifaa na Mahesabu',
        paragraphs: [
          'Bei za vifaa zinaweza kutofautiana kulingana na msambazaji, eneo, upatikanaji, na muda. Bei zozote zinazoingizwa au kuonyeshwa na Huduma zinatolewa kwa urahisi tu na ni lazima zithibitishwe nawe binafsi kabla ya matumizi.',
          'Unawajibika pekee kuthibitisha bei za sasa, idadi, viwango vya ufundi, kodi, na kiasi cha mwisho kinachopaswa kulipwa na mteja wako.',
          'Agritech Electrical Solutions haitawajibika kwa hasara yoyote itakayotokana na bei zilizopitwa na wakati, uingizaji usio sahihi wa data, au mahesabu ambayo hayakukaguliwa ipasavyo na mtumiaji.'
        ]
      },
      {
        id: 'section-6',
        heading: '6. Taarifa za Wateja',
        paragraphs: [
          'Ni lazima uwe na sababu halali na idhini au ruhusa yoyote inayohitajika kisheria kabla ya kukusanya, kuhifadhi, au kuchakata taarifa za wateja ndani ya Huduma.',
          'Unakubali kutumia taarifa za wateja kwa uwajibikaji, kuzilinda dhidi ya ufikiaji usioidhinishwa, na kutii sheria zote zinazotumika za ulinzi wa data na faragha.',
          'Hupaswi kutumia FundiQuotations kukusanya, kuhifadhi, au kushiriki taarifa za mtu yeyote kwa njia isiyo halali.'
        ]
      },
      {
        id: 'section-7',
        heading: '7. Mipango, Majaribio, na Malipo',
        paragraphs: [
          'Baadhi ya vipengele au matumizi endelevu ya Huduma yanaweza kuwa chini ya vipindi vya majaribio, mipango ya usajili (subscription plans), au mipaka mingine ya matumizi kama inavyoonyeshwa ndani ya Programu.',
          'Pale ambapo mpango wa majaribio au wa kulipia unatolewa, muda wake, mipaka, bei, na masharti vitaelezwa wazi kupitia Programu au mchakato husika wa ununuzi.',
          'Unawajibika kukagua maelezo yote ya mpango kabla ya kufanya ununuzi wowote. Bei na vipengele vinaweza kubadilishwa mara kwa mara, kwa kuzingatia sheria zinazotumika na masharti yaliyowasilishwa wakati wa ununuzi.',
          'Pale ambapo malipo yanachakatwa na mtoa huduma wa malipo wa mtu wa tatu, sheria na masharti ya mtoa huduma huyo pia yatatumika.'
        ]
      },
      {
        id: 'section-8',
        heading: '8. Matumizi Yanayokubalika',
        paragraphs: ['Unakubali kutokufanya yafuatayo:'],
        bullets: [
          { text: 'Kutumia Huduma kwa madhumuni yoyote yasiyo halali, ya udanganyifu, au ya ulaghai' },
          { text: 'Kujaribu kupata ufikiaji usioidhinishwa kwenye Huduma, mifumo yake, au akaunti ya mtumiaji mwingine' },
          { text: 'Kuingilia au kuvuruga usalama, uadilifu, au utendaji sahihi wa Huduma' },
          { text: 'Kunakili, kurekebisha, kuvunja msimbo (reverse-engineer), kusambaza, au kutumia Huduma kibiashara bila idhini' },
          { text: 'Kutumia Huduma kutengeneza nukuu, ankara, au kumbukumbu za kibiashara za kughushi' }
        ],
        afterParagraphs: [
          'Tunahifadhi haki ya kusimamisha au kuzuia ufikiaji pale tunapoamini kwa sababu za msingi kuwa Masharti haya yamekiukwa, kwa kuzingatia sheria zinazotumika.'
        ]
      },
      {
        id: 'section-9',
        heading: '9. Uhifadhi wa Data, Nakala ya Akiba (Backup), na Upotevu',
        paragraphs: [
          'Uwezo wako wa kufikia taarifa zilizohifadhiwa kwenye Huduma unaweza kutegemea kifaa chako, muunganisho wa intaneti, toleo la programu, hali ya akaunti, na chaguo zilizopo za hifadhi ya akiba (backup).',
          'Unawajibika pekee kutengeneza na kuhifadhi kwa usalama nakala za akiba za kumbukumbu muhimu za biashara.',
          'Usidhani kuwa kuondoa programu (uninstalling), kubadilisha vifaa, kusakinisha upya programu, au kutoka kwenye akaunti (signing out) kutahifadhi au kurejesha data zako zote kiotomatiki.',
          'Ingawa tunachukua hatua zinazofaa kudumisha Huduma, hatuwezi kuhakikisha kuwa data haitawahi kupotea, kuharibika, au kutofikika. Hakuna chochote katika Masharti haya kinachoondoa uwajibikaji wowote ambao hauwezi kuondolewa chini ya sheria inayotumika.'
        ]
      },
      {
        id: 'section-10',
        heading: '10. Haki Miliki',
        paragraphs: [
          'Jina la FundiQuotations, chapa, muundo, programu (software), na nyenzo zote zinazohusiana zinamilikiwa na au zimepewa leseni kwa Agritech Electrical Solutions.',
          'Unapewa haki yenye mipaka, isiyo ya kipekee, na isiyohamishika ya kutumia Huduma kwa madhumuni yake yaliyokusudiwa ya kibiashara pekee. Hupaswi kunakili, kuuza tena, kusambaza, au kutumia kibiashara Huduma au vipengele vyake vilivyolindwa bila idhini ya maandishi ya awali.',
          'Unabaki na umiliki kamili na uwajibikaji wa maudhui na nyaraka za kibiashara unazotengeneza kwa kutumia Huduma.'
        ]
      },
      {
        id: 'section-11',
        heading: '11. Upatikanaji na Masasisho',
        paragraphs: [
          'Tunaweza kusasisha, kuboresha, kurekebisha, kusimamisha, au kusitisha baadhi ya vipengele vya Huduma wakati wowote ili kuboresha utendaji, kuimarisha usalama, au kuunga mkono maendeleo yanayoendelea.',
          'Hatuhakikishi utendaji usiokatika au usio na hitilafu wa Huduma kwenye kila kifaa au chini ya hali zote za mtandao. Baadhi ya vipengele vinaweza kuhitaji muunganisho hai wa intaneti.'
        ]
      },
      {
        id: 'section-12',
        heading: '12. Kusimamishwa na Kufutwa kwa Akaunti',
        paragraphs: [
          'Tunaweza kusimamisha, kuzuia, au kufunga akaunti pale inapohitajika kulinda watumiaji, kuzuia udanganyifu au matumizi mabaya, kushughulikia hatari za usalama, au kutii matakwa ya kisheria.',
          'Unaweza kuacha kutumia Huduma wakati wowote. Ikiwa unataka kufuta akaunti yako na data zinazohusiana, tafadhali fuata maelekezo ya kufuta akaunti ndani ya Programu au tembelea ukurasa wa Kufuta Akaunti wa FundiQuotations.',
          'Ufutaji wa akaunti na uhifadhi wa data vinasimamiwa na Sera ya Faragha inayotumika pamoja na matakwa husika ya kisheria.'
        ],
        relatedPolicyLinks: true
      },
      {
        id: 'section-13',
        heading: '13. Huduma za Watu wa Tatu',
        paragraphs: [
          'Huduma inaweza kutegemea watoa huduma wa watu wa tatu kwa kazi kama vile uthibitishaji wa akaunti, upangishaji (hosting), uhifadhi wa wingu (cloud storage), au uchakataji wa malipo.',
          'Upatikanaji wa kazi hizo unategemea mtoa huduma husika wa mtu wa tatu. Matumizi yako ya huduma yoyote ya mtu wa tatu yanaweza pia kuwa chini ya masharti na sera ya faragha ya mtoa huduma huyo.'
        ]
      },
      {
        id: 'section-14',
        heading: '14. Kanusho (Disclaimer)',
        paragraphs: [
          'Huduma inatolewa katika hali ilivyo (“as is”) na kadri inavyopatikana (“as available”) kama zana ya kusaidia biashara. Kwa kiwango cha juu kinachoruhusiwa na sheria inayotumika, hatutoi dhamana kuwa Huduma haitakuwa na hitilafu, itapatikana mfululizo, au itafaa kwa mahitaji mahususi ya biashara ya kila mtumiaji.',
          'Unaendelea kuwajibika kikamilifu kwa maamuzi yote ya kitaaluma, kazi za kiufundi, taratibu za usalama, makubaliano ya wateja, upangaji bei, na utii wa sheria na kanuni zinazotumika.'
        ]
      },
      {
        id: 'section-15',
        heading: '15. Ukomo wa Uwajibikaji',
        paragraphs: [
          'Kwa kiwango cha juu kinachoruhusiwa na sheria inayotumika, Agritech Electrical Solutions haitawajibika kwa uharibifu wowote usio wa moja kwa moja, wa bahati mbaya, maalum, wa matokeo, au wa adhabu unaotokana na au unaohusiana na matumizi yako, au kushindwa kutumia, Huduma.',
          'Hakuna chochote katika Masharti haya kinachoondoa au kupunguza uwajibikaji wowote ambao hauwezi kuondolewa au kupunguzwa chini ya sheria za Jamhuri ya Muungano wa Tanzania.'
        ]
      },
      {
        id: 'section-16',
        heading: '16. Mabadiliko ya Masharti Haya',
        paragraphs: [
          'Tunaweza kurekebisha Masharti haya mara kwa mara. Toleo lililosasishwa litachapishwa kwenye tovuti ya FundiQuotations au ndani ya Programu, pamoja na tarehe mpya ya kuanza kutumika.',
          'Kuendelea kwako kutumia Huduma baada ya Masharti yaliyosasishwa kuanza kutumika kutamaanisha kuwa umekubali Masharti yaliyorekebishwa, kwa kiwango kinachoruhusiwa na sheria inayotumika. Ikiwa hukubaliani na badiliko lolote kubwa, unapaswa kuacha kutumia Huduma.'
        ]
      },
      {
        id: 'section-17',
        heading: '17. Sheria Inayotumika',
        paragraphs: [
          'Masharti haya yatasimamiwa na kufasiriwa kwa mujibu wa sheria za Jamhuri ya Muungano wa Tanzania, bila kuathiri haki zozote za lazima za ulinzi wa mlaji au haki nyingine za kisheria zinazoweza kukuhusu.',
          'Mgogoro wowote utakaotokana na au kuhusiana na Masharti haya utatatuliwa kupitia taratibu sahihi za kisheria chini ya sheria inayotumika ya Tanzania.'
        ]
      },
      {
        id: 'section-18',
        heading: '18. Wasiliana Nasi',
        paragraphs: ['Ikiwa una maswali yoyote kuhusu Sheria na Masharti haya, tafadhali wasiliana nasi kupitia:'],
        contactDetails: [
          { label: 'Msanidi', value: 'Agritech Electrical Solutions' },
          { label: 'Barua Pepe', value: 'support.fundiquotations@gmail.com', isEmail: true }
        ]
      },
      {
        id: 'section-19',
        heading: '19. Sera Zinazohusiana',
        paragraphs: [
          'Tafadhali pia soma Sera ya Faragha ya FundiQuotations ili kuelewa jinsi tunavyoshughulikia taarifa binafsi, pamoja na ukurasa wa Kufuta Akaunti kwa maelekezo ya jinsi ya kuomba kufutwa kwa akaunti yako na data zinazohusiana.'
        ],
        relatedPolicyLinks: true
      }
    ]
  }
};

export const PRIVACY_DOCUMENTS: Record<Language, LegalDocumentData> = {
  en: {
    title: 'FundiQuotations – Privacy Policy',
    effectiveDateLabel: 'Effective Date',
    effectiveDateValue: 'October 26, 2026',
    developerLabel: 'Developer',
    developerValue: 'Agritech Electrical Solutions',
    contactEmailLabel: 'Contact Email',
    contactEmailValue: 'support.fundiquotations@gmail.com',
    contentsHeading: 'Contents',
    sections: [
      {
        id: 'section-1',
        heading: '1. Introduction',
        paragraphs: [
          'FundiQuotations (the “Service”, “we”, “us”, or “our”) is a business platform developed and operated by Agritech Electrical Solutions. The Service includes both the web application and the mobile application (Android).',
          'FundiQuotations helps electricians, plumbers, contractors, and other service providers prepare quotations and invoices, manage customers, materials, labour costs, and keep business records.',
          'This Privacy Policy explains what information we collect, how we use and protect it, with whom it may be shared, and the choices available to you. By creating an account or using the Service, you confirm that you have read and understood this Policy. If you do not agree with it, please do not use the Service.'
        ]
      },
      {
        id: 'section-2',
        heading: '2. Summary',
        paragraphs: [
          'FundiQuotations processes information necessary to provide quotation, invoice, customer, inventory, account, and licensing features. The main categories of information are:'
        ],
        bullets: [
          {
            lead: 'Account information',
            text: 'email address, sign-in method, account ID, and phone number (if verified by SMS). Used to create and secure your account via Google Firebase Authentication.'
          },
          {
            lead: 'Business profile',
            text: 'business name, address, contact details, TIN, logo, signature, and payment details you choose to include on documents.'
          },
          {
            lead: 'Customer and business records',
            text: 'customer details, quotations, invoices, materials, prices, labour charges, inventory, and notes that you enter.'
          },
          {
            lead: 'Payment information',
            text: 'selected plan, payment reference, amount, and status. Payments are processed by Google Play or the relevant payment provider. We do not receive your mobile-money PIN, card number, or security codes.'
          },
          {
            lead: 'Technical and license information',
            text: 'installation ID, license status, usage limits, device/browser information, and security signals processed by Google services.'
          }
        ],
        afterParagraphs: [
          'Most mobile features work offline. Depending on the features you use, account, license, or business information may be processed by Google Firebase or a payment provider.',
          'We do not sell personal information, display advertising in the Service, or use information for advertising or cross-app tracking.'
        ]
      },
      {
        id: 'section-3',
        heading: '3. Information We Collect',
        subsections: [
          {
            title: '3.1 Information You Provide',
            bullets: [
              {
                lead: 'Account information',
                text: 'email address and password (passwords are handled by Firebase Authentication and are not stored by us in readable form), Google account details (if you sign in with Google), or phone number (if verified by SMS).'
              },
              {
                lead: 'Business profile',
                text: 'business name, address, contact numbers, TIN, logo, signature, and bank or mobile-money details you choose to display on documents.'
              },
              {
                lead: 'Customer and business records',
                text: 'customers, quotations, invoices, materials and prices, labour charges, inventory, and notes.'
              },
              {
                lead: 'Files you upload or select',
                text: 'images (logo or signature) or other files you choose.'
              },
              {
                lead: 'Support communications',
                text: 'any information you send when contacting us for assistance.'
              }
            ]
          },
          {
            title: '3.2 Information About Other People (Your Customers)',
            paragraphs: [
              'When you enter details about your customers, you decide what information is stored. We process that information only to provide the Service’s features to you. You are responsible for having the legal right to collect and use such information and for using it lawfully.'
            ]
          },
          {
            title: '3.3 Payment Information',
            paragraphs: [
              'When you purchase a plan, we receive the plan selected and the payment result (reference, amount, and status). For mobile-money payments, we use the phone number and wallet you provide to request payment from the provider. We do not receive or store your mobile-money PIN, card number, card security code, or bank login credentials.'
            ]
          },
          {
            title: '3.4 Information Collected Automatically',
            bullets: [
              {
                lead: 'Mobile App',
                text: 'installation ID, license status and expiry, free quotation usage, device type, app version, and App Check signals.'
              },
              {
                lead: 'Web App',
                text: 'IP address, browser type and version, device type, pages visited, and similar technical data necessary to operate and secure the website.'
              },
              { text: 'Preferences such as language and theme.' }
            ]
          },
          {
            title: '3.5 Information We Do Not Collect',
            bullets: [
              { text: 'Precise or approximate location (GPS). Any “location” field is free text entered by you.' },
              { text: 'Contact list, camera, microphone, photos, or SMS content.' },
              { text: 'Fingerprint or face data (biometric unlock is handled by the device; the app only receives a yes/no result).' },
              { text: 'Advertising identifiers or any data used for advertising or tracking purposes.' }
            ]
          }
        ]
      },
      {
        id: 'section-4',
        heading: '4. How We Use Information',
        paragraphs: ['We use the information we collect to:'],
        bullets: [
          { text: 'Create and manage your account and authenticate you' },
          { text: 'Prepare, store, print, and export quotations and invoices' },
          { text: 'Calculate material costs, labour charges, and totals' },
          { text: 'Manage customer, material, and inventory records' },
          { text: 'Provide backup and restore functionality' },
          { text: 'Process payments, activate plans, and manage licenses' },
          { text: 'Maintain security, prevent fraud and misuse, and improve reliability' },
          { text: 'Provide customer support' },
          { text: 'Comply with legal obligations' }
        ]
      },
      {
        id: 'section-5',
        heading: '5. Legal Basis and Consent',
        paragraphs: ['We process your information:'],
        bullets: [
          { text: 'To provide the Service you requested' },
          { text: 'With your consent where required (for example, SMS verification or biometric unlock)' },
          { text: 'For our legitimate interests in security, fraud prevention, and accurate license and payment records' },
          { text: 'To comply with applicable legal obligations' }
        ]
      },
      {
        id: 'section-6',
        heading: '6. Where Your Data Is Stored',
        bullets: [
          {
            lead: 'On your device (Mobile)',
            text: 'Most records are stored in a local database. The mobile app works offline for the majority of features.'
          },
          {
            lead: 'In the cloud',
            text: 'Account details, license information, and business records may be synchronised or backed up to Google Firebase (Cloud Firestore) and linked to your account. Security rules restrict access to your own signed-in account only.'
          },
          {
            lead: 'Web App',
            text: 'Data is processed and stored on secure servers operated by our service providers.'
          }
        ],
        afterParagraphs: [
          'Authorised administrators may access account and license information when necessary to provide support, manage licenses, or protect the Service.',
          'Automatic Android backup is disabled for the mobile app. Uninstalling the app or clearing its data removes local records unless you have previously backed them up to the cloud or exported them.',
          'Files you export, save, or share (for example PDFs or backup files) are outside our control once they leave the Service.'
        ]
      },
      {
        id: 'section-7',
        heading: '7. Sharing and Disclosure',
        paragraphs: [
          'We do not sell or rent your personal information. We share information only in the following circumstances:'
        ],
        bullets: [
          {
            lead: 'Service providers',
            text: 'Google (Firebase Authentication, Cloud Firestore, Cloud Functions, App Check, Google Sign-In, and Google Play Billing) and the payment provider that processes mobile-money, card, or bank payments. These providers process information solely to deliver their services under their own privacy terms.'
          },
          {
            lead: 'Legal and safety requirements',
            text: 'When required by law or a valid legal request, or to protect the rights, safety, and security of users, the public, or the Service, and to prevent fraud.'
          },
          {
            lead: 'Business transfers',
            text: 'If the Service or business is transferred to another owner, your information may be transferred under equivalent protections.'
          },
          {
            lead: 'At your direction',
            text: 'When you share a quotation or invoice (for example via PDF or messaging apps), the recipient receives only what you choose to send.'
          }
        ],
        linksHeading: 'Relevant third-party policies:',
        links: [
          { label: 'Google Privacy Policy', url: 'https://policies.google.com/privacy' },
          { label: 'Firebase Privacy', url: 'https://firebase.google.com/support/privacy' },
          { label: 'Google Play Terms of Service', url: 'https://play.google.com/about/play-terms/' }
        ]
      },
      {
        id: 'section-8',
        heading: '8. Payments',
        paragraphs: [
          'Plans may be paid through Google Play, mobile money, or card/bank payment pages provided by our payment provider. Our systems confirm the payment with the relevant provider and then activate your plan. Prices are controlled on our server.',
          'Payments made through Google Play are subject to Google Play’s terms and refund policies. We retain a record of your plan, payment reference, amount, and status.'
        ]
      },
      {
        id: 'section-9',
        heading: '9. App Permissions and Web Technologies',
        subsections: [
          {
            title: 'Mobile App Permissions',
            bullets: [
              {
                lead: 'Internet and network state',
                text: 'required for sign-in, synchronisation, backup, and payments'
              },
              {
                lead: 'Biometric',
                text: 'only if you enable fingerprint or face unlock'
              },
              {
                lead: 'Storage (Android 9 and older)',
                text: 'to save PDF files'
              },
              {
                lead: 'Google Play Billing',
                text: 'to purchase plans'
              }
            ],
            paragraphs: [
              'The mobile app does not request location, camera, microphone, contacts, or SMS permissions.'
            ]
          },
          {
            title: 'Web App',
            paragraphs: [
              'We may use essential cookies and similar technologies necessary for authentication, security, and basic functionality. We do not use advertising or tracking cookies.'
            ]
          }
        ]
      },
      {
        id: 'section-10',
        heading: '10. Data Security',
        paragraphs: ['We implement appropriate technical and organisational measures, including:'],
        bullets: [
          { text: 'Encrypted connections (HTTPS/TLS)' },
          { text: 'Access controls limiting cloud records to the account owner' },
          { text: 'Server-side verification of payments' },
          { text: 'Encryption of biometric credentials using the Android Keystore (mobile)' },
          { text: 'Protection of local data within the Android application sandbox' }
        ],
        afterParagraphs: [
          'No system is completely secure. Please protect your devices with a screen lock, keep your password confidential, and keep your software up to date.'
        ]
      },
      {
        id: 'section-11',
        heading: '11. Data Retention and Deletion',
        paragraphs: ['We retain your information while your account remains active and for as long as necessary to provide the Service.'],
        bulletGroups: [
          {
            title: 'How to delete your data:',
            bullets: [
              {
                lead: 'In the mobile app',
                text: 'Go to Settings → Delete Account, enter your password, and confirm. This permanently deletes your account, customers, quotations, invoices, materials, business profile, and cloud backups.'
              },
              {
                lead: 'By email',
                text: 'Send a request to support.fundiquotations@gmail.com. We aim to complete verified deletion requests within 30 days.'
              }
            ],
            afterParagraphs: [
              'Uninstalling the mobile app does not delete your cloud data. You must use the Delete Account function or contact us if you want the data removed.'
            ]
          },
          {
            title: 'Information that may be retained after deletion:',
            bullets: [
              { text: 'Payment and license records required for accounting, tax, dispute resolution, and fraud prevention' },
              { text: 'Purchase records held by Google Play' },
              { text: 'Files you previously exported or shared' },
              { text: 'Short-lived system logs or backups maintained by service providers until overwritten' }
            ]
          }
        ],
        relatedPolicyLinks: true
      },
      {
        id: 'section-12',
        heading: '12. Your Rights and Choices',
        paragraphs: ['Under applicable data protection laws, including Tanzania’s Personal Data Protection Act, 2022, you may have the right to:'],
        bullets: [
          { text: 'Access, correct, or delete your personal information' },
          { text: 'Receive a copy of your data' },
          { text: 'Withdraw consent' },
          { text: 'Object to or restrict certain processing' }
        ],
        afterParagraphs: [
          'You can correct most information directly in the Service, export your records using the backup and PDF features, disable biometric unlock, and delete your account. For any other requests, please contact us using the details in Section 16. You also have the right to lodge a complaint with the relevant data protection authority.'
        ]
      },
      {
        id: 'section-13',
        heading: "13. Children's Privacy",
        paragraphs: [
          'FundiQuotations is a business tool intended for technicians and business users. It is not directed at children and is not intended for anyone under the age of 18. We do not knowingly collect personal information from children. If you believe a child has provided us with information, please contact us and we will delete it.'
        ]
      },
      {
        id: 'section-14',
        heading: '14. International Data Transfers',
        paragraphs: [
          'Google’s servers that provide Firebase and Google Play services may be located outside Tanzania. By using the Service, you acknowledge that your information may be processed in other countries under the safeguards and terms of these providers.'
        ]
      },
      {
        id: 'section-15',
        heading: '15. Changes to This Policy',
        paragraphs: [
          'We may update this Privacy Policy from time to time. The updated version will show a new effective date and will be made available in the Service and on our website. If a change is material, we will provide notice within the Service. Your continued use of the Service after the effective date of the updated Policy constitutes acceptance of the changes.'
        ]
      },
      {
        id: 'section-16',
        heading: '16. Contact Information',
        paragraphs: ['For privacy-related questions, data requests, or account deletion, please contact:'],
        contactDetails: [
          { label: 'Application', value: 'FundiQuotations' },
          { label: 'Developer / Business', value: 'Agritech Electrical Solutions' },
          { label: 'Contact Person', value: 'Agripa Edward Chotamasege' },
          { label: 'Email', value: 'support.fundiquotations@gmail.com', isEmail: true }
        ],
        afterParagraphs: [
          'By using FundiQuotations, you acknowledge that you have read and understood this Privacy Policy.'
        ],
        relatedPolicyLinks: true
      }
    ]
  },
  sw: {
    title: 'FundiQuotations – Sera ya Faragha',
    effectiveDateLabel: 'Tarehe ya Kuanza Kutumika',
    effectiveDateValue: 'Oktoba 26, 2026',
    developerLabel: 'Msanidi (Developer)',
    developerValue: 'Agritech Electrical Solutions',
    contactEmailLabel: 'Barua Pepe ya Mawasiliano',
    contactEmailValue: 'support.fundiquotations@gmail.com',
    contentsHeading: 'Yaliyomo',
    sections: [
      {
        id: 'section-1',
        heading: '1. Utangulizi',
        paragraphs: [
          'FundiQuotations (“Huduma”, “sisi”, “yetu”) ni jukwaa la kibiashara lililotengenezwa na kuendeshwa na Agritech Electrical Solutions. Huduma hii inajumuisha programu ya wavuti (web application) na programu ya simu (Android).',
          'FundiQuotations inawasaidia mafundi umeme, mafundi bomba, wakandarasi, na watoa huduma wengine kuandaa nukuu za bei na ankara, kusimamia wateja, vifaa, gharama za ufundi, na kutunza kumbukumbu za biashara.',
          'Sera hii ya Faragha inaeleza taarifa tunazokusanya, jinsi tunavyozitumia na kuzilinda, ni nani tunaweza kushiriki naye, na chaguo ulizo nazo. Kwa kufungua akaunti au kutumia Huduma, unathibitisha kuwa umesoma na kuelewa Sera hii. Ikiwa hukubaliani nayo, tafadhali usitumie Huduma.'
        ]
      },
      {
        id: 'section-2',
        heading: '2. Muhtasari',
        paragraphs: [
          'FundiQuotations huchakata taarifa zinazohitajika kutoa vipengele vya nukuu za bei, ankara, wateja, stoo ya vifaa, akaunti, na leseni. Makundi makuu ya taarifa ni:'
        ],
        bullets: [
          {
            lead: 'Taarifa za akaunti',
            text: 'anwani ya barua pepe, njia ya kuingia, kitambulisho cha akaunti (account ID), na namba ya simu (ikiwa imethibitishwa kwa SMS). Hutumika kufungua na kulinda akaunti yako kupitia Google Firebase Authentication.'
          },
          {
            lead: 'Wasifu wa biashara',
            text: 'jina la biashara, anwani, taarifa za mawasiliano, TIN, nembo (logo), saini, na taarifa za malipo unazochagua kuweka kwenye nyaraka.'
          },
          {
            lead: 'Kumbukumbu za wateja na biashara',
            text: 'taarifa za wateja, nukuu za bei, ankara, vifaa, bei, gharama za ufundi, stoo, na maelezo (notes) unayoingiza.'
          },
          {
            lead: 'Taarifa za malipo',
            text: 'mpango uliochaguliwa, kumbukumbu ya malipo (payment reference), kiasi, na hali ya malipo. Malipo huchakatwa na Google Play au mtoa huduma husika wa malipo. Hatupokei PIN yako ya pesa mtandaoni (mobile-money), namba ya kadi, au misimbo ya usalama.'
          },
          {
            lead: 'Taarifa za kiufundi na leseni',
            text: 'kitambulisho cha usakinishaji (installation ID), hali ya leseni, mipaka ya matumizi, taarifa za kifaa/kivinjari, na ishara za usalama zinazochakatwa na huduma za Google.'
          }
        ],
        afterParagraphs: [
          'Vipengele vingi vya programu ya simu hufanya kazi bila intaneti (offline). Kulingana na vipengele unavyotumia, taarifa za akaunti, leseni, au biashara zinaweza kuchakatwa na Google Firebase au mtoa huduma wa malipo.',
          'Hatuuzi taarifa binafsi, hatuonyeshi matangazo ndani ya Huduma, wala hatutumii taarifa kwa matangazo au ufuatiliaji wa programu mbalimbali (cross-app tracking).'
        ]
      },
      {
        id: 'section-3',
        heading: '3. Taarifa Tunazokusanya',
        subsections: [
          {
            title: '3.1 Taarifa Unazotoa Wewe',
            bullets: [
              {
                lead: 'Taarifa za akaunti',
                text: 'anwani ya barua pepe na nenosiri (nenosiri linashughulikiwa na Firebase Authentication na halihifadhiwi nasi katika mfumo unaosomeka), taarifa za akaunti ya Google (ikiwa utaingia kupitia Google), au namba ya simu (ikiwa imethibitishwa kwa SMS).'
              },
              {
                lead: 'Wasifu wa biashara',
                text: 'jina la biashara, anwani, namba za mawasiliano, TIN, nembo, saini, na taarifa za benki au pesa mtandaoni unazochagua kuonyesha kwenye nyaraka.'
              },
              {
                lead: 'Kumbukumbu za wateja na biashara',
                text: 'wateja, nukuu za bei, ankara, vifaa na bei, gharama za ufundi, stoo, na maelezo.'
              },
              {
                lead: 'Faili unazopakia au kuchagua',
                text: 'picha (nembo au saini) au faili nyingine unazochagua.'
              },
              {
                lead: 'Mawasiliano ya msaada',
                text: 'taarifa zozote unazotuma unapowasiliana nasi kwa ajili ya msaada.'
              }
            ]
          },
          {
            title: '3.2 Taarifa Kuhusu Watu Wengine (Wateja Wako)',
            paragraphs: [
              'Unapoingiza taarifa kuhusu wateja wako, wewe ndiye unayeamua ni taarifa zipi zihifadhiwe. Tunachakata taarifa hizo ili tu kukupatia vipengele vya Huduma. Unawajibika kuwa na haki ya kisheria ya kukusanya na kutumia taarifa hizo na kuzitumia kwa mujibu wa sheria.'
            ]
          },
          {
            title: '3.3 Taarifa za Malipo',
            paragraphs: [
              'Unaponunua mpango, tunapokea mpango uliochaguliwa na matokeo ya malipo (kumbukumbu, kiasi, na hali). Kwa malipo ya pesa mtandaoni (mobile-money), tunatumia namba ya simu na mkoba (wallet) uliotoa kuomba malipo kutoka kwa mtoa huduma. Hatupokei wala hatuhifadhi PIN yako ya pesa mtandaoni, namba ya kadi, msimbo wa usalama wa kadi, au taarifa za kuingia benki.'
            ]
          },
          {
            title: '3.4 Taarifa Zinazokusanywa Kiotomatiki',
            bullets: [
              {
                lead: 'Programu ya Simu (Mobile App)',
                text: 'kitambulisho cha usakinishaji (installation ID), hali ya leseni na muda wake wa kuisha, matumizi ya nukuu za bure, aina ya kifaa, toleo la programu, na ishara za App Check.'
              },
              {
                lead: 'Programu ya Wavuti (Web App)',
                text: 'anwani ya IP, aina na toleo la kivinjari, aina ya kifaa, kurasa zilizotembelewa, na data nyingine za kiufundi zinazohitajika kuendesha na kulinda tovuti.'
              },
              { text: 'Mapendeleo kama vile lugha na muonekano (theme).' }
            ]
          },
          {
            title: '3.5 Taarifa Ambazo Hatukusanyi',
            bullets: [
              { text: 'Mahali halisi au pa kukadiria (GPS). Sehemu yoyote ya “mahali” ni maandishi huru unayoingiza wewe mwenyewe.' },
              { text: 'Orodha ya anwani (contacts), kamera, maikrofoni, picha, au maudhui ya SMS.' },
              { text: 'Data za alama za vidole au uso (kufungua kwa biometriska kunashughulikiwa na kifaa chako; programu hupokea jibu la ndiyo/hapana pekee).' },
              { text: 'Vitambulisho vya matangazo au data yoyote inayotumika kwa madhumuni ya matangazo au ufuatiliaji.' }
            ]
          }
        ]
      },
      {
        id: 'section-4',
        heading: '4. Jinsi Tunavyotumia Taarifa',
        paragraphs: ['Tunatumia taarifa tunazokusanya ili:'],
        bullets: [
          { text: 'Kufungua na kusimamia akaunti yako na kukuthibitisha' },
          { text: 'Kuandaa, kuhifadhi, kuchapisha, na kutoa (export) nukuu za bei na ankara' },
          { text: 'Kukokotoa gharama za vifaa, gharama za ufundi, na jumla kuu' },
          { text: 'Kusimamia kumbukumbu za wateja, vifaa, na stoo' },
          { text: 'Kutoa huduma ya kuhifadhi nakala ya akiba (backup) na kurejesha (restore)' },
          { text: 'Kuchakata malipo, kuwasha mipango, na kusimamia leseni' },
          { text: 'Kudumisha usalama, kuzuia udanganyifu na matumizi mabaya, na kuboresha uthabiti' },
          { text: 'Kutoa msaada kwa wateja' },
          { text: 'Kutii matakwa ya kisheria' }
        ]
      },
      {
        id: 'section-5',
        heading: '5. Msingi wa Kisheria na Idhini',
        paragraphs: ['Tunachakata taarifa zako:'],
        bullets: [
          { text: 'Ili kutoa Huduma uliyoomba' },
          { text: 'Kwa idhini yako pale inapohitajika (kwa mfano, uthibitishaji wa SMS au kufungua kwa biometriska)' },
          { text: 'Kwa maslahi yetu halali katika usalama, kuzuia udanganyifu, na kutunza kumbukumbu sahihi za leseni na malipo' },
          { text: 'Ili kutii matakwa yanayotumika ya kisheria' }
        ]
      },
      {
        id: 'section-6',
        heading: '6. Mahali Data Zako Zinapohifadhiwa',
        bullets: [
          {
            lead: 'Kwenye kifaa chako (Simu)',
            text: 'Kumbukumbu nyingi huhifadhiwa kwenye hifadhidata ya ndani ya kifaa. Programu ya simu hufanya kazi bila intaneti (offline) kwa sehemu kubwa ya vipengele vyake.'
          },
          {
            lead: 'Kwenye wingu (Cloud)',
            text: 'Taarifa za akaunti, taarifa za leseni, na kumbukumbu za biashara zinaweza kusawazishwa au kuhifadhiwa kama nakala ya akiba kwenye Google Firebase (Cloud Firestore) na kuunganishwa na akaunti yako. Sheria za usalama zinazuia ufikiaji kwa akaunti yako mwenyewe uliyoingia pekee.'
          },
          {
            lead: 'Programu ya Wavuti (Web App)',
            text: 'Data huchakatwa na kuhifadhiwa kwenye seva salama zinazoendeshwa na watoa huduma wetu.'
          }
        ],
        afterParagraphs: [
          'Wasimamizi walioidhinishwa wanaweza kufikia taarifa za akaunti na leseni pale inapohitajika kutoa msaada, kusimamia leseni, au kulinda Huduma.',
          'Hifadhi ya nakala ya kiotomatiki ya Android (Automatic Android backup) imezimwa kwa programu ya simu. Kuondoa programu au kufuta data zake hufuta kumbukumbu za ndani ya kifaa isipokuwa kama ulihifadhi nakala kwenye wingu au kuzitoa nje (exported) hapo awali.',
          'Faili unazotoa nje, kuhifadhi, au kushiriki (kwa mfano PDF au faili za backup) ziko nje ya udhibiti wetu mara tu zinapoondoka kwenye Huduma.'
        ]
      },
      {
        id: 'section-7',
        heading: '7. Kushiriki na Kufichua Taarifa',
        paragraphs: [
          'Hatuuzi wala hatukodishi taarifa zako binafsi. Tunashiriki taarifa katika hali zifuatazo pekee:'
        ],
        bullets: [
          {
            lead: 'Watoa huduma',
            text: 'Google (Firebase Authentication, Cloud Firestore, Cloud Functions, App Check, Google Sign-In, na Google Play Billing) pamoja na mtoa huduma wa malipo anayechakata malipo ya pesa mtandaoni, kadi, au benki. Watoa huduma hawa huchakata taarifa ili tu kutoa huduma zao chini ya masharti yao ya faragha.'
          },
          {
            lead: 'Matakwa ya kisheria na usalama',
            text: 'Pale inapohitajika na sheria au ombi halali la kisheria, au kulinda haki, usalama, na ulinzi wa watumiaji, umma, au Huduma, na kuzuia udanganyifu.'
          },
          {
            lead: 'Uhamisho wa biashara',
            text: 'Ikiwa Huduma au biashara itahamishiwa kwa mmiliki mwingine, taarifa zako zinaweza kuhamishwa chini ya ulinzi unaolingana.'
          },
          {
            lead: 'Kwa maelekezo yako',
            text: 'Unaposhiriki nukuu au ankara (kwa mfano kupitia PDF au programu za ujumbe), mpokeaji hupokea kile tu ulichochagua kutuma.'
          }
        ],
        linksHeading: 'Sera husika za watu wa tatu:',
        links: [
          { label: 'Google Privacy Policy', url: 'https://policies.google.com/privacy' },
          { label: 'Firebase Privacy', url: 'https://firebase.google.com/support/privacy' },
          { label: 'Google Play Terms of Service', url: 'https://play.google.com/about/play-terms/' }
        ]
      },
      {
        id: 'section-8',
        heading: '8. Malipo',
        paragraphs: [
          'Mipango inaweza kulipiwa kupitia Google Play, pesa mtandaoni (mobile money), au kurasa za malipo ya kadi/benki zinazotolewa na mtoa huduma wetu wa malipo. Mifumo yetu huthibitisha malipo kwa mtoa huduma husika kisha kuwasha mpango wako. Bei zinadhibitiwa kwenye seva yetu.',
          'Malipo yanayofanywa kupitia Google Play yako chini ya masharti na sera za kurejesha fedha za Google Play. Tunatunza kumbukumbu ya mpango wako, kumbukumbu ya malipo, kiasi, na hali.'
        ]
      },
      {
        id: 'section-9',
        heading: '9. Ruhusa za Programu na Teknolojia za Wavuti',
        subsections: [
          {
            title: 'Ruhusa za Programu ya Simu',
            bullets: [
              {
                lead: 'Intaneti na hali ya mtandao',
                text: 'inahitajika kwa kuingia, usawazishaji, nakala ya akiba (backup), na malipo'
              },
              {
                lead: 'Biometriska',
                text: 'tu ikiwa utawasha kufungua kwa alama ya kidole au uso'
              },
              {
                lead: 'Hifadhi (Android 9 na za zamani)',
                text: 'ili kuhifadhi faili za PDF'
              },
              {
                lead: 'Google Play Billing',
                text: 'ili kununua mipango'
              }
            ],
            paragraphs: [
              'Programu ya simu haiombi ruhusa za mahali (location), kamera, maikrofoni, anwani (contacts), au SMS.'
            ]
          },
          {
            title: 'Programu ya Wavuti (Web App)',
            paragraphs: [
              'Tunaweza kutumia vidakuzi muhimu (essential cookies) na teknolojia zinazofanana ambazo ni muhimu kwa uthibitishaji wa akaunti, usalama, na utendaji wa msingi. Hatutumii vidakuzi vya matangazo au ufuatiliaji.'
            ]
          }
        ]
      },
      {
        id: 'section-10',
        heading: '10. Usalama wa Data',
        paragraphs: ['Tunatekeleza hatua stahiki za kiufundi na kiutawala, ikiwa ni pamoja na:'],
        bullets: [
          { text: 'Miunganisho iliyosimbwa kwa njia fiche (HTTPS/TLS)' },
          { text: 'Udhibiti wa ufikiaji unaozuia kumbukumbu za wingu kwa mmiliki wa akaunti pekee' },
          { text: 'Uthibitishaji wa malipo upande wa seva' },
          { text: 'Usimbaji fiche wa taarifa za biometriska kwa kutumia Android Keystore (simu)' },
          { text: 'Ulinzi wa data za ndani ndani ya Android application sandbox' }
        ],
        afterParagraphs: [
          'Hakuna mfumo ulio salama kwa asilimia 100. Tafadhali linda vifaa vyako kwa kufuli la skrini, tunza siri ya nenosiri lako, na usasishe programu yako mara kwa mara.'
        ]
      },
      {
        id: 'section-11',
        heading: '11. Uhifadhi wa Data na Ufutaji',
        paragraphs: ['Tunahifadhi taarifa zako wakati akaunti yako inaendelea kuwa hai na kwa muda wote unaohitajika kutoa Huduma.'],
        bulletGroups: [
          {
            title: 'Jinsi ya kufuta data zako:',
            bullets: [
              {
                lead: 'Ndani ya programu ya simu',
                text: 'Nenda Settings → Delete Account, weka nenosiri lako, na thibitisha. Hatua hii hufuta kabisa akaunti yako, wateja, nukuu za bei, ankara, vifaa, wasifu wa biashara, na nakala za wingu (cloud backups).'
              },
              {
                lead: 'Kwa barua pepe',
                text: 'Tuma ombi kwenda support.fundiquotations@gmail.com. Tunalenga kukamilisha maombi ya ufutaji yaliyothibitishwa ndani ya siku 30.'
              }
            ],
            afterParagraphs: [
              'Kuondoa programu ya simu (uninstalling) hakufuti data zako za kwenye wingu. Ni lazima utumie kipengele cha Delete Account au uwasiliane nasi ikiwa unataka data ziondolewe.'
            ]
          },
          {
            title: 'Taarifa zinazoweza kubakia baada ya ufutaji:',
            bullets: [
              { text: 'Kumbukumbu za malipo na leseni zinazohitajika kwa uhasibu, kodi, utatuzi wa migogoro, na kuzuia udanganyifu' },
              { text: 'Kumbukumbu za ununuzi zinazoshikiliwa na Google Play' },
              { text: 'Faili ulizotoa nje (exported) au kushiriki hapo awali' },
              { text: 'Kumbukumbu za mfumo za muda mfupi au nakala za akiba zinazotunzwa na watoa huduma hadi zitakapofutwa kwa kuandikwa upya' }
            ]
          }
        ],
        relatedPolicyLinks: true
      },
      {
        id: 'section-12',
        heading: '12. Haki Zako na Chaguo',
        paragraphs: ['Chini ya sheria zinazotumika za ulinzi wa data, ikiwa ni pamoja na Sheria ya Ulinzi wa Taarifa Binafsi ya Tanzania ya mwaka 2022 (Personal Data Protection Act, 2022), unaweza kuwa na haki ya:'],
        bullets: [
          { text: 'Kufikia, kurekebisha, au kufuta taarifa zako binafsi' },
          { text: 'Kupokea nakala ya data zako' },
          { text: 'Kuondoa idhini' },
          { text: 'Kupinga au kuwekea mipaka uchakataji fulani' }
        ],
        afterParagraphs: [
          'Unaweza kurekebisha taarifa nyingi moja kwa moja ndani ya Huduma, kutoa kumbukumbu zako kwa kutumia vipengele vya backup na PDF, kuzima kufungua kwa biometriska, na kufuta akaunti yako. Kwa maombi mengine yoyote, tafadhali wasiliana nasi kwa kutumia maelezo yaliyo katika Sehemu ya 16. Pia una haki ya kuwasilisha malalamiko kwa mamlaka husika ya ulinzi wa data.'
        ]
      },
      {
        id: 'section-13',
        heading: '13. Faragha ya Watoto',
        paragraphs: [
          'FundiQuotations ni zana ya kibiashara iliyokusudiwa kwa mafundi na watumiaji wa kibiashara. Haijaelekezwa kwa watoto na haikusudiwi kwa mtu yeyote aliye chini ya umri wa miaka 18. Hatukusanyi taarifa binafsi kutoka kwa watoto kwa makusudi. Ikiwa unaamini mtoto ametupatia taarifa, tafadhali wasiliana nasi nasi tutazifuta.'
        ]
      },
      {
        id: 'section-14',
        heading: '14. Uhamisho wa Data wa Kimataifa',
        paragraphs: [
          'Seva za Google zinazotoa huduma za Firebase na Google Play zinaweza kuwa nje ya Tanzania. Kwa kutumia Huduma, unakubali kuwa taarifa zako zinaweza kuchakatwa katika nchi nyingine chini ya ulinzi na masharti ya watoa huduma hawa.'
        ]
      },
      {
        id: 'section-15',
        heading: '15. Mabadiliko ya Sera Hii',
        paragraphs: [
          'Tunaweza kusasisha Sera hii ya Faragha mara kwa mara. Toleo lililosasishwa litaonyesha tarehe mpya ya kuanza kutumika na litapatikana ndani ya Huduma na kwenye tovuti yetu. Ikiwa badiliko ni kubwa, tutatoa taarifa ndani ya Huduma. Kuendelea kwako kutumia Huduma baada ya tarehe ya kuanza kutumika kwa Sera iliyosasishwa kutamaanisha kukubali mabadiliko hayo.'
        ]
      },
      {
        id: 'section-16',
        heading: '16. Taarifa za Mawasiliano',
        paragraphs: ['Kwa maswali yanayohusu faragha, maombi ya data, au ufutaji wa akaunti, tafadhali wasiliana na:'],
        contactDetails: [
          { label: 'Programu', value: 'FundiQuotations' },
          { label: 'Msanidi / Biashara', value: 'Agritech Electrical Solutions' },
          { label: 'Mhusika wa Mawasiliano', value: 'Agripa Edward Chotamasege' },
          { label: 'Barua Pepe', value: 'support.fundiquotations@gmail.com', isEmail: true }
        ],
        afterParagraphs: [
          'Kwa kutumia FundiQuotations, unathibitisha kuwa umesoma na kuelewa Sera hii ya Faragha.'
        ],
        relatedPolicyLinks: true
      }
    ]
  }
};

export const ACCOUNT_DELETION_DOCUMENTS: Record<Language, AccountDeletionDocumentData> = {
  en: {
    title: 'FundiQuotations – Account Deletion Request',
    appNameLabel: 'App Name',
    appNameValue: 'FundiQuotations',
    developerLabel: 'Developer',
    developerValue: 'Agritech Electrical Solutions',
    howToTitle: 'How to Request Account Deletion',
    howToIntro:
      'If you wish to permanently delete your FundiQuotations account and the associated data, you may request deletion using either of the methods below:',
    option1Title: 'Option 1: From the Mobile App',
    option1Body:
      'Open the FundiQuotations app, go to Settings, select Delete Account, and follow the on-screen instructions.',
    option2Title: 'Option 2: By Email',
    option2Intro: 'Send an email to support.fundiquotations@gmail.com with the subject line:',
    subjectLabel: 'Subject Line',
    exactSubjectLine: 'FundiQuotations Account Deletion Request',
    copySubjectBtn: 'Copy Subject',
    copiedSubjectBtn: 'Copied',
    emailIncludeIntro: 'In your email, please include:',
    emailIncludeBullets: [
      'Your registered account email address or phone number',
      'A clear statement that you want to delete your FundiQuotations account'
    ],
    emailSecurityWarning:
      'Do not include your password, PIN, or any sensitive login credentials in the email.',
    whatHappensTitle: 'What Happens After You Request Deletion?',
    whatHappensParagraphs: [
      'After receiving your request, we may contact you to verify that you are the owner of the account.',
      'Once the request is verified, we will proceed with the deletion of your account and associated personal data, subject to applicable legal requirements.',
      'We aim to complete verified deletion requests within 30 days.'
    ],
    retainedTitle: 'Information That May Be Retained',
    retainedIntro:
      'Certain information may need to be retained where required by law or for legitimate business purposes, such as:',
    retainedBullets: [
      'Accounting and tax records',
      'Resolving disputes',
      'Preventing fraud or abuse'
    ],
    retainedOutro:
      'Any retained information will be handled in accordance with our Privacy Policy and applicable laws.',
    importantNoticeTitle: 'Important Notice',
    importantNoticeBody:
      'Uninstalling the FundiQuotations mobile app does not automatically delete your account or the data stored in the cloud. To permanently remove your account and associated data, you must submit a deletion request using one of the methods above.',
    contactTitle: 'Contact Us',
    contactIntro: 'If you have any questions about account deletion, please contact:',
    contactOrg: 'Agritech Electrical Solutions',
    contactEmailLabel: 'Email',
    contactEmailValue: 'support.fundiquotations@gmail.com',
    privacyOutroPrefix: 'For more information about how we collect, use, and protect your personal information, please read our ',
    privacyLinkLabel: 'FundiQuotations Privacy Policy',
    privacyOutroSuffix: '.',
    sendEmailBtn: 'Email Deletion Request'
  },
  sw: {
    title: 'FundiQuotations – Ombi la Kufuta Akaunti',
    appNameLabel: 'Jina la Programu',
    appNameValue: 'FundiQuotations',
    developerLabel: 'Msanidi (Developer)',
    developerValue: 'Agritech Electrical Solutions',
    howToTitle: 'Jinsi ya Kuomba Kufuta Akaunti',
    howToIntro:
      'Ikiwa unataka kufuta kabisa akaunti yako ya FundiQuotations na data zinazohusiana, unaweza kuomba kufutwa kwa kutumia mojawapo ya njia zilizo hapa chini:',
    option1Title: 'Chaguo la 1: Kutoka Kwenye Programu ya Simu',
    option1Body:
      'Fungua programu ya FundiQuotations, nenda Settings, chagua Delete Account, na fuata maelekezo yaliyo kwenye skrini.',
    option2Title: 'Chaguo la 2: Kwa Barua Pepe',
    option2Intro: 'Tuma barua pepe kwenda support.fundiquotations@gmail.com yenye kichwa cha ujumbe:',
    subjectLabel: 'Kichwa cha Barua Pepe (Subject Line)',
    exactSubjectLine: 'FundiQuotations Account Deletion Request',
    copySubjectBtn: 'Nakili Kichwa',
    copiedSubjectBtn: 'Imenakiliwa',
    emailIncludeIntro: 'Katika barua pepe yako, tafadhali jumuisha:',
    emailIncludeBullets: [
      'Anwani yako ya barua pepe au namba ya simu iliyosajiliwa kwenye akaunti',
      'Kauli ya wazi kuwa unataka kufuta akaunti yako ya FundiQuotations'
    ],
    emailSecurityWarning:
      'Usijumuishe nenosiri lako (password), PIN, au taarifa zozote nyeti za kuingia kwenye barua pepe.',
    whatHappensTitle: 'Nini Kinatokea Baada ya Kuomba Kufutwa?',
    whatHappensParagraphs: [
      'Baada ya kupokea ombi lako, tunaweza kuwasiliana nawe ili kuthibitisha kuwa wewe ndiye mmiliki wa akaunti.',
      'Ombi likishathibitishwa, tutaendelea na ufutaji wa akaunti yako na data binafsi zinazohusiana, kwa kuzingatia matakwa yanayotumika ya kisheria.',
      'Tunalenga kukamilisha maombi ya ufutaji yaliyothibitishwa ndani ya siku 30.'
    ],
    retainedTitle: 'Taarifa Zinazoweza Kuhifadhiwa',
    retainedIntro:
      'Taarifa fulani zinaweza kuhitaji kuhifadhiwa pale inapohitajika kisheria au kwa madhumuni halali ya kibiashara, kama vile:',
    retainedBullets: [
      'Kumbukumbu za uhasibu na kodi',
      'Kutatua migogoro',
      'Kuzuia udanganyifu au matumizi mabaya'
    ],
    retainedOutro:
      'Taarifa zozote zitakazohifadhiwa zitashughulikiwa kwa mujibu wa Sera yetu ya Faragha na sheria zinazotumika.',
    importantNoticeTitle: 'Taarifa Muhimu',
    importantNoticeBody:
      'Kuondoa programu ya simu ya FundiQuotations (uninstalling) hakufuti akaunti yako au data zilizohifadhiwa kwenye wingu kiotomatiki. Ili kuondoa kabisa akaunti yako na data zinazohusiana, ni lazima uwasilishe ombi la ufutaji kwa kutumia mojawapo ya njia zilizo hapo juu.',
    contactTitle: 'Wasiliana Nasi',
    contactIntro: 'Ikiwa una maswali yoyote kuhusu kufuta akaunti, tafadhali wasiliana na:',
    contactOrg: 'Agritech Electrical Solutions',
    contactEmailLabel: 'Barua Pepe',
    contactEmailValue: 'support.fundiquotations@gmail.com',
    privacyOutroPrefix: 'Kwa taarifa zaidi kuhusu jinsi tunavyokusanya, kutumia, na kulinda taarifa zako binafsi, tafadhali soma ',
    privacyLinkLabel: 'Sera ya Faragha ya FundiQuotations',
    privacyOutroSuffix: '.',
    sendEmailBtn: 'Tuma Ombi kwa Barua Pepe'
  }
};
