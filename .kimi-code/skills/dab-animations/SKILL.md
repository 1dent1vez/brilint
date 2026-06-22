---
name: dab-animations
description: Animation patterns and motion design guidelines for the dab agency landing page using Framer Motion. Covers scroll reveals, stagger effects, page transitions, micro-interactions, and performance-optimized motion.
type: prompt
whenToUse: When the user asks to add animations, transitions, motion effects, scroll reveals, hover effects, page transitions, or micro-interactions to the dab project.
disableModelInvocation: false
arguments:
  - component
  - effect
---

# dab — Animation & Motion Design System

## Principios de Animación

1. **Propósito, no decoración:** Cada animación debe guiar la atención o comunicar estado
2. **60fps o nada:** Usar `transform` y `opacity` exclusivamente. NUNCA animar `width`, `height`, `top`, `left`, `margin`, `padding`
3. **Respetar `prefers-reduced-motion`:** Siempre envolver en `useReducedMotion()`
4. **Consistencia temporal:** Duración base 0.4s-0.6s, easing `easeOut` para entrada, `easeInOut` para interacciones

## Patrones de Animación Reutilizables

### 1. FadeIn Wrapper (Scroll-Triggered)
```tsx
import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  className?: string;
}

export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  duration = 0.6,
  className,
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  };

  if (shouldReduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

### 2. Stagger Container (Lista de items)
```tsx
import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: (staggerDelay: number) => ({
    opacity: 1,
    transition: { staggerChildren: staggerDelay, delayChildren: 0.1 },
  }),
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className,
}: StaggerContainerProps) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={staggerDelay}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
```

### 3. Hover Scale + Glow (Cards/Buttons)
```tsx
import { motion } from "framer-motion";

<motion.div
  whileHover={{ scale: 1.03, y: -4 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
  className="rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow"
>
  {children}
</motion.div>
```

### 4. Text Reveal (Letter-by-letter o Word-by-word)
```tsx
import { motion } from "framer-motion";

export function TextReveal({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };
  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } },
  };

  return (
    <motion.span className={className} variants={container} initial="hidden" whileInView="visible">
      {words.map((word, i) => (
        <motion.span variants={child} key={i} className="inline-block mr-[0.25em]">
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
```

### 5. Counter / Number Animation
```tsx
import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

export function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const spring = useSpring(0, { duration: 2000, bounce: 0 });
  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    if (isInView) spring.set(value);
  }, [isInView, spring, value]);

  return (
    <span ref={ref}>
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}
```

### 6. Page Transition (Astro View Transitions API + Framer Motion)
```tsx
// En layouts, usar Astro View Transitions nativo
// En componentes React, envolver con AnimatePresence si es necesario
import { AnimatePresence, motion } from "framer-motion";

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={typeof window !== "undefined" ? window.location.pathname : ""}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

## Easing Tokens (Consistentes)

| Nombre | Valor | Uso |
|--------|-------|-----|
| `easeOut` | `[0, 0, 0.2, 1]` | Entradas, reveals |
| `easeInOut` | `[0.4, 0, 0.2, 1]` | Interacciones, toggles |
| `spring` | `type: "spring", stiffness: 300, damping: 24` | Hover, tap |
| `bounce` | `type: "spring", stiffness: 400, damping: 10` | Celebraciones, éxito |

## Performance Checklist

- [ ] Animar solo `transform` y `opacity`
- [ ] Usar `will-change: transform` en elementos animados frecuentemente
- [ ] `viewport={{ once: true }}` para animaciones de scroll (no re-animar)
- [ ] `layout` prop solo cuando sea estrictamente necesario (costoso)
- [ ] Lazy load componentes pesados de animación con `client:visible`
- [ ] Probar en modo de batería baja / reduced motion

## Anti-patrones (NUNCA hacer)

- ❌ Animar `width`, `height`, `top`, `margin` → causa layout thrashing
- ❌ `animate` en cada render sin memoization → re-triggers
- ❌ Múltiples `motion.div` anidados sin necesidad → complejidad innecesaria
- ❌ Ignorar `prefers-reduced-motion` → accesibilidad rota
- ❌ Duraciones mayores a 1s para UI feedback → se siente lento
