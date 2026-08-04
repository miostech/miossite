import type { Proposal } from "./types";
import { defaultPaymentTerms } from "./shared";

export const telecom: Proposal = {
  // Slug intencionalmente não-óbvio: o link é o único controle de acesso.
  slug: "telecom-4f9a2c",
  lang: "pt",
  client: { name: "Telecom" },
  meta: { sentDate: "29/07/2026", validityDays: 30 },
  hero: {
    title: "Proposta Comercial",
    subtitle: "Aplicativo Telecom",
  },
  scopeIntro:
    "A solução contempla 2 aplicativos móveis (Cliente e Técnico de Campo) e uma plataforma web de gestão operacional, integrados em tempo real para conectar cliente final, técnico e backoffice da operadora.",

  solution: {
    pillars: [
      {
        title: "App Cliente",
        subtitle: "Autosserviço do cliente final",
        items: [
          "Abertura e acompanhamento de chamados",
          "Notificações push em tempo real",
          "Faturas e histórico financeiro",
          "Autodiagnóstico inteligente",
          "Avaliação NPS pós-atendimento",
        ],
      },
      {
        title: "Plataforma Web",
        subtitle: "Central de gestão operacional",
        items: [
          "Gestão de técnicos e ordens de serviço",
          "Controle de SLA e KPIs",
          "Dashboard executivo e relatórios",
          "NPS por técnico / região",
          "Segurança, perfis e auditoria (RGPD)",
        ],
      },
      {
        title: "App Técnico",
        subtitle: "Operação de campo",
        items: [
          "Ordens de serviço e checklist técnico",
          "Navegação, rota e ETA (Maps/Waze)",
          "Execução com fotos e assinatura digital",
          "Chat com a central",
          "Controle de estoque de equipamentos",
        ],
      },
    ],
    flow: [
      "Cliente abre chamado ou recebe notificação de manutenção",
      "Central atribui a Ordem de Serviço a um técnico",
      "Técnico se desloca (rota/ETA) e executa o atendimento",
      "Cliente confirma conclusão e avalia (NPS)",
      "Dashboard atualiza SLA, KPIs e indicadores em tempo real",
    ],
  },

  scope: [
    {
      title: "Aplicativo Cliente",
      intro:
        "O aplicativo mobile será a principal interface digital entre a operadora e seus clientes, oferecendo uma experiência centralizada, intuitiva e orientada a autosserviço. O objetivo é reduzir fricção no atendimento, diminuir a carga no call center, aumentar a transparência operacional e elevar o NPS.",
      groups: [
        {
          title: "Gestão de Chamados Técnicos",
          items: [
            "Abertura de chamado técnico",
            "Seleção de categoria do problema (internet lenta, sem sinal, TV, etc.)",
            "Upload de fotos (quando aplicável)",
            "Acompanhamento de status (aberto, em atendimento, técnico a caminho, concluído)",
            "Histórico de chamados anteriores",
            "Chat ou canal de comunicação com suporte (opcional fase 2)",
          ],
        },
        {
          title: "Notificações Push (Comunicação Proativa)",
          items: [
            "Confirmação de abertura de chamado",
            "Mudança de status",
            "Técnico a caminho (com janela estimada)",
            "Aviso de manutenção programada",
            "Aviso de fatura disponível",
            "Alertas de atraso de pagamento",
            "Mensagens promocionais (opt-in)",
          ],
        },
        {
          title: "Gestão de Faturas",
          items: [
            "Visualização de faturas atuais e anteriores",
            "Download em PDF",
            "Segunda via",
            "Indicação de pagamento realizado",
            "Integração com gateway para pagamento direto no app (opcional fase 2)",
            "Histórico financeiro",
          ],
        },
        {
          title: "Fluxo de Manutenção Técnica",
          items: [
            "Confirmação de disponibilidade para visita",
            "Reagendamento",
            "Confirmação de recebimento do técnico",
            'Status "técnico a caminho"',
            "Possível rastreamento simplificado (mapa opcional)",
            "Avaliação pós-atendimento",
          ],
        },
        {
          title: "NPS e Satisfação do Cliente",
          items: [
            "Pesquisa automática após encerramento do chamado",
            "NPS (0–10)",
            "Campo opcional para comentário",
            "Dashboard interno (backoffice)",
            "Métrica de satisfação por região/técnico",
          ],
        },
        {
          title: "Área do Cliente",
          items: [
            "Dados do plano contratado",
            "Upgrade/downgrade de plano",
            "Consulta de consumo (se aplicável)",
            "Dados cadastrais",
            "Alteração de senha",
            "Gestão de contratos",
          ],
        },
        {
          title: "Autodiagnóstico Inteligente",
          items: [
            "Checklist guiado (reiniciar modem, verificar cabos)",
            "Teste automático de conexão",
            "Detecção de falha massiva na região",
            "Sugestão automática antes de abrir chamado",
          ],
        },
        {
          title: "Segurança",
          items: [
            "Login com MFA",
            "Biometria (Face ID / Touch ID)",
            "Proteção de dados conforme RGPD",
            "Logs de acesso",
          ],
        },
        {
          title: "Analytics & Performance",
          items: [
            "Monitoramento de uso do app",
            "Taxa de abertura de chamados",
            "Tempo médio de resolução",
            "Taxa de conversão para autosserviço",
            "Retenção e churn",
          ],
        },
        {
          title: "Status de Rede (Transparência Operacional)",
          items: [
            "Mapa ou aviso de instabilidade na região",
            "ETA estimado de normalização",
            "Histórico de incidentes",
          ],
        },
      ],
    },
    {
      title: "Aplicativo Técnico de Campo",
      intro:
        "A ferramenta operacional principal para gestão de atendimentos em campo: visualizar ordens de serviço, receber notificações em tempo real, confirmar deslocamento, registrar execução e coletar validação do cliente. O objetivo é aumentar a eficiência, reduzir o TMA, melhorar o controle de SLA e garantir rastreabilidade das intervenções.",
      groups: [
        {
          title: "Gestão de Ordens de Serviço (OS)",
          items: [
            "Lista de atendimentos atribuídos",
            "Visualização por data / prioridade",
            "Filtros por status",
            "Detalhe da ordem: dados do cliente, endereço, tipo de serviço, histórico e observações internas",
            "Confirmação de aceite da OS",
            "Mudança de status: a caminho, no local, em execução, finalizado, reagendado, cancelado",
          ],
        },
        {
          title: "Notificações Push Operacionais",
          items: [
            "Nova OS atribuída",
            "Alteração de prioridade",
            "Reagendamento",
            "Cancelamento",
            "Comunicação interna da central",
          ],
        },
        {
          title: "Navegação e Logística",
          items: [
            "Integração com Google Maps / Waze",
            "Rota automática até o cliente",
            "Cálculo de ETA",
            "Indicação de trânsito",
            "Registro de chegada automática por geolocalização (opcional)",
          ],
        },
        {
          title: "Registro de Execução",
          items: [
            "Checklist técnico padronizado",
            "Registro de atividades realizadas",
            "Troca de equipamentos (serial number)",
            "Upload de fotos (antes/depois)",
            "Upload de assinatura do cliente",
            "Observações técnicas",
            "Registro de materiais utilizados",
          ],
        },
        {
          title: "Confirmação do Cliente",
          items: [
            "Assinatura digital",
            "Avaliação do atendimento (NPS simplificado)",
            "Confirmação de conclusão do serviço",
          ],
        },
        {
          title: "Controle de SLA e Performance",
          items: [
            "Tempo de deslocamento",
            "Tempo em atendimento",
            "Tempo total da OS",
            "Registro automático de início/fim",
            "Métricas para ranking interno",
          ],
        },
        {
          title: "Comunicação Interna",
          items: [
            "Chat com central",
            "Solicitação de suporte remoto",
            "Abertura de incidente técnico interno",
            "Envio de fotos em tempo real",
          ],
        },
        {
          title: "Gestão de Agenda",
          items: [
            "Visualização de agenda diária",
            "Capacidade de reagendamento",
            "Bloqueio de horário",
            "Organização automática por rota otimizada (fase evolutiva)",
          ],
        },
        {
          title: "Estoque e Equipamentos",
          items: [
            "Controle de equipamentos no carro",
            "Baixa automática de material usado",
            "Solicitação de reposição",
            "Escaneamento de código de barras",
          ],
        },
        {
          title: "Segurança",
          items: [
            "Login com MFA",
            "Controle por perfil (técnico, supervisor)",
            "Logs de atividade",
            "Geolocalização (conforme política interna)",
            "Conformidade RGPD",
          ],
        },
      ],
    },
    {
      title: "Plataforma Web — Gestão Operacional",
      intro:
        "O centro de controle operacional da operadora: gestão completa de técnicos, ordens de serviço, SLAs, indicadores de performance e métricas de satisfação (NPS). Integra em tempo real os apps de Cliente e Técnico, oferecendo visão consolidada da operação e tomada de decisão baseada em dados.",
      groups: [
        {
          title: "Gestão de Técnicos",
          items: [
            "Cadastro e gestão de técnicos",
            "Definição de regiões de atuação",
            "Gestão de disponibilidade",
            "Controle de status (ativo, afastado, férias)",
            "Performance individual: TMA, SLA cumprido, índice de retrabalho, NPS médio",
            "Ranking interno de técnicos",
          ],
        },
        {
          title: "Gestão de Ordens de Serviço (OS)",
          items: [
            "Criação manual de OS (quando necessário)",
            "Atribuição automática ou manual de técnicos",
            "Visualização por região, prioridade e status",
            "Linha do tempo da OS",
            "Histórico completo da intervenção",
            "Reagendamento e cancelamento",
            "Auditoria de alterações",
          ],
        },
        {
          title: "Monitoramento em Tempo Real",
          items: [
            "Técnicos em campo (mapa opcional)",
            "Status das visitas",
            "Chamados abertos por região",
            "Alertas de SLA em risco",
            "Incidentes massivos",
          ],
        },
        {
          title: "Gestão de SLA",
          items: [
            "Configuração de regras de SLA",
            "Monitoramento de cumprimento",
            "Alertas automáticos",
            "Relatórios de SLA por técnico, região e tipo de serviço",
          ],
        },
        {
          title: "NPS e Satisfação do Cliente",
          items: [
            "Coleta automática de NPS pós-atendimento",
            "Dashboard de NPS geral",
            "NPS por técnico, região e tipo de serviço",
            "Comentários qualitativos",
            "Tendência histórica",
            "Alertas de detratores",
            "Exportação de relatórios",
          ],
        },
        {
          title: "Relatórios e Analytics",
          items: [
            "Tempo médio de resolução (TMR)",
            "Tempo médio de deslocamento",
            "Taxa de retrabalho",
            "Taxa de reagendamento",
            "Volume de chamados por período",
            "Análise de incidentes recorrentes",
            "Exportação (Excel / CSV / PDF)",
          ],
        },
        {
          title: "Gestão de Manutenção Programada",
          items: [
            "Criação de eventos de manutenção",
            "Comunicação automática com clientes afetados",
            "Monitoramento de impacto",
            "Relatório de normalização",
          ],
        },
        {
          title: "Gestão de Comunicação",
          items: [
            "Envio de notificações push",
            "Envio de SMS (opcional)",
            "Templates configuráveis",
            "Histórico de comunicações",
          ],
        },
        {
          title: "Gestão de Estoque",
          items: [
            "Controle de equipamentos por técnico",
            "Entrada e saída de materiais",
            "Baixa automática por OS",
            "Alertas de reposição",
          ],
        },
        {
          title: "Segurança e Governança",
          items: [
            "Perfis de acesso: administrador, supervisor, operador",
            "Controle de permissões",
            "Logs de auditoria",
            "Conformidade RGPD",
            "Controle de acesso por região",
          ],
        },
        {
          title: "Indicadores-Chave (KPIs)",
          items: [
            "NPS",
            "SLA",
            "TMR (Tempo Médio de Resolução)",
            "Retrabalho",
            "Produtividade por técnico",
            "Eficiência por região",
            "Custo médio por atendimento",
          ],
        },
        {
          title: "Dashboard Executivo",
          items: [
            "Visão consolidada da operação",
            "Comparativo mensal",
            "Tendências",
            "Alertas críticos",
            "Indicadores de risco",
          ],
        },
      ],
    },
  ],

  architecture: [
    {
      title: "Aplicativos Mobile — React Native",
      items: [
        "Desenvolvimento multiplataforma (iOS e Android)",
        "Código compartilhado e redução de custo de manutenção",
        "Atualizações rápidas e escaláveis",
        "Performance próxima ao nativo",
        "Integração via API REST/HTTPS com autenticação baseada em tokens",
      ],
    },
    {
      title: "Plataforma Web — Next.js (Front + Back)",
      items: [
        "Front-end moderno e performático",
        "Renderização otimizada (SSR / ISR quando necessário)",
        "Estrutura escalável e manutenção simplificada",
        "Backend com Next.js (API Routes / Server Actions)",
        "Regras de negócio, autenticação, controle de acesso e integrações",
      ],
    },
    {
      title: "Banco de Dados — MySQL",
      items: [
        "Confiabilidade e alta performance",
        "Estrutura consistente para dados transacionais",
        "Escalabilidade horizontal e vertical",
        "Suporte a replicação e backup automatizado",
      ],
    },
    {
      title: "Infraestrutura em Cloud",
      items: [
        "Alta disponibilidade e escalabilidade automática",
        "Balanceamento de carga e monitoramento contínuo",
        "Backup automatizado e Disaster Recovery",
        "Ambientes separados (Dev / Staging / Produção)",
      ],
    },
    {
      title: "Armazenamento de Arquivos — Blob Storage",
      items: [
        "Fotos de atendimento, assinaturas, PDFs de faturas e documentos técnicos",
        "Alta durabilidade e escalabilidade",
        "Controle de acesso seguro e distribuição otimizada",
        "Custo eficiente para grande volume de dados",
      ],
    },
    {
      title: "Segurança e LGPD",
      items: [
        "Criptografia em trânsito (HTTPS/TLS) e em repouso",
        "Controle de acesso baseado em perfil (RBAC) e logs de auditoria",
        "Controle de consentimento, minimização e política de retenção",
        "Autenticação via token (JWT), MFA e rate limiting",
        "Proteção contra XSS, CSRF e SQL Injection; WAF quando aplicável",
      ],
    },
  ],

  timeline: {
    title: "Prazos",
    durationLabel: "POC — 90 dias corridos",
    items: [
      "Desenvolvimento",
      "Integrações",
      "Testes exploratórios",
      "Implantação",
      "Análise dos resultados após os 3 meses de execução",
    ],
  },

  investment: {
    total: "R$ 82.300,00",
    includes: "Inclui os 2 aplicativos (Cliente e Técnico) e a plataforma web.",
    payments: [
      { percent: "40%", label: "Início do projeto", amount: "R$ 32.920,00" },
      { percent: "30%", label: "Passagem para staging", amount: "R$ 24.690,00" },
      { percent: "30%", label: "Publicação em produção", amount: "R$ 24.690,00" },
    ],
    terms: defaultPaymentTerms,
  },
};
