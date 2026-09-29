import { locales, pickLocalized, type Locale } from "./i18n";

export type { Locale } from "./i18n";
export { locales, isLocale, localePath, localeMeta, defaultLocale, pickLocalized } from "./i18n";

/** Bilingual-first content; DE/IT optional — `t()` falls back automatically. */
export type Localized = { fr: string; en: string; de?: string; it?: string };

export type Subsidiary = {
  slug: string;
  name: string;
  sector: Localized;
  tagline: Localized;
  intro: Localized;
  video: string;
  /** Prefer compressed web variants when present (see hero-video). */
  videoWeb?: string;
  logo?: string;
  /** Card background behind logo for visibility */
  logoBg?: string;
  /** Particle globe accent matching the logo */
  logoGlow?: string;
  /** Invert dark-on-black logos so they stay readable */
  logoInvert?: boolean;
  /** Extra padding around logo in carousels (px) — use when mark is tight in frame */
  logoPad?: number;
  /** White marks need a dark plate; dark marks stay on the light ambient field */
  logoTone?: "light" | "dark";
  /** object-fit override for specific gallery assets */
  imageFitHints?: Record<string, "contain" | "cover">;
  accent: string;
  images: string[];
  services: Localized[];
  facts: { value: string; label: Localized }[];
};

const center = [
  "IMG-20250804-WA0001 (1).jpg","IMG-20250804-WA0002 (1).jpg","IMG-20250804-WA0003 (2).jpg","IMG-20250804-WA0004 (1).jpg","IMG-20250804-WA0005 (1).jpg","IMG-20250804-WA0006 (1).jpg","IMG-20250804-WA0007 (1).jpg","IMG-20250804-WA0008 (1).jpg","IMG-20250804-WA0009 (1).jpg","IMG-20250804-WA0010 (1) (1).jpg","IMG-20250804-WA0010.jpg","IMG-20250804-WA0011 (1).jpg","IMG-20250804-WA0012 (1).jpg","IMG-20250804-WA0013 (1).jpg","IMG-20250804-WA0014.jpg","IMG-20250804-WA0016 (1).jpg","IMG-20250804-WA0017 (1).jpg","IMG-20250804-WA0018 (1).jpg","IMG-20250804-WA0019 (1).jpg","IMG-20250804-WA0021 (1).jpg","IMG-20250804-WA0022.jpg","IMG-20250804-WA0024.jpg","IMG-20250804-WA0025.jpg","PHOTO 00001 (1).jpeg","PHOTO 00002 (1).jpeg","PHOTO 00004 (1).jpeg","PHOTO 00005 (1).jpeg","PROMOTION  2.jpg","PROMOTION 1.jpg","PROMOTION 3.jpg","PROMOTION 4.jpg","PROMOTION 6.jpg","PROMOTION 7.jpg","PROMOTION5.jpg"
].map((x) => `/center/${x}`);

