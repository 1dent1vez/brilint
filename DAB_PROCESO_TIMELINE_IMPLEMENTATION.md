# DAB — Implementación: Línea de Tiempo Viva (Proceso)

> **Versión:** 1.0  
> **Fecha:** 2026-06-24  
> **Basado en:** Auditoría de Proceso (reporte entregado)  
> **Regla de oro:** Este documento es la fuente de verdad. Si algo no está claro, leer el código existente antes de asumir. Nunca inventar clases, colores o tokens nuevos.

---

## 1. OBJETIVO

Transformar la sección de **Proceso** (`src/components/proceso/Proceso.astro`) en una **"Línea de Tiempo Viva"**: una línea de tiempo donde los pasos se van **activando progresivamente conforme el usuario hace scroll**, con animaciones fluidas, iconos SVG, números con glow y conectores animados.

**Reutilizar** el componente `Proceso.astro` existente como contenedor semántico, pero delegar el renderizado interactivo a un **nuevo componente React** (`TimelineMotion.jsx`) usando Framer Motion.

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

### Clases exactas del componente actual (REPLICAR o MEJORAR, no reemplazar por otras)

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

**Mobile card (base):**
```
group relative rounded-2xl border border-dab-border/60 bg-dab-bg/50 backdrop-blur-sm p-5 transition-all duration-300 hover:border-dab-accent/30
```

**Mobile connector vertical:**
```
absolute left-7 top-full h-4 w-px bg-dab-border/40
```

**Mobile number circle:**
```
flex-shrink-0 w-10 h-10 rounded-full bg-dab-accent/10 border border-dab-accent/20 flex items-center justify-center
```
+ texto: `font-mono text-sm font-bold text-dab-accent`

**Mobile time badge:**
```
text-[10px] font-mono text-dab-muted/60 bg-dab-border/30 px-1.5 py-0.5 rounded
```

**Desktop grid:**
```
grid grid-cols-4 gap-6 relative
```

**Desktop node (círculo sobre la línea):**
```
absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-dab-surface border-2 border-dab-accent/40 flex items-center justify-center z-10 group-hover:border-dab-accent group-hover:scale-110 transition-all duration-300
```
+ texto: `font-mono text-[10px] font-bold text-dab-accent`

**Desktop card:**
```
mt-8 rounded-2xl border border-dab-border/50 bg-dab-bg/40 backdrop-blur-sm p-5 text-center transition-all duration-300 hover:bg-dab-bg/70 hover:border-dab-accent/30 hover:-translate-y-1
```

**Desktop horizontal line (decorativa):**
```
hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dab-accent/20 to-transparent
```

**Desktop arrow connector:**
```
absolute -right-3 top-1/2 -translate-y-1/2 text-dab-accent/20 group-hover:text-dab-accent/50 transition-colors
```

**CTA final:**
```
text-center pt-4
<p class="font-body text-sm text-dab-muted/70 inline-flex items-center gap-2">
  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
  Diagnóstico inicial sin costo. Sin compromiso.
</p>
```

---

## 3. DECISIONES DE DISEÑO (YA TOMADAS — NO DEBATIR)

### Layout
- **Desktop:** 4 columnas horizontales con línea conectora animada ARRIBA de las cards, números circulares sobre la línea.
- **Mobile:** Timeline vertical con línea conectora a la IZQUIERDA de las cards, números circulares sobre la línea.

### Animaciones de scroll (obligatorias)
1. **Línea conectora:** Se "llena" progresivamente conforme el usuario scrollea. En desktop, la línea horizontal cambia de `via-dab-accent/20` (apagada) a `via-dab-accent` (encendida) progresivamente. En mobile, la línea vertical se ilumina de arriba hacia abajo.
2. **Números/nodos:** Conforme cada paso entra en viewport, su nodo circular cambia de `border-dab-accent/40` a `border-dab-accent` + `bg-dab-accent/20` + `scale-110` + `shadow-[0_0_20px_rgba(76,127,255,0.3)]` (glow).
3. **Cards:** Cada card hace `fadeUp` + `scale(0.98→1)` + `opacity(0→1)` cuando entra en viewport. Stagger entre cards: 0.1s, 0.2s, 0.3s, 0.4s.
4. **Iconos SVG:** Animación sutil de "float" (translateY 0→-6px→0) en loop de 3s, iniciando cuando el paso se activa.
5. **Conector entre pasos:** En desktop, una flecha SVG entre cada card que se ilumina cuando el paso anterior está activo.

### Iconos SVG (nuevos — no existían en el componente anterior)
Cada paso tiene un icono SVG inline (NO emoji, NO imagen) para mantener consistencia con el estilo técnico del sitio:

