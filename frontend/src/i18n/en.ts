/*
 * ENGLISH — the source text for the whole website.
 *
 * gu.ts (Gujarati) and hi.ts (Hindi) have exactly the same structure; change
 * the words there to correct a translation. TypeScript reports any missing or
 * extra key, so the three files always stay in step.
 *
 * Formatting you can use inside any text:
 *   **bold**              *emphasis* (shown in red inside headings)
 *   [link text](/learn-more)          internal link — the language prefix is added for you
 *   [link text](https://example.com)  external link — opens in a new tab
 *   {phone}                           replaced with the phone number
 * Headings written as a list are shown one item per line.
 */
export const en = {
  locale: { code: 'en', htmlLang: 'en-IN', ogLocale: 'en_IN', dateLocale: 'en-IN', languageName: 'English' },

  common: {
    home: 'Home',
    skipToContent: 'Skip to content',
    menu: 'Menu',
    close: 'Close',
    enquire: 'Enquire',
    whatsapp: 'WhatsApp',
    whatsappUs: 'WhatsApp us',
    call: 'Call',
    callNumber: 'Call {phone}',
    keepReading: 'Keep reading',
    lastUpdated: 'Last updated',
    onThisPage: 'On this page',
    pleaseNote: 'Please note:',
    breadcrumb: 'Breadcrumb',
    defaultWhatsappMessage:
      'Namaste. I found matrugayatirth.com and would like to enquire about Matrugaya Pooja at Siddhpur.',
  },

  nav: {
    guide: 'Matrugaya Pooja',
    learnMore: 'Significance',
    services: 'Services',
    visit: 'Plan your visit',
    cost: 'Cost & booking',
    about: 'About',
    gallery: 'Gallery',
    contact: 'Contact',
  },

  brand: { tagline: 'Bindu Sarovar · Siddhpur' },

  company: {
    identityStatement:
      'Matrugaya Tirth (matrugayatirth.com) is run by tirth purohits — traditional pilgrimage priests — based in Siddhpur, Gujarat. We guide families through Matrugaya Pooja (Matru Shraddha) and related ancestral rites at Bindu Sarovar, and help them plan the visit. This is not the official website of the Bindu Sarovar complex, a temple trust, or any government body.',
    shortDescription:
      'Tirth purohits in Siddhpur, Gujarat, guiding families through Matrugaya Pooja (Matru Shraddha), Pind Daan and Tarpan at Bindu Sarovar.',
    meetingPointName: 'Our home in Uplisheri, near Ashapuri Mata',
    meetingPointDescription:
      'Families meet us at our home first and we go to Bindu Sarovar together. Please call before you come so we are ready to receive you.',
    ritualLocationName: 'Bindu Sarovar, Siddhpur',
    ritualLocationDescription:
      'The rites are performed at the Bindu Sarovar complex, about 2 km from our home. We take you there.',
    street: 'Uplisheri, near Nilkanth Mahadev, Brahmania Pole',
    locality: 'Siddhpur',
    district: 'Patan district',
    region: 'Gujarat',
    nearLandmark: 'near Ashapuri Mata',
    callTimes: 'Call anytime',
    callBeforeVisit: 'please call before you visit',
    stats: [
      { value: '40+', label: 'years of experience' },
      { value: '1,00,000+', label: 'devotees served' },
    ],
    languagesSpoken: ['Gujarati', 'Hindi', 'English'],
    purohitRole: 'Tirth purohit, Siddhpur',
    purohitNames: ['Shri Alkeshbhai Dave', 'Shri Hiteshbhai Pandya (Patil)'],
    and: 'and',
  },

  scam: {
    label: 'Scam alert',
    title: 'Beware of scams at Bindu Sarovar',
    body: 'Touts and people posing as purohits wait around Bindu Sarovar to approach visiting families and take them as their own customers. Some even claim to be the purohit you have booked with us.',
    steps: [
      'Do not go with anyone who approaches you at Bindu Sarovar or the station.',
      'Call us on {phone} as soon as you reach Siddhpur.',
      'Come to our home near Ashapuri Mata first — we take you to Bindu Sarovar ourselves.',
    ],
    short:
      'Beware of scams: people at Bindu Sarovar may claim to be us. Call {phone} and come to our home first.',
  },

  header: {
    primaryNav: 'Primary',
    siteMenu: 'Site menu',
    speakToPurohit: 'Speak to a purohit',
    meetFirst: 'Meet us first',
    meetFirstText:
      '{meetingPoint}, Siddhpur. Call anytime — please call before you come; we go to Bindu Sarovar together.',
  },

  languageMenu: {
    button: 'Change language',
    ownHeading: 'Translated by us',
    autoHeading: 'Automatic translation (Google)',
    autoNote: 'Machine translation — some words may be inaccurate.',
  },

  footer: {
    eyebrow: 'Before you travel',
    title: ['Ask us first.', '*Travel* with clarity.'],
    text: 'Tell us the ritual, your preferred date and how many people are travelling. We will confirm what is possible and what to bring.',
    meetAtHome: 'Meet us at our home',
    directions: 'Directions',
    ritesAt: 'Rituals at',
    weTakeYou: 'we take you there',
    phoneWhatsapp: 'Phone & WhatsApp',
    columns: {
      guides: 'Guides',
      rituals: 'Rituals',
      about: 'About',
      guideLink: 'Matrugaya Pooja guide',
      learnMoreLink: 'Significance of Bindu Sarovar',
      visitLink: 'Plan your visit',
      costLink: 'Cost & booking',
      allServices: 'All services',
      whoWeAre: 'Who we are',
      gallery: 'Gallery',
      contact: 'Contact',
    },
  },

  enquiry: {
    ritual: 'Ritual',
    rituals: [
      'Matrugaya Pooja (Matru Shraddha)',
      'Pind Daan & Tarpan',
      'Narayan Bali',
      'Tripindi Shraddha',
      'Online rite (cannot travel)',
      'Not sure — need guidance',
    ],
    when: 'Preferred date or month',
    whenPlaceholder: 'e.g. 12 November, or Kartik',
    people: 'People travelling',
    peoplePlaceholder: 'e.g. 4',
    from: 'Travelling from',
    fromPlaceholder: 'City',
    language: 'Preferred language',
    noPreference: 'No preference',
    languageOptions: ['Gujarati', 'Hindi', 'English', 'Other'],
    help: 'Would you like help with',
    helpStay: 'Accommodation',
    helpTransport: 'Local transport',
    note: 'Opens WhatsApp with your message ready to send. Nothing is saved on this website.',
    send: 'Send on WhatsApp',
    message: {
      intro: 'Namaste. I would like to enquire about {ritual} at Siddhpur.',
      when: 'Preferred date / period: {value}',
      people: 'Number of people: {value}',
      from: 'Travelling from: {value}',
      language: 'Preferred language: {value}',
      help: 'Would also like help with: {value}',
      helpJoin: ' and ',
      helpStay: 'accommodation',
      helpTransport: 'local transport',
      signature: '(Sent from matrugayatirth.com)',
    },
  },

  emailForm: {
    subject: 'New enquiry from matrugayatirth.com',
    name: 'Your name',
    phone: 'Phone / WhatsApp number',
    message: 'Which ritual, preferred dates and number of people',
    note: 'Sent by email to {email}. We reply by phone or WhatsApp.',
    submit: 'Send enquiry',
  },

  map: {
    meetingLabel: 'Meet us here first',
    ritualLabel: 'Where the rites take place',
    callFirst: 'Please call before you come.',
    showMap: 'Show map here',
    openMaps: 'Open in Google Maps',
    mapTitle: 'Map: {name}',
  },

  reviewNote: {
    default:
      'Practices differ between families and traditions. Treat this page as a planning guide — your purohit will confirm the exact rites, timing and requirements for your family before the day.',
  },

  faqs: [
    {
      id: 'where',
      question: 'Where is Matrugaya Pooja performed in Siddhpur?',
      answer:
        'At the Bindu Sarovar complex in Siddhpur, Patan district, north Gujarat — about 105 km north of Ahmedabad by road. Families first meet us at our home in Uplisheri, near Ashapuri Mata, and we go to Bindu Sarovar together. Please call before you come.',
    },
    {
      id: 'who',
      question: 'Who can perform Matrugaya Pooja?',
      answer:
        'It is performed for a mother who has passed away, most often by her son or daughter — daughters do perform it at Siddhpur. Customs differ between families and communities for other relatives, so tell us your situation and the purohit will explain what your family tradition allows.',
    },
    {
      id: 'when',
      question: 'When can it be performed?',
      answer:
        'It can be arranged through most of the year. Many families choose a date after the first death anniversary, or a day with personal or religious significance; your purohit can advise on a suitable date. Kartik, Bhadrapad and Chaitra are the busiest months, so book early if you plan to come then.',
    },
    {
      id: 'duration',
      question: 'How long does the ritual take?',
      answer:
        'Plan for about three to four hours for the main rite, and longer if other rites are added or the family group is large. Keep the rest of the day unhurried — arrive early and avoid booking a tight onward connection.',
    },
    {
      id: 'bring',
      question: 'What do we need to bring?',
      answer:
        'You can bring your own puja samagri, or we arrange it for you and you offer dakshina accordingly. Bring a change of clothes (plain, light-coloured cotton is commonly preferred), and the details the purohit will ask for during the sankalp: your mother’s name, the family gotra if known, and the date or tithi of her passing.',
    },
    {
      id: 'scams',
      question: 'Someone at Bindu Sarovar says they are from Matrugaya Tirth. What should we do?',
      answer:
        'Do not go with them — call us first on {phone}. Scams are common: touts at Bindu Sarovar approach visiting families and some claim to be the purohit a family has booked. We meet every family at our home first and take them to the sarovar ourselves.',
    },
    {
      id: 'advance',
      question: 'Do we need to book in advance?',
      answer:
        'Yes. Contact us as soon as you know your travel dates — ideally a few weeks ahead, and earlier for Kartik and Pitru Paksha. An advance payment confirms your booking; we tell you the amount with your quote.',
    },
    {
      id: 'cost',
      question: 'How much does Matrugaya Pooja cost?',
      answer:
        'It depends on the rites you choose, whether we arrange the samagri, and any additional offerings such as Brahmin bhojan or vastra daan. Call or message us with your plan and we will give you a quote before you book.',
    },
    {
      id: 'stay-transport',
      question: 'Can you help with accommodation and transport?',
      answer:
        'Yes. We arrange hotel stays, travel and a local guide on request. These are charged separately. Tell us your dates early, especially for Kartik.',
    },
    {
      id: 'online',
      question: 'Can the rite be performed if we cannot travel?',
      answer:
        'Yes, we can perform rites online when a family cannot come to Siddhpur. Call us to discuss how it would work for your family.',
    },
    {
      id: 'languages',
      question: 'In which languages is the ritual explained?',
      answer:
        'The purohits explain the rite in Gujarati, Hindi or English. The mantras themselves are recited in Sanskrit. You can read this website in many more languages using the language menu at the top of the page.',
    },
    {
      id: 'father',
      question: 'Is Matrugaya only for one’s mother?',
      answer:
        'Siddhpur is traditionally known as Matru Gaya — the tirtha for shraddha offered to one’s mother — just as Gaya in Bihar is associated with shraddha for one’s father and paternal ancestors. Other ancestral rites can also be arranged here; ask the purohit what suits your family.',
    },
    {
      id: 'official',
      question: 'Are you the official Bindu Sarovar office?',
      answer:
        'No. We are independent tirth purohits based in Siddhpur offering personal, private arrangements. We are not part of the government pilgrimage board or its booking system, and this website is not the official Bindu Sarovar site.',
    },
  ],

  gallery: {
    images: {
      '06': {
        alt: 'Families seated on the floor of a covered ritual hall at Bindu Sarovar, offering rice pindas on leaf plates',
        caption: 'Pinda daan in the covered ritual hall',
      },
      '09': {
        alt: 'Pilgrims performing rites on the stone floor of the Bindu Sarovar tank, with steps and a white shrine behind',
        caption: 'Rites beside the Bindu Sarovar tank',
      },
      '02': {
        alt: 'A purohit explaining the rite to a family seated in a ritual hall, with copper kalash and offerings arranged before them',
        caption: 'The purohit explains each step to the family',
      },
      '05': {
        alt: 'Men in saffron dhotis seated in rows, hands folded, with plates of offerings in front of them during Matru Shraddha',
        caption: 'Families seated in rows during the shraddha',
      },
      '04': {
        alt: 'A woman in a blue sari performing a ritual with a purohit on the stone floor of the Bindu Sarovar complex',
        caption: 'A rite with the purohit on the stone floor of the complex',
      },
      '07': {
        alt: 'Families seated under a temporary shade with copper vessels and offerings during a busy day of Matrugaya rites',
        caption: 'Families under a temporary shade on a busy day',
      },
      '08': {
        alt: 'Men in white dhotis with folded hands seated before leaf plates of offerings in the Bindu Sarovar complex',
        caption: 'Folded hands before the offerings',
      },
      '01': {
        alt: 'A family seated in a ritual hall with puja items laid out on low tables during a shraddha',
        caption: 'A family shraddha in progress',
      },
      '03': {
        alt: 'Two men standing on the stepped bank of the Bindu Sarovar tank in Siddhpur',
        caption: 'On the steps of Bindu Sarovar',
      },
      portrait: {
        alt: 'Shri Alkeshbhai Dave (left) and Shri Hiteshbhai Pandya (right), tirth purohits of Matrugaya Tirth, seated outdoors in Siddhpur',
        caption: 'Shri Alkeshbhai Dave (left) and Shri Hiteshbhai Pandya (right)',
      },
    },
    videos: [
      {
        title: 'Bindu Sarovar Matru Gaya Tirtha, Sidhpur, Gujarat',
        description: 'A Hindi-language video tour of Bindu Sarovar and the Matru Gaya tirtha.',
      },
      { title: 'Sidhpur, Gujarat', description: 'A short video introduction to the town of Siddhpur.' },
    ],
  },

  travel: {
    railStation: 'Siddhpur (station code SID)',
    railLine: 'Western Railway, on the Ahmedabad – Mehsana – Palanpur – Delhi main line',
    railShort: 'on the Ahmedabad – Mehsana – Palanpur – Delhi main line',
    railNote:
      'Not every train stops at Siddhpur. Check the current timetable on NTES or IRCTC; Mehsana and Palanpur are larger stops nearby.',
    airportName: 'Sardar Vallabhbhai Patel International Airport, Ahmedabad (AMD)',
    airportDistance: 'about 115 km',
    road: [
      { from: 'Ahmedabad', distance: 'about 105 km' },
      { from: 'Gandhinagar', distance: 'about 95 km' },
      { from: 'Mehsana', distance: 'about 37 km' },
      { from: 'Palanpur', distance: 'about 33 km' },
      { from: 'Patan', distance: 'about 28 km' },
    ],
    highway: 'Gujarat State Highway 41 (Ahmedabad – Mehsana – Siddhpur – Palanpur)',
  },

  services: {
    groups: [
      {
        id: 'ancestral-rites',
        title: 'Ancestral rites (shraddha)',
        intro: 'Rites for departed family members, performed at Bindu Sarovar with a purohit guiding each step.',
        services: [
          {
            id: 'matrugaya',
            title: 'Matrugaya Pooja',
            alsoKnownAs: 'Matru Shraddha, Matru Gaya Shraddha, Matru Tarpan',
            summary:
              'The shraddha offered specifically for one’s mother — the rite Siddhpur is known for. Includes tarpan and pinda daan at Bindu Sarovar.',
          },
          {
            id: 'pind-daan-tarpan',
            title: 'Pind Daan & Tarpan',
            alsoKnownAs: 'Pindadan, Tarpanam',
            summary:
              'Offerings of rice pindas and of water with sesame and kusha — the heart of every shraddha, also performed for other ancestors.',
          },
          {
            id: 'narayan-bali',
            title: 'Narayan Bali',
            alsoKnownAs: 'Narayan Bali Shraddha',
            summary:
              'Traditionally performed for a family member whose death was untimely or unnatural, or whose last rites could not be completed.',
          },
          {
            id: 'tripindi-shraddha',
            title: 'Tripindi Shraddha',
            alsoKnownAs: 'Tripindi Shraddh',
            summary:
              'Traditionally performed when ancestral shraddha has been missed for several years, for the peace of ancestors across generations.',
          },
          {
            id: 'panch-bali-shraddha',
            title: 'Panch Bali Shraddha',
            alsoKnownAs: '',
            summary:
              'A shraddha with offerings to five categories of beings, performed as part of ancestral rites in some family traditions.',
          },
          {
            id: 'varshik-shraddha',
            title: 'Varshik Shraddha',
            alsoKnownAs: '',
            summary: 'The annual shraddha on the tithi of a family member’s passing.',
          },
          {
            id: 'mahalaya-shraddha',
            title: 'Mahalaya Shraddha',
            alsoKnownAs: '',
            summary:
              'Shraddha during Pitru Paksha, the fortnight dedicated to ancestors, culminating on Mahalaya (Sarva Pitru) Amavasya.',
          },
          {
            id: 'asthi-visarjan',
            title: 'Asthi Visarjan',
            alsoKnownAs: '',
            summary:
              'Immersion of a loved one’s ashes with the accompanying rites. Ask us how and where this is done at Siddhpur.',
          },
          {
            id: 'uttar-kriya',
            title: 'Uttar Kriya',
            alsoKnownAs: '',
            summary:
              'The rites on the tenth, eleventh and twelfth days after a death (dasha, ekadasha and dwadasha), for purification and the peace of the departed.',
          },
        ],
      },
      {
        id: 'other-pujas',
        title: 'Other pujas and guidance',
        intro: 'Rites for the living and the household, arranged by the same purohits.',
        services: [
          {
            id: 'havan',
            title: 'Havan',
            alsoKnownAs: '',
            summary: 'A Vedic fire ritual with offerings made into the sacred fire while mantras are recited.',
          },
          {
            id: 'pooja',
            title: 'Pooja',
            alsoKnownAs: '',
            summary: 'Worship with prayers and offerings for a particular deity or occasion.',
          },
          {
            id: 'nakshatra-shanti',
            title: 'Nakshatra Shanti Pooja',
            alsoKnownAs: '',
            summary: 'A shanti rite performed when a birth star (nakshatra) is considered inauspicious.',
          },
          {
            id: 'sanskar',
            title: '16 Sanskar Karma',
            alsoKnownAs: '',
            summary: 'The sixteen samskaras — Hindu rites of passage from before birth to the last rites.',
          },
          {
            id: 'jyotish',
            title: 'Jyotish guidance',
            alsoKnownAs: '',
            summary: 'Help with choosing an auspicious muhurat for a rite, based on the Hindu calendar.',
          },
        ],
      },
    ],
    alsoCalled: 'Also called {names}',
  },

  offerings: [
    { name: 'Bhoomi daan', note: 'gift of land, usually made symbolically' },
    { name: 'Suvarna daan', note: 'gift of gold' },
    { name: 'Gau daan', note: 'gift of a cow (gaay nu daan)' },
    { name: 'Paduka daan', note: 'gift of footwear' },
    { name: 'Chhatra daan', note: 'gift of an umbrella' },
    { name: 'Vastra daan', note: 'gift of clothes' },
    { name: 'Pad daan', note: '' },
    { name: 'Brahmin bhojan', note: 'meal offered to Brahmins' },
    { name: 'Batuk bhojan', note: 'meal offered to young Brahmin boys' },
    { name: 'Kumarika bhojan', note: 'meal offered to young girls (kuvarika bhojan)' },
    { name: 'Acharya poojan', note: 'worship of the officiating acharya, with dakshina' },
    { name: 'Tirth gor dakshina', note: 'dakshina to the tirth purohit' },
  ],

  /* ───────────────────────────── Pages ───────────────────────────── */

  home: {
    meta: {
      title: 'Matrugaya Pooja in Siddhpur, Gujarat | Matrugaya Tirth',
      description:
        'Plan Matrugaya Pooja (Matru Shraddha) at Bindu Sarovar, Siddhpur with local tirth purohits. Ritual guidance, eligibility, what to bring, travel help and a clear quote before you travel.',
    },
    hero: {
      eyebrow: 'Tirth purohits at Bindu Sarovar',
      title: ['Matrugaya Pooja', 'in *Siddhpur,*', 'Gujarat'],
      intro:
        'We are tirth purohits in Siddhpur. We conduct Matrugaya Pooja — the shraddha offered for one’s mother — at Bindu Sarovar, and help your family plan every step before you travel.',
      whatsappCta: 'Enquire on WhatsApp',
    },
    facts: [
      { term: 'Where', detail: 'Rites at Bindu Sarovar, Siddhpur — we meet you first at our home' },
      { term: 'Duration', detail: 'About 3–4 hours for the main rite' },
      { term: 'Explained in', detail: 'Gujarati · Hindi · English' },
      { term: 'Booking', detail: 'Call anytime or WhatsApp — quote before you travel' },
    ],
    place: {
      eyebrow: 'The place',
      title: ['Where Kapila taught', 'his mother, *Devahuti*'],
      paragraphs: [
        'The Srimad Bhagavatam (Canto 3) describes Bindu Sarovar on the Sarasvati as the hermitage of Sage Kardama, where Lord Kapila taught Sankhya to his mother Devahuti. By long tradition, that Bindu Sarovar is the sacred tank at Siddhpur.',
        'Just as Gaya in Bihar is the chief tirtha for shraddha for one’s father, Siddhpur is revered as **Matru Gaya** — the tirtha for shraddha offered to one’s mother.',
      ],
      panchTitle: 'Panch Sarovar',
      panchText:
        'Bindu Sarovar is counted among Hindu tradition’s five sacred lakes, with Mansarovar, Pushkar, Narayan Sarovar and Pampa Sarovar.',
      familiesValue: '~47,000',
      familiesText:
        'families performed Matru Shraddha here in a single year, according to the state pilgrimage board [(reported 2024)](https://english.loktej.com/article/14467/siddhpur-a-historic-pilgrimage-site-for-matru-shradh-rituals).',
      cta: 'The significance of Bindu Sarovar',
    },
    who: {
      eyebrow: 'Who you will be speaking to',
      title: ['Local purohits,', '*not* a booking agency'],
      text: 'Matrugaya Tirth is run by tirth purohits based in Siddhpur. When you call or message, you speak with the purohits who conduct the rite — {names}.',
      points: [
        'We conduct the rite and explain every step as it happens',
        'Explanations in Gujarati, Hindi and English',
        'Bring your own samagri, or we arrange it for you',
        'Hotel, travel and a local guide arranged on request',
      ],
      notOfficial: 'This is not the official website of the Bindu Sarovar complex, a temple trust or a government body.',
      cta: 'About the purohits',
    },
    steps: {
      eyebrow: 'How a visit works',
      title: ['Five calm', 'steps'],
      intro: 'Most of the work happens before you travel, so the day itself can be unhurried.',
      link: 'Read the visit guide →',
      items: [
        {
          title: 'Tell us your plan',
          text: 'Message us on WhatsApp or call with the rite you need, your preferred dates and how many people are travelling.',
        },
        {
          title: 'Confirm date & quote',
          text: 'The purohit confirms a suitable date and time, what is included, and what you should bring. An advance payment confirms the booking.',
        },
        {
          title: 'Arrive and call us',
          text: 'Siddhpur is about 105 km north of Ahmedabad and has its own railway station. Call us when you arrive and come to our home near Ashapuri Mata — we go to Bindu Sarovar together.',
        },
        {
          title: 'The rite at Bindu Sarovar',
          text: 'Your purohit leads the sankalp, tarpan and pinda daan, explaining each step in your language as it happens.',
        },
        {
          title: 'After the rite',
          text: 'Many families take darshan at the temples around the sarovar before leaving. We remain a phone call away if questions come up later.',
        },
      ],
    },
    rites: {
      eyebrow: 'Rites we conduct',
      title: ['Ancestral rites', 'at Bindu Sarovar'],
      intro:
        'Each page explains what the rite is for, how it usually proceeds and what to confirm with us before you travel.',
      cta: 'All services',
    },
    moments: {
      eyebrow: 'From Bindu Sarovar',
      title: ['Moments from', 'the ritual halls'],
      link: 'View gallery →',
      stripLabel: 'Photographs from Bindu Sarovar (scrolls sideways)',
    },
    travel: {
      eyebrow: 'Getting to Siddhpur',
      title: ['North Gujarat,', 'on the *Sarasvati*'],
      intro: 'Siddhpur lies in Patan district on the Ahmedabad–Palanpur route, with its own railway station.',
      byRail: 'By rail',
      byAir: 'By air',
      byRoad: 'By road',
      airDetail: 'Ahmedabad airport (AMD), {distance} by road',
      cta: 'Plan your visit',
    },
    words: { eyebrow: 'Families we have served', title: ['In their', 'own words'] },
    faq: {
      eyebrow: 'Before you travel',
      title: ['Questions', 'families ask'],
      intro: 'For the full picture — eligibility, the sequence of the rite and what to bring — read the [Matrugaya Pooja guide](/matrugaya-pooja-guide).',
    },
    enquire: {
      eyebrow: 'Start planning',
      title: ['Tell us', 'your plan'],
      intro: 'Answer a few questions and send them to the purohit on WhatsApp. You will get a reply with dates and a quote.',
    },
  },

  guide: {
    meta: {
      title: 'Matrugaya Pooja Guide: Vidhi, Eligibility & Samagri',
      description:
        'A practical guide to Matrugaya Pooja (Matru Shraddha) at Bindu Sarovar, Siddhpur: what it is, who can perform it, when, the usual sequence of the rite, how long it takes and what to bring.',
    },
    breadcrumb: 'Matrugaya Pooja guide',
    eyebrow: 'The complete guide',
    title: ['Matrugaya Pooja,', '*step by step*'],
    intro:
      '**Matrugaya Pooja** — also called Matru Shraddha or Matru Gaya Shraddha — is the shraddha a child offers for their departed mother. It is performed at Bindu Sarovar in Siddhpur, Gujarat, through tarpan and pinda daan guided by a tirth purohit.',
    toc: [
      { id: 'what', label: 'What is Matrugaya Pooja?' },
      { id: 'why-siddhpur', label: 'Why Siddhpur?' },
      { id: 'who', label: 'Who can perform it?' },
      { id: 'when', label: 'When to perform it' },
      { id: 'steps', label: 'What happens during the rite' },
      { id: 'duration', label: 'How long it takes' },
      { id: 'bring', label: 'What to bring and wear' },
      { id: 'arrangements', label: 'What we arrange' },
      { id: 'book', label: 'How to book' },
      { id: 'questions', label: 'More questions' },
    ],
    what: {
      heading: 'What is Matrugaya Pooja?',
      paragraphs: [
        '**Matrugaya Pooja is the shraddha offered specifically for one’s mother.** In Hindu tradition, a mother’s care and sacrifice create a debt (*matru rin*) that a child can never fully repay; offering shraddha at Siddhpur is regarded as the most sacred way to honour her and pray for her peace.',
        'The rite brings together the essential acts of every shraddha — the sankalp, tarpan (offering of water) and pinda daan (offering of pindas) — performed for the mother, at the place tradition holds most fitting for it.',
      ],
    },
    why: {
      heading: 'Why Siddhpur and Bindu Sarovar?',
      paragraphs: [
        '**Siddhpur is revered as Matru Gaya** — just as Gaya in Bihar is the chief tirtha for shraddha for one’s father, Siddhpur is the tirtha for shraddha for one’s mother.',
        'The Srimad Bhagavatam (Canto 3) describes Bindu Sarovar, on the Sarasvati, as the hermitage of Sage Kardama and his wife Devahuti, and the place where their son, Lord Kapila, taught his mother the path to liberation. By long tradition this Bindu Sarovar is identified with the sacred tank at Siddhpur. Gujarat Tourism also records the tradition that Parashurama performed shraddha for his mother here.',
        '[Read more about the significance of Bindu Sarovar →](/learn-more)',
      ],
    },
    who: {
      heading: 'Who can perform Matrugaya Pooja?',
      paragraphs: [
        '**It is performed for a mother who has passed away, most often by her son or daughter.** Daughters, married or unmarried, do perform it at Siddhpur.',
        'Questions about other relatives — for example a grandchild performing it for a grandmother, or a husband for his wife — are answered differently in different families and communities. Rather than rely on a general web page (including this one), tell the purohit your situation; they will explain what your family tradition allows.',
      ],
    },
    when: {
      heading: 'When should it be performed?',
      paragraphs: [
        '**Matrugaya Pooja can be arranged through most of the year.** Many families choose a date after the first death anniversary, or a day with personal or religious significance such as the tithi of the mother’s passing.',
      ],
      list: [
        '**Busiest months:** Kartik, Bhadrapad and Chaitra. Siddhpur’s traditional fair runs from Kartik Ekadashi to Kartik Purnima, when the town is especially crowded.',
        '**Pitru Paksha** — the fortnight dedicated to ancestors — is also a popular time for shraddha.',
        'Book early for these periods, and allow for crowds and slower movement around the precinct.',
      ],
    },
    stepsIntro: {
      heading: 'What happens during the rite',
      paragraphs: [
        '**The purohit leads you through each step and explains it as it happens.** The exact sequence varies with family tradition and the rites you have chosen; this is the usual outline.',
      ],
    },
    stepsLabel: 'Usual sequence of Matrugaya Pooja',
    steps: [
      {
        title: 'Purification',
        text: 'The day begins with a bath and a change into clean clothes. Many men have their heads shaved (mundan) before a shraddha; whether your family follows this is your choice — ask the purohit.',
      },
      {
        title: 'Sankalp',
        text: 'Seated with the purohit, you state your intention. The sankalp names your mother, the family gotra and the place and day of the rite.',
      },
      {
        title: 'Tarpan',
        text: 'Water mixed with sesame (til) is offered with kusha grass while the purohit recites the mantras and tells you what each offering signifies.',
      },
      {
        title: 'Pinda daan',
        text: 'Pindas — balls of cooked rice or flour with sesame — are prepared and offered for your mother. This is the heart of Matrugaya Pooja.',
      },
      {
        title: 'At the sacred kunds',
        text: 'The precinct has three sacred kunds — Bindu Sarovar, Alpa Sarovar and Gyan Vapi. The purohit guides you to them as the rite requires.',
      },
      {
        title: 'Dakshina and darshan',
        text: 'The rite closes with dakshina and, if your family wishes, Brahmin bhojan. Many families then take darshan at the temples around the sarovar.',
      },
    ],
    duration: {
      heading: 'How long does it take?',
      paragraphs: [
        '**Plan for about three to four hours for the main rite.** Additional rites, a large family group or a crowded day can make it longer. Keep the whole day free: arrive early, and avoid booking a tight onward train or flight.',
      ],
    },
    bring: {
      heading: 'What to bring and wear',
      paragraphs: [
        '**You can bring your own puja samagri, or we arrange it for you** and you offer dakshina accordingly. Either way, you will usually need:',
      ],
      list: [
        'A change of clothes — plain, light-coloured cotton is commonly preferred for the rite',
        'Your mother’s name, your family gotra (if known), and the date or tithi of her passing',
        'A towel and footwear that is easy to remove',
        'Cash for dakshina and incidental expenses',
        'Photo ID for your hotel or dharamshala',
      ],
    },
    arrangements: {
      heading: 'What we arrange',
      paragraphs: ['We are tirth purohits based in Siddhpur. For families who book with us, we:'],
      list: [
        'conduct the rite at Bindu Sarovar and explain each step in Gujarati, Hindi or English',
        'arrange the priests the rite needs',
        'arrange the puja samagri, if you would like us to',
        'help you choose a suitable date',
        'arrange your hotel, travel and a local guide on request — charged separately',
        'perform the rite online when a family cannot travel',
      ],
      after:
        'Families may also add offerings such as Brahmin bhojan, vastra daan or gau daan. These are charged in addition — see [the full list](/cost-and-booking#offerings).',
    },
    book: {
      heading: 'How to book',
      list: [
        '**Message or call us** with the rite, your preferred dates and the number of people travelling.',
        '**Receive a quote** for the rite, any additional offerings, and any hotel or travel you would like us to arrange.',
        '**Confirm your date** with an advance payment.',
        '**Call us when you reach Siddhpur** and come to our home near Ashapuri Mata. We go to Bindu Sarovar together — never go with people who approach you there.',
      ],
      after:
        'See [cost & booking](/cost-and-booking) for what affects the price, and [plan your visit](/plan-your-visit) for travel and stay.',
      askCta: 'Ask the purohit',
      contactCta: 'All contact options',
    },
    questionsHeading: 'More questions',
    faqs: [
      {
        id: 'daughters',
        question: 'Can daughters perform Matrugaya Pooja?',
        answer:
          'Yes — daughters, married or unmarried, perform Matrugaya Pooja for their mother at Siddhpur. If you have specific questions about your family custom, ask the purohit before you travel.',
      },
      {
        id: 'both-parents',
        question: 'Can we perform it if our father is also no longer with us?',
        answer:
          'Matrugaya Pooja is offered for the mother. Families often ask about rites for the father or other ancestors on the same visit; the purohit will advise what is appropriate and whether it can be done the same day.',
      },
      {
        id: 'menstruation',
        question: 'What if a woman performing the rite is menstruating on the planned date?',
        answer:
          'Many families follow the custom of not performing the rite during menstruation. If this may affect your dates, tell us when you plan — rescheduling is easier the earlier we know.',
      },
      {
        id: 'cannot-travel',
        question: 'Can the rite be performed without travelling to Siddhpur?',
        answer:
          'Yes. When a family cannot come to Siddhpur, we can perform the rite online. Call us to discuss how it would work for your family.',
      },
      {
        id: 'muhurat',
        question: 'Do we need a muhurat?',
        answer:
          'Many families choose a date with personal or religious significance, such as the tithi of the mother’s passing. The purohit can help you choose a suitable date within your travel window.',
      },
    ],
    related: [
      { href: '/learn-more', title: 'Significance of Bindu Sarovar', text: 'The scriptures and traditions behind Matru Gaya.' },
      { href: '/plan-your-visit', title: 'Plan your visit', text: 'Trains, roads, stay and what to confirm.' },
      { href: '/services/pind-daan-tarpan', title: 'Pind Daan & Tarpan', text: 'The offerings at the heart of every shraddha.' },
    ],
  },

  learnMore: {
    meta: {
      title: 'Significance of Bindu Sarovar & Matru Gaya, Siddhpur',
      description:
        'Why Siddhpur is revered as Matru Gaya: Bindu Sarovar in the Srimad Bhagavatam, Kapila and Devahuti, the Panch Sarovar tradition, and the Bindu Sarovar precinct today — with sources.',
    },
    breadcrumb: 'Significance of Bindu Sarovar',
    eyebrow: 'Significance',
    title: ['Why Siddhpur is', '*Matru Gaya*'],
    intro:
      'Siddhpur, in north Gujarat, is revered as **Matru Gaya** — the tirtha for shraddha offered to one’s mother. This page sets out what the scriptures say, what tradition holds and what history records, and labels each so you can tell them apart.',
    kinds: { Scripture: 'Scripture', Tradition: 'Tradition', History: 'History' },
    sections: [
      {
        id: 'matru-gaya',
        toc: 'Matru Gaya',
        title: 'Matru Gaya: the tirtha for one’s mother',
        kinds: ['Tradition'],
        paragraphs: [
          '**Just as Gaya in Bihar is the chief tirtha for shraddha for one’s father and paternal ancestors, Siddhpur is revered as the tirtha for shraddha for one’s mother.** Gujarat Tourism describes Siddhpur as having “the importance of Matru Gaya”, and the Patan district administration lists Bindu Sarovar as the Matru Tarpan place of Siddhpur.',
          'In Hindu thought, a mother’s care creates a debt (*matru rin*) that cannot be repaid in full. Offering shraddha for her at Siddhpur is regarded as the most fitting way to honour that debt.',
        ],
        list: [],
        quote: '',
        afterQuote: '',
      },
      {
        id: 'bhagavatam',
        toc: 'In the Srimad Bhagavatam',
        title: 'Bindu Sarovar in the Srimad Bhagavatam',
        kinds: ['Scripture', 'Tradition'],
        paragraphs: [
          'The third canto of the Srimad Bhagavatam (chapters 21–33) tells of Sage Kardama, his wife Devahuti and their son, Lord Kapila. It places Kardama’s hermitage on the bank of **Bindu-sarovara**, a lake on the Sarasvati, named for the drops (*bindu*) of tears the Lord shed there out of compassion ([SB 3.21.38–39](https://vedabase.io/en/library/sb/3/21/)).',
          'After Kardama renounced the world, Kapila stayed on at Bindu Sarovar “to please His mother” ([SB 3.25.5](https://vedabase.io/en/library/sb/3/25/)) and taught her the path of devotion and Sankhya. The place where Devahuti attained perfection is called *Siddhapada* ([SB 3.33.31](https://vedabase.io/en/library/sb/3/33/31/)).',
          'The Bhagavatam does not name the modern town. That this Bindu Sarovar is the sacred tank at Siddhpur is a long-standing tradition of the region.',
        ],
        list: [],
        quote: '',
        afterQuote: '',
      },
      {
        id: 'kapila',
        toc: 'Lord Kapila',
        title: 'Lord Kapila',
        kinds: ['Scripture', 'Tradition'],
        paragraphs: [
          'In the Bhagavad Gita, Krishna says, “among perfected beings I am the sage Kapila” — *siddhanam kapilo munih* ([Gita 10.26](https://vedabase.io/en/library/bg/10/26/)).',
          'The Bhagavatam relates that after teaching his mother, Kapila travelled north-east, where the ocean offered him a place to dwell (SB 3.33.34). Tradition identifies that place with Gangasagar, where the Ganga meets the sea; the Gangasagar Mela at the Kapil Muni temple is held every Makar Sankranti, around 14 January.',
        ],
        list: [],
        quote: '',
        afterQuote: '',
      },
      {
        id: 'parashurama',
        toc: 'Parashurama',
        title: 'Parashurama’s shraddha for his mother',
        kinds: ['Tradition'],
        paragraphs: [
          'Siddhpur also preserves the tradition that Parashurama performed shraddha for his mother, Renuka, at Bindu Sarovar — one more reason the tirtha is associated with rites for the mother. A Parashurama temple stands in the precinct.',
        ],
        list: [],
        quote: '',
        afterQuote: '',
      },
      {
        id: 'panch-sarovar',
        toc: 'The five sacred lakes',
        title: 'The five sacred lakes (Panch Sarovar)',
        kinds: ['Tradition'],
        paragraphs: ['Hindu tradition reveres five sacred lakes. Gujarat Tourism counts Bindu Sarovar among them:'],
        list: [
          'Mansarovar, in the Himalaya',
          'Pushkar Sarovar, Rajasthan',
          'Bindu Sarovar, Siddhpur, Gujarat',
          'Narayan Sarovar, Kutch, Gujarat',
          'Pampa Sarovar, near Hampi, Karnataka',
        ],
        quote: '',
        afterQuote: '',
      },
      {
        id: 'precinct',
        toc: 'The precinct today',
        title: 'The Bindu Sarovar precinct today',
        kinds: ['History'],
        paragraphs: [
          'According to Gujarat Tourism, the rites take place at the Kapilamuni Ashram precinct, which has three sacred kunds — **Gyan Vapika, Alpa Sarovar and Bindu Sarovar**.',
          'The state government has developed the precinct substantially, with major works from around 2012 including ritual halls, bathing facilities and seating. The [Shristhal Sangrahalay](https://en.wikipedia.org/wiki/Shristhal_Sangrahalay) museum beside the sarovar opened in 2017. In 2024 the Gujarat Pavitra Yatradham Vikas Board reported that around 47,100 families had performed Matru Shraddha here in the previous year, with space for about 200 families at a time, changing rooms, drinking water and e-rickshaws for elderly pilgrims ([Loktej](https://english.loktej.com/article/14467/siddhpur-a-historic-pilgrimage-site-for-matru-shradh-rituals)).',
        ],
        list: [],
        quote: '',
        afterQuote: '',
      },
      {
        id: 'siddhpur',
        toc: 'Siddhpur beyond the sarovar',
        title: 'Siddhpur beyond the sarovar',
        kinds: ['History'],
        paragraphs: [
          'Siddhpur stands on the Sarasvati river in Patan district. Its best-known monument is the [Rudra Mahalaya](https://en.wikipedia.org/wiki/Rudra_Mahalaya_Temple), a great Shiva temple completed in the twelfth century under the Chaulukya king Jayasimha Siddharaja. Only parts survive today; it is protected by the Archaeological Survey of India. The town is also known for the ornate havelis of its Bohra quarter.',
          'Every year from Kartik Ekadashi to Kartik Purnima, Siddhpur hosts its traditional fair, and pilgrim numbers for Matru Shraddha peak in Kartik, Bhadrapad and Chaitra.',
        ],
        list: [],
        quote: '',
        afterQuote: '',
      },
      {
        id: 'purohits',
        toc: 'The purohit tradition',
        title: 'The purohit tradition',
        kinds: ['History', 'Tradition'],
        paragraphs: [
          'Siddhpur’s tirth purohits have long kept family registers — *pothi* or *chopda* — that record the visits and lineages of the families they serve. ETV Bharat reported in 2021 that registers kept by the Audichya Sahastra Gor Mandal are centuries old and still intact.',
        ],
        list: [],
        quote:
          '*Punarapi jananam punarapi maranam, punarapi janani jathare shayanam* — “again birth, again death, again lying in a mother’s womb.”',
        afterQuote:
          'These lines from Adi Shankaracharya’s *Bhaja Govindam* reflect on the cycle of birth and death — and on the mother through whom each life begins.',
      },
    ],
    sourcesHeading: 'Sources',
    sourcesToc: 'Sources',
    sourcesIntro:
      'Scripture is quoted from the cited texts. Points marked *Tradition* reflect beliefs and local practice that are widely held but cannot be independently verified. Points marked *History* are drawn from the sources below.',
    reviewNote:
      'We have removed several claims that appeared on earlier versions of this page because we could not find reliable sources for them. If you can point us to a source, please get in touch.',
    related: [
      { href: '/matrugaya-pooja-guide', title: 'Matrugaya Pooja guide', text: 'Who can perform it, when, and how the rite proceeds.' },
      { href: '/plan-your-visit', title: 'Plan your visit', text: 'Getting to Siddhpur, stay and timing.' },
      { href: '/gallery', title: 'Gallery', text: 'Photographs from the ritual halls at Bindu Sarovar.' },
    ],
  },

  visit: {
    meta: {
      title: 'How to Reach Bindu Sarovar, Siddhpur | Visit Guide',
      description:
        'Plan your Matrugaya Pooja visit: reaching Siddhpur by train, air and road, distances from Ahmedabad and Mehsana, where to meet us, stay options and what to confirm before you travel.',
    },
    breadcrumb: 'Plan your visit',
    eyebrow: 'Plan your visit',
    title: ['Getting to', '*Bindu Sarovar*'],
    intro:
      '**Bindu Sarovar is in Siddhpur, Patan district, about 105 km north of Ahmedabad by road.** Siddhpur has its own railway station on the Ahmedabad–Delhi line, and the nearest airport is Ahmedabad. If you are coming from far away, plan to arrive the day before.',
    byRail: 'By rail',
    byAir: 'By air',
    byRoad: 'By road',
    airTitle: 'Ahmedabad (AMD)',
    airText:
      '{airport} is the nearest airport with scheduled flights — {distance} from Bindu Sarovar by road, usually via Mehsana. Allow for city traffic leaving Ahmedabad.',
    roadTitle: 'Approximate distances',
    highwayNote: 'Siddhpur is on {highway}.',
    meet: {
      eyebrow: 'Where to meet us',
      title: ['Come to our', 'home first'],
      facilities: 'The Bindu Sarovar precinct has covered ritual halls, changing rooms and drinking water.',
    },
    stay: {
      eyebrow: 'Where to stay',
      title: ['A night in', 'Siddhpur'],
      paragraphs: [
        'Siddhpur has hotels, guest houses and dharamshalas, and Mehsana and Palanpur have more choice within an hour’s drive. Rooms can be harder to find during Kartik and Pitru Paksha.',
        'We can arrange your hotel, travel and a local guide — tell us your dates and budget. These are charged separately from the rite.',
      ],
    },
    timing: {
      eyebrow: 'Timing your trip',
      title: ['Arrive the', 'day before'],
      paragraphs: [
        'The purohit will confirm your start time; the main rite takes about three to four hours. Arriving the previous evening lets you start rested and on time.',
        'Kartik, Bhadrapad and Chaitra are the busiest months, and the town is especially crowded during the fair from Kartik Ekadashi to Kartik Purnima. Book early if you plan to travel then.',
      ],
    },
    checklist: {
      eyebrow: 'Before you leave home',
      title: ['Confirm these', 'eight things'],
      intro: 'Send us a message with your plans and we will help you confirm each one.',
      cta: 'Confirm on WhatsApp',
      whatsappMessage:
        'Namaste. I am planning a visit to Siddhpur for Matrugaya Pooja and would like to confirm the arrangements.',
      items: [
        'Your ritual date and start time, confirmed by the purohit',
        'That you will call us on arrival and meet us at our home first',
        'Your quote — the rite, samagri and any additional offerings',
        'What you need to bring and wear',
        'Your stay for the night before, if travelling far',
        'Hotel, travel or a guide, if you would like us to arrange them',
        'The language you would like the rite explained in',
        'Any accessibility needs for elderly family members',
      ],
    },
    reviewNote:
      'Distances are approximate road distances to Bindu Sarovar, rounded. Train timings change — check the current timetable on NTES or IRCTC before you book.',
    related: [
      { href: '/matrugaya-pooja-guide', title: 'Matrugaya Pooja guide', text: 'What happens on the day and what to bring.' },
      { href: '/cost-and-booking', title: 'Cost & booking', text: 'What affects the price and how to book.' },
      { href: '/contact', title: 'Contact', text: 'Phone, WhatsApp, email and addresses.' },
    ],
  },

  cost: {
    meta: {
      title: 'Matrugaya Pooja Cost & Booking in Siddhpur | Matrugaya Tirth',
      description:
        'What affects the cost of Matrugaya Pooja at Siddhpur, the additional offerings families add, and how to book with the tirth purohits — with a checklist of questions to ask before you pay.',
    },
    breadcrumb: 'Cost & booking',
    eyebrow: 'Cost & booking',
    title: ['A clear quote,', '*before you travel*'],
    intro:
      '**The cost of Matrugaya Pooja depends on the rites you choose, whether we arrange the samagri, and any additional offerings.** Call or message us with your plan and we will give you a quote before you book — so there are no surprises at Siddhpur.',
    quoteCta: 'Request a quote',
    quoteMessage: 'Namaste. Please send me a quote for Matrugaya Pooja at Siddhpur.',
    priceGuide: { heading: 'Price guide', rite: 'Rite', from: 'From', includes: 'Includes' },
    factors: {
      eyebrow: 'What affects the price',
      title: ['Six things', 'that shape a quote'],
      items: [
        { title: 'The rites you choose', text: 'Matrugaya Pooja alone, or together with other shraddha such as pind daan for other ancestors, Narayan Bali or Tripindi.' },
        { title: 'Puja samagri', text: 'Bring your own samagri, or we arrange it for you and you offer dakshina accordingly.' },
        { title: 'Additional offerings', text: 'Daan and bhojan your family chooses to add — such as vastra daan or Brahmin bhojan. See the full list below.' },
        { title: 'Priests', text: 'We arrange as many priests as your rites need; you don’t have to work this out yourself.' },
        { title: 'Group size', text: 'How many family members are taking part in the rite.' },
        { title: 'Hotel, travel & guide', text: 'We arrange these on request. They are charged separately from the rite.' },
      ],
    },
    offerings: {
      eyebrow: 'Additional offerings',
      title: ['Daan & bhojan', 'you may add'],
      intro: 'Families choose these according to their tradition and wishes. Each is charged in addition to the main rite.',
    },
    ask: {
      eyebrow: 'Before you pay anything',
      title: ['Questions to', 'ask any purohit'],
      intro: 'Whoever you book with, get these answers in writing. It protects your family and makes the day calmer.',
      items: [
        'Exactly which rites are included',
        'Whether samagri is included, or what you must buy',
        'How many priests will conduct the rite',
        'Whether Brahmin bhojan and dakshina are included',
        'Whether an advance is needed, how much, and how to pay it',
        'What happens if you need to change the date',
      ],
    },
    book: {
      eyebrow: 'How to book',
      title: ['Send your plan,', 'get a quote'],
      intro: 'We reply with available dates and a quote. An advance payment confirms your booking.',
    },
    faqHeading: 'Cost questions',
    faqs: [
      {
        id: 'why-no-fixed-price',
        question: 'Why don’t you list one fixed price?',
        answer:
          'Families need different combinations of rites, samagri and offerings, so a single figure would mislead more people than it helped. Tell us your plan and we will give you a quote.',
      },
      {
        id: 'advance',
        question: 'Do we need to pay an advance?',
        answer:
          'Yes. An advance payment confirms your booking. We tell you the amount and how to pay with your quote — call or message us for details.',
      },
      {
        id: 'private',
        question: 'Is this the same as the government booking at Bindu Sarovar?',
        answer:
          'No. We are independent tirth purohits offering personal, private arrangements. We are not part of the government pilgrimage board or its booking system.',
      },
    ],
    related: [
      { href: '/matrugaya-pooja-guide', title: 'Matrugaya Pooja guide', text: 'What the rite involves and what to bring.' },
      { href: '/services', title: 'All services', text: 'Other ancestral rites and pujas.' },
      { href: '/plan-your-visit', title: 'Plan your visit', text: 'Getting to Siddhpur and where to stay.' },
    ],
  },

  servicesPage: {
    meta: {
      title: 'Shraddha Rituals & Pujas in Siddhpur | Matrugaya Tirth',
      description:
        'Ancestral rites at Bindu Sarovar, Siddhpur — Matrugaya Pooja, Pind Daan & Tarpan, Narayan Bali, Tripindi Shraddha and more — plus havan and other pujas, arranged by local tirth purohits.',
    },
    breadcrumb: 'Services',
    eyebrow: 'Services',
    title: ['Rites we conduct', '*in Siddhpur*'],
    intro:
      'Siddhpur is known above all for Matrugaya Pooja, the shraddha for one’s mother. The same purohits also conduct other ancestral rites and pujas, and can perform rites online when a family cannot travel. Prices depend on the rite and what is included — we give you a quote before you book.',
    bandTitle: 'Not sure which rite your family needs?',
    bandCta: 'Ask a purohit',
    related: [
      { href: '/matrugaya-pooja-guide', title: 'Matrugaya Pooja guide', text: 'Eligibility, the sequence of the rite and what to bring.' },
      { href: '/cost-and-booking', title: 'Cost & booking', text: 'What affects the price and how to get a quote.' },
      { href: '/plan-your-visit', title: 'Plan your visit', text: 'Getting to Siddhpur and where to stay.' },
    ],
  },

  serviceDetail: {
    confirmHeading: 'Confirm before you travel',
    askAbout: 'Ask about {name}',
    askMessage: 'Namaste. I would like to enquire about {name} at Siddhpur.',
    questionsAbout: 'Questions about {name}',
    imageCaption: 'Rites at Bindu Sarovar, Siddhpur',
    guideLink: { title: 'Matrugaya Pooja guide', text: 'The rite for one’s mother, step by step.' },
    items: {
      'pind-daan-tarpan': {
        name: 'Pind Daan & Tarpan',
        seoTitle: 'Pind Daan & Tarpan in Siddhpur, Gujarat | Matrugaya Tirth',
        metaDescription:
          'What pind daan and tarpan are, how they form the heart of Matrugaya Pooja at Bindu Sarovar, and when families perform them for other ancestors. Plan with Siddhpur tirth purohits.',
        eyebrow: 'Ancestral rites',
        title: ['Pind Daan', '& Tarpan'],
        lead: 'Pind daan is the offering of pindas — balls of cooked rice or flour mixed with sesame — to a departed family member. Tarpan is the offering of water with sesame and kusha grass. Together they are the heart of every shraddha, including Matrugaya Pooja at Siddhpur.',
        sections: [
          {
            heading: 'What the offerings mean',
            paragraphs: [
              'In Hindu tradition, shraddha is offered with faith (shraddha) to nourish and honour those who have passed on. The pinda represents food offered to the departed; tarpan, literally “satisfying”, offers water to quench their thirst. The words of the sankalp name the person for whom the offering is made, along with the family gotra.',
            ],
            list: [],
          },
          {
            heading: 'Pind daan at Siddhpur and at Gaya',
            paragraphs: [
              'Gaya in Bihar is the best-known tirtha for pind daan for one’s father and paternal ancestors. Siddhpur is revered as Matru Gaya: here, pind daan and tarpan are offered for one’s mother as part of Matrugaya Pooja at Bindu Sarovar.',
              'Searching for “Matrugaya pind daan” often returns pages about Gaya, Bihar. If your intention is shraddha for your mother, the place is Siddhpur in Gujarat.',
            ],
            list: [],
          },
          {
            heading: 'When families ask for pind daan and tarpan',
            paragraphs: ['Apart from Matrugaya Pooja, families commonly ask about these offerings for:'],
            list: [
              'Varshik shraddha — the annual rite on the tithi of a family member’s passing',
              'Pitru Paksha (Mahalaya) — the fortnight dedicated to ancestors',
              'Shraddha for other ancestors while the family is at Siddhpur',
            ],
          },
          {
            heading: 'How the rite usually proceeds',
            paragraphs: [
              'After purification and the sankalp, the purohit guides you through tarpan and then the preparation and offering of the pindas, with mantras recited in Sanskrit and each step explained. The number of pindas and the exact sequence depend on the rite and your family tradition.',
            ],
            list: [],
          },
        ],
        confirm: [
          'For whom the offering is being made, and your relationship to them',
          'Whether this is part of Matrugaya Pooja or a separate shraddha',
          'Your preferred date, and whether it should fall on a particular tithi',
          'Whether you will bring the samagri or would like us to arrange it',
        ],
        faqs: [
          {
            id: 'pinda-other-ancestors',
            question: 'Can we offer pind daan for other ancestors at Siddhpur?',
            answer:
              'Families do ask for shraddha for other ancestors while they are at Siddhpur. Tell us whom you would like to include and the purohit will advise what is appropriate in your tradition.',
          },
          {
            id: 'pinda-duration',
            question: 'How long does pind daan with tarpan take?',
            answer:
              'It depends on whether it is part of Matrugaya Pooja or a separate rite, and how many people are included. We confirm the expected time when you book.',
          },
        ],
        imageAlt: 'Families offering rice pindas on leaf plates in the covered ritual hall at Bindu Sarovar',
      },
      'narayan-bali': {
        name: 'Narayan Bali',
        seoTitle: 'Narayan Bali Shraddha in Siddhpur, Gujarat | Matrugaya Tirth',
        metaDescription:
          'Narayan Bali is traditionally performed for a family member whose death was untimely or unnatural. Learn when families enquire, how it is usually performed and what to confirm with Siddhpur purohits.',
        eyebrow: 'Ancestral rites',
        title: ['Narayan Bali', 'Shraddha'],
        lead: 'Narayan Bali is a rite traditionally performed for a family member whose death was untimely or unnatural — for example through an accident — or whose last rites could not be performed properly. Lord Vishnu (Narayan) is invoked so that the departed may find peace.',
        sections: [
          {
            heading: 'When families enquire about Narayan Bali',
            paragraphs: [
              'Families usually come to this rite on the advice of a priest or astrologer, often when a death was sudden or unusual, or when they feel the rites for a family member were incomplete. Whether it is appropriate in your case is for the purohit to advise after hearing the circumstances — please share them openly; they are kept private.',
            ],
            list: [],
          },
          {
            heading: 'How it is usually performed',
            paragraphs: [
              'In common practice, the departed is represented symbolically and the shraddha rites that may have been missed are performed for them, with worship of Lord Vishnu and offerings including pinda daan. The rite is longer than an ordinary shraddha and follows a set sequence that the purohit explains as it proceeds.',
              'Narayan Bali is widely performed at tirthas such as Trimbakeshwar. At Siddhpur, ask us how the rite is arranged, how long it takes, and whether any part spans more than one day.',
            ],
            list: [],
          },
        ],
        confirm: [
          'The circumstances of the death, so the purohit can advise whether this rite is suitable',
          'How long the rite takes at Siddhpur',
          'What the family should prepare and bring',
          'Whether it can be combined with Matrugaya Pooja on the same visit',
        ],
        faqs: [
          {
            id: 'narayan-bali-who',
            question: 'Who performs Narayan Bali?',
            answer:
              'It is usually performed by a close family member, guided by the purohit. Who should sit for the rite depends on your family and tradition — ask us before you travel.',
          },
          {
            id: 'narayan-bali-combine',
            question: 'Can Narayan Bali be done on the same trip as Matrugaya Pooja?',
            answer:
              'Families sometimes ask to combine rites on one visit. Whether that is appropriate, and how the days would be planned, is for the purohit to confirm.',
          },
        ],
        imageAlt: 'Men in white dhotis with folded hands before leaf plates of offerings in the Bindu Sarovar complex',
      },
      'tripindi-shraddha': {
        name: 'Tripindi Shraddha',
        seoTitle: 'Tripindi Shraddha in Siddhpur, Gujarat | Matrugaya Tirth',
        metaDescription:
          'Tripindi Shraddha is traditionally performed when ancestral shraddha has been missed for years. What it involves, when families ask for it and what to confirm with Siddhpur tirth purohits.',
        eyebrow: 'Ancestral rites',
        title: ['Tripindi', 'Shraddha'],
        lead: 'Tripindi Shraddha is traditionally performed when the regular shraddha for ancestors has been missed for several years, for the peace of departed family members across generations. As the name suggests, it centres on the offering of three pindas.',
        sections: [
          {
            heading: 'When families enquire about Tripindi Shraddha',
            paragraphs: [
              'Families most often ask about it when annual shraddha has not been performed for some years, or on the advice of a priest when they feel ancestral rites remain incomplete. The purohit will listen to your situation before recommending it.',
            ],
            list: [],
          },
          {
            heading: 'How it is usually performed',
            paragraphs: [
              'In common practice, the three pindas — traditionally of rice, barley and sesame — are offered with worship of Brahma, Vishnu and Shiva, together with tarpan and the associated shraddha rites. The purohit sets the exact sequence according to your family tradition.',
            ],
            list: [],
          },
        ],
        confirm: [
          'Why your family is considering the rite, so the purohit can advise',
          'The expected duration',
          'Whether you will bring the samagri or would like us to arrange it',
          'A suitable date, and whether a particular tithi is preferred',
        ],
        faqs: [
          {
            id: 'tripindi-vs-matrugaya',
            question: 'How is Tripindi Shraddha different from Matrugaya Pooja?',
            answer:
              'Matrugaya Pooja is the shraddha offered specifically for one’s mother. Tripindi Shraddha is offered for ancestors more broadly, traditionally when shraddha has been missed for some years. Families sometimes ask about both on one visit.',
          },
        ],
        imageAlt: 'Men in saffron dhotis seated in rows with plates of offerings during a shraddha at Bindu Sarovar',
      },
    },
  },

  about: {
    meta: {
      title: 'About Us: Tirth Purohits in Siddhpur | Matrugaya Tirth',
      description:
        'Who runs Matrugaya Tirth: tirth purohits based in Siddhpur who conduct Matrugaya Pooja and ancestral rites at Bindu Sarovar. How we work, the languages we explain in, and how to reach us.',
    },
    breadcrumb: 'About',
    eyebrow: 'About us',
    title: ['Tirth purohits', '*of Siddhpur*'],
    peopleEyebrow: 'Who you will speak to',
    peopleTitle: ['The purohits'],
    meetText:
      'Families meet us at our home — {address}, near Ashapuri Mata — and we go to Bindu Sarovar together. Please call before you come.',
    howEyebrow: 'How we work',
    howTitle: ['Four things', 'you can rely on'],
    principles: [
      { title: 'You speak to the purohit', text: 'Calls and WhatsApp messages are answered by the purohits who conduct the rites — not by an agent or call centre.' },
      { title: 'Every step explained', text: 'The mantras are in Sanskrit; the explanations are in Gujarati, Hindi or English, so the family understands what each offering means.' },
      { title: 'Clarity before you travel', text: 'Before you set out, you know which rites are included, what to bring and what the cost covers.' },
      { title: 'Your tradition first', text: 'Customs differ between families and communities. We ask about yours and follow it, rather than applying one fixed rule.' },
    ],
    wordsEyebrow: 'Families we have served',
    wordsTitle: ['In their', 'own words'],
    noReviews:
      'We are gathering feedback from families, with their permission, and will publish it here. If we have conducted a rite for your family, we would be grateful to hear how it went.',
    messageCta: 'Message the purohit',
    messageText: 'Namaste. I would like to speak with the purohit about a ritual at Siddhpur.',
    contactCta: 'Contact details',
    related: [
      { href: '/matrugaya-pooja-guide', title: 'Matrugaya Pooja guide', text: 'What the rite involves.' },
      { href: '/gallery', title: 'Gallery', text: 'Photographs from Bindu Sarovar.' },
      { href: '/contact', title: 'Contact', text: 'Phone, WhatsApp and email.' },
    ],
  },

  contact: {
    meta: {
      title: 'Contact the Purohits, Siddhpur | Matrugaya Tirth',
      description:
        'Call or WhatsApp +91 98795 16707 to plan Matrugaya Pooja at Bindu Sarovar, Siddhpur. Our home address in Siddhpur, where families meet us before going to Bindu Sarovar.',
    },
    breadcrumb: 'Contact',
    eyebrow: 'Contact',
    title: ['Speak to', '*a purohit*'],
    intro:
      'The quickest way to plan is WhatsApp: send the rite, your preferred dates and how many people are travelling. You will hear back from the purohits themselves.',
    channelsLabel: 'Contact channels',
    channels: {
      whatsapp: 'WhatsApp',
      whatsappNote: 'Fastest for dates and quotes',
      phone: 'Phone',
      phoneNote: 'Call anytime — please call before you visit',
      email: 'Email',
      emailNote: 'For detailed questions',
    },
    locationsTitle: 'Two addresses, explained',
    meetLabel: '1 · Meet us here first',
    ritualLabel: '2 · Where the rites take place',
    directions: 'Directions in Google Maps →',
    option1: 'Option 1 · WhatsApp',
    option1Title: 'Build your message',
    option2: 'Option 2 · Email',
    option2Title: 'Send an enquiry',
  },

  galleryPage: {
    meta: {
      title: 'Gallery: Rituals at Bindu Sarovar | Matrugaya Tirth',
      description:
        'Photographs of Matru Shraddha and pinda daan in the ritual halls and beside the tank at Bindu Sarovar, Siddhpur, plus videos about the town and the tirtha.',
    },
    breadcrumb: 'Gallery',
    eyebrow: 'Gallery',
    title: ['At Bindu Sarovar,', '*Siddhpur*'],
    intro: 'Photographs from the ritual halls and the steps of Bindu Sarovar in Siddhpur.',
    photosLabel: 'Photographs',
    videosTitle: 'Videos about Siddhpur',
    videosIntro: 'Made by independent YouTube creators — linked here because families find them helpful before visiting.',
    opensYoutube: 'Opens on YouTube.',
    related: [
      { href: '/learn-more', title: 'Significance of Bindu Sarovar', text: 'The scriptures and traditions behind the tirtha.' },
      { href: '/matrugaya-pooja-guide', title: 'Matrugaya Pooja guide', text: 'What happens during the rite.' },
      { href: '/plan-your-visit', title: 'Plan your visit', text: 'Getting to Siddhpur.' },
    ],
  },

  thankYou: {
    meta: { title: 'Thank you | Matrugaya Tirth', description: 'Your enquiry has been sent to the purohits at Matrugaya Tirth, Siddhpur.' },
    eyebrow: 'Enquiry sent',
    title: ['Thank you.', '*We will be in touch.*'],
    intro:
      'Your enquiry has reached the purohits by email. We usually reply by phone or WhatsApp. If your travel date is close, message us directly as well.',
    guideCta: 'Read the guide while you wait',
  },
};

export type Dictionary = typeof en;
