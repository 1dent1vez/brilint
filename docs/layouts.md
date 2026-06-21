# Layouts y Estructura de Páginas

El proyecto utiliza una plantilla global para estructurar el marcado HTML común, inyectar hojas de estilo, configurar los metadatos SEO y cargar tipografías del lado del cliente.

---

## 📐 Layouts Disponibles

### `DefaultLayout.astro`
*   **Ubicación:** `src/layouts/DefaultLayout.astro`
*   **Propósito:** Es la plantilla maestra de la aplicación. Envuelve la estructura HTML5 principal, inyecta las variables globales y estilos base, e integra metadatos Open Graph, fuentes y microdatos estructurados (JSON-LD).
*   **Cuándo Usar:** Debe envolver a todas las páginas creadas en el directorio `src/pages/` (actualmente envuelve a `index.astro`).

---

## 🔩 Props y Slots

### Props Aceptadas por `DefaultLayout.astro`

| Prop | Tipo | Requerido | Valor por Defecto | Descripción |
| :--- | :--- | :--- | :--- | :--- |
| `title` | `string` | No | `'Brilint — Servicios digitales premium'` | El título de la página que aparece en la pestaña del navegador y es indexado por motores de búsqueda. |
| `description` | `string` | No | `'Consultora de servicios digitales para PyMEs, profesionales y hogares del Valle de Toluca.'` | La descripción corta (meta-description) del contenido de la página para fragmentos de búsqueda. |

### Slots Disponibles

| Nombre | Descripción |
| :--- | :--- |
| `default` | Todo el contenido de la página que se inyectará dentro de la etiqueta `<body>` (ej. `<main>`, cabeceras, pies de página). |

---

## 🗂️ Jerarquía de Layouts

*   **No aplica — Solo existe un layout principal** (`DefaultLayout.astro`), por lo que no hay jerarquía ni anidamiento en el proyecto actualmente. Todas las páginas consumen este layout de forma directa.

---

## 🔍 Gestión de Head, Metadatos y SEO

`DefaultLayout.astro` se encarga de inyectar las siguientes configuraciones en la sección `<head>` de la página:

1.  **Metadatos de Pantalla y Comportamiento:**
    *   `<meta charset="UTF-8" />` para soporte UTF-8.
    *   `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />` para asegurar un renderizado móvil adaptado y consistente (evitando recortes en pantallas con muescas/notches).
    *   `<meta name="color-scheme" content="dark only" />` para forzar al navegador a renderizar en modo oscuro consistente.
2.  **SEO Básico y Canonical Links:**
    *   Etiqueta `<title>` y `<meta name="description">` dinámicas basadas en props.
    *   `<link rel="canonical" href="https://brilint.vercel.app/" />` para evitar duplicidad de contenido.
    *   ⚠️ **Deuda Técnica:** El canonical apunta a la URL temporal `https://brilint.vercel.app/` en lugar de usar el dominio de producción configurado en `astro.config.mjs` (`https://brilint.dev`).
3.  **Protocolo Open Graph (OG):**
    *   Configura títulos, descripciones y tipos (`website`) para previsualizaciones ricas en redes sociales (Facebook, LinkedIn, Slack).
    *   Establece la imagen por defecto en `/og-image.webp` (ubicada en la carpeta pública).
4.  **Carga de Tipografías Web:**
    *   Usa enlaces de preconexión (`preconnect`) a `fonts.googleapis.com` y `fonts.gstatic.com` para reducir tiempos de descarga de fuentes.
    *   Carga la fuente **Inter** con grosores de `300` a `700` y añade el parámetro `&display=swap` para optimizar el rendimiento de pintado del texto (FCP).
5.  **Datos Estructurados (JSON-LD Schema):**
    *   Inyecta dinámicamente un esquema tipo `LocalBusiness` en un bloque `<script type="application/ld+json">`. Esto ayuda a motores de búsqueda como Google a entender la actividad del negocio, nombre, teléfono, zonas de cobertura (Toluca, Metepec, Lerma, etc.) e imagen.

---

## 📝 Ejemplo de Implementación

A continuación se muestra cómo se aplica `DefaultLayout.astro` dentro de una página Astro:

```astro
---
// src/pages/my-page.astro
import DefaultLayout from '../layouts/DefaultLayout.astro';
import Nav from '../components/nav/Nav.astro';
import Footer from '../components/footer/Footer.astro';
---

<DefaultLayout
  title="Mi Página — Servicios Digitales"
  description="Esta es la descripción personalizada para los buscadores."
>
  <!-- Este bloque de contenido se inyecta en el slot default del layout -->
  <Nav />
  
  <main class="bg-brilint-bg">
    <section class="py-20 text-center">
      <h1>¡Hola Mundo!</h1>
      <p>Bienvenido a la landing page premium.</p>
    </section>
  </main>
  
  <Footer />
</DefaultLayout>
```
