# Plan: Rediseño Hero — Inspirado en Oaksun Studio

## 📋 Contexto

**Proyecto:** dab (antes brilint) — Agencia digital del Valle de Toluca  
**Stack:** Astro 5.16 + React 19 + Tailwind 3.4 + Framer Motion 12.23  
**Referencia:** https://www.oaksun.studio/ — Estilo elegante, soft, imágenes 3D, serif typography, espaciado amplio, scroll cinematográfico  
**Restricción:** Respetar colores `brilint-*` actuales (dark mode). Mobile first.  
**Objetivo:** Rediseñar el Hero totalmente. Eliminar todo código obsoleto del hero anterior.

**Skills a invocar:**
- `/skill:dab-dev` — Contexto master
- `/skill:dab-animations` — Patrones de Framer Motion
- `/skill:dab-design-system` — Tokens de color y tipografía
- `/skill:dab-astro-showcase` — Referencias de layout
- `/skill:dab-frontend-arsenal` — GSAP si se necesita scroll avanzado

---

## 🎨 Análisis de Oaksun Studio

### Lo que hace especial a Oaksun:

| Elemento | Cómo lo hace Oaksun | Adaptación para dab (dark + brilint colors) |
|----------|---------------------|---------------------------------------------|
| **Hero** | Imagen 3D grande a la derecha, texto serif elegante a la izquierda, tagline arriba | Imagen/ilustración 3D a la derecha, texto serif a la izquierda, tagline "AGENCIA DIGITAL + VALLE DE TOLUCA" |
| **Fondo** | Colores pastel suaves (mint, rosa, azul) | Fondo oscuro profundo `bg-brilint-bg` con gradientes sutiles `brilint-accent/5` |
| **Tipografía** | Serif elegante para headings (tipo Playfair Display o similar), sans para body | Serif para H1/H2 (importar Google Font), `font-body` para body text |
| **Espaciado** | Muy generoso, aire entre elementos, secciones altas | `py-24 md:py-32`, `space-y-16`, max-w-7xl con padding amplio |
| **Imágenes** | Render 3D abstracto, colores suaves, formas orgánicas | Buscar/generar imagen 3D abstracta en tonos azul/cian que combine con `brilint-accent` |
| **Scroll** | Revelados suaves, elementos que entran con elegancia | Framer Motion `whileInView`, `FadeIn`, `StaggerContainer` |
| **CTA** | Sutil, integrado en el texto, no intrusivo | Link elegante con underline animado, no botón grande y gritón |
| **Layout** | Asimétrico, imagen ocupa 50%+ del viewport | Grid asimétrico: texto 45% / imagen 55% en desktop |

### Paleta adaptada (respetando brilint):
```
Fondo:           bg-brilint-bg (#0a0a0f o similar oscuro)
Superficie:      bg-brilint-surface/50 con backdrop-blur
Texto heading:   text-white (serif, elegante)
Texto body:      text-brilint-muted
Acento:          text-brilint-accent (cian/azul) para highlights y links
Bordes:          border-brilint-border/30 (muy sutiles)
Decoración:      gradientes radiales con brilint-accent/5
```

---

## 🏗️ Propuesta de Diseño: "dab — Agencia Digital"

### Hero (100vh, no scroll infinito)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  AGENCIA DIGITAL + VALLE DE TOLUCA                         │
│  ─────────────────────────────────                         │
│                                                             │
│  Impulsamos negocios                                        │
│  del Valle de Toluca                                        │
│  con diseño digital.                                       │
│                                                             │
│  Creamos experiencias web que conectan,                     │
│  convierten y crecen.                                       │
│                                                             │
│  Ver nuestros servicios →                                   │
│                                                             │
│                              [IMAGEN 3D ABSTRACTA]        │
│                              formas orgánicas,              │
│                              tonos azul/cian,              │
│                              glassmorphism suave            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Detalles del Hero:

1. **Tagline arriba:**
   ```
   AGENCIA DIGITAL + VALLE DE TOLUCA
   ```
   - Font: sans-serif, uppercase, tracking-[0.3em], text-xs, text-brilint-muted
   - Separador: una línea fina horizontal debajo

2. **Heading principal:**
   ```
   Impulsamos negocios
   del Valle de Toluca
   con diseño digital.
   ```
   - Font: **serif** (Playfair Display o Cormorant Garamond desde Google Fonts)
   - Tamaño: `clamp(2.5rem, 6vw, 5rem)`
   - Peso: 400 (no bold, elegante)
   - Color: `text-white`
   - Line-height: 1.1 (tight)
   - La palabra "diseño" o "digital" puede estar en `text-brilint-accent` como highlight

