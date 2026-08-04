export const site = {
  name: "Mios Tech",
  url: "https://www.mios.pt",
  email: "hello@miostec.com",
  whatsapp: "14074295155",
  whatsappDisplay: "+1 407 429 5155",
  social: {
    linkedin: "https://www.linkedin.com/company/miostech",
    instagram: "https://www.instagram.com/miostech",
  },
};

export const miosGroup = [
  { name: "Dine Mouse", url: "https://dinemouse.com" },
  // { name: "Mios Academy", url: "https://miosacademy.com" },
  { name: "LoopSale", url: "https://loopsale.com.br" },
  { name: "NuvFit", url: "https://www.nuvfit.app" },
];

export type Partner = {
  name: string;
  logo?: string;
  scale?: number;
  /** Short one-line summary of the project delivered for this client. */
  summary?: string;
};

export const partners: Partner[] = [
  {
    name: "Swift",
    logo: "/partners/swift.png",
    summary:
      "IA para otimizar a escala das lojas, mais NPS, menos horas extra e menos quebras de interjornada.",
  },
  {
    name: "Konica Minolta",
    logo: "/partners/konica.png",
    summary:
      "Plataforma interna de gestão de vendas para as operações de Portugal e Espanha.",
  },
  {
    name: "Red Canids",
    logo: "/partners/RedCanids.png",
    summary:
      "Plataforma de troca de pontos e e-commerce para assinantes, movimentando mais de R$ 10 milhões por ano.",
  },
  {
    name: "JMD Urbanismo",
    logo: "/partners/jmdurbanismo.png",
    scale: 0.62,
    summary:
      "Rede de sistemas internos e portal para os residentes dos condomínios JMD.",
  },
  {
    name: "Sporting CP",
    logo: "/partners/sporting.png",
    scale: 1.15,
    summary:
      "Cinco plataformas internas do clube, incluindo a venda de bilhetes da UEFA Champions League.",
  },
];

export type PortfolioItem = {
  name: string;
  category: string;
  url: string;
  /** Case-study slug under /{lang}/apresentacao/{slug}, when one exists. */
  slug?: string;
};

export const portfolio: PortfolioItem[] = [
  {
    name: "Dine Mouse",
    category: "Web & Mobile · Concierge",
    url: "https://dinemouse.com",
    slug: "dine-mouse",
  },
  {
    name: "Dome",
    category: "Plataforma · Creators",
    url: "https://www.dome.app.br",
    slug: "dome",
  },
  {
    name: "Mios Academy",
    category: "Plataforma · Educação",
    url: "https://miosacademy.com",
    slug: "mios-academy",
  },
];

export const serviceSlugs = [
  "outsourcing",
  "software-development",
  "mobile-development",
  "business-automation",
  "ai-development",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export function localePath(lang: string, path = "") {
  const clean = path.startsWith("/") ? path : path ? `/${path}` : "";
  return `/${lang}${clean}`;
}

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
