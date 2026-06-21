# Catálogo de Componentes

Este catálogo documenta de forma detallada todos los componentes del proyecto, divididos en componentes base de UI, secciones de la landing page, islas interactivas de React y componentes sin usar.

---

## 🛠️ Componentes Base de UI (Astro)

### 1. `Button.astro`
*   **Ubicación:** `src/components/ui/Button.astro`
*   **Propósito:** Componente de botón general que renderiza una etiqueta `<a>` si tiene `href`, o una etiqueta `<button>` en caso contrario, aplicando estilos consistentes de Tailwind.
*   **Props Aceptadas:**
    *   `href` (`string | null`, Opcional, por defecto: `null`): Enlace de redirección.
    *   `variant` (`'primary' | 'ghost'`, Opcional, por defecto: `'primary'`): Estilo visual del botón.
    *   `class` (`string`, Opcional, por defecto: `''`): Clases CSS de Tailwind adicionales.
*   **Slots:**
    *   `default`: Texto o elementos HTML internos del botón.
*   **Ejemplo de Uso:**
    ```astro
    ---
    import Button from '../ui/Button.astro';
    ---
    <Button href="https://wa.me/..." variant="primary" class="my-custom-class">
      Hablar por WhatsApp
    </Button>
    ```

### 2. `Container.astro`
*   **Ubicación:** `src/components/ui/Container.astro`
*   **Propósito:** Contenedor base responsivo que centra y restringe el ancho máximo del contenido con márgenes consistentes.
*   **Props Aceptadas:**
    *   `as` (`string`, Opcional, por defecto: `'div'`): La etiqueta HTML del elemento envolvente (ej. `'div'`, `'section'`, `'header'`, `'footer'`).
    *   `className` (`string`, Opcional, por defecto: `''`): Clases de Tailwind adicionales.
*   **Slots:**
    *   `default`: Contenido interno a renderizar dentro del contenedor.
*   **Ejemplo de Uso:**
    ```astro
    ---
    import Container from '../ui/Container.astro';
    ---
    <Container as="section" className="py-16">
      <p>Contenido centrado y limitado en ancho.</p>
    </Container>
    ```

### 3. `SectionTitle.astro`
*   **Ubicación:** `src/components/ui/SectionTitle.astro`
*   **Propósito:** Título y subtítulo centrado que encabeza cada una de las secciones principales del sitio.
*   **Props Aceptadas:**
    *   `title` (`string`, Requerido): Título principal de la sección.
    *   `subtitle` (`string`, Opcional): Breve descripción de soporte que aparece debajo del título.
*   **Slots:** No aplica.
*   **Ejemplo de Uso:**
    ```astro
    ---
    import SectionTitle from '../ui/SectionTitle.astro';
    ---
    <SectionTitle
      title="Nuestros Servicios"
      subtitle="Aquí encontrarás lo que podemos hacer por tu negocio."
    />
    ```

---

## 🏛️ Componentes de Secciones (Astro)

### 1. `Nav.astro`
*   **Ubicación:** `src/components/nav/Nav.astro`
*   **Propósito:** Cabecera de navegación superior fija (`sticky`). Utiliza un efecto de desenfoque (`backdrop-blur`) y un menú hamburguesa responsivo resuelto únicamente con HTML/CSS (sin JS) utilizando `<details>` y `<summary>`.
*   **Props:** Ninguna.
*   **Componentes Hijos:** `Container.astro`, `Button.astro`.
*   **Notas de Accesibilidad:** El `<summary>` del menú móvil tiene el atributo `aria-label="Abrir menú de navegación"`.

### 2. `Hero.astro`
*   **Ubicación:** `src/components/hero/Hero.astro`
*   **Propósito:** Sección principal de bienvenida. Combina textos persuasivos sobre una red de partículas dinámicas y maneja animaciones de entrada coordinadas.
*   **Props:** Ninguna.
*   **Componentes Hijos:** `Container.astro`, `Button.astro`, `ConstellationBg.jsx` (React), `HeroMotion.jsx` / `HeroMotionItem` (React).

### 3. `Services.astro`
*   **Ubicación:** `src/components/services/Services.astro`
*   **Propósito:** Renderiza la lista de servicios principales de la consultora.
*   **Props:** Ninguna.
*   **Origen de Datos:** Importa la lista `servicios` desde `src/data/servicios.js`.
*   **Estructura Responsiva:** En móvil muestra un carrusel horizontal deslizable (`overflow-x-auto` con `snap-mandatory`), y en escritorio un grid de 3 columnas.
*   **Componentes Hijos:** `Container.astro`, `SectionTitle.astro`.

