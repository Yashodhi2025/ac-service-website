import type { Messages } from "../types";

// Natural everyday Sri Lankan Sinhala-English mixed language.
// Familiar English A/C terms (A/C, Service, Full Service, Install, Repair, Inverter Card, WhatsApp, Booking) are retained naturally.
export const siMessages: Messages = {
  meta: {
    siteTitle: "Earth Coolman Engineers (ECME) | A/C Services",
  },
  common: {
    bookService: "Service එකක් Book කරන්න",
    exploreServices: "Services බලන්න",
    whatsappEcme: "WhatsApp කරන්න",
    callEcme: "ECME ට Call කරන්න",
    home: "මුල් පිටුව",
    services: "Services",
    about: "අප ගැන",
    projects: "Projects",
    faq: "ප්‍රශ්න",
    contact: "Contact",
    skipToContent: "ප්‍රධාන කොටසට යන්න",
    illustrativePhoto: "උදාහරණ සඳහා භාවිතා කළ ඡායාරූපයකි.",
    illustrativeNotEcme: "උදාහරණ ඡායාරූපයකි — ECME සේවකයෙකු හෝ සම්පූර්ණ කළ Project එකක් නොවේ.",
    notProvided: "සඳහන් කර නැත",
  },
  languageSwitcher: {
    ariaLabel: "වෙබ් අඩවියේ භාෂාව තෝරන්න",
    mobileLabel: "භාෂාව / Language",
    english: "EN",
    sinhala: "සිංහල",
  },
  contactBar: {
    whatsappLabel: "WhatsApp",
    whatsappAria: "Earth Coolman Engineers වෙත WhatsApp පණිවිඩයක් යවන්න (නව tab එකකින් විවෘත වේ)",
    facebookLabel: "Facebook",
    facebookAria: "Earth Coolman Engineers Facebook පිටුව (නව tab එකකින් විවෘත වේ)",
  },
  nav: {
    mainAria: "ප්‍රධාන මෙනුව",
    mobileAria: "ජංගම මෙනුව",
    openMenu: "මෙනුව විවෘත කරන්න",
    closeMenu: "මෙනුව වසන්න",
    openServices: "Services මෙනුව විවෘත කරන්න",
    closeServices: "Services මෙනුව වසන්න",
    dropdownLabel: "සම්පූර්ණ A/C සේවාවන්",
    logoAria: "Earth Coolman Engineers මුල් පිටුව",
    whatsappShort: "WhatsApp ECME",
    floatingWhatsAppAria: "Earth Coolman Engineers සමඟ WhatsApp එකෙන් කතා කරන්න (නව tab එකකින් විවෘත වේ)",
    floatingWhatsAppTitle: "WhatsApp එකෙන් කතා කරන්න",
  },
  hero: {
    eyebrow: "ඔයාගේ සුවපහසුව. අපේ විශේෂඥ සේවාව.",
    headlineLine1: "නියම සීතල.",
    headlineLine2: "විශ්වාසනීය A/C සේවාව.",
    description:
      "අලුත් A/C Install එකේ ඉඳලා, Repair සහ නියමිත Normal / Full Service දක්වා, හැමදාම ඔයාගේ කාමරය සුවපහසුව තියාගන්න අපි ඉන්නවා.",
    unitAlt: "විවෘත cooling vents සහිත සුදු පැහැති wall-mounted A/C යන්ත්‍රයක්",
    comfortSetting: "සුවපහසු උෂ්ණත්වය",
  },
  expertise: {
    eyebrow: "සම්පූර්ණ A/C සේවාවන්",
    title: "අපේ ප්‍රධාන සේවාවන්",
    description:
      "පළමු A/C Installation එකේ ඉඳලා සියුම් Inverter Card Repair එක දක්වා, පළපුරුදු වැඩක් තමයි හොඳ සීතලකට රහස.",
    viewAll: "සියලුම Services බලන්න",
    gridAria: "අපේ A/C Services",
    tiles: {
      installation: {
        name: "A/C Installation",
        description:
          "කාමරයට ගැළපෙන විදියට නියමෙට Install කරලා, පළමු දවසේ ඉඳන්ම හොඳ සීතලක් ගන්න.",
        imageAlt: "Wall-mounted A/C එකක් සවිකරන Technician කෙනෙකුගේ උදාහරණ ඡායාරූපයක්",
      },
      servicing: {
        name: "Normal A/C Service",
        description: "එදිනෙදා හොඳ සීතලක් තියාගන්න කරන සාමාන්‍ය Clean එක සහ Check-up එක.",
        imageAlt: "A/C Filter එකක් පිරිසිදු කරන Technician කෙනෙකුගේ උදාහරණ ඡායාරූපයක්",
      },
      cleaning: {
        name: "Full A/C Service",
        description: "Coils, Drain සහ ඇතුළත හැම කොටසක්ම හොඳටම Clean කරන සම්පූර්ණ Service එක.",
        imageAlt: "Protective cleaning bag එකක් දාලා A/C coils සෝදන උදාහරණ ඡායාරූපයක්",
      },
      repairs: {
        name: "A/C Repair",
        description:
          "හරියටම Fault එක හොයලා, විශ්වාසවන්ත විදියට Repair කරලා දෙනවා.",
        imageAlt: "Diagnostic equipment භාවිතයෙන් A/C එකක් පරීක්ෂා කරන උදාහරණ ඡායාරූපයක්",
      },
      relocation: {
        name: "ගලවා නැවත සවිකිරීම",
        description:
          "ගෙදර හෝ Office එක මාරු වෙනවද? පරිස්සමින් ගලවලා අලුත් තැනට නියමෙට Install කරලා දෙනවා.",
        imageAlt: "ගලවා ගත් A/C යන්ත්‍රයක් පරිස්සමින් අල්ලාගෙන සිටින Technician කෙනෙකුගේ ඡායාරූපයක්",
      },
      "pcb-repair": {
        name: "Inverter Card (PCB) Repair",
        description: "Inverter A/C වල Electronic Board (PCB) ප්‍රශ්න සඳහා විශේෂිත පරීක්ෂාව සහ Repair.",
        imageAlt: "Inverter circuit board එකක් පරීක්ෂා කරන උදාහරණ ඡායාරූපයක්",
      },
    },
  },
  problemFinder: {
    eyebrow: "ඉක්මනින් විසඳුම හොයාගමු",
    title: "ඔයාගේ A/C එකේ ප්‍රශ්නය මොකක්ද?",
    intro: "දැන් පේන ප්‍රශ්නය තෝරන්න. ECME එක්ක කතා කරන්න ගැළපෙන Service එක අපි පෙන්නන්නම්.",
    legend: "ළඟම ප්‍රශ්නය තෝරන්න",
    choiceNote: "පොඩි මඟපෙන්වීමක්. පැහැදිලි කතාබහකට.",
    suggestedService: "ගැළපෙන Service එක",
    forPrefix: "ප්‍රශ්නය:",
    assessmentNote:
      "මෙය මූලික යෝජනාවක් පමණයි — අවසන් තීරණයක් නොවේ. ECME Technician කෙනෙක් A/C එක Check කළාට පස්සෙයි හරිම හේතුව සහ අවශ්‍ය වැඩේ confirm කරන්නේ.",
    bookOnWhatsApp: "WhatsApp එකෙන් Book කරන්න",
    bookAriaPrefix: "සඳහා",
    bookAriaSuffix: "ECME සමඟ WhatsApp එකෙන් Service එකක් Book කරන්න (නව tab එකකින් විවෘත වේ)",
    liveSuggestedPrefix: "යෝජිත Service එක:",
    problems: {
      "not-cooling": {
        label: "A/C එක සීතල වෙන්නේ නැහැ",
        service: "A/C Repair",
        explanation:
          "සීතල අඩු වෙන්න හේතු කිහිපයක් තියෙන්න පුළුවන්. මුලින්ම Check-up එකක් කරලා Service එකක්ද, Repair එකක්ද ඕනේ කියලා බලන්න පුළුවන්.",
      },
      "water-leaking": {
        label: "වතුර ලීක් වෙනවා",
        service: "Full A/C Service",
        explanation:
          "Drain line එක හිරවෙලා හෝ ඇතුළත කුණු එකතු වෙලා වෙන්න පුළුවන්. Full Service එකක්ද නැත්නම් Repair එකක්ද ඕනේ කියලා ECME Check කරලා කියයි.",
      },
      "unusual-noise": {
        label: "අමුතු සද්දයක් එනවා",
        service: "A/C Repair",
        explanation:
          "අමුතු සද්දයක් එන්නේ කොතනින්ද කියලා හොඳින් Check කරලා, පොඩි Adjustment එකක්ද, Service එකක්ද නැත්නම් Repair එකක්ද කියලා හඳුනාගන්න පුළුවන්.",
      },
      "not-turning-on": {
        label: "A/C එක On වෙන්නේ නැහැ",
        service: "A/C Repair",
        explanation:
          "Power supply එක, Remote controls සහ Unit එක Check කරලා On නොවෙන හේතුව බලන්න පුළුවන්. Electrical හෝ Inverter Card Repair එකක් ඕනේද කියලා Check කළාට පස්සේ කියනවා.",
      },
      "bad-smell": {
        label: "නරක ගඳක් එනවා",
        service: "Full A/C Service",
        explanation:
          "Filters, Coils සහ Drain එක ඇතුළත හොඳටම Clean කරන Full Service එකකින් ගඳ ප්‍රශ්නය විසඳගන්න උදව් වෙනවා. ECME Check කරලා ගැළපෙන Cleaning එක කියයි.",
      },
      "moving-ac": {
        label: "A/C එක වෙනත් තැනකට මාරු කරන්න",
        service: "Removal & Reinstallation",
        explanation:
          "A/C එක පරිස්සමින් ගලවලා අලුත් තැනට සවිකරන්න සැලසුම් කරලා කරන Service එකක්. දැනට තියෙන තැනයි අලුත් තැනයි ගැන ECME එක්ක කතා කරන්න.",
      },
    },
  },
  howWeWork: {
    eyebrow: "අපි වැඩ කරන විදිය",
    title: "සරල පියවර 4කින් ඔයාගේ A/C Service එක",
    step1LinkContact: "අපිට කතා කරන්න",
    step1Middle: " හෝ ",
    step1LinkWhatsApp: "WhatsApp පණිවිඩයක්",
    step1End: " එවන්න.",
    steps: [
      {
        title: "Service එකක් Request කරන්න",
        description: "අපිට කතා කරන්න හෝ WhatsApp පණිවිඩයක් එවන්න.",
      },
      {
        title: "Technician Check-up එක",
        description: "A/C එක හොඳින් පරීක්ෂා කරලා කරන්න ඕනේ වැඩේ පැහැදිලිව කියනවා.",
      },
      {
        title: "විශ්වාසනීය Service එක",
        description: "එකඟ වුණු Installation, Repair හෝ Service එක නියම විදියට කරලා දෙනවා.",
      },
      {
        title: "අවසන් Testing එක",
        description: "සීතල සහ ක්‍රියාකාරීත්වය Check කරලා කරපු වැඩේ පැහැදිලි කරලා දෙනවා.",
      },
    ],
  },
  whyChoose: {
    photoAlt: "Indoor A/C unit එකක් පරීක්ෂා කරන Technician කෙනෙකුගේ උදාහරණ ඡායාරූපයක්",
    photoCaption: "උදාහරණ ඡායාරූපයකි. මෙය ECME කණ්ඩායමේ ඡායාරූපයක් නොවේ.",
    eyebrow: "සීතල පිටුපස තියෙන සැලකිල්ල",
    title: "ඇයි Earth Coolman Engineers තෝරාගන්නේ?",
    lead: "ප්‍රශ්නය හරියට තේරුම් ගන්න තැනේ ඉඳලා කරපු වැඩේ පැහැදිලි කරනකම්ම අපි සැලකිලිමත්.",
    cta: "අපේ Team එකට කතා කරන්න",
    benefits: [
      {
        title: "පළපුරුදු Technical සේවාව",
        description: "හොඳින් Check කරලා, ඔයා එක්ක එකඟ වුණු වැඩේ නියම විදියටම කරලා දෙනවා.",
      },
      {
        title: "හැම A/C වැඩක්ම එකම තැනකින්",
        description:
          "Installation, Normal/Full Service, Repair සහ Inverter Card වැඩ ගැන එකම කතාබහකින් විස්තර ගන්න.",
      },
      {
        title: "පොඩි දේටත් ලොකු අවධානයක්",
        description: "මුල් Check-up එකේ ඉඳලා අවසන් Testing එක දක්වා හැම පොඩි දේම පිළිවෙළට කරනවා.",
      },
      {
        title: "පැහැදිලි කතාබහ",
        description: "වැඩේ පටන් ගන්න කලින්ම ප්‍රශ්නය මොකක්ද, කරන්න ඕනේ මොකක්ද කියලා සරලව පැහැදිලි කරනවා.",
      },
      {
        title: "පාරිභෝගිකයාට මුල් තැන",
        description: "ඔයාගේ කාමරය, ඔයාගේ අවශ්‍යතාවය සහ ප්‍රශ්නය තේරුම් අරගෙනයි විසඳුම දෙන්නේ.",
      },
      {
        title: "විශ්වාසනීය Follow-up සහාය",
        description: "Service එකෙන් පස්සේ ප්‍රශ්නයක් තිබුණත් කෙළින්ම කතා කරන්න අපි ඉන්නවා.",
      },
    ],
  },
  recentProjects: {
    eyebrow: "මෑතකාලීන Projects",
    title: "හොඳ වැඩක් පේන්නේ පොඩි දේවල් වලින්.",
    exploreButton: "Projects බලන්න",
    illustrativeNote:
      "පහතින් පෙන්නලා තියෙන්නේ අපේ සේවා ක්ෂේත්‍ර ගැන උදාහරණ ඡායාරූප. මේවා ECME විසින් සම්පූර්ණ කළ Projects නොවේ.",
    illustrationSuffix: "උදාහරණ ඡායාරූපය",
    areas: {
      installation: "A/C Installation",
      "full-service": "A/C Servicing",
      "pcb-repair": "Inverter PCB Repair",
    },
  },
  projectGallery: {
    allCategory: "All",
    categoriesAria: "Project වර්ග",
    categories: {
      All: "සියල්ල",
      Installation: "Installation",
      Repair: "Repair",
      Servicing: "Servicing",
      Relocation: "Relocation",
      "PCB Repair": "PCB Repair",
    },
    emptyAllTitle: "අවසරය ඇතිව බෙදාගන්නා සැබෑ Project විස්තර.",
    emptyCategoryTitlePrefix: "දැනට",
    emptyCategoryTitleSuffix: "Projects කිසිවක් පළ කර නැත.",
    emptyWithItems: "වෙනත් වර්ගයක් බලන්න හෝ ඔයාගේ Project එක ගැන අපිට කතා කරන්න.",
    emptyNoItems:
      "සම්පූර්ණ කළ ECME Project ඡායාරූප තවම මෙහි පළ කර නැහැ. අපි සැබෑ ඡායාරූප පළ කරන්නේ පාරිභෝගික අවසරය ඇතිව පමණයි.",
    discussProject: "ඔයාගේ Project එක ගැන කතා කරන්න",
    viewPrefix: "බලන්න:",
    closeViewer: "Project දර්ශනය වසන්න",
    previousProject: "පෙර Project එක",
    nextProject: "ඊළඟ Project එක",
    beforeLabel: "කලින්",
    afterLabel: "පස්සේ",
    compareLabel: "කලින් සහ පස්සේ සසඳන්න",
    compareValueSuffix: "% පස්සේ ඡායාරූපය පෙන්වයි",
  },
  reviews: {
    eyebrow: "පාරිභෝගික අදහස්",
    titleLine1: "සැබෑ අත්දැකීම්.",
    titleLine2: "ඔවුන්ගේම වචන වලින්.",
    lead: "අපි මෙහි පළ කරන්නේ පාරිභෝගික අවසරය ඇතිව ලබාගත් සැබෑ අදහස් පමණයි.",
    facebookButton: "ECME Facebook පිටුව බලන්න",
    regionAria: "පාරිභෝගික අදහස්",
    starsSuffix: "තරු 5න්",
    previousReview: "පෙර අදහස",
    nextReview: "ඊළඟ අදහස",
    emptyTitle: "ඔයාගේ අත්දැකීමත් මෙතනට එකතු කරන්න.",
    emptyBody:
      "තවම පාරිභෝගික Reviews මෙම වෙබ් අඩවියේ පළ කර නැහැ. ඔයා ECME සේවාව ලබාගත්තා නම් ඔයාගේ අදහස කෙළින්ම අපිට එවන්න පුළුවන්.",
    shareFeedback: "ඔයාගේ අදහස ECME වෙත එවන්න",
  },
  faqPreview: {
    eyebrow: "පොඩි පැහැදිලි කිරීමක්",
    title: "Book කරන්න කලින් දැනගන්න ඕනේ ප්‍රශ්න?",
    lead: "Technician එන්න කලින් සේවාව ගැන පැහැදිලි අදහසක් ගන්න. ඔයාගේ A/C එකට විශේෂිත ප්‍රශ්න තියෙනවා නම් කෙළින්ම ECME එක්ක කතා කරන්න.",
    exploreAll: "සියලුම ප්‍රශ්න බලන්න",
  },
  faqExplorer: {
    searchLabel: "ඔයාගේ ප්‍රශ්නය සොයන්න",
    searchPlaceholder: "උදා: Install, Full Service, Gas, Booking",
    categoriesAria: "FAQ වර්ග",
    allCategory: "All",
    categories: {
      All: "සියල්ල",
      Booking: "Booking",
      Installation: "Installation",
      Servicing: "Servicing",
      Maintenance: "Maintenance",
      Repairs: "Repairs",
      "PCB Repair": "Inverter PCB",
    },
    countSingle: "ප්‍රශ්නයක් හමුවුණා",
    countPlural: "ප්‍රශ්න හමුවුණා",
    emptyTitle: "ඒ සෙවුමට ගැළපෙන ප්‍රශ්න හමුවුණේ නැහැ.",
    emptyBody: "වෙනත් වචනයකින් සොයන්න හෝ සියලුම ප්‍රශ්න බලන්න.",
    clearFilters: "Filters ඉවත් කරන්න",
  },
  bookingCta: {
    ariaLabel: "අප සමඟ සම්බන්ධ වන්න",
    eyebrow: "අපි කතා කරමු",
    title: "හොඳ සීතලකට දැන්ම කතා කරන්න.",
    body: "ඔයාගේ කාමරය සහ A/C එක ගැන ECME ට කියන්න. Check-up එක, අවශ්‍ය වැඩේ සහ ඊළඟ පියවර ගැන අපි කතා කරමු.",
    guidedLink: "Form එකක් හරහා Request කරන්නද? Service එකක් Book කරන්න",
  },
  footer: {
    tagline:
      "A/C Installation, Repair සහ Service — හැම පියවරකදීම පැහැදිලි කතාබහක් එක්ක විශ්වාසනීය සේවාවක්.",
    exploreHeading: "පිටු",
    exploreAria: "Footer මෙනුව",
    servicesHeading: "A/C සේවාවන්",
    servicesAria: "Footer A/C සේවාවන්",
    contactHeading: "කතා කරන්න",
    requestService: "Service එකක් Request කරන්න",
    rightsReserved: "සියලුම හිමිකම් ඇවිරිණි.",
    backToTop: "උඩට යන්න",
    logoAlt: "ECME හිම පියල්ල සහ හිරු ලාංඡනය",
  },
  servicesPage: {
    heroEyebrow: "අපේ Services",
    heroTitle: "හැම A/C අවශ්‍යතාවයකටම විශ්වාසනීය සේවාව.",
    heroDescription:
      "අලුත් Installation එකේ ඉඳලා සියුම් Repair එක දක්වා, ඔයාට ඕනේ Service එක තෝරගෙන ECME එක්ක විස්තර කතා කරන්න.",
    sectionAria: "A/C Services ගවේෂණය කරන්න",
    categoriesAria: "Service වර්ග",
    confirmScopeNote:
      "මෙම Service එක සඳහා ඔයාගේ A/C වර්ගය, අවශ්‍ය වැඩේ සහ ලබාගත හැකි දින ECME එක්ක confirm කරගන්න.",
    exploreThisService: "මේ Service එක ගැන බලන්න",
  },
  serviceDetail: {
    heroEyebrow: "ECME Service විස්තරය",
    startingEyebrow: "නිවැරදි ආරම්භයක්",
    startingTitle: "ඔයාගේ A/C එකට ඕනේ මොකක්ද කියලා හරියට බලමු.",
    startingLeadSuffix:
      "කරන්න ඕනේ වැඩේ තීරණය වෙන්නේ A/C එකේ වර්ගය, දැන් තියෙන තත්ත්වය සහ Check-up එකේ ප්‍රතිඵල මතයි.",
    bookThisService: "මේ Service එක Book කරන්න",
    askAboutService: "මේ ගැන WhatsApp එකෙන් අහන්න",
    confirmScopeNote:
      "වැඩේ ආරම්භ කරන්න කලින් A/C වර්ගය, අවශ්‍ය වැඩ කොටස් සහ දිනය ECME සමඟ confirm කරගන්න.",
    reasonsTitle: "සාමාන්‍යයෙන් කතා කරන හේතු",
    reasonsNote: "මේවා කතාබහ ආරම්භ කරන්න උදාහරණ පමණයි — අවසන් fault diagnosis එකක් නොවේ.",
    discussTitle: "අපි කතා කරන දේවල්",
    whyMattersTitle: "මේ ක්‍රමය වැදගත් වෙන්නේ ඇයි",
    processEyebrow: "සේවා ක්‍රියාවලිය",
    processTitle: "විමසීමේ ඉඳලා වැඩේ භාරදෙනකම්ම පැහැදිලි පියවර.",
    processSteps: [
      {
        title: "ඔයාගේ අවශ්‍යතාවය කියන්න",
        text: "A/C unit එක, ඔයා ඉන්න ප්‍රදේශය සහ දැන් තියෙන ප්‍රශ්නය හෝ ඕනේ වැඩේ ගැන අපිට කියන්න.",
      },
      {
        title: "Check-up එක සහ එකඟතාවය",
        text: "A/C එක පරීක්ෂා කළාට පස්සේ කරන්න ඕනේ වැඩේ සහ විස්තර ECME එක්ක කතා කරලා එකඟ වෙන්න.",
      },
      {
        title: "එකඟ වුණු Service එක",
        text: "ඔයා එක්ක එකඟ වුණු විදියටම සේවාව පිළිවෙළට සහ පරිස්සමින් කරලා දෙනවා.",
      },
      {
        title: "Testing සහ පැහැදිලි කිරීම",
        text: "වැඩේ ඉවර වුණාම A/C එක Check කරලා, කරපු දේ සහ ඉදිරියට සැලකිලිමත් වෙන්න ඕනේ දේවල් කියලා දෙනවා.",
      },
    ],
    faqEyebrow: "Book කරන්න කලින්",
    faqTitlePrefix: "මෙම Service එක ගැන පොඩි පැහැදිලි කිරීමක් — ",
    faqTitleSuffix: "",
    faqLead: "ඔයාගේ A/C unit එකට විශේෂිත උපදෙස් සඳහා විස්තර ECME ට එවන්න.",
  },
  aboutPage: {
    heroEyebrow: "Earth Coolman Engineers",
    heroTitle: "හොඳ සුවපහසුවක් පටන් ගන්නේ සැලකිලිමත් සේවාවකින්.",
    heroDescription:
      "A/C Installation, Servicing සහ Repair — ඔයාගේ යන්ත්‍රය සහ ඒකට ඕනේ වැඩේ ගැන පැහැදිලි කතාබහක් එක්ක.",
    whoEyebrow: "අපි කවුද",
    whoTitle: "ඔයාගේ A/C එක ගැන කෙළින්ම කතා කරමු.",
    whoP1Prefix: "Earth Coolman Engineers යනු ",
    whoP1Suffix:
      " ලිපිනයේ පිහිටි A/C සේවා ආයතනයකි. Installation, Service, Repair සහ විශේෂිත A/C අවශ්‍යතා ගැන කතා කරන්න ECME සමඟ සම්බන්ධ වෙන්න.",
    whoP2:
      "අපේ ක්‍රමය පටන් ගන්නේ ඔයාගේ අවශ්‍යතාවය හොඳින් අහලා, A/C එක Check කරලා, කරන්න ඕනේ වැඩේ පැහැදිලිව කියන තැනින්. වේලාවන්, වැඩ කොටස් සහ විස්තර කෙළින්ම ඔයා එක්ක කතා කරලා තීරණය කරනවා.",
    whoP3Prefix: "කෙළින්ම අපිට කතා කරන්න: ",
    missionEyebrow: "අපේ මෙහෙවර",
    missionTitle: "A/C සේවාව හැමෝටම පැහැදිලි කරලා දීම.",
    missionBody:
      "තාක්ෂණික දැනුම සරල පැහැදිලි කිරීම් එක්ක එකතු කරලා, ඔයාගේ A/C එකට ඕනේ හරිම සේවාව තෝරාගන්න උදව් කිරීම.",
    visionEyebrow: "අපේ දැක්ම",
    visionTitle: "විශ්වාසනීය සේවාවකින් දිගුකාලීන සුවපහසුව.",
    visionBody:
      "පරිස්සමින් කරන වැඩ, ප්‍රායෝගික උපදෙස් සහ විවෘත කතාබහ හරහා පාරිභෝගිකයන් සමඟ දිගුකාලීන විශ්වාසයක් ගොඩනැගීම.",
    valuesEyebrow: "අපේ ප්‍රතිපත්ති",
    valuesTitle: "අපි වැඩ කරන විදිය.",
    techPhotoAlt: "Inverter circuit board එකක සියුම් bench repair වැඩක් පෙන්වන උදාහරණ ඡායාරූපයක්",
    techPhotoCaption: "උදාහරණ තාක්ෂණික ඡායාරූපයකි — ECME සේවකයෙකු හෝ Project එකක් නොවේ.",
    techEyebrow: "තාක්ෂණික අවධානය",
    techTitle: "වැඩේ පටන් ගන්න කලින් හරි ප්‍රශ්න අහමු.",
    techBody:
      "එකම ලක්ෂණය පිටුපස විවිධ හේතු තියෙන්න පුළුවන්. Unit එකේ විස්තර, තත්ත්වය සහ හොඳ Check-up එකක් මඟින් හරිම සේවා සැලැස්ම හදාගන්න පුළුවන්.",
    techList: [
      "A/C Installation සහ නිවැරදි ස්ථානගත කිරීම",
      "Normal සහ Full A/C Servicing",
      "A/C Repair සහ Fault Diagnostics",
      "Inverter Card (PCB) පරීක්ෂාව සහ Repair options",
      "ගලවා නැවත සවිකිරීම (Relocation) සහ නිරන්තර Maintenance",
    ],
    teamEyebrow: "ඔයාගේ සුවපහසුව පිටුපස ඉන්න අපි",
    teamTitle: "කෙළින්ම කතා කරලා ECME හඳුනාගන්න.",
    teamLead:
      "ඔයාගේ A/C එක, ඕනේ Service එක සහ ඔයාට තියෙන ප්‍රශ්න ගැන කෙළින්ම අපේ ආයතනය එක්ක කතා කරන්න.",
    teamEmptyTitle: "සැබෑ හඳුන්වාදීමක් සැබෑ තොරතුරු වලින්.",
    teamEmptyBody:
      "සේවක විස්තර මෙහි පළ කර නැහැ. නම්, තනතුරු සහ ඡායාරූප පළ කරන්නේ ආයතනයේ තහවුරු කිරීම සහ එම අයගේ අවසරය ඇතිව පමණයි.",
    teamCta: "ECME ට කතා කරන්න",
  },
  projectsPage: {
    heroEyebrow: "Project සටහන්",
    heroTitle: "හැම තැනකටම වෙනස් cooling කතාවක් තියෙනවා.",
    heroDescription:
      "පාරිභෝගික අවසරය සහ සැබෑ ඡායාරූප ලැබුණු විට සම්පූර්ණ කළ වැඩ මෙහි පළ කරනවා. උදාහරණ ඡායාරූප සැබෑ ECME Projects ලෙස පෙන්වන්නේ නැහැ.",
    sectionAria: "Project ගැලරිය",
  },
  faqPage: {
    heroEyebrow: "ප්‍රශ්න සහ පිළිතුරු",
    heroTitle: "ඊළඟ පියවරට කලින් පැහැදිලිව දැනගන්න.",
    heroDescription:
      "පහත මාතෘකා බලන්න හෝ ඔයාට ඕනේ දේ Search කරන්න. ඔයාගේ A/C එකට අදාළ විශේෂිත විස්තර සහ වේලාවන් ECME සමඟ කෙළින්ම confirm කරගන්න.",
    sectionAria: "නිතර අසන ප්‍රශ්න සොයන්න",
  },
  contactPage: {
    heroEyebrow: "ECME සම්බන්ධ කරගන්න",
    heroTitle: "ඔයාගේ A/C අවශ්‍යතාවය ගැන කතා කරමු.",
    heroDescription:
      "ප්‍රශ්නයක්, Service විමසීමක් හෝ A/C ප්‍රශ්නයක්ද? විස්තර අපිට කියන්න — ඊළඟට කරන්න ඕනේ දේ අපි කතා කරමු.",
    directEyebrow: "කෙළින්ම සම්බන්ධ වෙන්න",
    directTitle: "ඔයාට ඕනේ මොකක්ද කියලා අපිට කියන්න.",
    directLead:
      "Service විස්තර, ලබාගත හැකි දින සහ Appointment එකක් දාගන්න ECME සමඟ කෙළින්ම සම්බන්ධ වෙන්න.",
    callTitle: "ECME ට Call කරන්න",
    whatsappTitle: "WhatsApp",
    whatsappMessagePrefix: "පණිවිඩයක් යවන්න:",
    facebookTitle: "Facebook",
    facebookLinkText: "Earth Coolman Engineers Facebook පිටුව",
    addressTitle: "ආයතනයේ ලිපිනය",
    locationEyebrow: "අපව සොයාගන්න",
    locationTitle: "ලිපිනයෙන් පටන් ගන්න.",
    locationLead:
      "Google Maps හි ලිපින සෙවුම විවෘත කරන්න. මෙය address search එකක් පමණයි — verify කළ map pin එකක් නොවේ; පැමිණීමට පෙර ECME සමඟ දිනය හා මාර්ගය confirm කරගන්න.",
    mapsButton: "Google Maps හි ලිපිනය බලන්න",
  },
  bookServicePage: {
    heroEyebrow: "Service Request එකක්",
    heroTitle: "ඔයාගේ A/C Service එක මෙතනින් පටන් ගමු.",
    heroDescription:
      "ඕනේ Service එක, ඔයාගේ A/C විස්තර සහ කැමති දිනය දාන්න. විස්තර Check කරලා WhatsApp හරහා ECME වෙත යවන්න.",
    sectionAria: "Service එකක් Request කරන්න",
    inquiryNotice:
      "මෙය Service Request එකක් පමණයි — confirm වූ Booking එකක් නොවේ. ECME විසින් ලබාගත හැකි වේලාව, වැඩ කොටස් සහ Appointment එක කෙළින්ම confirm කරයි. ඔයාගේ විස්තර මෙම වෙබ් අඩවියේ save වෙන්නේ නැහැ.",
  },
  bookingForm: {
    progressAria: "Booking පියවර",
    steps: ["Service එක", "A/C විස්තර", "ඔයාගේ විස්තර", "කැමති දිනය", "පරීක්ෂාව"],
    stepHeadings: [
      "ඔයාට ඕනේ මොන Service එකද?",
      "ඔයාගේ A/C එක ගැන කියන්න",
      "ඔයාව සම්බන්ධ කරගන්නේ කොහොමද?",
      "කවදා එන්නද කැමති?",
      "ඔයාගේ Request එක නැවත බලන්න",
    ],
    selectServiceLabel: "Service එක තෝරන්න",
    chooseServicePlaceholder: "Service එකක් තෝරන්න",
    serviceHint: "අවසන් වැඩ කොටස් සහ ලබාගත හැකි දින ECME එක්ක කතා කරලා confirm කරගන්න පුළුවන්.",
    acTypeLabel: "A/C වර්ගය",
    chooseTypePlaceholder: "වර්ගයක් තෝරන්න",
    acTypes: {
      "Wall-mounted split": "Wall-mounted Split",
      Cassette: "Cassette",
      Ducted: "Ducted",
      "Other / not sure": "වෙනත් / හරියටම දන්නේ නැහැ",
    },
    unitsLabel: "A/C Units ගණන",
    brandLabel: "Brand / Model (අත්‍යවශ්‍ය නැත)",
    issueLabel: "තියෙන ප්‍රශ්නය හෝ කරගන්න ඕනේ වැඩේ කෙටියෙන් ලියන්න",
    nameLabel: "ඔයාගේ නම",
    phoneLabel: "දුරකථන අංකය",
    locationLabel: "ලිපිනය / ප්‍රදේශය",
    dateLabel: "කැමති දිනය",
    dateHint:
      "දිනය ශ්‍රී ලංකා වේලාව අනුවයි. මෙය ඔයාගේ කැමති දිනය පමණයි — ECME විසින් ලබාගත හැකි බව confirm කළාට පස්සෙයි Appointment එක තහවුරු වෙන්නේ.",
    reviewLabels: {
      service: "Service එක",
      acType: "A/C වර්ගය",
      brand: "Brand / Model",
      units: "Units ගණන",
      issue: "ප්‍රශ්නය / අවශ්‍යතාවය",
      name: "ඔයාගේ නම",
      phone: "දුරකථන අංකය",
      location: "ලිපිනය / ප්‍රදේශය",
      date: "කැමති දිනය",
    },
    acknowledgementText:
      "මෙම කැමති දිනය ECME විසින් confirm කළ යුතු බවත්, මෙම වෙබ් අඩවිය මඟින් Booking එකක් confirm හෝ save නොකරන බවත් මම තේරුම් ගනිමි.",
    backButton: "ආපසු",
    continueButton: "ඊළඟට",
    prepareButton: "WhatsApp Request එක සකසන්න",
    preparedTitle: "ඔයාගේ Request එක යවන්න සූදානම්.",
    preparedBody:
      "පහත WhatsApp පණිවිඩය ECME සඳහා සකසා ඇත. යවන්න කලින් ඕනෑම වෙනසක් කරලා WhatsApp විවෘත කර යවන්න. වෙබ් අඩවියෙන් ස්වයංක්‍රීයව කිසිවක් යවන්නේ නැහැ.",
    editMessageLabel: "යවන්න කලින් WhatsApp පණිවිඩය බලන්න හෝ edit කරන්න",
    editMessageHint: "මෙහි කරන වෙනස්කම් WhatsApp link එකට ස්වයංක්‍රීයව එකතු වෙනවා.",
    openWhatsAppButton: "WhatsApp විවෘත කර Request එක යවන්න",
  },
  inquiryForm: {
    title: "පණිවිඩයක් / Inquiry එකක් යවන්න",
    requiredHint: "නම, දුරකථන අංකය සහ පණිවිඩය අනිවාර්යයි. Service එක තෝරන එක අත්‍යවශ්‍ය නැහැ.",
    nameLabel: "ඔයාගේ නම",
    phoneLabel: "දුරකථන අංකය",
    serviceLabel: "Service එක (අත්‍යවශ්‍ය නැත)",
    generalInquiryOption: "සාමාන්‍ය විමසීමක් (General Inquiry)",
    messageLabel: "අපිට කොහොමද උදව් කරන්න පුළුවන්?",
    draftHint:
      "මෙම Form එකෙන් WhatsApp පණිවිඩයක් සකසා දෙනවා. ඔයාගේ විස්තර මෙහි save වෙන්නේ හෝ ඉබේම යැවෙන්නේ නැහැ.",
    prepareButton: "WhatsApp පණිවිඩය සකසන්න",
    preparedTitle: "ඔයාගේ Inquiry පණිවිඩය සූදානම්.",
    preparedBody:
      "පහත පණිවිඩය බලලා අවශ්‍ය නම් edit කරලා, WhatsApp විවෘත කර ECME වෙත යවන්න. වෙබ් අඩවියෙන් කිසිවක් ඉබේ යැවෙන්නේ නැහැ.",
    editMessageLabel: "යවන්න කලින් WhatsApp පණිවිඩය බලන්න හෝ edit කරන්න",
    editMessageHint: "මෙහි කරන වෙනස්කම් WhatsApp link එකට ස්වයංක්‍රීයව එකතු වෙනවා.",
    openWhatsAppButton: "WhatsApp විවෘත කරන්න",
  },
  validation: {
    phoneRequired: "කරුණාකර ඔයාගේ දුරකථන අංකය දාන්න.",
    phoneMax: "නිවැරදි දුරකථන අංකයක් දාන්න.",
    phoneFormat: "ඉලක්කම් සහ අවශ්‍ය නම් country code එක පමණක් භාවිතා කරන්න.",
    phoneDigits: "ඉලක්කම් 9ත් 15ත් අතර දුරකථන අංකයක් දාන්න.",
    nameMin: "ඔයාගේ නම දාන්න (අඩුම අකුරු 2ක්).",
    nameMax: "අකුරු 80කට වඩා වැඩි නොකරන්න.",
    serviceRequired: "කරුණාකර Service එකක් තෝරන්න.",
    serviceAvailable: "ලැයිස්තුවේ ඇති Service එකක් තෝරන්න.",
    serviceListed: "ලැයිස්තුවේ ඇති Service එකක් තෝරන්න.",
    messageMin: "ඔයාගේ විමසීම අඩුම අකුරු 10කින් විස්තර කරන්න.",
    messageMax: "අකුරු 1,500කට වඩා වැඩි නොකරන්න.",
    acTypeRequired: "A/C වර්ගය තෝරන්න හෝ 'වෙනත් / හරියටම දන්නේ නැහැ' තෝරන්න.",
    brandMax: "අකුරු 80කට වඩා වැඩි නොකරන්න.",
    unitsNumber: "A/C Units ගණන දාන්න.",
    unitsInt: "පූර්ණ සංඛ්‍යාවක් දාන්න.",
    unitsMin: "අඩුම වශයෙන් Unit 1ක් දාන්න.",
    unitsMax: "Units 50කට වඩා වැඩි නම් කෙළින්ම ECME අමතන්න.",
    issueMin: "ඔයාගේ අවශ්‍යතාවය අඩුම අකුරු 10කින් විස්තර කරන්න.",
    issueMax: "අකුරු 1,500කට වඩා වැඩි නොකරන්න.",
    locationMin: "ලිපිනය හෝ ප්‍රදේශය අඩුම අකුරු 8කින් දාන්න.",
    locationMax: "අකුරු 240කට වඩා වැඩි නොකරන්න.",
    dateValid: "නිවැරදි දිනයක් තෝරන්න.",
    dateFuture: "අද හෝ ඉදිරි දිනයක් තෝරන්න (ශ්‍රී ලංකා වේලාව අනුව).",
    acknowledgementRequired:
      "කැමති දිනය ECME විසින් confirm කළ යුතු බවට එකඟතාවය ලකුණු කරන්න.",
  },
  notFound: {
    eyebrow: "පිටුව හමුවුණේ නැහැ",
    title: "නැවත සුවපහසුව වෙත යමු.",
    lead: "ඔයා සෙවූ පිටුව දැනට නැහැ. ECME Services බලන්න හෝ මුල් පිටුවට යන්න.",
    returnHome: "මුල් පිටුවට යන්න",
  },
  errorPage: {
    eyebrow: "නැවත උත්සාහ කරමු",
    title: "මේ පිටුව පෙන්වීමට නොහැකි වුණා.",
    lead: "නැවත Load කරලා බලන්න — නැත්නම් A/C Service එකක් සඳහා කෙළින්ම ECME අමතන්න.",
    tryAgain: "නැවත උත්සාහ කරන්න",
    contactEcme: "ECME සම්බන්ධ කරගන්න",
  },
  servicesCatalogue: {
    installation: {
      name: "A/C Installation",
      short: "ඔයාගේ කාමරයට නියමෙට ගැළපෙන සවිකිරීම",
      description:
        "කාමරයේ හැඩය, A/C unit එක සහ පාවිච්චිය අනුව පිළිවෙළට සහ ආරක්ෂිතව අලුත් A/C එකක් Install කරගන්න.",
      imageAlt: "Wall-mounted A/C එකක් සවිකරන Technician කෙනෙකුගේ උදාහරණ ඡායාරූපයක්",
      scope: [
        "කාමරය, භාවිතය සහ A/C unit විස්තර ගැන කතා කිරීම.",
        "Indoor සහ Outdoor units තියන්න සුදුසුම තැන් පරීක්ෂා කිරීම.",
        "වැඩේ පටන් ගන්න කලින් Installation විස්තර එකඟ වීම.",
        "Install කළාට පස්සේ ක්‍රියාකාරීත්වය Check කරලා මූලික භාවිතය පැහැදිලි කිරීම.",
      ],
      symptoms: [
        "අලුත් කාමරයකට හෝ ගෙදරකට A/C එකක් Install කරන්න",
        "පරණ A/C එක වෙනුවට අලුත් එකක් දාන්න",
        "Indoor / Outdoor units තියන්න හොඳම තැන ගැන අදහසක් ගන්න",
      ],
      benefits: [
        "කාමරයට ගැළපෙන සැලසුම් සහගත Installation එකක්",
        "කරන වැඩේ ගැන කලින්ම පැහැදිලි කතාබහක්",
        "එදිනෙදා භාවිතය සහ රැකගැනීම ගැන පැහැදිලි කිරීමක්",
      ],
    },
    repairs: {
      name: "A/C Repair & Diagnostics",
      short: "Repair කරන්න කලින් හරිම Fault එක හොයාගමු",
      description:
        "සීතල අඩු වුණාම හෝ A/C එක වැඩ කරන්නේ නැති වුණාම, මුලින්ම හොඳ Check-up එකකින් හේතුව හොයලා හරිම Repair එක කරමු.",
      imageAlt: "Diagnostic equipment භාවිතයෙන් A/C එකක් පරීක්ෂා කරන උදාහරණ ඡායාරූපයක්",
      scope: [
        "ඔයා දැක්ක ප්‍රශ්න සහ ලක්ෂණ හොඳින් අහගැනීම.",
        "A/C unit එක සහ controls පරීක්ෂා කිරීම.",
        "හමුවුණු Fault එක සහ කරන්න ඕනේ Repair එක පැහැදිලි කිරීම.",
        "එකඟ වුණු Repair එකෙන් පස්සේ A/C එක හොඳට වැඩ කරනවද කියලා Check කිරීම.",
      ],
      symptoms: [
        "කලින් වගේ සීතල වෙන්නේ නැහැ",
        "අමුතු සද්ද එනවා හෝ නිතරම Off වෙනවා",
        "A/C එක On වෙන්නේම නැහැ",
      ],
      benefits: [
        "Repair තීරණයකට කලින් හොඳ Check-up එකක්",
        "කරන්න යන වැඩේ ගැන පැහැදිලි කතාබහක්",
        "Repair එකෙන් පස්සේ cooling performance පරීක්ෂාවක්",
      ],
    },
    servicing: {
      name: "Normal A/C Service",
      short: "එදිනෙදා සුවපහසුවට නියමිත රැකවරණය",
      description:
        "සාමාන්‍ය පිරිසිදු කිරීම සහ Condition Check එකෙන් ඔයාගේ A/C එක හොඳින් වැඩ කරනවද, තව මොනවද ඕනේ කියලා බලාගන්න පුළුවන්.",
      imageAlt: "A/C filter එකක් පිරිසිදු කරන උදාහරණ ඡායාරූපයක්",
      scope: [
        "A/C එකේ දැන් තත්ත්වය සහ Service අවශ්‍යතාවය බැලීම.",
        "Filters සහ පිරිසිදු කළ හැකි කොටස් එකඟ වූ පරිදි Clean කිරීම.",
        "Drain line එක සහ සාමාන්‍ය ක්‍රියාකාරීත්වය Check කිරීම.",
        "වැඩිදුර අවධානයක් ඕනේ දෙයක් තිබුණොත් පැහැදිලිව කියලා දීම.",
      ],
      symptoms: [
        "නියමිත Normal Service කාලය ඇවිත්",
        "Filters වල දූවිලි බැඳිලා හෝ හුළං අඩුයි",
        "මොන Service එකද කරන්න ඕනේ කියලා හරියටම දන්නේ නැහැ",
      ],
      benefits: [
        "නියමිත වෙලාවට කරන සාමාන්‍ය රැකවරණය",
        "A/C එකේ තත්ත්වය ගැන පැහැදිලි අදහසක්",
        "ඉදිරි Maintenance සඳහා ප්‍රායෝගික උපදෙස්",
      ],
    },
    cleaning: {
      name: "Full A/C Service",
      short: "ඇතුළතම හොඳින් Clean කරන සම්පූර්ණ Service එක",
      description:
        "සාමාන්‍ය Service එකකට වඩා ගැඹුරින් Clean කරන්න ඕනේ A/C වලට Full Service එක ගැළපෙනවා. Check කළාට පස්සේ හරිම වැඩ කොටස් තීරණය කරනවා.",
      imageAlt: "Protective bag එකක් භාවිතයෙන් evaporator coil පිරිසිදු කරන උදාහරණ ඡායාරූපයක්",
      scope: [
        "Filters, Coils සහ Drain තත්ත්වය හොඳින් Check කිරීම.",
        "අවශ්‍ය Cleaning සහ Service වැඩ කොටස් එකඟ වීම.",
        "සුදුසු ආකාරයට ගැඹුරු Clean (Full Service) එක සිදු කිරීම.",
        "ක්‍රියාකාරීත්වය Check කරලා කළ Service එක පැහැදිලි කිරීම.",
      ],
      symptoms: [
        "A/C එක ඇතුළේ කුණු/දූවිලි ගොඩක් බැඳිලා පේනවා",
        "A/C එකෙන් නරක ගඳක් එනවා",
        "සාමාන්‍ය Filter clean එකෙන් ප්‍රශ්නය විසඳුණේ නැහැ",
      ],
      benefits: [
        "A/C එකේ තත්ත්වය අනුව කරන සම්පූර්ණ Cleaning එකක්",
        "සාමාන්‍යයෙන් ළඟා වෙන්න අමාරු ඇතුළත කොටස් වලටත් අවධානය",
        "වෙනත් ප්‍රශ්න තිබුණොත් පැහැදිලිව දැනුවත් කිරීම",
      ],
    },
    relocation: {
      name: "Removal & Reinstallation",
      short: "ඔයාගේ A/C එක අලුත් තැනකට පරිස්සමින්",
      description:
        "A/C එකක් මාරු කරද්දී දෙපැත්තම සැලසුම් කරන්න ඕනේ. ගලවන විදිය, අලුත් තැන සහ නැවත Install කරන වැඩ ගැන ECME එක්ක කතා කරන්න.",
      imageAlt: "ගලවා ගත් A/C යන්ත්‍රයක් පරිස්සමින් අල්ලාගෙන සිටින Technician කෙනෙකුගේ උදාහරණ ඡායාරූපයක්",
      scope: [
        "දැනට තියෙන තැන සහ අලුත් ස්ථානය පරීක්ෂා කිරීම.",
        "Unit එකේ ගැළපීම සහ ගැලවීමේ වැඩ කටයුතු කතා කිරීම.",
        "එකඟ වුණු පරිදි පරිස්සමින් ගලවා අලුත් තැනට සවිකිරීම.",
        "අලුත් තැනදී A/C එක හොඳට වැඩ කරනවද කියලා Check කිරීම.",
      ],
      symptoms: [
        "අලුත් ගෙදරකට හෝ Office එකකට මාරු වෙනවා",
        "A/C එක තියෙන කාමරය හෝ බිත්තිය වෙනස් කරන්න ඕනේ",
        "Renovation වැඩකට කලින් A/C එක ගලවා තියන්න ඕනේ",
      ],
      benefits: [
        "පරණ තැන සහ අලුත් තැන දෙකම සැලසුම් කිරීම",
        "A/C unit එක සහ පයිප්ප පරිස්සමින් හැසිරවීම",
        "නැවත සවිකළාට පස්සේ සම්පූර්ණ Testing එකක්",
      ],
    },
    "pcb-repair": {
      name: "Inverter Card (PCB) Repair",
      short: "Inverter A/C වල Electronic Board එකට විශේෂිත රැකවරණය",
      description:
        "Check-up එකේදී Inverter Card (PCB) ප්‍රශ්නයක් පෙනුනොත්, Board-level inspection එකක් සහ Repair එකක් කරන්න පුළුවන්ද කියලා ECME එක්ක කතා කරන්න.",
      imageAlt: "Inverter circuit board එකක් bench inspection කරන උදාහරණ ඡායාරූපයක්",
      scope: [
        "A/C model එක සහ පෙන්නන Error / ප්‍රශ්න සටහන් කරගැනීම.",
        "Control board (PCB) එකේ ප්‍රශ්නයක් තියෙනවද කියලා Check කිරීම.",
        "Repair කරන්න පුළුවන්ද සහ අවශ්‍ය parts ලබාගත හැකිද කියලා කතා කිරීම.",
        "එකඟ වූ වැඩේ අවසන් කළාට පස්සේ සුදුසු පරිදි Test කිරීම.",
      ],
      symptoms: [
        "Inverter Card (PCB) ප්‍රශ්නයක් කියලා සැකයි",
        "A/C එකේ Error code එකක් හෝ Light blink වීමක් පෙන්නනවා",
        "වෙලාවකට වැඩ කරලා වෙලාවකට නවතිනවා",
      ],
      benefits: [
        "හොඳ Check-up එකකින් පස්සේ PCB වැඩ තීරණය කිරීම",
        "Repair කිරීමේ හැකියාව ගැන අවංක පැහැදිලි කිරීමක්",
        "Unit එකේ තත්ත්වය අනුව හොඳම විසඳුම් කතා කිරීම",
      ],
    },
    "gas-refilling": {
      name: "Gas Refill & Leak Checks",
      short: "Gas අඩු වුණේ ඇයි කියලා මුලින්ම හොයාගමු",
      description:
        "නිකම්ම Gas ගහනවට වඩා, Leak එකක් තියෙනවද කියලා System එක Check කරලා හරි Gas වර්ගය දාන එකයි වැදගත්. ECME එක්ක කතා කරන්න.",
      imageAlt: "A/C system එකක් පරීක්ෂා කරන Technician කෙනෙකුගේ උදාහරණ ඡායාරූපයක්",
      scope: [
        "සීතල අඩු ලක්ෂණ සහ Unit විස්තර කතා කිරීම.",
        "Gas ප්‍රශ්නයක්ද හෝ Leak එකක් තියෙනවද කියලා පරීක්ෂා කිරීම.",
        "නිවැරදි Gas වර්ගය, වැඩ කොටස් සහ ලබාගත හැකි බව confirm කිරීම.",
        "එකඟ වූ වැඩේ අවසන් කළාට පස්සේ ක්‍රියාකාරීත්වය Check කිරීම.",
      ],
      symptoms: [
        "A/C එකේ සීතල කලින්ට වඩා ගොඩක් අඩු වෙලා",
        "Gas ප්‍රශ්නයක් කියලා සැක කරනවා",
        "Gas leak එකක් තියෙනවද කියලා Check කරගන්න ඕනේ",
      ],
      benefits: [
        "අනුමාන නොකර Check-up එකකින් පස්සේ Gas වැඩ කිරීම",
        "ඔයාගේ A/C එකට ගැළපෙන Gas වර්ගය ගැන පැහැදිලි කතාබහක්",
        "නැවත නැවත Gas ඉවර වෙන එක වළක්වාගන්න නිවැරදි පියවර",
      ],
    },
    maintenance: {
      name: "Preventive Maintenance",
      short: "A/C ටික හොඳින් තියාගන්න කලින් සැලසුම් කළ Service",
      description:
        "ගෙදර හෝ Office එකේ A/C පාවිච්චිය අනුව නියමිත කාලෙට Service කරගන්න සැලැස්මක් ECME එක්ක කතා කරලා හදාගන්න.",
      imageAlt: "සාමාන්‍ය A/C filter maintenance උදාහරණ ඡායාරූපයක්",
      scope: [
        "තියෙන A/C units ගණන සහ භාවිතය ලැයිස්තුගත කිරීම.",
        "ඒවායේ දැන් තත්ත්වය සහ Maintenance අවශ්‍යතා බැලීම.",
        "ගැළපෙන Service කාලසටහන සහ වැඩ කොටස් එකඟ වීම.",
        "හැම Service visit එකකදීම තත්ත්වය පරීක්ෂා කර දැනුවත් කිරීම.",
      ],
      symptoms: [
        "A/C units කිහිපයක්ම නිතර Service කරන්න ඕනේ",
        "කලින්ම Maintenance plan එකක් දාගන්න කැමතියි",
        "දවසේ වැඩි වේලාවක් A/C පාවිච්චි කරනවා",
      ],
      benefits: [
        "භාවිතය අනුව ගැළපෙන Service කාලසටහනක්",
        "පොඩි ප්‍රශ්න ලොකු Repair වෙන්න කලින් හඳුනාගැනීම",
        "නියමිත රැකවරණය සඳහා පහසු සැලසුමක්",
      ],
    },
    commercial: {
      name: "Commercial A/C Services",
      short: "Office, Shop සහ ව්‍යාපාරික ස්ථාන සඳහා A/C සේවාව",
      description:
        "ඔයාගේ ව්‍යාපාරික ස්ථානයේ අවශ්‍යතාවය, A/C units විස්තර සහ පැමිණිය හැකි වේලාවන් ECME ට කියලා සුදුසු සේවාව කතා කරගන්න.",
      imageAlt: "A/C installation උදාහරණ ඡායාරූපයක් — සම්පූර්ණ කළ commercial project එකක් නොවේ",
      scope: [
        "ව්‍යාපාරික ස්ථානය, A/C systems සහ භාවිතය ගැන කතා කිරීම.",
        "ECME විසින් සහාය දිය හැකි systems සහ වැඩ කොටස් confirm කිරීම.",
        "පැමිණෙන වේලාවන්, වැඩ කොටස් සහ සැලසුම් එකඟ වීම.",
        "Check-up ප්‍රතිඵල සහ අවසන් කළ වැඩ පැහැදිලි කිරීම.",
      ],
      symptoms: [
        "Office හෝ Shop එකේ A/C ප්‍රශ්නයක්",
        "Units කිහිපයක්ම එකපාර Service කරගන්න ඕනේ",
        "අලුත් Installation හෝ A/C වෙනස්කම් සැලසුම් කරනවා",
      ],
      benefits: [
        "ව්‍යාපාරික ස්ථානයේ අවශ්‍යතා අනුව සැලසුම් කිරීම",
        "වැඩ පටන් ගන්න කලින්ම Scope එක confirm කරගැනීම",
        "ව්‍යාපාරික කටයුතු වලට බාධාවක් නොවෙන විදියට සේවා සැලසුම් කිරීම",
      ],
    },
  },
  faqs: {
    book: {
      category: "Booking",
      question: "A/C Service එකක් Request කරන්නේ කොහොමද?",
      answer:
        "වෙබ් අඩවියේ Booking Form එකෙන්, WhatsApp පණිවිඩයකින් හෝ කෙළින්ම ECME ට Call කරලා Request කරන්න පුළුවන්. ඕනේ Service එක, A/C විස්තර සහ ඔයා ඉන්න ප්‍රදේශය කියන්න — ඊළඟ පියවර අපි කතා කරමු.",
    },
    confirmed: {
      category: "Booking",
      question: "මම තෝරන දිනය එවෙලේම Confirm වෙනවද?",
      answer:
        "නැහැ. ඔයා තෝරන දිනය Request එකක් විතරයි. ECME විසින් ලබාගත හැකි වේලාව, කරන්න ඕනේ වැඩේ සහ Appointment එක කෙළින්ම ඔයා එක්ක confirm කළාට පස්සෙයි දිනය තහවුරු වෙන්නේ.",
    },
    price: {
      category: "Booking",
      question: "Service එකක ගාස්තුව තීරණය වෙන්නේ කොහොමද?",
      answer:
        "A/C වර්ගය, ප්‍රදේශය, යන්ත්‍රයේ තත්ත්වය සහ කරන්න ඕනේ වැඩේ අනුව ගාස්තුව වෙනස් වෙන්න පුළුවන්. වැඩේ පටන් ගන්න කලින්ම ECME එක්ක විස්තර කතා කරලා එකඟ වෙන්න පුළුවන්.",
    },
    where: {
      category: "Booking",
      question: "මගේ ප්‍රදේශයට Technician කෙනෙක් එන්න පුළුවන්ද?",
      answer:
        "ඔයාගේ ලිපිනය හෝ ප්‍රදේශය ECME ට එවලා පැමිණෙන්න පුළුවන්ද කියලා confirm කරගන්න. අපේ ආයතන ලිපිනය No.121/11, Siyabalagoada, Polgasowita වුණත්, පැමිණිය හැකි ප්‍රදේශය කෙළින්ම කතා කරලා තහවුරු කරගන්න.",
    },
    install: {
      category: "Installation",
      question: "අලුත් A/C එකක් Install කරන්න කලින් මොන විස්තරද දෙන්න ඕනේ?",
      answer:
        "කාමරයේ විස්තර, A/C Brand/Model එක (තියෙනවා නම්) සහ Indoor / Outdoor units හයි කරන්න හිතන් ඉන්න තැන්වල ඡායාරූප එවන්න. තව මොනවද ඕනේ කියලා ECME කියයි.",
    },
    size: {
      category: "Installation",
      question: "කාමරයට ගැළපෙන A/C එකයි, හයි කරන තැනයි ගැන උපදෙස් ගන්න පුළුවන්ද?",
      answer:
        "ඔව්. කාමරයේ හැඩය, පාවිච්චිය සහ සවිකරන ඉඩකඩ වැදගත්. Check-up එකකින් පස්සේ ඔයාගේ කාමරයට ගැළපෙන විදිය ගැන කතා කරන්න පුළුවන්.",
    },
    "normal-full": {
      category: "Servicing",
      question: "Normal Service එකයි Full Service එකයි අතර වෙනස මොකක්ද?",
      answer:
        "Normal Service එකේදී සාමාන්‍ය Filter clean එක සහ මූලික Check-up එක කරනවා. Full Service එකේදී A/C එකේ තත්ත්වය අනුව Coils, Drain ඇතුළු ගැඹුරු Clean එකක් කරනවා. Check කළාට පස්සේ හොඳම එක ECME කියයි.",
    },
    interval: {
      category: "Maintenance",
      question: "A/C එක කොච්චර කාලෙකින් Service කරන්න ඕනෙද?",
      answer:
        "පාවිච්චි කරන ප්‍රමාණය, දූවිලි සහ පරිසරය අනුව කාලය වෙනස් වෙනවා. ඔයාගේ A/C එක Check කරලා ඒකට ගැළපෙන Service කාලසටහනක් ECME එක්ක කතා කරගන්න.",
    },
    cooling: {
      category: "Repairs",
      question: "A/C එක සීතල අඩු නම් අනිවාර්යයෙන් Gas ඉවර වෙලාද?",
      answer:
        "හැමවෙලේම එහෙම නැහැ. සීතල අඩු වෙන්න වෙනත් හේතු ගොඩක් තියෙන්න පුළුවන් (උදා: Filters/Coils කුණු වීම හෝ වෙනත් Fault එකක්). Gas ගහන්න හෝ Repair එකක් කියන්න කලින් හරියට Check කරන්න ඕනේ.",
    },
    leak: {
      category: "Repairs",
      question: "A/C එකෙන් වතුර ලීක් වෙනවා නම් මොකද කරන්න ඕනේ?",
      answer:
        "වතුර ලීක් වෙන්නේ කොතනින්ද, කොයි වෙලාවටද කියලා ECME ට කියලා උපදෙස් ගන්න. Electrical කොටස් අල්ලන්න හෝ ගලවන්න යන්න එපා. හේතුව බලලා හරි Service එක කරන්න Check-up එකක් ඕනේ.",
    },
    pcb: {
      category: "PCB Repair",
      question: "හැම Inverter Card (PCB) එකක්ම Repair කරන්න පුළුවන්ද?",
      answer:
        "Board එකේ තත්ත්වය, Fault එක සහ අවශ්‍ය Components ලබාගත හැකිද කියන එක මතයි තීරණය වෙන්නේ. Check කළාට පස්සේ Repair කරන්න පුළුවන්ද කියලා ECME අවංකවම කියනවා — හැම Board එකක්ම Repair වෙයි කියලා පොරොන්දු වෙන්න බැහැ.",
    },
    "pcb-details": {
      category: "PCB Repair",
      question: "Inverter PCB ප්‍රශ්නයක් අහද්දී මොන විස්තරද දෙන්න ඕනේ?",
      answer:
        "A/C Brand සහ Model එක, පෙන්නන Error code එකක් හෝ blink වෙන lights තියෙනවා නම් ඒවා, දැනෙන ප්‍රශ්නය සහ කලින් කළ Repairs තියෙනවා නම් ඒ විස්තර එවන්න.",
    },
    moving: {
      category: "Installation",
      question: "මගේ දැනට තියෙන A/C එක වෙනත් තැනකට මාරු කරගන්න පුළුවන්ද?",
      answer:
        "A/C එකේ තත්ත්වය සහ අලුත් තැනේ ඉඩකඩ අනුවයි ඒක තීරණය වෙන්නේ. දැනට තියෙන තැන, අලුත් තැන සහ Unit විස්තර ECME ට කියලා ගලවා සවිකිරීම ගැන කතා කරන්න.",
    },
    gas: {
      category: "Maintenance",
      question: "හැම Service එකකදීම Gas Refill කරනවද?",
      answer:
        "නැහැ. අවශ්‍ය නැතුව නිකම්ම Gas දාන්නේ නැහැ. Gas Refill කරන්නේ Check-up එකකින් පස්සේ අවශ්‍ය නම් සහ Leak එකක් තියෙනවද කියලා බලලා හරි Gas වර්ගයෙන් පමණයි.",
    },
    commercial: {
      category: "Maintenance",
      question: "මොන වගේ Commercial A/C Systems වලටද ECME සේවාව දෙන්නේ?",
      answer:
        "ඔයාගේ System වර්ගය, Unit models, Units ගණන සහ Site විස්තර ECME ට එවලා, අපිට කරන්න පුළුවන් වැඩ කොටස් confirm කරගන්න.",
    },
    prepare: {
      category: "Servicing",
      question: "Technician එන්න කලින් මම මොනවද ලෑස්ති කරලා තියන්න ඕනේ?",
      answer:
        "ප්‍රශ්නය සහ A/C විස්තර කලින් කියලා තියන්න, Indoor සහ Outdoor units වලට ළඟා වෙන්න පහසුව තියෙනවද කියලා බලන්න, සහ පැමිණෙන වේලාව ECME එක්ක confirm කරගන්න.",
    },
  },
};
