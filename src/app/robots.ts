import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// OpenAI web crawlers, allowed explicitly so the site is eligible for ChatGPT
// search and OpenAI's advertiser features (they are already covered by "*",
// but listing them documents intent and survives future "*" restrictions).
// https://platform.openai.com/docs/bots
const OPENAI_BOTS = ["OAI-SearchBot", "ChatGPT-User", "GPTBot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: OPENAI_BOTS, allow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
