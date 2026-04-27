import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import RollingButton from "@/components/RollingButton";
import { projects } from "@/data/projects";

const constructionServices = [
  "prípravné práce pre výstavbu",
  "realizácie účelových komunikácii",
  "terénne úpravy pre dokončovacie práce",
  "navážanie kameniva vrátane zhutnenia",
  "parkoviská",
  "drvenie stavebného odpadu priamo u zákazníka",
  "kompletná príprava spodnej stavby",
  "chodníky",
];

const maintenanceServices = [
  "obhliadka objektu na základe dohody",
  "posyp komunikácie v prípade poľadovice",
  "radlica opatrená gumeným britom, aby nedošlo k poškodeniu dlažby či obrubníkov",
  "odňatie snehu vrátane posypu",
];

const fleet = [
  "/images/decda5aa-dfba-45c9-8f61-29080822577a-1-e1743415001386.jpg",
  "/images/bf3e12d8-eed6-46f2-aa10-f86c04f3def5-1-e1739194140898.jpg",
  "/images/d9aee29b-4ff5-4cc9-904f-a9e7869d7db2-1.jpg",
];

const featured = projects.slice(0, 3);

export default function Home() {
  return (
    <>
      <Hero />

      {/* Sections after hero get higher z-index so they slide over the parallax bg */}
      <div className="relative z-10 bg-white">
        {/* Realizácie */}
        <section data-reveal-root className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
              <div>
                <p className="text-brand-accent uppercase tracking-[0.25em] text-xs font-semibold mb-3">
                  Naša práca
                </p>
                <h2 className="text-3xl md:text-4xl font-bold">Realizácie</h2>
              </div>
              <Link
                href="/referencie"
                className="reveal-item text-sm font-semibold border-b-2 border-brand-accent pb-1 hover:text-brand-accent transition-colors"
              >
                Zobraziť všetky →
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {featured.map((p) => (
                <Link
                  key={p.slug}
                  href={`/referencie#${p.slug}` as `/referencie#${string}`}
                  data-reveal
                  className="group relative block aspect-[4/3] overflow-hidden bg-brand-dark"
                >
                  <Image
                    src={p.images[0]}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="text-white font-semibold text-lg leading-snug">
                      {p.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Stavebné práce */}
        <section data-reveal-root className="py-24 bg-brand-bg">
          <div className="mx-auto max-w-7xl px-6 grid gap-12 md:grid-cols-2 items-center">
            <div data-reveal className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/decda5aa-dfba-45c9-8f61-29080822577a-1-e1743415001386.jpg"
                alt="Stavebné práce"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            <div>
              <p className="text-brand-accent uppercase tracking-[0.25em] text-xs font-semibold mb-3">
                Čo robíme
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Stavebné práce</h2>
              <p className="text-brand-muted mb-8 leading-relaxed">
                Realizujeme komplexné stavebné práce — od prípravy terénu cez
                budovanie účelových komunikácii až po finálne dokončovacie úpravy.
              </p>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                {constructionServices.map((s) => (
                  <li key={s} className="flex items-start gap-3">
                    <span className="mt-2 inline-block w-1.5 h-1.5 bg-brand-accent shrink-0" />
                    <span className="text-sm">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Údržba ciest */}
        <section data-reveal-root className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 grid gap-12 md:grid-cols-2 items-center">
            <div data-reveal className="md:order-2 relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/bf3e12d8-eed6-46f2-aa10-f86c04f3def5-1-e1739194140898.jpg"
                alt="Údržba ciest"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            <div className="md:order-1">
              <p className="text-brand-accent uppercase tracking-[0.25em] text-xs font-semibold mb-3">
                Zimná pohotovosť
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Údržba ciest</h2>
              <p className="text-brand-muted mb-8 leading-relaxed">
                Zabezpečujeme zimnú údržbu komunikácii — pluženie, posyp aj
                komplexný servis priamo u zákazníka.
              </p>
              <ul className="space-y-3">
                {maintenanceServices.map((s) => (
                  <li key={s} className="flex items-start gap-3">
                    <span className="mt-2 inline-block w-1.5 h-1.5 bg-brand-accent shrink-0" />
                    <span className="text-sm">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Strojový park */}
        <section data-reveal-root className="py-24 bg-brand-bg">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-brand-accent uppercase tracking-[0.25em] text-xs font-semibold mb-3">
                Vybavenie
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Strojový park</h2>
              <p className="text-brand-muted leading-relaxed">
                Vlastníme moderné stavebné stroje, ktoré nám umožňujú efektívne
                zvládať aj rozsiahle projekty.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {fleet.map((src, i) => (
                <div
                  key={src}
                  data-reveal
                  className="relative aspect-[4/3] overflow-hidden"
                >
                  <Image
                    src={src}
                    alt={`Stroj ${i + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-brand-dark text-white">
          <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div data-reveal>
              <h3 className="text-2xl md:text-3xl font-bold">Potrebujete poradiť?</h3>
              <p className="mt-2 text-white/70">
                Neváhajte nás kontaktovať a radi Vám poradíme.
              </p>
            </div>
            <div data-reveal>
              <RollingButton href="/kontakt" variant="primary" className="px-8 py-4">
                Kontakt
              </RollingButton>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
