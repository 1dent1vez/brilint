# PROMPT: Corrección de Títulos en Micro-Landings — Consistencia Visual DAB

## Tu rol
Eres un agente de código frontend especializado en Astro + React + Tailwind. Tu única tarea es **corregir los títulos y subtítulos de las micro-landings** para que sean consistentes con el resto de la landing principal y legibles en todos los dispositivos.

## Regla de oro
**NO modifiques nada más que los títulos, subtítulos y textos de hero/encabezado de las micro-landings.** No toques la lógica de tabs, los precios, el contenido de FAQ, ni ninguna otra funcionalidad. Solo tipografía, peso, legibilidad y consistencia visual.

---

## 1. CONTEXTO DEL PROBLEMA

Las micro-landings (`/servicios/despierta`, `/servicios/crece`, `/servicios/domina`) tienen títulos que se ven **demasiado gruesos, apretados o ilegibles**. El usuario reporta que "no se alcanza a leer correctamente".

### Causa probable
El proyecto usa `font-display: ['Thunder', 'Impact', 'Arial Black', 'sans-serif']` — fuentes ultra-bold y condensed. Estas funcionan para títulos cortos de 1-3 palabras (ej: "DESPIERTA") pero **colapsan visualmente en frases largas**, especialmente en mobile.

### Lo que debe pasar
Los títulos de las micro-landings deben verse **exactamente como los títulos de las otras secciones de la landing** (Hero, Métricas, CTA, etc.).

---

## 2. INVESTIGACIÓN PREVIA (OBLIGATORIA)

Antes de escribir una sola línea de código, lee y analiza:

### 2.1 Títulos existentes en la landing principal
Revisa estos archivos y anota **clases exactas, fuentes, tamaños, pesos, tracking, line-height, max-width**:
- `src/components/hero/Hero.astro` o `src/components/hero/HeroContent.tsx`
- `src/components/metrics/MetricsSection.astro`
- `src/components/cta/CTA.astro`
- `src/components/ui/SectionTitle.astro` (si existe)
- Cualquier otro componente que renderice títulos grandes en la landing

### 2.2 Componentes de micro-landings a revisar
Busca en los archivos de las micro-landings dónde se renderizan los títulos:
- Hero del servicio (título principal, subtítulo, badge)
- Títulos de cada tab (Planes, Qué incluye, Proceso, FAQ)
- Títulos de secciones internas (cross-sell, CTA final)

Archivos probables (adaptar según tu estructura real):
- `src/components/services/ServicePageLayout.astro`
- `src/components/react/ServiceTabs.tsx`
- `src/components/react/PlanCard.tsx`
- `src/components/react/ProcessStep.tsx`
- `src/pages/servicios/despierta.astro`
- `src/pages/servicios/crece.astro`
- `src/pages/servicios/domina.astro`

---

## 3. REGLAS DE CORRECCIÓN

### Regla 1: Replica el patrón exacto de la landing principal
Si el Hero de la landing usa:
```
font-display text-5xl md:text-7xl tracking-tight leading-tight
```
…para una palabra corta, pero usa:
```
font-body text-3xl md:text-5xl font-semibold tracking-normal leading-snug max-w-3xl
```
…para una frase larga, **replica ese mismo patrón** en las micro-landings.

### Regla 2: Separar "nombre del servicio" de "frase de valor"
El título de una micro-landing NO debe ser una sola frase larga en `font-display`. Debe dividirse en:

**Estructura correcta:**
```
[Nombre del servicio en font-display, grande, bold]  ← 1-2 palabras máximo
[Frase de valor en font-body, mediano, semibold/bold]  ← larga, legible
```

**Ejemplo de corrección:**

❌ ANTES (ilegible, grueso):
```html
<h1 class="font-display text-6xl md:text-8xl tracking-tight">
  Tu negocio no necesita más publicidad. Necesita un sistema que venda solo.
</h1>
```

✅ DESPUÉS (legible, consistente):
```html
<h1 class="font-display text-5xl md:text-7xl tracking-tight leading-none">
  Despierta
</h1>
<p class="font-body text-xl md:text-2xl font-semibold text-dab-text leading-relaxed max-w-2xl mt-4">
  Tu negocio no necesita más publicidad. Necesita un sistema que venda solo.
</p>
```

### Regla 3: Nunca uses font-display para frases largas
`font-display` (Thunder, Impact, Arial Black) está diseñado para:
- Nombres de servicio: "Despierta", "Crece", "Domina"
- Títulos cortos de sección: "Elige tu nivel"
- Números o badges

**NO** para:
- Subtítulos descriptivos
- Frases de más de 4 palabras
- Texto explicativo debajo del título

### Regla 4: Ajustes de legibilidad obligatorios
Para cualquier texto que sea una frase completa, asegurar:
- `line-height` ≥ 1.4 (ej: `leading-relaxed`, `leading-snug` mínimo)
- `tracking` no comprimido (evita `tracking-tighter` en frases largas; usa `tracking-normal` o `tracking-wide`)
- `max-w` definido (ej: `max-w-2xl`, `max-w-3xl`) para que no se estire en pantallas anchas
- `text-wrap: pretty` o `balance` si el navegador lo soporta (Tailwind: `text-pretty`)
- En mobile: tamaño máximo `text-3xl` o `text-4xl` para frases largas

