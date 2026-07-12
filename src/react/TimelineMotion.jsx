import React, { useRef } from 'react';
import { motion, useScroll, useReducedMotion } from 'framer-motion';

const iconos = {
  diagnostico: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4C7FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
      <path d="M11 8v6" />
      <path d="M8 11h6" />
    </svg>
  ),
  estrategia: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4C7FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12h5l2-7 4 14 2-7h5" />
    </svg>
  ),
  implementacion: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4C7FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  optimizacion: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4C7FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  ),
};

export default function TimelineMotion({ pasos }) {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll tracking en el contenedor vertical unificado
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"]
  });

  return (
    <div ref={containerRef} className="relative flex flex-col gap-8 md:gap-12">
      {/* Línea vertical progresiva de fondo (unificada) */}
      <div className="absolute left-[19px] md:left-[27px] top-[20px] md:top-[28px] bottom-[20px] md:bottom-[28px] w-[2px] bg-gradient-to-b from-dab-border/40 via-dab-border/40 to-transparent pointer-events-none">
        {!shouldReduceMotion ? (
          <motion.div
            className="w-full bg-gradient-to-b from-dab-accent to-dab-accent/50"
            style={{ scaleY: scrollYProgress, transformOrigin: "top", height: "100%" }}
          />
        ) : (
          <div className="w-full h-full bg-dab-accent/50" />
        )}
      </div>

      {pasos.map((paso, idx) => (
        <motion.div
          key={paso.id}
          className="group relative flex gap-4 md:gap-8"
          initial={!shouldReduceMotion ? { opacity: 0, x: -16 } : { opacity: 1 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: idx * 0.08 }}
        >
          {/* Nodo circular */}
          <motion.div
            className={`relative z-10 shrink-0 w-10 h-10 md:w-14 md:h-14 rounded-full liquid-surface flex items-center justify-center transition-all duration-300`}
            initial={{ }}
            whileInView={{
              scale: !shouldReduceMotion ? 1.08 : 1,
              boxShadow: !shouldReduceMotion ? "0 0 16px rgba(76, 127, 255, 0.4)" : "none"
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            aria-label={`Paso ${paso.id}: ${paso.titulo}`}
          >
            <span className="font-mono text-sm md:text-lg font-bold text-dab-accent">0{paso.id}</span>
          </motion.div>

          {/* Card */}
          <div className="flex-1 group relative rounded-2xl liquid-surface p-5 md:p-6 transition-all duration-300 hover:-translate-y-0.5 shadow-sm hover:shadow-dab-soft">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-3">
              {/* Icono animado */}
              <motion.div
                className="w-10 h-10 md:w-12 md:h-12 rounded-xl liquid-border flex items-center justify-center shrink-0"
                animate={!shouldReduceMotion ? { y: [0, -4, 0] } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: idx * 0.4 }}
              >
                {iconos[paso.icono]
                  ? React.cloneElement(iconos[paso.icono], { width: 22, height: 22 })
                  : iconos.diagnostico}
              </motion.div>
              
              <div className="flex-1 flex flex-wrap items-baseline gap-2 md:gap-3">
                <h3 className="font-display text-lg md:text-xl font-bold text-white tracking-tight leading-tight">{paso.titulo}</h3>
                <span className="text-[10px] font-mono text-dab-muted/60 bg-dab-border/30 px-2 py-0.5 rounded inline-block">{paso.tiempo}</span>
              </div>
            </div>
            <p className="font-body text-sm md:text-base text-dab-muted leading-relaxed max-w-4xl">{paso.linea}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