1. **Diagnóstico:** Lupa con cruz (search/analyze)
2. **Estrategia:** Gráfica de línea con flecha (trending up)
3. **Implementación:** Capas/stack (layers/build)
4. **Optimización:** Gráfica de línea ascendente (chart/growth)

Los iconos usan `stroke="#4C7FFF"` y `stroke-width="2"`. Se renderizan dentro de un contenedor:
```
w-14 h-14 rounded-2xl bg-dab-accent/10 border border-dab-accent/20 flex items-center justify-center
```

### Números
- Usar `font-mono` (JetBrains Mono) para los números, NO font-display.
- En desktop: números dentro del nodo circular sobre la línea (igual que ahora, pero con glow al activarse).
- En mobile: números dentro del círculo a la izquierda de la card (igual que ahora, pero con glow al activarse).

### Títulos
- `font-display` para el título del paso ("Diagnóstico", "Estrategia", etc.) — son 1 palabra, OK en display.
- `font-body` para la descripción (la `linea`).

---

## 4. ARCHIVOS A MODIFICAR/CREAR

### 4.1 [MODIFICAR] `src/components/proceso/Proceso.astro`

Reemplazar el contenido interno para usar `TimelineMotion.jsx` en lugar del markup estático actual. Mantener:
- El `<section id="proceso">` con sus clases exactas
- El `Container` con sus clases exactas
- El `SectionTitle` con sus props exactas
- El CTA final con sus clases exactas
- Mover la data a `src/data/proceso.js` (opcional pero recomendado)

Estructura objetivo:
```astro
---
import Container from '../ui/Container.astro';
import SectionTitle from '../ui/SectionTitle.astro';
import TimelineMotion from '../../react/TimelineMotion.jsx';
import { pasos } from '../../data/proceso'; // o mantener local si prefieres
---

<section id="proceso" class="py-16 md:py-section-y bg-dab-surface relative overflow-hidden">
  <Container className="space-y-10 md:space-y-14 relative z-10">
    <SectionTitle
      title="Así es trabajar con Dab"
      subtitle="Cuatro pasos. Cero sorpresas. Sabes exactamente dónde estamos y qué sigue."
    />

    <TimelineMotion pasos={pasos} client:visible />

    <!-- CTA final — mantener exactamente igual -->
    <div class="text-center pt-4">
      <p class="font-body text-sm text-dab-muted/70 inline-flex items-center gap-2">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        Diagnóstico inicial sin costo. Sin compromiso.
      </p>
    </div>
  </Container>
</section>
```

### 4.2 [NUEVO] `src/data/proceso.js` (OPCIONAL pero recomendado)

Si el agente decide mover la data (recomendado para desacoplar):
```javascript
export const pasos = [
  {
    id: 1,
    titulo: 'Diagnóstico',
    linea: 'Entendemos tu negocio antes de tocar una tecla.',
    tiempo: '30 min',
    icono: 'diagnostico', // string para mapear al SVG correspondiente
  },
  {
    id: 2,
    titulo: 'Estrategia',
    linea: 'Priorizamos lo que genera clientes, no lo que luce bonito.',
    tiempo: '1-2 días',
    icono: 'estrategia',
  },
  {
    id: 3,
    titulo: 'Implementación',
    linea: 'Construimos, conectamos y probamos antes de entregar.',
    tiempo: '1-2 semanas',
    icono: 'implementacion',
  },
  {
    id: 4,
    titulo: 'Optimización',
    linea: 'Ajustamos según datos reales, no suposiciones.',
    tiempo: 'Continuo',
    icono: 'optimizacion',
  },
];
```

Si NO se mueve la data, mantener el `const pasos` en `Proceso.astro` y pasarlo como prop.

### 4.3 [NUEVO] `src/react/TimelineMotion.jsx`

Componente React que renderiza la línea de tiempo con animaciones de scroll.

**Especificaciones técnicas:**

#### Props
```typescript
interface Paso {
  id: number;
  titulo: string;
  linea: string;
  tiempo: string;
  icono?: string; // opcional, mapea a SVG
}

// Props del componente:
{ pasos: Paso[] }
```

#### Iconos SVG (inline, dentro del componente)
Mapeo de strings a SVGs:

```jsx
const iconos = {
  diagnostico: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4C7FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
      <path d="M11 8v6" />
      <path d="M8 11h6" />
    </svg>
  ),
  estrategia: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4C7FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12h5l2-7 4 14 2-7h5" />
    </svg>
  ),
  implementacion: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4C7FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  optimizacion: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4C7FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  ),
};
```

