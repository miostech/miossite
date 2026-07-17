This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Blog automático

Os posts do blog vêm de duas fontes, mescladas automaticamente:

- **Posts curados:** array `blogPosts` em `src/lib/blog.ts`.
- **Posts gerados por IA:** arquivos JSON em `content/blog/*.json`.

### Gerar um post na mão

```bash
OPENAI_API_KEY=sk-... npm run generate:post
```

Isso cria um novo `content/blog/<slug>.json` com conteúdo trilíngue (en/pt/es) e
fontes reais (via web search). Faça commit do arquivo para publicar — o deploy
(Vercel) reconstrói o site e o post aparece.

Variáveis de ambiente:

| Variável | Obrigatória | Padrão | Descrição |
| --- | --- | --- | --- |
| `OPENAI_API_KEY` | sim | — | Chave da API da OpenAI. |
| `OPENAI_MODEL` | não | `gpt-4o` | Modelo usado na geração. |
| `OPENAI_BASE_URL` | não | `https://api.openai.com/v1` | Base da API. |
| `ENABLE_WEB_SEARCH` | não | ligado | Defina `0` para desativar a busca na web. |

### Publicação agendada (GitHub Actions)

O workflow `.github/workflows/generate-blog-post.yml` roda toda segunda às 09:00
UTC (e também sob demanda pela aba Actions). Ele gera um post, faz commit em
`content/blog` e dá push — o que dispara o redeploy.

Para ativar: conecte o repositório ao GitHub + Vercel e adicione o secret
`OPENAI_API_KEY` em **Settings → Secrets and variables → Actions**. Ajuste a
frequência editando o `cron` no workflow.

## Newsletter

O rodapé tem um formulário “Assine nossa newsletter”. Ao assinar, o e-mail é
adicionado a uma audiência no [Resend](https://resend.com); quando um novo post
é publicado, todos os assinantes recebem um aviso por e-mail.

Fluxo:

- **Assinar:** o formulário (`NewsletterForm`) envia um POST para `/api/subscribe`
  (`src/app/api/subscribe/route.ts`), que adiciona o contato à audiência do Resend.
- **Avisar:** o script `scripts/notify-subscribers.mjs` cria e envia um *broadcast*
  do Resend com o post mais recente. Ele roda no workflow do blog logo após um
  novo post ser commitado.

Pré-requisitos no Resend: criar uma **audiência** e verificar um **domínio** de
envio (ex.: `mios.pt`).

Variáveis de ambiente:

| Variável | Onde | Descrição |
| --- | --- | --- |
| `RESEND_API_KEY` | Vercel (runtime) + GitHub Actions (secret) | Chave da API do Resend. |
| `RESEND_AUDIENCE_ID` | Vercel (runtime) + GitHub Actions (secret) | ID da audiência que guarda os assinantes. |
| `NEWSLETTER_FROM` | GitHub Actions (secret) | Remetente verificado, ex.: `Mios Tech <blog@mios.pt>`. |
| `SITE_URL` | opcional | Padrão `https://www.mios.pt`. |

Observações:

- `RESEND_API_KEY` e `RESEND_AUDIENCE_ID` precisam existir no **runtime da Vercel**
  (Project → Settings → Environment Variables) para o `/api/subscribe` funcionar,
  e como **secrets do Actions** para o envio automático do broadcast.
- Se as variáveis não estiverem configuradas, o formulário mostra uma mensagem de
  erro amigável e o passo de envio no workflow é ignorado sem quebrar o pipeline.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# miossite
