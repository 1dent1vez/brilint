---
name: dab-vibecoding
description: Vibecoding workflow and best practices for rapidly building and iterating on the dab agency landing page. Covers rapid prototyping, component scaffolding, style iteration, animation polish, and deployment flow.
type: prompt
whenToUse: When the user wants to rapidly build, prototype, iterate, or polish frontend features for the dab project in a vibecoding flow.
disableModelInvocation: false
arguments:
  - feature
  - scope
---

# dab — Vibecoding Workflow

## Filosofía

Vibecoding para dab significa: **moverse rápido, mantener la calidad, no perder el norte.** Cada iteración debe dejar el sitio mejor, no más roto.

## Flujo de Vibecoding (8 pasos)

### 1. Prompt Claro
Antes de codear, definir exactamente qué se va a construir:
```
"Agrega una sección de 'Servicios Destacados' con 3 cards, 
 cada una con icono, título, descripción y link a WhatsApp. 
 Las cards deben tener animación de entrada staggered y 
 hover con elevación y glow. Mobile-first."
```

### 2. Scaffold Rápido
Crear la estructura mínima funcional primero. No preocuparse por estilos perfectos todavía.
```tsx
// Paso 1: Estructura HTML semántica
// Paso 2: Props y tipado
// Paso 3: Datos de ejemplo (mock data)
// Paso 4: Render básico sin estilos
```

### 3. Estilos Base
Aplicar Tailwind con las clases utilitarias del design system:
- Usar tokens de color (`bg-brand-500`, `text-slate-900`)
- Aplicar spacing consistente (`py-20`, `gap-6`, `max-w-7xl`)
- Responsive primero (`grid-cols-1 md:grid-cols-3`)

### 4. Animaciones
Envolver con componentes de animación reutilizables:
```tsx
<FadeIn direction="up" delay={0.1}>
  <StaggerContainer staggerDelay={0.1}>
    {items.map(item => (
      <StaggerItem key={item.id}>
        <Card hover>{/* content */}</Card>
      </StaggerItem>
    ))}
  </StaggerContainer>
</FadeIn>
```

### 5. Interactividad
Agregar estados, event handlers, y feedback visual:
- Hover effects (`whileHover`, `whileTap`)
- Form states (idle, submitting, success, error)
- Loading skeletons o spinners
- Toast notifications para acciones

### 6. Responsive Check
Verificar en 3 breakpoints mínimo:
- **Mobile** (< 640px): Todo en una columna, texto legible, botones tocables (min 44px)
- **Tablet** (640px - 1024px): Grid de 2 columnas, spacing ajustado
- **Desktop** (> 1024px): Layout final, animaciones completas, max-width centrado

### 7. Polish
Los detalles que separan lo amateur de lo profesional:
- [ ] Transiciones suaves entre estados (200-300ms)
- [ ] Focus rings visibles para accesibilidad
- [ ] Empty states y error states diseñados
- [ ] Loading states elegantes
- [ ] Micro-interacciones (iconos que cambian, badges que aparecen)
- [ ] Consistencia tipográfica (tamaños, pesos, colores de texto)

### 8. Build & Preview
```bash
npm run build    # Verificar que compila sin errores
npm run preview  # Revisar en producción local
```

## Comandos de Vibecoding Rápido

| Quiero... | Comando / Acción |
|-----------|-----------------|
| Crear un componente nuevo | `New-Item -Path "src/components/sections/Nombre.tsx"` + scaffold |
| Agregar una sección | Copiar patrón de `Section` + `FadeIn` + contenido |
| Cambiar colores de marca | Editar `tailwind.config.js` → `theme.extend.colors` |
| Probar animación | Envolver en `<FadeIn>` o `<StaggerContainer>` |
| Ajustar spacing | Modificar `py-`, `px-`, `gap-`, `space-y-` |
| Hacer responsive | Agregar breakpoints `sm:`, `md:`, `lg:` |
| Agregar icono | Buscar en `lucide-react`, importar, usar con `w-5 h-5` |
| Conectar WhatsApp | Importar `WHATSAPP_URL` desde `@/config/contact` |
| Deploy a preview | `git push` → Vercel preview deployment automático |

## Anti-patrones de Vibecoding

- ❌ **Codear sin plan:** Escribir CSS a ciegas sin saber el layout final
- ❌ **Over-engineering:** Usar context, redux, o state management complejo para una landing page
- ❌ **Copy-paste sin entender:** Pegar código de StackOverflow sin adaptar al design system
- ❌ **Ignorar mobile:** Desarrollar solo en desktop y "arreglar después"
- ❌ **Dejar console.logs:** Limpiar SIEMPRE antes de commit
- ❌ **Hardcodear datos:** Usar arrays de datos, no strings inline
- ❌ **Olvidar accesibilidad:** Sin alt text, sin focus states, sin labels

## Plantilla de Componente Rápido

```tsx
// src/components/sections/__NAME__.tsx
import { FadeIn } from "@/components/animations/FadeIn";
import { Section } from "@/components/ui/Section";

interface __NAME__Props {
  // definir props
}

export function __NAME__({}: __NAME__Props) {
  return (
    <Section id="__name__" bg="white">
      <FadeIn>
        {/* Contenido aquí */}
      </FadeIn>
    </Section>
  );
}
```

## Commit Messages (Conventional Commits)

```
feat(hero): add animated background gradient
fix(navbar): mobile menu not closing on link click
style(services): adjust card spacing on tablet
refactor(contact): extract form validation to hook
perf(images): convert hero to WebP with fallback
chore(deps): update framer-motion to latest
```