#### Animaciones con Framer Motion

**A. Línea conectora progresiva (scroll-driven)**

Usar `useScroll` + `useTransform` para animar la línea:

```jsx
// En el contenedor padre:
const containerRef = useRef(null);
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start 0.8", "end 0.2"] // inicia cuando el top del contenedor está al 80% del viewport, termina cuando el bottom está al 20%
});

// Para desktop (línea horizontal):
const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

// Para mobile (línea vertical):
const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
```

La línea conectora debe ser un `motion.div` cuyo `scaleX` (desktop) o `scaleY` (mobile) se vincule a `scrollYProgress`.

**B. Activación por paso (viewport entry)**

Cada paso (card + nodo) usa `whileInView` para activarse:

```jsx
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
>
```

**C. Nodo activo (glow)**

Cuando el paso está en viewport, el nodo circular debe animar a:
- `border-color: rgba(76, 127, 255, 1)` (de `rgba(76, 127, 255, 0.4)`)
- `background-color: rgba(76, 127, 255, 0.2)` (de `bg-dab-surface`)
- `box-shadow: 0 0 20px rgba(76, 127, 255, 0.3)`
- `scale: 1.1`

Usar `whileInView` o `animate` condicional basado en `useInView`.

**D. Icono float**

Cuando el paso está activo, el icono SVG debe tener animación de float:
```jsx
animate={{ y: [0, -6, 0] }}
transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: idx * 0.5 }}
```

**E. Card hover (mantener existente)**

Mantener los hover effects CSS actuales:
- Desktop: `hover:bg-dab-bg/70 hover:border-dab-accent/30 hover:-translate-y-1`
- Mobile: `hover:border-dab-accent/30`

Estos pueden ser clases Tailwind puras (no necesitan Framer Motion).

#### Estructura del markup (desktop)

```jsx
// Contenedor principal (ref para scroll)
<div ref={containerRef} className="hidden md:block">
  {/* Línea conectora animada (fondo) */}
  <div className="absolute top-[some-px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-dab-border/40 to-transparent">
    <motion.div 
      className="h-full bg-gradient-to-r from-transparent via-dab-accent to-transparent"
      style={{ scaleX: lineWidth, transformOrigin: "left" }}
    />
  </div>

  {/* Grid de 4 columnas */}
  <div className="grid grid-cols-4 gap-6 relative pt-8">
    {pasos.map((paso, idx) => (
      <div key={paso.id} className="group relative">
        {/* Nodo circular */}
        <motion.div 
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-dab-surface border-2 flex items-center justify-center z-10"
          initial={{ borderColor: "rgba(76, 127, 255, 0.4)" }}
          whileInView={{ 
            borderColor: "rgba(76, 127, 255, 1)",
            backgroundColor: "rgba(76, 127, 255, 0.2)",
            scale: 1.1,
            boxShadow: "0 0 20px rgba(76, 127, 255, 0.3)"
          }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, delay: idx * 0.15 }}
        >
          <span className="font-mono text-[10px] font-bold text-dab-accent">{paso.id}</span>
        </motion.div>

        {/* Card */}
        <motion.div
          className="mt-8 rounded-2xl border border-dab-border/50 bg-dab-bg/40 backdrop-blur-sm p-5 text-center transition-all duration-300 hover:bg-dab-bg/70 hover:border-dab-accent/30 hover:-translate-y-1"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
        >
          {/* Icono */}
          <motion.div 
            className="w-14 h-14 rounded-2xl bg-dab-accent/10 border border-dab-accent/20 flex items-center justify-center mx-auto mb-4"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: idx * 0.5 }}
          >
            {iconos[paso.icono] || iconos.diagnostico}
          </motion.div>

          {/* Time badge */}
          <span className="inline-block text-[10px] font-mono text-dab-muted/60 bg-dab-border/30 px-2 py-0.5 rounded-full mb-3">
            {paso.tiempo}
          </span>

          {/* Título */}
          <h3 className="font-display text-lg text-white mb-2 tracking-tight">{paso.titulo}</h3>

          {/* Descripción */}
          <p className="font-body text-sm text-dab-muted leading-relaxed">{paso.linea}</p>
        </motion.div>

        {/* Flecha conectora (excepto último) */}
        {idx < pasos.length - 1 && (
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 text-dab-accent/20 group-hover:text-dab-accent/50 transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>
    ))}
  </div>
</div>
```

#### Estructura del markup (mobile)

