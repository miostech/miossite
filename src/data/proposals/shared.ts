/**
 * Boilerplate shared across every proposal (currently PT-BR). Structured so
 * EN/ES variants can be added later without touching per-client data files.
 */

export const proposalShared = {
  intro: {
    greeting: "Olá,",
    body: "Bem-vindo à MIOS! Somos especialistas em criar aplicações mobile e websites de alta performance para impulsionar e aumentar o alcance e visibilidade da sua empresa. Nossa equipe combina criatividade e expertise técnica para desenvolver softwares que não apenas impressionam visualmente, mas também são comprometidos com a otimização contínua, utilizando práticas e tecnologias de ponta para maximizar a performance e conversão, e personalizamos cada projeto para refletir autenticamente a sua marca.",
  },

  mission: {
    label: "Nossa missão",
    pillars: [
      { lead: "Atender", rest: "com personalidade." },
      { lead: "Criar", rest: "com criatividade." },
      { lead: "Entregar", rest: "com qualidade." },
      { lead: "Resultados", rest: "de alta performance." },
    ],
  },

  whySoftware: {
    label: "Por que software próprio",
    quote:
      "Em um mundo digital competitivo, ter um software próprio não é apenas um status, mas sim a chave crucial para aprimorar a experiência do seu cliente e garantir o sucesso definitivo na presença online do seu negócio.",
    points: [
      "Primeiras impressões",
      "Experiência do usuário",
      "Credibilidade e confiança",
      "Responsividade",
      "Retenção de público",
      "Diferenciação competitiva",
    ],
  },

  team: {
    label: "Time",
    subtitle: "Conheça parte do nosso time que faz tudo acontecer.",
    leadership: [
      {
        name: "Camila Mota",
        role: "CEO & Sócia Fundadora · Engenheira de software iOS",
      },
      {
        name: "Oscar Silva",
        role: "CTO & Sócio Fundador · Engenheiro de software, IA & Machine Learning",
      },
      {
        name: "Diego Giovanetti",
        role: "CVO & Sócio · Engenheiro de software",
      },
    ],
    members: [
      { name: "Marta Sousa", role: "Desenvolvedora Pleno" },
      { name: "Bruno Paulon", role: "Desenvolvedor Front-End" },
      { name: "Luciana Nascimento", role: "Consultora" },
      { name: "Wagner Ramos", role: "Product Designer e UX/UI Sênior" },
      { name: "Kaylani França", role: "QA Pleno" },
      { name: "Felipe Mungo", role: "Designer UX/UI" },
      { name: "Gabriel Blanco", role: "Desenvolvedor Full Stack" },
      { name: "Samuel Clemente", role: "Gestor de redes sociais e estrategista digital" },
      { name: "Pedro", role: "Desenvolvedor Pleno" },
    ],
  },

  clients: {
    label: "Clientes",
    title: "A confiança de nossos clientes é o alicerce do nosso sucesso contínuo.",
  },

  process: {
    label: "Processo",
    title: "Como conduzimos o projeto.",
    steps: [
      "Contrato de prestação de serviços e adjudicação.",
      "Roadmap do projeto, onde definimos as prioridades de acordo com a necessidade da sua empresa.",
      "A Mios cria a interface visual do projeto, com foco na melhor experiência para o usuário.",
      "O time de devs inicia o desenvolvimento front-end e back-end, seguindo os mockups do Figma.",
      "Nossa equipe de QA realiza os testes funcionais para garantir a qualidade da aplicação.",
      "Finalizados os testes, o repositório é entregue e o produto é publicado (nas lojas, no caso de apps móveis).",
    ],
  },

  closing: {
    title: "Vamos tirar sua ideia do papel?",
    subtitle:
      "Em caso de dúvidas, fale com seu consultor de negócios ou acesse nosso site.",
  },
};

/** Standard "adjudicação" payment terms (boilerplate for the investment block). */
export const defaultPaymentTerms: string[] = [
  "O orçamento deve ser assinado até ao dia do início do nosso trabalho.",
  "Qualquer alteração dos pressupostos deste orçamento está sujeita à revisão do mesmo.",
  "Os dados de faturação, ficha de fornecedor ou qualquer outra questão burocrática devem estar resolvidos antes do início do nosso trabalho.",
  "O não pagamento da fatura dentro do prazo estipulado constitui atraso e terá os respectivos juros de mora.",
  "O não pagamento pode resultar na suspensão, temporária ou permanente, dos trabalhos a serem realizados.",
  "Os atrasos no pagamento ficam sujeitos a cobrança de juros de mora, à taxa de juro legal em vigor.",
];
