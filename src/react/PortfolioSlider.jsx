import { motion } from 'framer-motion';
import { useState } from 'react';

export default function PortfolioSlider({ proyectos }) {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % proyectos.length);
  const prev = () =>
    setIndex((i) => (i - 1 + proyectos.length) % proyectos.length);

  const proyecto = proyectos[index];

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <motion.div
        key={proyecto.id}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="rounded-2xl overflow-hidden border border-brilint-border bg-brilint-surface"
      >
        <img src={proyecto.imagen} alt={proyecto.titulo} className="w-full" />
        <div className="p-4 space-y-1.5">
          <h4 className="text-lg font-semibold leading-snug">{proyecto.titulo}</h4>
          <p className="text-sm text-brilint-muted leading-relaxed">
            {proyecto.descripcion}
          </p>
        </div>
      </motion.div>

      {/* Controles */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          onClick={prev}
          aria-label="Proyecto anterior"
          className="p-2 rounded-full bg-brilint-bg/80 border border-brilint-border text-brilint-muted hover:text-brilint-accent transition duration-fast active:scale-95"
        >
          {"<"}
        </button>
      </div>

      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          onClick={next}
          aria-label="Proyecto siguiente"
          className="p-2 rounded-full bg-brilint-bg/80 border border-brilint-border text-brilint-muted hover:text-brilint-accent transition duration-fast active:scale-95"
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
