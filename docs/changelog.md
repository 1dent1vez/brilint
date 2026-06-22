# Changelog técnico

Registro de correcciones de deuda técnica y mejoras aplicadas al proyecto.
Para cambios de producto/negocio, ver el historial de Git.

---

## 21 de Junio de 2026 — Resolución de hallazgos técnicos post-auditoría

### 🔴 Crítico resuelto
- **ContactForm.jsx restaurado** — El componente [ContactForm.jsx](file:///c:/Users/Identivezz/Documents/BRILINT/brilint/src/react/ContactForm.jsx) fue recuperado del historial de Git tras haber sido puesto en cuarentena por un falso positivo de Windows Defender. Se configuró una exclusión local del directorio en el antivirus para prevenir futuras eliminaciones y asegurar la resolución correcta de la importación desde [ContactSection.astro](file:///c:/Users/Identivezz/Documents/BRILINT/brilint/src/components/form/ContactSection.astro) durante el empaquetado de Vite.

### 🟡 Medio resuelto
- **Número de WhatsApp unificado** — Se creó el módulo de configuración [contact.ts](file:///c:/Users/Identivezz/Documents/BRILINT/brilint/src/config/contact.ts) como única fuente de verdad para los datos de contacto. Se eliminó la inconsistencia entre el número del menú móvil (`+52 729 239 2198`) y el número desktop/flotante (`+52 722 357 9869`), unificando todos los puntos de contacto al número `527223579869` usando la función generadora `WHATSAPP_URL`.

### 🟢 Bajos resueltos
- **Adaptador Vercel actualizado** — Se actualizó la importación del adaptador en [astro.config.mjs](file:///c:/Users/Identivezz/Documents/BRILINT/brilint/astro.config.mjs) migrando de `@astrojs/vercel/static` (obsoleto desde Astro v5) a `@astrojs/vercel` para corregir los warnings de compilación y asegurar soporte de SSG a largo plazo.
- **Canonical y JSON-LD corregidos** — Se reemplazaron todas las referencias hardcodeadas al subdominio temporal `dab.vercel.app` en [DefaultLayout.astro](file:///c:/Users/Identivezz/Documents/BRILINT/brilint/src/layouts/DefaultLayout.astro) por el objeto dinámico `Astro.site`. Al actualizar la propiedad `site` en la configuración de Astro, se actualizan de forma automática e integrada la etiqueta canonical y el esquema enriquecido JSON-LD `LocalBusiness` con la URL de producción definitiva (`https://dab.dev/`).
- **Hidratación optimizada** — Las islas de React de baja prioridad (below-the-fold) en [index.astro](file:///c:/Users/Identivezz/Documents/BRILINT/brilint/src/pages/index.astro) (como `PortfolioSlider`, `TestimonialsMotion` y `ContactForm`) se cambiaron de `client:load` a `client:visible`. Esto pospone la descarga y ejecución del bundle JavaScript de React hasta que el usuario hace scroll hacia cada sección, optimizando significativamente la velocidad de carga inicial de la página.
- **Imágenes migradas a astro:assets** — Se reemplazaron las etiquetas tradicionales `<img>` en [FeaturedProject.astro](file:///c:/Users/Identivezz/Documents/BRILINT/brilint/src/components/portfolio/FeaturedProject.astro) por el componente `<Image />` de `astro:assets`, lo que permite una generación automática de srcsets responsivos, optimización y compresión nativa, y previene la métrica Cumulative Layout Shift (CLS) declarando dimensiones explícitas `width` y `height`.
- **ConstellationBg limpiado** — En [ConstellationBg.jsx](file:///c:/Users/Identivezz/Documents/BRILINT/brilint/src/react/ConstellationBg.jsx), se removió el listener del evento `mousemove` y su respectivo `mouseRef` inactivo, los cuales no alimentaban ningún cambio visible en la animación. Con esto se reduce la carga en el hilo principal del navegador al no procesar eventos de ratón innecesarios.
- **Archivos huérfanos eliminados** — Se eliminaron físicamente los archivos sin referencias y en desuso del repositorio:
  - `src/react/HeroSignature.jsx`
  - `src/react/FadeIn.jsx`
  - `src/data/portafolio.js` (duplicado obsoleto de `portfolio.js`)

---

## Formato de entradas futuras

Usar el siguiente formato para nuevas entradas:
`## [YYYY-MM-DD] — Descripción breve del cambio`
Con subsecciones por severidad: 🔴 Crítico / 🟡 Medio / 🟢 Bajo / ✨ Mejora
