# DAB — Implementación: Línea de Tiempo Vertical con Scroll (Estilo Landbot)

> **Versión:** 1.0  
> **Fecha:** 2026-06-24  
> **Basado en:** Auditoría de Proceso (reporte entregado) + referencia visual Landbot  
> **Regla de oro:** Este documento es la fuente de verdad. Si algo no está claro, leer el código existente antes de asumir. Nunca inventar clases, colores o tokens nuevos.

---

## 1. OBJETIVO

Reemplazar la sección de **Proceso** (`src/components/proceso/Proceso.astro`) por una **línea de tiempo vertical** con las siguientes características exactas:

1. **Línea central vertical** con una **flecha animada que avanza progresivamente** conforme el usuario hace scroll.
2. **Números/iconos enumerados en círculos SOBRE la línea** con fondo SÓLIDO (no transparente), para que la flecha animada pase por DEBAJO de ellos sin interferir visualmente.
3. **Recuadros de contenido (cards) distribuidos alternando IZQUIERDA y DERECHA** (zigzag) en desktop.
4. En **mobile**, todo se apila a la derecha de la línea (cards a la derecha, números a la izquierda).
5. **Tamaño de recuadros responsive al contenido textual** (altura automática, no altura fija).
6. **Animaciones de scroll** usando Framer Motion (ya instalado): la flecha avanza, los nodos se activan (glow), las cards hacen fadeIn staggered.

**NO tocar:** Hero, Métricas, Servicios, MuroConfianza, FAQ, Contacto, CTA, Footer, Nav.

---

## 2. CONTEXTO DEL PROYECTO (del reporte de auditoría)

### Stack
- Astro 5.16.0 (static, Vercel adapter)
- React 19.2.0 + **Framer Motion 12.23.24** ✅ instalado
- Tailwind CSS 3.4.18
- NO GSAP en este componente
- NO View Transitions

### Estilos y tokens existentes (USAR ÚNICAMENTE ESTOS)
```
bg-dab-bg: #05060A
bg-dab-surface: #0B0D14
bg-dab-bg/40, bg-dab-bg/50, bg-dab-bg/70: opacidades de fondo
bg-dab-accent/10: fondo acento muy sutil
border-dab-border/40, border-dab-border/50, border-dab-border/60: bordes grises
border-dab-accent/20, border-dab-accent/30, border-dab-accent/40: bordes acento
border-dab-accent/80: borde acento hover/destacado
text-dab-accent: #4C7FFF
text-dab-muted: #9CA3AF
text-dab-muted/60, text-dab-muted/70: opacidades de texto muted
text-dab-text: #E5E7EB
font-body: Inter
font-mono: JetBrains Mono / Fira Code
font-display: Thunder / Impact / Arial Black (SOLO para títulos cortos, NUNCA para descripciones)
backdrop-blur-sm: blur sutil
shadow-dab-soft: 0 18px 45px rgba(0,0,0,0.45)
py-section-y: spacing vertical de sección (definido en tailwind config)
```

### Componentes UI a reutilizar
- `Container.astro` (wrapper con márgenes consistentes)
- `SectionTitle.astro` (título de sección consistente)

### Data actual (hardcodeada en Proceso.astro)
```javascript
const pasos = [
  { id: 1, titulo: 'Diagnóstico', linea: 'Entendemos tu negocio antes de tocar una tecla.', tiempo: '30 min' },
  { id: 2, titulo: 'Estrategia', linea: 'Priorizamos lo que genera clientes, no lo que luce bonito.', tiempo: '1-2 días' },
  { id: 3, titulo: 'Implementación', linea: 'Construimos, conectamos y probamos antes de entregar.', tiempo: '1-2 semanas' },
  { id: 4, titulo: 'Optimización', linea: 'Ajustamos según datos reales, no suposiciones.', tiempo: 'Continuo' },
];
```

### Clases exactas del componente actual (mantener donde aplique)

**Sección:**
```
py-16 md:py-section-y bg-dab-surface relative overflow-hidden
```

**Container:**
```
space-y-10 md:space-y-14 relative z-10
```

**SectionTitle:**
```
title="Así es trabajar con Dab"
subtitle="Cuatro pasos. Cero sorpresas. Sabes exactamente dónde estamos y qué sigue."
```

