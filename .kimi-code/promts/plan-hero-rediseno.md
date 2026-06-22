# Plan: Rediseño Total del Hero — Estilo Europeo Premium (Porsche Inspired)

## 📋 Contexto

**Proyecto:** brilint — Agencia digital del Valle de Toluca  
**Stack:** Astro 5.16 + React 19 + Tailwind 3.4 + Framer Motion 12.23  
**Objetivo:** Rediseñar el Hero actual por completo. Dejar de lado el estilo "terminal/hacker" actual y adoptar un **diseño europeo premium** inspirado en Porsche, BMW, Mercedes-Benz: minimalista, audaz, con animaciones cinematográficas y una sensación de lujo técnico.

**Skills a invocar:**
- `/skill:dab-dev` — Contexto master del stack
- `/skill:dab-animations` — Patrones de Framer Motion
- `/skill:dab-design-system` — Tokens de color y tipografía
- `/skill:dab-astro-showcase` — Referencias de sitios reales
- `/skill:dab-frontend-arsenal` — Librerías avanzadas (GSAP, Lenis, Three.js)

---

## 🏎️ Referencias de Porsche Design

Según el Porsche Design System y su identidad de marca 2025-2026, los tres pilares son:

### 1. Focus (Enfoque)
- **Hero** como símbolo de poder, actitud y soberanía.
- Cada elemento visual debe tener un propósito claro.
- Tipografía audaz, espacio en blanco generoso, jerarquía implacable.
- **En el Hero:** Un solo mensaje dominante, nada de ruido visual.

### 2. Tension (Tensión)
- Contraste entre tradición y espíritu pionero.
- Líneas limpias que generan tensión visual.
- Transiciones que sorprenden pero no abruman.
- **En el Hero:** Scroll que transforma el layout, parallax agresivo, reveals dramáticos.

### 3. Purpose (Propósito)
- Pasión, precisión técnica, pensamiento visionario.
- No es espectáculo por el espectáculo: cada animación comunica.
- **En el Hero:** Las animaciones deben vender la idea de "automatización inteligente".

### Principios visuales de Porsche aplicados a brilint:
- **Tipografía masiva:** Títulos que ocupan el 60% del viewport.
- **Monocromático con acento:** Fondo oscuro profundo, texto blanco puro, acento cian/azul eléctrico como destello de precisión técnica.
- **Espacio negativo:** Más aire que contenido. La ausencia es diseño.
- **Materiales:** Glassmorphism sutil, no exagerado. Bordes finos, no gruesos.
- **Movimiento:** Suave, pesado, con inercia. Nada brusco.

---

## 🎯 Propuesta de Diseño: "The Precision Engine"

### Concepto
El Hero se convierte en una **experiencia de scroll cinematográfica** de 300vh de altura. No es una sección estática: es una narrativa visual que se despliega mientras el usuario hace scroll.

### Estructura del Hero (3 fases de scroll)

#### Fase 1: "El Impacto" (0vh - 100vh)
- **Fondo:** Negro absoluto `#000000` con una **malla de líneas finas** (1px, `rgba(255,255,255,0.03)`) que se curvan suavemente como las líneas de un túnel de viento.
- **Título:** "Sistemas que piensan." en tipografía masiva (clamp 4rem - 10rem), peso 700, tracking tight.
- **Subtítulo:** "Negocios que crecen." en acento cian `#00D4FF` (o `brilint-accent`), con un **underline animado** que se dibuja de izquierda a derecha.
- **CTA:** Un solo botón, minimalista, borde fino blanco, hover: fondo blanco, texto negro. Texto: "Iniciar diagnóstico".
- **Métricas:** 3 números grandes en la parte inferior, con contadores animados.
- **Sin dashboard flotante.** Sin partículas. Sin grid neural. **Solo tipografía, espacio y una línea.**

#### Fase 2: "La Revelación" (100vh - 200vh)
- Al hacer scroll, el título se **divide en palabras** que se dispersan hacia los bordes.
- Un **video o imagen de alta calidad** (un dashboard de analytics, una interfaz de IA) aparece desde el centro con un **mask reveal circular** que crece.
- **Parallax agresivo:** La imagen se mueve más lento que el scroll, creando profundidad.
- **Texto flotante:** Frases cortas aparecen a los lados de la imagen con `FadeIn` staggered.

