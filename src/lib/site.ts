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
  { name: "Dome", url: "https://www.dome.app.br" },
  { name: "Mios Academy", url: "https://miosacademy.com" },
  { name: "NuvFit", url: "https://www.nuvfit.app" },
];

export type Partner = {
  name: string;
  logo?: string;
  scale?: number;
};

export const partners: Partner[] = [
  { name: "Swift", logo: "/partners/swift.png" },
  { name: "Konica Minolta", logo: "/partners/konica.png" },
  { name: "Red Canids", logo: "/partners/RedCanids.png" },
  { name: "JMD Urbanismo", logo: "/partners/jmdurbanismo.png", scale: 0.62 },
];

export type PortfolioItem = {
  name: string;
  category: string;
  url: string;
};

export const portfolio: PortfolioItem[] = [
  {
    name: "Dine Mouse",
    category: "Web & Mobile · Concierge",
    url: "https://dinemouse.com",
  },
  {
    name: "Dome",
    category: "Plataforma · Creators",
    url: "https://www.dome.app.br",
  },
  {
    name: "Mios Academy",
    category: "Plataforma · Educação",
    url: "https://miosacademy.com",
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
