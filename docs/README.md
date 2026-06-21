# Brilint — Documentación del Proyecto

Bienvenido a la documentación técnica de **Brilint**, una landing page y plataforma de servicios digitales premium enfocada en el Valle de Toluca (Metepec, Toluca, Lerma, San Mateo Atenco y alrededores). Este sitio está construido utilizando **Astro** y optimizado para ofrecer un rendimiento sobresaliente, una experiencia interactiva fluida y una presencia digital moderna.

---

## 🚀 Stack Tecnológico

El proyecto está construido sobre un stack moderno orientado al rendimiento estático y la interactividad selectiva:

*   **Framework Principal:** [Astro v5.16.0](https://astro.build/) (Configurado en modo de salida estática)
*   **Biblioteca de UI:** [React v19](https://react.dev/) (Utilizado para islas interactivas y animaciones complejas)
*   **Estilos:** [Tailwind CSS v3.4.18](https://tailwindcss.com/) + [PostCSS v8.5.6](https://postcss.org/) + [Autoprefixer v10.4.22](https://github.com/postcss/autoprefixer)
*   **Animaciones:** [Framer Motion v12.23.24](https://www.framer.com/motion/) (Usado para micro-interacciones, transiciones de carga y carruseles)
*   **Integraciones Astro:**
    *   `@astrojs/react` v4.4.2 (Soporte para componentes React)
    *   `@astrojs/tailwind` v6.0.2 (Soporte para Tailwind CSS con estilos base personalizados)
    *   `@astrojs/sitemap` v3.6.0 (Generación automática de sitemaps XML)
*   **Adaptador de Despliegue:** `@astrojs/vercel` v8.0.4 (Adaptador optimizado para Vercel)

---

## 📁 Tabla de Contenidos

La documentación del proyecto se encuentra estructurada en los siguientes archivos:

| Archivo | Contenido |
| :--- | :--- |
| [arquitectura.md](file:///c:/Users/Identivezz/Documents/BRILINT/brilint/docs/arquitectura.md) | Estructura de carpetas, rutas, dependencias |
| [componentes.md](file:///c:/Users/Identivezz/Documents/BRILINT/brilint/docs/componentes.md) | Catálogo de componentes con props y ejemplos |
| [layouts.md](file:///c:/Users/Identivezz/Documents/BRILINT/brilint/docs/layouts.md) | Layouts disponibles y sistema de slots |
| [estilos.md](file:///c:/Users/Identivezz/Documents/BRILINT/brilint/docs/estilos.md) | Sistema de diseño, tokens, tipografía |
| [rendimiento.md](file:///c:/Users/Identivezz/Documents/BRILINT/brilint/docs/rendimiento.md) | Hidratación, imágenes, estrategia de carga |
| [seo.md](file:///c:/Users/Identivezz/Documents/BRILINT/brilint/docs/seo.md) | Metadatos, canonical, JSON-LD, validación |
| [despliegue.md](file:///c:/Users/Identivezz/Documents/BRILINT/brilint/docs/despliegue.md) | Plataforma, adaptador, dominios, pipeline |
| [changelog.md](file:///c:/Users/Identivezz/Documents/BRILINT/brilint/docs/changelog.md) | ← NUEVO: Historial de correcciones técnicas |

---

## 💻 Inicio Rápido (Quick Start)

Sigue estos pasos para levantar el entorno de desarrollo localmente:

### 1. Clonar el repositorio e instalar dependencias
```bash
git clone https://github.com/1dent1vez/brilint.git
cd brilint
npm install
```

### 2. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto (basándote en el archivo de ejemplo o usando la llave requerida):
```env
PUBLIC_WEB3FORMS_KEY=tu-clave-aqui
```

### 3. Ejecutar el servidor de desarrollo
```bash
npm run dev
```
El proyecto estará disponible localmente en `http://localhost:4321/`.

---

## 🛠️ Scripts Disponibles

El archivo [package.json](file:///package.json) define los siguientes scripts para el flujo de trabajo:

*   `npm run dev`: Inicia el servidor de desarrollo local de Astro con recarga rápida (HMR).
*   `npm run build`: Compila el sitio web y genera un paquete estático optimizado en el directorio `dist/` listo para producción.
*   `npm run preview`: Previsualiza localmente la compilación de producción generada en `dist/`.
*   `npm run astro`: Ejecuta comandos de la CLI de Astro directamente (ej. `npm run astro check`).

---

## 🔑 Variables de Entorno Requeridas

El proyecto requiere las siguientes variables de entorno para funcionar correctamente en producción:

| Variable | Tipo | Propósito | Requerido |
| :--- | :--- | :--- | :--- |
| `PUBLIC_WEB3FORMS_KEY` | String | Clave de acceso pública de Web3Forms para habilitar el envío del formulario de contacto. | Sí |

> [!WARNING]
> No expongas valores sensibles en el código fuente. Utiliza el prefijo `PUBLIC_` únicamente para las variables que deben estar disponibles en el cliente.

---

## ⚙️ Configuración de Contacto Centralizada

Los datos de contacto y enlaces de redirección a WhatsApp están centralizados en el archivo [contact.ts](file:///c:/Users/Identivezz/Documents/BRILINT/brilint/src/config/contact.ts) para actuar como única fuente de verdad y evitar inconsistencias:

*   **Ubicación:** `src/config/contact.ts`
*   **Constantes Exportadas:**
    *   `WHATSAPP_NUMBER`: Número telefónico del negocio en formato numérico puro, con código de país (ej. `"527223579869"`).
    *   `WHATSAPP_URL(mensaje)`: Función auxiliar que recibe un texto opcional y retorna el enlace `wa.me` de forma segura.

---

## 📊 Estado del Proyecto

*   **Última actualización:** 21 de Junio de 2026 (Resolución de deuda técnica)
*   **Entorno actual:** Listo para producción (SSG)
*   **Estado de compilación:** ✅ Pasa sin errores. El conflicto de Windows Defender con `ContactForm.jsx` fue resuelto mediante una exclusión local y restauración del archivo.
