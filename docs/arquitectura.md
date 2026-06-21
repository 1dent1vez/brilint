# Arquitectura del Proyecto

Este documento detalla la arquitectura general de **Brilint**, describiendo la estructura de directorios, patrones de diseño, decisiones arquitectónicas claves y la gestión de rutas y dependencias.

---

## 📂 Estructura de Directorios

El proyecto sigue la convención estándar de un proyecto Astro combinado con componentes dinámicos de React:

```text
brilint/
├── .astro/                 # Archivos temporales y tipos generados automáticamente por Astro
├── docs/                   # Documentación técnica del proyecto (esta carpeta)
├── public/                 # Recursos estáticos servidos directamente
│   ├── portafolio/         # Imágenes de proyectos del portafolio (WebP)
│   ├── favicon.svg         # Favicon de la aplicación
│   ├── logo.svg            # Logotipo principal de la marca (SVG de gran tamaño)
│   └── robots.txt          # Configuración de rastreo para motores de búsqueda
├── src/                    # Código fuente del proyecto
│   ├── components/         # Componentes reutilizables y secciones escritas en Astro (.astro)
│   │   ├── cta/            # Llamada a la acción final (CTA.astro)
│   │   ├── faq/            # Preguntas frecuentes (FAQ.astro)
│   │   ├── footer/         # Pie de página (Footer.astro)
│   │   ├── form/           # Sección de contacto (ContactSection.astro)
│   │   ├── hero/           # Sección principal de bienvenida (Hero.astro)
│   │   ├── nav/            # Barra de navegación superior (Nav.astro)
│   │   ├── paquetes/       # Sección de precios y planes (Paquetes.astro)
│   │   ├── portfolio/      # Sección de proyectos e items (Portfolio.astro, FeaturedProject.astro)
│   │   ├── proceso/        # Línea de tiempo de trabajo (Proceso.astro)
│   │   ├── services/       # Tarjetas de servicios principales (Services.astro)
│   │   ├── testimonios/    # Contenedor de testimonios de clientes (Testimonios.astro)
│   │   └── ui/             # Componentes base de UI (Button, Container, SectionTitle)
│   ├── data/               # Archivos JavaScript que centralizan datos (servicios, paquetes, FAQs, etc.)
│   ├── layouts/            # Plantillas de diseño de página global (DefaultLayout.astro)
│   ├── pages/              # Páginas del proyecto que definen las rutas físicas (index.astro)
│   ├── react/              # Componentes de React para interactividad e islas (Framer Motion, Canvas)
│   ├── styles/             # Hojas de estilo globales (base.css)
│   └── utils/              # Funciones auxiliares o utilidades comunes (actualmente vacío)
├── astro.config.mjs        # Configuración principal de Astro e integraciones
├── package.json            # Dependencias, metadatos y scripts del proyecto
├── postcss.config.js       # Configuración para el procesamiento de CSS
├── tailwind.config.cjs     # Configuración y tokens de diseño de Tailwind CSS
├── tsconfig.json           # Configuración de tipado para TypeScript en Astro
└── vercel.json             # Configuración de cabeceras de caché y URLs para Vercel
```

### Responsabilidad de Directorios Clave

*   **`src/pages/`:** Define el enrutamiento basado en archivos. Al ser una landing page, solo contiene `index.astro` el cual representa la página única de inicio.
*   **`src/components/`:** Agrupa componentes visuales modulares construidos como archivos `.astro` puros. Estos se renderizan en el servidor durante la build y no inyectan JavaScript al cliente a menos que llamen a una isla.
*   **`src/react/`:** Contiene las islas de interactividad dinámicas escritas en React. Se hidratan en el cliente para dar soporte a animaciones fluidas con Framer Motion o interacciones complejas en Canvas.
*   **`src/data/`:** Centraliza el contenido textual dinámico en archivos `.js`. Esto desacopla el diseño de los componentes del texto en sí, permitiendo actualizaciones rápidas del contenido sin alterar la estructura HTML.
*   **`public/`:** Almacena imágenes, metadatos y configuraciones estáticas que no pasan por la pipeline de optimización de Vite y son servidas de manera cruda.

---

## 🧩 Patrón Arquitectónico: Arquitectura de Islas

El proyecto utiliza la **Arquitectura de Islas (Islands Architecture)** provista de forma nativa por Astro. La estructura general se compone de:

1.  **Cáscara Estática Principal:** La estructura HTML básica, la navegación estática (con dropdown interactivo resuelto mediante CSS puro con la etiqueta `<details>`), y las secciones de información son generadas en tiempo de compilación (SSG). Esto garantiza que el primer renderizado en el navegador sea inmediato y extremadamente liviano.
2.  **Islas de Interactividad Clave:** Los componentes de React se incrustan en las páginas estáticas usando directivas de hidratación (`client:load`) únicamente donde la interactividad es indispensable:
    *   `ConstellationBg`: Generación interactiva de partículas flotantes sobre un elemento `<canvas>`.
    *   `HeroMotion`: Animaciones y transiciones coordinadas de entrada en la cabecera.
    *   `PortfolioSlider` y `TestimonialsMotion`: Carruseles interactivos controlados por estado de React que responden a gestos, temporizadores y clics.
    *   `ContactForm`: Lógica de envío de datos del formulario hacia el servicio API externo.

