# AUDITORÍA: Sección Proceso — DAB Landing

## Tu rol
Eres un agente de código frontend. Tu tarea es **puramente investigativa**: leer todos los archivos relacionados con la sección de Proceso/Flujo de trabajo en la landing principal y generar un reporte estructurado completo. **NO escribas, modifiques ni crees código. Solo lee y reporta.**

---

## Archivos a auditar (lee TODOS, en este orden)

### 1. Componente principal
- `src/components/proceso/Proceso.astro`

### 2. Componentes internos (si existen)
- Buscar en `src/components/proceso/` cualquier archivo adicional
- Buscar en `src/react/` si hay algún componente React relacionado con proceso/steps/timeline
- Buscar en `src/components/animations/` si hay animaciones usadas en Proceso

### 3. Data centralizada
- `src/data/` — buscar cualquier archivo relacionado con proceso, steps, timeline, flujo
- Revisar si hay un archivo tipo `proceso.js`, `steps.js`, `timeline.js`, `flujo.js`, etc.

### 4. Uso en landing principal
- Cómo se importa y usa `Proceso.astro` en `src/pages/index.astro` (línea de import, props, posición en la página)

### 5. Estilos y animaciones globales
- `src/styles/base.css` — buscar clases relacionadas con proceso, timeline, steps, números, conectores, líneas
- Revisar si hay keyframes CSS para animaciones de entrada, fade, slide, etc.

---

## Reporte requerido: formato exacto

Genera un reporte de texto con la siguiente estructura. Sé específico y pega código relevante cuando sea necesario.

