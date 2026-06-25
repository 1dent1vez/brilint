# DAB — Implementación: Muro de Confianza (Fusión Portfolio + Testimonios)

> **Versión:** 1.0  
> **Fecha:** 2026-06-24  
> **Basado en:** Auditoría de Portfolio + Testimonios (reporte entregado)  
> **Regla de oro:** Este documento es la fuente de verdad. Si algo no está claro, leer el código existente antes de asumir. Nunca inventar clases, colores o tokens nuevos.

---

## 1. OBJETIVO

Fusionar las secciones **Portfolio** y **Testimonios** de la landing principal (`index.astro`) en una única sección llamada **"Muro de Confianza"**.

- **Reemplazar** en `index.astro`: `<Portfolio />` y `<Testimonios />` por un único `<MuroConfianza />`.
- **Crear** un nuevo sistema de data fusionada (`casosExito.js`) que combine proyecto + testimonio + métricas.
- **Crear** un nuevo componente Astro (`MuroConfianza.astro`) y un nuevo componente React (`MuroConfianzaMotion.jsx`) que reutilicen los estilos y animaciones existentes.

**NO tocar:** Hero, Métricas, Paquetes, Proceso, Servicios, FAQ, Contacto, CTA Final, Footer, Nav.

---

## 2. CONTEXTO DEL PROYECTO (del reporte de auditoría)

### Stack
- Astro 5.16.0 (static, Vercel adapter)
- React 19.2.0 + Framer Motion 12.23.24
- Tailwind CSS 3.4.18
- NO View Transitions

### Estilos existentes a respetar
```
bg-dab-bg: #05060A
bg-dab-surface: #0B0D14
border-dab-accent/60: borde translúcido de acento
border-dab-accent/80: borde destacado
bg-dab-surface/70: fondo card translúcido
bg-dab-surface/85: fondo card mobile
shadow-dab-soft: 0 18px 45px rgba(0,0,0,0.45)
shadow-sm: sombra pequeña base
font-display: Thunder/Impact/Arial Black (SOLO para títulos cortos, 1-3 palabras)
font-body: Inter (para todo texto legible)
text-dab-text: #E5E7EB
text-dab-muted: #9CA3AF
text-dab-accent: #4C7FFF
```

### Clases de card existentes (de TestimonialsMotion.jsx)
```
Desktop: relative h-full rounded-2xl border border-dab-accent/60 bg-dab-surface/70 p-6 flex flex-col gap-4 shadow-sm transition duration-200 hover:border-dab-accent/80 hover:shadow-dab-soft
Mobile: p-6 flex flex-col gap-4 overflow-hidden rounded-2xl border border-dab-accent/60 bg-dab-surface/85 shadow-dab-soft
```

### Badge verificado existente
```
inline-flex items-center gap-2 rounded-full border border-dab-accent/60 bg-dab-bg/60 px-3 py-1 text-[11px] font-semibold text-dab-text uppercase tracking-[0.14em]
```

### Animaciones existentes a conservar
- **Mobile carrusel:** AnimatePresence + motion.div con `initial={{ opacity: 0, x: 40 }}`, `animate={{ opacity: 1, x: 0 }}`, `exit={{ opacity: 0, x: -40 }}`, duration 0.35s easeOut. Timer setTimeout 3000ms auto-avance.
- **Desktop grid:** staggered entrance `initial={{ opacity: 0, y: 18 }}`, `whileInView={{ opacity: 1, y: 0 }}`, delay `idx * 0.08`.
- **Card hover:** `whileHover={{ y: -4 }}` con transición CSS suave.
- **Stack tech entrada:** `initial={{ opacity: 0, y: 8 }}`, `whileInView={{ opacity: 1, y: 0 }}`, stagger `techIdx * 0.03`.

### Componentes UI a reutilizar
- `Container.astro` (wrapper con container-dab)
- `SectionTitle.astro` (título de sección consistente)
- `Image` de Astro (`astro:assets`) para imágenes optimizadas

