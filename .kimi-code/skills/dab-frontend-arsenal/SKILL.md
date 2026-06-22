---
name: dab-frontend-arsenal
description: Extended frontend library recommendations and implementation ideas for the dab project beyond the core stack. Proposes GSAP, Lenis, Three.js, Lottie, and other advanced animation and interaction libraries when appropriate.
type: prompt
whenToUse: When the user asks for advanced animations, 3D effects, smooth scrolling, complex timelines, particle effects, or wants to push the visual experience beyond Framer Motion capabilities in the dab project.
disableModelInvocation: false
arguments:
  - effect
  - library
---

# dab — Frontend Arsenal (Extended Capabilities)

## Cuándo Proponer Librerías Extra

El stack base de dab (Astro + React + Framer Motion + Tailwind) cubre el 90% de los casos. **Proponer librerías extra solo cuando:**

1. Framer Motion se queda corto para el efecto deseado
2. El usuario pide explícitamente "algo más avanzado", "más chido", "efectos 3D", etc.
3. Se necesita optimización de performance para animaciones complejas
4. El efecto es específico de una librería (ej: partículas, smooth scroll, 3D)

---

## 1. GSAP + ScrollTrigger

**¿Cuándo usar?** Animaciones de scroll complejas, timelines secuenciales, pin de secciones, scrubbing.

**Instalación:**
```bash
npm install gsap @gsap/react
```

**Patrón de implementación:**
```tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function GSAPSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gsap-item", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      <div className="gsap-item">...</div>
      <div className="gsap-item">...</div>
    </div>
  );
}
```

**Ventajas sobre Framer Motion:**
- Mejor control de timelines secuenciales
- ScrollTrigger más potente que `whileInView`
- Scrubbing bidireccional (scroll up revierte animación)
- Pin de secciones durante scroll

**Desventajas:**
- Más verbose
- No es declarativo (imperativo)
- Bundle size mayor (~30KB gzipped)

---

## 2. Lenis (Smooth Scroll)

**¿Cuándo usar?** Cuando el scroll nativo se siente "seco" o se quieren animaciones de scroll sincronizadas con GSAP.

**Instalación:**
```bash
npm install lenis
```

**Patrón de implementación:**
```tsx
import Lenis from "lenis";
import { useEffect } from "react";

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);
}

// En layout principal:
export function BaseLayout({ children }) {
  useLenis();
  return <>{children}</>;
}
```

**Integración con GSAP:**
```tsx
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

---

## 3. Three.js / React Three Fiber

**¿Cuándo usar?** Fondos 3D interactivos, hero inmersivo, visualizaciones de datos 3D.

**Instalación:**
```bash
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three
```

**Patrón: Partículas flotantes en hero:**
```tsx
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random";
import { useRef } from "react";

function Particles() {
  const ref = useRef<any>();
  const positions = random.inSphere(new Float32Array(5000 * 3), { radius: 1.5 });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#0ea5e9"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export function Hero3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Particles />
      </Canvas>
    </div>
  );
}
```

**⚠️ Advertencia:** Three.js añade ~150KB+ al bundle. Usar solo en hero con `client:visible`.

---

## 4. Lottie

**¿Cuándo usar?** Animaciones vectoriales complejas (ilustraciones, loaders, iconos animados).

**Instalación:**
```bash
npm install lottie-react
```

**Patrón:**
```tsx
import Lottie from "lottie-react";
import animationData from "@/assets/animations/rocket.json";

export function AnimatedIcon() {
  return (
    <Lottie
      animationData={animationData}
      loop={true}
      autoplay={true}
      style={{ width: 200, height: 200 }}
    />
  );
}
```

---

## 5. Canvas Confetti

**¿Cuándo usar?** Celebración tras enviar formulario, conversión exitosa.

**Instalación:**
```bash
npm install canvas-confetti
npm install -D @types/canvas-confetti
```

**Patrón:**
```tsx
import confetti from "canvas-confetti";