```
# AUDITORÍA — Sección Proceso DAB

## 1. COMPONENTE PRINCIPAL: Proceso.astro

### 1.1 Ubicación y estructura
- **Ruta completa:** [ruta exacta]
- **Props:** ¿Recibe props? ¿Cuáles? ¿Tiene valores default?
- **Imports:** Lista COMPLETA de imports (componentes, data, layouts, React, imágenes, etc.) con rutas relativas exactas

### 1.2 Estructura HTML completa
Describe la estructura de la sección de arriba a abajo:
- ¿Usa `<section>`? ¿Con qué id?
- ¿Usa `Container.astro`? ¿Con qué className?
- ¿Usa `SectionTitle.astro`? ¿Qué title y subtitle recibe?
- ¿Cómo renderiza los 4 pasos? (grid, flex, lista, componentes individuales)
- ¿Hay un contenedor padre para los pasos? ¿Qué clases tiene?
- ¿Hay elementos de conexión entre pasos? (líneas, flechas, conectores, números circulares)
- ¿Hay un footer o CTA al final de la sección?

Pega el markup HTML COMPLETO del componente (o al menos la estructura principal con las clases Tailwind).

### 1.3 Clases Tailwind clave (pegar exactas)
- **Sección:** [clases del <section>]
- **Contenedor:** [clases del contenedor de pasos]
- **Card/paso individual:** [clases de cada paso]
- **Número/icono:** [clases del número o icono de cada paso]
- **Título del paso:** [clases del h3/h4 del paso]
- **Descripción del paso:** [clases del párrafo]
- **Conector/línea:** [clases de cualquier línea o flecha entre pasos]
- **Badge de tiempo:** [clases si hay "30 min", "1-2 días", etc.]
- **Responsive:** ¿Cómo cambia en mobile? (grid-cols, flex-col, hidden, etc.)

### 1.4 Data: ¿De dónde viene?
- ¿Importa data desde `../../data/...`?
- ¿La data está hardcodeada en el componente?
- Pega la estructura de la data (array de objetos, keys, etc.)
- ¿Hay iconos? ¿Son emojis, SVG inline, componentes, o strings?

### 1.5 Animaciones
- ¿Hay animaciones CSS? ¿Keyframes? ¿Clases tipo animate-fade, animate-slide?
- ¿Usa Framer Motion? ¿GSAP? ¿Otra librería?
- ¿Hay animaciones de entrada al hacer scroll? (Intersection Observer, whileInView, ScrollTrigger)
- ¿Hay animaciones hover en las cards?
- Describe las animaciones exactas: qué se anima, cómo (fade, slide, scale), duración, delay, easing

### 1.6 Responsive
- ¿Cómo se ve en mobile? (grid de 1 col, timeline vertical, stack, etc.)
- ¿Cómo se ve en desktop? (grid de 4 cols, horizontal, etc.)
- ¿Hay elementos que se ocultan/muestran según breakpoint?
- ¿Hay scroll horizontal en mobile?

### 1.7 SEO y semántica
- ¿Usa tags semánticos? (section, article, h2, h3, ol/ul, li)
- ¿Tiene atributos ARIA?
- ¿Los números de paso son decorativos o semánticos?

---

## 2. COMPONENTES INTERNOS RELACIONADOS

### 2.1 Archivos en src/components/proceso/
Lista todos los archivos en esta carpeta con:
- Nombre
- Props que recibe
- Descripción de qué hace
- Si es Astro o React

### 2.2 Archivos React relacionados en src/react/
Busca si hay componentes React usados por Proceso.astro:
- ¿Hay un slider, carrusel, o animación de pasos?
- ¿Hay un componente de timeline animado?
- Pega los imports de React que hace Proceso.astro

### 2.3 Animaciones globales usadas
- ¿Usa `FadeIn.tsx` o `StaggerContainer.tsx`?
- ¿Hay alguna animación de entrada reutilizable?

---

## 3. DATA DE PROCESO

### 3.1 Archivo de data
- **Ruta:** [ruta exacta del archivo de data]
- **Formato:** [.js, .ts, .json, .md]
- **Export:** ¿Qué exporta? (array, objeto, función)

### 3.2 Estructura completa de la data
Pega el contenido COMPLETO del archivo de data (o al menos la estructura con todas las keys). Si es largo, mantén las keys y anonimiza los textos si quieres.

Ejemplo de formato esperado:
```javascript
export const pasos = [
  {
    id: 'diagnostico',
    numero: 1,
    titulo: '...',
    descripcion: '...',
    tiempo: '...',
    icono: '...', // o componente, o SVG
  },
  // ...
];
```

### 3.3 Iconos
- ¿Cómo se representan los iconos? (emoji, string de SVG, componente React, imagen)
- ¿Hay un mapping de iconos? (ej: { diagnostico: '🔍', estrategia: '🎯' })

---

## 4. USO EN INDEX.ASTRO

### 4.1 Import
- **Línea exacta de import:** [pega la línea]

### 4.2 Uso en el markup
- ¿Cómo se usa? `<Proceso />` o `<Proceso prop="..." />`
- ¿En qué posición de la página? (después de qué sección, antes de qué sección)
- Pega el contexto: las 3-5 líneas antes y después del uso de `<Proceso />`

---

## 5. ESTILOS GLOBALES RELACIONADOS

### 5.1 En base.css
Busca clases relacionadas con proceso, timeline, steps, números, conectores:
- ¿Hay `.timeline-*`, `.step-*`, `.process-*`, `.number-*`?
- ¿Hay keyframes para animaciones de proceso?
- Pega las clases y keyframes relevantes

### 5.2 En tailwind.config.cjs
- ¿Hay colores, spacing, o utilities extendidos para proceso?
- ¿Hay plugins o custom utilities?

---

## 6. ANÁLISIS DE REUTILIZACIÓN PARA "LÍNEA DE TIEMPO VIVA"

Basado en todo lo anterior, responde:

| Pregunta | Respuesta | Notas |
|---|---|---|
| ¿El componente actual ya tiene animaciones de scroll? | Sí/No/Parcial | |
| ¿Usa Framer Motion? | Sí/No | Si sí, ¿cómo? |
| ¿Usa GSAP? | Sí/No | Si sí, ¿cómo? |
| ¿La data actual tiene tiempo estimado por paso? | Sí/No | |
| ¿La data actual tiene iconos? | Sí/No | ¿Qué tipo? |
| ¿Hay conectores visuales entre pasos? | Sí/No | ¿Líneas, flechas, números? |
| ¿El layout actual es horizontal o vertical? | | |
| ¿Se puede reutilizar el componente actual como base? | Sí/No/Parcial | ¿Qué cambios harían falta? |
| ¿Necesitamos un componente React nuevo para animaciones de scroll? | Sí/No | ¿Por qué? |
| ¿El diseño actual usa glass-card, borders, shadows consistentes? | Sí/No | |
| ¿Hay inconsistencias visuales que corregir? | Sí/No | ¿Cuáles? |

---

## 7. RECOMENDACIÓN DEL AGENTE

Basado en todo lo anterior:

1. **¿Se puede mejorar la sección actual o es mejor reescribir?**
2. **¿Qué animaciones de scroll-triggered recomiendas?** (Framer Motion whileInView, GSAP ScrollTrigger, Intersection Observer + CSS, otra)
3. **¿Qué componentes reutilizar?** ¿Cuáles crear nuevos?
4. **¿Qué riesgos técnicos ves?** (bundle size, compatibilidad, breaking changes)
5. **¿Qué decisiones de diseño debería tomar el implementador?**

---

## Regla de oro

**NO escribas código. NO modifiques archivos. NO instales dependencias. Solo lee, analiza y reporta.**

Si un archivo no existe, indica "[NO EXISTE]".
Si un archivo está vacío o no tiene contenido relevante, indica "[VACÍO]".
Si no puedes leer un archivo por permisos u otro error, indica "[ERROR: descripción]".
