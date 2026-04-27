// Netlify Function: POST /.netlify/functions/contact
// Validates the contact form payload and forwards it to SMTP2GO.
//
// Required environment variables (configure in Netlify dashboard):
//   - SMTP2GO_API_KEY        SMTP2GO API key
//   - SMTP2GO_SENDER         Verified sender (e.g. "Web <web@jankrc.sk>")
//   - CONTACT_FORM_RECIPIENT Where the form submissions are delivered

const SMTP2GO_ENDPOINT = "https://api.smtp2go.com/v3/email/send";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json; charset=utf-8",
};

function isEmail(value) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ ok: false, error: "Method not allowed" }),
    };
  }

  const apiKey = process.env.SMTP2GO_API_KEY;
  const sender = process.env.SMTP2GO_SENDER;
  const recipient = process.env.CONTACT_FORM_RECIPIENT;

  if (!apiKey || !sender || !recipient) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        ok: false,
        error: "Server is not configured for email delivery.",
      }),
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ ok: false, error: "Invalid JSON" }),
    };
  }

  // Honeypot — silent success for bots
  if (payload.website && String(payload.website).trim() !== "") {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ ok: true }),
    };
  }

  const name = String(payload.name || "").trim();
  const email = String(payload.email || "").trim();
  const message = String(payload.message || "").trim();

  if (name.length < 2 || name.length > 200) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ ok: false, error: "Zadajte platné meno." }),
    };
  }
  if (!isEmail(email)) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ ok: false, error: "Zadajte platný email." }),
    };
  }
  if (message.length < 5 || message.length > 5000) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ ok: false, error: "Správa je príliš krátka." }),
    };
  }

  const subject = `Dopyt z webu — ${name}`;
  const textBody = `Meno: ${name}\nEmail: ${email}\n\n${message}`;
  const htmlBody = `
    <h2>Nový dopyt z webu jankrc.sk</h2>
    <p><strong>Meno:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Správa:</strong></p>
    <p style="white-space: pre-wrap">${escapeHtml(message)}</p>
  `.trim();

  try {
    const res = await fetch(SMTP2GO_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Smtp2go-Api-Key": apiKey,
      },
      body: JSON.stringify({
        sender,
        to: [recipient],
        subject,
        text_body: textBody,
        html_body: htmlBody,
        reply_to: email,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("SMTP2GO error", res.status, detail);
      return {
        statusCode: 502,
        headers: corsHeaders,
        body: JSON.stringify({
          ok: false,
          error: "Email service unavailable.",
        }),
      };
    }
  } catch (err) {
    console.error("contact function error", err);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ ok: false, error: "Unexpected error." }),
    };
  }

  return {
    statusCode: 200,
    headers: corsHeaders,
    body: JSON.stringify({ ok: true }),
  };
};