```jsx
<div className="md:hidden space-y-4" ref={mobileRef}>
  {/* Línea vertical animada */}
  <div className="absolute left-[27px] top-12 bottom-12 w-[2px] bg-gradient-to-b from-dab-border/40 to-transparent">
    <motion.div 
      className="w-full bg-gradient-to-b from-dab-accent to-dab-accent/50"
      style={{ scaleY: lineHeightMobile, transformOrigin: "top" }}
    />
  </div>

  {pasos.map((paso, idx) => (
    <motion.div
      key={paso.id}
      className="group relative flex gap-5"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
    >
      {/* Nodo circular */}
      <motion.div 
        className="relative z-10 shrink-0 w-10 h-10 rounded-full bg-dab-surface border-2 flex items-center justify-center"
        initial={{ borderColor: "rgba(76, 127, 255, 0.4)" }}
        whileInView={{ 
          borderColor: "rgba(76, 127, 255, 1)",
          backgroundColor: "rgba(76, 127, 255, 0.2)",
          scale: 1.1,
          boxShadow: "0 0 20px rgba(76, 127, 255, 0.3)"
        }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: idx * 0.15 }}
      >
        <span className="font-mono text-sm font-bold text-dab-accent">0{paso.id}</span>
      </motion.div>

      {/* Card */}
      <div className="flex-1 group relative rounded-2xl border border-dab-border/60 bg-dab-bg/50 backdrop-blur-sm p-5 transition-all duration-300 hover:border-dab-accent/30">
        {/* Conector vertical (excepto último) */}
        {idx < pasos.length - 1 && (
          <div className="absolute left-[-23px] top-full h-4 w-px bg-dab-border/40" />
        )}

        <div className="flex items-center gap-3 mb-3">
          <motion.div 
            className="w-10 h-10 rounded-xl bg-dab-accent/10 border border-dab-accent/20 flex items-center justify-center"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: idx * 0.5 }}
          >
            {React.cloneElement(iconos[paso.icono] || iconos.diagnostico, { width: 20, height: 20 })}
          </motion.div>
          <div>
            <h3 className="font-display text-lg text-white tracking-tight">{paso.titulo}</h3>
            <span className="text-[10px] font-mono text-dab-muted/60 bg-dab-border/30 px-1.5 py-0.5 rounded">{paso.tiempo}</span>
          </div>
        </div>
        <p className="font-body text-sm text-dab-muted leading-relaxed">{paso.linea}</p>
      </div>
    </motion.div>
  ))}
</div>
```

**Nota sobre refs:** El agente puede usar un solo `ref` para el contenedor y calcular el progreso de scroll de ese contenedor, o usar `useInView` por paso individual. La decisión de técnica exacta queda a criterio del agente, siempre que el resultado sea:
- La línea se ilumina progresivamente con el scroll
- Cada paso se activa (glow + fadeIn) cuando entra en viewport
- No hay flash de contenido ni layout shift

---

## 5. REGLAS ABSOLUTAS

- ❌ **NO tocar** ninguna otra sección de `index.astro` ni de la landing
- ❌ **NO modificar** `astro.config.mjs`, `tailwind.config.cjs`, `tsconfig.json`, `package.json`
- ❌ **NO instalar** nuevas dependencias (Framer Motion ya está instalado)
- ❌ **NO crear** nuevos tokens de color, fuentes o clases CSS globales
- ❌ **NO usar** `font-display` para descripciones (solo para títulos de 1 palabra)
- ❌ **NO eliminar** el componente `Proceso.astro` antiguo — modificarlo in-place
- ❌ **NO cambiar** el `id="proceso"` de la sección (puede haber links anclados)
- ✅ **SÍ reutilizar** `Container.astro`, `SectionTitle.astro`
- ✅ **SÍ mantener** el CTA final exactamente igual (texto, clases, estructura)
- ✅ **SÍ usar** Framer Motion para animaciones de scroll
- ✅ **SÍ respetar** las clases Tailwind exactas documentadas en el reporte
- ✅ **SÍ hidratar** el componente React con `client:visible` (mismo patrón que otros componentes React del proyecto)
- ✅ **SÍ mantener** el responsive: mobile vertical, desktop horizontal

---

## 6. CHECKLIST DE VERIFICACIÓN

