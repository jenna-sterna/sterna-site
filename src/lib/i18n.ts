export type Lang = "en" | "pt";
export const locales: Lang[] = ["en", "pt"];

export function getLangFromUrl(url: URL): Lang {
  return url.pathname.startsWith("/pt/") || url.pathname === "/pt"
    ? "pt"
    : "en";
}

export function localizedPath(path: string, lang: Lang): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (lang === "en") return clean;
  if (clean === "/") return "/pt/";
  return `/pt${clean}`;
}

// Given the current URL, produce the URL for the same page in the other lang
export function swapLangUrl(currentPath: string, targetLang: Lang): string {
  const withoutPt = currentPath.replace(/^\/pt(\/|$)/, "/");
  const clean = withoutPt.endsWith("/") ? withoutPt : withoutPt + "/";
  return localizedPath(clean, targetLang);
}

/* =========================================================
   Translations
   PT translations are AI-drafted and should be QA'd by
   Sandra or Carlos before launch. Any that need review are
   marked with the // TODO:pt-qa comment.
   ========================================================= */

export const dict = {
  en: {
    meta: {
      titleSuffix: "Sterna Aveiro Experiences",
      defaultTitle: "Aveiro, uncovered. With local friends.",
      defaultDescription:
        "Personalised experiences in and around Aveiro, Portugal. Salt pans, boat rides, wineries, porcelain, long Portuguese lunches. Small groups. Licensed. 300+ five-star reviews.",
    },
    nav: {
      home: "Home",
      experiences: "Experiences",
      about: "About",
      faq: "FAQ",
      contact: "Contact",
      plan: "Plan your trip",
      whatsapp: "WhatsApp",
      langLabel: "PT",
      langAriaLabel: "Switch to Portuguese",
    },
    hero: {
      eyebrow: "Aveiro · Portugal",
      line1: "Aveiro,",
      line2: "uncovered.",
      line3: "With local friends.",
      lead:
        "We're Jenna, Carlos & Sandra. Three friends from Aveiro building personalised days around your passions. Salt pans, sparkling wine caves, sunset boat rides, long lunches with our mothers. The bits most day-trippers miss.",
      ctaPrimary: "See the experiences",
      ctaSecondary: "WhatsApp us",
      trustPrefix: "",
      trustNumber: "300+",
      trustSuffix: "five-star reviews on TripAdvisor & Google",
      scroll: "scroll",
    },
    intro: {
      caption: "A note from the three of us",
      body:
        "Aveiro isn't just a place to visit. It's a place to experience. Come spend a day, a week, or a season uncovering colourful streets, sailing picturesque waterways, immersing yourself in local cuisine and wines. Solo, as a couple, with friends. The city has a way of making every visit feel uniquely yours. We're licensed, insured, and take care of every detail so all you have to do is show up.",
      sig: "Jenna, Carlos & Sandra",
    },
    featured: {
      number: "01",
      eyebrow: "Our biggest one",
      hookLine1: "Walk the salt pans",
      hookLine2: "with the oldest marnoto.",
      copyLead:
        "Seventy-three years old. Fifty-eight salt-flat seasons. He'll show you the last working salt pans of Aveiro (his own), and answer any question you throw at him. Then we sit down for a long Portuguese lunch.",
      pullQuote:
        "Some operators explain the salt pans. We take you to the man who owns them.",
      annotation: "← that's Senhor Álvaro, still working at 73",
      cta: "Read the full experience",
    },
    duo: {
      eyebrow: "Two more classics",
      w1Kicker: "02 · Food & wine",
      w2Kicker: "03 · Food & wine",
    },
    listExp: {
      eyebrow: "Three more days worth planning",
      leadPrefix: "Bussaco, Vista Alegre, sunset on the boat.",
      leadEmph: "Each one a full day in itself.",
      ctaAll: "See all nine experiences",
    },
    whyList: {
      eyebrow: "What most tourists miss",
      h2:
        "Aveiro isn't a day trip.",
      body:
        "Most people come by bus, do a 45-minute moliceiro ride, grab lunch on the canal, and leave. There's so much more within a 30-minute drive: a working marnoto's salt pan, a century-old sparkling wine cave, a palace in the forest, the region's best charcoal chicken.",
      ask: "Ask us what to skip.",
    },
    proof: {
      h2Line1: "Not our word.",
      h2Line2: "Theirs, on TripAdvisor.",
      lead:
        "Between the three of us, we've hosted over 300 travellers who left five-star reviews on TripAdvisor and Google. We're not going to fake reviews here. Read the real ones directly.",
      cta: "Read the reviews on TripAdvisor →",
    },
    founders: {
      eyebrow: "Meet the three of us",
      h2Line1: "A friendship,",
      h2Line2: "a Camino, a home.",
      body:
        "Jenna met Carlos on her 40th-birthday Camino. She loved Aveiro so much she moved here in 2025. Sandra, an Aveiro tourism veteran with 300+ reviews, is married to one of Carlos's oldest friends. That's the whole team.",
      ctaMore: "Read the full story",
    },
    cta: {
      eyebrow: "Ready when you are",
      h2: "Drop us a note and let's start planning.",
      lead:
        "Tell us who's coming, when you're here, and what you love. We come back with ideas, usually within a day.",
      obrigado: "Obrigado!",
      whatsapp: "WhatsApp",
      email: "Email us",
    },
    footer: {
      tagline: "Aveiro, uncovered. With friends who live it.",
      chip1: "Licensed & insured",
      chip2: "300+ five-star reviews",
      chip3: "Small groups · max 8",
      colExplore: "Explore",
      colExperiences: "Experiences",
      colContact: "Say olá",
      rightsPrefix: "©",
      rightsSuffix: "Based in Aveiro, Portugal.",
      obrigado: "Obrigado · Thank you",
    },
    xpPage: {
      eyebrow: "Our experiences",
      h1Line1: "Nine ways to",
      h1Line2: "experience Aveiro.",
      lead:
        "Start with one of the six we consider genuinely can't-miss, or combine several across a day or a week. Prefer something entirely custom? Say the word and we'll design it.",
      coreEyebrow: "Six core experiences",
      coreH2: "Start here.",
      moreEyebrow: "Also worth doing",
      moreH2: "Add to any day.",
      moreLead:
        "Wellness, Costa Nova's striped houses, Praia de Mira's charcoal-grill legends. Perfect for a longer stay, or paired with any core experience.",
      customEyebrow: "Or something entirely custom",
      customH2:
        "Picnics. Waterfalls. Restaurant buy-outs. Beach yoga. Chef meet-and-greets. The lot.",
      customLead:
        "Sky's the limit. April/May and September/October are usually ideal. Good weather, small crowds. Message us to start designing something built for you.",
    },
    xpDetail: {
      backLink: "← All experiences",
      sideDuration: "How long",
      sideGroup: "Group size",
      sideGroupText: "Up to 8 people. Message us for larger groups.",
      sideLanguages: "Languages",
      sideLanguagesText: "English, Portuguese, Spanish",
      sidePrice: "Price",
      ctaQuote: "WhatsApp for a quote",
      ctaEmail: "Email us",
      included: "What's included",
      addOns: "Optional add-ons",
      noteHand: "A little note from us",
      noteBody:
        "Every experience is fully customisable. Tell us who's coming, when, and what you love, and we'll come back with a plan built for you. We take care of transport, translations, reservations, and every fiddly detail so all you have to do is show up.",
      noteSig: "Jenna, Carlos & Sandra",
      galleryEyebrow: "From this experience",
      galleryH2: "A few glimpses.",
      relatedEyebrow: "You might also love",
      relatedH2: "Related experiences.",
    },
    about: {
      eyebrow: "About us",
      h1Line1: "A friendship, a Camino,",
      h1Line2: "and a shared home.",
      lead:
        "We're Jenna, Carlos & Sandra. The three of us built Sterna Aveiro Experiences to show curious travellers the Aveiro we live in. The one beyond the moliceiro ride.",
      storyH2: "How we met",
      storyPara1:
        "Jenna met Carlos for her 40th birthday, walking the Camino de Santiago. She fell in love with Portugal, especially Carlos and his Aveiro. Enough that she moved here in 2025.",
      storyPara2:
        "Carlos was born and raised in Aveiro. Fifty-two years of it. When he isn't guiding on the Camino, he's showing people around his hometown, from hidden salt pans to his mother Ivone's Portuguese kitchen.",
      storyPara3:
        "Sandra's roots are in the town just north of Aveiro. She's spent decades in tourism: walking experiences, food experiences, salt-flat boat experiences. She's married to one of Carlos's oldest childhood friends. She has over 300 five-star reviews across TripAdvisor and Google to prove her craft.",
      storyPara4:
        "When we aren't working, we're doing what everyone here does: boating, cooking, playing tennis, exploring another corner of Portugal.",
      storySig: "Jenna, Carlos & Sandra",
      meetH2: "Your local friends.",
      whyEyebrow: "Why Aveiro",
      whyH2Line1: "The Venice of Portugal,",
      whyH2Line2: "and so much more.",
      whyLead:
        "Aveiro is unique. The canals, the salt pans, the Atlantic just beyond. Easy train access to Porto and Lisbon means it's a natural addition to any Portugal itinerary.",
      whyBody:
        "People hear about it as a day-trip. We think that's a shame. The magic unfolds day after day. The city keeps topping lists for expats, for good reason.",
    },
    faq: {
      eyebrow: "Frequently asked",
      h1Line1: "Answers to the",
      h1Line2: "usual questions.",
      lead:
        "Still stuck? Drop us a WhatsApp or email. We normally respond within a day.",
      stillCurious: "Still curious?",
      whatsappCta: "WhatsApp us",
      emailCta: "Email us",
    },
    contact: {
      eyebrow: "Let's plan your trip",
      h1Line1: "Tell us about",
      h1Line2: "your Aveiro.",
      lead:
        "Drop us a message and we'll come back within a day with ideas. WhatsApp is fastest. Email works great too.",
      whatsappLabel: "WhatsApp",
      whatsappHint: "Fastest way to reach us. Text or voice note.",
      emailLabel: "Email",
      emailHint: "Perfect for longer requests or attachments.",
      instaLabel: "Instagram",
      instaHint: "Follow along for daily glimpses of Aveiro.",
      taLabel: "TripAdvisor",
      taValue: "300+ five-star reviews",
      taHint: "Read what past guests are saying.",
      basedLabel: "Based in",
      basedValue: "Aveiro, Portugal",
      basedHint: "We handle pickup & drop-off from anywhere in the city.",
      fName: "Your name",
      fEmail: "Email",
      fDates: "Dates in Aveiro",
      fDatesPh: "e.g. May 10–14",
      fPeople: "Number of people",
      fPeoplePh: "2",
      fInterests: "Experiences you're interested in",
      fNotes: "Tell us more. What do you love? Anything to avoid?",
      fNotesPh:
        "Any dietary needs, mobility notes, preferred pace, celebrations, etc.",
      fSubmit: "Send enquiry",
      fNoteA: "This opens your email app pre-filled, or copy the details and",
      fNoteB: "send them on WhatsApp",
      fNoteC: ".",
      interestSomethingCustom: "Something custom",
    },
    faqs: [
      {
        q: "How long do you recommend visiting Aveiro?",
        a: "Anywhere from a couple of hours to a few weeks. Many people come and never leave. If you're passing through, we can craft three to four packed but restful days for you.",
      },
      {
        q: "What's the best time of year to come?",
        a: "Most experiences run year-round. Summer is our busiest. Spring (April/May) and fall (September/October) are ideal for climate and small crowds.",
      },
      {
        q: "What is your cancellation policy?",
        a: "Full refund or credit if you cancel up to 72 hours before your experience begins. Full refund/credit if we cancel due to weather or unforeseen circumstances. No-shows are charged the full price. Contact us to cancel or ask about options.",
      },
      {
        q: "What languages are your experiences in?",
        a: "English, Portuguese, and Spanish.",
      },
      {
        q: "Do you offer travel insurance?",
        a: "No, but we recommend arranging your own travel insurance depending on your needs.",
      },
      {
        q: "Can you coordinate transport from Porto or Lisbon?",
        a: "We recommend the train. Easy, safe, and fast. We can guide you on schedules and meet you at Aveiro station on foot or with a car/van.",
      },
      {
        q: "What's the relation to Sterna Aveiro Ria Tours & Birdwatching?",
        a: "Same team, same 300+ five-star reviews. In 2026 we rebranded as Sterna Aveiro Experiences and expanded what we offer beyond the water.",
      },
      {
        q: "What's the largest group you can handle?",
        a: "Eight people is our max on a standard experience. For larger groups, message us. We can arrange it with notice. Minimum size depends on the experience.",
      },
      {
        q: "What if my question isn't answered here?",
        a: "Drop us a WhatsApp message or email. Obrigado!",
      },
    ],
  },

  // ==================== PORTUGUESE ====================
  // TODO:pt-qa — machine-drafted PT copy for Sandra/Carlos to review
  pt: {
    meta: {
      titleSuffix: "Sterna Aveiro Experiences",
      defaultTitle: "Aveiro, descoberto. Com amigos locais.",
      defaultDescription:
        "Experiências personalizadas em Aveiro e arredores. Marinhas de sal, passeios de barco, adegas, porcelana, longos almoços portugueses. Grupos pequenos. Licenciados. Mais de 300 avaliações cinco estrelas.",
    },
    nav: {
      home: "Início",
      experiences: "Experiências",
      about: "Sobre nós",
      faq: "Perguntas",
      contact: "Contacto",
      plan: "Planear viagem",
      whatsapp: "WhatsApp",
      langLabel: "EN",
      langAriaLabel: "Switch to English",
    },
    hero: {
      eyebrow: "Aveiro · Portugal",
      line1: "Aveiro,",
      line2: "descoberto.",
      line3: "Com amigos locais.",
      lead:
        "Somos a Jenna, o Carlos e a Sandra. Três amigos de Aveiro a criar dias personalizados à volta das suas paixões. Marinhas de sal, caves de espumante, passeios de barco ao pôr-do-sol, longos almoços em casa das nossas mães. As partes que a maioria dos autocarros turísticos deixa de fora.",
      ctaPrimary: "Ver as experiências",
      ctaSecondary: "Envie-nos WhatsApp",
      trustPrefix: "",
      trustNumber: "300+",
      trustSuffix: "avaliações cinco estrelas no TripAdvisor e Google",
      scroll: "descer",
    },
    intro: {
      caption: "Uma nota dos três",
      body:
        "Aveiro não é apenas um sítio para visitar. É um sítio para viver. Venha passar um dia, uma semana ou uma estação a descobrir ruas coloridas, cursos de água pitorescos, cozinha e vinhos locais. Sozinho, em casal, com amigos. A cidade tem o dom de fazer cada visita sentir-se única. Somos licenciados, seguros, e tratamos de todos os detalhes para que só tenha de aparecer.",
      sig: "Jenna, Carlos & Sandra",
    },
    featured: {
      number: "01",
      eyebrow: "A nossa mais especial",
      hookLine1: "Caminhe pelas marinhas de sal",
      hookLine2: "com o marnoto mais velho.",
      copyLead:
        "Setenta e três anos. Cinquenta e oito épocas de safra. Ele leva-o pelas últimas marinhas de sal em atividade em Aveiro (as suas), e responde a todas as suas perguntas. Depois sentamo-nos para um longo almoço português.",
      pullQuote:
        "Alguns operadores explicam as marinhas. Nós apresentamos-lhe o homem que as trabalha.",
      annotation: "← o Senhor Álvaro, ainda a trabalhar aos 73",
      cta: "Ver a experiência completa",
    },
    duo: {
      eyebrow: "Mais dois clássicos",
      w1Kicker: "02 · Comida & vinho",
      w2Kicker: "03 · Comida & vinho",
    },
    listExp: {
      eyebrow: "Mais três dias para planear",
      leadPrefix: "Bussaco, Vista Alegre, pôr-do-sol de barco.",
      leadEmph: "Cada um é um dia inteiro por si só.",
      ctaAll: "Ver as nove experiências",
    },
    whyList: {
      eyebrow: "O que a maioria dos turistas perde",
      h2:
        "Aveiro não é uma visita de um dia.",
      body:
        "A maioria vem de autocarro, faz um passeio de moliceiro de 45 minutos, almoça no canal e vai-se embora. Há tanto mais a menos de 30 minutos de carro: as marinhas de sal em atividade, uma cave de espumante centenária, um palácio na floresta, o melhor frango no carvão da região.",
      ask: "Pergunte-nos o que saltar.",
    },
    proof: {
      h2Line1: "Não é palavra nossa.",
      h2Line2: "É dos nossos hóspedes, no TripAdvisor.",
      lead:
        "Entre os três recebemos mais de 300 viajantes que deixaram avaliações cinco estrelas no TripAdvisor e Google. Não vamos inventar avaliações aqui. Leia as verdadeiras diretamente.",
      cta: "Ler as avaliações no TripAdvisor →",
    },
    founders: {
      eyebrow: "Conheça os três",
      h2Line1: "Uma amizade,",
      h2Line2: "um Caminho, uma casa.",
      body:
        "A Jenna conheceu o Carlos no Caminho de Santiago, no seu 40º aniversário. Adorou tanto Aveiro que se mudou para cá em 2025. A Sandra, veterana do turismo de Aveiro com mais de 300 avaliações, é casada com um dos amigos mais antigos do Carlos. É esta a equipa.",
      ctaMore: "Ler a história completa",
    },
    cta: {
      eyebrow: "Quando estiver pronto",
      h2: "Envie-nos uma mensagem e começamos a planear.",
      lead:
        "Diga-nos quem vem, quando estará cá, e o que gosta. Voltamos com ideias, normalmente no mesmo dia.",
      obrigado: "Obrigado!",
      whatsapp: "WhatsApp",
      email: "Enviar email",
    },
    footer: {
      tagline: "Aveiro, descoberto. Com amigos que aqui vivem.",
      chip1: "Licenciados & seguros",
      chip2: "300+ avaliações cinco estrelas",
      chip3: "Grupos pequenos · máx. 8",
      colExplore: "Explorar",
      colExperiences: "Experiências",
      colContact: "Diga olá",
      rightsPrefix: "©",
      rightsSuffix: "Sediados em Aveiro, Portugal.",
      obrigado: "Obrigado · Thank you",
    },
    xpPage: {
      eyebrow: "As nossas experiências",
      h1Line1: "Nove formas de",
      h1Line2: "viver Aveiro.",
      lead:
        "Comece por uma das seis que consideramos imperdíveis, ou combine várias ao longo de um dia ou de uma semana. Prefere algo totalmente à medida? Diga a palavra e desenhamos.",
      coreEyebrow: "Seis experiências principais",
      coreH2: "Comece aqui.",
      moreEyebrow: "Também vale a pena",
      moreH2: "Junte a qualquer dia.",
      moreLead:
        "Bem-estar, as casas às riscas da Costa Nova, o lendário frango no carvão da Praia de Mira. Perfeitas para uma estadia mais longa, ou para juntar a qualquer experiência principal.",
      customEyebrow: "Ou algo totalmente à medida",
      customH2:
        "Piqueniques. Cachoeiras. Reservas de restaurante em exclusivo. Ioga na praia. Encontros com chefs. Tudo.",
      customLead:
        "O céu é o limite. Abril/Maio e Setembro/Outubro são normalmente ideais. Bom tempo, menos multidão. Envie mensagem para começarmos a desenhar algo feito à sua medida.",
    },
    xpDetail: {
      backLink: "← Todas as experiências",
      sideDuration: "Duração",
      sideGroup: "Tamanho do grupo",
      sideGroupText: "Até 8 pessoas. Contacte-nos para grupos maiores.",
      sideLanguages: "Idiomas",
      sideLanguagesText: "Inglês, Português, Espanhol",
      sidePrice: "Preço",
      ctaQuote: "WhatsApp para orçamento",
      ctaEmail: "Enviar email",
      included: "O que está incluído",
      addOns: "Extras opcionais",
      noteHand: "Uma nota nossa",
      noteBody:
        "Cada experiência é totalmente personalizável. Diga-nos quem vem, quando, e o que gosta, e voltamos com um plano feito para si. Tratamos do transporte, traduções, reservas e todos os pequenos detalhes para que só tenha de aparecer.",
      noteSig: "Jenna, Carlos & Sandra",
      galleryEyebrow: "Desta experiência",
      galleryH2: "Alguns momentos.",
      relatedEyebrow: "Talvez também goste",
      relatedH2: "Experiências relacionadas.",
    },
    about: {
      eyebrow: "Sobre nós",
      h1Line1: "Uma amizade, um Caminho,",
      h1Line2: "e uma casa partilhada.",
      lead:
        "Somos a Jenna, o Carlos e a Sandra. Os três construímos a Sterna Aveiro Experiences para mostrar aos viajantes curiosos a Aveiro em que vivemos. Aquela para lá do passeio de moliceiro.",
      storyH2: "Como nos conhecemos",
      storyPara1:
        "A Jenna conheceu o Carlos no seu 40º aniversário, a fazer o Caminho de Santiago. Apaixonou-se por Portugal, especialmente pelo Carlos e a sua Aveiro. O suficiente para se mudar para cá em 2025.",
      storyPara2:
        "O Carlos nasceu e cresceu em Aveiro. Cinquenta e dois anos. Quando não está a guiar no Caminho, está a mostrar a sua cidade a outros, das marinhas de sal escondidas à cozinha portuguesa da sua mãe Ivone.",
      storyPara3:
        "A Sandra tem raízes na terra logo a norte de Aveiro. Passou décadas no turismo: visitas a pé, experiências gastronómicas, passeios de barco pelas marinhas. É casada com um dos amigos mais antigos do Carlos. Tem mais de 300 avaliações cinco estrelas no TripAdvisor e Google para provar a sua arte.",
      storyPara4:
        "Quando não estamos a trabalhar, fazemos o que toda a gente aqui faz: barco, cozinhar, jogar ténis, explorar mais um canto de Portugal.",
      storySig: "Jenna, Carlos & Sandra",
      meetH2: "Os seus amigos locais.",
      whyEyebrow: "Porquê Aveiro",
      whyH2Line1: "A Veneza de Portugal,",
      whyH2Line2: "e muito mais.",
      whyLead:
        "Aveiro é única. Os canais, as marinhas de sal, o Atlântico logo ali. Acesso fácil de comboio a Porto e Lisboa faz dela uma adição natural a qualquer itinerário.",
      whyBody:
        "As pessoas ouvem falar dela como visita de um dia. Achamos uma pena. A magia revela-se dia após dia. A cidade continua a liderar as listas para expatriados, com razão.",
    },
    faq: {
      eyebrow: "Perguntas frequentes",
      h1Line1: "Respostas às",
      h1Line2: "perguntas habituais.",
      lead:
        "Ainda com dúvidas? Envie um WhatsApp ou email. Normalmente respondemos no mesmo dia.",
      stillCurious: "Ainda com curiosidade?",
      whatsappCta: "WhatsApp",
      emailCta: "Enviar email",
    },
    contact: {
      eyebrow: "Vamos planear a sua viagem",
      h1Line1: "Conte-nos sobre a",
      h1Line2: "sua Aveiro.",
      lead:
        "Envie-nos uma mensagem e voltamos no mesmo dia com ideias. O WhatsApp é o mais rápido. O email também funciona bem.",
      whatsappLabel: "WhatsApp",
      whatsappHint: "A forma mais rápida. Texto ou mensagem de voz.",
      emailLabel: "Email",
      emailHint: "Ideal para pedidos mais longos ou anexos.",
      instaLabel: "Instagram",
      instaHint: "Siga-nos para vistas diárias de Aveiro.",
      taLabel: "TripAdvisor",
      taValue: "300+ avaliações cinco estrelas",
      taHint: "Leia o que os hóspedes anteriores dizem.",
      basedLabel: "Sediados em",
      basedValue: "Aveiro, Portugal",
      basedHint: "Fazemos recolha e entrega em qualquer ponto da cidade.",
      fName: "O seu nome",
      fEmail: "Email",
      fDates: "Datas em Aveiro",
      fDatesPh: "ex. 10–14 de Maio",
      fPeople: "Número de pessoas",
      fPeoplePh: "2",
      fInterests: "Experiências que lhe interessam",
      fNotes: "Conte-nos mais. O que adora? Algo a evitar?",
      fNotesPh:
        "Restrições alimentares, notas de mobilidade, ritmo preferido, celebrações, etc.",
      fSubmit: "Enviar pedido",
      fNoteA:
        "Isto abre a sua aplicação de email pré-preenchida, ou copie os detalhes e",
      fNoteB: "envie por WhatsApp",
      fNoteC: ".",
      interestSomethingCustom: "Algo à medida",
    },
    faqs: [
      {
        q: "Quanto tempo recomendam para visitar Aveiro?",
        a: "De algumas horas a algumas semanas. Muita gente vem e não se vai embora. Se está de passagem, podemos criar três a quatro dias intensos mas descansados para si.",
      },
      {
        q: "Qual é a melhor altura do ano para vir?",
        a: "A maioria das experiências funciona todo o ano. O verão é a nossa altura mais movimentada. A primavera (Abril/Maio) e o outono (Setembro/Outubro) são ideais pelo clima e menos multidão.",
      },
      {
        q: "Qual é a vossa política de cancelamento?",
        a: "Reembolso total ou crédito se cancelar até 72 horas antes do início da experiência. Reembolso total/crédito se cancelarmos por condições meteorológicas ou circunstâncias imprevistas. Em caso de não comparência, é cobrado o valor total. Contacte-nos para cancelar ou saber mais.",
      },
      {
        q: "Em que idiomas são as experiências?",
        a: "Inglês, Português e Espanhol.",
      },
      {
        q: "Oferecem seguro de viagem?",
        a: "Não, mas recomendamos que trate do seu próprio seguro de viagem conforme as suas necessidades.",
      },
      {
        q: "Podem coordenar transporte a partir do Porto ou Lisboa?",
        a: "Recomendamos o comboio. Fácil, seguro e rápido. Podemos orientá-lo nos horários e encontrar-nos na estação de Aveiro, a pé ou de carro/carrinha.",
      },
      {
        q: "Qual é a relação com a Sterna Aveiro Ria Tours & Birdwatching?",
        a: "Mesma equipa, as mesmas 300+ avaliações cinco estrelas. Em 2026 mudámos o nome para Sterna Aveiro Experiences e expandimos o que oferecemos para além da água.",
      },
      {
        q: "Qual é o maior grupo que aceitam?",
        a: "Oito pessoas é o máximo numa experiência padrão. Para grupos maiores, contacte-nos. Conseguimos organizar com alguma antecedência. O mínimo depende da experiência.",
      },
      {
        q: "E se a minha pergunta não estiver aqui?",
        a: "Envie-nos um WhatsApp ou email. Obrigado!",
      },
    ],
  },
} as const;

export type Dict = typeof dict.en;

export function getT(lang: Lang): Dict {
  return dict[lang] as unknown as Dict;
}