#### Fase 3: "La Transición" (200vh - 300vh)
- La imagen se **escala hacia arriba** y se desvanece.
- Aparece el contenido de la siguiente sección (Servicios) con un **wipe transition** desde abajo.
- El hero se convierte en la sección siguiente sin corte brusco.

### Paleta de colores (Premium Europeo)
```
Fondo primario:   #000000 (negro absoluto)
Fondo secundario: #0A0A0F (negro azulado muy oscuro)
Texto primario:   #FFFFFF (blanco puro)
Texto secundario: #A0A0A0 (gris frío)
Acento:           #00D4FF (cian eléctrico) → mapear a brilint-accent
Borde sutil:      rgba(255,255,255,0.08)
Glass:            rgba(255,255,255,0.03) con backdrop-blur-md
```

### Tipografía (Europea / Suiza)
- **Display:** `Inter` o `Space Grotesk` (si está disponible) — peso 700, tracking tight.
- **Mono:** `JetBrains Mono` o `Fira Code` — solo para métricas y badges técnicos.
- **Body:** `Inter` — peso 400, legible, espacioso.

---

## 🚀 Recursos y Librerías Propuestos

### Obligatorio (ya en el proyecto)
- **Framer Motion** — Para animaciones declarativas de componentes React.

### Recomendado (nuevos)

#### 1. GSAP + ScrollTrigger (IMPRESCINDIBLE)
**¿Por qué?** El hero es una experiencia de scroll. Framer Motion no puede manejar scroll-linked animations complejas con la misma fluidez.

**Instalación:**
```bash
npm install gsap @gsap/react
```

**Uso:**
- Timeline de scroll que controla la fase 1 → 2 → 3.
- Pin del título durante la fase 1.
- Scrubbing bidireccional (scroll up revierte todo).
- Mask reveal de la imagen en fase 2.

#### 2. Lenis (Smooth Scroll)
**¿Por qué?** El scroll nativo se siente "seco". Lenis da inercia suave, tipo iPhone/Mac.

**Instalación:**
```bash
npm install lenis
```

**Uso:**
- Integrado con GSAP ScrollTrigger para sincronización perfecta.
- `duration: 1.2`, `easing: expo.out`.

#### 3. Three.js / React Three Fiber (OPCIONAL — Fase 1)
**¿Por qué?** Para el fondo de "malla de líneas" en 3D. Alternativa: hacerlo con CSS/SVG si se quiere evitar el peso.

**Decisión:** Si el bundle es crítico, usar **SVG animado** en lugar de Three.js. Si se quiere el "wow factor", usar Three.js con `client:visible`.

**Instalación (si se usa):**
```bash
npm install three @react-three/fiber @react-three/drei
```

**Alternativa ligera (SVG):**
- Un SVG con `stroke-dasharray` y `stroke-dashoffset` animado por GSAP.
- Líneas que se dibujan solas al cargar.

#### 4. Splitting.js (OPCIONAL)
**¿Por qué?** Para dividir el título en palabras/caracteres y animarlas individualmente con GSAP.

**Instalación:**
```bash
npm install splitting
```

**Alternativa:** Usar `gsap.splitText` (plugin pago de GSAP) o hacerlo manualmente con React.

---

## 📁 Estructura de Archivos

```
src/
├── components/
│   ├── sections/
│   │   └── Hero.astro              ← REFACTORIZAR (wrapper Astro)
│   ├── hero/
│   │   ├── HeroEngine.tsx          ← Componente React principal (GSAP + Lenis)
│   │   ├── Phase1Impact.tsx        ← Título masivo + métricas
│   │   ├── Phase2Reveal.tsx        ← Imagen con mask reveal
│   │   ├── Phase3Transition.tsx    ← Wipe a siguiente sección
│   │   ├── WindTunnelBg.tsx        ← Fondo de líneas (SVG o Three.js)
│   │   └── MetricsCounter.tsx      ← Contadores animados
│   └── animations/
│       └── (reutilizar FadeIn, StaggerContainer)
├── hooks/
│   └── useLenis.ts                 ← Hook de smooth scroll
├── lib/
│   └── utils.ts                    ← cn() (ya existe)
└── styles/
    └── hero.css                    ← Animaciones CSS críticas (reduced motion)
```