- [ ] `npm run build` pasa sin errores de TypeScript ni Astro
- [ ] La sección `id="proceso"` sigue existiendo y es navegable por anclas
- [ ] Desktop: 4 columnas horizontales con línea conectora arriba
- [ ] Desktop: la línea conectora se ilumina progresivamente al hacer scroll
- [ ] Desktop: los nodos circulares hacen glow (border + bg + shadow + scale) al activarse
- [ ] Desktop: las cards hacen fadeUp staggered al entrar en viewport
- [ ] Desktop: hover en cards mantiene `hover:bg-dab-bg/70 hover:border-dab-accent/30 hover:-translate-y-1`
- [ ] Mobile: timeline vertical con línea a la izquierda
- [ ] Mobile: la línea vertical se ilumina progresivamente al hacer scroll
- [ ] Mobile: los nodos circulares hacen glow al activarse
- [ ] Mobile: las cards hacen fadeIn staggered al entrar en viewport
- [ ] Mobile: conector vertical entre cards (excepto último) visible
- [ ] Iconos SVG flotan sutilmente (animación de translateY) cuando el paso está activo
- [ ] Los números usan `font-mono` (NO font-display)
- [ ] Los títulos de paso usan `font-display` (1 palabra, OK)
- [ ] Las descripciones usan `font-body` + `text-dab-muted`
- [ ] Los time badges usan `font-mono` + `bg-dab-border/30` + `text-dab-muted/60`
- [ ] El CTA final está exactamente igual que antes
- [ ] Container.astro y SectionTitle.astro se usan correctamente
- [ ] No hay layout shift ni flash de contenido al cargar
- [ ] Las animaciones no causan lag en mobile (usar transform y opacity únicamente)
- [ ] Ninguna otra sección de la landing se rompió o cambió visualmente

---

## 7. NOTAS DE IMPLEMENTACIÓN

### Performance
- Usar `transform` y `opacity` únicamente para animaciones (GPU-accelerated).
- Evitar animar `width`, `height`, `margin`, `padding`.
- El `useScroll` de Framer Motion está optimizado para no causar re-renders excesivos.
- Si el agente detecta que `useScroll` causa lag en mobile, puede cambiar a `useInView` por paso individual + estado local para la línea progresiva.

### Accesibilidad
- Las cards deben ser `<article>` o `<div role="listitem">` dentro de un `<div role="list">`.
- Los números de paso deben tener `aria-label="Paso {id}: {titulo}"`.
- Las animaciones deben respetar `prefers-reduced-motion`: si el usuario lo tiene activado, desactivar las animaciones de float y usar fade simples.

### Hidratación
- El componente React debe hidratarse con `client:visible` para que no cargue JS hasta que la sección entre en viewport.
- Esto es crítico para performance: la sección de Proceso está en la mitad de la página, no necesita hidratarse inmediatamente.

### Data
- Si el agente decide NO mover la data a `src/data/proceso.js`, está bien. Pero el componente React `TimelineMotion.jsx` debe recibir la data como prop.
- Si SÍ la mueve, asegurar que el import en `Proceso.astro` sea correcto (`../../data/proceso` o similar).

### Iconos
- Los iconos son SVG inline dentro del componente React. No son imágenes, no son emojis, no son componentes importados.
- Esto mantiene el bundle limpio y los colores consistentes.
- Si el agente prefiere crear un objeto de iconos separado o un helper, está bien, pero mantenerlo dentro del mismo archivo o en un archivo auxiliar en `src/react/`.

---

## 8. DECISIONES A CRITERIO DEL AGENTE

El agente puede decidir:

1. **Técnica de scroll animation:** ¿`useScroll` + `useTransform` para la línea progresiva, o `useInView` por paso + estado local? Ambas son válidas si el resultado es una línea que se ilumina progresivamente.
2. **Mover data o no:** ¿Mantener `const pasos` en `Proceso.astro` o mover a `src/data/proceso.js`? Recomendado mover, pero no obligatorio.
3. **Variantes de Framer Motion:** ¿Usar `variants` con `staggerChildren` o animaciones inline por elemento? Ambas válidas.
4. **Color de glow del nodo:** El reporte sugiere `box-shadow: 0 0 20px rgba(76, 127, 255, 0.3)`. El agente puede ajustar la intensidad si se ve muy fuerte o muy sutil, pero mantener el color `#4C7FFF` (dab-accent).
5. **Timing de stagger:** El reporte sugiere 0.1s, 0.15s, 0.5s de delay. El agente puede ajustar ligeramente para que se sienta orgánico.
6. **Altura de la línea en desktop:** El nodo está en `-top-3` y la card en `mt-8`. La línea debe pasar exactamente por el centro del nodo. El agente debe calcular la posición correcta (`top-[algún px]`) basado en la altura real del nodo.

---

**Empieza leyendo este documento completo, luego lee el `Proceso.astro` actual y los componentes React existentes (`TestimonialsMotion.jsx`, `PortfolioSlider.jsx`) para confirmar patrones de Framer Motion antes de escribir código.**
