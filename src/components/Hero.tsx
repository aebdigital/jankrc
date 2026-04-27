"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import RollingButton from "./RollingButton";

export default function Hero() {
  const bgRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let frame = 0;
    function update() {
      if (!sectionRef.current || !bgRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      // Only parallax while hero is in or near the viewport
      if (rect.bottom < -200 || rect.top > window.innerHeight) return;
      const offset = -rect.top * 0.35; // slower than scroll
      bgRef.current.style.transform = `translate3d(0, ${offset}px, 0) scale(1.08)`;
    }
    function tick() {
      update();
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section
      ref={sectionRef}
      data-reveal-root
      className="relative isolate overflow-hidden bg-brand-dark text-white"
      style={{ zIndex: 0 }}
    >
      <div ref={bgRef} className="absolute inset-0 -z-10 will-change-transform">
        <Image
          src="/images/close-up-construction-worker-construction-site-82fb2068.webp"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-45"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-32 md:py-44 lg:py-52">
        <div className="max-w-2xl">
          <p
            data-reveal
            className="text-brand-accent uppercase tracking-[0.3em] text-xs font-semibold mb-6"
          >
            Ján KRČ s.r.o.
          </p>
          <h1
            data-reveal
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05]"
          >
            Stavebné služby
            <br />
            <span className="text-brand-accent">v oblasti Myjava</span>
          </h1>
          <p
            data-reveal
            className="mt-8 text-lg md:text-xl text-white/85 max-w-xl leading-relaxed"
          >
            Dlhoročné skúsenosti v stavebníctve a údržbe pozemných
            komunikácii. Od prípravných prác cez realizáciu až po zimnú údržbu.
          </p>
          <div data-reveal className="mt-10 flex flex-wrap gap-4">
            <RollingButton href="/referencie" variant="primary">
              Pozrite si referencie
            </RollingButton>
            <RollingButton href="/kontakt" variant="outline">
              Kontaktujte nás
            </RollingButton>
          </div>
        </div>
      </div>
    </section>
  );
}
