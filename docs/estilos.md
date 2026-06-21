# Sistema de Diseño y Estilos

Este documento describe la arquitectura de estilos, la paleta de colores, los tokens tipográficos y las configuraciones de diseño que dan soporte al aspecto visual premium de **Brilint**.

---

## 🎨 Herramientas de Estilos Utilizadas

El proyecto utiliza una combinación moderna y escalable de estilos utilitarios y CSS puro:

1.  **Tailwind CSS (v3.4.18):** Como el motor principal de clases utilitarias para construir layouts rápidos y consistentes.
2.  **PostCSS (v8.5.6) + Autoprefixer:** Para añadir prefijos de compatibilidad a navegadores más antiguos de forma automática durante la compilación.
3.  **CSS Puro (`src/styles/base.css`):** Para registrar directivas globales de Tailwind (`@tailwind base`), resets mínimos, variables del sistema operativo (`color-scheme`), animaciones personalizadas complejas y clases compuestas.

---

## 🎨 Paleta de Colores (Tokens de Diseño)

Los colores oficiales de Brilint están registrados bajo la clave `extend` de Tailwind en [tailwind.config.cjs](file:///tailwind.config.cjs) y representan un esquema de modo oscuro coherente:

| Nombre de Token | Valor Hex/RGB | Propósito Visual |
| :--- | :--- | :--- |
| `brilint-bg` | `#05060A` | Color de fondo general del documento (Dark/Black). |
| `brilint-surface` | `#0B0D14` | Color de fondo para tarjetas, secciones elevadas y bloques destacados. |
| `brilint-accent` | `#4C7FFF` | Azul brillante utilizado para botones principales, acentos de texto, bordes activos y focos. |
| `brilint-accent-soft` | `#4C7FFF1A` | `#4C7FFF` con opacidad del 10% para efectos sutiles de fondo. |
| `brilint-text` | `#E5E7EB` | Color principal de texto legible para párrafos de alta importancia. |
| `brilint-muted` | `#9CA3AF` | Color de texto secundario con menor contraste para textos informativos y metadatos. |
| `brilint-border` | `#1F2933` | Gris oscuro utilizado para bordes de tarjetas, separadores y botones ghost. |

Además, en el archivo CSS global se fuerza el esquema de color oscuro al navegador:
```css
:root {
  color-scheme: dark;
}
```

---

## ✍️ Tipografía

El sitio web utiliza la tipografía **Inter** de Google Fonts como fuente principal. Se aplican las siguientes familias definidas en la configuración de Tailwind:

*   **Fuentes del Cuerpo (`font-sans`):** `system-ui`, `ui-sans-serif`, `Inter`, `sans-serif` (Fuente sin serifa moderna con fallback del sistema).
*   **Fuentes de Pantalla (`font-display`):** `Inter`, `system-ui`, `sans-serif` (Para títulos de gran tamaño).

### Reglas Tipográficas Globales (`base.css`):
*   Títulos (`h1, h2, h3, h4`): Se aplica `font-display tracking-tight` para conseguir títulos compactos y elegantes.
*   Párrafos (`p`): Se aplica `text-brilint-muted leading-relaxed` para mejorar la legibilidad del texto en pantallas.

---

## 📏 Espaciados y Sistema Responsivo

### Espaciados Personalizados
El archivo de configuración de Tailwind extiende el sistema de espaciado estándar para homogeneizar los márgenes internos y rellenos de secciones:

*   `xs`: `0.25rem` (4px)
*   `sm`: `0.5rem` (8px)
*   `md`: `1rem` (16px)
*   `lg`: `1.5rem` (24px)
*   `xl`: `2rem` (32px)
*   `2xl`: `3rem` (48px)
*   `3xl`: `4rem` (64px)
*   `section-y`: `6rem` (96px) — Relleno superior/inferior estándar para secciones en móvil.
*   `section-y-md`: `8rem` (128px) — Relleno superior/inferior aumentado para secciones en pantallas de escritorio.

### Breakpoints (Diseño Responsivo)
El proyecto utiliza los breakpoints por defecto de Tailwind CSS para crear interfaces adaptables:

*   `sm` (Mobile Large / Tablets): `640px`
*   `md` (Tablets / Laptops): `768px`
*   `lg` (Desktops): `1024px`
*   `xl` (Large Desktops): `1280px`

---

## ✨ Sombras, Bordes y Transiciones

*   **Bordes Redondeados:**
    *   `2xl`: `1rem` (16px) — Usado en la mayoría de tarjetas secundarias y bloques de proceso.
    *   `3xl`: `1.5rem` (24px) — Usado en tarjetas principales del portafolio y precios.
*   **Sombras:**
    *   `brilint-soft`: `0 18px 45px rgba(0,0,0,0.45)` — Sombra difusa oscura que simula elevación tridimensional realista en fondos negros.
*   **Transiciones:**
    *   `fast`: `150ms` (Para efectos hover en botones o enlaces)
    *   `normal`: `250ms` (Para transiciones de menús desplegables)
    *   `slow`: `400ms` (Para carruseles automáticos o animaciones de entrada)

---

## 🎭 Animaciones Personalizadas

El archivo [base.css](file:///src/styles/base.css) registra animaciones personalizadas clave mediante `@keyframes` y clases CSS para dar sensación de dinamismo al sitio:

1.  **`hero-float`:** Efecto de balanceo vertical sutil para la tarjeta flotante de servicios.
2.  **`hero-float-slow`:** Balanceo diagonal lento.
3.  **`hero-shimmer`:** Efecto de destello de luz traslúcido lineal que se desplaza horizontalmente sobre tarjetas.
4.  **`hero-orbit-spin`:** Rotación continua en sentido de las agujas del reloj (para anillos y órbitas visuales del Hero).
5.  **`hero-orbit-spin-rev`:** Rotación en sentido inverso al de las agujas del reloj.
6.  **`hero-node-pulse`:** Pulsación de escala y opacidad para los puntos de la constelación.
7.  **`hero-panel-float`:** Desplazamiento vertical leve para paneles flotantes interactivos.

### Respeto a Preferencias de Accesibilidad
El CSS del sitio incluye directivas de consulta de medios para desactivar las animaciones cuando el usuario tiene activada la opción de reducir movimiento en su sistema operativo:

```css
@media (prefers-reduced-motion: reduce) {
  .hero-floating-card {
    animation: none;
  }
}
```
Asimismo, los componentes React que usan Framer Motion leen el estado `useReducedMotion()` para desactivar sus transiciones físicas automáticamente.
