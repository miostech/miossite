import { Fragment } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "@/i18n/config";
import { getProposal, proposalSlugs } from "@/data/proposals";
import { ProposalHeader } from "@/components/proposals/ProposalHeader";
import { ProposalHero } from "@/components/proposals/ProposalHero";
import { ProposalIntro } from "@/components/proposals/ProposalIntro";
import { ProposalMission } from "@/components/proposals/ProposalMission";
import { ProposalWhySoftware } from "@/components/proposals/ProposalWhySoftware";
import { ProposalTeam } from "@/components/proposals/ProposalTeam";
import { ProposalClients } from "@/components/proposals/ProposalClients";
import { ProposalSolutionFlow } from "@/components/proposals/ProposalSolutionFlow";
import { ProposalScopeIntro } from "@/components/proposals/ProposalScopeIntro";
import { ProposalScope } from "@/components/proposals/ProposalScope";
import { ProposalArchitecture } from "@/components/proposals/ProposalArchitecture";
import { ProposalInfoBlocks } from "@/components/proposals/ProposalInfoBlocks";
import { ProposalMethodology } from "@/components/proposals/ProposalMethodology";
import { ProposalSchedule } from "@/components/proposals/ProposalSchedule";
import { ProposalTimeline } from "@/components/proposals/ProposalTimeline";
import { ProposalInvestment } from "@/components/proposals/ProposalInvestment";
import { ProposalProcess } from "@/components/proposals/ProposalProcess";
import { ProposalClosing } from "@/components/proposals/ProposalClosing";

export function generateStaticParams() {
  return proposalSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const proposal = getProposal(slug);
  const title = proposal
    ? `Proposta — ${proposal.client.name} · Mios Tech`
    : "Proposta · Mios Tech";
  return {
    title,
    // Link secreto: nunca indexar nem seguir.
    robots: { index: false, follow: false },
  };
}

export default async function ProposalPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const proposal = getProposal(slug);
  if (!proposal || proposal.lang !== lang) notFound();

  // Sequential section numbers across the (optional) sections.
  let n = 0;
  const num = () => String(++n).padStart(2, "0");

  // Build an explicit keyed list so mixing static sections with the scope map
  // never produces missing-key warnings.
  const sections: { key: string; node: React.ReactNode }[] = [
    { key: "hero", node: <ProposalHero proposal={proposal} /> },
    { key: "intro", node: <ProposalIntro body={proposal.intro} /> },
    { key: "mission", node: <ProposalMission index={num()} /> },
    { key: "why", node: <ProposalWhySoftware index={num()} /> },
    { key: "team", node: <ProposalTeam index={num()} /> },
    { key: "clients", node: <ProposalClients index={num()} /> },
    {
      key: "solution",
      node: <ProposalSolutionFlow index={num()} solution={proposal.solution} />,
    },
    { key: "scope-intro", node: <ProposalScopeIntro intro={proposal.scopeIntro} /> },
    ...proposal.scope.map((block) => ({
      key: `scope-${block.title}`,
      node: <ProposalScope index={num()} block={block} />,
    })),
    ...(proposal.architecture
      ? [
          {
            key: "architecture",
            node: (
              <ProposalArchitecture index={num()} groups={proposal.architecture} />
            ),
          },
        ]
      : []),
    ...(proposal.outOfScope
      ? [
          {
            key: "out-of-scope",
            node: <ProposalInfoBlocks index={num()} block={proposal.outOfScope} />,
          },
        ]
      : []),
    ...(proposal.methodology
      ? [
          {
            key: "methodology",
            node: (
              <ProposalMethodology index={num()} methodology={proposal.methodology} />
            ),
          },
        ]
      : []),
    {
      key: "timeline",
      node: <ProposalTimeline index={num()} timeline={proposal.timeline} />,
    },
    ...(proposal.schedule
      ? [
          {
            key: "schedule",
            node: <ProposalSchedule index={num()} schedule={proposal.schedule} />,
          },
        ]
      : []),
    ...(proposal.hosting
      ? [
          {
            key: "hosting",
            node: <ProposalInfoBlocks index={num()} block={proposal.hosting} />,
          },
        ]
      : []),
    {
      key: "investment",
      node: <ProposalInvestment index={num()} investment={proposal.investment} />,
    },
    ...(proposal.acceptance
      ? [
          {
            key: "acceptance",
            node: <ProposalInfoBlocks index={num()} block={proposal.acceptance} />,
          },
        ]
      : []),
    ...(proposal.warranty
      ? [
          {
            key: "warranty",
            node: <ProposalInfoBlocks index={num()} block={proposal.warranty} />,
          },
        ]
      : []),
    { key: "process", node: <ProposalProcess index={num()} /> },
    {
      key: "closing",
      node: (
        <ProposalClosing lang={lang} clientName={proposal.client.name} />
      ),
    },
  ];

  return (
    <>
      <ProposalHeader lang={lang} clientName={proposal.client.name} />
      {sections.map((s) => (
        <Fragment key={s.key}>{s.node}</Fragment>
      ))}
    </>
  );
}