**CTA final (mantener EXACTAMENTE igual):**
```
<div class="text-center pt-4">
  <p class="font-body text-sm text-dab-muted/70 inline-flex items-center gap-2">
    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
    Diagnóstico inicial sin costo. Sin compromiso.
  </p>
</div>
```

---

## 3. ESPECIFICACIONES VISUALES EXACTAS

### 3.1 Layout general

**Desktop (md: y arriba):**
- Contenedor centrado con `max-w-6xl` o el ancho que use `Container.astro`.
- Línea de tiempo vertical centrada en el medio de la pantalla.
- Cards alternando: paso 1 a la **izquierda**, paso 2 a la **derecha**, paso 3 a la **izquierda**, paso 4 a la **derecha**.
- La línea pasa exactamente por el centro entre las dos columnas de cards.

**Mobile (por debajo de md):**
- Línea de tiempo vertical alineada a la izquierda (ej: `left: 24px` o `left: 28px`).
- Todos los cards apilados a la **derecha** de la línea.
- Números/nodos centrados sobre la línea.

### 3.2 Línea central y flecha animada (CRÍTICO)

**Estructura:**
```
<div class="timeline-container relative">
  <!-- Línea base (apagada) -->
  <div class="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-dab-border/40 via-dab-border/60 to-dab-border/40 z-[1]"></div>

  <!-- Línea de progreso animada (encendida) -->
  <motion.div 
    className="absolute left-1/2 top-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-dab-accent via-[#7B61FF] to-dab-accent z-[2] origin-top"
    style={{ scaleY: scrollProgress }}
  >
    <!-- Flecha en la punta -->
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
        <path d="M8 12L0 0H16L8 12Z" fill="#4C7FFF"/>
      </svg>
    </div>
  </motion.div>
</div>
```

**Comportamiento:**
- La línea de progreso usa `scaleY` con `transform-origin: top` para crecer desde arriba hacia abajo.
- El valor `scrollProgress` viene de `useScroll` + `useTransform` de Framer Motion.
- La flecha en la punta siempre está en el bottom de la línea de progreso.
- La flecha tiene un sutil `animate-pulse` o animación de opacidad para indicar que está "avanzando".

**Mobile:**
- La línea base y la línea de progreso se alinean a `left: 24px` (o `left: 28px`) en lugar de `left: 50%`.
- La flecha sigue en la punta de la línea de progreso.

### 3.3 Nodos/números (CRÍTICO — fondo SÓLIDO)

**Especificación visual exacta:**
- Los nodos son **círculos con fondo SÓLIDO** (`bg-dab-surface` o `#0B0D14`), NUNCA transparentes.
- Esto es para que la **línea de progreso pase por DEBAJO** del nodo sin verse a través de él.
- El nodo tiene un `z-index` mayor que la línea de progreso (ej: `z-10` vs `z-[2]`).
- Borde: `border-2 border-dab-accent/40` (apagado), cambia a `border-dab-accent` (encendido) cuando el paso está activo.
- Glow al activar: `shadow-[0_0_20px_rgba(76,127,255,0.3)]` + `scale: 1.1`.
- Número dentro: `font-mono text-sm font-bold text-dab-accent` (apagado), cambia a `text-dab-bg` (el fondo oscuro) cuando está activo, con fondo del nodo cambiando a `bg-dab-accent`.
- Tamaño: `w-12 h-12` (48px) en desktop, `w-10 h-10` (40px) en mobile.

**Estructura del nodo:**
```jsx
<motion.div
  className="relative z-10 w-12 h-12 rounded-full bg-dab-surface border-2 border-dab-accent/40 flex items-center justify-center"
  initial={{ borderColor: "rgba(76, 127, 255, 0.4)" }}
  whileInView={{ 
    borderColor: "rgba(76, 127, 255, 1)",
    backgroundColor: "#4C7FFF",
    scale: 1.1,
    boxShadow: "0 0 20px rgba(76, 127, 255, 0.3)"
  }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.4 }}
>
  <motion.span 
    className="font-mono text-sm font-bold"
    initial={{ color: "#4C7FFF" }}
    whileInView={{ color: "#05060A" }}
    viewport={{ once: true, margin: "-100px" }}
  >
    {paso.id}
  </motion.span>
</motion.div>
```

