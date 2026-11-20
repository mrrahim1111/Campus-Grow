"use client";

import { useEffect, useRef, RefObject } from "react";

/**
 * Attaches an IntersectionObserver to the returned ref.
 * When the element enters the viewport, the class "visible" is added
 * to trigger CSS 3D reveal animations defined in globals.css.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.12
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Only animate once
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    // Observe the root element and all children that carry a reveal class
    const targets = [
      el,
      ...Array.from(
        el.querySelectorAll(
          ".reveal, .reveal-left, .reveal-right, .reveal-scale"
        )
      ),
    ];

    targets.forEach((t) => observer.observe(t));

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

/**
 * Observe every element matching a reveal selector inside `document`.
 * Call this once per page in a useEffect with an empty dep-array.
 */
export function observeAllReveal() {
  const selector = ".reveal, .reveal-left, .reveal-right, .reveal-scale";

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(selector).forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}