---

## 🔧 Pasos de Implementación

### Paso 0: Instalar dependencias
```bash
npm install gsap @gsap/react lenis
# Opcional:
# npm install three @react-three/fiber @react-three/drei
# npm install splitting
```

### Paso 1: Configurar Lenis + GSAP
Crear `src/hooks/useLenis.ts`:
```typescript
import Lenis from "lenis";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);
}
```

### Paso 2: Crear el componente principal `HeroEngine.tsx`
Este componente monta un `<div>` de `300vh` de altura y usa GSAP ScrollTrigger para controlar las 3 fases.

```typescript
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phase1Impact } from "./Phase1Impact";
import { Phase2Reveal } from "./Phase2Reveal";
import { Phase3Transition } from "./Phase3Transition";

gsap.registerPlugin(ScrollTrigger);

export function HeroEngine() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fase 1: Pin del título
      ScrollTrigger.create({
        trigger: ".phase-1",
        start: "top top",
        end: "+=100%",
        pin: true,
        scrub: 1,
      });

      // Fase 2: Mask reveal de imagen
      gsap.fromTo(
        ".reveal-mask",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          scrollTrigger: {
            trigger: ".phase-2",
            start: "top center",
            end: "center center",
            scrub: 1,
          },
        }
      );

      // Fase 3: Wipe transition
      gsap.to(".phase-3", {
        yPercent: -100,
        scrollTrigger: {
          trigger: ".phase-3",
          start: "top bottom",
          end: "top top",
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div className="phase-1 h-screen"><Phase1Impact /></div>
      <div className="phase-2 h-screen"><Phase2Reveal /></div>
      <div className="phase-3 h-screen"><Phase3Transition /></div>
    </div>
  );
}
```

### Paso 3: Crear `Phase1Impact.tsx`
- Fondo negro absoluto.
- SVG de líneas de "túnel de viento" animadas con GSAP (`stroke-dashoffset`).
- Título: "Sistemas que piensan." en blanco, 10vw de tamaño.
- Subtítulo: "Negocios que crecen." en cian, con underline animado.
- CTA minimalista: borde fino blanco, hover invertido.
- Métricas en la parte inferior: 3 cards con contadores animados.

### Paso 4: Crear `Phase2Reveal.tsx`
- Imagen de un dashboard/interfaz de IA (placeholder o asset real).
- Mask reveal: un círculo que crece desde el centro, revelando la imagen.
- Texto flotante a los lados: "Automatización inteligente", "Sin plantillas", "Sin excusas".
- Parallax: la imagen se mueve a 0.5x de velocidad del scroll.

### Paso 5: Crear `Phase3Transition.tsx`
- La imagen se escala a 1.2x y se desvanece.
- Un gradiente de wipe sube desde abajo, llevando al usuario a la sección de Servicios.
- El color del wipe coincide con el fondo de la siguiente sección.

### Paso 6: Refactorizar `Hero.astro`
```astro
---
import { HeroEngine } from "../hero/HeroEngine.tsx";
---

<section id="top" class="relative bg-black">
  <HeroEngine client:visible />
</section>
```

> ⚠️ **Importante:** `client:visible` porque el hero es pesado (GSAP + Lenis). No usar `client:load`.

### Paso 7: Eliminar código obsoleto
- [ ] Eliminar `HeroMotion.jsx` (si ya no se usa en otro lado).
- [ ] Eliminar `ConstellationBg.jsx`.
- [ ] Eliminar `splitText.js`.
- [ ] Eliminar estilos CSS del hero anterior (`neural-grid`, `scan-line`, `dashboard-panel`, etc.).
- [ ] Eliminar script vanilla del hero anterior.

### Paso 8: Build y verificación
```bash
npm run build
npm run preview
```

Verificar:
- [ ] Scroll suave con Lenis.
- [ ] Pin del título en fase 1.
- [ ] Mask reveal en fase 2.
- [ ] Wipe transition en fase 3.
- [ ] Métricas animadas.
- [ ] Responsive (mobile: fases más cortas, tipografía más pequeña).
- [ ] `prefers-reduced-motion`: desactivar GSAP animations, mostrar contenido estático.
- [ ] Performance: no regressión en LCP (fase 1 es ligera).