const cyber = ["CYBER C 10.png","CYBER C 11.png","CYBER C 12.png","CYBER C 16.png"].map((x) => `/cyber/${x}`);
const icosium = ["PHOTO ICOSIUM GLOBAL  16.png","PHOTO ICOSIUM GLOBAL  19 (1).png","PHOTO ICOSIUM GLOBAL  20 (1).png","PHOTO ICOSIUM GLOBAL 10.png","PHOTO ICOSIUM GLOBAL 12.png","PHOTO ICOSIUM GLOBAL 22.png","PHOTO ICOSIUM GLOBAL 23.png","PHOTO ICOSIUM GLOBAL 4.png","PHOTO ICOSIUM GLOBAL 5 (1).png","PHOTO ICOSIUM GLOBAL 6 (1).png","PHOTO ICOSIUM GLOBAL 7.png","PHOTO ICOSIUM GLOBAL 8 (1).png","PHOTO ICOSIUM GLOBAL 9.png"].map((x) => `/icosium/${x}`);
const cargo = ["CARGO LOGISTICS 3.png","CATGO LOGISTICS 6.png","HANGAR LOGISIC 2.png","HANGAR LOGISTIC TOUR.png","HANGAR LOGISTIC.png","PORT LOGISTIC.png"].map((x) => `/ramos cargo/${x}`);
const construction = [
  "CONST 2.png",
  "CONST 4.png",
  "PHOTO 00002.jpeg",
  "PHOTO 00003.jpeg",
  "PHOTO ICOSIUM GLOBAL 25.png",
  "IMG-20250804-WA0001.jpg",
  "IMG-20250804-WA0003.jpg",
  "IMG-20250804-WA0003 (1).jpg",
  "IMG-20250804-WA0004.jpg",
  "IMG-20250804-WA0005.jpg",
  "IMG-20250804-WA0008.jpg",
  "IMG-20250804-WA0009.jpg",
  "IMG-20250804-WA0010 (1).jpg",
  "IMG-20250804-WA0011.jpg",
  "IMG-20250804-WA0012.jpg",
  "IMG-20250804-WA0013.jpg",
  "IMG-20250804-WA0017.jpg",
  "IMG-20250804-WA0018.jpg",
  "IMG-20250804-WA0019.jpg",
  "IMG-20250804-WA0020.jpg",
].map((x) => `/construction/${x}`);

const STONE_LION = "DECOUPE ET SCULTURE/RAMOS STONE IMAGE 4 (2).jpg";
const stoneNew = [
  "/PHOTO USINE RAMOS STONE  0003.png",
  "/PHOTO USINE RAMOS STONE  0002.png",
  "/PHOTO USINE RAMOS STONE  0001.png",
  "/PHOTO CATALOGUE MARBRE RAMOS STONE 0001.png",
  "/PHOTO CATALOGUE MARBRE RAMOS STONE.png",
];
const stone = [
  ...stoneNew,
  ...[
  // Lion marble first so it is featured and can be recentered via imageFitHints
  STONE_LION,
  "RAMOS STONE IMAGE 1 (3).jpg","RAMOS STONE IMAGE 2 (2).jpg","RAMOS STONE IMAGE 3 (2).jpg","RAMOS STONE IMAGE 4 (2).jpg","RAMOS STONE IMAGE 5 (1).jpg","RAMOS STONE IMAGE 6 (1).jpg","RAMOS STONE IMAGE 8 (1).jpg","RAMOS STONE IMG 7 (1).jpg",
  "DECOUPE ET SCULTURE/RAMOS STONE IMAGE 1 (3).jpg","DECOUPE ET SCULTURE/RAMOS STONE IMAGE 2 (2).jpg","DECOUPE ET SCULTURE/RAMOS STONE IMAGE 3 (2).jpg",
  "panel/PANEL RAMOS STONE 1.PNG","panel/PANEL RAMOS STONE 2.PNG","panel/PANEL RAMOS STONE 3.PNG",
  "produit finis/RAMOS STONE IMG 10 (1).jpg","produit finis/RAMOS STONE IMG 2 (1).jpg","produit finis/RAMOS STONE IMG 3 (1).jpg","produit finis/RAMOS STONE IMG 4 (1).jpg","produit finis/RAMOS STONE IMG 5 (1).jpg","produit finis/RAMOS STONE IMG 6 (1).jpg","produit finis/RAMOS STONE IMG 8.jpg","produit finis/RAMOS STONE IMG 9 (1).jpg","produit finis/RAMOS STONE IMG.jpg",
  "stockage/RAMOS CARRIERE STONE 3 (1).png","stockage/RAMOS STONE 1 (1).jpg","stockage/RAMOS STONE 2 (1).jpg","stockage/RAMOS STONE 4 (1).jpg","stockage/RAMOS STONE STOCK  1 (1).jpg","stockage/RAMOS STONE STOCK 2 (1).jpg","stockage/RAMOS STONE STOCK 3 (1).jpg","stockage/RAMOS STONE STOCK 4.jpg"
].map((x) => `/stone/${x}`),
];