**Icono SVG dentro del nodo (opcional pero recomendado):**
- Si se incluyen iconos SVG, deben ser pequeños (`w-5 h-5`) y usar `stroke="currentColor"`.
- El color cambia con el nodo (de `text-dab-accent` a `text-dab-bg`).

### 3.4 Cards de contenido (zigzag + responsive al contenido)

**Desktop — distribución zigzag:**

Cada paso es un `<div className="flex items-center">` con:
- Paso impar (1, 3): card a la **izquierda**, nodo en el centro, espacio vacío a la derecha.
- Paso par (2, 4): espacio vacío a la **izquierda**, nodo en el centro, card a la **derecha**.

**Estructura de un paso (desktop):**
```jsx
<div className="flex items-center gap-8">
  {/* Lado izquierdo */}
  <div className="flex-1 flex justify-end">
    {isOdd && <Card paso={paso} align="right" />}
  </div>

  {/* Centro — nodo */}
  <div className="shrink-0 relative z-10">
    <Node paso={paso} />
  </div>

  {/* Lado derecho */}
  <div className="flex-1 flex justify-start">
    {!isOdd && <Card paso={paso} align="left" />}
  </div>
</div>
```

**Card:**
- Clases: `glass-card rounded-2xl p-6 md:p-8` (mismas que usan otros componentes del proyecto).
- **Altura: automática** (`h-auto`). NUNCA altura fija. El card crece según el contenido textual.
- **Ancho máximo:** `max-w-md` o `max-w-lg` para que no se estire demasiado en pantallas anchas.
- **Alineación del texto:**
  - Cards del lado izquierdo: `text-right` (título, descripción, badge de tiempo alineados a la derecha).
  - Cards del lado derecho: `text-left` (texto normal).

**Mobile — todo a la derecha:**
```jsx
<div className="flex items-start gap-4 md:hidden">
  {/* Nodo */}
  <div className="shrink-0 relative z-10">
    <Node paso={paso} />
  </div>

  {/* Card */}
  <div className="flex-1">
    <Card paso={paso} align="left" />
  </div>
</div>
```

### 3.5 Contenido de la card

**Estructura interna de la card:**
```jsx
<div className="glass-card rounded-2xl p-6 md:p-8">
  {/* Time badge */}
  <div className={`flex items-center gap-2 mb-3 ${align === 'right' ? 'md:justify-end' : ''}`}>
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dab-accent/8 border border-dab-accent/15 text-[11px] font-semibold text-dab-accent uppercase tracking-wider">
      <span className="w-1.5 h-1.5 rounded-full bg-dab-accent"></span>
      {paso.tiempo}
    </span>
  </div>

  {/* Título */}
  <h3 className={`font-display text-xl md:text-2xl text-white mb-2 tracking-tight ${align === 'right' ? 'md:text-right' : ''}`}>
    {paso.titulo}
  </h3>

  {/* Descripción */}
  <p className={`text-sm md:text-base text-dab-muted leading-relaxed ${align === 'right' ? 'md:text-right' : ''}`}>
    {paso.linea}
  </p>

  {/* Footer opcional */}
  <div className={`mt-4 pt-4 border-t border-white/5 ${align === 'right' ? 'md:text-right' : ''}`}>
    <span className="text-xs text-dab-muted/60 uppercase tracking-wider">
      {paso.footer || 'Paso ' + paso.id}
    </span>
  </div>
</div>
```

**Nota sobre altura:** La card NO debe tener `h-64`, `h-72`, ni ninguna altura fija. Debe ser `h-auto` (default de div). El padding (`p-6 md:p-8`) y el contenido determinan la altura.

---

## 4. ANIMACIONES CON FRAMER MOTION

### 4.1 Línea de progreso (scroll-driven)

```jsx
import { useScroll, useTransform, motion } from 'framer-motion';

const containerRef = useRef(null);
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start 0.8", "end 0.2"]
});

const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
```

La línea de progreso es un `motion.div` con `style={{ height: lineHeight }}` o `style={{ scaleY: scrollYProgress }}` con `transformOrigin: "top"`.

**Mobile:** Usar el mismo `scrollYProgress` pero la línea está alineada a la izquierda.

### 4.2 Activación de nodos (viewport entry)

Cada nodo se activa cuando entra en viewport:

