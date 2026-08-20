import type { Lang } from "./i18n";

export const company = {
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
  address: {
    city: "Aveiro",
    region: "Centro",
    country: "Portugal",
  },
  maxGroupSize: 8,
};

type NavLink = { key: string; hrefEn: string; hrefPt: string };
export const navKeys: NavLink[] = [
  { key: "home", hrefEn: "/", hrefPt: "/pt/" },
  { key: "experiences", hrefEn: "/experiences/", hrefPt: "/pt/experiences/" },
  { key: "about", hrefEn: "/about/", hrefPt: "/pt/about/" },
  { key: "faq", hrefEn: "/faq/", hrefPt: "/pt/faq/" },
  { key: "contact", hrefEn: "/contact/", hrefPt: "/pt/contact/" },
];

export function href(link: NavLink, lang: Lang): string {
  return lang === "pt" ? link.hrefPt : link.hrefEn;
}

export function path(seg: string, lang: Lang): string {
  const clean = seg.startsWith("/") ? seg : `/${seg}`;
  if (lang === "en") return clean;
  if (clean === "/") return "/pt/";
  return `/pt${clean}`;
}

export const founders = [
  {
    slug: "jenna",
    name: "Jenna",
    role: { en: "Concierge & Guide", pt: "Concierge & Guia" },
    origin: {
      en: "USA → Aveiro, 2025",
      pt: "EUA → Aveiro, 2025",
    },
    line: {
      en: "Met Carlos on the Camino for her 40th birthday. Fell in love with Portugal, and Aveiro in particular. Moved here in 2025 to live the life she kept dreaming about.",
      pt: "Conheceu o Carlos no Caminho, no seu 40º aniversário. Apaixonou-se por Portugal, e por Aveiro em particular. Mudou-se para cá em 2025 para viver a vida que sempre sonhou.",
    },
    photo: "/uploads/team/jenna.jpg",
  },
  {
    slug: "carlos",
    name: "Carlos",
    role: { en: "Local Historian & Cook", pt: "Historiador Local & Cozinheiro" },
    origin: {
      en: "Aveiro, born & raised · 52 years",
      pt: "Aveiro, nascido e criado · 52 anos",
    },
    line: {
      en: "Aveiro is his hometown. When he isn't guiding on the Camino de Santiago, he's showing friends around his city, from hidden salt pans to his mom's kitchen.",
      pt: "Aveiro é a sua terra. Quando não está a guiar no Caminho de Santiago, está a mostrar a sua cidade a amigos, das marinhas de sal escondidas à cozinha da mãe.",
    },
    photo: "/uploads/team/carlos.jpg",
  },
  {
    slug: "sandra",
    name: "Sandra",
    role: {
      en: "Master Guide, 300+ ⭐⭐⭐⭐⭐",
      pt: "Guia Sénior, 300+ ⭐⭐⭐⭐⭐",
    },
    origin: {
      en: "Aveiro region, decades in tourism",
      pt: "Região de Aveiro, décadas no turismo",
    },
    line: {
      en: "Grew up just north of Aveiro. Two decades of walking, food, and boat experiences. Married to one of Carlos's oldest childhood friends. Connects history to curious people, on land and on water.",
      pt: "Cresceu a norte de Aveiro. Duas décadas de passeios a pé, experiências gastronómicas e passeios de barco. Casada com um dos amigos de infância mais antigos do Carlos. Liga a história a pessoas curiosas, em terra e na água.",
    },
    photo: "/uploads/team/sandra.jpg",
  },
];

export const trustBadges = [
  {
    en: "Licensed & insured",
    pt: "Licenciados & seguros",
  },
  {
    en: "300+ five-star reviews",
    pt: "300+ avaliações cinco estrelas",
  },
  {
    en: "Small groups (max 8)",
    pt: "Grupos pequenos (máx. 8)",
  },
  {
    en: "EN · PT · ES",
    pt: "EN · PT · ES",
  },
];