const groupImages = [
  "/about/leadership-groupe.jpeg",
  "/about/dg-bureau.jpeg",
  "/about/dg-portrait.jpeg",
  "/center/PHOTO 00002 (1).jpeg",
  "/center/PHOTO 00001 (1).jpeg",
  "/stone/stockage/RAMOS CARRIERE STONE 3 (1).png",
  "/ramos cargo/PORT LOGISTIC.png",
  "/cyber/CYBER C 11.png",
];

/**
 * Canonical subsidiary order (client brief).
 * Do not renumber or mention counts in UI copy.
 */
export const subsidiaries: Subsidiary[] = [
  {
    slug: "ramos-group",
    name: "Ramos Group",
    accent: "#c7963f",
    sector: { fr: "Groupe multidisciplinaire", en: "Multidisciplinary group", de: "Multidisziplinäre Gruppe", it: "Gruppo multidisciplinare" },
    tagline: {
      fr: "Une ambition algérienne, une portée mondiale",
      en: "Algerian ambition, global reach",
      de: "Algerischer Anspruch, globale Reichweite",
      it: "Ambizione algerina, portata globale",
    },
    intro: {
      fr: "Ramos Group réunit des expertises industrielles, immobilières, logistiques et technologiques sous une même culture d'excellence et de temps long.",
      en: "Ramos Group unites industrial, real-estate, logistics and technology expertise under one culture of excellence and long-term thinking.",
      de: "Ramos Group vereint Industrie-, Immobilien-, Logistik- und Technologiekompetenz unter einer gemeinsamen Kultur der Exzellenz.",
      it: "Ramos Group unisce competenze industriali, immobiliari, logistiche e tecnologiche sotto una cultura comune di eccellenza.",
    },
    video: "/hero/VIDEO PAGE D'ACCEUIL RAMOS GROUP.mp4",
    logo: "/logo/LOGO RAMOS GROUP HD.png",
    logoBg: "#0A0614",
    logoGlow: "#F8A040",
    images: groupImages,
    services: [
      { fr: "Pilotage stratégique du groupe", en: "Group strategic steering", de: "Strategische Steuerung der Gruppe", it: "Governance strategica del gruppo" },
      { fr: "Développement international", en: "International development", de: "Internationale Entwicklung", it: "Sviluppo internazionale" },
      { fr: "Synergies entre filiales", en: "Cross-subsidiary synergies", de: "Synergien zwischen Tochtergesellschaften", it: "Sinergie tra filiali" },
      { fr: "Innovation et partenariats", en: "Innovation and partnerships", de: "Innovation und Partnerschaften", it: "Innovazione e partnership" },
    ],
    facts: [
      { value: "360°", label: { fr: "écosystème", en: "ecosystem", de: "Ökosystem", it: "ecosistema" } },
      { value: "∞", label: { fr: "ambition", en: "ambition", de: "Ambition", it: "ambizione" } },
    ],
  },
  {
    slug: "business-center", name: "Ramos Business Center", accent: "#c7963f",
    sector: { fr: "Développement économique", en: "Economic development", de: "Wirtschaftsentwicklung", it: "Sviluppo economico" },
    tagline: { fr: "Votre partenaire stratégique pour le développement économique mondial", en: "Your strategic partner for global economic development", de: "Ihr strategischer Partner für globale Wirtschaftsentwicklung", it: "Il vostro partner strategico per lo sviluppo economico globale" },
    intro: { fr: "Un hub dédié aux entrepreneurs et investisseurs, reliant l'immobilier, l'import-export, la sécurité des infrastructures critiques et les contrats internationaux.", en: "A hub for entrepreneurs and investors connecting real estate, import-export, critical infrastructure security and international joint contracts.", de: "Ein Hub für Unternehmer und Investoren, der Immobilien, Import-Export, kritische Infrastrukturen und internationale Verträge verbindet.", it: "Un hub per imprenditori e investitori che collega immobiliare, import-export, sicurezza delle infrastrutture critiche e contratti internazionali." },
    video: "/center/VIDEO RAMOS BUSINESS CENTER.mp4",
    videoWeb: "/center/VIDEO RAMOS BUSINESS CENTER.web.mp4",
    logo: "/logo/center.png", logoBg: "#0A0A0A", logoGlow: "#F8A040", logoTone: "dark", images: center,
    services: [
      { fr: "Réseaux d'affaires et partenariats internationaux", en: "Business networks and international partnerships" },
      { fr: "Conseil juridique, fiscal et immobilier", en: "Legal, tax and real-estate advisory" },
      { fr: "Industrie, IA, robotique et villes intelligentes", en: "Industry, AI, robotics and smart cities" },
      { fr: "Forums, formation et incubation de startups", en: "Forums, training and startup incubation" }
    ],
    facts: [{ value: "4", label: { fr: "continents connectés", en: "connected continents" } }, { value: "360°", label: { fr: "accompagnement", en: "advisory" } }]
  },
  {
    slug: "stone", name: "Ramos Stone", accent: "#b58c68",
    sector: { fr: "Pierre & architecture", en: "Stone & architecture", de: "Stein & Architektur", it: "Pietra e architettura" },
    tagline: { fr: "De la pierre brute au chef-d'œuvre architectural", en: "From Raw Stone to Architectural Masterpiece", de: "Vom Rohstein zum architektonischen Meisterwerk", it: "Dalla pietra grezza al capolavoro architettonico" },
    intro: { fr: "Une chaîne de valeur verticale, de la carrière au projet fini : sélection, découpe CNC, création sur mesure, finition et export vers plus de quinze pays.", en: "A vertical value chain from quarry to finished project: sourcing, CNC cutting, bespoke creation, finishing and export to more than fifteen countries.", de: "Eine vertikale Wertschöpfungskette vom Steinbruch zum fertigen Projekt.", it: "Una catena del valore verticale, dalla cava al progetto finito." },
    video: "/stone/VIDEO STONE (2).mp4",
    videoWeb: "/stone/VIDEO STONE.web.mp4",
    logo: "/logo/stone.png", logoBg: "#0A0A0A", logoGlow: "#D4C4B0", logoTone: "dark", images: stone,
    imageFitHints: {
      [`/stone/${STONE_LION}`]: "contain",
    },
    services: [
      { fr: "Extraction et sélection des blocs", en: "Extraction and block selection" },
      { fr: "Découpe, sculpture et finition CNC", en: "CNC cutting, carving and finishing" },
      { fr: "Études techniques et simulation 3D", en: "Technical studies and 3D simulation" },
      { fr: "Installation, suivi et export", en: "Installation, tracking and export" }
    ],
    facts: [{ value: "15+", label: { fr: "pays export", en: "export countries" } }, { value: "6", label: { fr: "étapes maîtrisées", en: "controlled stages" } }]
  },
  {
    slug: "construction", name: "Ramos Construction", accent: "#e0a323",
    sector: { fr: "Construction & infrastructures", en: "Construction & infrastructure", de: "Bau & Infrastruktur", it: "Costruzioni e infrastrutture" },
    tagline: {
      fr: "Construction de bâtiments industriels métalliques et entrepôts modernes",
      en: "Construction of industrial metal buildings and modern warehouses",
      de: "Bau industrieller Metallgebäude und moderner Lagerhallen",
      it: "Costruzione di edifici industriali metallici e magazzini moderni",
    },
    intro: {
      fr: "Gardienne d'un héritage familial dans la construction, l'architecture et l'immobilier, Ramos Construction mène projets neufs, rénovation et génie civil en Algérie et en Méditerranée.",
      en: "Guardian of a family heritage in construction, architecture and real estate, Ramos Construction delivers new builds, renovation and civil engineering across Algeria and the Mediterranean.",
      de: "Hüterin eines familiären Erbes im Bauwesen, der Architektur und Immobilien.",
      it: "Custode di un'eredità familiare nella costruzione, architettura e immobiliare.",
    },
    video: "/construction/RAMOS CONSTRUCTION (1).mp4",
    videoWeb: "/construction/RAMOS CONSTRUCTION.web.mp4",
    logo: "/logo/construction.png", logoBg: "#12100E", logoGlow: "#C4A574", logoInvert: true, images: construction,
    services: [
      { fr: "Bâtiments industriels et entrepôts", en: "Industrial buildings and warehouses" },
      { fr: "Construction tous corps d'état", en: "All-trades construction" },
      { fr: "Rénovation moderne et historique", en: "Modern and historic renovation" },
      { fr: "Infrastructures et génie civil", en: "Infrastructure and civil engineering" },
      { fr: "Développement et investissements immobiliers", en: "Real estate development and investments" },
    ],
    facts: [
      { value: "23+", label: { fr: "années d'expérience", en: "years of experience" } },
      { value: "360°", label: { fr: "maîtrise projet", en: "project control" } },
      { value: "4", label: { fr: "piliers d'expertise", en: "expertise pillars" } },
    ],
  },
  {
    slug: "icosium", name: "Ecosium Global Network", accent: "#e65730",
    sector: { fr: "Communication stratégique", en: "Strategic communication", de: "Strategische Kommunikation", it: "Comunicazione strategica" },
    tagline: { fr: "Intelligence stratégique, puissance créative et excellence digitale", en: "Strategic Communication, Creative Power, and Digital Excellence", de: "Strategische Kommunikation, kreative Kraft und digitale Exzellenz", it: "Comunicazione strategica, potenza creativa ed eccellenza digitale" },
    intro: { fr: "Une agence globale de branding et communication qui relie l'Afrique du Nord, l'Europe et la Méditerranée pour transformer l'ambition en récit durable.", en: "A full-service branding and communications agency connecting North Africa, Europe and the Mediterranean to turn ambition into enduring narratives.", de: "Eine globale Branding- und Kommunikationsagentur zwischen Nordafrika, Europa und dem Mittelmeer.", it: "Un'agenzia globale di branding e comunicazione che collega Nord Africa, Europa e Mediterraneo." },
    video: "/icosium/ICOSIUM GLOBAL (1).mp4",
    videoWeb: "/icosium/ICOSIUM GLOBAL.web.mp4",
    logo: "/logo/icosium.png", logoBg: "#FFFFFF", logoGlow: "#2B8CDB", images: icosium,
    services: [
      { fr: "Conseil stratégique et plateforme de marque", en: "Strategic advisory and brand platforms" },
      { fr: "Création, éditorial et campagnes", en: "Creative, editorial and campaigns" },
      { fr: "Expériences digitales, UX et IA", en: "Digital experiences, UX and AI" },
      { fr: "Activation et mesure d'impact", en: "Activation and impact measurement" }
    ],
    facts: [{ value: "6+", label: { fr: "années d'expertise", en: "years of expertise" } }, { value: "3", label: { fr: "régions stratégiques", en: "strategic regions" } }]
  },
  {
    slug: "cargo", name: "Ramos Cargo Logistique", accent: "#e52b32",
    sector: { fr: "Transport & logistique", en: "Transport & logistics", de: "Transport & Logistik", it: "Trasporto e logistica" },
    tagline: { fr: "Des flux maîtrisés, des horizons sans frontières", en: "Controlled flows, borderless horizons", de: "Kontrollierte Flüsse, grenzenlose Horizonte", it: "Flussi controllati, orizzonti senza confini" },
    intro: { fr: "Une plateforme logistique pensée pour relier ports, entrepôts et marchés internationaux avec visibilité, fiabilité et maîtrise opérationnelle.", en: "A logistics platform connecting ports, warehouses and international markets with visibility, reliability and operational control.", de: "Eine Logistikplattform, die Häfen, Lager und internationale Märkte verbindet.", it: "Una piattaforma logistica pensata per collegare porti, magazzini e mercati internazionali." },
    video: "/ramos cargo/VIDEO PAGE LOGISTIC WEB.mp4",
    videoWeb: "/ramos cargo/VIDEO PAGE LOGISTIC.web.mp4",
    logo: "/logo/cargo-logistic.png",
    logoBg: "#FFFFFF",
    logoGlow: "#E52B32",
    logoTone: "light",
    images: cargo,
    services: [
      { fr: "Fret maritime et multimodal", en: "Ocean and multimodal freight" },
      { fr: "Entreposage et gestion des stocks", en: "Warehousing and inventory management" },
      { fr: "Transit et coordination portuaire", en: "Customs transit and port coordination" },
      { fr: "Solutions logistiques sur mesure", en: "Bespoke logistics solutions" }
    ],
    facts: [{ value: "360°", label: { fr: "visibilité des flux", en: "flow visibility" } }, { value: "24/7", label: { fr: "coordination", en: "coordination" } }]
  },
  {
    slug: "cyber-control", name: "Cyber Control", accent: "#42a5f5",
    sector: { fr: "Sécurité intégrée", en: "Integrated security", de: "Integrierte Sicherheit", it: "Sicurezza integrata" },
    tagline: { fr: "Des solutions intégrées pour les aéroports, frontières terrestres et ports", en: "Integrated Security Solutions for Airports, Land Borders and Seaports", de: "Integrierte Sicherheitslösungen für Flughäfen, Landgrenzen und Seehäfen", it: "Soluzioni di sicurezza integrate per aeroporti, confini terrestri e porti" },
    intro: { fr: "Leader algérien de la sécurité physique et numérique des infrastructures critiques, Cyber Control conjugue IA, cybersécurité et automatisation.", en: "An Algerian leader in physical and digital security for critical infrastructure, combining AI, cybersecurity and automation.", de: "Algerischer Marktführer für physische und digitale Sicherheit kritischer Infrastrukturen.", it: "Leader algerino nella sicurezza fisica e digitale delle infrastrutture critiche." },
    video: "/cyber/CYBERCONTROLS.mp4",
    videoWeb: "/cyber/CYBERCONTROLS.web.mp4",
    logo: "/logo/cyber.png", logoBg: "#F3F7F4", logoGlow: "#5CDB3A", images: cyber,
    services: [
      { fr: "Vidéosurveillance intelligente et biométrie", en: "Intelligent video surveillance and biometrics" },
      { fr: "Cybersécurité et centre opérationnel 24/7", en: "Cybersecurity and 24/7 operations center" },
      { fr: "Contrôle des frontières et inspection", en: "Border control and screening" },
      { fr: "Automatisation des bâtiments et sécurité incendie", en: "Building automation and fire safety" }
    ],
    facts: [{ value: "50+", label: { fr: "projets", en: "projects" } }, { value: "24/7", label: { fr: "SOC à Alger", en: "Algiers SOC" } }, { value: "−40%", label: { fr: "incidents", en: "incidents" } }]
  },
];