3. **Subheading:**
   ```
   Creamos experiencias web que conectan,
   convierten y crecen.
   ```
   - Font: `font-body`
   - Tamaño: `text-lg md:text-xl`
   - Color: `text-brilint-muted`
   - Max-width: `max-w-md`
   - Line-height: 1.6

4. **CTA:**
   ```
   Ver nuestros servicios →
   ```
   - No botón. Un link elegante con underline animado.
   - Color: `text-brilint-accent`
   - Hover: underline se expande de izquierda a derecha
   - Font: `font-body`, `text-sm`, tracking-wide

5. **Imagen derecha:**
   - Imagen 3D abstracta (formas orgánicas, cristal, glass, tonos azul/cian)
   - Puede ser un asset generado o una imagen de stock de alta calidad
   - Con `border-radius: 2rem` (`rounded-3xl`)
   - Sutil sombra o glow: `shadow-[0_0_60px_-15px_rgba(76,127,255,0.15)]`
   - Animación: `FadeIn` desde la derecha con delay

6. **Fondo:**
   - `bg-brilint-bg` (oscuro profundo)
   - Un gradiente radial muy sutil: `bg-[radial-gradient(ellipse_60%_50%_at_70%_30%,rgba(76,127,255,0.06),transparent)]`
   - No partículas. No grid. No scan lines. **Solo oscuridad + tipografía + imagen.**

---

## 📁 Estructura de Archivos (Nuevo Hero)

```
src/
├── components/
│   ├── sections/
│   │   └── Hero.astro              ← REFACTORIZAR (wrapper Astro)
│   ├── hero/
│   │   ├── HeroContent.tsx         ← Componente React con texto + imagen
│   │   └── HeroImage.astro         ← Imagen optimizada con Astro Image
│   └── animations/
│       ├── FadeIn.tsx              ← Reutilizar (ya existe o crear)
│       └── StaggerContainer.tsx    ← Reutilizar
├── layouts/
│   └── BaseLayout.astro            ← Agregar fuente serif (Google Fonts)
├── styles/
│   └── hero.css                    ← Animaciones CSS críticas (underline, reduced motion)
└── assets/
│   └── hero-3d.png                 ← Imagen 3D abstracta (placeholder o real)
```

---

## 🔧 Pasos de Implementación

### Paso 0: Eliminar TODO lo obsoleto del hero anterior

**Archivos a eliminar:**
```powershell
# Si existen y no se usan en otra parte:
Remove-Item -Path "src/components/sections/Hero.astro" -Force          # se reemplaza
Remove-Item -Path "src/react/HeroMotion.jsx" -Force                    # obsoleto
Remove-Item -Path "src/react/ConstellationBg.jsx" -Force                 # obsoleto
Remove-Item -Path "src/utils/splitText.js" -Force                      # obsoleto
# Verificar que no se usen en otros archivos antes de eliminar
```

**Código a eliminar de `src/pages/index.astro`:**
- Importación de `Hero` viejo (se actualizará)
- Cualquier referencia a `HeroMotion`, `ConstellationBg`, `splitText`

**Estilos CSS a eliminar:**
- `.neural-grid`
- `.scan-line`
- `.dashboard-panel`
- `.cursor-blink`
- `.animate-bar`
- `.animate-dash`
- `.metric-card`
- `.perspective-dashboard`
- `.hero-title`
- `.hero-subtitle`
- `.hero-cta`
- Todo el bloque `<style>` del hero anterior

**Script a eliminar:**
- Scramble text
- Typewriter
- Counter observer
- Todo el bloque `<script>` del hero anterior

### Paso 1: Agregar fuente serif al layout

En `src/layouts/BaseLayout.astro` (o donde cargues fuentes):
```astro
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

En `tailwind.config.js`:
```javascript
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  serif: ['Cormorant Garamond', 'Georgia', 'serif'],
  body: ['Inter', 'system-ui', 'sans-serif'],
}
```

### Paso 2: Crear `src/components/hero/HeroContent.tsx`

```tsx
import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "../animations/FadeIn";

interface HeroContentProps {
  whatsappUrl: string;
}

