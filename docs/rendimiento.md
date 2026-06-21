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

*   **Estado Actual:** El proyecto **no** utiliza el módulo nativo de optimización de imágenes de Astro (`astro:assets`).
*   **Implementación en Código:** Los componentes [FeaturedProject.astro](file:///src/components/portfolio/FeaturedProject.astro) y [PortfolioSlider.jsx](file:///src/react/PortfolioSlider.jsx) utilizan etiquetas estándar de HTML `<img>` con el atributo `loading="lazy"` cargando directamente imágenes en formato `.webp` de la carpeta pública.
*   **Impacto:** Aunque se utiliza formato moderno WebP y carga diferida (lazy), la falta de optimización automática impide generar múltiples tamaños (srcset), comprimir la calidad al vuelo o prevenir desplazamientos de diseño (CLS) al no tener dimensiones explícitas auto-calculadas.

---

## 🏝️ Estrategias de Hidratación de Islas

El proyecto utiliza la reactividad de React para cinco islas de interacción en `index.astro`:

| Componente React | Ubicación | Directiva de Hidratación | Evaluación de Impacto |
| :--- | :--- | :--- | :--- |
| `ConstellationBg` | Hero Section | `client:load` | **Adecuado:** Se ubica sobre el primer pliegue visual y debe renderizarse inmediatamente para dar soporte visual. |
| `HeroMotion` | Hero Section | `client:load` | **Adecuado:** Gestiona las animaciones de entrada en el FCP (First Contentful Paint) y LCP (Largest Contentful Paint). |
| `PortfolioSlider` | Portafolio (Bajo el pliegue) | `client:load` | ⚠️ **Subóptimo:** Está muy abajo en la página. Carga e hidrata código de carrusel innecesariamente durante la carga inicial del sitio. |
| `TestimonialsMotion` | Testimonios (Bajo el pliegue) | `client:load` | ⚠️ **Subóptimo:** Inicia temporizadores (`setTimeout`) y carga animaciones de Framer Motion en el primer renderizado, consumiendo CPU inicial. |
| `ContactForm` | Contacto (Bajo el pliegue) | `client:load` | ⚠️ **Subóptimo:** El usuario no interactuará con el formulario hasta hacer scroll hasta el final del sitio. |

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

## 📈 Recomendaciones de Mejora y Oportunidades

Se proponen las siguientes mejoras para llevar el rendimiento y calidad del proyecto a niveles sobresalientes:

### 1. Migrar a `astro:assets` (Prioridad Alta)
Sustituir las etiquetas HTML `<img>` por el componente `<Image />` o `<Picture />` nativo de Astro en [FeaturedProject.astro](file:///src/components/portfolio/FeaturedProject.astro):
```astro
---
import { Image } from 'astro:assets';
---
<!-- Ejemplo de reemplazo -->
<Image
  src={proyecto.mockup || proyecto.imagen}
  alt={`Mockup de ${proyecto.titulo}`}
  width={600}
  height={400}
  class="w-full object-top"
  loading="lazy"
/>
```
*   *Beneficio:* Optimización automática de dimensiones, compresión inteligente de imágenes y prevención de Cumulative Layout Shift (CLS).

### 2. Optimizar Directivas de Hidratación (Prioridad Media)
Cambiar el tipo de hidratación en [index.astro](file:///src/pages/index.astro) de `client:load` a `client:visible` en las islas que se encuentran debajo del pliegue inicial de pantalla:
```astro
<!-- En src/pages/index.astro -->
<PortfolioSlider proyectos={sliderItems} client:visible />
<TestimonialsMotion testimonios={testimonios} client:visible />
<ContactForm client:visible />
```
*   *Beneficio:* Reduce el peso del JS inicial descargado en el render primario, mejorando los tiempos de bloqueo de CPU (TBT) y aumentando la velocidad móvil real.

### 3. Remover Escucha de Eventos Ociosa (Prioridad Baja)
En `src/react/ConstellationBg.jsx`, eliminar el código de escucha de movimiento del ratón que no realiza ninguna tarea real:
```diff
- const handleMouseMove = (e) => {
-   mouseRef.current = { x: e.clientX, y: e.clientY };
- };
- window.addEventListener('mousemove', handleMouseMove);
```
*   *Beneficio:* Evita el consumo innecesario de recursos en el hilo de renderización de eventos del navegador.
