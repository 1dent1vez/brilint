# Plan V2: Hero Rediseñado — "Cyber-Luxury Elevation"

## 📋 Contexto

**Proyecto:** brilint — Agencia digital del Valle de Toluca  
**Stack:** Astro 5.16 + React 19 + Tailwind 3.4 + Framer Motion 12.23  
**Estado actual:** El hero existe y funciona. Tiene grid neural, partículas, scramble text, typewriter, dashboard flotante, métricas, scan line.  
**Objetivo:** Elevar el hero actual a algo **increíble** sin tirarlo a la basura. Mantener la identidad cyber/técnica de brilint, pero hacerlo sentir **premium, fluido y pulido**. Usar exclusivamente lo que ya se creó en el proyecto (skills, componentes, utilidades).

**Skills a invocar:**
- `/skill:dab-animations` — FadeIn, StaggerContainer, hover effects, spring animations
- `/skill:dab-design-system` — Tokens brilint-*, tipografía, spacing
- `/skill:dab-components` — Patrones de sección, accesibilidad
- `/skill:dab-vibecoding` — Flujo rápido de iteración
- `/skill:dab-frontend-arsenal` — React-tilt, magnetic buttons, number-flow (solo si ya están o se justifica)

---

## 🎯 Filosofía: No reinventar, elevar

El hero actual tiene buena base. Lo que falla es la **ejecución técnica**:
- Los scripts vanilla (scramble, typewriter, counters) son rígidos y no respetan `prefers-reduced-motion`.
- El dashboard flota pero sin interactividad real.
- No hay efectos de mouse tracking.
- Las animaciones CSS son globales y no componentizadas.
- No hay stagger ni secuencia narrativa en la entrada.

**La propuesta:** Migrar todo el hero a **React + Framer Motion**, agregar **interactividad de mouse**, **efectos 3D sutil** en el dashboard, y una **secuencia de entrada cinematográfica** que cuente una historia en 3 segundos.

---

## 🚀 Propuesta: "The Living Interface"

### Concepto
El hero no es una imagen estática. Es una **interfaz viva** que reacciona al usuario:
- El fondo respira con el mouse.
- El dashboard se inclina en 3D siguiendo el cursor.
- El texto no solo aparece: se "descifra" con estilo.
- Las métricas no solo cuentan: fluyen.
- Todo entra en escena con una coreografía precisa.

### Cambios respecto al hero actual

| Elemento actual | Mejora propuesta | Tecnología |
|-----------------|------------------|------------|
| Grid neural (CSS) | Grid neural con **mouse parallax** (se mueve opuesto al cursor) | Framer Motion `useMotionValue` |
| Partículas (ConstellationBg) | Mantener pero con **conexiones dinámicas** al mouse | React Three Fiber o canvas 2D (mantener existente) |
| Scramble text (vanilla JS) | **Scramble fluido** con Framer Motion + secuencia controlada | Framer Motion `animate` + custom hook |
| Typewriter (vanilla JS) | **Typewriter con cursor parpadeante** como componente React | Framer Motion + `useMotionValue` |
| Dashboard flotante (CSS float) | **Dashboard con tilt 3D** siguiendo el mouse + glassmorphism mejorado | React-tilt o Framer Motion `rotateX/Y` |
| Métricas (vanilla counter) | **Contadores con NumberFlow** o spring animation | Framer Motion `useSpring` + `useInView` |
| Scan line (CSS) | **Scan line con glitch sutil** aleatorio | CSS + Framer Motion |
| CTA (glow estático) | **CTA magnético** que sigue ligeramente el cursor + glow pulsante | Framer Motion `whileHover` + magnetic effect |
| Barras de analytics (CSS) | **Barras con spring** que rebotan al entrar en viewport | Framer Motion `spring` |
| Sin secuencia de entrada | **Coreografía de entrada:** fondo → grid → título → subtítulo → dashboard → métricas → CTA | Framer Motion `staggerChildren` + delays |

---

## 🎨 Paleta y Estilo (Mantener brilint)

