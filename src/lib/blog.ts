import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { locales, type Locale } from "@/i18n/config";

export type BlogBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export type BlogLocaleContent = {
  title: string;
  excerpt: string;
  body: BlogBlock[];
};

export type BlogSource = {
  label: string;
  url: string;
};

export type BlogCategory =
  | "ai"
  | "engineering"
  | "teams"
  | "operations"
  | "mobile";

export type BlogPost = {
  slug: string;
  date: string;
  readingMinutes: number;
  category: BlogCategory;
  content: Record<Locale, BlogLocaleContent>;
  sources: BlogSource[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "enterprise-ai-agents-pilots-to-production",
    date: "2026-07-02",
    readingMinutes: 6,
    category: "ai",
    sources: [
      {
        label: "Gartner, Predicts over 40% of agentic AI projects canceled by 2027",
        url: "https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027",
      },
      {
        label: "McKinsey, The State of AI",
        url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
      },
    ],
    content: {
      en: {
        title: "Enterprise AI agents in 2026: the gap between pilots and production",
        excerpt:
          "Almost every enterprise app now ships with an AI agent, yet only about a third run one in production. Here is what separates the teams that scale from the ones that stall.",
        body: [
          {
            type: "paragraph",
            text: "AI agents moved from demo to default in 2026. According to Gartner, roughly 80% of enterprise applications shipped or updated in the first quarter of 2026 embed at least one AI agent, up from about a third in 2024. The question is no longer whether to deploy an agent, but which workflows actually justify the operating cost.",
          },
          {
            type: "heading",
            text: "Adoption is near universal, production is not",
          },
          {
            type: "paragraph",
            text: "McKinsey's State of AI research found that a large majority of organizations now use AI in at least one business function, yet only around a quarter are scaling agentic AI anywhere in the company. Independent estimates put close to a third of enterprises running at least one agent in live production, with banking and insurance leading and healthcare and government still catching up.",
          },
          {
            type: "paragraph",
            text: "The lesson is simple: standing up an impressive pilot takes a sprint. Making it reliable, auditable, and safe enough to trust with real customers and real money is the hard part.",
          },
          {
            type: "heading",
            text: "Why agentic projects stall",
          },
          {
            type: "paragraph",
            text: "Gartner projects that more than 40% of agentic AI projects will be canceled by the end of 2027, driven by unclear ROI, escalating costs, and weak risk controls. The bottleneck is rarely the model. The models are good enough. What stalls deployments is governance, evaluation, and data quality.",
          },
          {
            type: "heading",
            text: "What the teams that scale do differently",
          },
          {
            type: "list",
            items: [
              "They pick workflows with a measurable outcome before writing any code.",
              "They name a clear owner accountable for the agent in production.",
              "They invest in evaluation and guardrails, not just prompts.",
              "They treat data quality as a prerequisite, not an afterthought.",
            ],
          },
          {
            type: "paragraph",
            text: "Our take at Mios Tech: start narrow, instrument everything, and expand only once an agent has earned trust in production. Agentic AI rewards operational discipline far more than raw enthusiasm.",
          },
        ],
      },
      pt: {
        title: "Agentes de IA nas empresas em 2026: o abismo entre piloto e produção",
        excerpt:
          "Quase todo aplicativo corporativo já vem com um agente de IA, mas só cerca de um terço roda em produção. Veja o que separa quem escala de quem trava.",
        body: [
          {
            type: "paragraph",
            text: "Os agentes de IA saíram do demo e viraram padrão em 2026. Segundo a Gartner, cerca de 80% dos aplicativos corporativos lançados ou atualizados no primeiro trimestre de 2026 já embarcam pelo menos um agente de IA, ante um terço em 2024. A pergunta deixou de ser se vale a pena usar um agente, e passou a ser quais fluxos de fato justificam o custo de operá-lo.",
          },
          {
            type: "heading",
            text: "A adoção é quase universal, a produção não",
          },
          {
            type: "paragraph",
            text: "A pesquisa State of AI da McKinsey mostra que a grande maioria das organizações já usa IA em pelo menos uma função de negócio, mas só cerca de um quarto está escalando IA agêntica em algum lugar da empresa. Estimativas independentes apontam que perto de um terço das empresas roda ao menos um agente em produção, com bancos e seguradoras à frente e saúde e governo ainda correndo atrás.",
          },
          {
            type: "paragraph",
            text: "A lição é simples: montar um piloto impressionante leva um sprint. Torná-lo confiável, auditável e seguro o suficiente para lidar com clientes e dinheiro de verdade é a parte difícil.",
          },
          {
            type: "heading",
            text: "Por que os projetos agênticos travam",
          },
          {
            type: "paragraph",
            text: "A Gartner projeta que mais de 40% dos projetos de IA agêntica serão cancelados até o fim de 2027, por ROI incerto, custos crescentes e controles de risco frágeis. O gargalo raramente é o modelo. Os modelos já são bons o bastante. O que trava a implantação é governança, avaliação e qualidade dos dados.",
          },
          {
            type: "heading",
            text: "O que quem escala faz de diferente",
          },
          {
            type: "list",
            items: [
              "Escolhe fluxos com um resultado mensurável antes de escrever qualquer código.",
              "Define um responsável claro por manter o agente em produção.",
              "Investe em avaliação e proteções, não só em prompts.",
              "Trata qualidade de dados como pré-requisito, não como detalhe.",
            ],
          },
          {
            type: "paragraph",
            text: "Nossa leitura na Mios Tech: comece estreito, instrumente tudo e só expanda quando o agente conquistar confiança em produção. IA agêntica premia disciplina operacional muito mais do que entusiasmo.",
          },
        ],
      },
      es: {
        title: "Agentes de IA en la empresa en 2026: la brecha entre el piloto y la producción",
        excerpt:
          "Casi toda aplicación empresarial ya incluye un agente de IA, pero solo cerca de un tercio corre uno en producción. Esto es lo que separa a quienes escalan de quienes se estancan.",
        body: [
          {
            type: "paragraph",
            text: "En 2026 los agentes de IA pasaron del demo a ser el estándar. Según Gartner, alrededor del 80% de las aplicaciones empresariales lanzadas o actualizadas en el primer trimestre de 2026 incorporan al menos un agente de IA, frente a un tercio en 2024. La pregunta ya no es si conviene desplegar un agente, sino qué flujos justifican realmente el costo de operarlo.",
          },
          {
            type: "heading",
            text: "La adopción es casi universal, la producción no",
          },
          {
            type: "paragraph",
            text: "La investigación State of AI de McKinsey encontró que la gran mayoría de las organizaciones ya usa IA en al menos una función de negocio, pero solo cerca de un cuarto está escalando IA agéntica en algún punto de la empresa. Estimaciones independientes sitúan cerca de un tercio de las empresas con al menos un agente en producción, con banca y seguros a la cabeza y salud y gobierno todavía poniéndose al día.",
          },
          {
            type: "paragraph",
            text: "La lección es simple: montar un piloto impresionante toma un sprint. Hacerlo confiable, auditable y seguro para operar con clientes y dinero real es la parte difícil.",
          },
          {
            type: "heading",
            text: "Por qué se estancan los proyectos agénticos",
          },
          {
            type: "paragraph",
            text: "Gartner proyecta que más del 40% de los proyectos de IA agéntica se cancelarán antes de fin de 2027, por un ROI poco claro, costos crecientes y controles de riesgo débiles. El cuello de botella rara vez es el modelo. Los modelos ya son suficientemente buenos. Lo que frena el despliegue es la gobernanza, la evaluación y la calidad de los datos.",
          },
          {
            type: "heading",
            text: "Qué hace distinto quien sí escala",
          },
          {
            type: "list",
            items: [
              "Elige flujos con un resultado medible antes de escribir una línea de código.",
              "Nombra a un responsable claro del agente en producción.",
              "Invierte en evaluación y salvaguardas, no solo en prompts.",
              "Trata la calidad de los datos como requisito, no como detalle.",
            ],
          },
          {
            type: "paragraph",
            text: "Nuestra lectura en Mios Tech: empieza acotado, instrumenta todo y expande solo cuando el agente se gane la confianza en producción. La IA agéntica premia la disciplina operativa mucho más que el entusiasmo.",
          },
        ],
      },
    },
  },
  {
    slug: "ai-in-software-development-adoption-vs-trust",
    date: "2026-06-18",
    readingMinutes: 5,
    category: "engineering",
    sources: [
      {
        label: "Stack Overflow Developer Survey 2025",
        url: "https://survey.stackoverflow.co/2025/",
      },
      {
        label: "METR, Measuring the impact of AI on experienced developers",
        url: "https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/",
      },
    ],
    content: {
      en: {
        title: "AI in software development: adoption is up, trust is down",
        excerpt:
          "The 2025 Stack Overflow survey of nearly 50,000 developers reveals a paradox: more engineers use AI than ever, and fewer of them trust it. What that means for how you build.",
        body: [
          {
            type: "paragraph",
            text: "In its 2025 survey of nearly 50,000 developers across 177 countries, Stack Overflow found that 84% now use or plan to use AI tools, up from 76% a year earlier, and 51% of professionals use them daily. Adoption has essentially become the default.",
          },
          {
            type: "heading",
            text: "The trust gap",
          },
          {
            type: "paragraph",
            text: "Sentiment is moving the other way. Favorable opinion of AI tools fell from over 70% in 2023 and 2024 to about 60% in 2025. More developers now actively distrust the accuracy of AI output (46%) than trust it (33%), and only 3% say they highly trust it. The most experienced engineers are the most cautious.",
          },
          {
            type: "paragraph",
            text: "The top frustration, cited by 66% of developers, is AI answers that are almost right but not quite, which leads directly to the second: debugging AI-generated code that takes more time than writing it by hand.",
          },
          {
            type: "heading",
            text: "Faster is not always faster",
          },
          {
            type: "paragraph",
            text: "A 2025 study by METR found that experienced open-source developers were actually 19% slower on familiar tasks when using AI tools, even though they felt faster. Perceived speed and real speed are not the same thing, especially on code you already know well.",
          },
          {
            type: "heading",
            text: "How we use AI at Mios Tech",
          },
          {
            type: "list",
            items: [
              "AI accelerates the first draft; senior review still owns what ships.",
              "We lean on AI for search, docs, and tests, and stay careful on architecture and deployment.",
              "We keep a human accountable for every change that reaches production.",
            ],
          },
          {
            type: "paragraph",
            text: "AI is a powerful assistant, not a substitute for engineering judgment. The teams that win pair automation with trusted human oversight instead of choosing one over the other.",
          },
        ],
      },
      pt: {
        title: "IA no desenvolvimento de software: a adoção sobe, a confiança cai",
        excerpt:
          "A pesquisa Stack Overflow 2025, com quase 50 mil desenvolvedores, revela um paradoxo: mais gente usa IA do que nunca, e menos gente confia nela. O que isso muda na forma de construir.",
        body: [
          {
            type: "paragraph",
            text: "Na pesquisa de 2025 com quase 50 mil desenvolvedores em 177 países, o Stack Overflow constatou que 84% já usam ou pretendem usar ferramentas de IA, ante 76% no ano anterior, e 51% dos profissionais as usam diariamente. A adoção virou praticamente o padrão.",
          },
          {
            type: "heading",
            text: "O abismo de confiança",
          },
          {
            type: "paragraph",
            text: "O sentimento anda no sentido oposto. A opinião favorável sobre ferramentas de IA caiu de mais de 70% em 2023 e 2024 para cerca de 60% em 2025. Hoje mais desenvolvedores desconfiam da precisão da IA (46%) do que confiam (33%), e apenas 3% dizem confiar muito. Os engenheiros mais experientes são os mais cautelosos.",
          },
          {
            type: "paragraph",
            text: "A maior frustração, citada por 66% dos desenvolvedores, são respostas da IA que estão quase certas, mas não totalmente, o que leva direto à segunda: depurar código gerado por IA que consome mais tempo do que escrever à mão.",
          },
          {
            type: "heading",
            text: "Mais rápido nem sempre é mais rápido",
          },
          {
            type: "paragraph",
            text: "Um estudo de 2025 da METR concluiu que desenvolvedores experientes de código aberto ficaram 19% mais lentos em tarefas familiares ao usar IA, mesmo se sentindo mais rápidos. Velocidade percebida e velocidade real não são a mesma coisa, ainda mais em código que você já domina.",
          },
          {
            type: "heading",
            text: "Como usamos IA na Mios Tech",
          },
          {
            type: "list",
            items: [
              "A IA acelera o primeiro rascunho; a revisão sênior decide o que vai para produção.",
              "Apoiamo-nos em IA para busca, documentação e testes, e mantemos cuidado em arquitetura e deploy.",
              "Sempre há um humano responsável por cada mudança que chega à produção.",
            ],
          },
          {
            type: "paragraph",
            text: "A IA é um assistente poderoso, não um substituto do julgamento de engenharia. Quem vence combina automação com supervisão humana confiável, em vez de escolher um em detrimento do outro.",
          },
        ],
      },
      es: {
        title: "IA en el desarrollo de software: sube la adopción, baja la confianza",
        excerpt:
          "La encuesta Stack Overflow 2025, con casi 50.000 desarrolladores, revela una paradoja: más gente usa IA que nunca y menos confía en ella. Qué significa para tu forma de construir.",
        body: [
          {
            type: "paragraph",
            text: "En su encuesta de 2025 a casi 50.000 desarrolladores de 177 países, Stack Overflow encontró que el 84% ya usa o planea usar herramientas de IA, frente al 76% del año anterior, y el 51% de los profesionales las usa a diario. La adopción se volvió prácticamente el estándar.",
          },
          {
            type: "heading",
            text: "La brecha de confianza",
          },
          {
            type: "paragraph",
            text: "El sentimiento va en la dirección contraria. La opinión favorable sobre las herramientas de IA cayó de más del 70% en 2023 y 2024 a cerca del 60% en 2025. Hoy más desarrolladores desconfían de la precisión de la IA (46%) que los que confían (33%), y solo el 3% dice confiar mucho. Los ingenieros más experimentados son los más cautelosos.",
          },
          {
            type: "paragraph",
            text: "La mayor frustración, citada por el 66% de los desarrolladores, son las respuestas de IA que están casi bien, pero no del todo, lo que lleva directo a la segunda: depurar código generado por IA que toma más tiempo que escribirlo a mano.",
          },
          {
            type: "heading",
            text: "Más rápido no siempre es más rápido",
          },
          {
            type: "paragraph",
            text: "Un estudio de 2025 de METR concluyó que los desarrolladores experimentados de código abierto fueron 19% más lentos en tareas conocidas al usar IA, aunque se sintieran más rápidos. La velocidad percibida y la real no son lo mismo, sobre todo en código que ya dominas.",
          },
          {
            type: "heading",
            text: "Cómo usamos IA en Mios Tech",
          },
          {
            type: "list",
            items: [
              "La IA acelera el primer borrador; la revisión sénior decide qué se publica.",
              "Nos apoyamos en IA para búsqueda, documentación y pruebas, y somos cuidadosos en arquitectura y despliegue.",
              "Siempre hay una persona responsable de cada cambio que llega a producción.",
            ],
          },
          {
            type: "paragraph",
            text: "La IA es un asistente potente, no un sustituto del criterio de ingeniería. Quien gana combina automatización con supervisión humana confiable, en lugar de elegir una sobre la otra.",
          },
        ],
      },
    },
  },
  {
    slug: "nearshoring-right-shoring-2026",
    date: "2026-05-27",
    readingMinutes: 6,
    category: "teams",
    sources: [
      {
        label: "Grand View Research, IT services outsourcing market",
        url: "https://www.grandviewresearch.com/industry-analysis/it-services-outsourcing-market",
      },
      {
        label: "Auxis & SSON, State of the GBS & Outsourcing Industry in Latin America",
        url: "https://www.auxis.com/",
      },
    ],
    content: {
      en: {
        title: "Nearshoring in 2026: why the question changed from cost to capability",
        excerpt:
          "The nearshore conversation used to be about the lowest hourly rate. In 2026 it is about senior, AI-augmented teams in the right time zone. Here is what moved.",
        body: [
          {
            type: "paragraph",
            text: "Nearshoring has entered what many now call the right-shoring era. Building a product is no longer only about the cheapest hour; it is about finding high-velocity, senior talent in a time zone that lets teams actually work together.",
          },
          {
            type: "heading",
            text: "A fast-growing market",
          },
          {
            type: "paragraph",
            text: "The Latin American IT outsourcing market was valued at roughly 70 billion dollars in 2024 and is projected to reach around 126 billion by 2030, one of the fastest trajectories in global outsourcing. Growth is fueled by a deep and expanding pool of engineers, increasingly fluent in AI and machine learning.",
          },
          {
            type: "heading",
            text: "Time zone is the real advantage",
          },
          {
            type: "paragraph",
            text: "Latin America sits within roughly zero to three hours of United States business hours, versus six to ten for Eastern Europe and ten to fourteen for much of Asia. That overlap turns handoffs into real-time collaboration, which matters more than ever in AI-era development where feedback loops are tight.",
          },
          {
            type: "paragraph",
            text: "On cost, companies typically save 40% to 60% on total employment cost compared with equivalent local hires, once benefits, taxes, and overhead are included. Satisfaction is high too: in one industry study, 87% of shared-services leaders reported being satisfied or very satisfied with their Latin American operations.",
          },
          {
            type: "heading",
            text: "From cost arbitrage to senior expertise",
          },
          {
            type: "paragraph",
            text: "The old pitch was similar quality at lower cost. The 2026 pitch is senior expertise in scarce specialties, cloud, security, data, and AI enablement, at a competitive cost. As AI raises the value of engineers who can architect and review, the smart move is fewer, stronger people, not more headcount.",
          },
          {
            type: "paragraph",
            text: "That is exactly how Mios Tech works: senior squads that embed in your team across the US, Europe, and Brazil, aligned to your hours and accountable for outcomes.",
          },
        ],
      },
      pt: {
        title: "Nearshoring em 2026: por que a pergunta mudou de custo para capacidade",
        excerpt:
          "A conversa sobre nearshore girava em torno da menor tarifa por hora. Em 2026 ela é sobre times sêniores, potencializados por IA, no fuso certo. Veja o que mudou.",
        body: [
          {
            type: "paragraph",
            text: "O nearshoring entrou no que muitos já chamam de era do right-shoring. Construir um produto deixou de ser só a hora mais barata; passou a ser encontrar talento sênior e veloz num fuso que permite ao time realmente trabalhar junto.",
          },
          {
            type: "heading",
            text: "Um mercado em rápido crescimento",
          },
          {
            type: "paragraph",
            text: "O mercado de terceirização de TI na América Latina foi avaliado em cerca de 70 bilhões de dólares em 2024 e deve chegar a cerca de 126 bilhões até 2030, uma das trajetórias mais rápidas do setor no mundo. O crescimento é impulsionado por um contingente amplo e crescente de engenheiros, cada vez mais fluentes em IA e machine learning.",
          },
          {
            type: "heading",
            text: "O fuso horário é a vantagem real",
          },
          {
            type: "paragraph",
            text: "A América Latina fica a cerca de zero a três horas do horário comercial dos Estados Unidos, contra seis a dez da Europa Oriental e dez a quatorze de boa parte da Ásia. Essa sobreposição transforma repasses em colaboração em tempo real, o que importa mais do que nunca no desenvolvimento na era da IA, com ciclos de feedback curtos.",
          },
          {
            type: "paragraph",
            text: "No custo, as empresas costumam economizar de 40% a 60% no custo total de emprego frente a contratações locais equivalentes, considerando benefícios, impostos e encargos. A satisfação também é alta: em um estudo do setor, 87% dos líderes de serviços compartilhados se disseram satisfeitos ou muito satisfeitos com suas operações na América Latina.",
          },
          {
            type: "heading",
            text: "De arbitragem de custo a expertise sênior",
          },
          {
            type: "paragraph",
            text: "O discurso antigo era qualidade parecida por menos. O discurso de 2026 é expertise sênior em especialidades escassas, como cloud, segurança, dados e habilitação de IA, a um custo competitivo. Como a IA aumenta o valor de quem sabe arquitetar e revisar, o movimento inteligente é ter gente mais forte, não mais gente.",
          },
          {
            type: "paragraph",
            text: "É exatamente assim que a Mios Tech trabalha: squads sênior que se integram ao seu time nos EUA, Europa e Brasil, alinhados ao seu horário e responsáveis pelo resultado.",
          },
        ],
      },
      es: {
        title: "Nearshoring en 2026: por qué la pregunta pasó del costo a la capacidad",
        excerpt:
          "La conversación sobre nearshore giraba en torno a la tarifa por hora más baja. En 2026 se trata de equipos sénior, potenciados por IA, en la zona horaria correcta. Esto es lo que cambió.",
        body: [
          {
            type: "paragraph",
            text: "El nearshoring entró en lo que muchos ya llaman la era del right-shoring. Construir un producto dejó de ser solo la hora más barata; ahora se trata de encontrar talento sénior y veloz en una zona horaria que permita al equipo trabajar de verdad en conjunto.",
          },
          {
            type: "heading",
            text: "Un mercado en rápido crecimiento",
          },
          {
            type: "paragraph",
            text: "El mercado de tercerización de TI en América Latina se valoró en cerca de 70.000 millones de dólares en 2024 y se proyecta que alcance unos 126.000 millones para 2030, una de las trayectorias más rápidas del sector a nivel mundial. El crecimiento se apoya en un grupo amplio y creciente de ingenieros, cada vez más fluidos en IA y machine learning.",
          },
          {
            type: "heading",
            text: "La zona horaria es la ventaja real",
          },
          {
            type: "paragraph",
            text: "América Latina está a unas cero a tres horas del horario laboral de Estados Unidos, frente a seis a diez de Europa del Este y diez a catorce de buena parte de Asia. Ese solapamiento convierte los traspasos en colaboración en tiempo real, algo que importa más que nunca en el desarrollo de la era de la IA, con ciclos de feedback cortos.",
          },
          {
            type: "paragraph",
            text: "En costos, las empresas suelen ahorrar entre 40% y 60% del costo total de empleo frente a contrataciones locales equivalentes, considerando beneficios, impuestos y cargas. La satisfacción también es alta: en un estudio del sector, el 87% de los líderes de servicios compartidos se declararon satisfechos o muy satisfechos con sus operaciones en América Latina.",
          },
          {
            type: "heading",
            text: "Del arbitraje de costos a la experiencia sénior",
          },
          {
            type: "paragraph",
            text: "El discurso antiguo era calidad parecida a menor costo. El de 2026 es experiencia sénior en especialidades escasas, como cloud, seguridad, datos y habilitación de IA, a un costo competitivo. Como la IA eleva el valor de quien sabe diseñar y revisar, el movimiento inteligente es gente más fuerte, no más gente.",
          },
          {
            type: "paragraph",
            text: "Así trabaja exactamente Mios Tech: squads sénior que se integran a tu equipo en EE. UU., Europa y Brasil, alineados a tu horario y responsables del resultado.",
          },
        ],
      },
    },
  },
  {
    slug: "hyperautomation-enterprise-2026",
    date: "2026-05-06",
    readingMinutes: 5,
    category: "operations",
    sources: [
      {
        label: "Gartner, 30% of enterprises will automate more than half of network activities by 2026",
        url: "https://www.gartner.com/en/newsroom/press-releases/2024-09-18-gartner-says-30-percent-of-enterprises-will-automate-more-than-half-of-their-network-activities-by-2026",
      },
    ],
    content: {
      en: {
        title: "Hyperautomation in 2026: a boardroom mandate, not a buzzword",
        excerpt:
          "Automation graduated from isolated tasks to entire business processes. Gartner keeps it a priority for 90% of large enterprises, yet fewer than 20% measure it well.",
        body: [
          {
            type: "paragraph",
            text: "Hyperautomation is the discipline of combining several technologies, AI, machine learning, robotic process automation, process mining, and event-driven architecture, to automate as much of a business process as possible. In 2026 it has moved from analyst slides to boardroom KPIs.",
          },
          {
            type: "heading",
            text: "The numbers behind the shift",
          },
          {
            type: "paragraph",
            text: "Gartner reports that hyperautomation remains a priority for around 90% of large enterprises. It also projects that by 2026, 30% of enterprises will automate more than half of their network activities, up from under 10% in mid-2023. The direction of travel is clear.",
          },
          {
            type: "heading",
            text: "The measurement gap",
          },
          {
            type: "paragraph",
            text: "Here is the catch: fewer than 20% of organizations have mastered how to measure their hyperautomation initiatives. Without clear metrics, it is hard to know which automations create value and which quietly add cost and complexity.",
          },
          {
            type: "heading",
            text: "From automating tasks to automating processes",
          },
          {
            type: "paragraph",
            text: "The real shift is from automating isolated tasks to automating end-to-end processes, from customer onboarding to invoice reconciliation to regulatory reporting. Teams that lead see faster cycle times, fewer errors, and people redeployed to higher-value work.",
          },
          {
            type: "list",
            items: [
              "Map your top processes before buying tools; process mining makes this affordable.",
              "Define the metric that proves value before you automate.",
              "Build governance early, so automation stays auditable as it scales.",
            ],
          },
          {
            type: "paragraph",
            text: "At Mios Tech we treat automation as a strategy question, not just a tooling one. We connect the systems you already run and automate the manual work that slows your team down, with the instrumentation to prove it worked.",
          },
        ],
      },
      pt: {
        title: "Hiperautomação em 2026: mandato de diretoria, não moda passageira",
        excerpt:
          "A automação saiu de tarefas isoladas para processos inteiros. A Gartner a mantém como prioridade para 90% das grandes empresas, mas menos de 20% conseguem medi-la bem.",
        body: [
          {
            type: "paragraph",
            text: "Hiperautomação é a disciplina de combinar várias tecnologias, IA, machine learning, automação robótica de processos (RPA), process mining e arquitetura orientada a eventos, para automatizar o máximo possível de um processo de negócio. Em 2026 ela saiu dos slides de analistas e virou KPI de diretoria.",
          },
          {
            type: "heading",
            text: "Os números por trás da virada",
          },
          {
            type: "paragraph",
            text: "A Gartner aponta que a hiperautomação segue como prioridade para cerca de 90% das grandes empresas. E projeta que, até 2026, 30% das empresas automatizarão mais da metade de suas atividades de rede, ante menos de 10% em meados de 2023. A direção é clara.",
          },
          {
            type: "heading",
            text: "A lacuna de medição",
          },
          {
            type: "paragraph",
            text: "Aqui está o porém: menos de 20% das organizações dominam como medir suas iniciativas de hiperautomação. Sem métricas claras, fica difícil saber quais automações geram valor e quais, silenciosamente, só adicionam custo e complexidade.",
          },
          {
            type: "heading",
            text: "De automatizar tarefas a automatizar processos",
          },
          {
            type: "paragraph",
            text: "A virada real é sair de automatizar tarefas isoladas para automatizar processos de ponta a ponta, do onboarding de clientes à conciliação de notas fiscais e ao reporte regulatório. Quem lidera vê ciclos mais curtos, menos erros e pessoas realocadas para trabalho de maior valor.",
          },
          {
            type: "list",
            items: [
              "Mapeie seus principais processos antes de comprar ferramentas; process mining barateia isso.",
              "Defina a métrica que comprova valor antes de automatizar.",
              "Construa governança desde cedo, para a automação seguir auditável ao escalar.",
            ],
          },
          {
            type: "paragraph",
            text: "Na Mios Tech tratamos automação como questão de estratégia, não só de ferramenta. Conectamos os sistemas que você já usa e automatizamos o trabalho manual que trava o time, com a instrumentação para provar que funcionou.",
          },
        ],
      },
      es: {
        title: "Hiperautomatización en 2026: mandato de directorio, no moda pasajera",
        excerpt:
          "La automatización pasó de tareas aisladas a procesos completos. Gartner la mantiene como prioridad para el 90% de las grandes empresas, pero menos del 20% la mide bien.",
        body: [
          {
            type: "paragraph",
            text: "La hiperautomatización es la disciplina de combinar varias tecnologías, IA, machine learning, automatización robótica de procesos (RPA), process mining y arquitectura orientada a eventos, para automatizar lo más posible de un proceso de negocio. En 2026 pasó de las diapositivas de los analistas a ser un KPI de directorio.",
          },
          {
            type: "heading",
            text: "Los números detrás del cambio",
          },
          {
            type: "paragraph",
            text: "Gartner señala que la hiperautomatización sigue siendo prioridad para cerca del 90% de las grandes empresas. Y proyecta que, para 2026, el 30% de las empresas automatizará más de la mitad de sus actividades de red, frente a menos del 10% a mediados de 2023. La dirección es clara.",
          },
          {
            type: "heading",
            text: "La brecha de medición",
          },
          {
            type: "paragraph",
            text: "Aquí está el detalle: menos del 20% de las organizaciones domina cómo medir sus iniciativas de hiperautomatización. Sin métricas claras, es difícil saber qué automatizaciones crean valor y cuáles, en silencio, solo suman costo y complejidad.",
          },
          {
            type: "heading",
            text: "De automatizar tareas a automatizar procesos",
          },
          {
            type: "paragraph",
            text: "El cambio real es pasar de automatizar tareas aisladas a automatizar procesos de extremo a extremo, desde el onboarding de clientes hasta la conciliación de facturas y el reporte regulatorio. Quien lidera ve ciclos más cortos, menos errores y personas reasignadas a trabajo de mayor valor.",
          },
          {
            type: "list",
            items: [
              "Mapea tus procesos clave antes de comprar herramientas; el process mining lo hace accesible.",
              "Define la métrica que prueba el valor antes de automatizar.",
              "Construye gobernanza temprano, para que la automatización siga siendo auditable al escalar.",
            ],
          },
          {
            type: "paragraph",
            text: "En Mios Tech tratamos la automatización como una cuestión de estrategia, no solo de herramientas. Conectamos los sistemas que ya usas y automatizamos el trabajo manual que frena al equipo, con la instrumentación para probar que funcionó.",
          },
        ],
      },
    },
  },
  {
    slug: "choosing-cross-platform-mobile-stack-2026",
    date: "2026-04-15",
    readingMinutes: 6,
    category: "mobile",
    sources: [
      {
        label: "Stack Overflow Developer Survey 2025",
        url: "https://survey.stackoverflow.co/2025/",
      },
      {
        label: "Kotlin Multiplatform, JetBrains",
        url: "https://www.jetbrains.com/kotlin-multiplatform/",
      },
    ],
    content: {
      en: {
        title: "Choosing a cross-platform mobile stack in 2026",
        excerpt:
          "Flutter, React Native, and Kotlin Multiplatform are all production-proven. The 2026 question is not which is best in the abstract, but which fits your team.",
        body: [
          {
            type: "paragraph",
            text: "The cross-platform debate has settled into three serious, production-proven options. The market keeps growing: cross-platform tooling was worth around 105 billion dollars in 2025 and is projected near 121 billion in 2026. For most new builds, going cross-platform is now the sensible default.",
          },
          {
            type: "heading",
            text: "The three contenders",
          },
          {
            type: "paragraph",
            text: "Flutter leads adoption, favored for consistent, pixel-perfect UI from a single codebase. React Native holds the largest talent pool, since any JavaScript or TypeScript developer can ramp up quickly, and its new architecture has narrowed the native performance gap. Kotlin Multiplatform is the fastest-growing option, roughly tripling its adoption in under two years, and is the enterprise favorite for sharing business logic while keeping fully native UI.",
          },
          {
            type: "heading",
            text: "A simple way to choose",
          },
          {
            type: "list",
            items: [
              "Choose React Native if your team already lives in React, JavaScript, or TypeScript.",
              "Choose Flutter if you are mobile-first and want a consistent, design-driven UI.",
              "Choose Kotlin Multiplatform if you are Android-heavy or want to share logic without compromising native UX.",
              "Stay fully native for graphics-intensive apps, complex AR or VR, or when every cycle of performance counts.",
            ],
          },
          {
            type: "heading",
            text: "Fit beats fashion",
          },
          {
            type: "paragraph",
            text: "There is no universally correct answer, only a correct answer for your context. Code sharing ranges from about 40% to 60% with Kotlin Multiplatform (business logic only) to 85% or more with Flutter and React Native, including UI. Hybrid setups, native for core screens and a framework for the rest, are increasingly common at scale.",
          },
          {
            type: "paragraph",
            text: "At Mios Tech we start from your team, your timeline, and your performance needs, then pick the stack that fits, rather than forcing the same tool onto every problem.",
          },
        ],
      },
      pt: {
        title: "Escolhendo uma stack mobile cross-platform em 2026",
        excerpt:
          "Flutter, React Native e Kotlin Multiplatform são todos comprovados em produção. A pergunta de 2026 não é qual é o melhor no abstrato, e sim qual combina com o seu time.",
        body: [
          {
            type: "paragraph",
            text: "O debate cross-platform se consolidou em três opções sérias e comprovadas em produção. O mercado segue crescendo: as ferramentas cross-platform valiam cerca de 105 bilhões de dólares em 2025 e devem chegar perto de 121 bilhões em 2026. Para a maioria dos projetos novos, ir de cross-platform virou o padrão sensato.",
          },
          {
            type: "heading",
            text: "Os três concorrentes",
          },
          {
            type: "paragraph",
            text: "O Flutter lidera a adoção, preferido por uma UI consistente e caprichada a partir de uma única base de código. O React Native tem o maior contingente de talento, já que qualquer desenvolvedor JavaScript ou TypeScript embarca rápido, e sua nova arquitetura reduziu a diferença de desempenho para o nativo. O Kotlin Multiplatform é o que mais cresce, praticamente triplicando a adoção em menos de dois anos, e é o queridinho corporativo para compartilhar a lógica de negócio mantendo a UI totalmente nativa.",
          },
          {
            type: "heading",
            text: "Um jeito simples de escolher",
          },
          {
            type: "list",
            items: [
              "Escolha React Native se o time já vive em React, JavaScript ou TypeScript.",
              "Escolha Flutter se você é mobile-first e quer uma UI consistente e orientada a design.",
              "Escolha Kotlin Multiplatform se você é forte em Android ou quer compartilhar lógica sem abrir mão da UX nativa.",
              "Fique no nativo para apps gráficos pesados, AR ou VR complexos, ou quando cada ciclo de desempenho conta.",
            ],
          },
          {
            type: "heading",
            text: "Encaixe vence moda",
          },
          {
            type: "paragraph",
            text: "Não existe resposta universalmente certa, só a resposta certa para o seu contexto. O compartilhamento de código vai de cerca de 40% a 60% no Kotlin Multiplatform (só lógica de negócio) a 85% ou mais no Flutter e no React Native, incluindo UI. Montagens híbridas, nativo nas telas centrais e um framework no resto, ficam cada vez mais comuns em escala.",
          },
          {
            type: "paragraph",
            text: "Na Mios Tech partimos do seu time, do seu prazo e das suas necessidades de desempenho, e então escolhemos a stack que encaixa, em vez de forçar a mesma ferramenta em todo problema.",
          },
        ],
      },
      es: {
        title: "Cómo elegir un stack móvil cross-platform en 2026",
        excerpt:
          "Flutter, React Native y Kotlin Multiplatform están todos probados en producción. La pregunta de 2026 no es cuál es mejor en abstracto, sino cuál encaja con tu equipo.",
        body: [
          {
            type: "paragraph",
            text: "El debate cross-platform se consolidó en tres opciones serias y probadas en producción. El mercado sigue creciendo: las herramientas cross-platform valían unos 105.000 millones de dólares en 2025 y se proyectan cerca de 121.000 millones en 2026. Para la mayoría de los proyectos nuevos, ir cross-platform es hoy la opción sensata por defecto.",
          },
          {
            type: "heading",
            text: "Los tres contendientes",
          },
          {
            type: "paragraph",
            text: "Flutter lidera la adopción, preferido por una UI consistente y cuidada desde una sola base de código. React Native tiene el mayor grupo de talento, ya que cualquier desarrollador JavaScript o TypeScript se incorpora rápido, y su nueva arquitectura redujo la brecha de rendimiento frente a lo nativo. Kotlin Multiplatform es el que más crece, casi triplicando su adopción en menos de dos años, y es el favorito empresarial para compartir la lógica de negocio manteniendo una UI totalmente nativa.",
          },
          {
            type: "heading",
            text: "Una forma simple de elegir",
          },
          {
            type: "list",
            items: [
              "Elige React Native si tu equipo ya vive en React, JavaScript o TypeScript.",
              "Elige Flutter si eres mobile-first y quieres una UI consistente y orientada al diseño.",
              "Elige Kotlin Multiplatform si eres fuerte en Android o quieres compartir lógica sin sacrificar la UX nativa.",
              "Quédate en nativo para apps con gráficos intensivos, AR o VR complejos, o cuando cada ciclo de rendimiento cuenta.",
            ],
          },
          {
            type: "heading",
            text: "El encaje gana a la moda",
          },
          {
            type: "paragraph",
            text: "No hay una respuesta universalmente correcta, solo la correcta para tu contexto. El código compartido va de cerca del 40% al 60% con Kotlin Multiplatform (solo lógica de negocio) al 85% o más con Flutter y React Native, incluyendo la UI. Los montajes híbridos, nativo en las pantallas centrales y un framework en el resto, son cada vez más comunes a escala.",
          },
          {
            type: "paragraph",
            text: "En Mios Tech partimos de tu equipo, tu plazo y tus necesidades de rendimiento, y entonces elegimos el stack que encaja, en lugar de forzar la misma herramienta en cada problema.",
          },
        ],
      },
    },
  },
];