export function celebrate() {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) return clearInterval(interval);

    const particleCount = 50 * (timeLeft / duration);
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
  }, 250);
}
```

---

## 6. Vanilla-tilt.js / React-tilt

**¿Cuándo usar?** Efecto 3D tilt en cards de servicios.

**Instalación:**
```bash
npm install react-tilt
```

**Patrón:**
```tsx
import { Tilt } from "react-tilt";

const defaultOptions = {
  reverse: false,
  max: 15,
  perspective: 1000,
  scale: 1.02,
  speed: 1000,
  transition: true,
  axis: null,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
};

export function TiltCard({ children }: { children: React.ReactNode }) {
  return (
    <Tilt options={defaultOptions} className="rounded-2xl">
      {children}
    </Tilt>
  );
}
```

---

## 7. Splitting.js (Text Effects)

**¿Cuándo usar?** Animaciones tipográficas dramáticas (caracter por caracter).

**Instalación:**
```bash
npm install splitting
```

**Patrón con GSAP:**
```tsx
import { useEffect, useRef } from "react";
import Splitting from "splitting";
import gsap from "gsap";
import "splitting/dist/splitting.css";

export function SplitText({ text }: { text: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const result = Splitting({ target: ref.current, by: "chars" });
    const chars = result[0]?.chars || [];

    gsap.from(chars, {
      yPercent: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.03,
      ease: "power4.out",
      scrollTrigger: { trigger: ref.current, start: "top 80%" },
    });
  }, []);

  return <h2 ref={ref} data-splitting>{text}</h2>;
}
```

---

## 8. tsparticles

**¿Cuándo usar?** Partículas de fondo (nieve, estrellas, conexiones).

**Instalación:**
```bash
npm install @tsparticles/react @tsparticles/slim
```

**Patrón:**
```tsx
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export function ParticleBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const options = useMemo(() => ({
    particles: {
      number: { value: 80 },
      color: { value: "#0ea5e9" },
      links: { enable: true, color: "#0ea5e9", opacity: 0.2 },
      move: { enable: true, speed: 0.5 },
      opacity: { value: 0.5 },
      size: { value: 1 },
    },
  }), []);

  if (!init) return null;
  return <Particles id="tsparticles" options={options} className="absolute inset-0 -z-10" />;
}
```

---

## 9. @number-flow/react

**¿Cuándo usar?** Números que se animan al cambiar (contadores, precios, estadísticas).

**Instalación:**
```bash
npm install @number-flow/react
```

**Patrón:**
```tsx
import NumberFlow from "@number-flow/react";

export function AnimatedStat({ value, suffix = "" }: { value: number; suffix?: string }) {
  return (
    <span className="text-4xl font-bold">
      <NumberFlow value={value} />
      {suffix}
    </span>
  );
}
```

---

## 10. @magicui (Tailwind Components)

**¿Cuándo usar?** Efectos pre-hechos: shimmer, spotlight, particles, animated beams.

**Instalación:**
```bash
npx magicui@latest init
npx magicui add spotlight
npx magicui add animated-beam
```

---

## Decision Matrix

| El usuario pide... | Librería recomendada | Alternativa |
|-------------------|---------------------|-------------|
| "Scroll más suave" | Lenis | GSAP ScrollSmoother |
| "Animaciones de scroll complejas" | GSAP + ScrollTrigger | Framer Motion (simple) |
| "Fondo 3D / partículas" | Three.js / tsparticles | CSS particles (ligero) |
| "Iconos animados" | Lottie | SVG animate + Framer |
| "Efecto celebración" | Canvas Confetti | CSS confetti (limitado) |
| "Cards 3D tilt" | React-tilt | CSS transform (limitado) |
| "Texto animado dramático" | Splitting + GSAP | Framer Motion (simple) |
| "Números animados" | @number-flow/react | Framer useSpring |
| "Efectos mágicos pre-hechos" | @magicui | Custom CSS |

## Reglas de Oro

1. **Nunca añadir una librería sin justificar el bundle size**
2. **Siempre usar `client:visible` para componentes pesados en Astro**
3. **Preferir Framer Motion para el 90% de las animaciones**
4. **Proponer GSAP solo para timelines complejas o scrubbing**
5. **Three.js solo en hero, nunca en múltiples páginas**
6. **Testear en mobile antes de aprobar efectos complejos**