export const getSubsidiary = (slug: string) => subsidiaries.find((item) => item.slug === slug);

export const t = (value: Localized, locale: Locale) => pickLocalized(value, locale);

export type SectorPanel = {
  image: string;
  top: Localized;
  bottom: Localized;
};

export const sectorPanels: SectorPanel[] = [
  {
    image: "/panel/AUTOMATIVE INDUSTRY-SPARE PARTS (2).png",
    top: { fr: "Industrie automobile", en: "Automative industry" },
    bottom: { fr: "Industrie de la pièce détachée", en: "Spare parts industry" },
  },
  {
    image: "/panel/CONSTRUCTION-MARBLE NATURAL STONE (2).png",
    top: { fr: "Construction", en: "Construction" },
    bottom: { fr: "Marbre et pierre naturelle", en: "Marble and natural stone" },
  },
  {
    image: "/panel/CYBERSECURITY-NETW PNJ (2).png",
    top: { fr: "Cybersécurité", en: "Cybersecurity" },
    bottom: { fr: "Connectivité et réseaux", en: "Connectivity - networking" },
  },
  {
    image: "/panel/PHARMA-COSM PNJ (2).png",
    top: { fr: "Industrie cosmétique", en: "Cosmetics industry" },
    bottom: { fr: "Industrie pharmaceutique", en: "Pharmaceutical industry" },
  },
  {
    image: "/panel/RENEWABLE ENERGY SMART HOME (2).png",
    top: { fr: "Énergies renouvelables", en: "Renewable energy" },
    bottom: { fr: "Maison intelligente", en: "Smart home" },
  },
  {
    image: "/panel/ROBOTICS AUTOMATION (2).png",
    top: { fr: "Robotique", en: "Robotics" },
    bottom: { fr: "Automatisation", en: "Automation" },
  },
];