```jsx
<motion.div
  initial={{ 
    borderColor: "rgba(76, 127, 255, 0.4)",
    backgroundColor: "#0B0D14",
    scale: 1
  }}
  whileInView={{ 
    borderColor: "rgba(76, 127, 255, 1)",
    backgroundColor: "#4C7FFF",
    scale: 1.1,
    boxShadow: "0 0 20px rgba(76, 127, 255, 0.3)"
  }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.4, ease: "easeOut" }}
>
```

El texto/número dentro del nodo también anima:
```jsx
<motion.span
  initial={{ color: "#4C7FFF" }}
  whileInView={{ color: "#05060A" }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.3, delay: 0.1 }}
>
```

### 4.3 Cards (fadeIn + slide)

Cards del lado izquierdo: animan desde la izquierda (`x: -30` → `x: 0`).
Cards del lado derecho: animan desde la derecha (`x: 30` → `x: 0`).

```jsx
<motion.div
  initial={{ opacity: 0, x: isOdd ? -30 : 30 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
>
  <Card paso={paso} />
</motion.div>
```

**Mobile:** Todas las cards animan desde la derecha (`x: 20`) o desde abajo (`y: 20`).

### 4.4 Flecha en la punta

La flecha SVG en la punta de la línea de progreso debe tener una animación sutil de pulso:

```jsx
<motion.div 
  className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
  animate={{ y: [0, 4, 0], opacity: [1, 0.7, 1] }}
  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
>
  <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
    <path d="M8 12L0 0H16L8 12Z" fill="#4C7FFF"/>
  </svg>
</motion.div>
```

---

## 5. ARCHIVOS A MODIFICAR/CREAR

### 5.1 [MODIFICAR] `src/components/proceso/Proceso.astro`

Reemplazar el contenido interno para usar `TimelineVerticalMotion.jsx`.

Mantener EXACTAMENTE:
- `<section id="proceso" class="py-16 md:py-section-y bg-dab-surface relative overflow-hidden">`
- `Container` con `className="space-y-10 md:space-y-14 relative z-10"`
- `SectionTitle` con `title="Así es trabajar con Dab"` y `subtitle="Cuatro pasos. Cero sorpresas. Sabes exactamente dónde estamos y qué sigue."`
- El CTA final con el punto verde pulsante y el texto "Diagnóstico inicial sin costo. Sin compromiso."

Estructura objetivo:
```astro
---
import Container from '../ui/Container.astro';
import SectionTitle from '../ui/SectionTitle.astro';
import TimelineVerticalMotion from '../../react/TimelineVerticalMotion.jsx';
import { pasos } from '../../data/proceso'; // o mantener local
---

<section id="proceso" class="py-16 md:py-section-y bg-dab-surface relative overflow-hidden">
  <Container className="space-y-10 md:space-y-14 relative z-10">
    <SectionTitle
      title="Así es trabajar con Dab"
      subtitle="Cuatro pasos. Cero sorpresas. Sabes exactamente dónde estamos y qué sigue."
    />

    <TimelineVerticalMotion pasos={pasos} client:visible />

    <!-- CTA final — EXACTAMENTE igual que antes -->
    <div class="text-center pt-4">
      <p class="font-body text-sm text-dab-muted/70 inline-flex items-center gap-2">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        Diagnóstico inicial sin costo. Sin compromiso.
      </p>
    </div>
  </Container>
</section>
```

### 5.2 [NUEVO] `src/react/TimelineVerticalMotion.jsx`

Componente React que renderiza la línea de tiempo vertical completa con todas las animaciones.

**Props:**
```typescript
interface Paso {
  id: number;
  titulo: string;
  linea: string;
  tiempo: string;
}

// Props del componente:
{ pasos: Paso[] }
```

**Estructura del componente:**

