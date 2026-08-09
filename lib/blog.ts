import type { Locale } from "@/lib/data";

export type BlogPost = {
  slug: string;
  images: string[];
  dateIso: string;
  dateCard: { fr: string; en: string };
  dateFull: { fr: string; en: string };
  author: string;
  tag: { fr: string; en: string };
  title: { fr: string; en: string };
  excerpt: { fr: string; en: string };
  body: { fr: string[]; en: string[] };
  footnotes?: { fr: string; en: string };
};

export const blogPosts: BlogPost[] = [
  {
    slug: "advancing-algeria-ai-ecosystem",
    images: [
      "/blog1/1786116129658.jfif",
      "/blog1/1786116131423.jfif",
      "/blog1/1786116131556.jfif",
      "/blog1/1786116133020.jfif",
    ],
    dateIso: "2026-08-01",
    dateCard: { fr: "01 Aoû' 26", en: "01 Aug' 26" },
    dateFull: { fr: "Août 2026", en: "August 2026" },
    author: "Mahdi Ramos",
    tag: { fr: "Intelligence artificielle", en: "Artificial Intelligence" },
    title: {
      fr: "Faire avancer l'écosystème IA algérien par l'excellence académique et la coopération stratégique",
      en: "Advancing Algeria's AI Ecosystem Through International Academic Excellence and Strategic Cooperation",
    },
    excerpt: {
      fr: "Conférence à Algeria Venture avec la Prof. Dr. Insaf Salleb-Aouissi (Columbia University) sur l'innovation IA et la coopération institutionnelle.",
      en: "Advancing Artificial Intelligence Innovation through International Academic and Institutional Cooperation",
    },
    body: {
      en: [
        "One of the highlights of this week's Artificial Intelligence program was today's conference hosted at Algeria Venture, which brought together Professor Dr. Insaf Salleb-Aouissi, Algerian researcher and Lecturer in the Department of Computer Science at the School of Engineering and Applied Science, Columbia University New York, USA, with students, entrepreneurs, startup founders and project leaders to discuss the future of Artificial Intelligence and its transformative role across multiple sectors.",
        "Organized under the supervision of the Ministry of Knowledge Economy, Start-ups and Micro-Enterprises, in the presence of Mr. Noureddine Ouadah, Minister of Knowledge Economy, Start-ups and Micro-Enterprises, and in cooperation with the Embassy of the United States of America in Algeria, the event highlighted the importance of strengthening international academic and technological collaboration.",
        'The conference focused on "The PRAISE Lab at Columbia University: Solving Real-World Problems Through Research Combining Artificial Intelligence, Science, Medicine and Education." During her presentation, Professor Dr. Insaf Salleb-Aouissi demonstrated how interdisciplinary AI research is driving innovative solutions in healthcare, scientific research, education and emerging technologies.',
        "The event also provided an excellent platform for exchanging ideas on AI innovation, fostering dialogue between academia, institutions and the entrepreneurial ecosystem, while exploring new opportunities for collaboration with Algerian startups, innovators and technology entrepreneurs.",
        "Such initiatives further reinforce Algeria's commitment to developing a dynamic innovation ecosystem, promoting scientific excellence, supporting digital transformation, and strengthening international partnerships that contribute to sustainable economic growth and technological advancement.",
      ],
      fr: [
        "L'un des temps forts du programme Intelligence Artificielle de cette semaine a été la conférence organisée aujourd'hui à Algeria Venture, qui a réuni la Professeure Dr. Insaf Salleb-Aouissi, chercheuse algérienne et enseignante au Department of Computer Science de la School of Engineering and Applied Science, Columbia University (New York, USA), avec des étudiants, entrepreneurs, fondateurs de startups et porteurs de projets pour échanger sur l'avenir de l'intelligence artificielle et son rôle transformateur dans de nombreux secteurs.",
        "Organisée sous la supervision du Ministère de l'Économie de la Connaissance, des Start-ups et des Micro-Entreprises, en présence de M. Noureddine Ouadah, Ministre de l'Économie de la Connaissance, des Start-ups et des Micro-Entreprises, et en coopération avec l'Ambassade des États-Unis d'Amérique en Algérie, cette rencontre a souligné l'importance de renforcer la collaboration académique et technologique internationale.",
        "La conférence portait sur « The PRAISE Lab at Columbia University : Solving Real-World Problems Through Research Combining Artificial Intelligence, Science, Medicine and Education ». Lors de sa présentation, la Professeure Dr. Insaf Salleb-Aouissi a montré comment la recherche interdisciplinaire en IA génère des solutions innovantes dans la santé, la recherche scientifique, l'éducation et les technologies émergentes.",
        "L'événement a également offert une plateforme d'échange sur l'innovation IA, favorisant le dialogue entre le monde académique, les institutions et l'écosystème entrepreneurial, tout en explorant de nouvelles opportunités de collaboration avec les startups, innovateurs et entrepreneurs technologiques algériens.",
        "De telles initiatives renforcent l'engagement de l'Algérie à développer un écosystème d'innovation dynamique, à promouvoir l'excellence scientifique, à soutenir la transformation digitale et à consolider des partenariats internationaux contribuant à une croissance économique durable et à l'avancée technologique.",
      ],
    },
    footnotes: {
      en: "Algeria Venture · Ministry of Knowledge Economy, Start-ups and Micro-Enterprises · Noureddine Ouadah · Columbia University · U.S. Embassy Algiers · Mahdi Ramos",
      fr: "Algeria Venture · Ministère de l'Économie de la Connaissance, des Start-ups et des Micro-Entreprises · Noureddine Ouadah · Columbia University · Ambassade des États-Unis à Alger · Mahdi Ramos",
    },
  },
  {
    slug: "algeria-uk-trade-momentum",
    images: ["/blog2/1785702336691.jfif"],
    dateIso: "2026-07-31",
    dateCard: { fr: "31 Jul' 26", en: "31 Jul' 26" },
    dateFull: { fr: "31 juillet 2026", en: "31 July 2026" },
    author: "Mahdi Ramos",
    tag: { fr: "Commerce", en: "Trade" },
    title: {
      fr: "Commerce Algérie–Royaume-Uni : une dynamique renforcée, de plus grandes opportunités",
      en: "Algeria–UK Trade: Stronger Momentum, Greater Opportunities",
    },
    excerpt: {
      fr: "Selon le UK Department for Business and Trade, les échanges bilatéraux ont atteint 2,8 milliards de livres sur les quatre trimestres jusqu'à fin T1 2026 (+14,7 %).",
      en: "This factsheet presents the latest statistics on trade and investment between the UK and Algeria.",
    },
    body: {
      en: [
        "This factsheet presents the latest statistics on trade and investment between the UK and Algeria.",
        "According to the latest official statistics from the UK Department for Business and Trade, total trade in goods and services between Algeria and the United Kingdom reached £2.8 billion in the four quarters to the end of Q1 2026, representing an increase of 14.7% (£363 million) compared with the previous four-quarter period.",
        "UK exports to Algeria: £825 million (+21.5% year-on-year). UK imports from Algeria: £2.0 billion (+12.1% year-on-year).",
        "From Algeria's perspective, this represents a trade surplus of approximately £1.2 billion, while the UK records a trade deficit of the same magnitude with Algeria.",
        "Key Algerian exports to the UK — the leading goods imported by the UK from Algeria were: Crude oil £918.3 million; Refined oil £398.7 million; Gas £289.7 million (+69.4%); Processed fertilisers £74.8 million (+64.1%); Mineral manufactures £30.3 million (+82.7%).",
        "These figures highlight the current importance of energy and industrial products in bilateral trade, while also pointing to significant opportunities for diversification into higher-value sectors.",
        "From trade growth to strategic investment: trade is clearly gaining momentum, but the investment figures also underline substantial room for further development. At the end of 2024, the UK's outward FDI stock in Algeria stood at £77 million, while Algeria's inward FDI stock in the UK stood at £3 million.",
        "The next stage should therefore go beyond increasing trade volumes and focus on productive investment, industrial partnerships, technology and know-how transfer, market access, and the development of new value chains.",
        "The foundations of a stronger Algeria–UK economic partnership are clearly emerging. The opportunity now is to transform growing trade into deeper, more diversified and sustainable investment partnerships.",
      ],
      fr: [
        "Cette fiche présente les dernières statistiques sur le commerce et l'investissement entre le Royaume-Uni et l'Algérie.",
        "Selon les dernières statistiques officielles du UK Department for Business and Trade, le commerce total de biens et services entre l'Algérie et le Royaume-Uni a atteint 2,8 milliards de livres sterling sur les quatre trimestres jusqu'à fin T1 2026, soit une hausse de 14,7 % (363 millions de livres) par rapport à la période de quatre trimestres précédente.",
        "Exportations britanniques vers l'Algérie : 825 millions de livres (+21,5 % en glissement annuel). Importations britanniques depuis l'Algérie : 2,0 milliards de livres (+12,1 % en glissement annuel).",
        "Du point de vue de l'Algérie, cela représente un excédent commercial d'environ 1,2 milliard de livres, tandis que le Royaume-Uni enregistre un déficit commercial du même ordre avec l'Algérie.",
        "Principales exportations algériennes vers le Royaume-Uni — les biens les plus importés par le Royaume-Uni depuis l'Algérie étaient : pétrole brut 918,3 M£ ; pétrole raffiné 398,7 M£ ; gaz 289,7 M£ (+69,4 %) ; engrais transformés 74,8 M£ (+64,1 %) ; manufactures minérales 30,3 M£ (+82,7 %).",
        "Ces chiffres soulignent l'importance actuelle de l'énergie et des produits industriels dans les échanges bilatéraux, tout en indiquant d'importantes opportunités de diversification vers des secteurs à plus forte valeur ajoutée.",
        "De la croissance commerciale à l'investissement stratégique : le commerce gagne clairement en dynamisme, mais les chiffres d'investissement montrent aussi une marge substantielle de développement. Fin 2024, le stock d'IDE sortant du Royaume-Uni en Algérie s'élevait à 77 M£, tandis que le stock d'IDE algérien au Royaume-Uni s'élevait à 3 M£.",
        "L'étape suivante doit donc aller au-delà de l'augmentation des volumes commerciaux et se concentrer sur l'investissement productif, les partenariats industriels, le transfert de technologies et de savoir-faire, l'accès aux marchés et le développement de nouvelles chaînes de valeur.",
        "Les fondations d'un partenariat économique Algérie–Royaume-Uni plus solide émergent clairement. L'opportunité est désormais de transformer la croissance commerciale en partenariats d'investissement plus profonds, diversifiés et durables.",
      ],
    },
    footnotes: {
      en: "UK Department for Business and Trade · Algeria – UK Trade and Investment Factsheet | 31 July 2026 · UK in Algeria · Mahdi Ramos",
      fr: "UK Department for Business and Trade · Fiche Commerce & Investissement Algérie–Royaume-Uni | 31 juillet 2026 · UK in Algeria · Mahdi Ramos",
    },
  },
  {
    slug: "national-economic-conference-safex",
    images: [
      "/blog3/1782603006494.jfif",
      "/blog3/1782603008804.jfif",
      "/blog3/1782603012259.jfif",
      "/blog3/1782603012288.jfif",
      "/blog3/1782603012450.jfif",
    ],
    dateIso: "2026-06-27",
    dateCard: { fr: "27 Jun' 26", en: "27 Jun' 26" },
    dateFull: { fr: "27 juin 2026", en: "27 June 2026" },
    author: "Mahdi Ramos",
    tag: { fr: "Économie", en: "Economy" },
    title: {
      fr: "Conférence économique nationale – La 57ᵉ Foire internationale d'Alger réunit les décideurs pour une économie créatrice de valeur",
      en: "National Economic Conference – The 57th Algiers International Fair Brings Together Algeria's Leading Institutional and Economic Decision-Makers to Advance a Value-Creating Economy",
    },
    excerpt: {
      fr: "Le 27 juin 2026 au Palais des Expositions (SAFEX) : « Algérie : potentiel, réformes et opportunités pour une économie créatrice de valeur ».",
      en: "27 June 2026, at the Palais des Expositions, SAFEX: \"Algeria: Potential, Reforms and Opportunities for a Value-Creating Economy.\"",
    },
    body: {
      en: [
        "27 June 2026, at the Palais des Expositions, SAFEX: \"Algeria: Potential, Reforms and Opportunities for a Value-Creating Economy.\"",
        "Organized by the Ministry of Domestic Trade and National Market Regulation, under the patronage of H.E. Mrs. Amal Abdelatif, Minister of Domestic Trade and National Market Regulation, this high-level strategic conference brought together leading institutional, economic and industrial decision-makers to discuss the key drivers of competitiveness, economic reforms, investment attractiveness, business climate enhancement and Algeria's industrial transformation strategy.",
        "Among the distinguished participants was H.E. Mr. Yahia Bachir, Minister of Industry, whose participation reflected the Government's commitment to accelerating industrial development, economic diversification and sustainable value creation.",
        "The conference also featured a keynote contribution by Mr. Omar Rekkache, Director General of the Algerian Investment Promotion Agency (AAPI), who highlighted the strategic importance of Algeria's infrastructure in strengthening the country's attractiveness to both domestic and international investors.",
        'During the panel discussion entitled "Algeria\'s Strategic Assets: A Platform for Growth and Value Creation," Mr. Rekkache presented Algeria\'s major competitive advantages, including a modern and integrated infrastructure network comprising 36 airports, 45 ports (including 20 commercial ports), an extensive railway network, advanced road infrastructure, and strategic transport corridors connecting Algeria to African markets, supported by significant investments in telecommunications and information technologies.',
        "The Director General also emphasized the importance of developing highly qualified human capital through close cooperation with the Algerian Economic Renewal Council (CREA), vocational training institutions and educational partners to better align workforce skills with investors' needs.",
        "Addressing the country's ongoing business climate reforms, Mr. Rekkache reaffirmed Algeria's commitment to transparency, legal certainty, regulatory stability and investor confidence. He announced that 353 foreign investment projects are currently registered with the AAPI, with a significant number already reaching advanced stages of implementation.",
        "The discussions further highlighted Algeria's strategic investment priorities, particularly projects supporting import substitution, the development of mining and natural resources, food security, strategic agriculture and the expansion of the pharmaceutical industry.",
      ],
      fr: [
        "Le 27 juin 2026, au Palais des Expositions (SAFEX) : « Algérie : potentiel, réformes et opportunités pour une économie créatrice de valeur ».",
        "Organisée par le Ministère du Commerce intérieur et de la Régulation du marché national, sous le patronage de S.E. Mme Amal Abdelatif, Ministre du Commerce intérieur et de la Régulation du marché national, cette conférence stratégique de haut niveau a réuni les principaux décideurs institutionnels, économiques et industriels pour échanger sur les leviers de compétitivité, les réformes économiques, l'attractivité de l'investissement, l'amélioration du climat des affaires et la stratégie de transformation industrielle de l'Algérie.",
        "Parmi les participants de premier plan figurait S.E. M. Yahia Bachir, Ministre de l'Industrie, dont la présence a illustré l'engagement du Gouvernement à accélérer le développement industriel, la diversification économique et la création de valeur durable.",
        "La conférence a également accueilli une contribution majeure de M. Omar Rekkache, Directeur général de l'Agence algérienne de promotion de l'investissement (AAPI), qui a souligné l'importance stratégique des infrastructures algériennes pour renforcer l'attractivité du pays auprès des investisseurs nationaux et internationaux.",
        "Lors du panel intitulé « Les atouts stratégiques de l'Algérie : une plateforme de croissance et de création de valeur », M. Rekkache a présenté les principaux avantages compétitifs de l'Algérie, notamment un réseau d'infrastructures moderne et intégré comprenant 36 aéroports, 45 ports (dont 20 ports commerciaux), un vaste réseau ferroviaire, des infrastructures routières avancées et des corridors de transport stratégiques reliant l'Algérie aux marchés africains, soutenus par des investissements importants dans les télécommunications et les technologies de l'information.",
        "Le Directeur général a également insisté sur l'importance de développer un capital humain hautement qualifié, en coopération étroite avec le Conseil du renouveau économique algérien (CREA), les institutions de formation professionnelle et les partenaires éducatifs, afin de mieux aligner les compétences de la main-d'œuvre sur les besoins des investisseurs.",
        "Abordant les réformes en cours du climat des affaires, M. Rekkache a réaffirmé l'engagement de l'Algérie en faveur de la transparence, de la sécurité juridique, de la stabilité réglementaire et de la confiance des investisseurs. Il a annoncé que 353 projets d'investissement étrangers sont actuellement enregistrés auprès de l'AAPI, dont un nombre significatif a déjà atteint des stades avancés de mise en œuvre.",
        "Les discussions ont également mis en avant les priorités stratégiques d'investissement de l'Algérie, en particulier les projets de substitution aux importations, le développement minier et des ressources naturelles, la sécurité alimentaire, l'agriculture stratégique et l'expansion de l'industrie pharmaceutique.",
      ],
    },
  },
  {
    slug: "ahk-algerie-marche-des-rencontres",
    images: [
      "/blog4/1780819738144.jfif",
      "/blog4/1780819739910.jfif",
      "/blog4/1780819740026.jfif",
      "/blog4/1780819741783.jfif",
      "/blog4/1780819743478.jfif",
    ],
    dateIso: "2026-05-15",
    dateCard: { fr: "15 Mai' 26", en: "15 May' 26" },
    dateFull: { fr: "2026", en: "2026" },
    author: "Aimane Mahdi Ramos",
    tag: { fr: "Partenariat", en: "Partnership" },
    title: {
      fr: "5ᵉ édition du Marché des Rencontres de l'AHK Algérie : un accélérateur de coopération économique entre l'Algérie et l'Allemagne",
      en: "5th Edition of AHK Algeria's Marché des Rencontres: Accelerating Algeria–Germany Economic Cooperation",
    },
    excerpt: {
      fr: "Participation d'Aimane Mahdi Ramos, CEO Ramos Group | General Manager Ramos Business Center, à ce rendez-vous économique de premier plan.",
      en: "Aimane Mahdi Ramos, CEO Ramos Group | General Manager Ramos Business Center, took part in this leading economic gathering for Algeria–Germany partnerships.",
    },
    body: {
      fr: [
        "C'est avec un réel honneur que je participe à la 5ᵉ édition du Marché des Rencontres organisée par l'AHK Algérie, un rendez-vous économique de premier plan réunissant entreprises, institutions et acteurs économiques engagés dans le développement des échanges, de l'investissement et des partenariats stratégiques entre l'Algérie et l'Allemagne.",
        "Ma participation : Aimane Mahdi Ramos – CEO Ramos Group | General Manager Ramos Business Center.",
        "Cette édition a offert un cadre privilégié pour les rencontres B2B, la découverte de solutions innovantes, la promotion des opportunités d'affaires ainsi que le renforcement des relations économiques bilatérales.",
        "J'ai eu le privilège d'échanger avec Dr. Oliver Blank, Directeur Général de l'AHK Algérie, lors d'un entretien particulièrement constructif consacré aux perspectives de coopération économique algéro-allemande. Nos discussions ont mis en évidence l'importance de renforcer les synergies entre les opérateurs économiques des deux pays autour de secteurs à fort potentiel, notamment l'industrie, l'énergie, les infrastructures, les technologies, la formation, l'innovation et le développement durable.",
        "Cette rencontre a également été marquée par la présentation du programme PEFEVA – Promotion de l'Entrepreneuriat Féminin dans l'Économie Verte en Algérie, portée par GIZ Algeria, une initiative exemplaire favorisant l'innovation, l'inclusion économique et la transition vers une économie plus durable et compétitive.",
        "Je salue l'engagement constant de l'AHK Algérie ainsi que de ses partenaires institutionnels allemands pour leur contribution au rapprochement des communautés d'affaires, à la promotion de l'investissement, au transfert de savoir-faire et au développement d'un environnement économique propice à la compétitivité internationale.",
        "Je salue également M. Lokmane B., Strategic Planning Analyst | Business Intelligence Analyst, pour sa contribution et son expertise stratégique au service de l'innovation et du développement économique.",
        "Je demeure convaincu que cette 5ᵉ édition constituera un catalyseur de nouvelles opportunités d'investissement et de coopération, contribuant à l'émergence de projets créateurs de valeur, d'emplois et de prospérité partagée au bénéfice des relations algéro-allemandes.",
        "Ensemble, poursuivons la construction d'un partenariat économique algéro-allemand fondé sur l'innovation, l'excellence, l'investissement productif et une coopération durable.",
      ],
      en: [
        "It is a genuine honour to take part in the 5th edition of the Marché des Rencontres organised by AHK Algeria, a leading economic gathering that brings together companies, institutions and economic actors committed to developing trade, investment and strategic partnerships between Algeria and Germany.",
        "My participation: Aimane Mahdi Ramos – CEO Ramos Group | General Manager Ramos Business Center.",
        "This edition provided an outstanding framework for B2B meetings, the discovery of innovative solutions, the promotion of business opportunities and the strengthening of bilateral economic relations.",
        "I had the privilege of exchanging with Dr. Oliver Blank, Managing Director of AHK Algeria, in a particularly constructive discussion dedicated to the outlook for Algeria–Germany economic cooperation. Our talks highlighted the importance of strengthening synergies between economic operators from both countries in high-potential sectors, including industry, energy, infrastructure, technology, training, innovation and sustainable development.",
        "The gathering was also marked by the presentation of the PEFEVA programme – Promoting Women's Entrepreneurship in the Green Economy in Algeria – led by GIZ Algeria, an exemplary initiative fostering innovation, economic inclusion and the transition toward a more sustainable and competitive economy.",
        "I commend the constant commitment of AHK Algeria and its German institutional partners for their contribution to bringing business communities closer together, promoting investment, transferring know-how and developing an economic environment conducive to international competitiveness.",
        "I also acknowledge Mr. Lokmane B., Strategic Planning Analyst | Business Intelligence Analyst, for his contribution and strategic expertise in support of innovation and economic development.",
        "I remain convinced that this 5th edition will act as a catalyst for new investment and cooperation opportunities, contributing to projects that create value, jobs and shared prosperity for Algeria–Germany relations.",
        "Together, let us continue building an Algeria–Germany economic partnership grounded in innovation, excellence, productive investment and lasting cooperation.",
      ],
    },
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function blogTitle(post: BlogPost, locale: Locale) {
  return post.title[locale];
}

export function blogBody(post: BlogPost, locale: Locale) {
  return post.body[locale];
}
