"use client";

import { useState } from "react";
import RollingButton from "./RollingButton";

type Status = "idle" | "submitting" | "ok" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      website: String(data.get("website") ?? ""), // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !json.ok) {
        setError(json.error ?? "Správu sa nepodarilo odoslať. Skúste to znova.");
        setStatus("error");
        return;
      }
      form.reset();
      setStatus("ok");
    } catch {
      setError("Nepodarilo sa pripojiť k serveru.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot — hidden from users, filled only by bots */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <label className="block">
          <span className="block text-xs font-semibold uppercase tracking-wider text-brand-muted mb-2">
            Meno
          </span>
          <input
            required
            name="name"
            type="text"
            minLength={2}
            maxLength={200}
            className="w-full border border-brand-line bg-white px-4 py-3 text-sm focus:outline-none focus:border-brand-accent"
          />
        </label>
        <label className="block">
          <span className="block text-xs font-semibold uppercase tracking-wider text-brand-muted mb-2">
            Email
          </span>
          <input
            required
            name="email"
            type="email"
            className="w-full border border-brand-line bg-white px-4 py-3 text-sm focus:outline-none focus:border-brand-accent"
          />
        </label>
      </div>
      <label className="block">
        <span className="block text-xs font-semibold uppercase tracking-wider text-brand-muted mb-2">
          Správa
        </span>
        <textarea
          required
          name="message"
          rows={6}
          minLength={5}
          maxLength={5000}
          className="w-full border border-brand-line bg-white px-4 py-3 text-sm focus:outline-none focus:border-brand-accent resize-none"
        />
      </label>

      <div className="flex items-center gap-4 flex-wrap">
        <RollingButton
          type="submit"
          variant="dark"
          disabled={status === "submitting"}
          className="px-8 py-3.5"
        >
          {status === "submitting" ? "Odosielam…" : "Odoslať"}
        </RollingButton>

        {status === "ok" && (
          <p
            role="status"
            className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2"
          >
            Ďakujeme! Vaša správa bola odoslaná.
          </p>
        )}
        {status === "error" && error && (
          <p
            role="alert"
            className="text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-2"
          >
            {error}
          </p>
        )}
      </div>
    </form>
  );
}
