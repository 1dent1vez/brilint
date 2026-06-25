# AUDITORÍA: Portfolio + Testimonios — DAB Landing

## Tu rol
Eres un agente de código frontend. Tu tarea es **puramente investigativa**: leer los componentes y data existentes de Portfolio y Testimonios, y generar un reporte estructurado. **No escribas, modifiques ni crees código. Solo lee y reporta.**

---

## Archivos a auditar (lee TODOS)

### Componentes Astro
1. `src/components/portfolio/Portfolio.astro`
2. `src/components/portfolio/FeaturedProject.astro`
3. `src/components/testimonios/Testimonios.astro`

### Componentes React (si existen y se usan)
4. `src/react/PortfolioSlider.jsx`
5. `src/react/TestimonialsMotion.jsx`

### Data centralizada
6. `src/data/portfolio.js`
7. `src/data/testimonios.js`

### Uso en landing principal
8. Cómo se importan y usan en `src/pages/index.astro` (sección de portfolio y sección de testimonios)

---

## Reporte requerido: formato exacto

Genera un reporte de texto con la siguiente estructura. Sé específico y pega código relevante cuando sea necesario.

```
# AUDITORÍA — Portfolio & Testimonios DAB

## 1. PORTFOLIO

### 1.1 Portfolio.astro
- **Ruta:** src/components/portfolio/Portfolio.astro
- **Props:** ¿Recibe props? ¿Cuáles? Si no, ¿cómo obtiene la data?
- **Imports:** Lista completa de imports (componentes, data, layouts, React, etc.)
- **Estructura HTML:** Describe la estructura de la sección (contenedor, título, grid/slider, etc.)
- **Clases Tailwind clave:** Pega las clases más importantes (títulos, cards, grids, responsive)
- **Componentes internos:** ¿Usa FeaturedProject.astro? ¿PortfolioSlider.jsx? ¿Ambos?
- **Directivas client:** ¿Hidrata algún componente React? ¿Con qué directiva? (client:load, client:visible, etc.)
- **Responsive:** ¿Cómo se comporta en mobile vs desktop? (grid cols, scroll, etc.)
- **Animaciones:** ¿Usa Framer Motion, GSAP, CSS animations, o clases de Tailwind? Describe.
- **SEO/semántica:** ¿Usa tags semánticos? (section, article, h2, etc.)

### 1.2 FeaturedProject.astro
- **Ruta:** src/components/portfolio/FeaturedProject.astro
- **Props:** ¿Qué props recibe? ¿Tipos? (title, description, image, link, tags, etc.)
- **Estructura HTML:** Describe el card/proyecto (imagen, título, descripción, link, tags)
- **Clases Tailwind clave:** Pega las clases del card, imagen, título, hover effects
- **Manejo de imágenes:** ¿Usa <img>, <Image /> de Astro, o background-image? ¿De dónde vienen las imágenes? (public/, assets/)
- **Hover/Interacción:** ¿Qué pasa al pasar el mouse? (scale, shadow, overlay, etc.)
- **Responsive:** ¿Cambia layout en mobile?

### 1.3 PortfolioSlider.jsx (si existe y se usa)
- **Ruta:** src/react/PortfolioSlider.jsx
- **Props:** ¿Qué recibe?
- **Librería:** ¿Usa swiper, slick, embla, o custom?
- **Estructura:** Describe el slider (navegación, dots, arrows, loop, autoplay)
- **Clases Tailwind:** Pega las clases más importantes
- **Responsive:** ¿Cuántos slides en mobile vs desktop?
- **Animaciones:** ¿Framer Motion? ¿GSAP?

### 1.4 Data: portfolio.js
- **Ruta:** src/data/portfolio.js
- **Formato:** ¿Exporta array? ¿Objeto? Pega la estructura completa (puedes anonimizar textos si son largos, pero mantén las keys)
- **Campos por proyecto:** ¿Qué campos tiene cada objeto? (id, title, description, image, link, category, tags, etc.)
- **Cantidad:** ¿Cuántos proyectos hay?
- **Imágenes:** ¿Son strings a public/ o imports?

---

## 2. TESTIMONIOS

### 2.1 Testimonios.astro
- **Ruta:** src/components/testimonios/Testimonios.astro
- **Props:** ¿Recibe props?
- **Imports:** Lista completa de imports
- **Estructura HTML:** Describe la sección (contenedor, título, grid/slider/carrusel, cards)
- **Clases Tailwind clave:** Pega las clases más importantes
- **Componentes internos:** ¿Usa TestimonialsMotion.jsx? ¿Otro componente React?
- **Directivas client:** ¿Hidrata algún componente React? ¿Con qué directiva?
- **Responsive:** ¿Grid? ¿Slider? ¿Scroll horizontal?
- **Animaciones:** ¿Framer Motion, GSAP, CSS?
- **SEO/semántica:** ¿Tags semánticos?

### 2.2 TestimonialsMotion.jsx (si existe y se usa)
- **Ruta:** src/react/TestimonialsMotion.jsx
- **Props:** ¿Qué recibe?
- **Librería:** ¿Framer Motion? ¿GSAP? ¿Otra?
- **Estructura:** Describe el componente (cards, carrusel, grid, animaciones de entrada)
- **Clases Tailwind:** Pega las clases más importantes
- **Responsive:** ¿Cómo se adapta?
- **Animaciones específicas:** ¿fade, slide, stagger? Describe los variants/motion configs

### 2.3 Data: testimonios.js
- **Ruta:** src/data/testimonios.js
- **Formato:** ¿Exporta array? ¿Objeto? Pega la estructura completa (anonimiza textos largos pero mantén keys)
- **Campos por testimonio:** ¿Qué campos? (id, name, role, text, avatar, rating, service, business, etc.)
- **Cantidad:** ¿Cuántos testimonios hay?
- **Avatares/imágenes:** ¿Son emojis, iniciales, o imágenes reales?

---

## 3. USO EN INDEX.ASTRO

### 3.1 Sección Portfolio
- **Línea de import:** Pega la línea exacta de importación de Portfolio en index.astro
- **Uso:** ¿Cómo se usa el componente? (props, slot, posición en la página)
- **Data import:** ¿Se importa data de portfolio.js directamente en index.astro o el componente la importa internamente?

### 3.2 Sección Testimonios
- **Línea de import:** Pega la línea exacta de importación de Testimonios en index.astro
- **Uso:** ¿Cómo se usa el componente?
- **Data import:** ¿Data importada en index.astro o internamente en el componente?

---

## 4. ANÁLISIS DE REUTILIZACIÓN

### 4.1 ¿Qué se puede reutilizar para un "Muro de Confianza"?
Basado en lo que leíste, responde:

- **FeaturedProject.astro** ¿Es lo suficientemente genérico como para usarse como "card de caso de éxito" con testimonio encima? ¿Qué le falta? (avatar, quote, métricas, badge de servicio)
- **TestimonialsMotion.jsx** ¿Puede renderizar cards con imagen de proyecto arriba? ¿O solo texto?
- **PortfolioSlider.jsx** ¿Sirve como base para un slider de casos de éxito? ¿O es solo imágenes?
- **Container.astro / SectionTitle.astro** ¿Se usan en estas secciones? ¿Deberían usarse en la nueva sección?

### 4.2 Data: ¿Se puede fusionar?
- ¿portfolio.js y testimonios.js tienen relación? (ej: ¿un testimonio referencia un proyecto por ID?)
- ¿Se podría crear un array único de "casos de éxito" que combine proyecto + testimonio + métricas?

### 4.3 Estilos: ¿Consistencia?
- ¿Las cards de Portfolio y Testimonios usan el mismo estilo de glass-card, border, shadow que el resto del sitio?
- ¿Los títulos de sección usan SectionTitle.astro o tienen títulos propios?
- ¿Hay inconsistencias visuales entre Portfolio y Testimonios que deberían unificarse?

---

## 5. DECISIONES TÉCNICAS A REPORTAR

Para cada decisión, indica "Sí/No/Parcialmente" y explica:

| Decisión | Estado | Notas |
|---|---|---|
| ¿Se puede fusionar Portfolio + Testimonios en una sola sección? | | |
| ¿FeaturedProject.astro sirve como base de card de caso de éxito? | | |
| ¿TestimonialsMotion.jsx puede adaptarse a cards con imagen? | | |
| ¿Necesitamos un nuevo componente React para el grid/slider? | | |
| ¿La data actual permite mostrar métricas (%, números)? | | |
| ¿Hay imágenes reales de proyectos o son placeholders? | | |
| ¿Se puede usar el mismo patrón de importación de data que hoy? | | |
| ¿Necesitamos crear un nuevo archivo de data fusionada? | | |

---

## 6. RECOMENDACIÓN DEL AGENTE

Basado en todo lo anterior, ¿qué recomiendas?

1. **¿Fusionar en una sola sección "Muro de Confianza"?** ¿Sí o no? ¿Por qué?
2. **¿Qué componentes reutilizar?** ¿Cuáles crear nuevos?
3. **¿Qué estructura de data propones?** ¿Array fusionado o mantener separados?
4. **¿Qué animaciones conservar?** ¿Cuáles descartar?
5. **¿Riesgos técnicos?** (ej: romper index.astro, perder SEO, aumentar bundle)

---

## Regla de oro

**NO escribas código. NO modifiques archivos. NO instales dependencias. Solo lee, analiza y reporta.**

Si un archivo no existe, indica "[NO EXISTE]" y no lo trates de crear.
Si un archivo está vacío o no tiene contenido relevante, indica "[VACÍO]".
Si no puedes leer un archivo por permisos u otro error, indica "[ERROR: descripción]".