export function HeroContent({ whatsappUrl }: HeroContentProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[90vh] py-20">
      {/* COLUMNA IZQUIERDA: Texto */}
      <div className="space-y-8 lg:space-y-10">
        {/* Tagline */}
        <FadeIn delay={0}>
          <div className="space-y-3">
            <p className="text-xs font-body uppercase tracking-[0.3em] text-brilint-muted">
              Agencia Digital + Valle de Toluca
            </p>
            <div className="h-px w-16 bg-brilint-border/40"></div>
          </div>
        </FadeIn>

        {/* Heading */}
        <FadeIn delay={0.15}>
          <h1 className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-normal text-white leading-[1.1] tracking-tight">
            Impulsamos negocios
            <br />
            del Valle de Toluca
            <br />
            con <span className="text-brilint-accent italic">diseño digital</span>.
          </h1>
        </FadeIn>

        {/* Subheading */}
        <FadeIn delay={0.3}>
          <p className="font-body text-lg md:text-xl text-brilint-muted leading-relaxed max-w-md">
            Creamos experiencias web que conectan, convierten y crecen. 
            Diseñado para negocios locales que quieren destacar.
          </p>
        </FadeIn>

        {/* CTA */}
        <FadeIn delay={0.45}>
          <a
            href="#servicios"
            className="group inline-flex items-center gap-2 text-sm font-body text-brilint-accent tracking-wide"
          >
            <span className="relative">
              Ver nuestros servicios
              <span className="absolute bottom-0 left-0 h-px w-0 bg-brilint-accent transition-all duration-500 group-hover:w-full"></span>
            </span>
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </FadeIn>
      </div>

      {/* COLUMNA DERECHA: Imagen */}
      <FadeIn direction="right" delay={0.3} className="relative">
        <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] max-w-lg mx-auto lg:max-w-none">
          {/* Glow detrás */}
          <div className="absolute -inset-4 bg-gradient-to-br from-brilint-accent/10 to-transparent rounded-[2.5rem] blur-2xl"></div>

          {/* Imagen */}
          <div className="relative rounded-3xl overflow-hidden border border-brilint-border/20 bg-brilint-surface/30 backdrop-blur-sm">
            <img
              src="/images/hero-3d.jpg"
              alt="Diseño digital abstracto para negocios del Valle de Toluca"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
```

### Paso 3: Crear/refactorizar `src/components/sections/Hero.astro`

```astro
---
import Container from '../ui/Container.astro';
import { HeroContent } from '../hero/HeroContent.tsx';
import { WHATSAPP_URL } from '../../config/contact';
---

<section
  id="top"
  class="relative min-h-screen flex items-center bg-brilint-bg overflow-hidden"
  aria-labelledby="hero-title"
>
  {/* Fondo: gradiente radial sutil */}
  <div 
    class="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_30%,rgba(76,127,255,0.06),transparent)]" 
    aria-hidden="true"
  ></div>

  {/* Contenido */}
  <Container className="relative z-10 w-full">
    <HeroContent client:visible whatsappUrl={WHATSAPP_URL()} />
  </Container>
</section>

<style>
  /* Reduced motion: desactivar animaciones */
  @media (prefers-reduced-motion: reduce) {
    /* Las animaciones de Framer Motion se manejan con useReducedMotion() */
  }
</style>
```

### Paso 4: Actualizar `src/pages/index.astro`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/sections/Hero.astro';
// ... otros imports
---

<BaseLayout>
  <Hero />
  <!-- ... resto de secciones -->
</BaseLayout>
```

### Paso 5: Agregar imagen placeholder

Si no tienes una imagen 3D real, usar un placeholder:
```
public/images/hero-3d.jpg
```

Sugerencia: buscar en Unsplash/Pexels imágenes de:
- "abstract 3D render glass blue"
- "3D geometric shapes crystal"
- "abstract digital art blue cyan"

O usar un gradiente generado como fallback:
```tsx
<div className="w-full h-full bg-gradient-to-br from-brilint-accent/20 via-brilint-surface to-brilint-bg rounded-3xl"></div>
```

### Paso 6: Build y verificación

```bash
npm run build
npm run preview
```

Verificar:
- [ ] Build pasa sin errores
- [ ] Tipografía serif carga correctamente
- [ ] Layout responsive: mobile (1 columna), tablet/desktop (2 columnas)
- [ ] Imagen se ve bien y no rompe CLS
- [ ] `client:visible` funciona (React se hidrata al scroll)
- [ ] `prefers-reduced-motion`: no hay animaciones bruscas
- [ ] No queda código del hero anterior (buscar "scramble", "typewriter", "dashboard", "constellation")

---

## 🛡️ Restricciones Inquebrantables

