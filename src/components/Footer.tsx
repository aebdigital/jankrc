import Link from "next/link";
import Image from "next/image";
import { nav, site } from "@/data/site";
import CookieSettingsLink from "./CookieSettingsLink";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-3">
        <div>
          <Image
            src="/images/logo.webp"
            alt={site.name}
            width={140}
            height={48}
            className="h-10 w-auto mb-6 brightness-0 invert"
          />
          <p className="font-semibold">{site.name}</p>
          <p className="text-sm text-white/70 mt-2">
            {site.address.street}
            <br />
            {site.address.cityZip}
            <br />
            {site.address.country}
          </p>
          <p className="text-sm text-white/70 mt-4">
            IČO: {site.ico}
            <br />
            DIČ: {site.dic}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-accent mb-4">
            Navigácia
          </h3>
          <ul className="space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-white/80 hover:text-brand-accent transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-accent mb-4">
            Kontakt
          </h3>
          <ul className="space-y-2 text-white/80">
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-brand-accent">
                {site.email}
              </a>
            </li>
            <li>
              <a href={`tel:${site.phoneTel}`} className="hover:text-brand-accent">
                {site.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 text-xs text-white/50 flex flex-col md:flex-row items-center justify-between gap-3">
          <p>Copyright © {new Date().getFullYear()} {site.name} All Rights Reserved.</p>
          <div className="flex items-center gap-5">
            <CookieSettingsLink className="text-white/60 hover:text-brand-accent transition-colors" />
            <p>
              Tvorba stránky —{" "}
              <a
                href="https://aebdigital.sk"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-accent transition-colors"
              >
                AEB Digital
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
