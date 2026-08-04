import type { Proposal } from "./types";
import { telecom } from "./telecom";
import { engagenow } from "./engagenow";

/** Registry of all proposals, keyed by slug. Add a new file + entry per client. */
export const proposals: Record<string, Proposal> = {
  [telecom.slug]: telecom,
  [engagenow.slug]: engagenow,
};

export const proposalSlugs = Object.keys(proposals);

export function getProposal(slug: string): Proposal | undefined {
  return proposals[slug];
}

export type { Proposal } from "./types";