- ❌ **NO** mantener estilo terminal/hacker (scramble, typewriter, grid neural, scan line, dashboard flotante, métricas con contadores, `.exe` en CTA)
- ❌ **NO** usar `client:load` en el hero — usar `client:visible`
- ❌ **NO** animar propiedades de layout (width, height, margin, top)
- ❌ **NO** olvidar `prefers-reduced-motion`
- ❌ **NO** dejar archivos obsoletos (`HeroMotion.jsx`, `ConstellationBg.jsx`, `splitText.js`)
- ❌ **NO** dejar estilos CSS obsoletos del hero anterior
- ❌ **NO** dejar scripts obsoletos del hero anterior
- ✅ **SÍ** usar tipografía serif para el heading (Cormorant Garamond o similar)
- ✅ **SÍ** mantener colores `brilint-*` (dark mode)
- ✅ **SÍ** mobile first: 1 columna en mobile, 2 en desktop
- ✅ **SÍ** espaciado generoso (oaksun tiene mucho aire)
- ✅ **SÍ** CTA como link elegante, no botón gritón
- ✅ **SÍ** eliminar TODO código obsoleto del hero anterior

---

## 🧹 Checklist de Limpieza (Eliminación)

Antes de terminar, verificar que NO quede rastro del hero anterior:

| Archivo/Código | Estado esperado |
|----------------|-----------------|
| `src/react/HeroMotion.jsx` | ❌ Eliminado |
| `src/react/ConstellationBg.jsx` | ❌ Eliminado |
| `src/utils/splitText.js` | ❌ Eliminado |
| `neural-grid` CSS | ❌ Eliminado |
| `scan-line` CSS | ❌ Eliminado |
| `dashboard-panel` CSS | ❌ Eliminado |
| `cursor-blink` CSS | ❌ Eliminado |
| `animate-bar` CSS | ❌ Eliminado |
| `animate-dash` CSS | ❌ Eliminado |
| Script scramble | ❌ Eliminado |
| Script typewriter | ❌ Eliminado |
| Script counter | ❌ Eliminado |
| `.metric-card` CSS | ❌ Eliminado |
| `.hero-title` CSS | ❌ Eliminado |
| `.hero-subtitle` CSS | ❌ Eliminado |
| `.hero-cta` CSS | ❌ Eliminado |
| `.perspective-dashboard` CSS | ❌ Eliminado |
| `data-scramble` atributos | ❌ Eliminados |
| `data-target` atributos | ❌ Eliminados |

---

## 📐 Mockup Visual (Mobile First)

### Mobile (< 640px):
```
┌─────────────────────────────┐
│                             │
│  AGENCIA DIGITAL +          │
│  VALLE DE TOLUCA            │
│  ───────────────            │
│                             │
│  Impulsamos                 │
│  negocios del               │
│  Valle de Toluca            │
│  con diseño digital.        │
│                             │
│  Creamos experiencias       │
│  web que conectan...        │
│                             │
│  Ver nuestros servicios →   │
│                             │
│  ┌─────────────────────┐    │
│  │                     │    │
│  │   [IMAGEN 3D]       │    │
│  │                     │    │
│  └─────────────────────┘    │
│                             │
└─────────────────────────────┘
```

### Desktop (> 1024px):
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  AGENCIA DIGITAL + VALLE DE TOLUCA                         │
│  ─────────────────────────────────                         │
│                                                             │
│  Impulsamos negocios          ┌─────────────────────┐     │
│  del Valle de Toluca          │                     │     │
│  con diseño digital.          │   [IMAGEN 3D        │     │
│                               │    ABSTRACTA]        │     │
│  Creamos experiencias         │                     │     │
│  web que conectan...          └─────────────────────┘     │
│                                                             │
│  Ver nuestros servicios →                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📝 Notas para el Agente (Kimi Code)

1. **Leer este archivo completo** antes de empezar.
2. **Invocar skills** según necesidad:
   - `/skill:dab-dev` para contexto del stack
   - `/skill:dab-animations` para `FadeIn`, `StaggerContainer`
   - `/skill:dab-design-system` para tokens de color
3. **Empezar por la limpieza:** Eliminar archivos y código obsoleto ANTES de crear lo nuevo.
4. **Mobile first:** Probar en 375px antes de pulir desktop.
5. **La imagen:** Si no hay imagen 3D real, usar un gradiente generado como placeholder y dejar un comentario para reemplazar después.
6. **Tipografía serif:** Cargar desde Google Fonts en el layout base. No instalar paquetes npm de fuentes.
7. **Commit:** `feat(hero): redesign inspired by oaksun studio — elegant serif, clean layout, remove obsolete code`
