"use client";

import { useEffect } from "react";

/**
 * Walks the DOM, marks every element under `[data-reveal-root]` with
 * `.reveal`, and adds `.reveal-in` once it intersects the viewport.
 * Children are staggered using a CSS variable.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(
      "[data-reveal], [data-reveal-root] h1, [data-reveal-root] h2, [data-reveal-root] h3, [data-reveal-root] p, [data-reveal-root] li, [data-reveal-root] .reveal-item",
    );

    const seen = new WeakSet<Element>();

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !seen.has(entry.target)) {
            seen.add(entry.target);
            (entry.target as HTMLElement).classList.add("reveal-in");
            obs.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );

    targets.forEach((el, i) => {
      el.classList.add("reveal");
      // small natural stagger by DOM order within section
      const parent = el.closest("[data-reveal-root]") ?? el.parentElement;
      const peers = parent
        ? Array.from(parent.querySelectorAll(".reveal"))
        : [];
      const idx = peers.indexOf(el);
      const delay = Math.min(idx * 60, 360);
      el.style.setProperty("--reveal-delay", `${delay}ms`);
      obs.observe(el);
      void i;
    });

    return () => obs.disconnect();
  }, []);

  return null;
}
