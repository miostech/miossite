import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { Reveal } from "@/components/Reveal";

// Hidden project charter page. Not linked from nav/footer and excluded from
// the sitemap; noindex below keeps it out of search even if the link leaks.
export const metadata: Metadata = {
  title: "hypei · Business Case & Project Charter",
  description:
    "Plataforma completa de venda de produtos digitais (infoprodutos). Business case e project charter.",
  robots: { index: false, follow: false },
};

const meta = [
  { label: "Sponsor", value: "Luigi" },
  { label: "Gestão", value: "Mios" },
  { label: "Data", value: "2026-07-21" },
  { label: "Versão", value: "v0.14 (rascunho)" },
];

const valueProps = [
  "Plataforma all-in-one com paridade funcional face à Kiwify: checkout, área de membros, afiliados, upsells e analítica.",
  "Modelo de receita assente no volume transacionado (take rate sobre o GMV), gerando alto LTV por produtor.",
  "Taxas mais baixas que os concorrentes, viabilizadas por uma estrutura de custos e operação mais otimizada.",
  "Payout rápido (D+2/D+7) equiparado à Kiwify, com antecipação financiada por caixa próprio — evita o custo de antecipação do PSP e gera receita adicional (spread).",
  "Serviços de valor acrescentado: recuperação de carrinho abandonado (done-for-you) e central de atendimento WhatsApp.",
];

const revenue = [
  {
    title: "Take rate",
    description:
      "~4% líquido sobre o GMV (após PSP). Taxa bruta ao produtor ~7,9%, abaixo dos concorrentes (~9–10%).",
  },
  {
    title: "Spread de antecipação",
    description:
      "Ganho por adiantar payouts com caixa próprio, evitando a antecipação paga do PSP.",
  },
  {
    title: "Recuperação de carrinho",
    description:
      "A equipa de vendas converte o carrinho e cobra 20% sobre a venda recuperada. O custo da mensagem (Meta/WhatsApp) é do produtor, debitado do saldo.",
  },
  {
    title: "Central de atendimento",
    description:
      "Subscrição a partir de R$ 200/mês por produtor — inbox multiagente integrado ao WhatsApp Business.",
  },
];

const kpis = [
  { value: "≥ 1000", label: "Produtores ativos em 12 meses" },
  { value: "~R$ 5M", label: "GMV/mês no 12.º mês (cenário base)" },
  { value: "~4%", label: "Take rate líquido (após PSP)" },
  { value: "~R$ 2,4M", label: "Receita líquida/ano (cenário base)" },
];

const scenarios = [
  { avg: "R$ 1.000", gmvMonth: "R$ 500 mil", gmvYear: "R$ 6M", net: "R$ 240 mil" },
  { avg: "R$ 2.000", gmvMonth: "R$ 1M", gmvYear: "R$ 12M", net: "R$ 480 mil" },
  { avg: "R$ 5.000", gmvMonth: "R$ 2,5M", gmvYear: "R$ 30M", net: "R$ 1,2M" },
  { avg: "R$ 10.000", gmvMonth: "R$ 5M", gmvYear: "R$ 60M", net: "R$ 2,4M", base: true },
  { avg: "R$ 20.000", gmvMonth: "R$ 10M", gmvYear: "R$ 120M", net: "R$ 4,8M" },
];

const scopeIn = [
  "Checkout de produtos digitais (order bump, upsell/downsell)",
  "Área de membros / hosting de cursos e conteúdos",
  "Programa de afiliados",
  "Gestão de produtores e produtos",
  "Dashboard de vendas e analítica",
  "Coprodução / split de comissões",
  "Assinaturas / pagamentos recorrentes",
  "Webhooks e integrações (email marketing, automações)",
  "Antifraude (via gateway) e gestão de reembolsos/chargebacks",
  "Carteira/saldo do produtor — para débito do custo de mensagens",
  "Recuperação de carrinho abandonado (done-for-you)",
  "Central de atendimento WhatsApp (inbox multiagente)",
];

const scopeOut = [
  "App mobile — fica para fase posterior.",
  "Fintech / gateway de pagamento próprio. A hypei integra um PSP externo, sem licenciamento nem operação financeira própria nesta fase.",
];