No se toca el design system. Se respetan exactamente:
- `bg-brilint-bg`
- `text-brilint-text`
- `text-brilint-accent` (`#4C7FFF`)
- `text-brilint-muted`
- `border-brilint-border`
- `font-display`, `font-body`, `font-mono`

Lo único que se agrega es **más profundidad** mediante:
- Glassmorphism real (`backdrop-blur-xl`, `bg-white/5`, borders finos)
- Sombras sutiles (`shadow-2xl shadow-brilint-accent/5`)
- Gradientes de acento más audaces en hover

---

## 📁 Estructura de Archivos (Refactorización controlada)

```
src/
├── components/
│   ├── sections/
│   │   └── Hero.astro              ← REFACTORIZAR (wrapper, eliminar script/style)
│   ├── hero/
│   │   ├── HeroClient.tsx          ← Componente React principal (orquesta todo)
│   │   ├── NeuralGrid.tsx          ← Grid con mouse parallax
│   │   ├── ScrambleText.tsx        ← Texto que se descifra con Framer Motion
│   │   ├── TypewriterText.tsx      ← Efecto máquina de escribir React
│   │   ├── Dashboard3D.tsx         ← Dashboard con tilt 3D + glassmorphism
│   │   ├── MetricCard.tsx          ← Card de métrica con counter spring
│   │   ├── MagneticButton.tsx      ← CTA que sigue el cursor
│   │   ├── ScanLine.tsx            ← Línea de scan con glitch
│   │   └── AnimatedBars.tsx        ← Barras de analytics con spring
│   └── animations/
│       └── (FadeIn.tsx, StaggerContainer.tsx ya existen)
├── hooks/
│   └── useMousePosition.ts         ← Hook para tracking de mouse
└── lib/
    └── utils.ts                    ← cn() ya existe
```

---

## 🔧 Componentes Detallados

### 1. NeuralGrid.tsx (Mouse Parallax)
```tsx
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export function NeuralGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const x = useTransform(springX, [-0.5, 0.5], [30, -30]);
  const y = useTransform(springY, [-0.5, 0.5], [30, -30]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      style={{ x, y }}
      className="absolute inset-0 pointer-events-none"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(76, 127, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(76, 127, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 50% at 50% 0%, black 40%, transparent 80%)",
        }}
      />
    </motion.div>
  );
}
```

### 2. ScrambleText.tsx (Framer Motion)
```tsx
import { motion, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

export function ScrambleText({ text, className, delay = 0, duration = 2.5 }: ScrambleTextProps) {
  const [display, setDisplay] = useState("");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplay(text);
      return;
    }

    const timeout = setTimeout(() => {
      let frame = 0;
      const totalFrames = duration * 60;
      const interval = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        let result = "";
        for (let i = 0; i < text.length; i++) {
          if (text[i] === " ") {
            result += " ";
          } else if (progress > i / text.length) {
            result += text[i];
          } else {
            result += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
        setDisplay(result);
        if (frame >= totalFrames) {
          clearInterval(interval);
          setDisplay(text);
        }
      }, 1000 / 60);
      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [text, delay, duration, shouldReduceMotion]);

  return <motion.span className={className}>{display}</motion.span>;
}
```

### 3. Dashboard3D.tsx (Tilt 3D con Framer Motion)
```tsx
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface Dashboard3DProps {
  children: ReactNode;
  className?: string;
}

export function Dashboard3D({ children, className }: Dashboard3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, perspective: 1200 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

### 4. MagneticButton.tsx (CTA que sigue el cursor)
```tsx
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  href: string;
  className?: string;
}

