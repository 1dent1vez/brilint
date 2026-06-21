# Optimización y Rendimiento

Este documento detalla la estrategia de rendimiento de **Brilint**, evaluando la arquitectura de renderizado, la hidratación de islas, la gestión de assets y las recomendaciones para maximizar las métricas Web Vitals.

---

## ⚡ Estrategia de Rendering

El sitio está configurado en modo **SSG (Static Site Generation)**:
*   En `astro.config.mjs` se establece `output: 'static'`.
*   Esto significa que durante el build de producción, Astro genera archivos HTML, CSS y JS estáticos pre-compilados.
*   **Impacto de Rendimiento:** Es la estrategia más rápida para landing pages informativas. Al no requerir procesamiento en servidor por cada petición, el tiempo de carga del primer byte (TTFB) es mínimo y el contenido puede almacenarse en caché y servirse a través de CDNs globales.

---

## 🖼️ Optimización de Imágenes

*   **Estado Actual:** El proyecto utiliza el módulo nativo de optimización de imágenes de Astro (`astro:assets`).
*   **Implementación en Código:** El componente [FeaturedProject.astro](file:///src/components/portfolio/FeaturedProject.astro) utiliza la etiqueta `<Image />` importada de `astro:assets` para procesar y optimizar las imágenes del portafolio.
*   **Detalles de Configuración:**
    | Propiedad | Valor | Efecto |
    | :--- | :--- | :--- |
    | `loading` | `"lazy"` | Carga diferida de imágenes fuera de pantalla. |
    | `decoding` | `"async"` | Decodificación no bloqueante para liberar el hilo principal. |
    | `width/height` | Valores reales | Prevención de Cumulative Layout Shift (CLS) mediante dimensiones proporcionales explicitadas. |
*   **Impacto:** Permite la generación de srcsets automáticos basados en resoluciones móviles y pantallas de alta densidad, previene saltos en el diseño de la página al reservar el aspect-ratio y optimiza la compresión de forma nativa.

---

## 🏝️ Estrategias de Hidratación de Islas

El proyecto utiliza la reactividad de React para cinco islas de interacción:

| Componente React | Ubicación | Directiva de Hidratación | Evaluación de Impacto |
| :--- | :--- | :--- | :--- |
| `ConstellationBg` | Hero Section | `client:load` | **Adecuado:** Se ubica sobre el primer pliegue visual y debe renderizarse inmediatamente para dar soporte visual. |
| `HeroMotion` | Hero Section | `client:load` | **Adecuado:** Gestiona las animaciones de entrada en el FCP (First Contentful Paint) y LCP (Largest Contentful Paint). |
| `PortfolioSlider` | Portafolio (Bajo el pliegue) | `client:visible` | **Optimizado:** Difiere la descarga y ejecución de JavaScript del carrusel hasta que el usuario se desplaza a la sección. |
| `TestimonialsMotion` | Testimonios (Bajo el pliegue) | `client:visible` | **Optimizado:** Difiere la inicialización de temporizadores y micro-animaciones en carrusel hasta que es visible. |
| `ContactForm` | Contacto (Bajo el pliegue) | `client:visible` | **Optimizado:** Evita la carga prematura de dependencias del formulario. |

---

## 🔤 Carga de Fuentes Web

En `DefaultLayout.astro`, las fuentes se cargan de forma optimizada utilizando Google Fonts:
1.  **Preconexión Previa:** Se inyectan directivas `<link rel="preconnect" href="https://fonts.googleapis.com">` y `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` para resolver las conexiones DNS y TLS de forma anticipada.
2.  **Parámetro display=swap:** Se añade `&display=swap` al final de la URL de carga de la fuente **Inter**. Esto instruye al navegador a utilizar fuentes del sistema temporales (Fallback) para pintar el texto de inmediato y sustituirlo por Inter una vez descargado, evitando el molesto texto invisible (FOIT).

---

## 🔌 Scripts de Terceros e Impacto

El proyecto es extremadamente limpio en este apartado:
*   No hay scripts de analíticas pesadas o chats de soporte cargados de forma síncrona en el hilo principal.
*   La interacción externa se realiza de forma asíncrona mediante el API de Web3Forms (`https://api.web3forms.com/submit`) gatillada únicamente bajo demanda cuando el usuario pulsa "Enviar" en el formulario de contacto.

---

## 📈 Registro de Optimizaciones Completadas

Las oportunidades de rendimiento identificadas anteriormente han sido implementadas exitosamente:

1.  **Migración a `astro:assets`:** Implementada en [FeaturedProject.astro](file:///src/components/portfolio/FeaturedProject.astro) utilizando el componente `<Image />`.
2.  **Optimización de Hidratación:** Cambiada de `client:load` a `client:visible` para las islas de testimonios, portafolio y formulario de contacto.
3.  **Remoción de Escucha de Eventos Ociosa:** Completada en [ConstellationBg.jsx](file:///src/react/ConstellationBg.jsx). El listener de `mousemove` fue removido al no estar conectado al loop de animación. La animación de partículas es ahora puramente basada en tiempo, sin procesamiento adicional de eventos del ratón.