### 4. `Paquetes.astro`
*   **Ubicación:** `src/components/paquetes/Paquetes.astro`
*   **Propósito:** Muestra los 3 paquetes de precios principales del negocio (Starter, Pro, Elite).
*   **Props:** Ninguna.
*   **Origen de Datos:** Importa la lista `paquetes` desde `src/data/paquetes.js`.
*   **Estructura Responsiva:** En móvil muestra un carrusel horizontal deslizable, y en escritorio un grid de 3 columnas donde resalta visualmente el paquete configurado como `destacado: true` (Pro).
*   **Componentes Hijos:** `Container.astro`, `SectionTitle.astro`, `Button.astro`.

### 5. `Proceso.astro`
*   **Ubicación:** `src/components/proceso/Proceso.astro`
*   **Propósito:** Muestra la línea de tiempo o flujo de trabajo de 4 etapas (Diagnóstico, Estrategia, Implementación, Optimización).
*   **Props:** Ninguna.
*   **Estructura Responsiva:** En móvil renderiza un acordeón de elementos colapsables con `<details>`, y en escritorio una lista ordenada `<ol>` en un grid de 2x2.
*   **Componentes Hijos:** `Container.astro`, `SectionTitle.astro`.

### 6. `Portfolio.astro`
*   **Ubicación:** `src/components/portfolio/Portfolio.astro`
*   **Propósito:** Presenta trabajos recientes, divididos en destacados y secundarios.
*   **Props:** Ninguna.
*   **Origen de Datos:** Importa la lista `proyectos` desde `src/data/portfolio.js`.
*   **Componentes Hijos:** `Container.astro`, `SectionTitle.astro`, `FeaturedProject.astro`, `PortfolioSlider.jsx` (React).

### 7. `FeaturedProject.astro`
*   **Ubicación:** `src/components/portfolio/FeaturedProject.astro`
*   **Propósito:** Renderiza una tarjeta de proyecto destacada con imágenes optimizadas y botones de enlace a la URL en vivo y al código fuente.
*   **Detalles de Optimización:** Usa el componente `<Image />` de `astro:assets` para generación automática de srcsets responsivos y prevención de CLS. Requiere los atributos `width` y `height` para el cálculo de aspect-ratio.
*   **Props Aceptadas:**
    *   `proyecto` (`object`, Requerido): Un objeto con los datos del proyecto (título, tipo, zona, descripción, imagen/mockup, url, repo, destacado).
    *   `width` (`number`, Requerido para optimización): Ancho real de la imagen en píxeles.
    *   `height` (`number`, Requerido para optimización): Alto real de la imagen en píxeles.
*   **Ejemplo de Uso:**
    ```astro
    <FeaturedProject proyecto={proyectoData} />
    ```

### 8. `ContactSection.astro`
*   **Ubicación:** `src/components/form/ContactSection.astro`
*   **Propósito:** Sección que aloja el formulario de contacto para cotizaciones rápidas.
*   **Props:** Ninguna.
*   **Componentes Hijos:** `Container.astro`, `SectionTitle.astro`, `ContactForm.jsx` (React).

### 9. `Testimonios.astro`
*   **Ubicación:** `src/components/testimonios/Testimonios.astro`
*   **Propósito:** Muestra comentarios reales de clientes.
*   **Props:** Ninguna.
*   **Origen de Datos:** Importa la lista `testimonios` desde `src/data/testimonios.js`.
*   **Componentes Hijos:** `Container.astro`, `SectionTitle.astro`, `TestimonialsMotion.jsx` (React).

### 10. `FAQ.astro`
*   **Ubicación:** `src/components/faq/FAQ.astro`
*   **Propósito:** Acordeón de dudas frecuentes estructuradas mediante etiquetas `<details>` de HTML.
*   **Props:** Ninguna.
*   **Origen de Datos:** Importa la lista `faqs` desde `src/data/faqs.js`.
*   **Componentes Hijos:** `Container.astro`, `SectionTitle.astro`.

### 11. `CTA.astro`
*   **Ubicación:** `src/components/cta/CTA.astro`
*   **Propósito:** Banner de llamada a la acción final antes del pie de página.
*   **Props:** Ninguna.
*   **Componentes Hijos:** `Container.astro`, `Button.astro`.

### 12. `Footer.astro`
*   **Ubicación:** `src/components/footer/Footer.astro`
*   **Propósito:** Pie de página que contiene metadatos de copyright, enlaces de navegación, zona de cobertura y teléfono de WhatsApp.
*   **Props:** Ninguna.
*   **Componentes Hijos:** `Container.astro`.

