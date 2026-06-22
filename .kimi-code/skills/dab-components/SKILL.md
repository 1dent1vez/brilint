---
name: dab-components
description: Reusable component patterns and UI building blocks for the dab agency landing page. Covers section layouts, navigation, hero, services grid, testimonials, contact form, and footer patterns.
type: prompt
whenToUse: When the user asks to create, modify, or add new sections, layouts, navigation, hero banners, service cards, testimonials, contact forms, or any reusable UI component for the dab project.
disableModelInvocation: false
arguments:
  - section
  - component
---

# dab — Component Patterns & UI Building Blocks

## Estructura de Componentes

```
src/components/
├── ui/                 # Atómicos: Button, Card, Input, Badge, Icon
├── animations/         # FadeIn, StaggerContainer, TextReveal
├── sections/           # Secciones de la landing page
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── About.tsx
│   ├── Testimonials.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
└── layouts/            # Astro layouts (BaseLayout)
```

## Reglas de Componentes

1. **Un componente, un archivo.** Nunca múltiples componentes exportados del mismo archivo (salvo variants estrechamente relacionados como `Button` + `ButtonIcon`).
2. **Props tipadas.** Interface explícita, nunca inline types.
3. **Composición sobre configuración.** Preferir `children` y slots sobre props booleanas masivas.
4. **Forward refs cuando sea necesario.** Para inputs y elementos que necesitan focus programático.
5. **Default exports para pages, named exports para components.**

## Patrones de Sección

### Hero Section
```tsx
// src/components/sections/Hero.tsx
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/Button";
import { WHATSAPP_URL } from "@/config/contact";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-brand-900">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn direction="up" delay={0}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-500/20 text-brand-300 text-sm font-medium mb-6">
            Agencia Digital en el Valle de Toluca
          </span>
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight">
            Impulsa tu negocio
            <span className="block text-brand-400">con diseño digital</span>
          </h1>
        </FadeIn>

        <FadeIn direction="up" delay={0.2}>
          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
            Creamos sitios web, tiendas en línea y estrategias digitales 
            diseñadas para convertir visitantes en clientes.
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={0.3}>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href={WHATSAPP_URL("Hola, quiero una cotización")}>
              Cotiza tu proyecto
            </Button>
            <Button variant="outline" size="lg" href="#servicios">
              Ver servicios
            </Button>
          </div>
        </FadeIn>

        {/* Trust badges */}
        <FadeIn direction="up" delay={0.4}>
          <div className="mt-16 flex items-center justify-center gap-8 text-slate-400">
            <span className="text-sm">Confían en nosotros:</span>
            {/* Logos de clientes */}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
```

### Services Grid
```tsx
// src/components/sections/Services.tsx
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { Card } from "@/components/ui/Card";
import { Globe, ShoppingCart, Megaphone, Palette, Code, Smartphone } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Sitios Web",
    description: "Diseño y desarrollo de páginas web profesionales optimizadas para tu negocio local.",
  },
  {
    icon: ShoppingCart,
    title: "Tiendas en Línea",
    description: "E-commerce con pasarela de pagos, inventario y envíos integrados.",
  },
  {
    icon: Megaphone,
    title: "Marketing Digital",
    description: "Estrategias de SEO, redes sociales y publicidad para atraer clientes.",
  },
  {
    icon: Palette,
    title: "Branding",
    description: "Identidad visual completa: logo, colores, tipografía y manual de marca.",
  },
  {
    icon: Code,
    title: "Desarrollo a Medida",
    description: "Sistemas, dashboards y aplicaciones web personalizadas.",
  },
  {
    icon: Smartphone,
    title: "Diseño Responsive",
    description: "Tu sitio se ve perfecto en celular, tablet y computadora.",
  },
];

export function Services() {
  return (
    <section id="servicios" className="py-20 lg:py-32 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="text-brand-600 font-semibold text-sm uppercase tracking-wide">
            Nuestros Servicios
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">
            Todo lo que tu negocio necesita para crecer online
          </h2>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <Card className="h-full">
                <div className="w-12 h-12 rounded-lg bg-brand-100 flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-brand-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
```

### Contact Form
```tsx
// src/components/sections/Contact.tsx
import { useState } from "react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/Button";
import { WHATSAPP_URL } from "@/config/contact";
import { Phone, Mail, MapPin } from "lucide-react";

export function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Web3Forms submission logic here
    setStatus("success");
  };

  return (
    <section id="contacto" className="py-20 lg:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Info column */}
          <FadeIn direction="left">
            <span className="text-brand-600 font-semibold text-sm uppercase tracking-wide">
              Contáctanos
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">
              Hablemos de tu proyecto
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Estamos en el Valle de Toluca y listos para ayudarte a crecer.
            </p>

            <div className="mt-8 space-y-4">
              <a href={WHATSAPP_URL()} className="flex items-center gap-3 text-slate-700 hover:text-brand-600 transition-colors">
                <Phone className="w-5 h-5" />
                <span>WhatsApp</span>
              </a>
              <a href="mailto:contacto@dab.com.mx" className="flex items-center gap-3 text-slate-700 hover:text-brand-600 transition-colors">
                <Mail className="w-5 h-5" />
                <span>contacto@dab.com.mx</span>
              </a>
              <div className="flex items-center gap-3 text-slate-700">
                <MapPin className="w-5 h-5" />
                <span>Valle de Toluca, Estado de México</span>
              </div>
            </div>
          </FadeIn>

          {/* Form column */}
          <FadeIn direction="right">
            <form onSubmit={handleSubmit} className="bg-slate-50 rounded-2xl p-8 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                  value={formState.name}
                  onChange={(e) => setFormState(s => ({ ...s, name: e.target.value }))}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                  value={formState.email}
                  onChange={(e) => setFormState(s => ({ ...s, email: e.target.value }))}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                  ¿Qué necesitas?
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all resize-none"
                  value={formState.message}
                  onChange={(e) => setFormState(s => ({ ...s, message: e.target.value }))}
                />
              </div>
              <Button variant="primary" size="lg" className="w-full">
                {status === "submitting" ? "Enviando..." : "Enviar mensaje"}
              </Button>
              {status === "success" && (
                <p className="text-green-600 text-sm text-center">¡Mensaje enviado! Te contactaremos pronto.</p>
              )}
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
```

### Navigation
```tsx
// src/components/sections/Navbar.tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Portafolio", href: "#portafolio" },
  { label: "Contacto", href: "#contacto" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-lg shadow-sm border-b border-slate-100"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          <a href="/" className="text-2xl font-bold text-brand-600">
            dab
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button variant="primary" size="sm" href={WHATSAPP_URL()}>
              WhatsApp
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block py-2 text-slate-700 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
```

## Checklist de Componente Nuevo

Antes de dar por terminado un componente, verificar:
- [ ] Props tipadas con interface
- [ ] Responsive (mobile, tablet, desktop)
- [ ] Estados interactivos (hover, focus, active, disabled)
- [ ] Accesible (labels, aria-labels, roles, tabIndex)
- [ ] Animaciones de entrada (FadeIn/Stagger)
- [ ] No hay `console.log` ni código de debug
- [ ] Imports usan `@/` aliases, no rutas relativas complejas
