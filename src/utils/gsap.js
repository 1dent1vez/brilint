// Centralized GSAP + ScrollTrigger registration.
// Import from here in every React island that uses GSAP to avoid duplicate
// plugin registration and keep bundle references consistent.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
