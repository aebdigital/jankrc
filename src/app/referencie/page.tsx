import type { Metadata } from "next";
import Image from "next/image";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Referencie",
  description:
    "Realizácie a referenčné projekty spoločnosti Ján KRČ s.r.o. — opravy ciest, parkoviská, oporné múry, recyklačný dvor a ďalšie.",
  alternates: { canonical: "/referencie" },
  openGraph: {
    title: "Referencie | Ján KRČ s.r.o.",
    description:
      "Prehľad realizovaných stavebných a údržbárskych projektov.",
    url: "/referencie",
    type: "website",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Domov", item: "/" },
    { "@type": "ListItem", position: 2, name: "Referencie", item: "/referencie" },
  ],
};

export default function ReferenciePage() {
  return (
    <>
      <section data-reveal-root className="bg-brand-dark text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <p className="text-brand-accent uppercase tracking-[0.25em] text-xs font-semibold mb-4">
            Naše projekty
          </p>
          <h1 className="text-4xl md:text-5xl font-bold">Referencie</h1>
          <p className="mt-4 text-white/70 max-w-2xl">
            Prehľad realizovaných stavebných a údržbárskych projektov.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-20 space-y-24">
        {projects.map((p) => (
          <section
            key={p.slug}
            id={p.slug}
            data-reveal-root
            className="scroll-mt-24"
          >
            <div className="mb-8 max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-bold leading-snug">
                {p.title}
              </h2>
              <div className="mt-4 h-1 w-16 bg-brand-accent" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {p.images.map((src, i) => (
                <div
                  key={src}
                  data-reveal
                  className="relative aspect-[4/3] overflow-hidden bg-brand-bg group"
                >
                  <Image
                    src={src}
                    alt={`${p.title} — ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
