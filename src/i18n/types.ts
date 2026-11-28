export type Locale = "si" | "en";

export const DEFAULT_LOCALE: Locale = "si";
export const LOCALE_STORAGE_KEY = "ecme_locale";

export type ServiceTranslation = {
  name: string;
  short: string;
  description: string;
  imageAlt: string;
  scope: string[];
  symptoms: string[];
  benefits: string[];
};

export type ExpertiseTileTranslation = {
  name: string;
  description: string;
  imageAlt: string;
};

export type ProblemTranslation = {
  label: string;
  service: string;
  explanation: string;
};

export type FaqTranslation = {
  category: string;
  question: string;
  answer: string;
};

export type Messages = {
  meta: {
    siteTitle: string;
  };
  common: {
    bookService: string;
    exploreServices: string;
    whatsappEcme: string;
    callEcme: string;
    home: string;
    services: string;
    about: string;
    projects: string;
    faq: string;
    contact: string;
    skipToContent: string;
    illustrativePhoto: string;
    illustrativeNotEcme: string;
    notProvided: string;
  };
  languageSwitcher: {
    ariaLabel: string;
    mobileLabel: string;
    english: string;
    sinhala: string;
  };
  contactBar: {
    whatsappLabel: string;
    whatsappAria: string;
    facebookLabel: string;
    facebookAria: string;
  };
  nav: {
    mainAria: string;
    mobileAria: string;
    openMenu: string;
    closeMenu: string;
    openServices: string;
    closeServices: string;
    dropdownLabel: string;
    logoAria: string;
    whatsappShort: string;
    floatingWhatsAppAria: string;
    floatingWhatsAppTitle: string;
  };
  hero: {
    eyebrow: string;
    headlineLine1: string;
    headlineLine2: string;
    description: string;
    unitAlt: string;
    comfortSetting: string;
  };
  expertise: {
    eyebrow: string;
    title: string;
    description: string;
    viewAll: string;
    gridAria: string;
    tiles: Record<string, ExpertiseTileTranslation>;
  };
  problemFinder: {
    eyebrow: string;
    title: string;
    intro: string;
    legend: string;
    choiceNote: string;
    suggestedService: string;
    forPrefix: string;
    assessmentNote: string;
    bookOnWhatsApp: string;
    bookAriaPrefix: string;
    bookAriaSuffix: string;
    liveSuggestedPrefix: string;
    problems: Record<string, ProblemTranslation>;
  };
  howWeWork: {
    eyebrow: string;
    title: string;
    step1LinkContact: string;
    step1Middle: string;
    step1LinkWhatsApp: string;
    step1End: string;
    steps: Array<{
      title: string;
      description: string;
    }>;
  };
  whyChoose: {
    photoAlt: string;
    photoCaption: string;
    eyebrow: string;
    title: string;
    lead: string;
    cta: string;
    benefits: Array<{
      title: string;
      description: string;
    }>;
  };
  recentProjects: {
    eyebrow: string;
    title: string;
    exploreButton: string;
    illustrativeNote: string;
    illustrationSuffix: string;
    areas: Record<string, string>;
  };
  projectGallery: {
    allCategory: string;
    categoriesAria: string;
    categories: Record<string, string>;
    emptyAllTitle: string;
    emptyCategoryTitlePrefix: string;
    emptyCategoryTitleSuffix: string;
    emptyWithItems: string;
    emptyNoItems: string;
    discussProject: string;
    viewPrefix: string;
    closeViewer: string;
    previousProject: string;
    nextProject: string;
    beforeLabel: string;
    afterLabel: string;
    compareLabel: string;
    compareValueSuffix: string;
  };
  reviews: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    lead: string;
    facebookButton: string;
    regionAria: string;
    starsSuffix: string;
    previousReview: string;
    nextReview: string;
    emptyTitle: string;
    emptyBody: string;
    shareFeedback: string;
  };
  faqPreview: {
    eyebrow: string;
    title: string;
    lead: string;
    exploreAll: string;
  };
  faqExplorer: {
    searchLabel: string;
    searchPlaceholder: string;
    categoriesAria: string;
    allCategory: string;
    categories: Record<string, string>;
    countSingle: string;
    countPlural: string;
    emptyTitle: string;
    emptyBody: string;
    clearFilters: string;
  };
  bookingCta: {
    ariaLabel: string;
    eyebrow: string;
    title: string;
    body: string;
    guidedLink: string;
  };
  footer: {
    tagline: string;
    exploreHeading: string;
    exploreAria: string;
    servicesHeading: string;
    servicesAria: string;
    contactHeading: string;
    requestService: string;
    rightsReserved: string;
    backToTop: string;
    logoAlt: string;
  };
  servicesPage: {
    heroEyebrow: string;
    heroTitle: string;
    heroDescription: string;
    sectionAria: string;
    categoriesAria: string;
    confirmScopeNote: string;
    exploreThisService: string;
  };
  serviceDetail: {
    heroEyebrow: string;
    startingEyebrow: string;
    startingTitle: string;
    startingLeadSuffix: string;
    bookThisService: string;
    askAboutService: string;
    confirmScopeNote: string;
    reasonsTitle: string;
    reasonsNote: string;
    discussTitle: string;
    whyMattersTitle: string;
    processEyebrow: string;
    processTitle: string;
    processSteps: Array<{
      title: string;
      text: string;
    }>;
    faqEyebrow: string;
    faqTitlePrefix: string;
    faqTitleSuffix: string;
    faqLead: string;
  };
  aboutPage: {
    heroEyebrow: string;
    heroTitle: string;
    heroDescription: string;
    whoEyebrow: string;
    whoTitle: string;
    whoP1Prefix: string;
    whoP1Suffix: string;
    whoP2: string;
    whoP3Prefix: string;
    missionEyebrow: string;
    missionTitle: string;
    missionBody: string;
    visionEyebrow: string;
    visionTitle: string;
    visionBody: string;
    valuesEyebrow: string;
    valuesTitle: string;
    techPhotoAlt: string;
    techPhotoCaption: string;
    techEyebrow: string;
    techTitle: string;
    techBody: string;
    techList: string[];
    teamEyebrow: string;
    teamTitle: string;
    teamLead: string;
    teamEmptyTitle: string;
    teamEmptyBody: string;
    teamCta: string;
  };
  projectsPage: {
    heroEyebrow: string;
    heroTitle: string;
    heroDescription: string;
    sectionAria: string;
  };
  faqPage: {
    heroEyebrow: string;
    heroTitle: string;
    heroDescription: string;
    sectionAria: string;
  };
  contactPage: {
    heroEyebrow: string;
    heroTitle: string;
    heroDescription: string;
    directEyebrow: string;
    directTitle: string;
    directLead: string;
    callTitle: string;
    whatsappTitle: string;
    whatsappMessagePrefix: string;
    facebookTitle: string;
    facebookLinkText: string;
    addressTitle: string;
    locationEyebrow: string;
    locationTitle: string;
    locationLead: string;
    mapsButton: string;
  };
  bookServicePage: {
    heroEyebrow: string;
    heroTitle: string;
    heroDescription: string;
    sectionAria: string;
    inquiryNotice: string;
  };
  bookingForm: {
    progressAria: string;
    steps: [string, string, string, string, string];
    stepHeadings: [string, string, string, string, string];
    selectServiceLabel: string;
    chooseServicePlaceholder: string;
    serviceHint: string;
    acTypeLabel: string;
    chooseTypePlaceholder: string;
    acTypes: Record<string, string>;
    unitsLabel: string;
    brandLabel: string;
    issueLabel: string;
    nameLabel: string;
    phoneLabel: string;
    locationLabel: string;
    dateLabel: string;
    dateHint: string;
    reviewLabels: {
      service: string;
      acType: string;
      brand: string;
      units: string;
      issue: string;
      name: string;
      phone: string;
      location: string;
      date: string;
    };
    acknowledgementText: string;
    backButton: string;
    continueButton: string;
    prepareButton: string;
    preparedTitle: string;
    preparedBody: string;
    editMessageLabel: string;
    editMessageHint: string;
    openWhatsAppButton: string;
  };
  inquiryForm: {
    title: string;
    requiredHint: string;
    nameLabel: string;
    phoneLabel: string;
    serviceLabel: string;
    generalInquiryOption: string;
    messageLabel: string;
    draftHint: string;
    prepareButton: string;
    preparedTitle: string;
    preparedBody: string;
    editMessageLabel: string;
    editMessageHint: string;
    openWhatsAppButton: string;
  };
  validation: {
    phoneRequired: string;
    phoneMax: string;
    phoneFormat: string;
    phoneDigits: string;
    nameMin: string;
    nameMax: string;
    serviceRequired: string;
    serviceAvailable: string;
    serviceListed: string;
    messageMin: string;
    messageMax: string;
    acTypeRequired: string;
    brandMax: string;
    unitsNumber: string;
    unitsInt: string;
    unitsMin: string;
    unitsMax: string;
    issueMin: string;
    issueMax: string;
    locationMin: string;
    locationMax: string;
    dateValid: string;
    dateFuture: string;
    acknowledgementRequired: string;
  };
  notFound: {
    eyebrow: string;
    title: string;
    lead: string;
    returnHome: string;
  };
  errorPage: {
    eyebrow: string;
    title: string;
    lead: string;
    tryAgain: string;
    contactEcme: string;
  };
  servicesCatalogue: Record<string, ServiceTranslation>;
  faqs: Record<string, FaqTranslation>;
};