### Data existente a fusionar
- `portfolio.js`: 2 proyectos (Glam studio, Beauty&Glam studio) con mockups en `/public/portafolio/`
- `testimonios.js`: 3 testimonios (Anahi G., Dr. Carlos M., Fernanda R.)
- **Correspondencia real:** Anahi G. (Dueña de Glam Studio) ↔ Glam studio (proyecto). Los otros testimonios no tienen proyecto directo asociado en el portfolio actual.

---

## 3. DATA CENTRALIZADA (src/data/casosExito.js)

Crear archivo nuevo. Exporta un array de casos de éxito fusionados.

```typescript
export interface Metrica {
  valor: string;
  etiqueta: string;
}

export interface CasoExito {
  id: string;
  servicio: 'despierta' | 'crece' | 'domina';
  proyecto: {
    titulo: string;
    tipo: string;
    descripcion: string;
    zona: string;
    url?: string;
    imagen: string; // ruta a /public/portafolio/ o placeholder
    mockup?: string; // ruta a /public/portafolio/ para scroll vertical
  };
  testimonio: {
    nombre: string;
    rol: string;
    mensaje: string;
    esVerificado: boolean;
    badgeLabel: string;
  };
  metricas: Metrica[];
  techStack?: string[];
}

export const casosExito: CasoExito[] = [
  {
    id: 'glam-studio-despierta',
    servicio: 'despierta',
    proyecto: {
      titulo: 'Glam Studio',
      tipo: 'Landing + Chatbot WhatsApp',
      descripcion: 'Landing page promocional con catálogo de servicios de manicura, pestañas y tratamientos estéticos. Chatbot básico que responde horarios, precios y agenda citas automáticamente.',
      zona: 'Metepec',
      url: 'https://glam-studio.vercel.app/',
      imagen: '/portafolio/proyecto-destacado-1.webp',
      mockup: '/portafolio/proyecto-destacado-1-long.webp',
    },
    testimonio: {
      nombre: 'Anahi G.',
      rol: 'Dueña de Glam Studio',
      mensaje: 'Antes respondía todo por WhatsApp sin ningún orden. Con la landing y el chatbot ahora me encuentran fácil, llegan mensajes de clientes nuevos cada semana y yo ya no estoy pegada al celular.',
      esVerificado: true,
      badgeLabel: 'Reseña verificada',
    },
    metricas: [
      { valor: '+40%', etiqueta: 'Mensajes nuevos' },
      { valor: '12 hrs', etiqueta: 'Semanales liberadas' },
      { valor: '7 días', etiqueta: 'Para estar operando' },
    ],
    techStack: ['WhatsApp API', 'Astro', 'Tailwind'],
  },
  {
    id: 'beauty-glam-crece',
    servicio: 'crece',
    proyecto: {
      titulo: 'Beauty & Glam Studio',
      tipo: 'Landing + SEO Local + Ads',
      descripcion: 'Sitio web para salón de estética de alta gama con catálogos de uñas y tratamientos. Optimización de Google Business Profile y configuración inicial de campañas en Meta Ads.',
      zona: 'Metepec',
      url: 'https://beautyandglam-studio.vercel.app/',
      imagen: '/portafolio/proyecto-destacado-2.webp',
      mockup: '/portafolio/proyecto-destacado-2-long.webp',
    },
    testimonio: {
      nombre: 'Mariana R.',
      rol: 'Fundadora de Beauty & Glam',
      mensaje: 'Pasé de depender del boca a boca a tener una lista de espera. La landing no solo se ve profesional, trae clientas que llegan sabiendo exactamente qué servicio quieren.',
      esVerificado: true,
      badgeLabel: 'Reseña verificada',
    },
    metricas: [
      { valor: '+180%', etiqueta: 'Citas agendadas' },
      { valor: '4.9★', etiqueta: 'Google Reviews' },
      { valor: '$3,200', etiqueta: 'Ahorro mensual en ads' },
    ],
    techStack: ['Astro', 'Meta Ads', 'Google Business'],
  },
  {
    id: 'dental-smile-domina',
    servicio: 'domina',
    proyecto: {
      titulo: 'Dental Smile Toluca',
      tipo: 'Ecosistema completo: Web + Chatbot + CRM + Ads',
      descripcion: 'Consultorio dental con landing de 7 secciones, chatbot calificador de urgencias, CRM HubSpot, campañas Meta/Google Ads y dashboard de métricas en tiempo real.',
      zona: 'Toluca',
      imagen: '/portafolio/proyecto-destacado-1.webp', // placeholder: reutilizar o crear placeholder genérico
      // NOTA: Si no hay imagen real para dental, usar un placeholder generado o una imagen genérica de consultorio
    },
    testimonio: {
      nombre: 'Dra. Fernanda L.',
      rol: 'Directora de Dental Smile',
      mensaje: 'Mi asistente solo atiende los pacientes que el chatbot ya calificó. Sé exactamente cuánto cuesta cada paciente nuevo y por primera vez puedo dormir sin revisar el celular cada hora.',
      esVerificado: true,
      badgeLabel: 'Reseña verificada',
    },
    metricas: [
      { valor: '+291%', etiqueta: 'Pacientes nuevos' },
      { valor: '3.4x', etiqueta: 'ROI primer trimestre' },
      { valor: '68%', etiqueta: 'Tasa de retención' },
    ],
    techStack: ['HubSpot', 'WhatsApp API', 'Meta Ads', 'Google Ads'],
  },
];
```

