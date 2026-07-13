import { useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";

export function HeroContent() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[90vh] py-20 lg:py-24">
      {/* COLUMNA IZQUIERDA: Texto */}
      <div className="space-y-8 lg:space-y-10 order-2 lg:order-1">
        {/* Tagline */}
        <FadeIn delay={0}>
          <div className="space-y-3">
            <p className="text-xs font-body uppercase tracking-[0.3em] text-dab-muted">
              Agencia Digital + Valle de Toluca
            </p>
            <div className="h-px w-16 bg-dab-border/40" />
          </div>
        </FadeIn>

        {/* Heading */}
        <FadeIn delay={0.15}>
          <h1
            id="hero-title"
            className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-normal text-white leading-[1.1] tracking-tight"
          >
            Impulsamos negocios
            <br />
            del Valle de Toluca
            <br />
            con <span className="text-dab-accent italic">diseño digital</span>.
          </h1>
        </FadeIn>

        {/* Subheading */}
        <FadeIn delay={0.3}>
          <p className="font-body text-lg md:text-xl text-dab-muted leading-relaxed max-w-md">
            Creamos experiencias web que conectan, convierten y crecen. Diseñado
            para negocios locales que quieren destacar.
          </p>
        </FadeIn>

        {/* CTA */}
        <FadeIn delay={0.45}>
          <a
            href="#servicios"
            className="group inline-flex items-center gap-2 text-sm font-body text-dab-accent tracking-wide"
          >
            <span className="relative">
              Ver nuestros servicios
              <span className="absolute bottom-0 left-0 h-px w-0 bg-dab-accent transition-all duration-500 group-hover:w-full" />
            </span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </FadeIn>
      </div>

      {/* COLUMNA DERECHA: Imagen placeholder */}
      <FadeIn
        direction="right"
        delay={0.3}
        className="relative order-1 lg:order-2"
      >
        <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] max-w-lg mx-auto lg:max-w-none">
          {/* Glow detrás */}
          <div className="absolute -inset-4 bg-gradient-to-br from-dab-accent/10 to-transparent rounded-[2.5rem] blur-2xl" />

          {/* Placeholder visual */}
          <div className="relative w-full h-full rounded-3xl overflow-hidden liquid-surface">
            <HeroPlaceholder />
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

function HeroPlaceholder() {
  return (
    <div className="w-full h-full relative bg-gradient-to-br from-dab-bg via-dab-surface to-dab-bg">
      {/* Forma orgánica superior */}
      <div
        className="absolute top-[10%] right-[5%] w-[70%] h-[55%] rounded-full opacity-30 blur-2xl"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(76,127,255,0.4), transparent 70%)",
        }}
      />

      {/* Forma orgánica inferior */}
      <div
        className="absolute bottom-[15%] left-[10%] w-[60%] h-[50%] rounded-full opacity-25 blur-2xl"
        style={{
          background:
            "radial-gradient(circle at 70% 70%, rgba(0,212,255,0.25), transparent 70%)",
        }}
      />

      {/* Glass shape central */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div className="relative w-full max-w-[280px] aspect-square rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-[0_0_60px_-15px_rgba(76,127,255,0.15)] overflow-hidden">
          <div className="absolute top-6 left-6 right-6 h-2 rounded-full bg-white/10" />
          <div className="absolute top-12 left-6 w-2/3 h-2 rounded-full bg-white/5" />
          <div className="absolute bottom-6 left-6 right-6 h-24 rounded-2xl bg-gradient-to-t from-dab-accent/20 to-transparent" />

          {/* Líneas decorativas */}
          <svg
            className="absolute inset-0 w-full h-full opacity-20"
            viewBox="0 0 280 280"
            fill="none"
          >
            <path
              d="M40 240 Q140 140 240 240"
              stroke="url(#placeholderGradient)"
              strokeWidth="1"
            />
            <path
              d="M40 200 Q140 100 240 200"
              stroke="url(#placeholderGradient)"
              strokeWidth="1"
            />
            <defs>
              <linearGradient
                id="placeholderGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#4C7FFF" stopOpacity="0" />
                <stop offset="50%" stopColor="#4C7FFF" stopOpacity="1" />
                <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Nota para reemplazar por imagen real */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <span className="text-[10px] font-mono text-dab-muted/40 uppercase tracking-wider">
          Placeholder — reemplazar por imagen 3D
        </span>
      </div>
    </div>
  );
}