export function MagneticButton({ children, href, className }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}
```

### 5. MetricCard.tsx (Counter con Spring)
```tsx
import { motion, useSpring, useTransform, useInView, useReducedMotion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface MetricCardProps {
  label: string;
  value: number;
  suffix: string;
  delay?: number;
}

export function MetricCard({ label, value, suffix, delay = 0 }: MetricCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const shouldReduceMotion = useReducedMotion();
  const [hasAnimated, setHasAnimated] = useState(false);

  const spring = useSpring(0, { duration: 2000, bounce: 0 });
  const display = useTransform(spring, (v) => Math.floor(v));

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      const timeout = setTimeout(() => spring.set(value), delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [isInView, hasAnimated, spring, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, borderColor: "rgba(76, 127, 255, 0.25)" }}
      className="p-3 rounded-lg bg-brilint-surface/50 border border-brilint-border/30 backdrop-blur-sm relative overflow-hidden group cursor-default"
    >
      <div className="text-[10px] font-body text-brilint-muted/60 mb-1 uppercase tracking-wider">{label}</div>
      <div className="text-xl md:text-2xl font-mono font-bold text-brilint-text flex items-baseline gap-1">
        {shouldReduceMotion ? value : <motion.span>{display}</motion.span>}
        <span className="text-brilint-accent text-sm">{suffix}</span>
      </div>
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-brilint-accent/0 via-brilint-accent/40 to-brilint-accent/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    </motion.div>
  );
}
```

### 6. ScanLine.tsx (Glitch sutil)
```tsx
import { motion } from "framer-motion";

export function ScanLine() {
  return (
    <motion.div
      initial={{ top: "-2px" }}
      animate={{ top: ["-2px", "100%", "-2px"] }}
      transition={{ duration: 8, ease: "linear", repeat: Infinity }}
      className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brilint-accent/30 to-transparent pointer-events-none z-5"
    />
  );
}
```

### 7. AnimatedBars.tsx (Spring)
```tsx
import { motion } from "framer-motion";

const bars = [40, 65, 45, 80, 55, 70, 90];

export function AnimatedBars() {
  return (
    <div className="flex items-end gap-1 h-16">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0.3 }}
          animate={{ scaleY: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: i * 0.1,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 1,
          }}
          style={{ height: `${height}%`, originY: 1 }}
          className="w-3 bg-brilint-accent/40 rounded-t"
        />
      ))}
    </div>
  );
}
```

---

## 🎬 Secuencia de Entrada (Coreografía)

Todo el hero se renderiza como un solo componente React `HeroClient.tsx` con `staggerChildren`:

```
0.0s → Fondo negro aparece (opacity 0 → 1, 0.3s)
0.2s → NeuralGrid aparece con parallax activo
0.4s → ConstellationBg (partículas) fade in
0.6s → Terminal badge (badge con ping) slide down + fade
0.8s → Título línea 1: ScrambleText empieza
1.6s → Título línea 2: ScrambleText empieza
2.4s → Underline se dibuja (scaleX 0 → 1)
2.6s → TypewriterText empieza
3.0s → CTA MagneticButton slide up + fade
3.2s → Métricas: StaggerContainer (3 cards, delay 0.1s cada una)
3.4s → Dashboard3D: rotateX/Y entrance + fade
3.6s → Paneles del dashboard: stagger interno
3.8s → ScanLine empieza a animar
4.0s → Todo listo. Interactividad de mouse activa.
```

---

## 🔧 Pasos de Implementación

### Paso 1: Eliminar código obsoleto del Hero.astro
- [ ] Eliminar `<script>` inline (scramble, typewriter, counters)
- [ ] Eliminar `<style>` inline (neural-grid, scan-line, dashboard-panel, etc.)
- [ ] Eliminar imports de `splitTextToWords`, `HeroMotion`, `ConstellationBg` (si ya no se usan en otros lados)
- [ ] Mantener `WHATSAPP_URL` import (se usa en CTA)

### Paso 2: Crear componentes en `src/components/hero/`
1. `NeuralGrid.tsx`
2. `ScrambleText.tsx`
3. `TypewriterText.tsx`
4. `Dashboard3D.tsx`
5. `MagneticButton.tsx`
6. `MetricCard.tsx`
7. `ScanLine.tsx`
8. `AnimatedBars.tsx`
9. `HeroClient.tsx` (orquestador)

### Paso 3: Refactorizar `Hero.astro`
```astro
---
import Container from '../ui/Container.astro';
import { HeroClient } from '../hero/HeroClient.tsx';
import { WHATSAPP_URL } from '../../config/contact';
---

