#!/usr/bin/env node
/**
 * Sanity migration script.
 *
 * Seeds the Sterna Aveiro Sanity project (jghpyuue / production) with every
 * document the site needs: 9 experiences, 3 founders, 9 FAQs, 10 reviews,
 * plus all singleton page documents (homepage, about, faq, contact, etc.),
 * the company info and trust badges.
 *
 * The seed data is embedded below so this script has no dependencies on the
 * old markdown/YAML files (they've been removed as part of the migration).
 *
 * Images referenced by relative paths under `public/uploads/…` are uploaded
 * to Sanity's asset library, and the returned asset references are attached
 * to the documents.
 *
 * Idempotent — safe to re-run. Each document is upserted by a stable _id so
 * a second run updates rather than duplicates.
 *
 * ── How to run ────────────────────────────────────────────────────────────
 * 1. Go to https://sanity.io/manage/project/jghpyuue/api → API tokens.
 * 2. Click "Add API token". Name: "migration script". Permissions: Editor.
 * 3. Copy the token (starts with `sk...`). Never commit it.
 * 4. From the repo root, run:
 *
 *      SANITY_WRITE_TOKEN=sk... node scripts/migrate-to-sanity.mjs
 *
 * ─────────────────────────────────────────────────────────────────────────
 */

import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.join(REPO_ROOT, "public");

const PROJECT_ID = "jghpyuue";
const DATASET = "production";
const TOKEN = process.env.SANITY_WRITE_TOKEN;

if (!TOKEN) {
  console.error("");
  console.error("✗ SANITY_WRITE_TOKEN is not set.");
  console.error("");
  console.error("  How to get one:");
  console.error("    1. Open https://sanity.io/manage/project/jghpyuue/api");
  console.error("    2. Click 'Add API token' — Name: migration script, Permissions: Editor");
  console.error("    3. Copy the token (starts with 'sk...')");
  console.error("");
  console.error("  Then re-run:");
  console.error("    SANITY_WRITE_TOKEN=sk... node scripts/migrate-to-sanity.mjs");
  console.error("");
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2024-01-01",
  token: TOKEN,
  useCdn: false,
});

/* ────────────────────────────────────────────────────────────────────────
   Asset upload — image cache so we upload each file at most once.
   ──────────────────────────────────────────────────────────────────────── */
