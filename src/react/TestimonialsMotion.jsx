import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function TestimonialsMotion({ testimonios }) {
  const [index, setIndex] = useState(0);

  const timerRef = useRef(null);

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % testimonios.length);
    }, 3000);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, testimonios.length]);

  const goTo = (newIndex) => {
    setIndex((newIndex + testimonios.length) % testimonios.length);
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  const cardVariants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  const stackVariants = {
    hidden: { opacity: 0, y: 6 },
    show: { opacity: 1, y: 0 },
  };

  const active = testimonios[index];

  return (
    <div className="space-y-6 md:space-y-8">
      {/* MOBILE: carrusel automático */}
      <div className="relative md:hidden">
        <div className="overflow-hidden rounded-2xl border border-brilint-accent/60 bg-brilint-surface/85 shadow-brilint-soft">
          <AnimatePresence mode="wait">
            <motion.article
              key={active.id}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="p-6 flex flex-col gap-4"
            >
              <div className="flex items-center gap-2 text-[11px] text-brilint-muted uppercase tracking-[0.14em]">
                {active.esVerificado && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-brilint-accent/60 bg-brilint-bg/60 px-3 py-1 text-[11px] font-semibold text-brilint-text">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/35 animate-[ping_1.8s_ease-out_infinite]"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
                    </span>
                    {active.badgeLabel || 'Testimonio verificado'}
                  </span>
                )}
              </div>

              <p className="text-sm text-brilint-muted leading-relaxed">
                “{active.mensaje}”
              </p>

              <div className="space-y-0.5">
                <p className="text-sm font-semibold text-brilint-text">
                  {active.nombre}
                </p>
                <p className="text-xs text-brilint-muted">
                  {active.rol}
                </p>
                <p className="text-[11px] text-brilint-muted/80">
                  Cliente real · Proyecto entregado · {active.tipoProyecto} · {active.zona}
                </p>
              </div>

              {active.techStack && (
                <div className="pt-2 border-t border-brilint-border/60">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-brilint-muted mb-2">
                    Stack del proyecto
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {active.techStack.map((tech) => (
                      <motion.span
                        key={tech}
                        variants={stackVariants}
                        initial="hidden"
                        animate="show"
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="inline-flex items-center gap-2 rounded-full border border-brilint-border/70 bg-brilint-bg/70 px-3 py-1 text-[11px] font-semibold text-brilint-text"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-brilint-accent/80"></span>
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}
            </motion.article>
          </AnimatePresence>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <button
            onClick={prev}
            aria-label="Anterior"
            className="p-2 rounded-full bg-brilint-surface/80 border border-brilint-border/70 text-brilint-muted hover:text-brilint-text transition duration-fast active:scale-95 shadow-brilint-soft"
          >
            {"<"}
          </button>

          <div className="flex-1 flex items-center justify-center gap-2">
            {testimonios.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => goTo(dotIdx)}
                className={`h-2 w-2 rounded-full ${dotIdx === index ? 'bg-brilint-accent' : 'bg-brilint-border'}`}
                aria-label={`Ir al testimonio ${dotIdx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Siguiente"
            className="p-2 rounded-full bg-brilint-surface/80 border border-brilint-border/70 text-brilint-muted hover:text-brilint-text transition duration-fast active:scale-95 shadow-brilint-soft"
          >
            {">"}
          </button>
        </div>
      </div>

      {/* DESKTOP: grid animada */}
      <div className="hidden md:grid gap-6 md:grid-cols-3">
        {testimonios.map((t, idx) => (
          <motion.article
            key={t.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: idx * 0.08 }}
            whileHover={{ y: -4 }}
            className="relative h-full rounded-2xl border border-brilint-accent/60 bg-brilint-surface/70 p-6 flex flex-col gap-4 shadow-sm transition duration-200 hover:border-brilint-accent/80 hover:shadow-brilint-soft"
          >
            <div className="flex items-center gap-2">
              {t.esVerificado && (
                <span className="inline-flex items-center gap-2 rounded-full border border-brilint-accent/60 bg-brilint-bg/60 px-3 py-1 text-[11px] font-semibold text-brilint-text uppercase tracking-[0.14em]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/35 animate-[ping_1.8s_ease-out_infinite]"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
                  </span>
                  {t.badgeLabel || 'Testimonio verificado'}
                </span>
              )}
            </div>

            <p className="text-sm text-brilint-muted leading-relaxed">
              “{t.mensaje}”
            </p>

            <div className="mt-auto space-y-0.5">
              <p className="text-sm font-semibold text-brilint-text">
                {t.nombre}
              </p>
              <p className="text-xs text-brilint-muted">
                {t.rol}
              </p>
              <p className="text-xs text-brilint-muted/80">
                Cliente real · Proyecto entregado · {t.tipoProyecto} · {t.zona}
              </p>
            </div>

            {t.techStack && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, ease: 'easeOut', delay: idx * 0.05 }}
                className="pt-3 border-t border-brilint-border/60"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-brilint-muted">
                    Stack del proyecto
                  </p>
                  <span className="text-[10px] text-brilint-muted/80">
                    {t.techStack.length} piezas clave
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {t.techStack.map((tech, techIdx) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.2, ease: 'easeOut', delay: techIdx * 0.03 }}
                      className="inline-flex items-center gap-2 rounded-full border border-brilint-border/70 bg-brilint-bg/70 px-3 py-1 text-[11px] font-semibold text-brilint-text"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-brilint-accent/80"></span>
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.article>
        ))}
      </div>
    </div>
  );
}
