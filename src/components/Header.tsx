"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { nav, site } from "@/data/site";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-brand-line">
      <div className="hidden md:block bg-brand-dark text-white text-xs">
        <div className="mx-auto max-w-7xl px-6 py-2 flex items-center justify-end gap-6">
          <a
            href={`mailto:${site.email}`}
            className="flex items-center gap-2 hover:text-brand-accent transition-colors"
          >
            <span aria-hidden>✉</span>
            {site.email}
          </a>
          <a
            href={`tel:${site.phoneTel}`}
            className="flex items-center gap-2 hover:text-brand-accent transition-colors"
          >
            <span aria-hidden>☎</span>
            {site.phone}
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label={site.name}>
          <Image
            src="/images/logo.webp"
            alt={site.name}
            width={140}
            height={48}
            priority
            className="h-10 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium tracking-wide text-brand-dark hover:text-brand-accent transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/kontakt"
            className="bg-brand-dark text-white text-sm font-semibold px-5 py-2.5 hover:bg-brand-accent transition-colors"
          >
            Kontakt
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 text-brand-dark"
          aria-label="Otvoriť menu"
          aria-expanded={open}
        >
          <span className="sr-only">Menu</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <>
                <path d="M3 6h18" />
                <path d="M3 12h18" />
                <path d="M3 18h18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-brand-line bg-white">
          <nav className="mx-auto max-w-7xl px-6 py-4 flex flex-col gap-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-brand-dark font-medium hover:text-brand-accent"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-brand-line text-sm text-brand-muted flex flex-col gap-2">
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <a href={`tel:${site.phoneTel}`}>{site.phone}</a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