---

## 🏛️ Decisiones de Diseño Importantes

*   **Astro como Framework:** Elegido debido al enfoque de la página (Landing Page informativa). Astro elimina por completo el JavaScript innecesario del navegador al compilar páginas HTML estáticas, lo que maximiza el rendimiento móvil y el SEO en comparación con SPAs tradicionales (React puro, Next.js).
*   **Modo de Salida Estático (SSG):** Configurado mediante `output: 'static'` en `astro.config.mjs`. Esto significa que todas las páginas se generan como archivos HTML puros durante el build, lo que reduce costos de servidor y permite servir la web mediante redes CDN globales de alta velocidad.
*   **Adaptador de Vercel Static:** Utiliza `@astrojs/vercel/static` en el build. Al ser un sitio puramente estático, no requiere un servidor Node en ejecución continua, pero el adaptador integra de forma óptima el despliegue con la infraestructura CDN de Vercel.

---

## 🗺️ Mapa de Rutas

Al ser una Landing Page, la aplicación cuenta con una única ruta raíz:

| Ruta Física | URL Resultante | Tipo de Rendering | Lógica / Contenido |
| :--- | :--- | :--- | :--- |
| `src/pages/index.astro` | `/` (`https://brilint.dev`) | **SSG** (Static Site Generation) | Página principal compuesta por las secciones de presentación, servicios, paquetes, portafolio, proceso de trabajo, testimonios de clientes, preguntas frecuentes, contacto y pie de página. |

---

## 📦 Dependencias Externas

El archivo `package.json` define las siguientes dependencias de terceros:

1.  **`astro` (v5.16.0):** El core del framework para enrutamiento, compilación y renderizado de componentes estáticos.
2.  **`react` & `react-dom` (v19):** Entorno de UI interactivo utilizado para instanciar las islas dinámicas dentro del sitio.
3.  **`@astrojs/react` (v4.4.2):** Integración oficial de Astro que permite el procesamiento y empaquetado de componentes React.
4.  **`@astrojs/tailwind` (v6.0.2):** Habilita la integración de Tailwind CSS con soporte para compilar hojas de estilo en Astro.
5.  **`@astrojs/sitemap` (v3.6.0):** Generador de sitemap para rastreo SEO del sitio.
6.  **`framer-motion` (v12.23.24):** Biblioteca de animaciones de alto rendimiento para componentes React. Utilizada para gestionar transiciones y carruseles fluidos.
7.  **`tailwindcss` (v3.4.18) & `autoprefixer` (v10.4.22) & `postcss` (v8.5.6):** Motor de estilos utilitarios y herramientas de postprocesado para generar CSS optimizado para múltiples navegadores.

---

## ⚠️ Hallazgos Arquitectónicos y Deuda Técnica Detectada

Durante el análisis del proyecto se identificaron los siguientes puntos que requieren atención:

*   **Bloqueo de Seguridad en local (Crítico):** El archivo `src/react/ContactForm.jsx` está siendo bloqueado por Windows Defender (`os error 225` o "operación no completada porque el archivo contiene un virus o software potencialmente no deseado"). Esto interrumpe la lectura del archivo mediante el sistema de archivos estándar y provoca que el comando `npm run build` falle. (Se pudo acceder a su contenido utilizando el historial de Git: `git show HEAD:src/react/ContactForm.jsx`).
*   **Inconsistencia en número de WhatsApp (Media):** Hay una discrepancia crítica de números telefónicos en las llamadas a la acción:
    *   En la cabecera móvil (`Nav.astro` línea 74), el enlace redirige al número: `+52 729 239 2198`.
    *   En la versión de escritorio de la cabecera (`Nav.astro` línea 40), el botón flotante general (`DefaultLayout.astro` línea 69) y el resto de las secciones apuntan al número: `+52 722 357 9869`.
*   **Archivos Huérfanos / Código Muerto (Baja):**
    *   `src/react/HeroSignature.jsx`: Un componente interactivo con animaciones de órbitas y nodos que responde al cursor de mouse no está importado ni utilizado en `Hero.astro` ni en ninguna otra sección.
    *   `src/react/FadeIn.jsx`: Componente React que implementa animaciones al hacer scroll mediante `IntersectionObserver` que está en desuso.
    *   `src/data/portafolio.js`: Archivo con datos redundantes de portafolio que no se está importando (el archivo real utilizado es `portfolio.js`).
*   **Imports Deprecados (Baja):** En `astro.config.mjs`, se importa `@astrojs/vercel/static` (línea 5), lo cual está deprecado en la CLI de Astro 5. Se debe importar el módulo genérico `@astrojs/vercel` y configurar el adaptador adecuadamente.
*   **Canvas sin optimizar (Baja):** En `ConstellationBg.jsx`, se implementa un listener para seguir las coordenadas de movimiento del mouse a través del evento `mousemove`, pero las variables registradas (`mouseRef.current`) no se emplean para interactuar con las partículas, generando procesamiento de eventos estéril en hilos de render principal.