export type ShowcaseItem = {
  image: string;
  title: Localized;
  caption: Localized;
  slug: string;
};

export const showcase: ShowcaseItem[] = [
  {
    image: "/stone/stockage/RAMOS CARRIERE STONE 3 (1).png",
    title: { fr: "Carrière de marbre", en: "Marble quarry" },
    caption: { fr: "Extraction et sélection des blocs à la source.", en: "Extraction and block selection at the source." },
    slug: "stone",
  },
  {
    image: `/stone/${STONE_LION}`,
    title: { fr: "Sculpture monumentale", en: "Monumental sculpture" },
    caption: { fr: "Lion en marbre — découpe et sculpture d'exception.", en: "Marble lion — exceptional cutting and carving." },
    slug: "stone",
  },
  {
    image: "/ramos cargo/PORT LOGISTIC.png",
    title: { fr: "Opérations portuaires", en: "Port operations" },
    caption: { fr: "Transit et coordination des flux maritimes.", en: "Customs transit and maritime flow coordination." },
    slug: "cargo",
  },
  {
    image: "/ramos cargo/HANGAR LOGISTIC.png",
    title: { fr: "Entreposage", en: "Warehousing" },
    caption: { fr: "Stockage et gestion des stocks à grande échelle.", en: "Large-scale storage and inventory management." },
    slug: "cargo",
  },
  {
    image: "/cyber/CYBER C 11.png",
    title: { fr: "Sécurité des infrastructures", en: "Infrastructure security" },
    caption: { fr: "Supervision des sites critiques 24/7.", en: "24/7 monitoring of critical sites." },
    slug: "cyber-control",
  },
  {
    image: "/icosium/PHOTO ICOSIUM GLOBAL 12.png",
    title: { fr: "Communication de marque", en: "Brand communication" },
    caption: { fr: "Campagnes et identités à portée internationale.", en: "Campaigns and identities with international reach." },
    slug: "icosium",
  },
  {
    image: "/center/PHOTO 00002 (1).jpeg",
    title: { fr: "Hub d'affaires", en: "Business hub" },
    caption: { fr: "Rencontres et partenariats entre investisseurs.", en: "Meetings and partnerships between investors." },
    slug: "business-center",
  },
  {
    image: "/stone/produit finis/RAMOS STONE IMG 10 (1).jpg",
    title: { fr: "Réalisations architecturales", en: "Architectural projects" },
    caption: { fr: "De la pierre brute au projet livré.", en: "From raw stone to delivered project." },
    slug: "stone",
  },
];

/** Locale list used by generateStaticParams across the app. */
export const staticLocales = locales;