const blogCategories: BlogCategory[] = [
  "ai",
  "engineering",
  "teams",
  "operations",
  "mobile",
];

const blockTypes = new Set(["heading", "paragraph", "list"]);

function isValidLocaleContent(value: unknown): value is BlogLocaleContent {
  if (typeof value !== "object" || value === null) return false;
  const content = value as Record<string, unknown>;
  if (typeof content.title !== "string") return false;
  if (typeof content.excerpt !== "string") return false;
  if (!Array.isArray(content.body)) return false;
  return content.body.every((block) => {
    if (typeof block !== "object" || block === null) return false;
    const b = block as Record<string, unknown>;
    if (typeof b.type !== "string" || !blockTypes.has(b.type)) return false;
    if (b.type === "list") return Array.isArray(b.items);
    return typeof b.text === "string";
  });
}

function isValidPost(value: unknown): value is BlogPost {
  if (typeof value !== "object" || value === null) return false;
  const post = value as Record<string, unknown>;
  if (typeof post.slug !== "string" || post.slug.length === 0) return false;
  if (typeof post.date !== "string") return false;
  if (typeof post.readingMinutes !== "number") return false;
  if (!blogCategories.includes(post.category as BlogCategory)) return false;
  if (!Array.isArray(post.sources)) return false;
  if (typeof post.content !== "object" || post.content === null) return false;
  const content = post.content as Record<string, unknown>;
  return locales.every((locale) => isValidLocaleContent(content[locale]));
}