**Notas importantes:**
- Los campos `imagen` y `mockup` apuntan a `/public/portafolio/`. Si una imagen no existe, el componente debe manejarlo graceful (fallback a placeholder o no renderizar imagen).
- El tercer caso (dental) no tiene imagen real en `/public/portafolio/`. Usar un placeholder visual (gradiente + icono 🦷) o una imagen genérica. NO crear nuevas imágenes.
- Las métricas son placeholders. El usuario las actualizará después.
- `techStack` es opcional. Si existe, renderizar badges de tecnologías al final de la card.

---

## 4. COMPONENTES A CREAR

### 4.1 MuroConfianza.astro

```astro
---
import Container from '../ui/Container.astro';
import SectionTitle from '../ui/SectionTitle.astro';
import MuroConfianzaMotion from '../../react/MuroConfianzaMotion.jsx';
import { casosExito } from '../../data/casosExito';
---

<section id="muro-confianza" class="py-16 md:py-section-y bg-dab-surface">
  <Container className="space-y-8 md:space-y-10">
    <SectionTitle
      title="Negocios que dejaron de depender del celular"
      subtitle="No es lo que decimos nosotros. Es lo que dicen las dueñas de salones, dentistas y estéticas que por primera vez durmieron 8 horas seguidas sin revisar WhatsApp."
    />
    <div class="muro-wrapper">
      <MuroConfianzaMotion casos={casosExito} client:visible />
    </div>
  </Container>
</section>

<style is:global>
  .muro-wrapper {
    /* Si necesitas estilos específicos, usar solo clases utilitarias existentes */
  }
</style>
```

**Reglas:**
- Usar `bg-dab-surface` para mantener consistencia con la sección Portfolio original (NO `bg-dab-bg` como Testimonios).
- Usar `Container.astro` y `SectionTitle.astro` exactamente como los usan Portfolio.astro y Testimonios.astro.
- Hidratar `MuroConfianzaMotion` con `client:visible` (mismo patrón que TestimonialsMotion.jsx).

### 4.2 MuroConfianzaMotion.jsx

Componente React que reutiliza la arquitectura de **TestimonialsMotion.jsx** pero adaptada para mostrar cards con imagen de proyecto + testimonio + métricas.

**Estructura requerida:**

```jsx
// Mobile (md:hidden): Carrusel con un caso activo a la vez
// Desktop (hidden md:grid): Grid de 3 columnas (md:grid-cols-3 gap-6)
// Cada card es un <motion.article>
```

**Card individual (estructura HTML):**