<section id="top" class="relative min-h-screen flex flex-col overflow-hidden bg-brilint-bg" aria-labelledby="hero-title">
  <HeroClient client:visible whatsappUrl={WHATSAPP_URL("Hola, quiero automatizar mi negocio")} />
</section>
```

> ⚠️ **Importante:** `client:visible` para lazy hydration. El hero es pesado.

### Paso 4: Verificar que no quedan referencias rotas
- [ ] `HeroMotion.jsx` — si no se usa en otro lado, eliminar
- [ ] `ConstellationBg.jsx` — si no se usa en otro lado, eliminar
- [ ] `splitText.js` — si no se usa en otro lado, eliminar

### Paso 5: Build
```bash
npm run build
```

### Paso 6: Preview + testing
- [ ] Secuencia de entrada funciona en orden correcto
- [ ] Mouse parallax en grid
- [ ] Tilt 3D en dashboard
- [ ] Magnetic button sigue cursor
- [ ] Métricas animan con spring
- [ ] Scan line anima
- [ ] Barras rebotan con spring
- [ ] `prefers-reduced-motion`: todo estático pero funcional
- [ ] Responsive: mobile tipografía se ajusta, dashboard se oculta o simplifica

---

## 🛡️ Restricciones

- ❌ **NO** cambiar colores del design system (`brilint-*` tokens intactos)
- ❌ **NO** cambiar tipografía (`font-display`, `font-body`, `font-mono`)
- ❌ **NO** eliminar el dashboard flotante (se mejora, no se tira)
- ❌ **NO** eliminar las métricas (se animan mejor)
- ❌ **NO** usar `client:load` — usar `client:visible`
- ❌ **NO** instalar librerías nuevas (todo con Framer Motion que ya está)
- ✅ **SÍ** migrar todos los scripts vanilla a React + Framer Motion
- ✅ **SÍ** agregar interactividad de mouse (parallax, tilt, magnetic)
- ✅ **SÍ** usar `useReducedMotion()` en cada componente animado
- ✅ **SÍ** tipar todas las props con interfaces
- ✅ **SÍ** usar `cn()` para clases condicionales

---

## 🧪 Criterios de Aceptación

| Criterio | Verificación |
|----------|-------------|
| Build pasa | `npm run build` sin errores |
| Secuencia de entrada | Visual: elementos aparecen en orden, sin saltos |
| Mouse parallax | Mover mouse: grid se desplaza suavemente opuesto |
| Dashboard 3D | Mover mouse sobre dashboard: se inclina en 3D |
| Magnetic CTA | Acercar cursor a CTA: se acerca ligeramente al cursor |
| Métricas spring | Scroll a métricas: números fluyen con spring, no lineal |
| Reduced motion | Activar en OS: todo estático, scramble muestra texto final directamente |
| Responsive | Mobile: dashboard oculto o simplificado, tipografía ajustada |
| Sin código muerto | No quedan `HeroMotion.jsx`, `ConstellationBg.jsx`, `splitText.js` si no se usan |
| Performance | Lighthouse: LCP < 2.5s, CLS < 0.1 |

---

## 📝 Notas para el Agente (Kimi Code)

1. **Leer este archivo completo** antes de empezar.
2. **Invocar skills** según necesidad:
   - `/skill:dab-animations` para FadeIn, StaggerContainer, hover effects
   - `/skill:dab-design-system` para tokens brilint-*
   - `/skill:dab-components` para patrones de sección
3. **No reinventar:** Si existe `FadeIn.tsx` o `StaggerContainer.tsx`, reutilizarlos.
4. **Probar en mobile primero:** El diseño debe funcionar en 375px.
5. **Commit frecuente:** Cada componente terminado = un commit.
6. **Si un componente es muy complejo:** Dividir en sub-componentes más pequeños.
