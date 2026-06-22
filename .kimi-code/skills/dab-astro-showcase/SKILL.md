---
name: dab-astro-showcase
description: Design references and patterns extracted from real Astro showcase sites. Provides inspiration for layouts, animations, typography, and interactive patterns that can be adapted for the dab agency landing page.
type: prompt
whenToUse: When the user asks for design inspiration, wants to see examples of modern Astro sites, needs ideas for layouts, animations, or visual effects, or wants to know what patterns work well in production Astro sites.
disableModelInvocation: false
arguments:
  - pattern
  - reference
---

# dab — Astro Showcase Design References

## Patrones Extraídos de Sitios Reales en Astro Showcase

### 1. Hero Section — Gradient Mesh + Floating Elements
**Referencia:** Estilo "Cosmic Canvas" (showcase.astro.build)

```tsx
// Hero con gradiente dinámico y elementos flotantes
<section className="relative min-h-screen overflow-hidden bg-slate-900">
  {/* Gradient mesh background */}
  <div className="absolute inset-0">
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/30 rounded-full blur-[120px] animate-pulse" />
    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px]" />
  </div>

  {/* Floating geometric shapes */}
  <motion.div
    animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    className="absolute top-20 right-20 w-16 h-16 border-2 border-brand-400/30 rounded-lg"
  />
  <motion.div
    animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    className="absolute bottom-32 left-20 w-12 h-12 bg-accent/20 rounded-full"
  />

  {/* Content */}
  <div className="relative z-10 mx-auto max-w-7xl px-4 ...">
    {/* ... */}
  </div>
</section>
```

**Cuándo usar:** Para el hero de dab, crear un ambiente premium y tecnológico.

---

### 2. Bento Grid — Services Layout
**Referencia:** Patrón popular en portfolios de agencias (showcase.astro.build)

```tsx
// Grid asimétrico tipo "bento box" para servicios
<div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 auto-rows-[200px]">
  {/* Card grande */}
  <div className="md:col-span-2 md:row-span-2 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 p-8 text-white">
    <h3>Diseño Web Profesional</h3>
    <p>Sitios que convierten visitantes en clientes...</p>
  </div>
  {/* Cards pequeñas */}
  <div className="rounded-2xl bg-slate-100 p-6">E-commerce</div>
  <div className="rounded-2xl bg-slate-100 p-6">Marketing Digital</div>
  <div className="rounded-2xl bg-slate-100 p-6">Branding</div>
  <div className="rounded-2xl bg-slate-100 p-6">SEO Local</div>
</div>
```

**Cuándo usar:** Para la sección de servicios de dab, hacerla visualmente interesante y moderna.

---

### 3. Scroll-Linked Typography
**Referencia:** Patrón de "texto que se revela con scroll" (showcase.astro.build)

```tsx
import { useScroll, useTransform, motion } from "framer-motion";

export function ScrollText({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.25"],
  });

  const words = text.split(" ");

  return (
    <div ref={containerRef} className="text-3xl md:text-5xl font-bold leading-tight">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </div>
  );
}

function Word({ children, progress, range }: { children: string; progress: any; range: number[] }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const color = useTransform(progress, range, ["#94a3b8", "#0f172a"]);
  return (
    <motion.span style={{ opacity, color }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}
```

**Cuándo usar:** Para una sección "Nosotros" o "Por qué elegir dab" donde el texto se ilumina palabra por palabra.

---

### 4. Parallax Layers
**Referencia:** Efecto de profundidad en landing pages (showcase.astro.build)

```tsx
import { useScroll, useTransform, motion } from "framer-motion";

export function ParallaxSection() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section className="relative h-[80vh] overflow-hidden">
      <motion.div style={{ y: y1 }} className="absolute inset-0">
        <img src="/bg-layer-1.svg" alt="" className="w-full h-full object-cover opacity-30" />
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute inset-0">
        <img src="/bg-layer-2.svg" alt="" className="w-full h-full object-cover opacity-50" />
      </motion.div>
      <motion.div style={{ y: y3 }} className="relative z-10 flex items-center justify-center h-full">
        <h2 className="text-5xl font-bold text-white">Tu negocio, online</h2>
      </motion.div>
    </section>
  );
}
```

**Cuándo usar:** Para una sección de impacto visual entre el hero y los servicios.

---

### 5. Magnetic Button
**Referencia:** Efecto de botón "magnético" en portfolios creativos