```jsx
<motion.article className="...">
  {/* Imagen del proyecto (parte superior) */}
  <div className="relative rounded-xl border border-dab-border bg-black overflow-hidden h-56 sm:h-64">
    {caso.proyecto.imagen ? (
      <img src={caso.proyecto.imagen} alt={caso.proyecto.titulo} className="w-full h-full object-cover object-top" />
    ) : (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dab-accent/5 to-transparent">
        <span className="text-4xl">💼</span>
      </div>
    )}
    {/* Badge de servicio */}
    <div className="absolute top-3 left-3">
      <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ...`}>
        {caso.servicio === 'despierta' && '☀ Despierta'}
        {caso.servicio === 'crece' && '↗ Crece'}
        {caso.servicio === 'domina' && '♔ Domina'}
      </span>
    </div>
    {/* Badge verificado */}
    {caso.testimonio.esVerificado && (
      <div className="absolute top-3 right-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-dab-accent/60 bg-dab-bg/60 px-3 py-1 text-[11px] font-semibold text-dab-text uppercase tracking-[0.14em]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/35 animate-[ping_1.8s_ease-out_infinite]"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          {caso.testimonio.badgeLabel}
        </span>
      </div>
    )}
  </div>

  {/* Contenido del testimonio */}
  <div className="p-4 sm:p-5 flex flex-col gap-3">
    {/* Tipo de proyecto */}
    <span className="text-[10px] sm:text-xs font-body uppercase tracking-wider text-dab-accent/80">
      {caso.proyecto.tipo} · {caso.proyecto.zona}
    </span>

    {/* Cita */}
    <p className="text-sm text-dab-muted leading-relaxed">
      "{caso.testimonio.mensaje}"
    </p>

    {/* Autor */}
    <div className="flex items-center gap-3 pt-2">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-dab-accent to-purple-600 flex items-center justify-center text-white font-bold text-sm">
        {caso.testimonio.nombre.charAt(0)}
      </div>
      <div>
        <div className="text-sm font-semibold text-dab-text">{caso.testimonio.nombre}</div>
        <div className="text-xs text-dab-muted">{caso.testimonio.rol}</div>
      </div>
    </div>

    {/* Métricas */}
    <div className="flex gap-3 pt-3 border-t border-dab-border/60">
      {caso.metricas.map((m, i) => (
        <div key={i} className="text-center flex-1">
          <div className="font-display text-lg sm:text-xl text-dab-accent">{m.valor}</div>
          <div className="text-[10px] text-dab-muted/80 uppercase tracking-wider">{m.etiqueta}</div>
        </div>
      ))}
    </div>

    {/* Tech stack (opcional) */}
    {caso.techStack && (
      <div className="flex flex-wrap gap-2 pt-2">
        {caso.techStack.map((tech, i) => (
          <span key={i} className="inline-flex items-center rounded-full border border-dab-border/70 bg-dab-bg/70 px-2 py-1 text-[10px] font-semibold text-dab-text">
            {tech}
          </span>
        ))}
      </div>
    )}

    {/* Link al proyecto (si existe URL) */}
    {caso.proyecto.url && (
      <a href={caso.proyecto.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-dab-accent text-xs font-semibold hover:underline mt-1">
        Ver sitio en vivo <span>→</span>
      </a>
    )}
  </div>
</motion.article>
```

**Clases Tailwind exactas para la card:**

```
Desktop: relative h-full rounded-2xl border border-dab-accent/60 bg-dab-surface/70 p-0 overflow-hidden flex flex-col shadow-sm transition duration-200 hover:border-dab-accent/80 hover:shadow-dab-soft
Mobile: relative overflow-hidden rounded-2xl border border-dab-accent/60 bg-dab-surface/85 shadow-dab-soft flex flex-col
```

**Nota:** El padding de la card se aplica al contenido interno (`p-4 sm:p-5`), NO al contenedor de la card, para que la imagen llegue hasta el borde superior (patrón de FeaturedProject).

**Animaciones (copiar exactamente de TestimonialsMotion.jsx):**

- **Mobile carrusel:**
  ```jsx
  <AnimatePresence mode="wait">
    <motion.div
      key={currentIndex}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {/* Card aquí */}
    </motion.div>
  </AnimatePresence>
  ```
  Timer: `setTimeout(() => setCurrentIndex((prev) => (prev + 1) % casos.length), 3000)`
  Controles: botones anterior/siguiente + dots (mismo patrón que TestimonialsMotion.jsx).

- **Desktop grid:**
  ```jsx
  {casos.map((caso, idx) => (
    <motion.article
      key={caso.id}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: idx * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className="..."
    >
      {/* Card */}
    </motion.article>
  ))}
  ```

- **Tech stack stagger (si aplica):**
  ```jsx
  initial={{ opacity: 0, y: 8 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ delay: techIdx * 0.03 }}
  ```

**Responsive:**
- Mobile: un carrusel cíclico automático (3s), controles inferiores, un caso visible a la vez.
- Desktop: grid fijo de 3 columnas (`hidden md:grid md:grid-cols-3 gap-6`), todos visibles, animación staggered al entrar en viewport.

---

## 5. MODIFICACIÓN EN INDEX.ASTRO

En `src/pages/index.astro`, **reemplazar** las dos líneas:

```astro
<!-- ANTES -->
<Portfolio />
<Testimonios />
```

Por:

```astro
<!-- DESPUÉS -->
<MuroConfianza />
```

Y agregar el import correspondiente:

```astro
import MuroConfianza from '../components/muro-confianza/MuroConfianza.astro';
```

**NO eliminar** los archivos `Portfolio.astro`, `Testimonios.astro`, `portfolio.js`, `testimonios.js` ni sus componentes React. Solo dejar de usarlos en `index.astro`. Esto permite que el usuario pueda revertir o reutilizar si es necesario.

---

## 6. ESTRUCTURA DE ARCHIVOS A CREAR

```
src/
  data/
    casosExito.ts        ← NUEVO (data fusionada)
  components/
    muro-confianza/
      MuroConfianza.astro  ← NUEVO (contenedor Astro)
  react/
    MuroConfianzaMotion.jsx  ← NUEVO (componente React con animaciones)
```

**NO modificar:**
- `src/components/portfolio/Portfolio.astro`
- `src/components/portfolio/FeaturedProject.astro`
- `src/components/testimonios/Testimonios.astro`
- `src/react/PortfolioSlider.jsx`
- `src/react/TestimonialsMotion.jsx`
- `src/data/portfolio.js`
- `src/data/testimonios.js`

---

## 7. REGLAS DE ESTILO (NO NEGOCIABLES)

- **Fondo de sección:** `bg-dab-surface` (igual que Portfolio original, NO bg-dab-bg de Testimonios).
- **Cards:** Usar exactamente el patrón de borde/fondo/sombra de TestimonialsMotion.jsx:
  - Borde: `border-dab-accent/60` (normal), `border-dab-accent/80` (hover)
  - Fondo: `bg-dab-surface/70` (desktop), `bg-dab-surface/85` (mobile)
  - Sombra: `shadow-sm` (normal), `shadow-dab-soft` (hover)
  - Transición: `transition duration-200`
- **Imagen del proyecto:** Contenedor con `rounded-xl border border-dab-border bg-black overflow-hidden`. Imagen con `w-full object-cover object-top` (o `object-cover` si es altura fija).
- **Badge verificado:** Copiar exactamente el markup y clases de TestimonialsMotion.jsx (incluyendo el ping animation de emerald).
- **Texto cita:** `text-sm text-dab-muted leading-relaxed` (igual que testimonios actuales).
- **Nombre:** `text-sm font-semibold text-dab-text`.
- **Rol:** `text-xs text-dab-muted`.
- **Métricas:** Usar `font-display` para el número (1-2 palabras, OK en display) y `text-[10px] uppercase tracking-wider` para la etiqueta.
- **Tech stack badges:** `inline-flex items-center rounded-full border border-dab-border/70 bg-dab-bg/70 px-2 py-1 text-[10px] font-semibold text-dab-text`.
- **Títulos de sección:** Usar `SectionTitle.astro` con el mismo patrón que usa Portfolio/Testimonios.
- **Avatar:** Si no hay imagen real, usar iniciales en un círculo con gradiente `from-dab-accent to-purple-600` (consistente con el acento del proyecto).
- **NO usar `font-display` para frases largas.** El nombre del proyecto puede ir en `font-display` si es corto (1-2 palabras), pero la cita del testimonio SIEMPRE en `font-body`.

---

## 8. CHECKLIST DE VERIFICACIÓN

- [ ] `npm run build` pasa sin errores de TypeScript ni Astro
- [ ] `index.astro` renderiza correctamente con `<MuroConfianza />` en lugar de Portfolio + Testimonios
- [ ] Sección tiene fondo `bg-dab-surface` consistente con el resto del sitio
- [ ] Mobile: carrusel funciona, auto-avance cada 3s, controles visibles, swipe/click funciona
- [ ] Desktop: grid de 3 columnas, cards con animación staggered al hacer scroll
- [ ] Cards tienen hover consistente (border se ilumina, sombra aumenta, translateY -4px)
- [ ] Imágenes de proyectos se ven correctamente (Glam studio, Beauty&Glam)
- [ ] Badge verificado con ping animation de emerald funciona
- [ ] Métricas se renderizan con `font-display` para números y `font-body` para etiquetas
- [ ] Tech stack badges se renderizan si existen (opcional)
- [ ] Links "Ver sitio en vivo" funcionan y abren en nueva pestaña
- [ ] NO se rompió ninguna otra sección de la landing (Hero, Servicios, Métricas, etc.)
- [ ] Los archivos antiguos (Portfolio.astro, Testimonios.astro, etc.) siguen existiendo y son funcionales si se re-importan
- [ ] El título de sección usa `SectionTitle.astro` y es legible (no grueso ni apretado)

---

## 9. NOTAS DE IMPLEMENTACIÓN

- **Imagen del tercer caso:** Como no hay imagen real de consultorio dental en `/public/portafolio/`, usar un placeholder visual (gradiente + icono emoji o un div con `bg-gradient-to-br from-dab-accent/10 to-transparent` y un icono centrado). NO crear nuevas imágenes.
- **Mockup scroll:** Si el caso tiene `mockup`, mostrar la imagen normal (`imagen`) en la card. El mockup largo con scroll vertical es un patrón de FeaturedProject que NO es necesario replicar en el Muro de Confianza (las cards son más compactas). Si el usuario quiere ver el mockup completo, va al link del proyecto.
- **Carrusel mobile:** Si hay menos de 3 casos, el carrusel debe funcionar correctamente (loop infinito). Si hay exactamente 3, igual funciona.
- **Grid desktop:** Si hay más de 3 casos en el futuro, el grid debe adaptarse (¿2 filas? ¿scroll?). Por ahora, 3 casos = 1 fila perfecta. Si el usuario agrega más casos después, considerar `lg:grid-cols-3` con wrap automático.
- **Accesibilidad:** Las cards deben ser `<article>` semántico. Las imágenes deben tener `alt` descriptivo. Los controles del carrusel deben tener `aria-label`.

---

## 10. DECISIONES A CRITERIO DEL AGENTE

El agente puede decidir:

1. **Altura de la imagen en la card:** `h-56 sm:h-64` es recomendada, pero puede ajustar si se ve muy grande o pequeña en mobile. No debe exceder `h-80`.
2. **Cantidad de métricas por card:** 3 es el default, pero puede mostrar 2-4 según el espacio. Usar `flex` con `flex-1` para distribución equitativa.
3. **Icono de servicio:** Usar emoji (☀, ↗, ♔) o un componente SVG. Los emojis son aceptables si el proyecto ya los usa.
4. **Color del badge de servicio:** Puede usar `bg-dab-amber/10 border-dab-amber/30 text-dab-amber` para Despierta, `bg-dab-cyan/10 border-dab-cyan/30 text-dab-cyan` para Crece, `bg-dab-rose/10 border-dab-rose/30 text-dab-rose` para Domina. Esto es consistente con el design system.
5. **Orden de los casos:** Puede ordenar por servicio (Despierta → Crece → Domina) o por impacto visual. Recomendado: ordenar por servicio para narrativa ascendente.

---

**Empieza leyendo este documento completo, luego lee los componentes existentes (`TestimonialsMotion.jsx`, `FeaturedProject.astro`, `Portfolio.astro`, `Testimonios.astro`) para confirmar los estilos y animaciones exactos antes de escribir código.**