const imageCache = new Map(); // localPath -> asset._id
async function uploadImage(publicPath) {
  if (!publicPath) return undefined;
  if (typeof publicPath !== "string") return undefined;
  // Strip leading slash. Everything lives under /public.
  const rel = publicPath.replace(/^\/+/, "");
  const abs = path.join(PUBLIC_DIR, rel);
  if (imageCache.has(abs)) {
    return { _type: "image", asset: { _type: "reference", _ref: imageCache.get(abs) } };
  }
  if (!fs.existsSync(abs)) {
    console.warn(`  · missing image, skipping: ${publicPath}`);
    return undefined;
  }
  const buf = fs.readFileSync(abs);
  const filename = path.basename(abs);
  process.stdout.write(`  · uploading ${filename} … `);
  const asset = await client.assets.upload("image", buf, { filename });
  process.stdout.write(`ok\n`);
  imageCache.set(abs, asset._id);
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

async function uploadImages(paths) {
  if (!Array.isArray(paths)) return undefined;
  const out = [];
  for (const p of paths) {
    const img = await uploadImage(p);
    if (img) out.push({ ...img, _key: img.asset._ref.slice(-12) });
  }
  return out.length ? out : undefined;
}

async function upsert(doc) {
  await client.createOrReplace(doc);
  console.log(`  ✓ ${doc._type} / ${doc._id}`);
}

/* ────────────────────────────────────────────────────────────────────────
   SEED DATA (verbatim from the pre-migration content files).
   ──────────────────────────────────────────────────────────────────────── */

const COMPANY = {
  _id: "company",
  _type: "company",
  name: "Sterna Aveiro Experiences",
  shortName: "Sterna",
  phone: "+1 650 847 8614",
  phoneHref: "tel:+16508478614",
  whatsapp: "+1 650 847 8614",
  whatsappHref: "https://wa.me/16508478614",
  email: "info@sterna.pt",
  emailHref: "mailto:info@sterna.pt",
  instagramHandle: "@sternaaveirotours",
  instagramUrl: "https://instagram.com/sternaaveirotours",
  tripadvisorUrl:
    "https://www.tripadvisor.com/Attraction_Review-g189140-d12435080-Reviews-Sterna_Aveiro_Ria_Tours_Birdwatching-Aveiro_Aveiro_District_Northern_Portugal.html",
  reviewCount: "300+",
  established: 2010,
  addressCity: "Aveiro",
  addressRegion: "Centro",
  addressCountry: "Portugal",
  maxGroupSize: 8,
};

const TRUST = {
  _id: "trust",
  _type: "trust",
  badges: [
    { _key: "b1", en: "Licensed & insured", pt: "Licenciados & seguros" },
    { _key: "b2", en: "300+ five-star reviews", pt: "300+ avaliações cinco estrelas" },
    { _key: "b3", en: "Small groups (max 8)", pt: "Grupos pequenos (máx. 8)" },
    { _key: "b4", en: "EN · PT · ES", pt: "EN · PT · ES" },
  ],
};

const FOUNDERS = [
  {
    _id: "founder-jenna",
    _type: "founder",
    order: 1,
    slug: { _type: "slug", current: "jenna" },
    nameEn: "Jenna",
    namePt: "Jenna",
    roleEn: "Concierge & Guide",
    rolePt: "Concierge & Guia",
    originEn: "USA → Aveiro, 2025",
    originPt: "EUA → Aveiro, 2025",
    lineEn: "Met Carlos on the Camino for her 40th birthday. Fell in love with Portugal, and Aveiro in particular. Moved here in 2025 to live the life she kept dreaming about.",
    linePt: "Conheceu o Carlos no Caminho, no seu 40º aniversário. Apaixonou-se por Portugal, e por Aveiro em particular. Mudou-se para cá em 2025 para viver a vida que sempre sonhou.",
    _photoPath: "/uploads/team/jenna.jpg",
  },
  {
    _id: "founder-carlos",
    _type: "founder",
    order: 2,
    slug: { _type: "slug", current: "carlos" },
    nameEn: "Carlos",
    namePt: "Carlos",
    roleEn: "Local Historian & Cook",
    rolePt: "Historiador Local & Cozinheiro",
    originEn: "Aveiro, born & raised · 52 years",
    originPt: "Aveiro, nascido e criado · 52 anos",
    lineEn: "Aveiro is his hometown. When he isn't guiding on the Camino de Santiago, he's showing friends around his city, from hidden salt pans to his mom's kitchen.",
    linePt: "Aveiro é a sua terra. Quando não está a guiar no Caminho de Santiago, está a mostrar a sua cidade a amigos, das marinhas de sal escondidas à cozinha da mãe.",
    _photoPath: "/uploads/team/carlos.jpg",
  },
  {
    _id: "founder-sandra",
    _type: "founder",
    order: 3,
    slug: { _type: "slug", current: "sandra" },
    nameEn: "Sandra",
    namePt: "Sandra",
    roleEn: "Master Guide, 300+ ⭐⭐⭐⭐⭐",
    rolePt: "Guia Sénior, 300+ ⭐⭐⭐⭐⭐",
    originEn: "Aveiro region, decades in tourism",
    originPt: "Região de Aveiro, décadas no turismo",
    lineEn: "Grew up just north of Aveiro. Two decades of walking, food, and boat experiences. Married to one of Carlos's oldest childhood friends. Connects history to curious people, on land and on water.",
    linePt: "Cresceu a norte de Aveiro. Duas décadas de passeios a pé, experiências gastronómicas e passeios de barco. Casada com um dos amigos de infância mais antigos do Carlos. Liga a história a pessoas curiosas, em terra e na água.",
    _photoPath: "/uploads/team/sandra.jpg",
  },
];

const FAQS = [
  { order: 1, id: "how-long", questionEn: "How long do you recommend visiting Aveiro?", questionPt: "Quanto tempo recomendam para visitar Aveiro?", answerEn: "Anywhere from a couple of hours to a few weeks. Many people come and never leave. If you're passing through, we can craft three to four packed but restful days for you.", answerPt: "De algumas horas a algumas semanas. Muita gente vem e não se vai embora. Se está de passagem, podemos criar três a quatro dias intensos mas descansados para si." },
  { order: 2, id: "best-time", questionEn: "What's the best time of year to come?", questionPt: "Qual é a melhor altura do ano para vir?", answerEn: "Most experiences run year-round. Summer is our busiest. Spring (April/May) and fall (September/October) are ideal for climate and small crowds.", answerPt: "A maioria das experiências funciona todo o ano. O verão é a nossa altura mais movimentada. A primavera (Abril/Maio) e o outono (Setembro/Outubro) são ideais pelo clima e menos multidão." },
  { order: 3, id: "cancellation", questionEn: "What is your cancellation policy?", questionPt: "Qual é a vossa política de cancelamento?", answerEn: "Full refund or credit if you cancel up to 72 hours before your experience begins. Full refund/credit if we cancel due to weather or unforeseen circumstances. No-shows are charged the full price. Contact us to cancel or ask about options.", answerPt: "Reembolso total ou crédito se cancelar até 72 horas antes do início da experiência. Reembolso total/crédito se cancelarmos por condições meteorológicas ou circunstâncias imprevistas. Em caso de não comparência, é cobrado o valor total. Contacte-nos para cancelar ou saber mais." },
  { order: 4, id: "languages", questionEn: "What languages are your experiences in?", questionPt: "Em que idiomas são as experiências?", answerEn: "English, Portuguese, and Spanish.", answerPt: "Inglês, Português e Espanhol." },
  { order: 5, id: "travel-insurance", questionEn: "Do you offer travel insurance?", questionPt: "Oferecem seguro de viagem?", answerEn: "No, but we recommend arranging your own travel insurance depending on your needs.", answerPt: "Não, mas recomendamos que trate do seu próprio seguro de viagem conforme as suas necessidades." },
  { order: 6, id: "transport", questionEn: "Can you coordinate transport from Porto or Lisbon?", questionPt: "Podem coordenar transporte a partir do Porto ou Lisboa?", answerEn: "We recommend the train. Easy, safe, and fast. We can guide you on schedules and meet you at Aveiro station on foot or with a car/van.", answerPt: "Recomendamos o comboio. Fácil, seguro e rápido. Podemos orientá-lo nos horários e encontrar-nos na estação de Aveiro, a pé ou de carro/carrinha." },
  { order: 7, id: "relation", questionEn: "What's the relation to Sterna Aveiro Ria Tours & Birdwatching?", questionPt: "Qual é a relação com a Sterna Aveiro Ria Tours & Birdwatching?", answerEn: "Same team, same 300+ five-star reviews. In 2026 we rebranded as Sterna Aveiro Experiences and expanded what we offer beyond the water.", answerPt: "Mesma equipa, as mesmas 300+ avaliações cinco estrelas. Em 2026 mudámos o nome para Sterna Aveiro Experiences e expandimos o que oferecemos para além da água." },
  { order: 8, id: "group-size", questionEn: "What's the largest group you can handle?", questionPt: "Qual é o maior grupo que aceitam?", answerEn: "Eight people is our max on a standard experience. For larger groups, message us. We can arrange it with notice. Minimum size depends on the experience.", answerPt: "Oito pessoas é o máximo numa experiência padrão. Para grupos maiores, contacte-nos. Conseguimos organizar com alguma antecedência. O mínimo depende da experiência." },
  { order: 9, id: "other-questions", questionEn: "What if my question isn't answered here?", questionPt: "E se a minha pergunta não estiver aqui?", answerEn: "Drop us a WhatsApp message or email. Obrigado!", answerPt: "Envie-nos um WhatsApp ou email. Obrigado!" },
];

const REVIEWS = [
  { order: 1, id: "trail743531", authorName: "Trail743531", authorMeta: "December 2025", rating: 5, quoteEn: "A wonderful afternoon with Sandra and Steven. Truly our favourite day yet in our Portugal travels.", quotePt: "A wonderful afternoon with Sandra and Steven. Truly our favourite day yet in our Portugal travels." },
  { order: 2, id: "rachael-r", authorName: "Rachael R", authorMeta: "April 2026", rating: 5, quoteEn: "The electric boat is beautifully quiet, which made the whole experience feel incredibly peaceful. Even though the town was busy over Easter, it was wonderfully calm out on the water.", quotePt: "The electric boat is beautifully quiet, which made the whole experience feel incredibly peaceful. Even though the town was busy over Easter, it was wonderfully calm out on the water." },
  { order: 3, id: "catarina-fc", authorName: "catarina_fc", authorMeta: "London, UK · August 2025", rating: 5, quoteEn: "Sandra is super knowledgeable and passionate about the history and wildlife of this beautiful place, which really shows and makes for a unique experience. Cannot recommend enough.", quotePt: "Sandra is super knowledgeable and passionate about the history and wildlife of this beautiful place, which really shows and makes for a unique experience. Cannot recommend enough." },
  { order: 4, id: "stephen-a", authorName: "Stephen A", authorMeta: "September 2025", rating: 5, quoteEn: "Truly one of the highlights of our day trip to Aveiro. An incredible time spotting a wide variety of birds, including flamingos, sea eagles, cormorants and more.", quotePt: "Truly one of the highlights of our day trip to Aveiro. An incredible time spotting a wide variety of birds, including flamingos, sea eagles, cormorants and more." },
  { order: 5, id: "alexandre-d", authorName: "Alexandre D", authorMeta: "October 2025", rating: 5, quoteEn: "Highly recommended. The owner clearly loves the area and knows a lot about the history and the wildlife. The itinerary is adapted to the tides, weather and personal requests.", quotePt: "Highly recommended. The owner clearly loves the area and knows a lot about the history and the wildlife. The itinerary is adapted to the tides, weather and personal requests." },
  { order: 6, id: "monica-bastos", authorName: "Mónica Bastos", authorMeta: "August 2025", rating: 5, quoteEn: "Incredible experience, rediscovering the Ria de Aveiro. Sandra and Stephen were fantastic guides. The boat is quiet, we really felt we were not intruders in the Ria, passing flamingos and other birds without scaring them.", quotePt: "Incredible experience, rediscovering the Ria de Aveiro. Sandra and Stephen were fantastic guides. The boat is quiet, we really felt we were not intruders in the Ria, passing flamingos and other birds without scaring them." },
  { order: 7, id: "beatriz-vasconcelos", authorName: "Beatriz Vasconcelos", authorMeta: "April 2026", rating: 5, quoteEn: "Along the way there was always a clear and interesting explanation of what we were seeing. I really liked the experience.", quotePt: "Along the way there was always a clear and interesting explanation of what we were seeing. I really liked the experience." },
  { order: 8, id: "janelle-d", authorName: "Janelle D", authorMeta: "October 2025", rating: 5, quoteEn: "Silviu introduced us to the history, ecosystem and current state of the old salt pan of Aveiro. The boat has the huge advantage of being silent and a very comfortable way to navigate the waterways.", quotePt: "Silviu introduced us to the history, ecosystem and current state of the old salt pan of Aveiro. The boat has the huge advantage of being silent and a very comfortable way to navigate the waterways." },
  { order: 9, id: "rui-c", authorName: "Rui C", authorMeta: "Aix-en-Provence, France · September 2025", rating: 5, quoteEn: "A very enriching experience. Sandra and Estevão were friendly, accessible, acquainted with the Ria and its secrets. Excellent guides.", quotePt: "A very enriching experience. Sandra and Estevão were friendly, accessible, acquainted with the Ria and its secrets. Excellent guides." },
  { order: 10, id: "luis-angel-d", authorName: "Luis Ángel D", authorMeta: "September 2025", rating: 5, quoteEn: "A wonderful excursion, already the second we do with them. Sandra and Silvio are a charmer of people, they explain everything in Spanish very well, then give you a tasting of Ovos Moles and typical cookies.", quotePt: "A wonderful excursion, already the second we do with them. Sandra and Silvio are a charmer of people, they explain everything in Spanish very well, then give you a tasting of Ovos Moles and typical cookies." },
];

const EXPERIENCES = [
  {
    slug: "salt-pans-lunch", order: 1, featured: true, category: "nature-water",
    categoryLabelEn: "Nature & Water", categoryLabelPt: "Natureza & Água",
    nameEn: "Historic Aveiro Salt Flat Walk with Portuguese Lunch",
    namePt: "Passeio pelas Marinhas de Sal com Almoço Português",
    shortEn: "Salt flats with the oldest marnoto", shortPt: "Marinhas de sal com o marnoto mais velho",
    oneLinerEn: "Walk one of the last working salt pans of Aveiro with the oldest marnoto. 73 years old, 58 salt-flat seasons and counting. Followed by a Portuguese lunch of your choosing.",
    oneLinerPt: "Percorra uma das últimas marinhas de sal em atividade de Aveiro com o marnoto mais velho. 73 anos, 58 épocas de safra e a contar. Seguido de um almoço português à sua escolha.",
    durationEn: "4 hours", durationPt: "4 horas",
    includedEn: ["Pick-up & drop-off (to/from city center)", "Guided salt-flat tour in English", "Private Q&A time with the marnoto (with translation)", "3+ course Portuguese lunch (appetizer, entrée, dessert)", "Wine tasting & wine, plus fresh juices, water, coffee"],
    includedPt: ["Recolha e entrega (de/para o centro da cidade)", "Visita guiada às marinhas em inglês", "Tempo privado de perguntas com o marnoto (com tradução)", "Almoço português de 3+ pratos (entrada, prato principal, sobremesa)", "Prova de vinhos & vinho, além de sumos naturais, água, café"],
    priceNoteEn: "Pricing varies by group size, preferences, transport, and day. Message us on WhatsApp or email for a quote.",
    priceNotePt: "O preço varia conforme o tamanho do grupo, preferências, transporte e dia. Contacte-nos por WhatsApp ou email para um orçamento.",
    heroPhoto: "/uploads/salt-pans/IMG_4709.jpg",
    gallery: ["/uploads/salt-pans/IMG_3927.jpg", "/uploads/salt-pans/IMG_3931.jpg", "/uploads/salt-pans/IMG_4352.jpg", "/uploads/salt-pans/IMG_4371.jpg", "/uploads/salt-pans/IMG_4710.jpg", "/uploads/salt-pans/Salicórnia.JPG"],
  },
  {
    slug: "walking-tour", order: 2, featured: true, category: "food-wine",
    categoryLabelEn: "Food & Wine", categoryLabelPt: "Comida & Vinho",
    nameEn: "Aveiro City Walking Tour with Food & Wine Tastings",
    namePt: "Passeio a Pé por Aveiro com Provas de Comida & Vinho",
    shortEn: "Local walk with food & wine stops", shortPt: "Passeio local com paragens de comida e vinho",
    oneLinerEn: "Walk and talk with Carlos, Sandra & Jenna through Aveiro's canals, architecture, and history, pausing for one to four food and wine tastings in local restaurants and cafés along the way.",
    oneLinerPt: "Caminhe e converse com o Carlos, a Sandra e a Jenna pelos canais, arquitetura e história de Aveiro, parando para uma a quatro provas de comida e vinho em restaurantes e cafés locais pelo caminho.",
    durationEn: "4 hours", durationPt: "4 horas",
    includedEn: ["Walking tour with a local guide", "1–4 curated food and wine tastings (timed outside core meal hours for exclusivity)", "Local sweets (ovos moles & tripas)", "Option to add a walk around the salt pans"],
    includedPt: ["Passeio a pé com guia local", "1 a 4 provas selecionadas de comida e vinho (fora das horas principais das refeições, para maior exclusividade)", "Doces locais (ovos moles & tripas)", "Opção de acrescentar um passeio pelas marinhas de sal"],
    priceNoteEn: "Pricing varies by group size, tasting count, and preferences. Message us on WhatsApp or email for a quote.",
    priceNotePt: "O preço varia conforme o tamanho do grupo, número de provas e preferências. Contacte-nos por WhatsApp ou email para um orçamento.",
    heroPhoto: "/uploads/walking-tour/20260711_112249.jpg",
    gallery: ["/uploads/walking-tour/20260702_153535(1).jpg", "/uploads/walking-tour/20260711_112924(1).jpg", "/uploads/walking-tour/20260711_113506.jpg", "/uploads/walking-tour/20260711_113618.jpg", "/uploads/walking-tour/20260711_115222.jpg", "/uploads/walking-tour/20260711_120135.jpg"],
  },
  {
    slug: "mealhada-sparkling-wine", order: 3, featured: true, category: "food-wine",
    categoryLabelEn: "Food & Wine", categoryLabelPt: "Comida & Vinho",
    nameEn: "A Day with Leitão & Sparkling Wine in Mealhada",
    namePt: "Um Dia de Leitão e Espumante na Mealhada",
    shortEn: "Cave tour, tasting, leitão lunch", shortPt: "Visita à cave, prova, almoço de leitão",
    oneLinerEn: "Explore the caves of Messias (or another local sparkling-wine estate), taste through their range, then sit down to leitão (tender roasted pork with homemade fries and salad) at a local restaurant. More sparkling wine, of course.",
    oneLinerPt: "Explore as caves da Messias (ou de outra adega local de espumante), prove a gama, e depois sente-se ao leitão (carne de porco assada tenra com batata frita caseira e salada) num restaurante local. Mais espumante, claro.",
    durationEn: "5 hours", durationPt: "5 horas",
    includedEn: ["Pick-up & drop-off from Aveiro city center", "Snacks & drinks in the car/van", "Winery cave tour & sparkling wine tasting", "Leitão lunch: appetizers, mains, sides, dessert, coffee, wines, waters, juices"],
    includedPt: ["Recolha e entrega no centro de Aveiro", "Snacks e bebidas no carro/carrinha", "Visita à cave e prova de espumante", "Almoço de leitão: entradas, prato principal, acompanhamentos, sobremesa, café, vinhos, águas, sumos"],
    addOnsEn: ["Add a second winery tasting (São Domingos nearby)", "Have lunch catered into the winery instead of the restaurant", "Convert lunch into a dinner itinerary"],
    addOnsPt: ["Acrescentar uma segunda prova (São Domingos, próximo)", "Almoço servido dentro da adega em vez do restaurante", "Converter o almoço num itinerário de jantar"],
    priceNoteEn: "Pricing varies by group size, tasting count, and dining choice. Message us on WhatsApp or email for a quote.",
    priceNotePt: "O preço varia conforme o tamanho do grupo, número de provas e escolha de restaurante. Contacte-nos por WhatsApp ou email para um orçamento.",
    heroPhoto: "/uploads/mealhada/hero.jpg",
    gallery: ["/uploads/mealhada/gallery-1.jpg", "/uploads/mealhada/gallery-2.jpg", "/uploads/mealhada/gallery-3.jpg", "/uploads/mealhada/gallery-4.jpg"],
  },
  {
    slug: "bussaco-luso", order: 4, featured: true, category: "culture",
    categoryLabelEn: "Nature & Culture", categoryLabelPt: "Natureza & Cultura",
    nameEn: "Bussaco Forest, Palace & the Luso Spa Region",
    namePt: "Mata do Buçaco, Palácio & Região Termal do Luso",
    shortEn: "Forest, palace, spa & long lunch", shortPt: "Floresta, palácio, termas e longo almoço",
    oneLinerEn: "Fill a day with forest walks, palace history, thermal spa water, and a long local lunch, all in one of Portugal's most magical corners.",
    oneLinerPt: "Encha um dia com passeios na floresta, história do palácio, águas termais e um longo almoço local, tudo num dos cantos mais mágicos de Portugal.",
    durationEn: "6+ hours", durationPt: "6+ horas",
    includedEn: ["Pick-up & drop-off from Aveiro city center", "Entrance & tour costs", "Optional pre-booked spa experiences (Luso or Curia)", "Lunch at a winery or palace with wine tasting"],
    includedPt: ["Recolha e entrega no centro de Aveiro", "Entradas e custos das visitas", "Experiências termais opcionais (Luso ou Curia) mediante reserva prévia", "Almoço numa adega ou palácio com prova de vinhos"],
    priceNoteEn: "Half or full day, completely custom-built to your group. Message us on WhatsApp or email for a quote.",
    priceNotePt: "Meio-dia ou dia inteiro, totalmente à medida do seu grupo. Contacte-nos por WhatsApp ou email para um orçamento.",
    heroPhoto: "/uploads/bussaco/hero.jpg",
    gallery: ["/uploads/bussaco/gallery-1.jpg", "/uploads/bussaco/gallery-2.jpg", "/uploads/bussaco/gallery-3.jpg", "/uploads/bussaco/gallery-4.jpg"],
    pressSource: "Travel + Leisure",
    pressUrl: "https://www.travelandleisure.com/portugal-now-has-certified-healing-forest-12030284",
    pressQuoteEn: "This 400-year-old forest in Portugal was just named one of the world's only certified healing forests — and it's surrounded by 250 tree species.",
    pressQuotePt: "Esta floresta de 400 anos em Portugal foi nomeada uma das únicas florestas curativas certificadas do mundo — e é rodeada por 250 espécies de árvores.",
  },
  {
    slug: "boat-tour", order: 5, featured: true, category: "nature-water",
    categoryLabelEn: "Nature & Water", categoryLabelPt: "Natureza & Água",
    nameEn: "Aveiro Boat Ride: Salt Pans or Lagoon & Atlantic",
    namePt: "Passeio de Barco em Aveiro: Marinhas ou Ria & Atlântico",
    shortEn: "Boat ride, lunch or sunset", shortPt: "Passeio de barco, almoço ou pôr-do-sol",
    oneLinerEn: "A ride in a local Aveiro boat through the salt pans, or out to the lagoon and Atlantic, followed by a Portuguese lunch or a sunset happy hour on the water.",
    oneLinerPt: "Um passeio num barco típico de Aveiro pelas marinhas, ou até à ria e ao Atlântico, seguido de um almoço português ou um happy hour ao pôr-do-sol na água.",
    durationEn: "4 hours (extendable)", durationPt: "4 horas (extensíveis)",
    includedEn: ["Pick-up", "Private boat ride", "Lunch with wine and non-alcoholic options, tailored to your preferences", "Option: BBQ lunch on a private island (with the salt-flat family who still lives there; proceeds help preserve the island)"],
    includedPt: ["Recolha", "Passeio de barco privado", "Almoço com vinhos e opções sem álcool, adaptado às suas preferências", "Opção: almoço-churrasco numa ilha privada (com a família das marinhas que ainda ali vive; parte do valor ajuda a preservar a ilha)"],
    priceNoteEn: "Can be combined with a full salt-flat boat experience (subject to tides), extending by ~1.5 hours. Message us for a quote.",
    priceNotePt: "Pode ser combinado com uma experiência completa de barco pelas marinhas (dependente das marés), acrescentando cerca de 1,5 horas. Contacte-nos para orçamento.",
    heroPhoto: "/uploads/boat-tour/20260704_204620~2.jpg",
    gallery: ["/uploads/boat-tour/20260704_204620~2.jpg"],
  },
  {
    slug: "vista-alegre", order: 6, featured: true, category: "culture",
    categoryLabelEn: "Culture", categoryLabelPt: "Cultura",
    nameEn: "Vista Alegre: Porcelain Factory Tour & Lunch",
    namePt: "Vista Alegre: Visita à Fábrica de Porcelana & Almoço",
    shortEn: "1824 porcelain factory & 5-star lunch", shortPt: "Fábrica de porcelana de 1824 & almoço 5 estrelas",
    oneLinerEn: "Tour the famous Vista Alegre porcelain factory (working since 1824), followed by lunch at the 5-star Montebelo Hotel next door or a highly-rated local spot. Shop the outlet on your way out.",
    oneLinerPt: "Visite a famosa fábrica de porcelana da Vista Alegre (em atividade desde 1824), seguido de almoço no Hotel Montebelo 5 estrelas ao lado ou num restaurante local muito bem avaliado. Passe pelo outlet à saída.",
    durationEn: "4–6 hours", durationPt: "4–6 horas",
    includedEn: ["Pick-up & drop-off from Aveiro city center", "Vista Alegre museum & factory tour", "Lunch package tailored to your preferences", "Seasonal add-on: creative painting workshop"],
    includedPt: ["Recolha e entrega no centro de Aveiro", "Visita ao museu e fábrica da Vista Alegre", "Almoço adaptado às suas preferências", "Extra sazonal: workshop criativo de pintura"],
    priceNoteEn: "Pricing varies by group size and lunch choice. Message us on WhatsApp or email for a quote.",
    priceNotePt: "O preço varia conforme o tamanho do grupo e escolha de almoço. Contacte-nos por WhatsApp ou email para um orçamento.",
    heroPhoto: "/uploads/vista-alegre/hero.jpg",
    gallery: ["/uploads/vista-alegre/gallery-1.jpg", "/uploads/vista-alegre/gallery-2.jpg", "/uploads/vista-alegre/gallery-3.jpg", "/uploads/vista-alegre/gallery-4.jpg"],
  },
  {
    slug: "spa-wellness", order: 7, featured: false, category: "wellness",
    categoryLabelEn: "Wellness", categoryLabelPt: "Bem-estar",
    nameEn: "Aveiro Spa & Wellness Day",
    namePt: "Dia de Spa & Bem-estar em Aveiro",
    shortEn: "Local, pre-vetted spa & wellness", shortPt: "Spa e bem-estar locais, pré-selecionados",
    oneLinerEn: "Local Portuguese practitioners pampering your beauty and wellness: massages, reflexology, facials, hair, or a Turkish bath. Everything pre-vetted by us.",
    oneLinerPt: "Profissionais portugueses locais a mimar a sua beleza e bem-estar: massagens, reflexologia, tratamentos faciais, cabelo ou banho turco. Tudo pré-selecionado por nós.",
    durationEn: "2+ hours per treatment", durationPt: "2+ horas por tratamento",
    includedEn: ["Massages, reflexology, manicure/pedicure, dermaplaning, microneedling, deep-clean facial, hair cut/color", "Optional personal or group training sessions", "Transport between treatments and locations"],
    includedPt: ["Massagens, reflexologia, manicure/pedicure, dermaplaning, microneedling, tratamento facial profundo, corte/cor de cabelo", "Sessões opcionais de treino individual ou em grupo", "Transporte entre tratamentos e locais"],
    priceNoteEn: "Most services require 1–2 weeks of advance planning. Message us on WhatsApp or email to arrange.",
    priceNotePt: "A maioria dos serviços exige 1 a 2 semanas de antecedência. Contacte-nos por WhatsApp ou email para organizar.",
    heroPhoto: "/uploads/spa/hero.jpg",
    gallery: ["/uploads/spa/gallery-1.jpg", "/uploads/spa/gallery-2.jpg", "/uploads/spa/gallery-3.jpg", "/uploads/spa/gallery-4.jpg"],
  },
  {
    slug: "costa-nova-barra", order: 8, featured: false, category: "nature-water",
    categoryLabelEn: "Coastal", categoryLabelPt: "Costa",
    nameEn: "Costa Nova & Barra: Beaches, Boardwalk & Fish Market",
    namePt: "Costa Nova & Barra: Praias, Passadiço e Mercado do Peixe",
    shortEn: "Striped houses, big lighthouse, fish market", shortPt: "Casas às riscas, farol gigante, mercado do peixe",
    oneLinerEn: "The colorful striped palheiros of Costa Nova, the tallest lighthouse in continental Europe at Barra, and the working fish market. 15 minutes from Aveiro, all in one day.",
    oneLinerPt: "Os palheiros às riscas da Costa Nova, o farol mais alto da Europa continental na Barra, e o mercado do peixe em atividade. A 15 minutos de Aveiro, tudo num dia.",
    durationEn: "Half or full day", durationPt: "Meio-dia ou dia inteiro",
    includedEn: ["Pick-up & drop-off from Aveiro city center", "Guided boardwalk between Costa Nova and Barra (or unguided, your call)", "Lunch and/or sunset dinner at a local restaurant", "Guided fish market visit with Q&A with local fishermen (market hours permitting)", "Beach day option: towels, coolers, umbrellas, transport"],
    includedPt: ["Recolha e entrega no centro de Aveiro", "Passeio guiado pelo passadiço entre Costa Nova e Barra (ou livre, à sua escolha)", "Almoço e/ou jantar ao pôr-do-sol num restaurante local", "Visita guiada ao mercado do peixe com conversa com pescadores locais (horários do mercado permitindo)", "Opção dia de praia: toalhas, geleiras, chapéus-de-sol, transporte"],
    priceNoteEn: "Fish markets run only certain days. Let us know if this is a must-see. Message us for a quote.",
    priceNotePt: "O mercado do peixe abre só em certos dias. Diga-nos se for imperdível. Contacte-nos para orçamento.",
    heroPhoto: "/uploads/costa-nova/20260629_165428(1).jpg",
    gallery: ["/uploads/costa-nova/20260629_165428(1).jpg"],
  },
  {
    slug: "praia-de-mira", order: 9, featured: false, category: "nature-water",
    categoryLabelEn: "Coastal", categoryLabelPt: "Costa",
    nameEn: "Praia de Mira: Beach Community & Charcoal-Grilled Chicken",
    namePt: "Praia de Mira: Comunidade Piscatória & Frango no Carvão",
    shortEn: "Beach village + legendary roasted chicken", shortPt: "Aldeia à beira-mar + frango assado lendário",
    oneLinerEn: "Beach time, lagoon walks, paddle boats, and one of the best family-owned charcoal-grilled chicken restaurants in the region, with a kitchen tour and chat with the chef himself.",
    oneLinerPt: "Tempo de praia, passeios pela lagoa, gaivotas a pedais, e um dos melhores restaurantes familiares de frango no carvão da região, com visita à cozinha e conversa com o próprio chef.",
    durationEn: "Half or full day", durationPt: "Meio-dia ou dia inteiro",
    includedEn: ["Pick-up & drop-off from Aveiro city center", "Guided village tour", "Chicken lunch with sides, dessert, wines, non-alcoholic options", "Charcoal-grill demo and Q&A with the restaurant owner-chef"],
    includedPt: ["Recolha e entrega no centro de Aveiro", "Visita guiada à aldeia", "Almoço de frango com acompanhamentos, sobremesa, vinhos e opções sem álcool", "Demonstração no grelhador de carvão e conversa com o dono-chef"],
    addOnsEn: ["Paddleboarding, paddle boats", "Buggy / 4-wheeling on the dunes"],
    addOnsPt: ["Paddleboard, gaivotas a pedais", "Buggy / moto 4 rodas nas dunas"],
    priceNoteEn: "Vegetarian and fish options available. Message us for a quote.",
    priceNotePt: "Disponíveis opções vegetarianas e de peixe. Contacte-nos para orçamento.",
    heroPhoto: "/uploads/praia-de-mira/hero.jpg",
    gallery: ["/uploads/praia-de-mira/gallery-1.jpg", "/uploads/praia-de-mira/gallery-2.jpg", "/uploads/praia-de-mira/gallery-3.jpg", "/uploads/praia-de-mira/gallery-4.jpg"],
  },
];

/* Page singletons — flat objects with `_en`/`_pt` suffixes */
const HOME_PAGE = {
  _id: "homePage", _type: "homePage",
  hero_eyebrow_en: "Aveiro · Portugal", hero_eyebrow_pt: "Aveiro · Portugal",
  hero_line1_en: "Aveiro,", hero_line1_pt: "Aveiro,",
  hero_line2_en: "uncovered.", hero_line2_pt: "descoberto.",
  hero_line3_en: "With local friends.", hero_line3_pt: "Com amigos locais.",
  hero_lead_en: "We're Jenna, Carlos & Sandra. Three friends from Aveiro building personalised days around your passions. Salt pans, sparkling wine caves, sunset boat rides, long lunches with our mothers. The bits most day-trippers miss.",
  hero_lead_pt: "Somos a Jenna, o Carlos e a Sandra. Três amigos de Aveiro a criar dias personalizados à volta das suas paixões. Marinhas de sal, caves de espumante, passeios de barco ao pôr-do-sol, longos almoços em casa das nossas mães. As partes que a maioria dos autocarros turísticos deixa de fora.",
  hero_ctaPrimary_en: "See the experiences", hero_ctaPrimary_pt: "Ver as experiências",
  hero_ctaSecondary_en: "WhatsApp us", hero_ctaSecondary_pt: "Envie-nos WhatsApp",
  hero_trustPrefix_en: "", hero_trustPrefix_pt: "",
  hero_trustNumber_en: "300+", hero_trustNumber_pt: "300+",
  hero_trustSuffix_en: "five-star reviews on TripAdvisor & Google",
  hero_trustSuffix_pt: "avaliações cinco estrelas no TripAdvisor e Google",
  hero_scroll_en: "scroll", hero_scroll_pt: "descer",
  intro_caption_en: "A note from the three of us", intro_caption_pt: "Uma nota dos três",
  intro_body_en: "Aveiro isn't just a place to visit. It's a place to experience. Come spend a day, a week, or a season uncovering colourful streets, sailing picturesque waterways, immersing yourself in local cuisine and wines. Solo, as a couple, with friends. The city has a way of making every visit feel uniquely yours. We're licensed, insured, and take care of every detail so all you have to do is show up.",
  intro_body_pt: "Aveiro não é apenas um sítio para visitar. É um sítio para viver. Venha passar um dia, uma semana ou uma estação a descobrir ruas coloridas, cursos de água pitorescos, cozinha e vinhos locais. Sozinho, em casal, com amigos. A cidade tem o dom de fazer cada visita sentir-se única. Somos licenciados, seguros, e tratamos de todos os detalhes para que só tenha de aparecer.",
  intro_sig_en: "Jenna, Carlos & Sandra", intro_sig_pt: "Jenna, Carlos & Sandra",
  featured_number_en: "01", featured_number_pt: "01",
  featured_eyebrow_en: "Our biggest one", featured_eyebrow_pt: "A nossa mais especial",
  featured_hookLine1_en: "Walk the salt pans", featured_hookLine1_pt: "Caminhe pelas marinhas de sal",
  featured_hookLine2_en: "with the oldest marnoto.", featured_hookLine2_pt: "com o marnoto mais velho.",
  featured_copyLead_en: "Seventy-three years old. Fifty-eight salt-flat seasons. He'll show you the last working salt pans of Aveiro (his own), and answer any question you throw at him. Then we sit down for a long Portuguese lunch.",
  featured_copyLead_pt: "Setenta e três anos. Cinquenta e oito épocas de safra. Ele leva-o pelas últimas marinhas de sal em atividade em Aveiro (as suas), e responde a todas as suas perguntas. Depois sentamo-nos para um longo almoço português.",
  featured_pullQuote_en: "Some operators explain the salt pans. We take you to the man who owns them.",
  featured_pullQuote_pt: "Alguns operadores explicam as marinhas. Nós apresentamos-lhe o homem que as trabalha.",
  featured_annotation_en: "← that's Senhor Álvaro, still working at 73",
  featured_annotation_pt: "← o Senhor Álvaro, ainda a trabalhar aos 73",
  featured_cta_en: "Read the full experience", featured_cta_pt: "Ver a experiência completa",
  duo_eyebrow_en: "Two more classics", duo_eyebrow_pt: "Mais dois clássicos",
  duo_w1Kicker_en: "02 · Food & wine", duo_w1Kicker_pt: "02 · Comida & vinho",
  duo_w2Kicker_en: "03 · Food & wine", duo_w2Kicker_pt: "03 · Comida & vinho",
  listExp_eyebrow_en: "Three more days worth planning", listExp_eyebrow_pt: "Mais três dias para planear",
  listExp_leadPrefix_en: "Bussaco, Vista Alegre, sunset on the boat.",
  listExp_leadPrefix_pt: "Bussaco, Vista Alegre, pôr-do-sol de barco.",
  listExp_leadEmph_en: "Each one a full day in itself.", listExp_leadEmph_pt: "Cada um é um dia inteiro por si só.",
  listExp_ctaAll_en: "See all nine experiences", listExp_ctaAll_pt: "Ver as nove experiências",
  whyList_eyebrow_en: "What most tourists miss", whyList_eyebrow_pt: "O que a maioria dos turistas perde",
  whyList_h2_en: "Aveiro isn't a day trip.", whyList_h2_pt: "Aveiro não é uma visita de um dia.",
  whyList_body_en: "Most people come by bus, do a 45-minute moliceiro ride, grab lunch on the canal, and leave. There's so much more within a 30-minute drive: a working marnoto's salt pan, a century-old sparkling wine cave, a palace in the forest, the region's best charcoal chicken.",
  whyList_body_pt: "A maioria vem de autocarro, faz um passeio de moliceiro de 45 minutos, almoça no canal e vai-se embora. Há tanto mais a menos de 30 minutos de carro: as marinhas de sal em atividade, uma cave de espumante centenária, um palácio na floresta, o melhor frango no carvão da região.",
  whyList_ask_en: "Ask us what to skip.", whyList_ask_pt: "Pergunte-nos o que saltar.",
  proof_h2Line1_en: "Not our word.", proof_h2Line1_pt: "Não é palavra nossa.",
  proof_h2Line2_en: "Theirs, on TripAdvisor.", proof_h2Line2_pt: "É dos nossos hóspedes, no TripAdvisor.",
  proof_lead_en: "Between the three of us, we've hosted over 300 travellers who left five-star reviews on TripAdvisor and Google. We're not going to fake reviews here. Read the real ones directly.",
  proof_lead_pt: "Entre os três recebemos mais de 300 viajantes que deixaram avaliações cinco estrelas no TripAdvisor e Google. Não vamos inventar avaliações aqui. Leia as verdadeiras diretamente.",
  proof_cta_en: "Read the reviews on TripAdvisor →", proof_cta_pt: "Ler as avaliações no TripAdvisor →",
  founders_eyebrow_en: "Meet the three of us", founders_eyebrow_pt: "Conheça os três",
  founders_h2Line1_en: "A friendship,", founders_h2Line1_pt: "Uma amizade,",
  founders_h2Line2_en: "a Camino, a home.", founders_h2Line2_pt: "um Caminho, uma casa.",
  founders_body_en: "Jenna met Carlos on her 40th-birthday Camino. She loved Aveiro so much she moved here in 2025. Sandra, an Aveiro tourism veteran with 300+ reviews, is married to one of Carlos's oldest friends. That's the whole team.",
  founders_body_pt: "A Jenna conheceu o Carlos no Caminho de Santiago, no seu 40º aniversário. Adorou tanto Aveiro que se mudou para cá em 2025. A Sandra, veterana do turismo de Aveiro com mais de 300 avaliações, é casada com um dos amigos mais antigos do Carlos. É esta a equipa.",
  founders_ctaMore_en: "Read the full story", founders_ctaMore_pt: "Ler a história completa",
  cta_eyebrow_en: "Ready when you are", cta_eyebrow_pt: "Quando estiver pronto",
  cta_h2_en: "Drop us a note and let's start planning.", cta_h2_pt: "Envie-nos uma mensagem e começamos a planear.",
  cta_lead_en: "Tell us who's coming, when you're here, and what you love. We come back with ideas, usually within a day.",
  cta_lead_pt: "Diga-nos quem vem, quando estará cá, e o que gosta. Voltamos com ideias, normalmente no mesmo dia.",
  cta_obrigado_en: "Obrigado!", cta_obrigado_pt: "Obrigado!",
  cta_whatsapp_en: "WhatsApp", cta_whatsapp_pt: "WhatsApp",
  cta_email_en: "Email us", cta_email_pt: "Enviar email",
};

const ABOUT_PAGE = {
  _id: "aboutPage", _type: "aboutPage",
  eyebrow_en: "About us", eyebrow_pt: "Sobre nós",
  h1Line1_en: "A friendship, a Camino,", h1Line1_pt: "Uma amizade, um Caminho,",
  h1Line2_en: "and a shared home.", h1Line2_pt: "e uma casa partilhada.",
  lead_en: "We're Jenna, Carlos & Sandra. The three of us built Sterna Aveiro Experiences to show curious travellers the Aveiro we live in. The one beyond the moliceiro ride.",
  lead_pt: "Somos a Jenna, o Carlos e a Sandra. Os três construímos a Sterna Aveiro Experiences para mostrar aos viajantes curiosos a Aveiro em que vivemos. Aquela para lá do passeio de moliceiro.",
  storyH2_en: "How we met", storyH2_pt: "Como nos conhecemos",
  storyPara1_en: "Jenna met Carlos for her 40th birthday, walking the Camino de Santiago. She fell in love with Portugal, especially Carlos and his Aveiro. Enough that she moved here in 2025.",
  storyPara1_pt: "A Jenna conheceu o Carlos no seu 40º aniversário, a fazer o Caminho de Santiago. Apaixonou-se por Portugal, especialmente pelo Carlos e a sua Aveiro. O suficiente para se mudar para cá em 2025.",
  storyPara2_en: "Carlos was born and raised in Aveiro. Fifty-two years of it. When he isn't guiding on the Camino, he's showing people around his hometown, from hidden salt pans to his mother Ivone's Portuguese kitchen.",
  storyPara2_pt: "O Carlos nasceu e cresceu em Aveiro. Cinquenta e dois anos. Quando não está a guiar no Caminho, está a mostrar a sua cidade a outros, das marinhas de sal escondidas à cozinha portuguesa da sua mãe Ivone.",
  storyPara3_en: "Sandra's roots are in the town just north of Aveiro. She's spent decades in tourism: walking experiences, food experiences, salt-flat boat experiences. She's married to one of Carlos's oldest childhood friends. She has over 300 five-star reviews across TripAdvisor and Google to prove her craft.",
  storyPara3_pt: "A Sandra tem raízes na terra logo a norte de Aveiro. Passou décadas no turismo: visitas a pé, experiências gastronómicas, passeios de barco pelas marinhas. É casada com um dos amigos mais antigos do Carlos. Tem mais de 300 avaliações cinco estrelas no TripAdvisor e Google para provar a sua arte.",
  storyPara4_en: "When we aren't working, we're doing what everyone here does: boating, cooking, playing tennis, exploring another corner of Portugal.",
  storyPara4_pt: "Quando não estamos a trabalhar, fazemos o que toda a gente aqui faz: barco, cozinhar, jogar ténis, explorar mais um canto de Portugal.",
  storySig_en: "Jenna, Carlos & Sandra", storySig_pt: "Jenna, Carlos & Sandra",
  meetH2_en: "Your local friends.", meetH2_pt: "Os seus amigos locais.",
  whyEyebrow_en: "Why Aveiro", whyEyebrow_pt: "Porquê Aveiro",
  whyH2Line1_en: "The Venice of Portugal,", whyH2Line1_pt: "A Veneza de Portugal,",
  whyH2Line2_en: "and so much more.", whyH2Line2_pt: "e muito mais.",
  whyLead_en: "Aveiro is unique. The canals, the salt pans, the Atlantic just beyond. Easy train access to Porto and Lisbon means it's a natural addition to any Portugal itinerary.",
  whyLead_pt: "Aveiro é única. Os canais, as marinhas de sal, o Atlântico logo ali. Acesso fácil de comboio a Porto e Lisboa faz dela uma adição natural a qualquer itinerário.",
  whyBody_en: "People hear about it as a day-trip. We think that's a shame. The magic unfolds day after day. The city keeps topping lists for expats, for good reason.",
  whyBody_pt: "As pessoas ouvem falar dela como visita de um dia. Achamos uma pena. A magia revela-se dia após dia. A cidade continua a liderar as listas para expatriados, com razão.",
};

const FAQ_PAGE = {
  _id: "faqPage", _type: "faqPage",
  eyebrow_en: "Frequently asked", eyebrow_pt: "Perguntas frequentes",
  h1Line1_en: "Answers to the", h1Line1_pt: "Respostas às",
  h1Line2_en: "usual questions.", h1Line2_pt: "perguntas habituais.",
  lead_en: "Still stuck? Drop us a WhatsApp or email. We normally respond within a day.",
  lead_pt: "Ainda com dúvidas? Envie um WhatsApp ou email. Normalmente respondemos no mesmo dia.",
  stillCurious_en: "Still curious?", stillCurious_pt: "Ainda com curiosidade?",
  whatsappCta_en: "WhatsApp us", whatsappCta_pt: "WhatsApp",
  emailCta_en: "Email us", emailCta_pt: "Enviar email",
};

const CONTACT_PAGE = {
  _id: "contactPage", _type: "contactPage",
  eyebrow_en: "Let's plan your trip", eyebrow_pt: "Vamos planear a sua viagem",
  h1Line1_en: "Tell us about", h1Line1_pt: "Conte-nos sobre a",
  h1Line2_en: "your Aveiro.", h1Line2_pt: "sua Aveiro.",
  lead_en: "Drop us a message and we'll come back within a day with ideas. WhatsApp is fastest. Email works great too.",
  lead_pt: "Envie-nos uma mensagem e voltamos no mesmo dia com ideias. O WhatsApp é o mais rápido. O email também funciona bem.",
  whatsappLabel_en: "WhatsApp", whatsappLabel_pt: "WhatsApp",
  whatsappHint_en: "Fastest way to reach us. Text or voice note.", whatsappHint_pt: "A forma mais rápida. Texto ou mensagem de voz.",
  emailLabel_en: "Email", emailLabel_pt: "Email",
  emailHint_en: "Perfect for longer requests or attachments.", emailHint_pt: "Ideal para pedidos mais longos ou anexos.",
  instaLabel_en: "Instagram", instaLabel_pt: "Instagram",
  instaHint_en: "Follow along for daily glimpses of Aveiro.", instaHint_pt: "Siga-nos para vistas diárias de Aveiro.",
  taLabel_en: "TripAdvisor", taLabel_pt: "TripAdvisor",
  taValue_en: "300+ five-star reviews", taValue_pt: "300+ avaliações cinco estrelas",
  taHint_en: "Read what past guests are saying.", taHint_pt: "Leia o que os hóspedes anteriores dizem.",
  basedLabel_en: "Based in", basedLabel_pt: "Sediados em",
  basedValue_en: "Aveiro, Portugal", basedValue_pt: "Aveiro, Portugal",
  basedHint_en: "We handle pickup & drop-off from anywhere in the city.", basedHint_pt: "Fazemos recolha e entrega em qualquer ponto da cidade.",
  fName_en: "Your name", fName_pt: "O seu nome",
  fEmail_en: "Email", fEmail_pt: "Email",
  fDates_en: "Dates in Aveiro", fDates_pt: "Datas em Aveiro",
  fDatesPh_en: "e.g. May 10–14", fDatesPh_pt: "ex. 10–14 de Maio",
  fPeople_en: "Number of people", fPeople_pt: "Número de pessoas",
  fPeoplePh_en: "2", fPeoplePh_pt: "2",
  fInterests_en: "Experiences you're interested in", fInterests_pt: "Experiências que lhe interessam",
  fNotes_en: "Tell us more. What do you love? Anything to avoid?", fNotes_pt: "Conte-nos mais. O que adora? Algo a evitar?",
  fNotesPh_en: "Any dietary needs, mobility notes, preferred pace, celebrations, etc.", fNotesPh_pt: "Restrições alimentares, notas de mobilidade, ritmo preferido, celebrações, etc.",
  fSubmit_en: "Send enquiry", fSubmit_pt: "Enviar pedido",
  fNoteA_en: "This opens your email app pre-filled, or copy the details and", fNoteA_pt: "Isto abre a sua aplicação de email pré-preenchida, ou copie os detalhes e",
  fNoteB_en: "send them on WhatsApp", fNoteB_pt: "envie por WhatsApp",
  fNoteC_en: ".", fNoteC_pt: ".",
  interestSomethingCustom_en: "Something custom", interestSomethingCustom_pt: "Algo à medida",
};

const EXPERIENCES_INDEX_PAGE = {
  _id: "experiencesIndexPage", _type: "experiencesIndexPage",
  eyebrow_en: "Our experiences", eyebrow_pt: "As nossas experiências",
  h1Line1_en: "Nine ways to", h1Line1_pt: "Nove formas de",
  h1Line2_en: "experience Aveiro.", h1Line2_pt: "viver Aveiro.",
  lead_en: "Start with one of the six we consider genuinely can't-miss, or combine several across a day or a week. Prefer something entirely custom? Say the word and we'll design it.",
  lead_pt: "Comece por uma das seis que consideramos imperdíveis, ou combine várias ao longo de um dia ou de uma semana. Prefere algo totalmente à medida? Diga a palavra e desenhamos.",
  coreEyebrow_en: "Six core experiences", coreEyebrow_pt: "Seis experiências principais",
  coreH2_en: "Start here.", coreH2_pt: "Comece aqui.",
  moreEyebrow_en: "Also worth doing", moreEyebrow_pt: "Também vale a pena",
  moreH2_en: "Add to any day.", moreH2_pt: "Junte a qualquer dia.",
  moreLead_en: "Wellness, Costa Nova's striped houses, Praia de Mira's charcoal-grill legends. Perfect for a longer stay, or paired with any core experience.",
  moreLead_pt: "Bem-estar, as casas às riscas da Costa Nova, o lendário frango no carvão da Praia de Mira. Perfeitas para uma estadia mais longa, ou para juntar a qualquer experiência principal.",
  customEyebrow_en: "Or something entirely custom", customEyebrow_pt: "Ou algo totalmente à medida",
  customH2_en: "Picnics. Waterfalls. Restaurant buy-outs. Beach yoga. Chef meet-and-greets. The lot.",
  customH2_pt: "Piqueniques. Cachoeiras. Reservas de restaurante em exclusivo. Ioga na praia. Encontros com chefs. Tudo.",
  customLead_en: "Sky's the limit. April/May and September/October are usually ideal. Good weather, small crowds. Message us to start designing something built for you.",
  customLead_pt: "O céu é o limite. Abril/Maio e Setembro/Outubro são normalmente ideais. Bom tempo, menos multidão. Envie mensagem para começarmos a desenhar algo feito à sua medida.",
};

const EXPERIENCE_DETAIL_PAGE = {
  _id: "experienceDetailPage", _type: "experienceDetailPage",
  backLink_en: "← All experiences", backLink_pt: "← Todas as experiências",
  sideDuration_en: "How long", sideDuration_pt: "Duração",
  sideGroup_en: "Group size", sideGroup_pt: "Tamanho do grupo",
  sideGroupText_en: "Up to 8 people. Message us for larger groups.",
  sideGroupText_pt: "Até 8 pessoas. Contacte-nos para grupos maiores.",
  sideLanguages_en: "Languages", sideLanguages_pt: "Idiomas",
  sideLanguagesText_en: "English, Portuguese, Spanish", sideLanguagesText_pt: "Inglês, Português, Espanhol",
  sidePrice_en: "Price", sidePrice_pt: "Preço",
  ctaQuote_en: "WhatsApp for a quote", ctaQuote_pt: "WhatsApp para orçamento",
  ctaEmail_en: "Email us", ctaEmail_pt: "Enviar email",
  included_en: "What's included", included_pt: "O que está incluído",
  addOns_en: "Optional add-ons", addOns_pt: "Extras opcionais",
  noteHand_en: "A little note from us", noteHand_pt: "Uma nota nossa",
  noteBody_en: "Every experience is fully customisable. Tell us who's coming, when, and what you love, and we'll come back with a plan built for you. We take care of transport, translations, reservations, and every fiddly detail so all you have to do is show up.",
  noteBody_pt: "Cada experiência é totalmente personalizável. Diga-nos quem vem, quando, e o que gosta, e voltamos com um plano feito para si. Tratamos do transporte, traduções, reservas e todos os pequenos detalhes para que só tenha de aparecer.",
  noteSig_en: "Jenna, Carlos & Sandra", noteSig_pt: "Jenna, Carlos & Sandra",
  galleryEyebrow_en: "From this experience", galleryEyebrow_pt: "Desta experiência",
  galleryH2_en: "A few glimpses.", galleryH2_pt: "Alguns momentos.",
  relatedEyebrow_en: "You might also love", relatedEyebrow_pt: "Talvez também goste",
  relatedH2_en: "Related experiences.", relatedH2_pt: "Experiências relacionadas.",
};

const SITE_META = {
  _id: "siteMeta", _type: "siteMeta",
  titleSuffix_en: "Sterna Aveiro Experiences", titleSuffix_pt: "Sterna Aveiro Experiences",
  defaultTitle_en: "Aveiro, uncovered. With local friends.",
  defaultTitle_pt: "Aveiro, descoberto. Com amigos locais.",
  defaultDescription_en: "Personalised experiences in and around Aveiro, Portugal. Salt pans, boat rides, wineries, porcelain, long Portuguese lunches. Small groups. Licensed. 300+ five-star reviews.",
  defaultDescription_pt: "Experiências personalizadas em Aveiro e arredores. Marinhas de sal, passeios de barco, adegas, porcelana, longos almoços portugueses. Grupos pequenos. Licenciados. Mais de 300 avaliações cinco estrelas.",
};

const NAV = {
  _id: "nav", _type: "nav",
  home_en: "Home", home_pt: "Início",
  experiences_en: "Experiences", experiences_pt: "Experiências",
  about_en: "About", about_pt: "Sobre nós",
  faq_en: "FAQ", faq_pt: "Perguntas",
  contact_en: "Contact", contact_pt: "Contacto",
  plan_en: "Plan your trip", plan_pt: "Planear viagem",
  whatsapp_en: "WhatsApp", whatsapp_pt: "WhatsApp",
  langLabel_en: "PT", langLabel_pt: "EN",
  langAriaLabel_en: "Switch to Portuguese", langAriaLabel_pt: "Switch to English",
};

const FOOTER = {
  _id: "footer", _type: "footer",
  tagline_en: "Aveiro, uncovered. With friends who live it.",
  tagline_pt: "Aveiro, descoberto. Com amigos que aqui vivem.",
  chip1_en: "Licensed & insured", chip1_pt: "Licenciados & seguros",
  chip2_en: "300+ five-star reviews", chip2_pt: "300+ avaliações cinco estrelas",
  chip3_en: "Small groups · max 8", chip3_pt: "Grupos pequenos · máx. 8",
  colExplore_en: "Explore", colExplore_pt: "Explorar",
  colExperiences_en: "Experiences", colExperiences_pt: "Experiências",
  colContact_en: "Say olá", colContact_pt: "Diga olá",
  rightsPrefix_en: "©", rightsPrefix_pt: "©",
  rightsSuffix_en: "Based in Aveiro, Portugal.", rightsSuffix_pt: "Sediados em Aveiro, Portugal.",
  obrigado_en: "Obrigado · Thank you", obrigado_pt: "Obrigado · Thank you",
  tripadvisorLinkText_en: "Read the reviews on TripAdvisor",
  tripadvisorLinkText_pt: "Ler as avaliações no TripAdvisor",
};

/* ────────────────────────────────────────────────────────────────────────
   Run the migration.
   ──────────────────────────────────────────────────────────────────────── */

async function run() {
  console.log("");
  console.log(`Migrating to Sanity project: ${PROJECT_ID} / dataset: ${DATASET}`);
  console.log("");

  console.log("→ Company + trust (singletons)");
  await upsert(COMPANY);
  await upsert(TRUST);

  console.log("");
  console.log("→ Founders (with photos)");
  for (const f of FOUNDERS) {
    const photo = await uploadImage(f._photoPath);
    const doc = { ...f };
    delete doc._photoPath;
    if (photo) doc.photo = photo;
    await upsert(doc);
  }

  console.log("");
  console.log("→ FAQs");
  for (const f of FAQS) {
    await upsert({
      _id: `faq-${f.id}`,
      _type: "faq",
      order: f.order,
      questionEn: f.questionEn,
      questionPt: f.questionPt,
      answerEn: f.answerEn,
      answerPt: f.answerPt,
    });
  }

  console.log("");
  console.log("→ Reviews");
  for (const r of REVIEWS) {
    await upsert({
      _id: `review-${r.id}`,
      _type: "review",
      order: r.order,
      authorName: r.authorName,
      authorMeta: r.authorMeta,
      rating: r.rating,
      quoteEn: r.quoteEn,
      quotePt: r.quotePt,
    });
  }

  console.log("");
  console.log("→ Experiences (with hero photos + galleries)");
  for (const e of EXPERIENCES) {
    const heroPhoto = await uploadImage(e.heroPhoto);
    const gallery = await uploadImages(e.gallery);
    const doc = {
      _id: `experience-${e.slug}`,
      _type: "experience",
      slug: { _type: "slug", current: e.slug },
      order: e.order,
      featured: e.featured,
      category: e.category,
      categoryLabelEn: e.categoryLabelEn,
      categoryLabelPt: e.categoryLabelPt,
      nameEn: e.nameEn,
      namePt: e.namePt,
      shortEn: e.shortEn,
      shortPt: e.shortPt,
      oneLinerEn: e.oneLinerEn,
      oneLinerPt: e.oneLinerPt,
      durationEn: e.durationEn,
      durationPt: e.durationPt,
      includedEn: e.includedEn,
      includedPt: e.includedPt,
      priceNoteEn: e.priceNoteEn,
      priceNotePt: e.priceNotePt,
    };
    if (e.addOnsEn) doc.addOnsEn = e.addOnsEn;
    if (e.addOnsPt) doc.addOnsPt = e.addOnsPt;
    if (e.pressSource) doc.pressSource = e.pressSource;
    if (e.pressUrl) doc.pressUrl = e.pressUrl;
    if (e.pressQuoteEn) doc.pressQuoteEn = e.pressQuoteEn;
    if (e.pressQuotePt) doc.pressQuotePt = e.pressQuotePt;
    if (heroPhoto) doc.heroPhoto = heroPhoto;
    if (gallery && gallery.length) doc.gallery = gallery;
    await upsert(doc);
  }

  console.log("");
  console.log("→ Page singletons");
  for (const doc of [
    HOME_PAGE,
    ABOUT_PAGE,
    FAQ_PAGE,
    CONTACT_PAGE,
    EXPERIENCES_INDEX_PAGE,
    EXPERIENCE_DETAIL_PAGE,
    SITE_META,
    NAV,
    FOOTER,
  ]) {
    await upsert(doc);
  }

  console.log("");
  console.log("✓ Migration complete.");
  console.log("");
  console.log("  Next steps:");
  console.log("    · Open the Studio: https://sterna-aveiro.sanity.studio");
  console.log("    · Verify everything looks right");
  console.log("    · Run `npm run build` locally to smoke-test the site");
  console.log("");
}

run().catch((err) => {
  console.error("");
  console.error("✗ Migration failed:");
  console.error(err);
  process.exit(1);
});