const generatedDir = join(process.cwd(), "content", "blog");

function loadGeneratedPosts(): BlogPost[] {
  if (!existsSync(generatedDir)) return [];

  const posts: BlogPost[] = [];
  for (const file of readdirSync(generatedDir)) {
    if (!file.endsWith(".json")) continue;
    try {
      const parsed = JSON.parse(readFileSync(join(generatedDir, file), "utf8"));
      if (isValidPost(parsed)) posts.push(parsed);
    } catch {
      // Skip malformed generated files rather than break the build.
    }
  }
  return posts;
}

const curatedSlugs = new Set(blogPosts.map((post) => post.slug));
const allPosts: BlogPost[] = [
  ...blogPosts,
  ...loadGeneratedPosts().filter((post) => !curatedSlugs.has(post.slug)),
];

export const blogSlugs = allPosts.map((post) => post.slug);

export function getBlogPost(slug: string): BlogPost | undefined {
  return allPosts.find((post) => post.slug === slug);
}

export function getSortedBlogPosts(): BlogPost[] {
  return [...allPosts].sort((a, b) => b.date.localeCompare(a.date));
}

const localeTags: Record<Locale, string> = {
  en: "en-US",
  pt: "pt-BR",
  es: "es-ES",
};

export function formatBlogDate(date: string, lang: Locale): string {
  return new Intl.DateTimeFormat(localeTags[lang], {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}