const deliverables = [
  "Plataforma web hypei (interface do produtor + checkout do comprador)",
  "Área de membros",
  "Integração funcional com o gateway de pagamento externo",
  "Painel de afiliados e de coprodução",
  "Dashboard de analítica de vendas",
  "Módulo de recuperação de carrinho + central de atendimento WhatsApp",
];

const team = [
  { name: "Oscar", role: "Product Owner · Base de Dados · IA" },
  { name: "Camila", role: "Project Manager" },
  { name: "Rodrigo", role: "Developer Senior" },
  { name: "Diego", role: "Developer Pleno" },
  { name: "Wagner", role: "UX Designer Senior" },
  { name: "Jhennyfer", role: "Quality Assurance" },
  { name: "Fernando", role: "Business Analyst" },
  { name: "Marketing", role: "Empresa externa — a definir" },
];

const payments = [
  {
    title: "PSP / gateway",
    description:
      "PSP externo (a definir). A hypei não retém fundos nem opera como instituição de pagamento.",
  },
  {
    title: "Liquidação (payout)",
    description:
      "D+2 / D+7, equiparado à Kiwify — payout rápido como fator de atração de produtores.",
  },
  {
    title: "Antecipação com caixa próprio",
    description:
      "A hypei adianta ao produtor com capital de giro e recebe do PSP na liquidação natural (D+30/60/90). Evita o custo de antecipação do PSP; o spread vira receita.",
  },
  {
    title: "Reserva anti-chargeback",
    description:
      "30% de reserva no D+2; sem reserva no D+7 (cessa o direito de arrependimento — CDC art. 49). Fraude no cartão pode ocorrer para além dos 7 dias (~90 dias).",
  },
];

const milestones = [
  { phase: "MVP", when: "Mês 3" },
  { phase: "Beta", when: "Mês 4" },
  { phase: "Lançamento", when: "Mês 6" },
];

const risks = [
  "Concorrência de plataformas grandes e consolidadas (Kiwify, Hotmart, Eduzz) com efeito de rede e marca.",
  "Dependência do gateway externo / PSP (custos, condições, disponibilidade).",
  "Custo e ritmo de aquisição de produtores abaixo do esperado.",
  "Risco de crédito/chargeback ao adiantar com caixa próprio — mitigado com 30% de reserva no D+2.",
  "Liquidez / capital de giro: o volume adiantável é limitado pela caixa; já a poucos milhões de GMV/mês o float necessário excede os R$ 500 mil iniciais.",
  "Regulatório sobre pagamentos: exposição residual mitigada pelo uso de PSP licenciado. Fixar responsabilidades no contrato com o PSP.",
];

const assumptions = [
  "Existe um PSP externo que cobre cartão, Pix e boleto, sem necessidade de licença de fintech própria.",
  "Capital de giro inicial de R$ 500 mil aportado pelo sponsor (Luigi), com aportes futuros possíveis.",
  "Há procura de produtores dispostos a adotar/migrar para uma nova plataforma.",
  "A equipa Mios tem capacidade para entregar no prazo definido (6 meses).",
];

const successCriteria = [
  {
    title: "Paridade funcional no MVP",
    description:
      "Checkout, área de membros e afiliados operacionais no mês 3, com paridade face às funcionalidades núcleo da Kiwify.",
  },
  {
    title: "Adoção de produtores",
    description:
      "≥ 1000 produtores ativos até ao 12.º mês, com ritmo de aquisição sustentável.",
  },
  {
    title: "Volume transacionado",
    description:
      "GMV de ~R$ 5M/mês no 12.º mês (cenário base) e take rate líquido de ~4% após PSP.",
  },
  {
    title: "Payout competitivo",
    description:
      "Liquidação D+2 / D+7 operacional e equiparada à concorrência, com antecipação por caixa própria a funcionar.",
  },
  {
    title: "Risco de crédito controlado",
    description:
      "Perdas por chargeback/fraude contidas dentro da reserva de 30% no D+2, sem comprometer a caixa.",
  },
];

