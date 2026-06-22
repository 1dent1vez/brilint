---
name: dab-dev
description: Master development skill for the dab digital agency landing page. Consolidates design system, animation patterns, component architecture, SEO, vibecoding workflow, Astro 6/7 features, and frontend arsenal recommendations.
type: prompt
whenToUse: When the user is working on the dab project and needs comprehensive context about the stack, patterns, design system, animations, SEO, deployment, or wants to rapidly build and iterate on any frontend feature.
disableModelInvocation: false
arguments:
  - task
  - scope
---

# dab — Master Development Context

## Identidad del Proyecto

**dab** es una agencia digital premium del Valle de Toluca (Metepec, Toluca, Lerma, San Mateo Atenco). El sitio es una landing page estática construida con Astro, diseñada para convertir visitantes en clientes mediante diseño moderno, animaciones fluidas y una experiencia de usuario pulida.

## Stack Tecnológico

| Capa | Tecnología | Versión | Propósito |
|------|-----------|---------|-----------|
| Framework | Astro | 5.16.0 (preparado para 6.x) | SSG estático, islands architecture |
| UI | React | 19 | Componentes interactivos y animaciones |
| Estilos | Tailwind CSS | 3.4.18 | Utility-first CSS |
| PostCSS | 8.5.6 | Procesamiento CSS |
| Animaciones | Framer Motion | 12.23.24 | Micro-interacciones, scroll reveals |
| Integraciones | @astrojs/react | 4.4.2 | Soporte React en Astro |
| | @astrojs/tailwind | 6.0.2 | Integración Tailwind |
| | @astrojs/sitemap | 3.6.0 | Sitemap XML automático |
| Deploy | @astrojs/vercel | 8.0.4 | Static adapter para Vercel |
| Contacto | Web3Forms | — | Formularios sin backend |

## Estructura de Carpetas

```
src/
├── components/
│   ├── ui/              # Atómicos: Button, Card, Input, Badge
│   ├── animations/      # FadeIn, StaggerContainer, TextReveal, Counter
│   └── sections/        # Hero, Services, About, Testimonials, Contact, Footer
├── layouts/             # BaseLayout.astro (SEO completo)
├── pages/               # index.astro, 404.astro
├── styles/              # Tailwind config, globals.css
├── config/
│   └── contact.ts       # Única fuente de verdad
├── assets/              # Imágenes, logos, iconos
├── lib/
│   └── utils.ts         # cn() helper (clsx + tailwind-merge)
└── content/             # Contenido estático
```

## Design System (Tokens)

### Colores
```javascript
colors: {
  brand: {
    50: "#f0f9ff", 100: "#e0f2fe", 200: "#bae6fd",
    300: "#7dd3fc", 400: "#38bdf8", 500: "#0ea5e9",  // Primary
    600: "#0284c7", 700: "#0369a1", 800: "#075985", 900: "#0c4a6e", 950: "#082f49",
  },
  accent: { DEFAULT: "#f59e0b", light: "#fbbf24", dark: "#d97706" },
  surface: { DEFAULT: "#ffffff", muted: "#f8fafc" },
  text: { primary: "#0f172a", secondary: "#475569", muted: "#94a3b8", inverse: "#ffffff" },
}
```

### Tipografía
- Font: Inter (system-ui fallback)
- Display: 4.5rem / 3.5rem / 2.5rem (bold, tight tracking)
- Headings: 2rem / 1.5rem / 1.25rem (semibold)
- Body: 1rem / 1.125rem (line-height 1.6)

### Spacing
- Secciones: `py-20` a `py-32`
- Contenedor: `max-w-7xl px-4 sm:px-6 lg:px-8`
- Gap cards: `gap-6` o `gap-8`
- Radius: `rounded-lg` (8px), `rounded-2xl` (16px), `rounded-full`

## Reglas de Código

1. **TypeScript estricto** — `strict: true`, interfaces explícitas, nunca `any`
2. **Componentes funcionales** — Hooks, no classes. Named exports.
3. **Mobile-first** — `sm: md: lg:` breakpoints. Botones mínimo 44px táctil.
4. **Astro islands** — `client:visible` para componentes interactivos. No `client:load` innecesario.
5. **Tailwind utilitario** — `cn()` para condicionales. No valores arbitrarios.
6. **Contacto centralizado** — Todo desde `src/config/contact.ts`. Nunca hardcodear.
7. **Imágenes optimizadas** — `astro:assets` con WebP/AVIF, dimensiones explícitas.
8. **Zero console.log** en producción. Solo `console.error` para errores críticos.

## Patrones de Animación (Framer Motion)

- **FadeIn:** `initial={{ opacity: 0, y: 40 }}` → `whileInView={{ opacity: 1, y: 0 }}`
- **Stagger:** `staggerChildren: 0.1` en container, `variants` en items
- **Hover:** `whileHover={{ scale: 1.03, y: -4 }}` con spring
- **TextReveal:** Palabras individuales con `staggerChildren: 0.12`
- **Counter:** `useSpring` + `useTransform` con `useInView`
- **Reduced motion:** Siempre usar `useReducedMotion()` como fallback

