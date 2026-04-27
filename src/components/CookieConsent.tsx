"use client";

import { useCallback, useEffect, useState } from "react";

type Prefs = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "jankrc.cookie.consent";
const OPEN_SETTINGS_EVENT = "jankrc:open-cookie-settings";

const DEFAULT_PREFS: Prefs = {
  necessary: true,
  analytics: false,
  marketing: false,
};

function readPrefs(): Prefs | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Prefs>;
    return {
      necessary: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
    };
  } catch {
    return null;
  }
}

function savePrefs(prefs: Prefs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

export function openCookieSettings() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_SETTINGS_EVENT));
}

export default function CookieConsent() {
  const [bannerOpen, setBannerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);

  useEffect(() => {
    const stored = readPrefs();
    if (stored) {
      setPrefs(stored);
    } else {
      // Show banner only after first paint to avoid CLS
      const t = setTimeout(() => setBannerOpen(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    const handler = () => {
      setSettingsOpen(true);
      setBannerOpen(false);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, handler);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, handler);
  }, []);

  const acceptAll = useCallback(() => {
    const next: Prefs = { necessary: true, analytics: true, marketing: true };
    savePrefs(next);
    setPrefs(next);
    setBannerOpen(false);
    setSettingsOpen(false);
  }, []);

  const rejectAll = useCallback(() => {
    const next: Prefs = { necessary: true, analytics: false, marketing: false };
    savePrefs(next);
    setPrefs(next);
    setBannerOpen(false);
    setSettingsOpen(false);
  }, []);

  const saveCurrent = useCallback(() => {
    savePrefs(prefs);
    setBannerOpen(false);
    setSettingsOpen(false);
  }, [prefs]);

  return (
    <>
      {bannerOpen && (
        <div
          role="dialog"
          aria-label="Súbory cookies"
          className="fixed inset-x-4 bottom-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-50 bg-brand-dark text-white shadow-2xl border border-white/10"
        >
          <div className="p-6">
            <h2 className="text-lg font-bold mb-2">Používame cookies</h2>
            <p className="text-sm text-white/75 leading-relaxed">
              Na našom webe používame cookies, aby sme zlepšili Váš zážitok,
              analyzovali návštevnosť a personalizovali obsah. Stlačením
              „Prijať všetko" súhlasíte s ich používaním.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={acceptAll}
                className="bg-brand-accent text-brand-dark font-semibold px-5 py-2.5 hover:bg-white transition-colors"
              >
                Prijať všetko
              </button>
              <button
                type="button"
                onClick={rejectAll}
                className="border border-white/30 text-white font-semibold px-5 py-2.5 hover:bg-white hover:text-brand-dark transition-colors"
              >
                Odmietnuť
              </button>
              <button
                type="button"
                onClick={() => {
                  setSettingsOpen(true);
                  setBannerOpen(false);
                }}
                className="text-sm font-semibold text-white/80 underline underline-offset-4 hover:text-brand-accent ml-auto"
              >
                Nastavenia
              </button>
            </div>
          </div>
        </div>
      )}

      {settingsOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Nastavenia cookies"
          className="fixed inset-0 z-[60] flex items-center justify-center px-4"
        >
          <button
            type="button"
            aria-label="Zavrieť"
            onClick={() => setSettingsOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div className="relative bg-white text-brand-dark w-full max-w-lg shadow-2xl">
            <div className="p-6 md:p-8 border-b border-brand-line flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">Nastavenia cookies</h2>
                <p className="text-sm text-brand-muted mt-1">
                  Vyberte si, ktoré cookies chcete povoliť.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSettingsOpen(false)}
                className="w-9 h-9 inline-flex items-center justify-center hover:bg-brand-bg"
                aria-label="Zavrieť"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M6 18L18 6" />
                </svg>
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-5 max-h-[60vh] overflow-y-auto">
              <ToggleRow
                title="Nevyhnutné"
                desc="Tieto cookies sú potrebné pre základnú funkčnosť stránky a nedajú sa vypnúť."
                checked
                disabled
                onChange={() => {}}
              />
              <ToggleRow
                title="Analytické"
                desc="Pomáhajú nám pochopiť, ako návštevníci používajú stránku, aby sme ju mohli zlepšovať."
                checked={prefs.analytics}
                onChange={(v) => setPrefs({ ...prefs, analytics: v })}
              />
              <ToggleRow
                title="Marketingové"
                desc="Používajú sa na zobrazovanie relevantných reklám a meranie ich účinnosti."
                checked={prefs.marketing}
                onChange={(v) => setPrefs({ ...prefs, marketing: v })}
              />
            </div>

            <div className="p-6 md:p-8 border-t border-brand-line flex flex-wrap gap-3 justify-end">
              <button
                type="button"
                onClick={rejectAll}
                className="border border-brand-line font-semibold px-5 py-2.5 hover:bg-brand-bg transition-colors"
              >
                Odmietnuť všetko
              </button>
              <button
                type="button"
                onClick={saveCurrent}
                className="border border-brand-dark font-semibold px-5 py-2.5 hover:bg-brand-dark hover:text-white transition-colors"
              >
                Uložiť výber
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="bg-brand-dark text-white font-semibold px-5 py-2.5 hover:bg-brand-accent hover:text-brand-dark transition-colors"
              >
                Prijať všetko
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ToggleRow({
  title,
  desc,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  desc: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-brand-muted mt-1 leading-relaxed">{desc}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={title}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative w-11 h-6 shrink-0 transition-colors ${
          checked ? "bg-brand-accent" : "bg-brand-line"
        } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 bg-white shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
