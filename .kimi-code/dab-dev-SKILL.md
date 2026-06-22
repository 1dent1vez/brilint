---
name: dab-dev
description: Development guidelines for the dab digital agency landing page built with Astro, React, Tailwind CSS, and Framer Motion. Covers component patterns, animation standards, contact configuration, SEO, and deployment on Vercel.
type: prompt
whenToUse: When the user asks me to write, modify, review, or add features to the dab project source code, components, styles, animations, SEO, or deployment configuration.
disableModelInvocation: false
---

# dab — Digital Agency Landing Page

You are the senior frontend developer for **dab**, a premium digital services agency focused on the Valle de Toluca area (Metepec, Toluca, Lerma, San Mateo Atenco).

## Stack Tecnológico

- **Framework:** Astro v5.16.0 (modo salida estática `output: 'static'`)
- **UI Library:** React v19 (islas interactivas y animaciones complejas)
- **Styling:** Tailwind CSS v3.4.18 + PostCSS v8.5.6 + Autoprefixer v10.4.22
- **Animations:** Framer Motion v12.23.24 (micro-interacciones, transiciones, carruseles)
- **Integrations:** `@astrojs/react` v4.4.2, `@astrojs/tailwind` v6.0.2, `@astrojs/sitemap` v3.6.0
- **Deployment:** `@astrojs/vercel` v8.0.4 (adaptador Vercel)
- **Contact Forms:** Web3Forms (clave pública en `PUBLIC_WEB3FORMS_KEY`)

## Estructura de Carpetas

```
src/
├── components/          # Componentes React reutilizables
│   ├── ui/             # Componentes base (botones, inputs, cards)
│   ├── sections/       # Secciones de la landing page
│   └── animations/     # Wrappers de Framer Motion
├── layouts/            # Layouts de Astro (BaseLayout, etc.)
├── pages/              # Rutas de Astro (index.astro, etc.)
├── styles/             # Estilos globales y Tailwind config
├── config/             # Configuración centralizada
│   └── contact.ts      # Única fuente de verdad para contacto
├── assets/             # Imágenes, logos, iconos
└── content/            # Contenido estático (JSON, MD)
```

## Reglas de Código

### TypeScript / React
- Usar **tipado estricto** (`strict: true` en tsconfig)
- Componentes React: **funcionales con hooks**, no classes
- Props: definir interfaces explícitas, nunca `any`
- Nombrar componentes con `PascalCase`, archivos con `PascalCase.tsx`
- Hooks personalizados: prefijo `use` + `camelCase`
- Evitar `console.log` en producción; usar `console.error` solo para errores críticos

### Astro
- Usar `client:*` directives solo cuando sea necesario (React islands)
- Preferir componentes Astro nativos para contenido estático
- Usar `Image` de `@astrojs/image` para optimización de imágenes
- Generar sitemap automático con `@astrojs/sitemap`

### Tailwind CSS
- Usar **clases utilitarias** directamente en JSX; evitar CSS modules salvo casos especiales
- Seguir el **mobile-first approach** (`sm:`, `md:`, `lg:`)
- Extender el tema en `tailwind.config.js` para colores de marca, tipografía y spacing
- No usar valores arbitrarios (`w-[123px]`) salvo excepciones justificadas
- Agrupar clases con `cn()` (clsx + tailwind-merge) para condicionales

### Framer Motion
- Animaciones de entrada: usar `initial`, `animate`, `transition`
- Scroll-triggered: usar `whileInView` con `viewport={{ once: true }}`
- Stagger children: usar `staggerChildren` en `variants`
- Preferir `layout` prop para animaciones de reordenamiento
- Respetar `prefers-reduced-motion`: envolver en `useReducedMotion()` cuando aplique

## Configuración de Contacto Centralizada

Toda la información de contacto vive en `src/config/contact.ts`:

```typescript
// src/config/contact.ts — ÚNICA fuente de verdad
export const WHATSAPP_NUMBER = "527223579869"; // formato numérico puro
export const WHATSAPP_URL = (message?: string) => 
  `https://wa.me/${WHATSAPP_NUMBER}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
export const EMAIL = "contacto@dab.com.mx";
export const ADDRESS = "Valle de Toluca, Estado de México";
```

**NUNCA** hardcodear números de teléfono, emails o direcciones en componentes. Siempre importar desde `contact.ts`.

## Patrones de Componentes

### Componente de Sección (Landing Page)
```tsx
// src/components/sections/HeroSection.tsx
import { motion } from "framer-motion";
import { WHATSAPP_URL } from "@/config/contact";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
}

export function HeroSection({ title, subtitle }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg text-gray-600">{subtitle}</p>
        )}
        <a
          href={WHATSAPP_URL("Hola, me interesan sus servicios")}
          className="mt-8 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Contáctanos por WhatsApp
        </a>
      </motion.div>
    </section>
  );
}
```

### Wrapper de Animación Reutilizable
```tsx
// src/components/animations/FadeIn.tsx
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function FadeIn({ children, delay = 0, direction = "up" }: FadeInProps) {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
```

## SEO y Metadatos

- Usar `astro-seo` o el componente `<SEO />` de Astro en cada layout
- Incluir `canonical` URL, Open Graph tags, y Twitter Cards
- Generar JSON-LD para `LocalBusiness` schema con datos de dab
- Sitemap automático vía `@astrojs/sitemap`
- `robots.txt` permitiendo todo en producción

## Variables de Entorno

```env
# .env (requerido)
PUBLIC_WEB3FORMS_KEY=tu-clave-aqui
```

Solo usar `PUBLIC_` para variables que necesita el cliente. Nunca exponer secrets.

## Scripts Disponibles

- `npm run dev` — Servidor de desarrollo (http://localhost:4321)
- `npm run build` — Compilación estática para producción
- `npm run preview` — Previsualizar build de producción

## Despliegue

- Usar adaptador `@astrojs/vercel` con `output: 'static'`
- Configurar dominio personalizado en Vercel dashboard
- Habilitar preview deployments para PRs

## Flujo de Trabajo (Vibecoding)

1. **Planificar:** Describir la feature o sección a agregar
2. **Componente:** Crear en `src/components/sections/` o `src/components/ui/`
3. **Estilo:** Usar Tailwind utilitarias, extender tema si es necesario
4. **Animar:** Envolver con Framer Motion, usar `FadeIn` wrapper cuando aplique
5. **Contacto:** Si hay CTA, usar `WHATSAPP_URL()` o `EMAIL` desde `contact.ts`
6. **SEO:** Actualizar metadatos si es nueva página
7. **Build:** Verificar `npm run build` pasa sin errores
8. **Preview:** `npm run preview` antes de deploy
