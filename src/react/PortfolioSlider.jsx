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
        <div className="p-4">
          <h4 className="text-lg font-semibold">{proyecto.titulo}</h4>
          <p className="text-sm text-brilint-muted">{proyecto.descripcion}</p>
        </div>
      </motion.div>

      {/* Controles */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          onClick={prev}
          className="p-2 text-brilint-muted hover:text-brilint-accent transition duration-fast"
        >
          ‹
        </button>
      </div>

      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          onClick={next}
          className="p-2 text-brilint-muted hover:text-brilint-accent transition duration-fast"
        >
          ›
        </button>
      </div>
    </div>
  );
}
