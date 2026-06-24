import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function MuroConfianzaMotion({ casos }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % casos.length);
    }, 3000);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, casos.length]);

  const goTo = (newIndex) => {
    setCurrentIndex((newIndex + casos.length) % casos.length);
  };

  const next = () => goTo(currentIndex + 1);
  const prev = () => goTo(currentIndex - 1);

  const cardVariants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  const casoActivo = casos[currentIndex];

  const renderCardContent = (caso) => (
    <>
      {/* Imagen del proyecto (parte superior) */}
      <div className="relative rounded-xl border border-dab-border bg-black overflow-hidden h-56 sm:h-64">
        {caso.proyecto.imagen ? (
          <img
            src={caso.proyecto.imagen}
            alt={caso.proyecto.titulo}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-dab-accent/15 to-purple-950/20 gap-2">
            <span className="text-5xl animate-[pulse-glow_2s_infinite]">🦷</span>
            <span className="text-xs text-dab-muted/60 uppercase tracking-widest font-body">Ecosistema Médico</span>
          </div>
        )}

        {/* Badge de servicio */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] border ${
              caso.servicio === 'despierta'
                ? 'bg-dab-amber/10 border-dab-amber/30 text-dab-amber'
                : caso.servicio === 'crece'
                ? 'bg-dab-cyan/10 border-dab-cyan/30 text-dab-cyan'
                : 'bg-dab-rose/10 border-dab-rose/30 text-dab-rose'
            }`}
          >
            {caso.servicio === 'despierta' && '☀ Despierta'}
            {caso.servicio === 'crece' && '↗ Crece'}
            {caso.servicio === 'domina' && '♔ Domina'}
          </span>
        </div>

        {/* Badge verificado */}
        {caso.testimonio.esVerificado && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-dab-accent/60 bg-dab-bg/60 px-3 py-1 text-[11px] font-semibold text-dab-text uppercase tracking-[0.14em]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/35 animate-[ping_1.8s_ease-out_infinite]"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              {caso.testimonio.badgeLabel}
            </span>
          </div>
        )}
      </div>

      {/* Contenido del testimonio */}
      <div className="p-4 sm:p-5 flex flex-col gap-3 flex-1 justify-between">
        <div className="space-y-3">
          {/* Tipo de proyecto */}
          <span className="block text-[10px] sm:text-xs font-body uppercase tracking-wider text-dab-accent/80">
            {caso.proyecto.tipo} · {caso.proyecto.zona}
          </span>

          {/* Cita */}
          <p className="text-base text-dab-muted leading-relaxed italic">
            “{caso.testimonio.mensaje}”
          </p>

          {/* Autor */}
          <div className="flex items-center gap-3 pt-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-dab-accent to-purple-600 flex items-center justify-center text-white font-bold text-sm">
              {caso.testimonio.nombre.charAt(0)}
            </div>
            <div>
              <div className="text-sm font-semibold text-dab-text">{caso.testimonio.nombre}</div>
              <div className="text-xs text-dab-muted uppercase tracking-wider">{caso.testimonio.rol}</div>
            </div>
          </div>
        </div>

        {/* Métricas y Tech Stack */}
        <div className="space-y-3 pt-3 border-t border-dab-border/60">
          {/* Métricas */}
          <div className="flex gap-3">
            {caso.metricas.map((m, i) => (
              <div key={i} className="text-center flex-1">
                <div className="font-display text-lg sm:text-xl text-dab-accent font-bold">
                  {m.valor}
                </div>
                <div className="text-[10px] text-dab-muted/80 uppercase tracking-wider">
                  {m.etiqueta}
                </div>
              </div>
            ))}
          </div>

          {/* Tech stack (opcional) */}
          {caso.techStack && (
            <div className="flex flex-wrap gap-2 pt-2 border-t border-dab-border/20">
              {caso.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="inline-flex items-center rounded-full border border-dab-border/70 bg-dab-bg/70 px-2 py-1 text-[10px] font-semibold text-dab-text"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Link al proyecto (si existe URL) */}
          {caso.proyecto.url && (
            <a
              href={caso.proyecto.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-dab-accent text-xs font-semibold hover:underline mt-1 self-start"
            >
              Ver sitio en vivo <span>→</span>
            </a>
          )}
        </div>
      </div>
    </>
  );

  return (
    <div className="space-y-6 md:space-y-8">
      {/* MOBILE: carrusel automático */}
      <div className="relative md:hidden">
        <div className="overflow-hidden rounded-2xl border border-dab-accent/60 bg-dab-surface/85 shadow-dab-soft flex flex-col min-h-[580px]">
          <AnimatePresence mode="wait">
            <motion.article
              key={casoActivo.id}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative overflow-hidden flex flex-col flex-1"
            >
              {renderCardContent(casoActivo)}
            </motion.article>
          </AnimatePresence>
        </div>

        {/* Controles carrusel */}
        <div className="mt-3 flex items-center justify-between gap-3">
          <button
            onClick={prev}
            aria-label="Caso anterior"
            className="p-2 rounded-full bg-dab-surface/80 border border-dab-border/70 text-dab-muted hover:text-dab-text transition duration-fast active:scale-95 shadow-dab-soft"
          >
            {"<"}
          </button>

          <div className="flex-1 flex items-center justify-center gap-2">
            {casos.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => goTo(dotIdx)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  dotIdx === currentIndex ? 'bg-dab-accent' : 'bg-dab-border'
                }`}
                aria-label={`Ir al caso ${dotIdx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Caso siguiente"
            className="p-2 rounded-full bg-dab-surface/80 border border-dab-border/70 text-dab-muted hover:text-dab-text transition duration-fast active:scale-95 shadow-dab-soft"
          >
            {">"}
          </button>
        </div>
      </div>

      {/* DESKTOP: grid animada */}
      <div className="hidden md:grid gap-6 md:grid-cols-3">
        {casos.map((caso, idx) => (
          <motion.article
            key={caso.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: idx * 0.08, ease: 'easeOut' }}
            whileHover={{ y: -4 }}
            className="relative h-full rounded-2xl border border-dab-accent/60 bg-dab-surface/70 p-0 overflow-hidden flex flex-col shadow-sm transition duration-200 hover:border-dab-accent/80 hover:shadow-dab-soft"
          >
            {renderCardContent(caso)}
          </motion.article>
        ))}
      </div>
    </div>
  );
}
