import type { Proposal } from "./types";
import { defaultPaymentTerms } from "./shared";

export const engagenow: Proposal = {
  // Slug intencionalmente não-óbvio: o link é o único controle de acesso.
  slug: "engagenow-9d4f2a",
  lang: "pt",
  client: { name: "Engagenow" },
  meta: { sentDate: "03/08/2026", validityDays: 30 },
  hero: {
    title: "Proposta Comercial",
    subtitle: "Desenvolvimento da Plataforma Engagenow",
  },
  intro:
    "É com entusiasmo que apresentamos a proposta para o desenvolvimento do Engagenow. Mais do que um software, é uma plataforma de impacto social: um ambiente multi-tenant, seguro e em conformidade legal, que liga ONGs, voluntários e beneficiários e mede o impacto gerado. Nesta fase, transformamos a visão e o design já validados num produto real, robusto e pronto para escalar, inclusive internacionalmente. Este documento detalha o que será construído, como, em quanto tempo e por que valor.",
  scopeIntro:
    "Esta proposta contempla o desenvolvimento completo do Engagenow, uma plataforma web SaaS multi-tenant para Organizações Não Governamentais. A solução conecta Beneficiários, Voluntários e ONGs pertencentes a um mesmo Grupo Controlador, com governança forte, rastreabilidade, conformidade LGPD e medição de impacto social. Diferente da fase anterior (UX/UI e documentação), esta é a construção do software em produção, seguindo a especificação técnica v3.0 do produto. O projeto é de escopo fechado, com possibilidade de ajustes ao longo do fluxo mediante alinhamento entre as partes. A plataforma nasce multilíngue (Português, Espanhol, Francês e Inglês) e com arquitetura de dados preparada para operar em qualquer país, respeitando as leis de proteção de dados de cada jurisdição de implantação. A solução é composta por três portais distintos: o Gestor Engagenow (grupo controlador), o Painel da ONG e o Portal do beneficiário/voluntário, o que representa, na prática, três produtos integrados numa só plataforma. Embora concebida no contexto social, a mesma arquitetura multi-tenant serve igualmente empresas privadas e iniciativas públicas, operando cada organização como um tenant isolado; ao longo do documento, o termo 'ONG' designa genericamente qualquer uma destas organizações.",

  solution: {
    pillars: [
      {
        title: "Portal do Beneficiário & Voluntário",
        subtitle: "Autosserviço do utilizador final",
        items: [
          "Cadastro e perfil global único",
          "Escolha de ONG e definição de papel",
          "Descoberta de projetos elegíveis (filtro automático)",
          "Inscrição e participação em ações",
          "Registo de presença (check-in / check-out)",
          "Feedback pós-ação e visão de impacto",
        ],
      },
      {
        title: "Painel da ONG",
        subtitle: "O sistema próprio de cada ONG",
        items: [
          "Sistema próprio da ONG, com a sua base de beneficiários e voluntários",
          "Aprovação de utilizadores, projetos e grupos",
          "Gestão de programas, projetos e ações",
          "Curadoria e intervenção em ações",
          "Canal de denúncias confidencial",
          "Relatórios e métricas de impacto",
          "Perfis, permissões e auditoria (LGPD)",
        ],
      },
      {
        title: "Núcleo Multi-Tenant & Segurança",
        subtitle: "Infraestrutura de confiança",
        items: [
          "Isolamento por tenant a partir do token JWT",
          "Controlo de acesso por perfil (RBAC) por ONG",
          "Criptografia em trânsito, em repouso e de campos sensíveis",
          "Conformidade LGPD/GDPR e direitos dos titulares",
          "Logs imutáveis e histórico de decisões",
          "Multilíngue (PT · ES · FR · EN) e arquitetura pronta para múltiplos países",
          "CI/CD, ambientes separados e escalabilidade multi-ONG",
        ],
      },
    ],
    flow: [
      "Utilizador cria conta (perfil global) e seleciona a ONG",
      "Define o papel (beneficiário / voluntário) e submete dados e documentos",
      "A ONG valida e aprova o vínculo (membership)",
      "A plataforma apresenta automaticamente os projetos elegíveis",
      "Utilizador inscreve-se e participa da ação aprovada",
      "Presença é registada (check-in / check-out) quando aplicável",
      "Impacto e métricas são consolidados no painel da ONG",
    ],
  },

  scope: [
    {
      title: "Fundação, Multi-Tenancy & Governança",
      intro:
        "A base da plataforma: autenticação, o modelo de propriedade dos dados (Grupo Controlador e ONGs como tenants) e o isolamento multi-tenant que garante que cada organização acede apenas ao seu próprio contexto. É a camada mais crítica de segurança e sustenta todos os módulos de negócio.",
      groups: [
        {
          title: "Autenticação & Gestão de Acessos (Keycloak IAM)",
          items: [
            "Gestão centralizada de utilizadores, papéis e permissões via Keycloak",
            "Single Sign-On (SSO) e emissão de tokens (JWT) pelo Keycloak",
            "Registo e login com perfil global único",
            "MFA (autenticação multifator) e políticas de password",
            "Recuperação de acesso, gestão de sessão e rate limiting",
          ],
        },
        {
          title: "Grupo Controlador (proprietário da plataforma)",
          items: [
            "Responsável legal pela plataforma",
            "Controlador dos dados (LGPD)",
            "Define política de privacidade e termos de uso",
            "Define padrões de segurança e regras globais de operação",
          ],
        },
        {
          title: "Organizações como Tenants (ONG, empresa privada ou iniciativa pública)",
          items: [
            "Cada tenant pode ser uma ONG, empresa privada ou iniciativa pública",
            "Cada organização tem o seu próprio sistema (workspace isolado) dentro da plataforma",
            "Gere a sua própria base de beneficiários e voluntários, separada das restantes ONGs",
            "Auto-registo e onboarding de novas ONGs na plataforma (self-service)",
            "Cada ONG pertence ao grupo controlador com autonomia operacional",
            "Valida utilizadores, projetos, grupos e ações",
            "Define critérios sociais próprios",
            "Acede apenas aos dados do seu contexto",
          ],
        },
        {
          title: "Isolamento Multi-Tenant (segurança crítica)",
          items: [
            "tenant_id extraído exclusivamente do token JWT, nunca do payload da request",
            "Middleware de validação de tenant antes de qualquer lógica de negócio",
            "Segregação lógica de dados entre ONGs",
            "Bloqueio de acesso cruzado entre tenants",
          ],
        },
        {
          title: "Controlo de Acesso (RBAC)",
          items: [
            "Papéis por ONG: beneficiário, voluntário, administração",
            "Autorização sempre validada no backend",
            "Frontend apenas ajusta a experiência (não é linha de defesa)",
          ],
        },
      ],
    },
    {
      title: "Utilizadores, Perfis & Vínculos",
      intro:
        "O modelo de utilizador separa o que é global (criado uma única vez) do que é específico de cada ONG (o vínculo/membership). Um mesmo utilizador pode participar em várias ONGs com papéis diferentes, e os dados sociais nunca são globais.",
      groups: [
        {
          title: "Perfil Global do Utilizador",
          items: [
            "Nome completo, data de nascimento, telefone e email",
            "Endereço (cidade / bairro)",
            "Número de filhos e escolaridade",
            "Habilidades e interesses",
            "Preferências de notificação",
            "Consentimentos legais (LGPD)",
          ],
        },
        {
          title: "Vínculo Utilizador ↔ ONG (Membership)",
          items: [
            "Papel: beneficiário | voluntário | admin",
            "Status: pendente | aprovado | rejeitado | suspenso",
            "Renda familiar (se aplicável) e dados sociais específicos",
            "Documentos e data de validação",
            "Responsável pela validação e observações internas",
            "Dados sociais nunca são globais, vivem no vínculo",
          ],
        },
        {
          title: "Papéis & Permissões",
          items: [
            "Beneficiário: solicitações de ajuda, inscrição em projetos, presença, feedback, denúncias",
            "Voluntário: oferecer ajuda, criar projetos e grupos, participar de ações",
            "ONG / Administração: aprovar/rejeitar, intervir, aplicar sanções, aceder a relatórios, gerir denúncias",
          ],
        },
      ],
    },
    {
      title: "Programas, Projetos & Ações",
      intro:
        "O coração operacional da plataforma. Projetos são a entidade central; podem agrupar-se em programas estratégicos e materializam-se em ações concretas, com critérios de elegibilidade configurados de forma progressiva (UX inteligente).",
      groups: [
        {
          title: "Programas (estratégico, opcional)",
          items: [
            "Criados pela ONG, de carácter contínuo",
            "Agrupam vários projetos relacionados",
            "Ex.: Programa de Alimentação Solidária",
          ],
        },
        {
          title: "Projetos (entidade central)",
          items: [
            "Campos: nome, descrição, ONG responsável, tipo, forma de execução",
            "Critérios de elegibilidade e configuração de ficha de ponto",
            "Criado pela ONG → aprovado automaticamente",
            "Criado por voluntário → status pendente de aprovação",
          ],
        },
        {
          title: "Tipos de Projeto",
          items: [
            "Doação / Distribuição (itens, quantidade, local, recorrência)",
            "Apoio Social / Companhia (frequência, duração, perfil, modo)",
            "Educação / Capacitação (vagas, cronograma, pré-requisitos, carga horária)",
            "Serviço / Mutirão (habilidades, ferramentas, riscos, equipa mínima)",
          ],
        },
        {
          title: "Critérios de Elegibilidade (UX inteligente)",
          items: [
            "Configuração progressiva: campos adicionais só aparecem quando necessário",
            "Filtros por idade, renda máxima, região e perfil específico",
            "Filtragem automática dos projetos elegíveis para cada utilizador",
          ],
        },
      ],
    },
    {
      title: "Grupos de Voluntariado",
      intro:
        "Voluntários e ONGs podem organizar-se em grupos vinculados a uma ONG, com estrutura de papéis própria e sujeitos a aprovação.",
      groups: [
        {
          title: "Criação & Aprovação",
          items: [
            "Criados por voluntários ou pela ONG",
            "Vinculados a uma ONG",
            "Passam por aprovação antes de operar",
          ],
        },
        {
          title: "Estrutura & Papéis",
          items: [
            "Líder e coordenador",
            "Membro e convidado",
            "Gestão de membros e status do grupo",
          ],
        },
      ],
    },
    {
      title: "Aprovação, Curadoria & Governança",
      intro:
        "A regra global do produto: nenhuma ação acontece sem aprovação da ONG. Toda a curadoria é rastreável e auditável.",
      groups: [
        {
          title: "Regra Global de Aprovação",
          items: [
            "Nada acontece sem aprovação da ONG",
            "Aplica-se a utilizadores, projetos, grupos, ações e execuções",
          ],
        },
        {
          title: "Fluxos de Curadoria",
          items: [
            "Aprovar / rejeitar utilizadores, projetos e grupos",
            "Intervir em ações em curso",
            "Aplicar sanções e suspensões",
          ],
        },
        {
          title: "Rastreabilidade das Decisões",
          items: [
            "Histórico de decisões e responsável pela decisão",
            "Observações internas",
            "Registo auditável de todas as alterações de estado",
          ],
        },
      ],
    },
    {
      title: "Controlo de Presença (Ficha de Ponto)",
      intro:
        "Configurável por projeto, permite registar presença de voluntários e/ou beneficiários com rastreabilidade completa.",
      groups: [
        {
          title: "Configuração por Projeto",
          items: [
            "Opções: desativado, voluntários, beneficiários ou ambos",
            "Definição do público da ficha de ponto",
          ],
        },
        {
          title: "Registos",
          items: [
            "Check-in e check-out",
            "Cálculo de horas",
            "Status do registo",
            "Validador responsável",
          ],
        },
      ],
    },
    {
      title: "Comunicação & Notificações",
      intro:
        "Camada de comunicação multicanal com preferências configuráveis pelo utilizador e exceções para mensagens críticas.",
      groups: [
        {
          title: "Canais",
          items: ["Email", "SMS (custo por mensagem, faturado à parte)"],
        },
        {
          title: "Tipos de Mensagem",
          items: [
            "Transacionais (obrigatórias)",
            "Operacionais",
            "Informativas",
          ],
        },
        {
          title: "Preferências",
          items: [
            "Configuráveis pelo utilizador",
            "Exceção para mensagens críticas (sempre entregues)",
          ],
        },
      ],
    },
    {
      title: "Canal de Denúncias",
      intro:
        "Mecanismo confidencial e auditável para reportar problemas, resolvido pela ONG responsável.",
      groups: [
        {
          title: "Alvos da Denúncia",
          items: ["Utilizadores", "Grupos", "Projetos", "Ações", "Mensagens"],
        },
        {
          title: "Campos",
          items: ["Tipo", "Alvo", "Motivo", "Descrição", "Anexos"],
        },
        {
          title: "Tratamento",
          items: ["Confidencial", "Auditável", "Resolvido pela ONG"],
        },
      ],
    },
    {
      title: "Métricas, Relatórios & Dashboards de Impacto",
      intro:
        "Consolidação do impacto social gerado, com relatórios exportáveis e visão por ONG e por projeto.",
      groups: [
        {
          title: "Métricas",
          items: [
            "Pessoas atendidas",
            "Horas voluntárias",
            "Presença e evasão",
            "Impacto por projeto",
            "Impacto por ONG",
          ],
        },
        {
          title: "Relatórios & Dashboards",
          items: [
            "Dashboards por ONG e por projeto",
            "Relatórios exportáveis (Excel / CSV / PDF)",
            "Tendências e indicadores consolidados",
          ],
        },
      ],
    },
    {
      title: "Segurança, LGPD/GDPR & Auditoria",
      intro:
        "Segurança e conformidade legal tratadas como requisito de primeira ordem, refletidas na arquitetura, nos fluxos e no código.",
      groups: [
        {
          title: "Conformidade LGPD / GDPR",
          items: [
            "Finalidade definida e minimização de dados",
            "Transparência total e consentimento explícito",
            "Direito de revogação e demais direitos dos titulares",
          ],
        },
        {
          title: "Criptografia",
          items: [
            "Em trânsito (HTTPS / TLS 1.2+)",
            "Em repouso",
            "Criptografia de campos sensíveis ao nível da aplicação",
          ],
        },
        {
          title: "Auditoria & Storage",
          items: [
            "RBAC por ONG e controlo de acesso",
            "Logs imutáveis e histórico de decisões",
            "Storage autenticado, sem acesso público",
            "Código preparado para auditoria",
          ],
        },
      ],
    },
    {
      title: "Internacionalização & Multi-país",
      intro:
        "A plataforma é concebida para operar globalmente: multilíngue desde o primeiro dia e com uma arquitetura de dados preparada para múltiplos países, respeitando a legislação de proteção de dados de cada jurisdição de implantação.",
      groups: [
        {
          title: "Multilíngue (4 idiomas)",
          items: [
            "Português, Espanhol, Francês e Inglês",
            "Troca de idioma pelo utilizador, com interface e conteúdos traduzidos",
            "Estrutura de i18n pronta para acrescentar novos idiomas",
            "Formatos locais de data, hora, número e moeda",
          ],
        },
        {
          title: "Arquitetura de dados multi-país",
          items: [
            "Modelagem preparada para operar em qualquer país ou região",
            "Segregação de dados por país / tenant",
            "Suporte a fusos horários e formatos regionais",
            "Base pronta para expansão internacional sem reengenharia",
          ],
        },
        {
          title: "Conformidade legal por jurisdição",
          items: [
            "Aderência às leis de proteção de dados dos países de implantação (LGPD, GDPR e equivalentes)",
            "Consentimento e direitos dos titulares configuráveis por região",
            "Políticas de residência e retenção de dados conforme a legislação local",
          ],
        },
        {
          title: "SEO & Descoberta (multilíngue)",
          items: [
            "Sitemap por idioma e hreflang nas páginas públicas",
            "Metadados e conteúdo indexáveis por idioma",
            "Otimização para motores de busca (Google) e crawlers de IA",
            "Páginas privadas da aplicação mantidas fora do índice",
          ],
        },
      ],
    },
    {
      title: "Infraestrutura, CI/CD & Operação",
      intro:
        "Ambientes separados, pipeline automatizado e rotinas de operação que garantem entregas seguras, rastreáveis e recuperáveis.",
      groups: [
        {
          title: "Ambientes",
          items: [
            "Development, Staging e Production separados",
            "Deploy contínuo integrado com GitHub",
            "Deploy a produção só com aprovação manual explícita",
          ],
        },
        {
          title: "CI/CD (GitHub Actions)",
          items: [
            "Validação em cada Pull Request (lint, testes, build)",
            "Deploy em cada merge para branches protegidos",
            "Histórico de deploys rastreável para auditoria",
          ],
        },
        {
          title: "Governança do Repositório & Cloud",
          items: [
            "GitHub Secrets, Dependabot e CODEOWNERS (.env nunca commitado)",
            "Backups automatizados e testes de recuperação (RTO / RPO)",
            "Rotinas de limpeza de dados (cron jobs idempotentes)",
            "Governança Azure: tagging e separação por resource groups",
          ],
        },
      ],
    },
    {
      title: "Qualidade & Performance",
      intro:
        "Estratégia de testes e metas de performance que sustentam a escalabilidade multi-ONG da plataforma.",
      groups: [
        {
          title: "Estratégia de Testes",
          items: [
            "Testes unitários e de integração",
            "Testes end-to-end nos fluxos críticos",
            "Validação em pipeline antes de cada deploy",
          ],
        },
        {
          title: "Performance & Escalabilidade",
          items: [
            "Metas de tempo de resposta da API (p95 / p99)",
            "Indexação da base de dados como requisito de performance e segurança",
            "Arquitetura pronta para novas ONGs, tipos de projeto, critérios, fluxos e integrações futuras",
          ],
        },
      ],
    },
  ],

  architecture: [
    {
      title: "Frontend + Backend, Next.js (TypeScript)",
      items: [
        "App Router com rotas públicas, protegidas e API Routes serverless",
        "Sem servidor Node.js separado, menor complexidade e custo",
        "Partilha de tipos TypeScript entre front-end e back-end",
        "Renderização otimizada (SSR / ISR quando necessário)",
        "ESLint e Prettier como qualidade de código automatizada",
      ],
    },
    {
      title: "Base de Dados, Azure MySQL + Prisma",
      items: [
        "ORM Prisma como única camada de acesso à base de dados (repository)",
        "Estrutura consistente para dados transacionais multi-tenant",
        "Indexação para performance e segurança",
        "Replicação e backup automatizado",
      ],
    },
    {
      title: "Internacionalização & Dados Multi-país",
      items: [
        "i18n nativo: Português, Espanhol, Francês e Inglês",
        "Modelagem de dados preparada para múltiplos países e regiões",
        "Formatos, fusos e moedas locais",
        "Sitemap por idioma (hreflang) para SEO e descoberta por IAs",
        "Conformidade com a legislação de dados de cada jurisdição (LGPD/GDPR e equivalentes)",
      ],
    },
    {
      title: "Autenticação & Gestão de Identidade, Keycloak (IAM)",
      items: [
        "Servidor de identidade Keycloak como IAM central da plataforma",
        "SSO e emissão/validação de tokens JWT",
        "Gestão de utilizadores, papéis e permissões (RBAC) por ONG",
        "MFA e recuperação de acesso",
        "Integração com o middleware multi-tenant (tenant_id sempre do token)",
      ],
    },
    {
      title: "Armazenamento, Azure Blob Storage",
      items: [
        "Documentos, comprovativos e anexos de denúncias",
        "Acesso autenticado, sem exposição pública",
        "Alta durabilidade e escalabilidade",
        "Comunicação encriptada com o serviço",
      ],
    },
    {
      title: "Deploy & CI/CD, Vercel + GitHub Actions",
      items: [
        "Ambientes Dev / Staging / Production na Vercel",
        "Pipeline automatizado em cada PR e merge",
        "Aprovação manual obrigatória para produção",
        "Vercel Cron Jobs para rotinas agendadas",
      ],
    },
    {
      title: "Segurança & Conformidade",
      items: [
        "Criptografia em trânsito (TLS), em repouso e de campos sensíveis",
        "Conformidade LGPD / GDPR e direitos dos titulares",
        "GitHub Secrets, Dependabot e CODEOWNERS",
        "Proteção contra XSS, CSRF e SQL Injection; rate limiting",
      ],
    },
  ],

  outOfScope: {
    label: "Fora de Escopo",
    title: "O que está incluído e o que é nova evolução",
    intro:
      "O escopo é fechado. Ao longo do projeto acomodamos ajustes desde que alinhados com as funcionalidades já previstas, nomeadamente mudanças de regra de negócio ou de layout dentro dessas features. A criação de novas funcionalidades, fora do previsto nesta proposta, é tratada como evolução à parte, com novo alinhamento e orçamento.",
    groups: [
      {
        title: "Incluído, ajustes ao longo do fluxo",
        items: [
          "Alterações de regra de negócio dentro das funcionalidades previstas",
          "Ajustes de layout e de experiência nas telas já contempladas",
          "Refinamentos acordados durante as sprints, sem aumentar o escopo funcional",
        ],
      },
      {
        title: "Nova evolução, orçamento à parte",
        items: [
          "Criação de novas funcionalidades não previstas nesta proposta",
          "Novos módulos ou fluxos fora do escopo aqui descrito",
          "Tratada como evolução, com novo alinhamento e orçamento próprios",
        ],
      },
    ],
  },

  methodology: {
    label: "Metodologia & Equipa",
    title: "Como trabalhamos",
    summary:
      "Trabalhamos com metodologia ágil: sprints curtas, entregas incrementais e total transparência. O cliente acompanha o progresso e recebe uma entrega a cada sprint.",
    ceremonies: [
      { name: "Sprint Planning", cadence: "No início de cada sprint", audience: "Equipa de desenvolvimento" },
      { name: "Daily", cadence: "Todos os dias", audience: "Equipa de desenvolvimento" },
      { name: "Ponto de Situação (PDS)", cadence: "Semanal", audience: "Equipa de desenvolvimento" },
      { name: "Entrega de sprint", cadence: "A cada sprint", audience: "Cliente" },
      { name: "Sprint Review", cadence: "A cada sprint", audience: "Equipa de desenvolvimento" },
    ],
    team: [
      { name: "Oscar Silva", role: "Product Owner & Especialista em IA" },
      { name: "Camila Mota", role: "Project Manager (PM)" },
      { name: "Bruno Paulon", role: "Dev Sénior Frontend" },
      { name: "Gabriel Blanco", role: "Dev Sénior Backend" },
      { name: "Marta Sousa", role: "Desenvolvedora Pleno" },
      { name: "Kaylani França", role: "QA Pleno" },
    ],
    certifications: [
      "Microsoft Certified: Azure AI Engineer Associate (AI-102)",
      "Microsoft Certified: Azure Developer Associate (AZ-204)",
      "Microsoft Certified: Azure Solutions Architect Expert (AZ-305)",
    ],
  },

  timeline: {
    title: "Prazos",
    durationLabel: "Entrega única, 4 meses (escopo fechado)",
    items: [
      "Setup, fundação e arquitetura multi-tenant",
      "Desenvolvimento dos módulos de negócio",
      "Segurança, LGPD e auditoria",
      "Testes funcionais e QA",
      "Publicação em staging e homologação",
      "Publicação em produção e acompanhamento",
    ],
  },

  schedule: {
    label: "Cronograma",
    title: "Plano de entrega em 16 semanas",
    intro:
      "Distribuição das metas ao longo dos 4 meses (16 semanas), em sprints com entregas incrementais.",
    unitLabel: "Semana",
    totalUnits: 16,
    bars: [
      { label: "Fundação & IAM", detail: "Setup, ambientes, Keycloak & multi-tenant", start: 1, end: 2 },
      { label: "Utilizadores & RBAC", detail: "Perfis, vínculos, papéis e permissões", start: 2, end: 5 },
      { label: "Projetos & Grupos", detail: "Programas, projetos, ações, elegibilidade e grupos", start: 4, end: 8 },
      { label: "Governança & Operação", detail: "Curadoria, presença e denúncias", start: 7, end: 10 },
      { label: "Comunicação & Métricas", detail: "Notificações e dashboards de impacto", start: 9, end: 12 },
      { label: "Segurança & LGPD", detail: "Criptografia, auditoria e hardening", start: 11, end: 14 },
      { label: "QA & Testes", detail: "Testes, correções e estabilização", start: 12, end: 15 },
      { label: "Go-live", detail: "Staging, homologação e produção", start: 15, end: 16 },
    ],
  },

  investment: {
    total: "R$ 148.424,00",
    includes:
      "Inclui o desenvolvimento completo da plataforma web Engagenow: os três portais (Gestor Engagenow, Painel da ONG e Portal do beneficiário/voluntário), arquitetura multi-tenant, todos os módulos de negócio, segurança e conformidade LGPD, infraestrutura, CI/CD, publicação em produção e 2 anos de hospedagem na nossa cloud gerida. Projeto de escopo fechado, com possibilidade de ajustes ao longo do fluxo mediante alinhamento entre as partes.",
    breakdown: [
      { label: "Fundação, Multi-Tenancy & IAM (Keycloak)", amount: "R$ 25.870,00" },
      { label: "Utilizadores, Perfis & RBAC", amount: "R$ 13.615,00" },
      { label: "Projetos, Programas, Ações & Grupos", amount: "R$ 29.540,00" },
      { label: "Governança, Presença & Denúncias", amount: "R$ 15.780,00" },
      { label: "Comunicação, Métricas & Dashboards", amount: "R$ 17.910,00" },
      { label: "Internacionalização & Multi-país (i18n + SEO + conformidade)", amount: "R$ 13.660,00" },
      { label: "Segurança, LGPD & Auditoria", amount: "R$ 14.320,00" },
      { label: "QA, Testes, Infra/CI-CD & Go-live", amount: "R$ 17.729,00" },
    ],
    payments: [
      { percent: "40%", label: "Início do projeto", amount: "R$ 59.369,60" },
      { percent: "30%", label: "Passagem para staging", amount: "R$ 44.527,20" },
      { percent: "30%", label: "Publicação em produção", amount: "R$ 44.527,20" },
    ],
    specialPayments: {
      label: "Especial · 6 parcelas iguais (cliente recorrente)",
      note: "Condição especial concedida por se tratar de cliente recorrente: 6 parcelas mensais iguais de R$ 24.737,33, com prazo alargado para além da entrega. Eventual diferença de arredondamento é acertada na última parcela.",
      stages: [
        { percent: "1ª", label: "Parcela mensal", amount: "R$ 24.737,33" },
        { percent: "2ª", label: "Parcela mensal", amount: "R$ 24.737,33" },
        { percent: "3ª", label: "Parcela mensal", amount: "R$ 24.737,33" },
        { percent: "4ª", label: "Parcela mensal", amount: "R$ 24.737,33" },
        { percent: "5ª", label: "Parcela mensal", amount: "R$ 24.737,33" },
        { percent: "6ª", label: "Parcela mensal", amount: "R$ 24.737,33" },
      ],
    },
    terms: defaultPaymentTerms,
  },

  acceptance: {
    label: "Entregáveis & Aceite",
    title: "O que define cada marco",
    intro:
      "Cada tranche de pagamento é libertada mediante aceite objetivo do respetivo marco, validado com o cliente.",
    groups: [
      {
        title: "Marco 1, Início do projeto (40%)",
        items: [
          "Contrato assinado e reunião de kickoff realizada",
          "Backlog priorizado e roadmap de sprints acordado",
          "Ambientes (dev / staging) e acessos provisionados",
        ],
      },
      {
        title: "Marco 2, Passagem para staging (30%)",
        items: [
          "Plataforma funcional publicada em staging",
          "Módulos do escopo integrados e navegáveis",
          "Fluxos críticos (IAM / multi-tenant, projetos, aprovação) validados em staging",
        ],
      },
      {
        title: "Marco 3, Publicação em produção (30%)",
        items: [
          "Deploy em produção aprovado pelo cliente",
          "Testes e QA concluídos, defeitos críticos resolvidos",
          "Documentação de entrega e início da garantia de 12 meses",
        ],
      },
    ],
  },

  warranty: {
    label: "Garantia & Suporte",
    title: "Depois da entrega",
    groups: [
      {
        title: "Garantia, 12 meses",
        items: [
          "Correção de defeitos (bugs) sem custo durante 1 ano após a entrega",
          "Cobertura sobre as funcionalidades entregues neste escopo",
        ],
      },
      {
        title: "Suporte",
        items: [
          "Suporte técnico ao longo do período de garantia",
          "Acompanhamento e assistência à operação da plataforma",
        ],
      },
    ],
  },

  hosting: {
    label: "Hospedagem & Custos de Operação",
    title: "Onde a plataforma fica hospedada",
    intro:
      "Os primeiros 2 anos de hospedagem na nossa cloud gerida já estão incluídos neste investimento. Depois disso, ou caso o cliente prefira migrar para a sua própria infraestrutura, aplica-se um custo de manutenção.",
    groups: [
      {
        title: "Incluído neste investimento, até 2 anos",
        items: [
          "Hospedagem na nossa cloud gerida por até 2 anos, sem custo adicional",
          "Ambientes, deploy e operação geridos pela nossa equipa",
        ],
      },
      {
        title: "Após 2 anos ou migração para a infra do cliente",
        items: [
          "Custo aproximado de US$ 200/mês para manter a infraestrutura",
          "Possibilidade de migração para a infraestrutura do próprio cliente",
          "Valor de infraestrutura à parte do investimento de desenvolvimento",
        ],
      },
      {
        title: "Custos variáveis por uso",
        items: [
          "Envio de SMS faturado por mensagem (≈ R$ 0,05 a R$ 0,15 por SMS, conforme provedor e volume)",
          "Faturado à parte do desenvolvimento, conforme o consumo",
        ],
      },
    ],
  },
};