const constraints = [
  "Prazo fixo de 6 meses até ao lançamento (mês 6).",
  "A hypei não opera como instituição de pagamento — depende obrigatoriamente de um PSP externo licenciado.",
  "Capital de giro inicial limitado a R$ 500 mil, que fixa o teto do volume adiantável nesta fase.",
  "Sem app mobile nesta fase — a plataforma é apenas web.",
  "Reserva anti-chargeback de 30% no D+2 obrigatória (cessa o direito de arrependimento apenas no D+7 — CDC art. 49).",
  "A Mios entra como parceira, sem custo de desenvolvimento; o orçamento restringe-se a ferramentas e subscrições.",
];

const governance = [
  {
    title: "Decisão executiva",
    description:
      "Sponsor (Luigi) — aprova âmbito, orçamento e prazo, decide trade-offs e assegura os aportes de capital de giro.",
  },
  {
    title: "Gestão do projeto",
    description:
      "PM (Camila) coordena a equipa Mios, controla âmbito, prazo e riscos, e reporta ao sponsor.",
  },
  {
    title: "Cadência de reporting",
    description:
      "Ponto semanal da core team, status report ao sponsor e comité de decisão quinzenal para prioridades e mudanças.",
  },
  {
    title: "Controlo de mudanças",
    description:
      "Registo de decisões e pedidos de alteração de âmbito avaliados quanto a impacto em prazo, custo e MVP antes de aprovação.",
  },
];

const approvals = [
  { role: "Sponsor do Projeto", name: "Luigi" },
  { role: "Project Manager", name: "Camila" },
  { role: "Product Owner", name: "Oscar" },
];

function SectionHead({ n, label }: { n: string; label: string }) {
  return (
    <div className="mb-6 flex items-center gap-4 border-t border-line pt-4">
      <span className="font-mono text-[11px] tracking-[0.18em] text-accent">{n}</span>
      <span className="label">{label}</span>
    </div>
  );
}