---

## ⚡ Islas Interactivas (React + Framer Motion)

Estos componentes de React se renderizan en el servidor pero se activan (hidratan) en el navegador usando directivas `client:*` de Astro.

### 1. `ConstellationBg.jsx`
*   **Ubicación:** `src/react/ConstellationBg.jsx`
*   **Propósito:** Fondo canvas dinámico con partículas estelares conectadas entre sí mediante líneas sutiles. Genera una animación de partículas estática. No utiliza eventos del ratón.
*   **Estrategia de Hidratación:** `client:load`
*   **Props:** `className` (opcional).

### 2. `HeroMotion.jsx` & `HeroMotionItem`
*   **Ubicación:** `src/react/HeroMotion.jsx`
*   **Propósito:** Contenedor y elementos que envuelven el contenido del Hero para animar su opacidad y posición en cascada.
*   **Estrategia de Hidratación:** `client:load`
*   **Props:** `children`, `className` (opcional), `delay` (en milisegundos para `HeroMotionItem`).
*   **Accesibilidad:** Llama al hook `useReducedMotion()` de Framer Motion. Si la preferencia de accesibilidad del sistema operativo indica movimiento reducido, desactiva la animación y muestra los componentes estáticamente de inmediato.

### 3. `PortfolioSlider.jsx`
*   **Ubicación:** `src/react/PortfolioSlider.jsx`
*   **Propósito:** Carrusel deslizable interactivo con animaciones de entrada/salida para mostrar los proyectos no destacados.
*   **Estrategia de Hidratación:** `client:visible`
*   **Props:** `proyectos` (`array`, Requerido): Lista de ítems del portafolio.
*   **Estados Internos:** `index` (controla la diapositiva actual).

### 4. `TestimonialsMotion.jsx`
*   **Ubicación:** `src/react/TestimonialsMotion.jsx`
*   **Propósito:** Carrusel y grid animado de testimonios de clientes.
*   **Estrategia de Hidratación:** `client:visible`
*   **Props:** `testimonios` (`array`, Requerido): Lista de testimonios.
*   **Comportamiento:**
    *   **Móvil:** Renderiza un carrusel automático que cambia cada 3 segundos (`setTimeout`) con botones manuales para avanzar/retroceder.
    *   **Escritorio:** Muestra un grid de 3 columnas de tarjetas animadas que se elevan ligeramente al pasar el cursor (`whileHover`).
*   **Accesibilidad:** Incluye insignias que indican "Reseña verificada" con un indicador pulsante en verde para testimonios reales.

### 5. `ContactForm.jsx`
*   **Ubicación:** `src/react/ContactForm.jsx`
*   **Propósito:** Formulario interactivo que recopila y envía consultas del usuario al servicio externo Web3Forms mediante una petición HTTP POST (`fetch`).
*   **Estrategia de Hidratación:** `client:visible`
*   **Props:** Ninguna.
*   **Campos:**
    *   `name` (Nombre, requerido, max 80 chars)
    *   `email` (Correo electrónico, requerido, max 120 chars)
    *   `message` (Mensaje, requerido, max 1000 chars)
    *   `botcheck` (Honeypot oculto para prevención de spam)
*   **Estados Internos:**
    *   `status` (`'idle' | 'sending' | 'sent' | 'error'`)
    *   `result` (`string` de respuesta visual)

---

---

## ⚙️ Configuración y Constantes

### 1. `contact.ts`
*   **Ubicación:** `src/config/contact.ts`
*   **Tipo:** Módulo de configuración TypeScript.
*   **Propósito:** Define y centraliza la configuración de datos de contacto (número de WhatsApp de la consultora) y helpers generadores de URLs `wa.me` a nivel global para garantizar que toda la web use la misma información canónica.
*   **Exports:**
    *   `WHATSAPP_NUMBER` (`string`): Teléfono limpio sin símbolos (ej. `"527223579869"`).
    *   `WHATSAPP_URL(mensaje)` (`function`): Retorna la URL de redirección a WhatsApp codificada apropiadamente.
*   **Ejemplo de Uso:**
    ```astro
    ---
    import { WHATSAPP_URL } from '../config/contact';
    ---
    <a href={WHATSAPP_URL("Hola, me interesa...")}>WhatsApp</a>
    ```
*   **Módulos que lo importan:** `Nav.astro`, `DefaultLayout.astro`, `Hero.astro`, `Services.astro`, `Paquetes.astro`, `Footer.astro`, `CTA.astro`.