### Regla 5: Consistencia de tabs y secciones internas
Los títulos dentro de cada tab también deben corregirse:

- **Tab "Planes"**: título "Planes de [servicio]" → `font-display text-3xl md:text-4xl` (corto, ok en display)
- **Tab "Qué incluye"**: título "¿Qué incluye?" → `font-display text-3xl` (corto, ok)
- **Tab "Proceso"**: título "Proceso de implementación" → si es largo, `font-body text-2xl md:text-3xl font-bold`
- **Tab "FAQ"**: título "Preguntas frecuentes" → `font-display text-3xl` o `font-body text-2xl font-bold`
- **Preguntas FAQ**: nunca en `font-display`. Usar `font-body font-semibold`.

### Regla 6: No inventar nuevos estilos
Usar ÚNICAMENTE las clases y tokens que ya existen en el proyecto:
- Fuentes: `font-display`, `font-body`, `font-serif`, `font-mono`
- Colores: `text-dab-text`, `text-dab-muted`, `text-dab-accent`
- Tamaños: `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, `text-4xl`, `text-5xl`, `text-6xl`, `text-7xl`
- Pesos: `font-normal`, `font-medium`, `font-semibold`, `font-bold`, `font-black`
- Tracking: `tracking-tight`, `tracking-normal`, `tracking-wide`
- Leading: `leading-none`, `leading-tight`, `leading-snug`, `leading-normal`, `leading-relaxed`
- Límites: `max-w-xs`, `max-w-sm`, `max-w-md`, `max-w-lg`, `max-w-xl`, `max-w-2xl`, `max-w-3xl`, `max-w-4xl`

---

## 4. ARCHIVOS A MODIFICAR (revisar y adaptar según tu estructura real)

Busca y corrige títulos en:

1. **Hero de cada micro-landing** (título principal + subtítulo + descripción)
2. **Títulos de tabs** ("Planes", "Qué incluye", "Proceso", "FAQ")
3. **Títulos de secciones internas** ("Entregables", "Soporte", "Cross-sell")
4. **Preguntas de FAQ** (nunca en font-display)
5. **CTA final** (título del call-to-action)

---

## 5. CHECKLIST DE VERIFICACIÓN

Después de corregir, verifica visualmente (o describe el resultado esperado):

- [ ] El nombre del servicio ("Despierta", "Crece", "Domina") sigue en `font-display`, grande y bold
- [ ] La frase descriptiva debajo usa `font-body`, peso controlado (`font-semibold` o `font-bold`), y es legible
- [ ] En mobile (320px-375px), ningún título se corta, se amontona o sale del viewport
- [ ] Los títulos de tabs son consistentes entre las 3 micro-landings
- [ ] Las preguntas de FAQ usan `font-body`, no `font-display`
- [ ] Los subtítulos de "Qué incluye" y "Proceso" tienen `leading-relaxed` y `max-w` definido
- [ ] No se rompió ningún componente React ni la navegación entre tabs
- [ ] `npm run build` pasa sin errores

---

## 6. EJEMPLO DE ENTREGA ESPERADA

El agente debe reportar qué cambió, archivo por archivo:

```
Archivo: src/components/services/ServicePageLayout.astro
- Línea 23: <h1 class="font-display text-8xl ..."> → <h1 class="font-display text-5xl md:text-7xl tracking-tight leading-none">
- Línea 24: <p class="font-display text-2xl ..."> → <p class="font-body text-xl md:text-2xl font-semibold leading-relaxed max-w-2xl">

Archivo: src/components/react/ServiceTabs.tsx
- Línea 45: <h2 class="font-display text-4xl ...">Planes...</h2> → <h2 class="font-display text-3xl md:text-4xl tracking-tight">Planes</h2>
- Línea 67: <h3 class="font-display text-xl ...">FAQ</h3> → <h3 class="font-body text-xl font-semibold">FAQ</h3>
```

---

## 7. RESTRICCIONES ABSOLUTAS

- ❌ **NO modificar** la lógica de tabs, navegación, precios, data, o contenido de FAQ
- ❌ **NO crear** nuevos tokens de Tailwind, nuevas fuentes, o nuevas clases CSS globales
- ❌ **NO tocar** la landing principal (`index.astro`, Hero, Métricas, CTA, Footer, etc.)
- ❌ **NO cambiar** el color de los títulos (mantener `text-dab-text` o el color que ya usaban)
- ❌ **NO instalar** dependencias nuevas
- ✅ **SÍ leer** primero los títulos existentes en la landing principal para replicar el patrón exacto
- ✅ **SÍ dejar** el nombre del servicio en `font-display` (es la identidad visual)
- ✅ **SÍ usar** `font-body` para frases largas y descriptivas

---

Empieza leyendo los títulos de la landing principal en `src/components/hero/`, `src/components/cta/`, `src/components/metrics/` y `src/components/ui/SectionTitle.astro`. Replica ese patrón exacto en las micro-landings.
