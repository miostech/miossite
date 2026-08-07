export type TeamMember = {
  name: string;
  role: string;
  photo: string;
  lead?: boolean;
  bio?: string;
};

// Roster from the company pitch. Photos are optional: TeamAvatar falls back to
// a monogram until a file exists at the given path (public/team/<slug>.jpg).
export const team: TeamMember[] = [
  {
    name: "Oscar Silva",
    role: "CTO & Sócio-fundador",
    photo: "/team/oscar.jpg",
    lead: true,
    bio: "Engenheiro de software, especialista em IA e Machine Learning.",
  },
  {
    name: "Camila Mota",
    role: "CEO & Sócia-fundadora",
    photo: "/team/camila.jpg",
    lead: true,
    bio: "Engenheira de software iOS.",
  },
  {
    name: "Diego Giovanetti",
    role: "CVO & Sócio",
    photo: "/team/diego.jpg",
    lead: true,
    bio: "Engenheiro de software.",
  },
  { name: "Kaylani França", role: "Designer UX/UI", photo: "/team/kaylani.jpg" },
  {
    name: "Gabriel Blanco",
    role: "Desenvolvedor Full Stack",
    photo: "/team/gabriel.jpg",
  },
  {
    name: "Wagner Ramos",
    role: "Product Designer · UX/UI Sênior",
    photo: "/team/wagner.jpg",
  },
  {
    name: "Bruno Paulon",
    role: "Desenvolvedor Front-End",
    photo: "/team/bruno.jpg",
  },
  { name: "Luciana Nascimento", role: "Consultora", photo: "/team/luciana.jpg" },
  { name: "Felipe Mungo", role: "Consultor", photo: "/team/felipe.jpg" },
  {
    name: "Jhennyfer Cichaseski",
    role: "Desenvolvedora Full Stack",
    photo: "/team/jhennyfer.jpg",
  },
];
