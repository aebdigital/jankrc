import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollReveal from "@/components/ScrollReveal";
import CookieConsent from "@/components/CookieConsent";
import { site } from "@/data/site";

const montserrat = localFont({
  src: [
    { path: "../fonts/Montserrat-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Montserrat-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Montserrat-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/Montserrat-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-montserrat",
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://jankrc.sk";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ján KRČ s.r.o. — Stavebné služby Myjava",
    template: "%s | Ján KRČ s.r.o.",
  },
  description:
    "Stavebné práce, údržba ciest a strojový park v oblasti Myjava. Dlhoročné skúsenosti v stavebníctve a údržbe pozemných komunikácii.",
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    "stavebné práce",
    "údržba ciest",
    "Myjava",
    "Slovensko",
    "Ján KRČ",
    "stavebníctvo",
    "zimná údržba",
    "zhutnenie",
    "parkoviská",
    "chodníky",
    "recyklačný dvor",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "sk_SK",
    url: "/",
    siteName: site.name,
    title: "Ján KRČ s.r.o. — Stavebné služby Myjava",
    description:
      "Stavebné práce, údržba ciest a strojový park v oblasti Myjava.",
    images: [
      {
        url: "/images/close-up-construction-worker-construction-site-82fb2068.webp",
        width: 1024,
        height: 683,
        alt: "Ján KRČ s.r.o. — stavebné služby",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ján KRČ s.r.o. — Stavebné služby Myjava",
    description:
      "Stavebné práce, údržba ciest a strojový park v oblasti Myjava.",
    images: [
      "/images/close-up-construction-worker-construction-site-82fb2068.webp",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: { icon: "/favicon.ico" },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: site.name,
  url: SITE_URL,
  email: site.email,
  telephone: site.phone,
  image: `${SITE_URL}/images/logo.webp`,
  logo: `${SITE_URL}/images/logo.webp`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: "Myjava",
    postalCode: "907 03",
    addressCountry: "SK",
  },
  taxID: site.dic,
  vatID: site.icDph,
  identifier: site.ico,
  areaServed: { "@type": "Place", name: "Myjava, Slovensko" },
  knowsAbout: [
    "Stavebné práce",
    "Údržba ciest",
    "Zimná údržba",
    "Recyklácia stavebného odpadu",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: SITE_URL,
  inLanguage: "sk-SK",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sk" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-brand-dark">
        <SmoothScroll />
        <ScrollReveal />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  );
}
