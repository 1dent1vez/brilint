import { motion } from 'framer-motion';
import { useState } from 'react';

export default function PortfolioSlider({ proyectos }) {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % proyectos.length);
  const prev = () =>
    setIndex((i) => (i - 1 + proyectos.length) % proyectos.length);

  const proyecto = proyectos[index];

  return (
    <div className="relative w-full max-w-3xl mx-auto space-y-3">
      <motion.div
        key={proyecto.id}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="rounded-2xl overflow-hidden border border-dab-border bg-dab-surface shadow-dab-soft"
      >
        <div className="h-[230px] sm:h-[280px] overflow-y-auto bg-black">
          <img
            src={proyecto.imagen}
            alt={proyecto.titulo}
            className="w-full object-top"
          />
        </div>
        <div className="p-4 sm:p-5 space-y-2">
          <h4 className="text-lg sm:text-xl font-semibold leading-snug">
            {proyecto.titulo}
          </h4>
          <p className="text-sm text-dab-muted leading-relaxed">
            {proyecto.descripcion}
          </p>
        </div>
      </motion.div>

      {/* Controles */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={prev}
          aria-label="Proyecto anterior"
          className="p-2 rounded-full bg-dab-bg/85 border border-dab-border text-dab-muted hover:text-dab-accent transition duration-fast active:scale-95 shadow-dab-soft"
        >
          {"<"}
        </button>

        <div className="flex-1 flex items-center justify-center gap-2 md:hidden">
          {proyectos.map((_, dotIdx) => (
            <span
              key={dotIdx}
              className={`h-2 w-2 rounded-full ${dotIdx === index ? 'bg-dab-accent' : 'bg-dab-border'}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Proyecto siguiente"
          className="p-2 rounded-full bg-dab-bg/85 border border-dab-border text-dab-muted hover:text-dab-accent transition duration-fast active:scale-95 shadow-dab-soft"
        >
          {">"}
        </button>
      </div>

      <div className="hidden md:flex items-center justify-center gap-2">
        {proyectos.map((_, dotIdx) => (
          <span
            key={dotIdx}
            className={`h-2 w-2 rounded-full ${dotIdx === index ? 'bg-dab-accent' : 'bg-dab-border'}`}
          />
        ))}
      </div>
    </div>
  );
}
