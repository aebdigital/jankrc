"use client";

import { openCookieSettings } from "./CookieConsent";

type Props = { className?: string; children?: React.ReactNode };

export default function CookieSettingsLink({ className, children }: Props) {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className={className ?? "hover:text-brand-accent transition-colors"}
    >
      {children ?? "Cookies"}
    </button>
  );
}