---

## 🛡️ Restricciones

- ❌ **NO** mantener el estilo "terminal/hacker" actual (scramble text, typewriter, dashboard flotante, grid neural, scan line).
- ❌ **NO** usar `client:load` en el hero — usar `client:visible`.
- ❌ **NO** animar propiedades de layout (width, height, margin, top).
- ❌ **NO** olvidar `prefers-reduced-motion`.
- ✅ **SÍ** usar `gsap.context()` + `ctx.revert()` para cleanup.
- ✅ **SÍ** mantener `brilint-accent` como color de acento (mapear a `#00D4FF` si es necesario).
- ✅ **SÍ** tipar todas las props.
- ✅ **SÍ** usar `cn()` para clases condicionales.

---

## 🎨 Inspiración Visual (Referencias)

| Sitio | Qué tomar |
|-------|-----------|
| **porsche.com** | Tipografía masiva, espacio negro, acento preciso, scroll cinematográfico |
| **bmw.com** | Líneas limpias, transiciones suaves, sensación de movimiento |
| **mercedes-benz.com** | Lujo técnico, glassmorphism sutil, iluminación dramática |
| **apple.com/iphone** | Restricción de color, una sola idea por viewport, animaciones que venden |
| **unseen.studio** | Navegación como experiencia, hover states confiados |
| **coastalworld.com** | Scroll storytelling, parallax, revelados dramáticos |

---

## 📐 Mockup Mental del Resultado

```
┌─────────────────────────────────────────┐
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │  ← Fondo negro absoluto
│  ░  SISTEMAS QUE PIENSAN.            ░  │  ← Título 10vw, blanco, bold
│  ░                                    ░  │
│  ░  Negocios que crecen.             ░  │  ← Subtítulo cian, underline animado
│  ░  ───────────────────────           ░  │
│  ░                                    ░  │
│  ░  [ Iniciar diagnóstico ]        ░  │  ← CTA minimalista, borde fino
│  ░                                    ░  │
│  ░  15ms    24/7    99.9%          ░  │  ← Métricas, mono font
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│         ↓ SCROLL ↓                      │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│  ░                                    ░  │
│  ░      ◯  →  [IMAGEN DASHBOARD]   ░  │  ← Mask reveal circular
│  ░                                    ░  │
│  ░  Automatización  Sin plantillas  ░  │  ← Texto flotante
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│         ↓ SCROLL ↓                      │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│  ░  [IMAGEN ESCALA Y DESVANECE]    ░  │
│  ░                                    ░  │
│  ░  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │  ← Wipe gradiente
│  ░  NUESTROS SERVICIOS                ░  │  ← Siguiente sección
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
└─────────────────────────────────────────┘
```

---

## 🧪 Criterios de Aceptación

| Criterio | Verificación |
|----------|-------------|
| Build pasa | `npm run build` sin errores |
| Scroll cinematográfico | Lenis + GSAP funcionan, 3 fases claras |
| Tipografía masiva | Título ocupa 50%+ del viewport en desktop |
| Responsive | Mobile: fases simplificadas, tipografía reducida |
| Performance | LCP < 2.5s (fase 1 es ligera: texto + SVG) |
| Reduced motion | `prefers-reduced-motion`: contenido estático, sin animaciones |
| Colores | Negro absoluto, blanco puro, acento cian. Sin grises cálidos. |
| Sin código muerto | No quedan referencias al hero anterior |

---

## 📝 Notas para el Agente (Kimi Code)

1. **Leer este archivo completo** antes de empezar.
2. **Invocar skills** según necesidad:
   - `/skill:dab-dev` para contexto del stack.
   - `/skill:dab-animations` para patrones de Framer Motion (complemento a GSAP).
   - `/skill:dab-design-system` para tokens de color.
   - `/skill:dab-frontend-arsenal` para decidir si usar Three.js o SVG.
3. **No reinventar:** Si existe `FadeIn.tsx` o `StaggerContainer.tsx`, reutilizarlos.
4. **Probar en mobile primero:** El diseño debe funcionar en 375px antes de pulir desktop.
5. **Commit frecuente:** Cada fase terminada = un commit (`feat(hero): fase 1 impact`, etc.).