```jsx
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function TimelineVerticalMotion({ pasos }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.75", "end 0.25"]
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative py-8 md:py-16">

      {/* Línea base (apagada) — desktop */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-dab-border/30 via-dab-border/50 to-dab-border/30 z-[1]"></div>

      {/* Línea base (apagada) — mobile */}
      <div className="md:hidden absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-dab-border/30 via-dab-border/50 to-dab-border/30 z-[1]"></div>

      {/* Línea de progreso animada — desktop */}
      <motion.div 
        className="hidden md:block absolute left-1/2 top-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-dab-accent via-[#7B61FF] to-dab-accent z-[2] origin-top"
        style={{ scaleY: lineScale }}
      >
        {/* Flecha en la punta */}
        <motion.div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
          animate={{ y: [0, 4, 0], opacity: [1, 0.7, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <path d="M8 12L0 0H16L8 12Z" fill="#4C7FFF"/>
          </svg>
        </motion.div>
      </motion.div>

      {/* Línea de progreso animada — mobile */}
      <motion.div 
        className="md:hidden absolute left-6 top-0 w-[2px] bg-gradient-to-b from-dab-accent via-[#7B61FF] to-dab-accent z-[2] origin-top"
        style={{ scaleY: lineScale }}
      >
        <motion.div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
          animate={{ y: [0, 4, 0], opacity: [1, 0.7, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="14" height="10" viewBox="0 0 16 12" fill="none">
            <path d="M8 12L0 0H16L8 12Z" fill="#4C7FFF"/>
          </svg>
        </motion.div>
      </motion.div>

      {/* Pasos */}
      <div className="relative z-10 space-y-12 md:space-y-24">
        {pasos.map((paso, idx) => {
          const isOdd = idx % 2 === 0; // 0-indexed: 0,2 are odd steps (1,3)

          return (
            <div key={paso.id} className="relative">

              {/* Desktop layout */}
              <div className="hidden md:flex items-center gap-6 lg:gap-10">
                {/* Left side */}
                <motion.div 
                  className="flex-1 flex justify-end"
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                >
                  {isOdd && <Card paso={paso} align="right" />}
                </motion.div>

                {/* Center node */}
                <div className="shrink-0 relative z-10">
                  <Node paso={paso} index={idx} />
                </div>

                {/* Right side */}
                <motion.div 
                  className="flex-1 flex justify-start"
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                >
                  {!isOdd && <Card paso={paso} align="left" />}
                </motion.div>
              </div>

              {/* Mobile layout */}
              <div className="md:hidden flex items-start gap-4">
                <div className="shrink-0 relative z-10 pt-1">
                  <Node paso={paso} index={idx} mobile />
                </div>
                <motion.div 
                  className="flex-1"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                >
                  <Card paso={paso} align="left" mobile />
                </motion.div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}

function Node({ paso, index, mobile = false }) {
  return (
    <motion.div
      className={`relative z-10 rounded-full flex items-center justify-center ${
        mobile ? 'w-10 h-10' : 'w-12 h-12'
      } bg-dab-surface border-2`}
      initial={{ 
        borderColor: "rgba(76, 127, 255, 0.4)",
        backgroundColor: "#0B0D14",
        scale: 1
      }}
      whileInView={{ 
        borderColor: "rgba(76, 127, 255, 1)",
        backgroundColor: "#4C7FFF",
        scale: 1.1,
        boxShadow: "0 0 20px rgba(76, 127, 255, 0.3)"
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.span 
        className={`font-mono font-bold ${mobile ? 'text-xs' : 'text-sm'}`}
        initial={{ color: "#4C7FFF" }}
        whileInView={{ color: "#05060A" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {paso.id}
      </motion.span>
    </motion.div>
  );
}

function Card({ paso, align, mobile = false }) {
  const alignClass = align === 'right' ? 'md:text-right md:items-end' : 'md:text-left md:items-start';

  return (
    <div className={`glass-card rounded-2xl p-5 md:p-6 lg:p-8 max-w-md w-full ${alignClass}`}>
      <div className={`flex items-center gap-2 mb-3 ${align === 'right' ? 'md:justify-end' : ''}`}>
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dab-accent/8 border border-dab-accent/15 text-[11px] font-semibold text-dab-accent uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-dab-accent"></span>
          {paso.tiempo}
        </span>
      </div>

      <h3 className={`font-display text-xl md:text-2xl text-white mb-2 tracking-tight ${align === 'right' ? 'md:text-right' : ''}`}>
        {paso.titulo}
      </h3>

      <p className={`text-sm md:text-base text-dab-muted leading-relaxed ${align === 'right' ? 'md:text-right' : ''}`}>
        {paso.linea}
      </p>

      <div className={`mt-4 pt-4 border-t border-white/5 ${align === 'right' ? 'md:text-right' : ''}`}>
        <span className="text-xs text-dab-muted/60 uppercase tracking-wider">
          Paso {paso.id} de 4
        </span>
      </div>
    </div>
  );
}
```

