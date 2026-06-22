import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function HeroMotion({ children, className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Only run animations if the user doesn't prefer reduced motion
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline();

        // 1. Words of the title appear from below with stagger
        tl.from(".hero-title .split-word", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out"
        })
        // 2. Subtitle appears with soft fade
        .from(".hero-subtitle", {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out"
        }, ">") // Runs after title completes (default, but explicit here)
        // 3. CTA button with elastic bounce
        .from(".hero-cta", {
          scale: 0.8,
          opacity: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.5)"
        }, "-=0.3"); // Overlaps by 0.3 seconds relative to the start/progress of subtitle
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}