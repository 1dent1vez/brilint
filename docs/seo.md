# Estrategia SEO y Metadatos

Este documento detalla la implementación SEO de **Brilint**, evaluando la indexación, las meta etiquetas de redes sociales, el sitemap, el archivo de configuración de rastreadores y las micro-estructuras de datos para optimizar el posicionamiento local y orgánico.

---

## 🔍 Meta Tags Implementados por Página

Actualmente, al ser una landing page de página única, la gestión de metadatos está concentrada en el archivo base [DefaultLayout.astro](file:///src/layouts/DefaultLayout.astro). Las siguientes etiquetas HTML estándar se inyectan en la cabecera:

*   **Título (`<title>`):** Configurable de manera dinámica. Por defecto toma el valor de `'Brilint — Servicios digitales premium'`. Para la página de inicio, se sobreescribe como `'Brilint — Web, Redes y Soporte TI'` en `index.astro`.
*   **Descripción (`<meta name="description">`):** Breve sinopsis del sitio. Por defecto toma un texto enfocado en el Valle de Toluca. En la landing de inicio, se configura como `'Brilint ayuda a PyMEs, profesionales y hogares a tener presencia digital, campañas y sistemas tecnológicos confiables...'`.
*   **Etiqueta Canonical (`<link rel="canonical">`):** Inyectada de manera dinámica en el layout apuntando al dominio configurado a través del objeto `Astro.site`:
    ```astro
    <link rel="canonical" href={Astro.site} />
    ```
    *   **Resolución:** Se utiliza `Astro.site` de forma dinámica, el cual resuelve a `https://brilint.dev/` (según la propiedad `site` definida en [astro.config.mjs](file:///c:/Users/Identivezz/Documents/BRILINT/brilint/astro.config.mjs)). Al cambiar el dominio en `astro.config.mjs`, se actualiza automáticamente el canonical en producción.

---

## 📱 Open Graph y Twitter Cards

Para optimizar cómo se muestra el enlace al ser compartido en plataformas sociales (Slack, WhatsApp, Facebook, LinkedIn), se implementa el protocolo **Open Graph**:

*   `og:title`: Mismo valor dinámico que la etiqueta `<title>`.
*   `og:description`: Mismo valor dinámico que la meta descripción.
*   `og:image`: Apunta a un recurso estático en `/og-image.webp` (Imagen representativa para redes).
*   `og:type`: Configurado en `'website'`.

### 🚫 Twitter Cards
*   **Estado Actual:** No aplica — **No se han implementado** etiquetas específicas para Twitter/X (como `twitter:card`, `twitter:title`, `twitter:description` o `twitter:image`). Al compartirse en esta red, se utilizarán los metadatos Open Graph de respaldo por defecto del navegador.

---

## 🗺️ Sitemap XML

El proyecto integra la generación automatizada de sitemaps:
*   **Herramienta:** `@astrojs/sitemap` configurada en `astro.config.mjs` (línea 4 e inyectada en la línea 16).
*   **Configuración en Build:** Genera un índice de mapas del sitio `sitemap-index.xml` y los sitemaps de páginas estáticas asociados en el directorio de salida `dist/`.
*   **Dominio Base:** Utiliza la clave `site: 'https://brilint.dev'` definida en la configuración de Astro para construir las URLs absolutas en el mapa.

---

## 🤖 Robots.txt

Existe un archivo de directivas para rastreadores en [public/robots.txt](file:///public/robots.txt):
```text
User-agent: *
Allow: /

Sitemap: https://brilint.dev/sitemap-index.xml
```
*   **Propósito:** Permite el rastreo completo del sitio para cualquier motor de búsqueda (`User-agent: *`) y declara explícitamente la ubicación absoluta del archivo sitemap index para agilizar la indexación de nuevas páginas.

---

## 🏢 Datos Estructurados (JSON-LD)

Para mejorar el SEO local en Google Search y Google Maps, `DefaultLayout.astro` inyecta un esquema semántico JSON-LD de tipo **`LocalBusiness`** de manera dinámica usando `Astro.site`:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Brilint",
  "image": "new URL('og-image.webp', Astro.site).href",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Metepec",
    "addressRegion": "Estado de México"
  },
  "url": "Astro.site.href",
  "telephone": "+52 1 7223579869",
  "servesLocation": ["Metepec", "Toluca", "Lerma", "San Mateo Atenco"],
  "description": "pageDescription"
}
```
*(Nota: El código real serializa este objeto usando `JSON.stringify` en el layout para inyectarlo dinámicamente).*

*   **Impacto:** Permite que el negocio aparezca en búsquedas de intención local (ej. "diseño web en Metepec" o "soporte técnico en Toluca") y ayuda a consolidar el gráfico de conocimiento de la empresa.
*   **Resolución:** Se corrigieron las claves `url` e `image` usando las propiedades dinámicas de `Astro.site`, garantizando que en el build de producción resuelvan al dominio oficial `https://brilint.dev/` sin intervención manual ni valores hardcodeados obsoletos.

---

## 📈 Recomendaciones SEO Pendientes

1.  **Agregar Metadatos de Twitter Cards (Prioridad Media):**
    Completar el `<head>` del layout para optimizar previsualizaciones en X:
    ```astro
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={pageDescription} />
    <meta name="twitter:image" content="/og-image.webp" />
    ```
2.  **Completar Descripciones Alt semánticas en Imágenes (Prioridad Media):**
    Revisar las descripciones en [FeaturedProject.astro](file:///c:/Users/Identivezz/Documents/BRILINT/brilint/src/components/portfolio/FeaturedProject.astro) para que contengan palabras clave en lugar de textos genéricos (ej. usar `alt="Diseño de landing page interactiva para Glam Studio"` en lugar de `alt="Mockup de Glam Studio"`).

---

## 🛠️ Herramientas de validación SEO

Para comprobar el correcto funcionamiento de los metadatos y esquemas enriquecidos inyectados, se recomiendan las siguientes utilidades oficiales:

| Herramienta | URL | Qué valida |
| :--- | :--- | :--- |
| **Schema Markup Validator** | [validator.schema.org](https://validator.schema.org/) | Validación estructural del JSON-LD `LocalBusiness` |
| **Google Rich Results Test** | [search.google.com/test/rich-results](https://search.google.com/test/rich-results) | Vista de datos estructurados y elegibilidad en Google Search |
| **Google Search Console** | [search.google.com/search-console](https://search.google.com/search-console) | Indexación y reconocimiento de la URL canonical oficial |