**Notas importantes:**
- El `glass-card` debe usar las mismas clases que los otros componentes del proyecto: `bg-dab-bg/40 backdrop-blur-sm border border-dab-border/50` (o similar, verificar en el proyecto real).
- Si el proyecto usa una clase `.glass-card` en CSS global, usar esa clase.
- **Altura de la card:** NO usar `h-64`, `h-72`, etc. Dejar que el contenido determine la altura (`h-auto` implícito).
- **Max-width:** `max-w-md` (448px) o `max-w-lg` (512px) para que las cards no sean demasiado anchas en desktop.

### 5.3 [OPCIONAL] Mover data a `src/data/proceso.js`

Si el agente decide mover la data (recomendado pero no obligatorio):

```javascript
export const pasos = [
  { id: 1, titulo: 'Diagnóstico', linea: 'Entendemos tu negocio antes de tocar una tecla.', tiempo: '30 min' },
  { id: 2, titulo: 'Estrategia', linea: 'Priorizamos lo que genera clientes, no lo que luce bonito.', tiempo: '1-2 días' },
  { id: 3, titulo: 'Implementación', linea: 'Construimos, conectamos y probamos antes de entregar.', tiempo: '1-2 semanas' },
  { id: 4, titulo: 'Optimización', linea: 'Ajustamos según datos reales, no suposiciones.', tiempo: 'Continuo' },
];
```

---

## 6. REGLAS ABSOLUTAS