export default async function HypeiProjectPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <>
      {/* Hero */}
      <section className="pt-40 sm:pt-48">
        <div className="container-x">
          <div className="flex items-center gap-4 border-t border-line pt-4">
            <span className="font-mono text-[11px] tracking-[0.18em] text-accent">
              ↳
            </span>
            <span className="label">Projeto · confidencial</span>
          </div>
          <h1 className="display mt-8 text-6xl leading-[0.95] sm:text-8xl lg:text-9xl">
            hypei
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
            Plataforma completa de venda de produtos digitais (infoprodutos) que
            concorre diretamente com a Kiwify. Atrair produtores e rentabilizar
            através de uma comissão sobre as vendas processadas na plataforma.
          </p>
          <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-4">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="label">{m.label}</dt>
                <dd className="mt-2 text-lg text-ink">{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Proposta de valor */}
      <section className="mt-24 border-t border-line py-24 sm:mt-28 sm:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHead n="01" label="Proposta de valor" />
              <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted">
                Uma plataforma all-in-one, com taxas mais baixas e serviços que
                aumentam a conversão do produtor.
              </p>
            </div>
          </div>
          <div className="lg:col-span-8">
            <ul className="border-t border-line">
              {valueProps.map((item, i) => (
                <Reveal as="li" key={i} delay={i * 60}>
                  <div className="grid grid-cols-[auto_1fr] gap-6 border-b border-line py-6">
                    <span className="display text-2xl text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="max-w-xl text-base leading-relaxed text-ink">
                      {item}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Fontes de receita */}
      <section className="border-t border-line py-24 sm:py-32">
        <div className="container-x">
          <SectionHead n="02" label="Fontes de receita" />
          <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2">
            {revenue.map((r) => (
              <Reveal key={r.title} className="bg-paper p-8 sm:p-10">
                <h3 className="display text-2xl">{r.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted">
                  {r.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* KPIs */}
      <section className="border-t border-line py-24 sm:py-32">
        <div className="container-x">
          <SectionHead n="03" label="Objetivos & KPIs" />
          <div className="mt-10 grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-4">
            {kpis.map((k) => (
              <Reveal key={k.label} className="bg-paper p-8">
                <div className="display text-4xl text-ink sm:text-5xl">
                  {k.value}
                </div>
                <div className="mt-3 text-sm leading-relaxed text-muted">
                  {k.label}
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-faint">
            Cenário base no 12.º mês: ~1000 produtores ativos com faturação
            assimétrica (poucos grandes, longa cauda pequena), média ponderada de
            ~R$ 5 mil/mês por produtor → ~R$ 5M/mês de GMV. Referência de mercado
            (estudo FGV/Hotmart): ~R$ 4,2 mil/mês para quem tem a venda digital
            como renda secundária e ~R$ 12 mil/mês como renda principal; como
            plataforma nova, o mix inicial pesa para produtores mais pequenos.
          </p>

          <div className="mt-16">
            <h3 className="label text-accent">
              Cenários de receita · 500 produtores ativos
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
              Sensibilidade da receita líquida anual (take rate de 4%) ao ticket
              médio mensal por produtor. Cálculo: 500 × ticket × 12 × 4%.
            </p>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[36rem] border-collapse text-left">
                <thead>
                  <tr className="border-y border-line">
                    <th className="label py-4 pr-6 font-normal">
                      Ticket médio / produtor (mês)
                    </th>
                    <th className="label py-4 pr-6 font-normal">
                      GMV / mês
                    </th>
                    <th className="label py-4 pr-6 font-normal">
                      GMV / ano
                    </th>
                    <th className="label py-4 font-normal text-accent">
                      Receita líquida / ano (4%)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {scenarios.map((s) => (
                    <tr key={s.avg} className="border-b border-line-soft">
                      <td className="py-4 pr-6 text-base text-ink">
                        {s.avg}
                        {s.base && (
                          <span className="ml-2 font-mono text-[10px] tracking-[0.14em] text-accent">
                            BASE
                          </span>
                        )}
                      </td>
                      <td className="py-4 pr-6 text-base text-muted">
                        {s.gmvMonth}
                      </td>
                      <td className="py-4 pr-6 text-base text-muted">
                        {s.gmvYear}
                      </td>
                      <td className="py-4 text-base font-medium text-ink">
                        {s.net}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-faint">
              O cenário base do projeto (~R$ 5M/mês de GMV, ~R$ 2,4M/ano de
              receita líquida) corresponde a 500 produtores com ticket médio de
              ~R$ 10 mil/mês — ou, de forma equivalente, ~1000 produtores a
              ~R$ 5 mil/mês.
            </p>
          </div>
        </div>
      </section>

      {/* Critérios de sucesso */}
      <section className="border-t border-line py-24 sm:py-32">
        <div className="container-x">
          <SectionHead n="04" label="Critérios de sucesso" />
          <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {successCriteria.map((c, i) => (
              <Reveal as="div" key={c.title} delay={i * 50} className="bg-paper p-8 sm:p-10">
                <span className="font-mono text-[11px] tracking-[0.18em] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display mt-3 text-xl">{c.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted">
                  {c.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Âmbito */}
      <section className="border-t border-line py-24 sm:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHead n="05" label="Âmbito" />
              <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted">
                Replicar as funcionalidades núcleo da Kiwify. Três módulos de
                diferenciação a confirmar para o MVP.
              </p>
            </div>
          </div>
          <div className="lg:col-span-8 lg:grid lg:grid-cols-2 lg:gap-8">
            <div>
              <h3 className="label text-accent">Dentro do âmbito</h3>
              <ul className="mt-5 space-y-3">
                {scopeIn.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 border-b border-line-soft pb-3 text-base leading-relaxed text-ink"
                  >
                    <span aria-hidden className="text-accent">
                      +
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10 lg:mt-0">
              <h3 className="label">Fora do âmbito</h3>
              <ul className="mt-5 space-y-4">
                {scopeOut.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-base leading-relaxed text-muted"
                  >
                    <span aria-hidden className="text-faint">
                      —
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Entregáveis */}
      <section className="border-t border-line py-24 sm:py-32">
        <div className="container-x">
          <SectionHead n="06" label="Entregáveis principais" />
          <ul className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {deliverables.map((d, i) => (
              <Reveal as="li" key={d} delay={i * 50} className="bg-paper p-8">
                <span className="font-mono text-[11px] tracking-[0.18em] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-base leading-relaxed text-ink">{d}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Modelo de pagamentos */}
      <section className="border-t border-line py-24 sm:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHead n="07" label="Pagamentos e liquidação" />
              <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted">
                Payout rápido financiado por caixa próprio, sem operar como
                instituição de pagamento.
              </p>
            </div>
          </div>
          <div className="lg:col-span-8">
            <ul className="border-t border-line">
              {payments.map((p, i) => (
                <Reveal as="li" key={p.title} delay={i * 60}>
                  <div className="grid grid-cols-1 gap-2 border-b border-line py-8 sm:grid-cols-[14rem_1fr] sm:gap-8">
                    <h3 className="display text-xl">{p.title}</h3>
                    <p className="max-w-xl text-base leading-relaxed text-muted">
                      {p.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Restrições */}
      <section className="border-t border-line py-24 sm:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHead n="08" label="Restrições" />
              <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted">
                As fronteiras fixas que condicionam o projeto e que a equipa não
                pode alterar nesta fase.
              </p>
            </div>
          </div>
          <div className="lg:col-span-8">
            <ul className="border-t border-line">
              {constraints.map((item, i) => (
                <Reveal as="li" key={item} delay={i * 50}>
                  <div className="grid grid-cols-[auto_1fr] gap-6 border-b border-line py-6">
                    <span aria-hidden className="display text-2xl text-accent">
                      ×
                    </span>
                    <p className="max-w-xl text-base leading-relaxed text-ink">
                      {item}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Equipa */}
      <section className="border-t border-line py-24 sm:py-32">
        <div className="container-x">
          <SectionHead n="09" label="Equipa do projeto" />
          <ul className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <Reveal key={member.name} className="bg-paper p-8">
                <div className="display text-2xl">{member.name}</div>
                <div className="mt-2 text-sm leading-relaxed text-muted">
                  {member.role}
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Governação */}
      <section className="border-t border-line py-24 sm:py-32">
        <div className="container-x">
          <SectionHead n="10" label="Governação" />
          <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2">
            {governance.map((g) => (
              <Reveal key={g.title} className="bg-paper p-8 sm:p-10">
                <h3 className="display text-2xl">{g.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted">
                  {g.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Marcos */}
      <section className="border-t border-line py-24 sm:py-32">
        <div className="container-x">
          <SectionHead n="11" label="Marcos" />
          <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-3">
            {milestones.map((m) => (
              <Reveal key={m.phase} className="bg-paper p-8 sm:p-10">
                <div className="label text-accent">{m.when}</div>
                <div className="display mt-3 text-3xl sm:text-4xl">{m.phase}</div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-sm leading-relaxed text-faint">
            Prazo total de 6 meses. Sem custo de desenvolvimento (a Mios entra como
            parceira); o orçamento destina-se a ferramentas/subscrições — valor a
            definir.
          </p>
        </div>
      </section>

      {/* Riscos & Pressupostos */}
      <section className="border-t border-line py-24 sm:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <SectionHead n="12" label="Riscos" />
            <ul className="mt-6 space-y-4">
              {risks.map((r) => (
                <li
                  key={r}
                  className="flex gap-3 border-b border-line-soft pb-4 text-base leading-relaxed text-muted"
                >
                  <span aria-hidden className="text-accent">
                    !
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <SectionHead n="13" label="Pressupostos" />
            <ul className="mt-6 space-y-4">
              {assumptions.map((a) => (
                <li
                  key={a}
                  className="flex gap-3 border-b border-line-soft pb-4 text-base leading-relaxed text-muted"
                >
                  <span aria-hidden className="text-faint">
                    →
                  </span>
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Aprovação */}
      <section className="border-t border-line py-24 sm:py-32">
        <div className="container-x">
          <SectionHead n="14" label="Aprovação" />
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            A execução fica sujeita à validação formal do sponsor, PM e Product
            Owner, com acordo explícito sobre propósito, âmbito, orçamento, prazo
            e modelo de governação.
          </p>
          <div className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-3">
            {approvals.map((a) => (
              <div key={a.role} className="bg-paper p-8 sm:p-10">
                <div className="h-16 border-b border-line" />
                <div className="mt-4 display text-xl">{a.name}</div>
                <div className="mt-1 label">{a.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
