---
name: dab-design-system
description: Design system tokens, visual standards, and UI guidelines for the dab digital agency landing page. Covers colors, typography, spacing, shadows, border radius, and brand voice.
type: prompt
whenToUse: When the user asks to create or modify UI components, apply styles, define colors, choose fonts, set spacing, or establish visual consistency in the dab project.
disableModelInvocation: false
arguments:
  - element
  - style
---

# dab — Design System & Visual Standards

## Identidad de Marca

**dab** es una agencia digital premium del Valle de Toluca. El diseño debe comunicar:
- **Profesionalismo** sin ser corporativo aburrido
- **Cercanía** local (Valle de Toluca, Metepec, Toluca, Lerma, San Mateo Atenco)
- **Modernidad** tecnológica
- **Confianza** para negocios locales

## Tokens de Diseño

### Colores (Tailwind Config)
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",  // Primary brand color
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
        },
        accent: {
          DEFAULT: "#f59e0b", // Amber for CTAs
          light: "#fbbf24",
          dark: "#d97706",
        },
        surface: {
          DEFAULT: "#ffffff",
          muted: "#f8fafc",
          elevated: "#ffffff",
        },
        text: {
          primary: "#0f172a",
          secondary: "#475569",
          muted: "#94a3b8",
          inverse: "#ffffff",
        },
      },
    },
  },
};
```

### Tipografía
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', "system-ui", "sans-serif"],
        display: ['"Inter"', "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-1": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-2": ["3.5rem", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-3": ["2.5rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" }],
        "heading-1": ["2rem", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "600" }],
        "heading-2": ["1.5rem", { lineHeight: "1.3", fontWeight: "600" }],
        "heading-3": ["1.25rem", { lineHeight: "1.4", fontWeight: "500" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
        "body": ["1rem", { lineHeight: "1.6" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5" }],
        "caption": ["0.75rem", { lineHeight: "1.4" }],
      },
    },
  },
};
```

### Spacing Scale
Usar la escala de Tailwind estándar, pero con estos valores preferidos para secciones:
- Espaciado entre secciones: `py-20` (80px) a `py-32` (128px)
- Padding horizontal contenedor: `px-4 sm:px-6 lg:px-8 xl:px-12`
- Max-width del contenedor: `max-w-7xl` (1280px)
- Gap entre cards: `gap-6` (24px) o `gap-8` (32px)
- Gap entre elementos de formulario: `gap-4` (16px)

### Border Radius
```javascript
borderRadius: {
  sm: "0.375rem",   // 6px
  DEFAULT: "0.5rem", // 8px
  md: "0.75rem",    // 12px
  lg: "1rem",       // 16px
  xl: "1.5rem",     // 24px
  "2xl": "2rem",    // 32px
  full: "9999px",
}
```

### Sombras
```javascript
boxShadow: {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "glow-brand": "0 0 40px -10px rgba(14, 165, 233, 0.3)",
  "glow-accent": "0 0 40px -10px rgba(245, 158, 11, 0.3)",
}
```

## Componentes Base (UI Kit)

### Button
```tsx
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  href?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  href,
}: ButtonProps) {
  const base = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary: "bg-brand-500 text-white hover:bg-brand-600 focus:ring-brand-500 shadow-md hover:shadow-lg",
    secondary: "bg-accent text-white hover:bg-accent-dark focus:ring-accent shadow-md",
    outline: "border-2 border-brand-500 text-brand-600 hover:bg-brand-50 focus:ring-brand-500",
    ghost: "text-brand-600 hover:bg-brand-50 focus:ring-brand-500",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className={classes}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={classes}
    >
      {children}
    </motion.button>
  );
}
```

### Card
```tsx
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "rounded-2xl bg-white p-6 shadow-md border border-slate-100",
        hover && "hover:shadow-xl hover:border-brand-200 transition-shadow duration-300",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
```

### Section Container
```tsx
import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  bg?: "white" | "muted" | "gradient";
}

export function Section({ children, className, id, bg = "white" }: SectionProps) {
  const bgStyles = {
    white: "bg-white",
    muted: "bg-slate-50",
    gradient: "bg-gradient-to-br from-brand-50 to-white",
  };

  return (
    <section id={id} className={cn("py-20 lg:py-32", bgStyles[bg], className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
```

## Reglas Visuales

1. **Contraste:** Texto principal siempre `#0f172a` sobre fondos claros. Nunca gris claro sobre blanco para body text.
2. **Jerarquía:** Máximo 3 niveles de heading por sección (h1 → h2 → h3). Nunca saltar niveles.
3. **Whitespace:** Preferir más espacio que menos. Una sección con poco aire se ve barata.
4. **Imágenes:** Usar `next-gen` formats (WebP/AVIF) con fallback. Lazy loading obligatorio.
5. **Iconos:** Usar `lucide-react` o `heroicons`. Nunca emojis como iconos de UI. Tamaño consistente: 20px inline, 24px buttons, 32px features.
6. **Estados:** Todo elemento interactivo debe tener: default, hover, focus, active, disabled.
7. **Responsive:** Mobile-first. Breakpoints: `sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`.

## Voz y Tono del Contenido

- **Tú, no usted:** "Impulsa tu negocio", no "Impulse su negocio"
- **Acción directa:** Verbos en infinitivo o imperativo. "Crea", "Conecta", "Transforma"
- **Local:** Mencionar el Valle de Toluca naturalmente. "Conocemos el mercado local"
- **Sin relleno:** No usar "soluciones innovadoras de vanguardia". Ser específico.
- **CTAs claros:** "Hablemos por WhatsApp", "Solicita tu cotización", "Ver nuestros servicios"