- ❌ **NO tocar** ninguna otra sección de `index.astro` ni de la landing
- ❌ **NO modificar** `astro.config.mjs`, `tailwind.config.cjs`, `tsconfig.json`, `package.json`
- ❌ **NO instalar** nuevas dependencias (Framer Motion ya está instalado)
- ❌ **NO crear** nuevos tokens de color, fuentes o clases CSS globales
- ❌ **NO usar** `font-display` para descripciones (solo para títulos de 1 palabra)
- ❌ **NO eliminar** el componente `Proceso.astro` — modificarlo in-place
- ❌ **NO cambiar** el `id="proceso"` de la sección (puede haber links anclados)
- ❌ **NO usar** altura fija en las cards (`h-64`, `h-72`, etc.) — deben ser responsive al contenido
- ❌ **NO hacer** los nodos/números transparentes — deben tener fondo SÓLIDO para que la flecha pase por debajo
- ✅ **SÍ reutilizar** `Container.astro`, `SectionTitle.astro`
- ✅ **SÍ mantener** el CTA final exactamente igual (texto, clases, estructura)
- ✅ **SÍ usar** Framer Motion para animaciones de scroll (`useScroll`, `useTransform`, `whileInView`)
- ✅ **SÍ respetar** las clases Tailwind exactas documentadas en el reporte
- ✅ **SÍ hidratar** el componente React con `client:visible` (mismo patrón que otros componentes React del proyecto)
- ✅ **SÍ respetar** el responsive: zigzag en desktop, apilado a la derecha en mobile
- ✅ **SÍ usar** `font-mono` para los números de los nodos
- ✅ **SÍ usar** `bg-dab-surface` (#0B0D14) como fondo SÓLIDO de los nodos

---

## 7. CHECKLIST DE VERIFICACIÓN

- [ ] `npm run build` pasa sin errores de TypeScript ni Astro
- [ ] La sección `id="proceso"` sigue existiendo y es navegable por anclas
- [ ] Desktop: línea vertical centrada con flecha animada que avanza al hacer scroll
- [ ] Desktop: nodos con fondo SÓLIDO (#0B0D14) sobre la línea, la flecha pasa por DEBAJO
- [ ] Desktop: cards alternando izquierda y derecha (paso 1 izq, 2 der, 3 izq, 4 der)
- [ ] Desktop: cards tienen altura automática (responsive al contenido), no altura fija
- [ ] Desktop: texto de cards izquierdas alineado a la derecha, derechas a la izquierda
- [ ] Mobile: línea alineada a la izquierda (left: 24px), cards apiladas a la derecha
- [ ] Mobile: nodos sobre la línea, cards a la derecha con gap
- [ ] Nodos se activan (glow: border + bg + shadow + scale) al entrar en viewport
- [ ] Números dentro de nodos cambian de color (accent → bg oscuro) al activarse
- [ ] Cards hacen fadeIn + slide (izq/der según posición) al entrar en viewport
- [ ] Flecha en punta de línea tiene animación de pulso sutil
- [ ] Línea de progreso crece suavemente con el scroll (no a saltos)
- [ ] Cards usan glass-card consistente con el resto del sitio
- [ ] Time badges usan el mismo patrón que otros componentes (bg-dab-accent/8, border-dab-accent/15)
- [ ] Títulos de paso usan `font-display` (1 palabra, OK)
- [ ] Descripciones usan `font-body` + `text-dab-muted` + `leading-relaxed`
- [ ] CTA final está exactamente igual que antes (punto verde pulsante + texto)
- [ ] Container.astro y SectionTitle.astro se usan correctamente
- [ ] No hay layout shift ni flash de contenido al cargar
- [ ] Animaciones no causan lag en mobile (usar transform y opacity únicamente)
- [ ] Ninguna otra sección de la landing se rompió o cambió visualmente

---

## 8. NOTAS DE IMPLEMENTACIÓN

### Performance
- Usar `transform` y `opacity` únicamente para animaciones (GPU-accelerated).
- El `useScroll` de Framer Motion está optimizado para no causar re-renders excesivos.
- Si hay lag en mobile, considerar usar `useInView` por nodo individual en lugar de `useScroll` para la línea progresiva, o reducir la cantidad de `motion.div` anidados.

### Accesibilidad
- Las cards deben ser `<article>` o `<div role="listitem">` dentro de un `<div role="list">`.
- Los nodos deben tener `aria-label="Paso {id}: {titulo}"`.
- Las animaciones deben respetar `prefers-reduced-motion`: si el usuario lo tiene activado, desactivar las animaciones de float/flecha y usar fade simples.

### Hidratación
- El componente React debe hidratarse con `client:visible` para que no cargue JS hasta que la sección entre en viewport.
- Esto es crítico para performance: la sección de Proceso está en la mitad de la página.

### Data
- Si el agente decide NO mover la data a `src/data/proceso.js`, está bien. Pero el componente React `TimelineVerticalMotion.jsx` debe recibir la data como prop.
- Si SÍ la mueve, asegurar que el import en `Proceso.astro` sea correcto (`../../data/proceso` o similar).

### Z-index layering (CRÍTICO)
El orden de z-index debe ser:
1. `z-[1]` — Línea base (apagada)
2. `z-[2]` — Línea de progreso animada (encendida)
3. `z-10` — Nodos/números (SÓLIDOS, por encima de todo)
4. `z-10` — Cards (mismo nivel que nodos, no importa el orden relativo)

Esto garantiza que la flecha pase por DEBAJO de los nodos sin interferir visualmente.

---

## 9. DECISIONES A CRITERIO DEL AGENTE

El agente puede decidir:

1. **Offset de scroll:** Los valores `offset: ["start 0.75", "end 0.25"]` pueden ajustarse ligeramente si la animación se siente muy temprana o muy tardía. Recomendado: empezar cuando el top del contenedor está al 75% del viewport, terminar cuando el bottom está al 25%.
2. **Mover data o no:** ¿Mantener `const pasos` en `Proceso.astro` o mover a `src/data/proceso.js`? Recomendado mover, pero no obligatorio.
3. **Tamaño de nodos:** `w-12 h-12` (48px) en desktop, `w-10 h-10` (40px) en mobile. Puede ajustar ±4px si se ven muy grandes o pequeños.
4. **Max-width de cards:** `max-w-md` (448px) o `max-w-lg` (512px). Puede ajustar según el ancho real de `Container.astro`.
5. **Gap entre pasos:** `gap-6 lg:gap-10` en desktop, `gap-4` en mobile. Puede ajustar si se siente muy apretado o muy espaciado.
6. **Iconos SVG en nodos:** Si el agente quiere incluir iconos SVG dentro de los nodos (además del número), puede hacerlo. Pero el número debe ser siempre visible. Los iconos deben ser pequeños (`w-4 h-4`) y reemplazar al número o ir junto a él.
7. **Animación de flecha:** Puede usar la animación CSS `animate-pulse` de Tailwind o una animación Framer Motion custom. Ambas son válidas.

---

**Empieza leyendo este documento completo, luego lee el `Proceso.astro` actual y los componentes React existentes (`TestimonialsMotion.jsx`, `PortfolioSlider.jsx`) para confirmar patrones de Framer Motion antes de escribir código.**
