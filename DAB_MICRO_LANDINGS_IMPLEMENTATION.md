# DAB — Implementación: Micro-Landings Cruzadas (Propuesta 3)

> **Versión:** 1.0  
> **Fecha:** 2026-06-23  
> **Contexto:** Reporte de proyecto generado previamente. Este documento es la fuente de verdad para la implementación.  
> **Regla de oro:** Si algo en este documento contradice el reporte, este documento prevalece. Si algo no está claro, leer el reporte y el código existente antes de asumir.

---

## 1. OBJETIVO

Implementar la **Propuesta 3: Micro-Landings Cruzadas** para la marca DAB.

- **Landing principal (`index.astro`)**: Reemplazar la sección de servicios actual (3 bullets en cards) por **3 cards teaser** que redirijan a micro-landings independientes.
- **3 Micro-landings**: `/servicios/despierta`, `/servicios/crece`, `/servicios/domina`.
- Cada micro-landing es una página completa con hero, tabs interactivos (React), sub-nav cruzado y cross-sell.

**NO tocar:** Hero, Métricas, Paquetes, Proceso, Portafolio, Testimonios, FAQ, Contacto, CTA Final, Footer. **Solo** la sección `Services.astro` y crear los nuevos archivos.

---

## 2. STACK Y TOKENS DEL PROYECTO (del reporte)

### Framework
- Astro 5.16.0 (static output, adapter Vercel)
- React 19.2.0 (`@astrojs/react`)
- Tailwind CSS 3.4.18 (`@astrojs/tailwind`)
- Framer Motion 12.23.24 ✅ disponible
- GSAP 3.15.0 ✅ disponible
- **NO View Transitions** (no habilitadas en Astro config)

### Colores Tailwind (usar ÚNICAMENTE estos)
```
dab-bg: #05060A
dab-surface: #0B0D14
dab-surface-elevated: #11131C
dab-accent: #4C7FFF
dab-accent-soft: rgba(76, 127, 255, 0.1)
dab-accent-warm: #FF7A59
dab-text: #E5E7EB
dab-muted: #9CA3AF
dab-border: #1F2933
dab-rose: #F43F5E
dab-amber: #F59E0B
dab-cyan: #22D3EE
```

### Tipografías (usar ÚNICAMENTE estas)
```
font-display: ['Thunder', 'Impact', 'Arial Black', 'sans-serif']
font-body: ['Inter', 'system-ui', 'ui-sans-serif', 'sans-serif']
font-mono: ['JetBrains Mono', 'Fira Code', 'monospace']
font-serif: ['Cormorant Garamond', 'Georgia', 'serif']
```

### Clases utilitarias existentes (reutilizar)
- `.glass-card` — backdrop blur 24px, fondo rgba(11,13,20,0.6), borde #1F2933
- `.container-dab` — max-w-6xl mx-auto px-4 sm:px-5
- `.hide-scrollbar` — oculta scrollbars
- `.text-glow` — sombra de texto brillante
- `.animate-pulse-dot` — anillo pulsante
- `shadow-dab-soft` — 0 18px 45px rgba(0,0,0,0.45)
- `bg-number-glow` — gradiente 135deg #4C7FFF → #7B61FF

### Layout base
- Archivo: `src/layouts/DefaultLayout.astro`
- Importa: `../styles/base.css`, `WHATSAPP_URL` desde `../config/contact`
- Body: `relative bg-dab-bg text-dab-text`
- Dark mode forzado: `<meta name="color-scheme" content="dark only" />`
- **NO** tiene `<ViewTransitions />`

### Componentes UI existentes (reutilizar si aplica)
- `Container.astro` — wrapper con `container-dab`
- `SectionTitle.astro` — título de sección reutilizable
- `Button.astro` — botón reutilizable
- `Nav.astro` — navegación principal
- `Footer.astro` — footer

### Data existente
- `src/data/servicios.js` — data actual de servicios (3 items con id, titulo, descripcion, bullets, tag, tagColor)
- **NO** Content Collections
- `src/config/contact.js` — exporta `WHATSAPP_URL`

---

## 3. ASIGNACIÓN DE COLORES A SERVICIOS

Basado en los tokens existentes del proyecto:

| Servicio | Token principal | Uso |
|---|---|---|
| **Despierta** | `dab-amber` | Badge, tabs activos, iconos, gradientes |
| **Crece** | `dab-cyan` | Badge, tabs activos, iconos, gradientes |
| **Domina** | `dab-rose` | Badge, tabs activos, iconos, gradientes |

**Nota:** En los ejemplos anteriores usábamos `violet` para Domina, pero el proyecto real tiene `dab-rose` (#F43F5E) como token rojo intenso. Usar `dab-rose` para Domina para mantener consistencia con el design system existente.

---

## 4. ESTRUCTURA DE ARCHIVOS A CREAR

```
src/
  data/
    services.ts              ← NUEVO (extiende/centraliza data para micro-landings)
  pages/
    servicios/
      despierta.astro        ← NUEVO
      crece.astro            ← NUEVO
      domina.astro           ← NUEVO
  components/
    services/
      ServiceCard.astro        ← NUEVO (card teaser para index)
      ServicePageLayout.astro  ← NUEVO (layout compartido de micro-landing)
    react/
      ServiceSubNav.tsx      ← NUEVO (sticky sub-nav entre servicios)
      ServiceTabs.tsx        ← NUEVO (tabs interactivos: Planes, Incluye, Proceso, FAQ)
      PlanCard.tsx           ← NUEVO (card de plan con precio placeholder)
      ProcessStep.tsx        ← NUEVO (paso de timeline)
  layouts/
    (NO TOCAR DefaultLayout.astro)
```

**MODIFICAR ÚNICAMENTE:**
- `src/components/services/Services.astro` — reemplazar contenido por cards teaser

---

## 5. DATA CENTRALIZADA (src/data/services.ts)

Crear archivo nuevo que exporte la data estructurada. **Contenido genérico/placeholder** (Lorem ipsum, $XXX, etc.).

```typescript
export interface Plan {
  id: string;
  name: string;
  price: string;
  description: string;
  popular?: boolean;
  features: string[];
  ctaText: string;
}

export interface Service {
  slug: string;
  name: string;
  icon: string;
  color: 'amber' | 'cyan' | 'rose';
  tagline: string;
  teaser: string;
  badge: string;
  description: string;
  tabs: {
    planes: Plan[];
    incluye: {
      deliverables: string[];
      support: string[];
    };
    proceso: {
      step: number;
      title: string;
      description: string;
    }[];
    faq: {
      question: string;
      answer: string;
    }[];
  };
}

export const services: Service[] = [
  {
    slug: 'despierta',
    name: 'Despierta',
    icon: '☀',
    color: 'amber',
    tagline: 'Automatización de procesos clave',
    teaser: 'Despierta el potencial dormido de tu operación con flujos inteligentes.',
    badge: 'Automatización',
    description: 'Automatiza lo repetitivo. Libera tu tiempo para lo que realmente importa. Tus sistemas trabajan mientras tú descansas.',
    tabs: {
      planes: [
        {
          id: 'starter',
          name: 'Starter',
          price: '$XXX/mes',
          description: 'Para emprendedores que inician',
          features: ['2 flujos automatizados', '1 integración', 'Soporte por email', 'Reporte mensual'],
          ctaText: 'Elegir Starter',
        },
        {
          id: 'business',
          name: 'Business',
          price: '$YYY/mes',
          description: 'Para negocios en crecimiento',
          popular: true,
          features: ['5 flujos automatizados', '3 integraciones', 'Soporte prioritario', 'Dashboard en tiempo real', '1 revisión mensual'],
          ctaText: 'Elegir Business',
        },
        {
          id: 'enterprise',
          name: 'Enterprise',
          price: 'Personalizado',
          description: 'Para operaciones complejas',
          features: ['Flujos ilimitados', 'Integraciones custom', 'SLA garantizado', 'Dev dedicado', 'Capacitación equipo'],
          ctaText: 'Contactar',
        },
      ],
      incluye: {
        deliverables: [
          'Documentación técnica completa de flujos',
          'Manual de operación del sistema',
          'Video tutoriales de administración',
          'Backup y redundancia configurada',
        ],
        support: [
          '30 días de ajustes sin costo adicional',
          'Monitoreo de errores activo',
          'Optimización de rendimiento mensual',
          'Escalabilidad garantizada',
        ],
      },
      proceso: [
        { step: 1, title: 'Diagnóstico', description: 'Mapeamos tus procesos manuales y detectamos cuáles automatizar primero.' },
        { step: 2, title: 'Diseño de flujos', description: 'Creamos el blueprint de automatización con herramientas seleccionadas.' },
        { step: 3, title: 'Implementación', description: 'Construimos, integramos y testeamos cada flujo en tu operación real.' },
        { step: 4, title: 'Entrega y optimización', description: 'Capacitamos a tu equipo y ajustamos según el uso real.' },
      ],
      faq: [
        { question: '¿Cuánto tiempo tarda la primera automatización?', answer: 'La primera automatización está funcionando en 7 días hábiles desde el diagnóstico.' },
        { question: '¿Necesito cambiar mis herramientas actuales?', answer: 'No. Integramos con las herramientas que ya usas: WhatsApp, Google Calendar, CRMs populares, etc.' },
        { question: '¿Qué pasa si algo deja de funcionar?', answer: 'Incluimos 30 días de ajustes post-entrega y monitoreo activo de errores.' },
      ],
    },
  },
  {
    slug: 'crece',
    name: 'Crece',
    icon: '↗',
    color: 'cyan',
    tagline: 'Guía estratégica para escalar',
    teaser: 'Estructura, métricas y dirección clara para crecer sin perder el control.',
    badge: 'Estrategia',
    description: 'Estructura, métricas y dirección clara para escalar sin perder el control de tu operación.',
    tabs: {
      planes: [
        {
          id: 'starter',
          name: 'Advisory',
          price: '$XXX/mes',
          description: 'Acompañamiento estratégico',
          features: ['1 sesión estratégica semanal', 'Plan de acción mensual', 'KPIs definidos y medidos', 'Chat de soporte directo'],
          ctaText: 'Elegir Advisory',
        },
        {
          id: 'business',
          name: 'Growth',
          price: '$YYY/mes',
          description: 'Escala con estructura',
          popular: true,
          features: ['2 sesiones semanales', 'Playbooks operativos', 'Dashboard de métricas', 'Revisión de funnel completo', 'Acompañamiento equipo'],
          ctaText: 'Elegir Growth',
        },
        {
          id: 'enterprise',
          name: 'Scale',
          price: 'Personalizado',
          description: 'Transformación completa',
          features: ['Acceso ilimitado', 'Estructura organizacional', 'OKRs trimestrales', 'Workshops presenciales', 'Hiring strategy'],
          ctaText: 'Contactar',
        },
      ],
      incluye: {
        deliverables: [
          'Mapa de procesos de negocio',
          'Plan de crecimiento trimestral',
          'Scorecard de métricas clave',
          'Playbooks por área funcional',
        ],
        support: [
          'Claridad en decisiones diarias',
          'Equipo alineado a objetivos',
          'Crecimiento predecible y medible',
          'Menos fricción operativa',
        ],
      },
      proceso: [
        { step: 1, title: 'Auditoría', description: 'Analizamos tu operación actual, cuellos de botella y oportunidades de escala.' },
        { step: 2, title: 'Blueprint', description: 'Diseñamos la estructura objetivo con roles, procesos y métricas claras.' },
        { step: 3, title: 'Implementación', description: 'Acompañamos la transición con sprints semanales de ejecución.' },
        { step: 4, title: 'Optimización', description: 'Ajustamos según datos reales y escalamos lo que funciona.' },
      ],
      faq: [
        { question: '¿Cuántas sesiones incluye?', answer: 'Depende del plan: Advisory incluye 1 sesión semanal, Growth incluye 2.' },
        { question: '¿Trabajan con equipos grandes?', answer: 'Sí. El plan Scale incluye estructura organizacional completa y workshops presenciales.' },
        { question: '¿Cómo miden los resultados?', answer: 'Definimos KPIs medibles desde el primer mes y usamos un scorecard de seguimiento.' },
      ],
    },
  },
  {
    slug: 'domina',
    name: 'Domina',
    icon: '♔',
    color: 'rose',
    tagline: 'Transformación total del negocio',
    teaser: 'Domina tu mercado con sistemas avanzados y ventaja competitiva real.',
    badge: 'Transformación',
    description: 'Transformación total. Sistemas avanzados y ventaja competitiva real en tu mercado. No compitas. Domina.',
    tabs: {
      planes: [
        {
          id: 'starter',
          name: 'Core',
          price: '$XXX/mes',
          description: 'Transformación estructurada',
          features: ['Automatización + Estrategia', '1 sistema custom', 'Reportes ejecutivos', 'Quarterly reviews'],
          ctaText: 'Elegir Core',
        },
        {
          id: 'business',
          name: 'Elite',
          price: '$YYY/mes',
          description: 'Dominio total del mercado',
          popular: true,
          features: ['Todo lo de Core', 'IA & Machine Learning', '3 sistemas integrados', 'CMO/CTO as a service', 'Acceso 24/7'],
          ctaText: 'Elegir Elite',
        },
        {
          id: 'enterprise',
          name: 'Sovereign',
          price: 'Personalizado',
          description: 'Para líderes de industria',
          features: ['Equipo dedicado DAB', 'Infraestructura propia', 'Roadmap anual', 'M&A strategy', 'Board presentations'],
          ctaText: 'Contactar',
        },
      ],
      incluye: {
        deliverables: [
          'Plataforma tecnológica propia',
          'Estrategia de mercado 12 meses',
          'Sistema de inteligencia competitiva',
          'Protocolos de escalabilidad',
        ],
        support: [
          'Velocidad de respuesta 10x',
          'Costos operativos -40%',
          'Toma de decisiones con datos',
          'Barreras de entrada para competidores',
        ],
      },
      proceso: [
        { step: 1, title: 'Inmersión', description: 'Nos sumergimos en tu negocio, mercado y competencia durante 2 semanas intensivas.' },
        { step: 2, title: 'Arquitectura', description: 'Diseñamos los sistemas, procesos y estrategia de dominio para tu nicho.' },
        { step: 3, title: 'Construcción', description: 'Implementamos tecnología, automatizaciones y playbooks de ejecución.' },
        { step: 4, title: 'Dominio', description: 'Medimos, optimizamos y escalamos hasta alcanzar liderazgo de mercado.' },
      ],
      faq: [
        { question: '¿Cuánto dura la transformación completa?', answer: 'Depende del tamaño de tu operación. Lo típico es 3-6 meses para resultados medibles.' },
        { question: '¿Incluyen desarrollo de software?', answer: 'Sí. Los planes Core, Elite y Sovereign incluyen sistemas custom según el alcance.' },
        { question: '¿Qué pasa después de los 12 meses?', answer: 'Renovación con roadmap actualizado o transición a operación interna con capacitación.' },
      ],
    },
  },
];

export const globalPlans = [
  { id: 'starter', name: 'Starter', price: '$XXX/mes', description: 'Para emprendedores que inician' },
  { id: 'business', name: 'Business', price: '$YYY/mes', description: 'Para negocios en crecimiento', popular: true },
  { id: 'enterprise', name: 'Enterprise', price: 'Personalizado', description: 'Para operaciones complejas' },
];
```

**Nota sobre planes:** Los planes son **globales** (mismos 3 para todos los servicios), pero cada servicio puede tener **nombres personalizados** para los planes (ej: Despierta usa Starter/Business/Enterprise; Crece usa Advisory/Growth/Scale; Domina usa Core/Elite/Sovereign). El precio y la estructura de 3 planes es consistente.

---

## 6. COMPONENTES REACT (src/components/react/)

### 6.1 ServiceSubNav.tsx

Sub-nav sticky para saltar entre los 3 servicios. **A criterio del agente:** puede ser pills horizontales, barra con glassmorphism, o lo que mejor UX ofrezca. Debe:

- Posicionarse debajo del `Nav.astro` principal (el header existe, medir su altura real o usar `top` relativo)
- Mostrar: Despierta | Crece | Domina
- Resaltar el servicio activo con su color token (`dab-amber`, `dab-cyan`, `dab-rose`)
- Usar `glass-card` o estilos consistentes con el proyecto
- Links: `<a href="/servicios/despierta">` (rutas reales, NO hash routing)
- Responsive: en mobile, puede ser scrollable horizontal o hamburguesa

### 6.2 ServiceTabs.tsx

Tabs interactivos con React. 4 tabs:

1. **Planes** — Renderiza `PlanCard.tsx` para cada plan del servicio
2. **Qué incluye** — Dos columnas: Entregables + Soporte post-entrega
3. **Proceso** — Renderiza `ProcessStep.tsx` para cada paso
4. **FAQ** — Acordeón o lista expandible

Requisitos:
- Cambio de tab sin recarga de página (state de React)
- Animación de entrada del contenido con Framer Motion (fade + slideY)
- Tab activo resaltado con el color del servicio
- Responsive: en mobile, tabs scrollables horizontalmente

### 6.3 PlanCard.tsx

Card de plan de precios:
- Muestra: nombre, precio (placeholder), descripción, lista de features, CTA
- Plan "popular" (business) tiene badge "MÁS POPULAR" y borde/botón destacado
- CTA: botón con texto configurable (`ctaText`)
- Hover: escala sutil o shadow incrementado
- Usar colores del servicio para el botón del plan popular

### 6.4 ProcessStep.tsx

Paso de timeline:
- Número circular con fondo del color del servicio (opacidad baja)
- Título + descripción
- Línea conectora entre pasos (excepto el último)
- Animación de entrada con Framer Motion (stagger)

---

## 7. COMPONENTES ASTRO

### 7.1 ServiceCard.astro (para index.astro)

Card teaser que reemplaza la sección actual de servicios. Debe:

- Usar la data de `services.ts`
- Mostrar: icono, nombre, tagline, teaser, badge de categoría
- CTA: "Ver planes →" que linkea a `/servicios/[slug]`
- Estilo: `glass-card` o similar, con borde sutil
- Hover: efecto sutil (border accent, shadow, o translateY)
- Responsive: en mobile, puede ser stack vertical; en desktop, grid de 3 columnas
- **NO mostrar precios** en esta card. Solo teaser y CTA.

### 7.2 ServicePageLayout.astro (layout compartido de micro-landing)

Template reutilizable para las 3 páginas de servicio. Recibe:
- `service` (objeto del servicio actual)
- Renderiza:
  1. Hero del servicio (badge, título, descripción, 2 CTAs)
  2. `ServiceSubNav.tsx` (client:load)
  3. `ServiceTabs.tsx` (client:load) con todas las tabs
  4. Cross-sell section (links a los otros 2 servicios)
  5. Footer (importar `Footer.astro` existente)

Usa `DefaultLayout.astro` como layout padre. No crear layout nuevo.

Hero del servicio:
- Badge: icono + categoría (ej: "☀ Automatización")
- Título: `font-display`, grande, tracking-tight
- Descripción: `font-body`, text-dab-muted
- CTAs:
  - Primario: "Ver planes" (scroll o tab switch)
  - Secundario: "Agendar diagnóstico" (link a WhatsApp/Calendly)

Cross-sell:
- Sección al final: "¿Necesitas algo más?"
- 2 cards mini con los otros servicios
- Link a cada micro-landing

---

## 8. PÁGINAS (src/pages/servicios/)

### 8.1 despierta.astro
```astro
---
import DefaultLayout from '../../layouts/DefaultLayout.astro';
import ServicePageLayout from '../../components/services/ServicePageLayout.astro';
import { services } from '../../data/services';

const service = services.find(s => s.slug === 'despierta');
---

<DefaultLayout title={`${service.name} — DAB`} description={service.teaser}>
  <ServicePageLayout service={service} />
</DefaultLayout>
```

### 8.2 crece.astro
Similar, con `slug === 'crece'`.

### 8.3 domina.astro
Similar, con `slug === 'domina'`.

---

## 9. MODIFICACIÓN ÚNICA EN INDEX.ASTRO

### 9.1 Reemplazar `src/components/services/Services.astro`

El componente actual tiene mobile carousel + desktop grid con bullets. Reemplazar por:

```astro
---
import Container from '../ui/Container.astro';
import SectionTitle from '../ui/SectionTitle.astro';
import { services } from '../../data/services';
---

<section id="servicios" class="py-16 md:py-section-y bg-dab-bg">
  <Container className="space-y-8 md:space-y-10">
    <SectionTitle
      title="Elige tu nivel de juego"
      subtitle="Tres servicios diseñados para transformar tu negocio. Explora cada uno y descubre el plan que te lleva al siguiente nivel."
    />

    <!-- Desktop: Grid 3 columnas -->
    <div class="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6">
      {services.map((service) => (
        <a href={`/servicios/${service.slug}`} class="group block">
          <article class="glass-card rounded-2xl p-6 sm:p-8 transition duration-300 hover:border-dab-accent/40 hover:shadow-dab-soft h-full flex flex-col">
            <div class={`w-12 h-12 rounded-xl bg-dab-${service.color}/10 border border-dab-${service.color}/20 flex items-center justify-center text-2xl mb-4`}>
              {service.icon}
            </div>
            <div class="space-y-2 flex-1">
              <span class={`text-xs font-semibold uppercase tracking-wider text-dab-${service.color}`}>
                {service.badge}
              </span>
              <h3 class="font-display text-2xl font-bold tracking-tight">
                {service.name}
              </h3>
              <p class="font-body text-sm text-dab-muted leading-relaxed">
                {service.teaser}
              </p>
            </div>
            <div class={`mt-6 inline-flex items-center text-sm font-semibold text-dab-${service.color} group-hover:gap-2 transition-all`}>
              <span>Ver planes</span>
              <span class="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </div>
          </article>
        </a>
      ))}
    </div>

    <!-- Mobile: Stack vertical o scroll horizontal -->
    <div class="md:hidden space-y-4">
      {services.map((service) => (
        <a href={`/servicios/${service.slug}`} class="group block">
          <article class="glass-card rounded-2xl p-5 transition duration-300 active:scale-[0.98]">
            <div class="flex items-start gap-4">
              <div class={`w-10 h-10 rounded-lg bg-dab-${service.color}/10 border border-dab-${service.color}/20 flex items-center justify-center text-xl shrink-0`}>
                {service.icon}
              </div>
              <div class="flex-1">
                <span class={`text-xs font-semibold uppercase tracking-wider text-dab-${service.color}`}>
                  {service.badge}
                </span>
                <h3 class="font-display text-xl font-bold tracking-tight mt-1">
                  {service.name}
                </h3>
                <p class="font-body text-sm text-dab-muted leading-relaxed mt-1">
                  {service.teaser}
                </p>
                <div class={`mt-3 inline-flex items-center text-sm font-semibold text-dab-${service.color}`}>
                  <span>Ver planes</span>
                  <span class="ml-1">→</span>
                </div>
              </div>
            </div>
          </article>
        </a>
      ))}
    </div>
  </Container>
</section>
```

**IMPORTANTE:** El componente `Services.astro` actual importa `servicios` desde `../../data/servicios.js`. El nuevo `Services.astro` debe importar desde `../../data/services` (el nuevo archivo TypeScript). **No eliminar** el archivo `servicios.js` viejo aún; solo dejar de usarlo en este componente.

---

## 10. DECISIONES A CRITERIO DEL AGENTE

El agente tiene libertad para decidir los siguientes aspectos técnicos, siempre respetando los tokens y componentes existentes:

1. **Sub-nav sticky**: ¿Pills debajo del header? ¿Barra lateral en desktop? ¿Scrollable horizontal en mobile? Elegir lo más usable.
2. **Tabs interactivos**: ¿Pills con underline? ¿Botones con fondo? ¿Accordion en mobile para FAQ? Elegir lo más Astro-idiomático y usable.
3. **Transiciones entre páginas**: Dado que NO hay View Transitions habilitadas, usar Framer Motion para animaciones de entrada en cada micro-landing, o GSAP si es más apropiado para el caso.
4. **Estructura de componentes**: ¿`ServicePageLayout.astro` como template compartido? ¿O cada página tiene su propio layout inline? Elegir lo más mantenible.
5. **Animaciones de entrada**: Usar Framer Motion (`motion.div`, `AnimatePresence`) para tabs y secciones. O usar `FadeIn.tsx` existente si aplica.
6. **Responsive**: Mobile-first. En mobile, el sub-nav puede ser scrollable horizontal. Las cards de planes pueden apilarse o hacer scroll horizontal.
7. **CTA de WhatsApp**: Usar `WHATSAPP_URL` desde `../../config/contact` (mismo patrón que usa el `Services.astro` actual).

---

## 11. RESTRICCIONES ABSOLUTAS

- ❌ **NO tocar** `Hero.astro`, `MetricsSection.astro`, `Paquetes.astro`, `Proceso.astro`, `Portfolio.astro`, `Testimonios.astro`, `Faq.astro`, `ContactSection.astro`, `CTA.astro`, `Footer.astro`, `Nav.astro`
- ❌ **NO crear** nuevos colores, tipografías, tokens de diseño, o clases CSS globales
- ❌ **NO hardcodear** contenido real en componentes. Usar la data de `services.ts` (placeholder)
- ❌ **NO instalar** nuevas dependencias sin justificar (Framer Motion y GSAP ya están)
- ❌ **NO modificar** `astro.config.mjs`, `tailwind.config.cjs`, `tsconfig.json`, `postcss.config.js`
- ❌ **NO eliminar** archivos de data existentes (`servicios.js`, etc.) — solo dejar de usarlos en `Services.astro`
- ❌ **NO habilitar** View Transitions si no están en el proyecto
- ✅ **SÍ usar** `DefaultLayout.astro` como layout padre de todas las nuevas páginas
- ✅ **SÍ usar** `Container.astro`, `SectionTitle.astro`, `Button.astro` si aplica
- ✅ **SÍ usar** `glass-card`, `shadow-dab-soft`, y clases utilitarias existentes
- ✅ **SÍ hidratar** componentes React con `client:load` o `client:visible` según corresponda
- ✅ **SÍ respetar** el dark mode forzado del proyecto

---

## 12. CHECKLIST DE VERIFICACIÓN

Antes de dar por terminada la implementación, verificar:

- [ ] `npm run build` ejecuta sin errores de TypeScript o Astro
- [ ] `index.astro` renderiza correctamente con las nuevas cards teaser
- [ ] `/servicios/despierta`, `/servicios/crece`, `/servicios/domina` renderizan correctamente
- [ ] Sub-nav permite navegar entre los 3 servicios sin volver al inicio
- [ ] Tabs interactivos (React) funcionan: Planes, Qué incluye, Proceso, FAQ
- [ ] Plan "popular" (Business/Elite/Growth) se destaca visualmente
- [ ] Cross-sell al final de cada micro-landing muestra los otros 2 servicios
- [ ] Mobile: cards se apilan, tabs son accesibles, sub-nav no rompe layout
- [ ] Desktop: grid de 3 cards en index, sub-nav visible, tabs horizontales
- [ ] Colores usados: `dab-amber` (Despierta), `dab-cyan` (Crece), `dab-rose` (Domina)
- [ ] Tipografías: `font-display` para títulos, `font-body` para cuerpo
- [ ] Ninguna otra sección de la landing se rompió o cambió visualmente
- [ ] Data centralizada en `services.ts` es la única fuente de contenido
- [ ] WhatsApp CTA usa `WHATSAPP_URL` desde `config/contact`

---

## 13. NOTAS DE CONTEXTO

- El proyecto usa **output static** con adapter Vercel. Las rutas `/servicios/*` se generan en build time.
- El proyecto **NO tiene** Content Collections. La data es JS/TS puro.
- El header (`Nav.astro`) ya existe. El sub-nav debe posicionarse debajo de él. Si el header tiene altura fija, usar `top` relativo o sticky con offset.
- `StaggerContainer` y `StaggerItem` existen en `src/components/animations/` pero **no se usan** en la landing actual. Pueden usarse o no; a criterio del agente.
- `FadeIn.tsx` existe y se usa en `HeroContent.tsx` y `FaqClient.tsx`. Puede reutilizarse para animaciones de entrada en las micro-landings.
- El proyecto tiene `MobileNav.jsx` para navegación mobile. El sub-nav debe ser compatible con esta navegación existente.
- Los componentes React viven en `src/components/react/` (aunque también hay algunos en `src/components/animations/` y `src/components/hero/`). Para consistencia, los nuevos componentes React de servicios pueden ir en `src/components/react/` o `src/components/services/`. A criterio del agente.