```tsx
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

export function MagneticButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.button>
  );
}
```

**Cuándo usar:** Para el CTA principal "Cotiza tu proyecto" o botones de WhatsApp.

---

### 6. Image Reveal (Mask Animation)
**Referencia:** Revelado de imágenes con máscara (showcase.astro.build)

```tsx
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function ImageReveal({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="relative overflow-hidden rounded-2xl">
      <motion.div
        initial={{ scaleX: 1 }}
        animate={isInView ? { scaleX: 0 } : { scaleX: 1 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        style={{ originX: 1 }}
        className="absolute inset-0 bg-brand-500 z-10"
      />
      <motion.img
        src={src}
        alt={alt}
        initial={{ scale: 1.4 }}
        animate={isInView ? { scale: 1 } : { scale: 1.4 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
```

**Cuándo usar:** Para imágenes de portafolio o la sección "Nosotros".

---

### 7. Sticky Card Stack (Scroll)
**Referencia:** Tarjetas que se apilan al hacer scroll (showcase.astro.build)

```tsx
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function StickyCards({ items }: { items: { title: string; desc: string }[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  return (
    <div ref={containerRef} className="relative">
      {items.map((item, i) => (
        <StickyCard key={i} item={item} index={i} total={items.length} progress={scrollYProgress} />
      ))}
    </div>
  );
}

function StickyCard({ item, index, total, progress }: any) {
  const scale = useTransform(progress, [index / total, (index + 1) / total], [1, 0.9]);
  const opacity = useTransform(progress, [index / total, (index + 0.5) / total], [1, 0.5]);

  return (
    <motion.div
      style={{ scale, opacity }}
      className="sticky top-20 h-[60vh] rounded-3xl bg-white shadow-xl p-8 mb-8"
    >
      <h3 className="text-2xl font-bold">{item.title}</h3>
      <p className="mt-4 text-slate-600">{item.desc}</p>
    </motion.div>
  );
}
```

**Cuándo usar:** Para mostrar el proceso de trabajo de dab o los beneficios.

---

### 8. Horizontal Scroll Section
**Referencia:** Sección que scrolla horizontalmente (showcase.astro.build)

```tsx
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function HorizontalScroll({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <div ref={containerRef} className="h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div style={{ x }} className="flex gap-8 px-8">
          {children}
        </motion.div>
      </div>
    </div>
  );
}
```

**Cuándo usar:** Para mostrar trabajos del portafolio o testimonios de clientes.

## Referencias de Sitios Astro Reales

| Sitio | Qué destacar | Patrón aplicable a dab |
|-------|-------------|------------------------|
| **Porsche** (astro.build) | LCP perfecto, imágenes optimizadas | Optimización de hero images |
| **IKEA** (astro.build) | Grid systems, componentes modulares | Layout de servicios en grid |
| **NBC News** (astro.build) | Tipografía editorial, jerarquía clara | Jerarquía tipográfica del contenido |
| **Stripe** (astro.build) | Animaciones sutiles, micro-interacciones | Hover states, transiciones |
| **Express** (astro.build) | Clean design, espacio en blanco | Minimalismo y profesionalismo |
| **Mistral AI** (astro.build) | Gradientes, efectos de glow | Hero section con ambiente |
| **OpenAI** (astro.build) | Scroll animations, revelados | Efectos de entrada sofisticados |
| **Digital Awards Switzerland** (showcase) | Espectacular visual, animaciones suaves | Referencia para animaciones premium |
| **Nadia Poe** (showcase) | Watercolor aesthetic, suave | Paleta de colores y texturas |
| **Rich Banks** (showcase) | Developer portfolio, interactivo | Layout de agencia digital |

## Decision Tree: ¿Qué patrón usar?

```
¿El usuario quiere...?
├── "algo que se vea premium" → Gradient Mesh + Floating Elements
├── "mostrar servicios de forma creativa" → Bento Grid
├── "contar una historia" → Scroll-Linked Typography
├── "profundidad visual" → Parallax Layers
├── "botones que llamen la atención" → Magnetic Button
├── "imágenes que impacten" → Image Reveal
├── "mostrar proceso/pasos" → Sticky Card Stack
├── "mucho contenido en poco espacio" → Horizontal Scroll
└── "animaciones suaves y elegantes" → FadeIn + Stagger (skill dab-animations)
```
