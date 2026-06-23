// Isla React con GSAP ScrollTrigger para la sección Métricas.
// GSAP y ScrollTrigger se importan desde utils/gsap.js para evitar registrar
// el plugin múltiples veces a lo largo de la aplicación.
import { useEffect, useRef } from 'react';
import { gsap } from '../utils/gsap.js';

export default function MetricsAnimation() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // MatchMedia lets us ship lighter, mobile-first animations on small screens
    // and richer motion on desktop/tablet without layout breakages.
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          '.metric-header-badge, .metric-header-title, .metric-header-desc, .metric-item, .metric-number, .metric-card, .metric-label, .metric-titulo, .metric-descripcion, .metric-solucion',
          { opacity: 1, x: 0, y: 0, scale: 1 }
        );
        return;
      }

      // Header entrance animations
      gsap.from('.metric-header-badge', {
        scrollTrigger: {
          trigger: '.metric-header-badge',
          start: 'top 95%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
      });

      gsap.from('.metric-header-title', {
        scrollTrigger: {
          trigger: '.metric-header-title',
          start: 'top 95%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.1,
        ease: 'power3.out',
      });

      gsap.from('.metric-header-desc', {
        scrollTrigger: {
          trigger: '.metric-header-desc',
          start: 'top 95%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.2,
        ease: 'power3.out',
      });

      // Per-metric animations
      gsap.utils.toArray('.metric-item').forEach((item, index) => {
        const numberEl = item.querySelector('.metric-number span');
        const targetNumber = parseInt(numberEl?.textContent || '0', 10);

        // Mobile: simple fade-up + scale (no horizontal slide to prevent overflow on narrow devices)
        mm.add('(max-width: 767px)', () => {
          gsap.from(item.querySelector('.metric-number'), {
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 30,
            scale: 0.9,
            duration: 0.8,
            ease: 'power3.out',
          });

          gsap.from(item.querySelector('.metric-card'), {
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out',
          });
        });

        // Tablet & Desktop: directional slide + stagger
        mm.add('(min-width: 768px)', () => {
          const direction = index % 2 === 0 ? -60 : 60;

          gsap.from(item.querySelector('.metric-number'), {
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            opacity: 0,
            x: direction,
            scale: 0.8,
            duration: 1,
            ease: 'power3.out',
          });

          gsap.from(item.querySelector('.metric-card'), {
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            opacity: 0,
            x: -direction * 0.5,
            y: 30,
            duration: 0.8,
            ease: 'power3.out',
          });
        });

        // Count-up effect (all breakpoints) using a GSAP proxy object
        if (targetNumber > 0 && numberEl) {
          const counter = { val: 0 };
          gsap.to(counter, {
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            val: targetNumber,
            duration: 1.5,
            delay: 0.3,
            ease: 'power2.out',
            onUpdate: () => {
              numberEl.textContent = Math.round(counter.val).toString();
            },
            onComplete: () => {
              numberEl.textContent = targetNumber.toString();
            },
          });
        }

        // Inner card elements stagger (all breakpoints)
        gsap.from(
          item.querySelectorAll(
            '.metric-label, .metric-titulo, .metric-descripcion, .metric-solucion'
          ),
          {
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 15,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.4,
            ease: 'power3.out',
          }
        );
      });

      // Decorative parallax glows (only enabled on tablet/desktop to save mobile performance)
      mm.add('(min-width: 768px)', () => {
        gsap.to('.metric-glow-1', {
          scrollTrigger: {
            trigger: '#metricas',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
          y: -40,
          ease: 'none',
        });

        gsap.to('.metric-glow-2', {
          scrollTrigger: {
            trigger: '#metricas',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
          y: 40,
          ease: 'none',
        });
      });
    }, '#metricas');

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  return <div ref={sectionRef} className="hidden" aria-hidden="true" />;
}
