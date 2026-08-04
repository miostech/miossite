import type { Locale } from "@/i18n/config";

/**
 * Case-study projects shown from the presentation deck's portfolio section.
 * Prose is trilingual (draft copy — meant to be edited). Mockup images are
 * optional: when absent, the DeviceMockup renders a branded gradient
 * placeholder, so the pages work before real screenshots exist.
 */

export type ProjectCopy = {
  /** Short eyebrow shown above the title, e.g. "Plataforma · Educação". */
  category: string;
  /** One-line positioning shown in the hero. */
  tagline: string;
  challenge: string;
  solution: string;
  result: string;
};

export type ProjectMockup = {
  kind: "browser" | "phone";
  /** Optional real screenshot (public path). Falls back to the gradient. */
  image?: string;
  /** Short caption shown under the device in the gallery. */
  label?: string;
};

export type Project = {
  slug: string;
  name: string;
  /** Live site (kept as a secondary link on the case page). */
  url?: string;
  year?: string;
  /** CSS gradient used for placeholder mockups and the hero accent. */
  gradient: string;
  /** Tech / disciplines — locale-neutral. */
  stack: string[];
  mockups: ProjectMockup[];
  copy: Record<Locale, ProjectCopy>;
};

const projectList: Project[] = [
  {
    slug: "dine-mouse",
    name: "Dine Mouse",
    url: "https://dinemouse.com",
    year: "2023",
    gradient: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)",
    stack: ["Next.js", "React Native", "Node.js", "PostgreSQL", "Stripe"],
    mockups: [
      { kind: "browser", label: "Plataforma web" },
      { kind: "phone", label: "App mobile" },
    ],
    copy: {
      pt: {
        category: "Web & Mobile · Concierge",
        tagline: "Um concierge digital para experiências gastronômicas.",
        challenge:
          "O cliente precisava transformar um serviço de concierge manual, tocado por mensagens e planilhas, em um produto digital que escalasse sem perder o toque pessoal.",
        solution:
          "Desenhamos e construímos uma plataforma web e um app mobile de ponta a ponta: descoberta de experiências, reservas em tempo real e um painel para a equipe operar tudo em um só lugar.",
        result:
          "O concierge passou a atender mais clientes com a mesma equipe, com reservas centralizadas e uma experiência premium do primeiro contato à mesa.",
      },
      en: {
        category: "Web & Mobile · Concierge",
        tagline: "A digital concierge for dining experiences.",
        challenge:
          "The client needed to turn a manual concierge service — run over messages and spreadsheets — into a digital product that could scale without losing the personal touch.",
        solution:
          "We designed and built an end-to-end web platform and mobile app: experience discovery, real-time reservations, and an internal dashboard to run it all from one place.",
        result:
          "The concierge now serves more clients with the same team, with centralized bookings and a premium experience from first contact to the table.",
      },
      es: {
        category: "Web & Mobile · Concierge",
        tagline: "Un concierge digital para experiencias gastronómicas.",
        challenge:
          "El cliente necesitaba convertir un servicio de concierge manual —gestionado por mensajes y hojas de cálculo— en un producto digital capaz de escalar sin perder el trato personal.",
        solution:
          "Diseñamos y construimos una plataforma web y una app móvil de principio a fin: descubrimiento de experiencias, reservas en tiempo real y un panel interno para operarlo todo en un solo lugar.",
        result:
          "El concierge ahora atiende a más clientes con el mismo equipo, con reservas centralizadas y una experiencia premium desde el primer contacto hasta la mesa.",
      },
    },
  },
  {
    slug: "dome",
    name: "Dome",
    url: "https://www.dome.app.br",
    year: "2024",
    gradient: "linear-gradient(135deg, #1b1a15 0%, #4c1d95 100%)",
    stack: ["React Native", "Next.js", "Node.js", "PostgreSQL", "AWS"],
    mockups: [
      { kind: "phone", label: "App para creators" },
      { kind: "browser", label: "Painel de gestão" },
    ],
    copy: {
      pt: {
        category: "Plataforma · Creators",
        tagline: "A plataforma que aproxima creators e sua audiência.",
        challenge:
          "Creators precisavam de um lugar próprio para monetizar e se relacionar com a audiência, sem depender das regras e do alcance imprevisível das redes sociais.",
        solution:
          "Construímos uma plataforma mobile-first com conteúdo, assinaturas e interação direta, mais um painel para creators acompanharem métricas e receita.",
        result:
          "Creators passaram a ter um canal direto e monetizável com a comunidade, com dados claros para decidir o que produzir em seguida.",
      },
      en: {
        category: "Platform · Creators",
        tagline: "The platform that brings creators closer to their audience.",
        challenge:
          "Creators needed a home of their own to monetize and engage their audience, without depending on the shifting rules and unpredictable reach of social networks.",
        solution:
          "We built a mobile-first platform with content, subscriptions and direct interaction, plus a dashboard for creators to track metrics and revenue.",
        result:
          "Creators now have a direct, monetizable channel with their community, and clear data to decide what to produce next.",
      },
      es: {
        category: "Plataforma · Creators",
        tagline: "La plataforma que acerca a los creators y su audiencia.",
        challenge:
          "Los creators necesitaban un espacio propio para monetizar y relacionarse con su audiencia, sin depender de las reglas cambiantes y el alcance impredecible de las redes sociales.",
        solution:
          "Construimos una plataforma mobile-first con contenido, suscripciones e interacción directa, además de un panel para que los creators sigan métricas e ingresos.",
        result:
          "Los creators ahora tienen un canal directo y monetizable con su comunidad, con datos claros para decidir qué producir a continuación.",
      },
    },
  },
  {
    slug: "mios-academy",
    name: "Mios Academy",
    url: "https://miosacademy.com",
    year: "2023",
    gradient: "linear-gradient(135deg, #3b1673 0%, #6d28d9 100%)",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Mux", "Vercel"],
    mockups: [
      { kind: "browser", label: "Portal de cursos" },
      { kind: "phone", label: "App do aluno" },
    ],
    copy: {
      pt: {
        category: "Plataforma · Educação",
        tagline: "Educação em tecnologia, acessível a quem quer aprender.",
        challenge:
          "Era preciso levar conteúdo de tecnologia de alta qualidade a mais pessoas, com uma experiência de aprendizado fluida em qualquer dispositivo.",
        solution:
          "Desenvolvemos um portal de cursos com trilhas, vídeo sob demanda, progresso do aluno e área administrativa para publicar e acompanhar as turmas.",
        result:
          "Uma base sólida de ensino online, pronta para crescer em número de cursos e alunos sem retrabalho de engenharia.",
      },
      en: {
        category: "Platform · Education",
        tagline: "Tech education, accessible to anyone willing to learn.",
        challenge:
          "The goal was to bring high-quality tech content to more people, with a smooth learning experience on any device.",
        solution:
          "We built a course portal with learning tracks, on-demand video, student progress and an admin area to publish and monitor cohorts.",
        result:
          "A solid online-learning foundation, ready to grow in courses and students with no engineering rework.",
      },
      es: {
        category: "Plataforma · Educación",
        tagline: "Educación en tecnología, accesible para quien quiera aprender.",
        challenge:
          "Había que llevar contenido de tecnología de alta calidad a más personas, con una experiencia de aprendizaje fluida en cualquier dispositivo.",
        solution:
          "Desarrollamos un portal de cursos con rutas de aprendizaje, video bajo demanda, progreso del alumno y un área administrativa para publicar y seguir a los grupos.",
        result:
          "Una base sólida de enseñanza online, lista para crecer en cursos y alumnos sin retrabajo de ingeniería.",
      },
    },
  },
];

export const projects: Record<string, Project> = Object.fromEntries(
  projectList.map((p) => [p.slug, p]),
);

export const projectSlugs = projectList.map((p) => p.slug);

export function getProject(slug: string): Project | undefined {
  return projects[slug];
}
