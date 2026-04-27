# SMTP2GO + Netlify setup

The contact form on `/kontakt` posts JSON to `/api/contact`, which Netlify
rewrites to the serverless function in [netlify/functions/contact.js](netlify/functions/contact.js).
The function calls the SMTP2GO REST API to deliver the message.

## 1. SMTP2GO

1. Create an account at <https://www.smtp2go.com/>.
2. Verify the sender domain (add SPF + DKIM DNS records they provide).
3. Create an API key with **Email Send** permission.

## 2. Netlify environment variables

Add the following in **Site settings → Build & deploy → Environment**:

| Key | Example | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://jankrc.sk` | Used by sitemap / canonical / OG |
| `CONTACT_FORM_RECIPIENT` | `krc@jankrc.sk` | Inbox that receives leads |
| `SMTP2GO_API_KEY` | `api-XXXXXXXX…` | From SMTP2GO dashboard |
| `SMTP2GO_SENDER` | `Web jankrc.sk <web@jankrc.sk>` | Must be on a verified domain |

Local development: copy [.env.example](.env.example) to `.env.local`.

## 3. Local testing

Install the Netlify CLI and run the dev server with functions:

```bash
npm install -g netlify-cli
netlify dev
```

This serves Next.js and the function on the same origin. Submit the form
on `/kontakt` and watch the function logs in the terminal.

## 4. Deployment

Connect the repo to Netlify. The included [netlify.toml](netlify.toml)
configures the build, the `@netlify/plugin-nextjs` runtime, and the
`/api/contact → /.netlify/functions/contact` rewrite.

## 5. Troubleshooting

- **500 "Server is not configured…"** — one of the env vars is missing.
- **502 "Email service unavailable"** — check SMTP2GO logs and the
  function logs in Netlify; usually a sender that is not verified.
- **400 validation errors** — payload failed server-side validation
  (name 2-200 chars, valid email, message 5-5000 chars).
