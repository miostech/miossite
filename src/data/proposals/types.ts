import type { Locale } from "@/i18n/config";

/** A titled list of features/bullets — the atomic unit of scope and architecture. */
export type FeatureGroup = {
  title: string;
  items: string[];
};

/** One of the deliverables (e.g. "Aplicativo Cliente"), grouped into feature sets. */
export type ScopeBlock = {
  title: string;
  intro?: string;
  groups: FeatureGroup[];
};

/** A pillar in the high-level solution overview. */
export type SolutionPillar = {
  title: string;
  subtitle: string;
  items: string[];
};

/** A payment stage of the "adjudicação" split (e.g. 40% no início). */
export type PaymentStage = {
  percent: string;
  label: string;
  amount: string;
};

/** An alternative payment plan (e.g. "Especial" — 6 parcelas iguais). */
export type PaymentPlan = {
  label: string;
  note?: string;
  stages: PaymentStage[];
};

/** A generic titled block of feature groups (garantia, infra, fora de escopo…). */
export type InfoBlock = {
  label: string;
  title: string;
  intro?: string;
  groups: FeatureGroup[];
};

/** A person allocated to the project. */
export type ProjectMember = { name: string; role: string };

/** An agile ceremony with its cadence and audience. */
export type Ceremony = { name: string; cadence: string; audience: string };

/** A bar in the schedule Gantt: spans weeks `start`..`end` (1-based, inclusive). */
export type ScheduleBar = {
  label: string;
  detail?: string;
  start: number;
  end: number;
};

/**
 * A single commercial proposal. Client-specific content lives here; the shared
 * boilerplate (intro, mission, team, process, payment terms) comes from
 * `proposalShared` so every proposal stays consistent.
 */
export type Proposal = {
  /** URL slug — keep it hard to guess (the link is the only access control). */
  slug: string;
  /** Language the proposal is written in. */
  lang: Locale;
  client: { name: string };
  meta: { sentDate: string; validityDays: number };
  hero: { title: string; subtitle: string };
  /** Optional override of the shared "Olá" intro body. */
  intro?: string;
  scopeIntro: string;
  solution: {
    pillars: SolutionPillar[];
    flow: string[];
  };
  scope: ScopeBlock[];
  architecture?: FeatureGroup[];
  /** Scope boundaries — what changes are covered vs. what counts as new scope. */
  outOfScope?: InfoBlock;
  /** Agile method + allocated team. */
  methodology?: {
    label: string;
    title: string;
    summary: string;
    ceremonies: Ceremony[];
    team: ProjectMember[];
    /** Team/company credentials (e.g. Azure certifications). */
    certifications?: string[];
  };
  /** Visual delivery schedule (Gantt). */
  schedule?: {
    label: string;
    title: string;
    intro?: string;
    unitLabel: string;
    totalUnits: number;
    bars: ScheduleBar[];
  };
  timeline: {
    title: string;
    durationLabel: string;
    items: string[];
  };
  /** Deliverables & acceptance criteria per payment milestone. */
  acceptance?: InfoBlock;
  investment: {
    total: string;
    includes: string;
    /** Optional price breakdown by workstream/phase (should sum to total). */
    breakdown?: { label: string; amount: string }[];
    payments: PaymentStage[];
    /** Optional alternative plan shown alongside the standard split. */
    specialPayments?: PaymentPlan;
    terms: string[];
  };
  /** Post-delivery warranty & support. */
  warranty?: InfoBlock;
  /** Hosting / infrastructure and its ongoing cost. */
  hosting?: InfoBlock;
};
