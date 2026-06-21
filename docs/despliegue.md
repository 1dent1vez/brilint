# Guía de Despliegue y Entornos

Este documento describe la infraestructura de despliegue de **Brilint**, detallando la integración con la plataforma de alojamiento, el adaptador configurado, las variables de entorno, la pipeline de compilación y las políticas de caché de recursos.

---

## ☁️ Plataforma de Despliegue Detectada

El sitio está estructurado para alojarse en **Vercel**:
1.  **Existencia de archivo de configuración:** Presencia del archivo de redirecciones e infraestructura [vercel.json](file:///vercel.json).
2.  **Uso de carpetas del sistema:** Directorio `.vercel/` en la raíz (generado por la herramienta CLI de Vercel).
3.  **Adaptador Astro Integrado:** Uso de la biblioteca de compilación `@astrojs/vercel`.

---

## 🔌 Adaptador Astro y Configuración

El archivo [astro.config.mjs](file:///c:/Users/Identivezz/Documents/BRILINT/brilint/astro.config.mjs) expone la siguiente integración del adaptador:

```javascript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel'; // Adaptador de Vercel (actualizado para Astro v5+)

export default defineConfig({
  site: 'https://brilint.dev',
  output: 'static',                         // Fuerza la generación de sitio estático (SSG)
  adapter: vercel(),                        // Asigna a Vercel como receptor del build
  integrations: [
    react(),
    tailwind({ config: { applyBaseStyles: false } }),
    sitemap(),
  ],
});
```

> ⚠️ **Nota de Versión:** La ruta de importación `@astrojs/vercel/static` está obsoleta en Astro v5+ y ha sido migrada a `@astrojs/vercel` para mantener la compatibilidad y evitar warnings durante la compilación.


### Comportamiento del Adaptador Estático
Al compilar, el adaptador traduce los recursos de Astro a la especificación de carpetas requerida por el **Vercel Build Output API** (colocando la estructura dentro de `.vercel/output/`). Al ser una compilación estática (`output: 'static'`), Vercel sirve todos los ficheros de forma directa desde su CDN perimetral (Edge Network), sin levantar instancias serverless de cómputo por cada petición HTTP, reduciendo costes y tiempos de respuesta.

---

## 🔑 Variables de Entorno por Ambiente

La aplicación utiliza la clave de Web3Forms para habilitar el envío del formulario de contacto. Debe configurarse en cada uno de los entornos:

### 1. Entorno de Desarrollo Local
Configurado a través de un archivo `.env` en la raíz del proyecto (no versionado):
```env
PUBLIC_WEB3FORMS_KEY=c33a207d-d615-4bb2-9bf4-034558e0db4f
```

### 2. Entorno de Producción (Vercel Dashboard)
Se debe dar de alta en la consola web de Vercel en la sección:
`Settings > Environment Variables`:
*   **Key:** `PUBLIC_WEB3FORMS_KEY`
*   **Value:** `[Tu clave de Web3Forms en producción]`
*   **Environments:** Seleccionar `Production`, `Preview` y `Development`.

> [!IMPORTANT]
> El prefijo `PUBLIC_` es obligatorio en Astro para que la variable sea inyectada en el empaquetado del cliente y pueda ser consumida por el archivo JSX en el navegador mediante `import.meta.env.PUBLIC_WEB3FORMS_KEY`.

---

## 🛠️ Pipeline de Build y Artefactos

El proceso de construcción se dispara mediante el comando `npm run build` (que ejecuta internamente la CLI `astro build`). Los pasos de ejecución son:

1.  **Resolución de Dependencias y Tipados:** La CLI de Astro y TypeScript analizan las importaciones y generan declaraciones de tipos en `.astro/types.d.ts`.
2.  **Carga y Optimización de CSS/JS:** Vite procesa las clases Tailwind, compila las animaciones de `base.css`, minifica el JavaScript y resuelve las importaciones.
3.  **Generación de HTML Estático:** Astro renderiza los archivos `.astro` (layouts y componentes estáticos) produciendo archivos HTML planos.
4.  **Agrupamiento de Islas (Islands Bundling):** Los componentes React que usan la directiva `client:*` se compilan en piezas de JS separadas para ser cargadas bajo demanda por el navegador.
5.  **Generación de Sitemap:** La integración `@astrojs/sitemap` recorre las rutas físicas y escribe el índice `sitemap-index.xml`.

### Artefactos Generados
*   **`dist/`:** Directorio que contiene el sitio final estático (HTML, CSS y JS optimizado).
*   **`.vercel/output/`:** Formato estructurado especial para su lectura por los bots y servidores de Vercel.

---

## 🚀 Comandos de Despliegue

### Despliegue Automatizado (Recomendado)
Vercel se conecta directamente al repositorio de control de versiones (Git). Cualquier confirmación (`git push`) en la rama principal (`main` o `master`) dispara la ejecución de la pipeline en los servidores en la nube de forma transparente:
*   **Comando de construcción en Vercel:** `npm run build`
*   **Directorio de salida en Vercel:** `dist`

### Despliegue Manual por Consola
Si necesitas subir cambios directamente desde la máquina local:
```bash
# Iniciar sesión en Vercel
npm install -g vercel
vercel login

# Desplegar entorno de desarrollo/preview
vercel

# Desplegar cambios a producción en vivo
vercel --prod
```

---

## 🌐 Dominios y Entornos

El proyecto utiliza los siguientes dominios según el entorno de despliegue:

| Ambiente | URL | Estado |
| :--- | :--- | :--- |
| **Producción** | [https://brilint.dev/](https://brilint.dev/) | ✅ Activo |
| **Preview** | [https://brilint.vercel.app/](https://brilint.vercel.app/) | ⚠️ Temporal — no usar en producción |

> [!NOTE]
> El dominio temporal `brilint.vercel.app` ha sido completamente removido de todos los metadatos SEO del proyecto. Solo debe usarse para previews de PR.

---


## 🌐 Consideraciones Post-Despliegue y Caché

El archivo [vercel.json](file:///vercel.json) en la raíz del proyecto inyecta políticas de rendimiento para optimizar cómo la red de Vercel distribuye el contenido:

*   **Formatos URL Limpios:**
    *   `cleanUrls: true`: Remueve la extensión `.html` de la barra de direcciones automáticamente.
    *   `trailingSlash: false`: Redirecciona URLs con barra diagonal al final hacia su versión limpia (ej. `/servicios/` -> `/servicios`).
*   **Estrategia de Caché Inmutable para Recursos:**
    Define que las imágenes, archivos SVG, JS y CSS son inmutables (no cambiarán bajo el mismo hash de archivo) y los mantiene en caché del navegador por un año entero, reduciendo drásticamente las descargas repetidas:
    ```json
    {
      "key": "Cache-Control",
      "value": "public, max-age=31536000, immutable"
    }
    ```

---

## ⚠️ Resolución de Problemas de Despliegue en Compilación Local

Si la compilación local falla con el error:
`Could not resolve "../../react/ContactForm.jsx" from "src/components/form/ContactSection.astro"`

**Causa:**
El motor antivirus del sistema operativo local (Windows Defender) ha bloqueado o puesto en cuarentena el archivo `ContactForm.jsx` al detectar un falso positivo. Esto impide que Vite pueda leer y empaquetar el componente.

**Solución temporal para continuar trabajando localmente:**
1.  **Exclusión en el Antivirus:** Añadir la carpeta de trabajo del proyecto como exclusión dentro de la configuración de seguridad del sistema (Windows Defender > Protección contra virus y amenazas > Administrar configuración > Exclusiones).
2.  **Restauración desde el historial de versiones (Git):** Ejecutar en consola `git checkout -- src/react/ContactForm.jsx` para volver a crear el archivo físico original bloqueado.
