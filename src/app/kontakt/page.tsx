import type { Metadata } from "next";
import { site } from "@/data/site";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktné údaje spoločnosti Ján KRČ s.r.o. — adresa, telefón, email, IČO, DIČ, IBAN.",
  alternates: { canonical: "/kontakt" },
  openGraph: {
    title: "Kontakt | Ján KRČ s.r.o.",
    description: "Spojte sa s nami — radi vám poradíme s vaším projektom.",
    url: "/kontakt",
    type: "website",
  },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Kontakt — Ján KRČ s.r.o.",
  url: "/kontakt",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Domov", item: "/" },
    { "@type": "ListItem", position: 2, name: "Kontakt", item: "/kontakt" },
  ],
};

export default function KontaktPage() {
  return (
    <>
      <section data-reveal-root className="bg-brand-dark text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <p className="text-brand-accent uppercase tracking-[0.25em] text-xs font-semibold mb-4">
            Spojte sa s nami
          </p>
          <h1 className="text-4xl md:text-5xl font-bold">Kontakt</h1>
          <p className="mt-4 text-white/70 max-w-2xl">
            Neváhajte nás kontaktovať a radi Vám poradíme s Vaším projektom.
          </p>
        </div>
      </section>

      <section data-reveal-root className="py-20">
        <div className="mx-auto max-w-7xl px-6 grid gap-16 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold mb-2">{site.name}</h2>
            <div className="h-1 w-12 bg-brand-accent mb-8" />

            <div className="space-y-8">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-muted mb-2">
                  Adresa
                </h3>
                <p>
                  {site.address.street}
                  <br />
                  {site.address.cityZip}
                  <br />
                  {site.address.country}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-muted mb-2">
                    Email
                  </h3>
                  <a
                    href={`mailto:${site.email}`}
                    className="hover:text-brand-accent transition-colors"
                  >
                    {site.email}
                  </a>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-muted mb-2">
                    Telefón
                  </h3>
                  <a
                    href={`tel:${site.phoneTel}`}
                    className="hover:text-brand-accent transition-colors"
                  >
                    {site.phone}
                  </a>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-6 pt-6 border-t border-brand-line">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-muted mb-1">
                    IČO
                  </h3>
                  <p className="text-sm">{site.ico}</p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-muted mb-1">
                    DIČ
                  </h3>
                  <p className="text-sm">{site.dic}</p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-muted mb-1">
                    IČ DPH
                  </h3>
                  <p className="text-sm">{site.icDph}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-brand-line">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-muted mb-2">
                  Bankové spojenie
                </h3>
                <p className="text-sm">
                  {site.bank.name}
                  <br />
                  IBAN: {site.bank.iban}
                </p>
              </div>

              <p className="text-xs text-brand-muted leading-relaxed pt-6 border-t border-brand-line">
                {site.registry}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">Napíšte nám</h2>
            <div className="h-1 w-12 bg-brand-accent mb-8" />
            <ContactForm />
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
