---
name: dab-seo
description: SEO, metadata, structured data, and performance optimization guidelines for the dab agency landing page. Covers Astro SEO, JSON-LD, sitemap, Open Graph, Core Web Vitals, and local SEO for Valle de Toluca.
type: prompt
whenToUse: When the user asks about SEO, metadata, structured data, sitemap, Open Graph tags, performance optimization, Core Web Vitals, or local search optimization for the dab project.
disableModelInvocation: false
arguments:
  - page
  - action
---

# dab — SEO & Performance Optimization

## Configuración Base de Astro

```typescript
// astro.config.mjs
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

export default defineConfig({
  output: "static",
  site: "https://dab.com.mx",
  adapter: vercel(),
  integrations: [
    react(),
    tailwind(),
    sitemap({
      filter: (page) => !page.includes("/gracias"), // Excluir páginas de thank-you
    }),
  ],
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
  },
  compressHTML: true,
  build: {
    inlineStylesheets: "auto",
  },
});
```

## Layout Base con SEO Completo

```tsx
// src/layouts/BaseLayout.astro
---
import { SEO } from "astro-seo";
import { WHATSAPP_NUMBER } from "@/config/contact";

interface Props {
  title: string;
  description: string;
  image?: string;
  canonical?: string;
  noindex?: boolean;
  jsonLd?: object;
}

const {
  title,
  description,
  image = "/og-default.jpg",
  canonical,
  noindex = false,
  jsonLd,
} = Astro.props;

const fullTitle = `${title} | dab — Agencia Digital Valle de Toluca`;
---

<!DOCTYPE html>
<html lang="es-MX">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#0ea5e9" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

    <SEO
      title={fullTitle}
      description={description}
      canonical={canonical}
      noindex={noindex}
      openGraph={{
        basic: {
          title: fullTitle,
          type: "website",
          image: `https://dab.com.mx${image}`,
          url: canonical || "https://dab.com.mx",
        },
        optional: {
          siteName: "dab — Agencia Digital",
          description,
          locale: "es_MX",
        },
        image: {
          alt: title,
          width: 1200,
          height: 630,
        },
      }}
      twitter={{
        card: "summary_large_image",
        site: "@dabdigital",
        creator: "@dabdigital",
        title: fullTitle,
        description,
        image: `https://dab.com.mx${image}`,
        imageAlt: title,
      }}
      extend={{
        meta: [
          { name: "geo.region", content: "MX-MEX" },
          { name: "geo.placename", content: "Valle de Toluca, Estado de México" },
          { name: "geo.position", content: "19.2925;-99.6569" },
          { name: "ICBM", content: "19.2925, -99.6569" },
        ],
      }}
    />

    {jsonLd && (
      <script type="application/ld+json" set:html={JSON.stringify(jsonLd)} />
    )}
  </head>
  <body class="font-sans antialiased text-text-primary bg-surface">
    <slot />
  </body>
</html>
```

## JSON-LD Structured Data

### LocalBusiness (Principal)
```typescript
// src/config/seo.ts
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "dab — Agencia Digital",
  description: "Agencia de diseño web, desarrollo digital y marketing en el Valle de Toluca.",
  url: "https://dab.com.mx",
  telephone: `+${WHATSAPP_NUMBER}`,
  email: "contacto@dab.com.mx",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Metepec",
    addressRegion: "Estado de México",
    addressCountry: "MX",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "19.2925",
    longitude: "-99.6569",
  },
  areaServed: {
    "@type": "Place",
    name: "Valle de Toluca",
    containsPlace: [
      { "@type": "City", name: "Metepec" },
      { "@type": "City", name: "Toluca" },
      { "@type": "City", name: "Lerma" },
      { "@type": "City", name: "San Mateo Atenco" },
    ],
  },
  serviceType: [
    "Diseño Web",
    "Desarrollo Web",
    "E-commerce",
    "Marketing Digital",
    "Branding",
  ],
  priceRange: "$$",
  openingHours: "Mo-Fr 09:00-18:00",
  sameAs: [
    "https://www.facebook.com/dabdigital",
    "https://www.instagram.com/dabdigital",
  ],
};
```

### WebSite Schema
```typescript
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "dab — Agencia Digital",
  url: "https://dab.com.mx",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://dab.com.mx/buscar?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};
```

## Optimización de Imágenes

```astro
---
import { Image } from "astro:assets";
import heroImage from "@/assets/hero.jpg";
---

<Image
  src={heroImage}
  alt="Agencia digital dab en el Valle de Toluca"
  width={1200}
  height={600}
  quality={85}
  format="webp"
  loading="eager"
  priority
/>
```

## Core Web Vitals Checklist

| Métrica | Objetivo | Cómo lograrlo |
|---------|----------|---------------|
| **LCP** < 2.5s | Imagen hero optimizada, preconnect a fuentes, no render-blocking CSS | `loading="eager"` en hero, `rel="preconnect"` a Google Fonts |
| **FID/INP** < 200ms | Minimizar JS, code-split por ruta, lazy load React islands | `client:visible` en componentes interactivos, no `client:load` innecesario |
| **CLS** < 0.1 | Dimensiones explícitas en imágenes, no insertar contenido sobre el fold | `width`/`height` en todas las imágenes, reservar espacio para ads/embeds |
| **TTFB** < 600ms | SSG estático, CDN edge caching, optimizar build | `output: "static"`, Vercel Edge Network |
| **FCP** < 1.8s | Inline critical CSS, preload fonts, minimizar render-blocking | `inlineStylesheets: "auto"` en Astro config |

## Meta Tags Específicos para México

```html
<meta name="geo.region" content="MX-MEX" />
<meta name="geo.placename" content="Valle de Toluca, Estado de México" />
<meta name="geo.position" content="19.2925;-99.6569" />
<meta name="ICBM" content="19.2925, -99.6569" />
<meta name="language" content="es-MX" />
<meta property="og:locale" content="es_MX" />
```

## Keywords Locales (usar naturalmente en contenido)

- "agencia digital valle de toluca"
- "diseño web metepec"
- "paginas web toluca"
- "tienda en linea lerma"
- "marketing digital san mateo atenco"
- "desarrollo web estado de mexico"
- "branding valle de toluca"
- "ecommerce toluca"

## robots.txt

```
User-agent: *
Allow: /
Sitemap: https://dab.com.mx/sitemap-index.xml
```

## Checklist de Página Nueva

- [ ] `<title>` único y descriptivo (máx 60 chars)
- [ ] `meta name="description"` único (máx 155 chars)
- [ ] `canonical` URL correcta
- [ ] Open Graph tags completos
- [ ] Twitter Card tags
- [ ] Imagen OG de 1200x630px
- [ ] JSON-LD relevante (LocalBusiness, WebSite, o Article)
- [ ] Alt text en todas las imágenes
- [ ] Heading hierarchy correcta (h1 → h2 → h3, sin saltos)
- [ ] Internal links a otras páginas del sitio
- [ ] Imágenes optimizadas (WebP, lazy loading excepto hero)
