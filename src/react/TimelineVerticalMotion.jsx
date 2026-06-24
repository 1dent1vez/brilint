import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export default function TimelineVerticalMotion({ pasos }) {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll tracking en el contenedor
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.75", "end 0.25"]
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative py-8 md:py-16">

      {/* --- LÍNEAS DE FONDO APAGADAS (z-[1]) --- */}
      {/* Línea base — desktop */}
      <div className="hidden md:block absolute left-1/2 top-[88px] bottom-[88px] w-[2px] -translate-x-1/2 bg-gradient-to-b from-dab-border/30 via-dab-border/50 to-dab-border/30 z-[1]" />

      {/* Línea base — mobile */}
      <div className="md:hidden absolute left-[19px] top-[52px] bottom-[52px] w-[2px] bg-gradient-to-b from-dab-border/30 via-dab-border/50 to-dab-border/30 z-[1]" />


      {/* --- LÍNEAS DE PROGRESO ANIMADAS (z-[2]) --- */}
      {/* Línea de progreso — desktop */}
      <motion.div 
        className="hidden md:block absolute left-1/2 top-[88px] bottom-[88px] w-[2px] -translate-x-1/2 bg-gradient-to-b from-dab-accent via-[#7B61FF] to-dab-accent z-[2] origin-top"
        style={!shouldReduceMotion ? { scaleY: lineScale } : { height: "100%" }}
      >
        {/* Flecha en la punta */}
        {!shouldReduceMotion && (
          <motion.div 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-[3]"
            animate={{ y: [0, 4, 0], opacity: [1, 0.7, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" className="drop-shadow-[0_0_8px_rgba(76,127,255,0.6)]">
              <path d="M8 12L0 0H16L8 12Z" fill="#4C7FFF"/>
            </svg>
          </motion.div>
        )}
      </motion.div>

      {/* Línea de progreso — mobile */}
      <motion.div 
        className="md:hidden absolute left-[19px] top-[52px] bottom-[52px] w-[2px] bg-gradient-to-b from-dab-accent via-[#7B61FF] to-dab-accent z-[2] origin-top"
        style={!shouldReduceMotion ? { scaleY: lineScale } : { height: "100%" }}
      >
        {/* Flecha en la punta */}
        {!shouldReduceMotion && (
          <motion.div 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-[3]"
            animate={{ y: [0, 4, 0], opacity: [1, 0.7, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="14" height="10" viewBox="0 0 16 12" fill="none" className="drop-shadow-[0_0_8px_rgba(76,127,255,0.6)]">
              <path d="M8 12L0 0H16L8 12Z" fill="#4C7FFF"/>
            </svg>
          </motion.div>
        )}
      </motion.div>


      {/* --- PASOS DE LA LÍNEA DE TIEMPO (z-10) --- */}
      <div className="relative z-10 space-y-12 md:space-y-24">
        {pasos.map((paso, idx) => {
          const isOdd = idx % 2 === 0; // index: 0, 2 son impares (pasos 1, 3); 1, 3 son pares (pasos 2, 4)

          return (
            <div key={paso.id} className="relative">

              {/* MAQUETADO DESKTOP: Alternando zigzag */}
              <div className="hidden md:flex items-center gap-6 lg:gap-10">
                {/* Lado izquierdo */}
                <motion.div 
                  className="flex-1 flex justify-end"
                  initial={!shouldReduceMotion ? { opacity: 0, x: -35 } : { opacity: 1 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
                >
                  {isOdd && <Card paso={paso} align="right" />}
                </motion.div>

                {/* Nodo central */}
                <div className="shrink-0 relative z-10">
                  <Node paso={paso} mobile={false} shouldReduceMotion={shouldReduceMotion} />
                </div>

                {/* Lado derecho */}
                <motion.div 
                  className="flex-1 flex justify-start"
                  initial={!shouldReduceMotion ? { opacity: 0, x: 35 } : { opacity: 1 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
                >
                  {!isOdd && <Card paso={paso} align="left" />}
                </motion.div>
              </div>

              {/* MAQUETADO MOBILE: Apilado a la derecha */}
              <div className="md:hidden flex items-start gap-4">
                <div className="shrink-0 relative z-10 pt-1">
                  <Node paso={paso} mobile={true} shouldReduceMotion={shouldReduceMotion} />
                </div>
                <motion.div 
                  className="flex-1"
                  initial={!shouldReduceMotion ? { opacity: 0, x: 20 } : { opacity: 1 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
                >
                  <Card paso={paso} align="left" mobile />
                </motion.div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}

function Node({ paso, mobile, shouldReduceMotion }) {
  return (
    <motion.div
      className={`relative z-10 rounded-full flex items-center justify-center ${
        mobile ? 'w-10 h-10' : 'w-12 h-12'
      } bg-dab-surface border-2`}
      initial={{ 
        borderColor: "rgba(76, 127, 255, 0.4)",
        backgroundColor: "#0B0D14",
        scale: 1
      }}
      whileInView={{ 
        borderColor: "rgba(76, 127, 255, 1)",
        backgroundColor: "#4C7FFF",
        scale: !shouldReduceMotion ? 1.1 : 1,
        boxShadow: !shouldReduceMotion ? "0 0 20px rgba(76, 127, 255, 0.4)" : "none"
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      aria-label={`Paso ${paso.id}: ${paso.titulo}`}
    >
      <motion.span 
        className={`font-mono font-bold ${mobile ? 'text-xs' : 'text-sm'}`}
        initial={{ color: "#4C7FFF" }}
        whileInView={{ color: "#05060A" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {paso.id}
      </motion.span>
    </motion.div>
  );
}

function Card({ paso, align, mobile = false }) {
  const alignClass = align === 'right' ? 'md:text-right md:items-end' : 'md:text-left md:items-start';

  return (
    <div className={`glass-card rounded-2xl p-5 md:p-6 lg:p-8 max-w-md w-full flex flex-col transition-all duration-300 hover:bg-dab-bg/70 hover:border-dab-accent/30 hover:-translate-y-0.5 shadow-sm hover:shadow-dab-soft ${alignClass}`}>
      {/* Time badge */}
      <div className={`flex items-center gap-2 mb-3 ${align === 'right' ? 'md:justify-end' : ''}`}>
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dab-accent/8 border border-dab-accent/15 text-[11px] font-semibold text-dab-accent uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-dab-accent"></span>
          {paso.tiempo}
        </span>
      </div>

      {/* Título del paso */}
      <h3 className={`font-display text-xl md:text-2xl text-white mb-2 tracking-tight ${align === 'right' ? 'md:text-right' : ''}`}>
        {paso.titulo}
      </h3>

      {/* Línea descriptiva */}
      <p className={`text-sm md:text-base text-dab-muted leading-relaxed ${align === 'right' ? 'md:text-right' : ''}`}>
        {paso.linea}
      </p>

      {/* Separador e indicador de paso */}
      <div className={`mt-4 pt-4 border-t border-white/5 w-full ${align === 'right' ? 'md:text-right' : ''}`}>
        <span className="text-xs text-dab-muted/60 uppercase tracking-wider">
          Paso {paso.id} de 4
        </span>
      </div>
    </div>
  );
}
