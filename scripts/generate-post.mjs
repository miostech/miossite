#!/usr/bin/env node
// Generates a new trilingual (en/pt/es) blog post using the OpenAI API and
// writes it as a JSON file into content/blog/. The site reads that folder at
// build time, so committing the file is what "publishes" the post.
//
// Usage:  OPENAI_API_KEY=sk-... node scripts/generate-post.mjs
//
// Env vars:
//   OPENAI_API_KEY      (required) OpenAI API key.
//   OPENAI_MODEL        (optional) model id. Default: gpt-4o.
//   OPENAI_BASE_URL     (optional) API base. Default: https://api.openai.com/v1.
//   ENABLE_WEB_SEARCH   (optional) "0" disables the web_search tool. Default: on.

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const contentDir = join(projectRoot, "content", "blog");
const curatedFile = join(projectRoot, "src", "lib", "blog.ts");

const API_KEY = process.env.OPENAI_API_KEY;
const MODEL = process.env.OPENAI_MODEL || "gpt-4o";
const BASE_URL = (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, "");
const WEB_SEARCH = process.env.ENABLE_WEB_SEARCH !== "0";

const LOCALES = ["en", "pt", "es"];
const CATEGORIES = ["ai", "engineering", "teams", "operations", "mobile"];

if (!API_KEY) {
  console.error("Missing OPENAI_API_KEY environment variable.");
  process.exit(1);
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

// Collect slugs and English titles already used, so the model avoids repeats.
function existingTopics() {
  const slugs = new Set();
  const titles = [];

  try {
    const ts = readFileSync(curatedFile, "utf8");
    for (const m of ts.matchAll(/slug:\s*"([^"]+)"/g)) slugs.add(m[1]);
    for (const m of ts.matchAll(/title:\s*"([^"]+)"/g)) titles.push(m[1]);
  } catch {
    /* ignore */
  }

  if (existsSync(contentDir)) {
    for (const file of readdirSync(contentDir)) {
      if (!file.endsWith(".json")) continue;
      try {
        const post = JSON.parse(readFileSync(join(contentDir, file), "utf8"));
        if (post.slug) slugs.add(post.slug);
        if (post.content?.en?.title) titles.push(post.content.en.title);
      } catch {
        /* ignore */
      }
    }
  }

  return { slugs: [...slugs], titles };
}

function buildPrompt({ slugs, titles }) {
  return `You are the editorial engine for the Mios Tech blog. Mios Tech is a senior,
nearshore software engineering firm (teams across the US, Europe and Brazil) that
builds AI-driven software, automation and mobile/cross-platform products.

Write ONE new blog post about a current, concrete trend in software engineering,
AI, automation, team-building/nearshoring, or mobile development. Ground every
claim in real, verifiable facts and cite 2-4 real sources with working URLs that
you find via web search. Never invent statistics or URLs.

Voice: sharp, confident, pragmatic, insider — like a senior engineer explaining
what actually matters to a technical decision-maker. No fluff, no hype. End with
a short paragraph tying the topic back to how Mios Tech works.

The post MUST be fully written in three languages: English (en), Brazilian
Portuguese (pt) and Spanish (es). All three must convey the same content.

Do NOT repeat any of these already-published topics/slugs:
${slugs.map((s) => `- ${s}`).join("\n")}

Existing titles (avoid overlapping angles):
${titles.map((t) => `- ${t}`).join("\n")}

Return ONLY a JSON object (no markdown fences, no commentary) with EXACTLY this shape:

{
  "slug": "kebab-case-english-slug-unique-and-descriptive",
  "date": "${todayISO()}",
  "readingMinutes": <integer 4-7>,
  "category": <one of: ${CATEGORIES.join(", ")}>,
  "sources": [ { "label": "Publisher, Title", "url": "https://..." } ],
  "content": {
    "en": { "title": "...", "excerpt": "1-2 sentence hook", "body": [ <blocks> ] },
    "pt": { "title": "...", "excerpt": "...", "body": [ <blocks> ] },
    "es": { "title": "...", "excerpt": "...", "body": [ <blocks> ] }
  }
}

Each "body" is an array of 6-9 blocks. A block is one of:
  { "type": "paragraph", "text": "..." }
  { "type": "heading", "text": "..." }
  { "type": "list", "items": ["...", "..."] }
Start with a paragraph, use 2-4 headings, include at least one list, and finish
with a paragraph about Mios Tech. Keep the same structure across all languages.`;
}

function extractText(data) {
  if (typeof data.output_text === "string" && data.output_text.trim()) {
    return data.output_text;
  }
  let text = "";
  for (const item of data.output ?? []) {
    for (const part of item.content ?? []) {
      if (part.type === "output_text" && typeof part.text === "string") {
        text += part.text;
      }
    }
  }
  return text;
}

function parseJsonLoose(text) {
  const trimmed = text.trim().replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const start = trimmed.indexOf("{");
    const end = trimmed.lastIndexOf("}");
    if (start !== -1 && end > start) {
      return JSON.parse(trimmed.slice(start, end + 1));
    }
    throw new Error("Model did not return valid JSON.");
  }
}

async function callOpenAI(prompt, { withTools }) {
  const body = {
    model: MODEL,
    input: prompt,
  };
  if (withTools) body.tools = [{ type: "web_search" }];

  const res = await fetch(`${BASE_URL}/responses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`OpenAI request failed (${res.status}): ${detail}`);
  }
  return res.json();
}

function validate(post) {
  const errors = [];
  if (!post.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug)) {
    errors.push("invalid or missing slug");
  }
  if (!CATEGORIES.includes(post.category)) errors.push("invalid category");
  if (!Number.isInteger(post.readingMinutes)) errors.push("readingMinutes must be an integer");
  if (!Array.isArray(post.sources) || post.sources.length === 0) errors.push("missing sources");
  for (const locale of LOCALES) {
    const c = post.content?.[locale];
    if (!c) {
      errors.push(`missing ${locale} content`);
      continue;
    }
    if (!c.title || !c.excerpt || !Array.isArray(c.body) || c.body.length === 0) {
      errors.push(`incomplete ${locale} content`);
    }
  }
  if (errors.length) throw new Error(`Generated post failed validation: ${errors.join("; ")}`);
}

async function main() {
  const topics = existingTopics();
  const prompt = buildPrompt(topics);

  let data;
  try {
    data = await callOpenAI(prompt, { withTools: WEB_SEARCH });
  } catch (err) {
    if (WEB_SEARCH) {
      console.warn(`Web search attempt failed, retrying without tools: ${err.message}`);
      data = await callOpenAI(prompt, { withTools: false });
    } else {
      throw err;
    }
  }

  const post = parseJsonLoose(extractText(data));
  post.date = post.date || todayISO();
  validate(post);

  if (topics.slugs.includes(post.slug)) {
    throw new Error(`Model returned a duplicate slug: ${post.slug}`);
  }

  if (!existsSync(contentDir)) mkdirSync(contentDir, { recursive: true });
  const outPath = join(contentDir, `${post.slug}.json`);
  writeFileSync(outPath, `${JSON.stringify(post, null, 2)}\n`, "utf8");

  console.log(`Created ${outPath}`);
  console.log(`Title (en): ${post.content.en.title}`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
