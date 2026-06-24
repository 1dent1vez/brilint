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

  // Scroll tracking en el contenedor padre
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.15"]
  });

  return (
    <div ref={containerRef} className="relative space-y-12">
      
      {/* MOBILE: Timeline vertical */}
      <div className="md:hidden relative space-y-6">
        {/* Línea vertical de fondo */}
        <div className="absolute left-[19px] top-5 bottom-12 w-[2px] bg-gradient-to-b from-dab-border/40 to-transparent pointer-events-none">
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
            className="group relative flex gap-5"
            initial={!shouldReduceMotion ? { opacity: 0, x: -16 } : { opacity: 1 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: idx * 0.08 }}
          >
            {/* Nodo circular */}
            <motion.div
              className="relative z-10 shrink-0 w-10 h-10 rounded-full bg-dab-surface border-2 flex items-center justify-center transition-all duration-300"
              initial={{ borderColor: "rgba(76, 127, 255, 0.3)" }}
              whileInView={{
                borderColor: "rgba(76, 127, 255, 1)",
                backgroundColor: "rgba(76, 127, 255, 0.2)",
                scale: !shouldReduceMotion ? 1.08 : 1,
                boxShadow: !shouldReduceMotion ? "0 0 16px rgba(76, 127, 255, 0.4)" : "none"
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              aria-label={`Paso ${paso.id}: ${paso.titulo}`}
            >
              <span className="font-mono text-sm font-bold text-dab-accent">0{paso.id}</span>
            </motion.div>

            {/* Card */}
            <div className="flex-1 group relative rounded-2xl border border-dab-border/60 bg-dab-bg/50 backdrop-blur-sm p-5 transition-all duration-300 hover:border-dab-accent/30">
              {/* Conector vertical decorativo */}
              {idx < pasos.length - 1 && (
                <div className="absolute left-[-23px] top-full h-6 w-px bg-dab-border/40" />
              )}

              <div className="flex items-center gap-3 mb-3">
                <motion.div
                  className="w-10 h-10 rounded-xl bg-dab-accent/10 border border-dab-accent/20 flex items-center justify-center shrink-0"
                  animate={!shouldReduceMotion ? { y: [0, -4, 0] } : {}}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: idx * 0.4 }}
                >
                  {iconos[paso.icono]
                    ? React.cloneElement(iconos[paso.icono], { width: 20, height: 20 })
                    : iconos.diagnostico}
                </motion.div>
                <div>
                  <h3 className="font-display text-base font-bold text-white tracking-tight leading-tight">{paso.titulo}</h3>
                  <span className="text-[9px] font-mono text-dab-muted/60 bg-dab-border/30 px-1.5 py-0.5 rounded inline-block mt-0.5">{paso.tiempo}</span>
                </div>
              </div>
              <p className="font-body text-sm text-dab-muted leading-relaxed">{paso.linea}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* DESKTOP: Timeline horizontal */}
      <div className="hidden md:block relative">
        {/* Línea horizontal de fondo */}
        <div className="absolute top-[8px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-dab-border/40 to-transparent pointer-events-none">
          {!shouldReduceMotion ? (
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-dab-accent to-transparent"
              style={{ scaleX: scrollYProgress, transformOrigin: "left", width: "100%" }}
            />
          ) : (
            <div className="w-full h-full bg-dab-accent/50" />
          )}
        </div>

        {/* Grid de pasos */}
        <div className="grid grid-cols-4 gap-6 relative pt-8">
          {pasos.map((paso, idx) => (
            <div key={paso.id} className="group relative">
              {/* Nodo circular */}
              <motion.div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-dab-surface border-2 flex items-center justify-center z-10 transition-all duration-300"
                initial={{ borderColor: "rgba(76, 127, 255, 0.3)" }}
                whileInView={{
                  borderColor: "rgba(76, 127, 255, 1)",
                  backgroundColor: "rgba(76, 127, 255, 0.2)",
                  scale: !shouldReduceMotion ? 1.1 : 1,
                  boxShadow: !shouldReduceMotion ? "0 0 16px rgba(76, 127, 255, 0.4)" : "none"
                }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.12 }}
                aria-label={`Paso ${paso.id}: ${paso.titulo}`}
              >
                <span className="font-mono text-[10px] font-bold text-dab-accent">{paso.id}</span>
              </motion.div>

              {/* Card */}
              <motion.div
                className="mt-8 rounded-2xl border border-dab-border/50 bg-dab-bg/40 backdrop-blur-sm p-5 text-center transition-all duration-300 hover:bg-dab-bg/70 hover:border-dab-accent/30 hover:-translate-y-1"
                initial={!shouldReduceMotion ? { opacity: 0, y: 20 } : { opacity: 1 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
              >
                {/* Icono */}
                <motion.div
                  className="w-14 h-14 rounded-2xl bg-dab-accent/10 border border-dab-accent/20 flex items-center justify-center mx-auto mb-4"
                  animate={!shouldReduceMotion ? { y: [0, -6, 0] } : {}}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: idx * 0.4 }}
                >
                  {iconos[paso.icono] || iconos.diagnostico}
                </motion.div>

                {/* Time badge */}
                <span className="inline-block text-[10px] font-mono text-dab-muted/60 bg-dab-border/30 px-2 py-0.5 rounded-full mb-3">
                  {paso.tiempo}
                </span>

                {/* Título */}
                <h3 className="font-display text-lg text-white mb-2 tracking-tight">{paso.titulo}</h3>

                {/* Descripción */}
                <p className="font-body text-sm text-dab-muted leading-relaxed">{paso.linea}</p>
              </motion.div>

              {/* Flecha conector */}
              {idx < pasos.length - 1 && (
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 text-dab-accent/20 group-hover:text-dab-accent/50 transition-colors pointer-events-none z-20">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