## Componentes Base

### Button
```tsx
// Variants: primary (brand-500), secondary (accent), outline, ghost
// Sizes: sm (px-4 py-2), md (px-6 py-3), lg (px-8 py-4)
// Props: variant, size, href?, children, className?
// Hover: scale 1.03, tap: 0.98
```

### Card
```tsx
// rounded-2xl bg-white p-6 shadow-md border border-slate-100
// Hover: y:-4, scale:1.01, shadow-xl, border-brand-200
```

### Section
```tsx
// py-20 lg:py-32, max-w-7xl mx-auto, px-4 sm:px-6 lg:px-8
// bg: white | muted | gradient (brand-50 → white)
```

## SEO & Performance

- **Astro SEO:** `astro-seo` component con OG, Twitter Cards, JSON-LD
- **LocalBusiness schema:** Geo coordinates Valle de Toluca, área servida
- **Meta geográficos:** `geo.region: MX-MEX`, `geo.placename: Valle de Toluca`
- **Keywords locales:** "agencia digital valle de toluca", "diseño web metepec", etc.
- **CWV:** LCP < 2.5s (hero eager), CLS < 0.1 (dims explícitas), FID < 200ms (min JS)
- **Images:** WebP/AVIF, `loading="eager"` en hero, lazy resto
- **Sitemap:** `@astrojs/sitemap` automático
- **robots.txt:** Allow all, sitemap-index.xml

## Configuración de Contacto

```typescript
// src/config/contact.ts
export const WHATSAPP_NUMBER = "527223579869";
export const WHATSAPP_URL = (msg?: string) => `https://wa.me/${WHATSAPP_NUMBER}${msg ? `?text=${encodeURIComponent(msg)}` : ""}`;
export const EMAIL = "contacto@dab.com.mx";
export const ADDRESS = "Valle de Toluca, Estado de México";
```

## Astro 6/7 Features (Ready)

- **View Transitions API:** Transiciones nativas entre páginas (`<ViewTransitions />`)
- **Server Islands:** Hidratar componentes solo cuando son visibles (`server:defer`)
- **Content Collections:** Type-safe con Zod schemas
- **Image Optimization:** `astro:assets` con Sharp
- **Astro 6 CSP:** Content Security Policy automática (configurar en `astro.config.mjs`)
- **Astro 7 Alpha:** Rust compiler, Vite 8, dev/prod parity con workerd

## Vibecoding Flow (8 pasos)

1. Prompt claro → 2. Scaffold rápido → 3. Estilos base → 4. Animaciones → 5. Interactividad → 6. Responsive check → 7. Polish → 8. Build & preview

## Frontend Arsenal (Proposals)

Cuando el usuario pide "algo extra" o "más chido", proponer:

| Librería | Uso | Cuándo proponer |
|----------|-----|-----------------|
| **GSAP + ScrollTrigger** | Animaciones complejas de scroll, timelines, pin | Cuando Framer Motion no es suficiente para scroll avanzado |
| **Lenis** | Smooth scroll con inertia | Cuando el scroll nativo se siente "seco" |
| **Three.js / React Three Fiber** | 3D background, hero interactivo | Cuando piden "algo wow", experiencia inmersiva |
| **Lottie** | Animaciones vectoriales complejas (iconos, loaders) | Cuando necesitan animaciones de ilustración específicas |
| **Splitting.js** | Texto que se anima carácter por carácter | Cuando piden efectos tipográficos dramáticos |
| **@studio-freight/lenis** | Smooth scroll moderno | Reemplazo de locomotive-scroll |
| **GSAP Flip** | Animaciones de layout morphing | Reordenamiento animado de grids |
| **Canvas Confetti** | Efectos de celebración | Formulario enviado, conversión exitosa |
| **Tilt.js** | Efecto 3D tilt en cards | Tarjetas de servicios interactivas |
| **particles.js / tsparticles** | Partículas de fondo | Hero sections con ambiente dinámico |

## Comandos Útiles

```bash
npm run dev      # localhost:4321
npm run build    # dist/ estático
npm run preview  # Preview producción local
```

## Variables de Entorno

```env
PUBLIC_WEB3FORMS_KEY=tu-clave-aqui
```

## Checklist de Feature Nueva

- [ ] Props tipadas con interface
- [ ] Responsive (mobile, tablet, desktop)
- [ ] Estados interactivos (hover, focus, active, disabled)
- [ ] Accesible (labels, aria-labels, roles)
- [ ] Animación de entrada (FadeIn/Stagger)
- [ ] No hay console.log ni debug code
- [ ] Imports con `@/` aliases
- [ ] Build pasa sin errores (`npm run build`)
