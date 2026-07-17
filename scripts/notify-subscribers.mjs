#!/usr/bin/env node
// Sends a newsletter broadcast (via Resend) announcing the most recent blog
// post to every contact in the configured Resend audience.
//
// It is meant to run in CI right after a new post is committed to
// content/blog/. If the required env vars are missing it exits quietly with a
// warning so it never breaks the pipeline.
//
// Env vars:
//   RESEND_API_KEY       (required) Resend API key.
//   RESEND_AUDIENCE_ID   (required) Audience the broadcast is sent to.
//   NEWSLETTER_FROM      (required) Verified sender, e.g. "Mios Tech <blog@mios.pt>".
//   SITE_URL             (optional) Default: https://www.mios.pt
//   POST_SLUG            (optional) Force a specific post; otherwise newest wins.

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const contentDir = join(__dirname, "..", "content", "blog");

const API_KEY = process.env.RESEND_API_KEY;
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;
const FROM = process.env.NEWSLETTER_FROM;
const SITE_URL = (process.env.SITE_URL || "https://www.mios.pt").replace(/\/$/, "");
const FORCED_SLUG = process.env.POST_SLUG;

function warnAndExit(message) {
  console.warn(`notify-subscribers: ${message}`);
  process.exit(0);
}

if (!API_KEY || !AUDIENCE_ID || !FROM) {
  warnAndExit(
    "missing RESEND_API_KEY, RESEND_AUDIENCE_ID or NEWSLETTER_FROM; skipping.",
  );
}

function loadPosts() {
  if (!existsSync(contentDir)) return [];
  const posts = [];
  for (const file of readdirSync(contentDir)) {
    if (!file.endsWith(".json")) continue;
    try {
      const fullPath = join(contentDir, file);
      const post = JSON.parse(readFileSync(fullPath, "utf8"));
      if (post.slug && post.content) {
        post.__mtime = statSync(fullPath).mtimeMs;
        posts.push(post);
      }
    } catch {
      /* ignore malformed files */
    }
  }
  return posts;
}

function pickPost(posts) {
  if (FORCED_SLUG) {
    return posts.find((p) => p.slug === FORCED_SLUG) || null;
  }
  return posts.sort((a, b) => {
    const byDate = String(b.date || "").localeCompare(String(a.date || ""));
    return byDate !== 0 ? byDate : b.__mtime - a.__mtime;
  })[0] || null;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHtml(post) {
  const en = post.content.en || Object.values(post.content)[0];
  const title = escapeHtml(en.title);
  const excerpt = escapeHtml(en.excerpt || "");
  const url = `${SITE_URL}/en/blog/${post.slug}`;
  const ptUrl = `${SITE_URL}/pt/blog/${post.slug}`;
  const esUrl = `${SITE_URL}/es/blog/${post.slug}`;

  return `<!doctype html>
<html>
  <body style="margin:0;background:#f3f1ec;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#14130f;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f1ec;padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid rgba(20,19,15,0.12);">
            <tr>
              <td style="padding:32px 32px 8px;">
                <p style="margin:0;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#4c1d95;">New on the Mios Tech blog</p>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 32px 0;">
                <h1 style="margin:0;font-size:26px;line-height:1.2;color:#14130f;">${title}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px 0;">
                <p style="margin:0;font-size:16px;line-height:1.6;color:#6a675e;">${excerpt}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px 32px;">
                <a href="${url}" style="display:inline-block;background:#14130f;color:#f3f1ec;text-decoration:none;padding:14px 24px;font-size:14px;font-weight:600;">Read the post &rarr;</a>
                <p style="margin:20px 0 0;font-size:13px;color:#98948a;">Also available in <a href="${ptUrl}" style="color:#4c1d95;">Portugu&ecirc;s</a> &middot; <a href="${esUrl}" style="color:#4c1d95;">Espa&ntilde;ol</a></p>
              </td>
            </tr>
          </table>
          <p style="max-width:560px;margin:20px auto 0;font-size:12px;line-height:1.6;color:#98948a;">
            You are receiving this because you subscribed to the Mios Tech newsletter.<br />
            <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#98948a;">Unsubscribe</a>
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

async function resend(path, body) {
  const res = await fetch(`https://api.resend.com${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const payload = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      `Resend ${path} failed (${res.status}): ${JSON.stringify(payload)}`,
    );
  }
  return payload;
}

async function main() {
  const post = pickPost(loadPosts());
  if (!post) warnAndExit("no post found to announce; skipping.");

  const en = post.content.en || Object.values(post.content)[0];
  const subject = en.title;

  const broadcast = await resend("/broadcasts", {
    audience_id: AUDIENCE_ID,
    from: FROM,
    subject,
    name: `Blog: ${post.slug}`,
    html: buildHtml(post),
  });

  await resend(`/broadcasts/${broadcast.id}/send`, {});

  console.log(`notify-subscribers: broadcast sent for "${post.slug}".`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
