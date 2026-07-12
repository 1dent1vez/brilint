import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

function getDeviceProfile() {
  if (typeof window === 'undefined') {
    return {
      particleCount: 4000,
      dpr: 1,
      targetFPS: 60,
      rotationSpeedY: 0.0012,
      rotationSpeedX: 0.0006,
      enableMouse: true,
      resolutionScale: 1,
    };
  }

  const isMobile = window.matchMedia('(pointer: coarse)').matches
    || window.innerWidth < 768;
  const isLowPower = navigator.hardwareConcurrency
    ? navigator.hardwareConcurrency <= 4
    : false;
  const saveData = navigator.connection?.saveData === true;

  return {
    // Volumetric starfield: many more fragments, dense inside.
    particleCount: (isMobile || isLowPower || saveData) ? 1200 : 4000,
    dpr: isMobile ? 1 : Math.min(window.devicePixelRatio, 2),
    targetFPS: isMobile ? 30 : 60,
    rotationSpeedY: isMobile ? 0.0008 : 0.0012,
    rotationSpeedX: isMobile ? 0.0004 : 0.0006,
    enableMouse: !isMobile,
    resolutionScale: isMobile ? 0.75 : 1,
  };
}

// Volumetric sphere via cube-root sampling -> uniform density throughout the volume.
// Gives real depth: bright dense core, fading outward.
function sampleVolume(radius) {
  const u = Math.random();
  const r = radius * Math.cbrt(u); // uniform volumetric distribution
  const phi = Math.acos(-1 + 2 * Math.random());
  const theta = Math.random() * Math.PI * 2;
  const sinPhi = Math.sin(phi);
  return {
    x: r * Math.cos(theta) * sinPhi,
    y: r * Math.sin(theta) * sinPhi,
    z: r * Math.cos(phi),
    rNorm: r / radius, // 0 = core, 1 = surface
  };
}

export function ConstellationBg({ className = '' }) {
  const containerRef = useRef(null);
  const frameRef = useRef(null);
  const rendererRef = useRef(null);
  const initializedRef = useRef(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!containerRef.current || initializedRef.current) return;

    try {
      initializedRef.current = true;
      const container = containerRef.current;

      const profile = getDeviceProfile();
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;

      if (!width || !height) {
        setError(true);
        return;
      }

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.z = 5;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(profile.dpr);

      const canvas = renderer.domElement;
      canvas.className = 'constellation-canvas';
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.zIndex = '0';
      canvas.style.pointerEvents = profile.enableMouse ? 'auto' : 'none';

      container.appendChild(canvas);
      rendererRef.current = renderer;

      // --- Volumetric starfield (Betelgeuse-like depth, star sprite texture) ---
      const particleCount = profile.particleCount;
      const radius = 2.5;
      const positions = new Float32Array(particleCount * 3);
      const opacities = new Float32Array(particleCount);
      const sizes = new Float32Array(particleCount);
      const rNormArr = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        const p = sampleVolume(radius);
        positions[i * 3] = p.x;
        positions[i * 3 + 1] = p.y;
        positions[i * 3 + 2] = p.z;

        // Dense core: most particles cluster near center, fewer at the rim.
        const core = 1.0 - p.rNorm; // 1 at core, 0 at surface
        opacities[i] = 0.35 + core * 0.6; // 0.35..0.95

        // Mixed sizes: a few big glowing orbs, many small faint fragments.
        const big = Math.random() < 0.06;
        const base = big ? 0.10 : 0.02;
        sizes[i] = base + Math.random() * (big ? 0.10 : 0.04) + core * 0.03;
        rNormArr[i] = p.rNorm;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('aOpacity', new THREE.BufferAttribute(opacities, 1));
      geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));

      // --- Star sprite texture (generated at runtime, no external asset) ---
      // A glowing 4-point star (cross flare) on a radial gradient -> reads as a real star.
      function makeStarTexture() {
        const s = 128;
        const cv = document.createElement('canvas');
        cv.width = s; cv.height = s;
        const ctx = cv.getContext('2d');
        const c = s / 2;

        // radial glow base
        const g = ctx.createRadialGradient(c, c, 0, c, c, c);
        g.addColorStop(0.0, 'rgba(255,255,255,1)');
        g.addColorStop(0.18, 'rgba(210,225,255,0.95)');
        g.addColorStop(0.45, 'rgba(140,170,255,0.35)');
        g.addColorStop(1.0, 'rgba(123,97,255,0.0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, s, s);

        // 4-point cross flare
        ctx.globalCompositeOperation = 'lighter';
        const flare = (len, w, a) => {
          const grad = ctx.createLinearGradient(c - len, c, c + len, c);
          grad.addColorStop(0, 'rgba(255,255,255,0)');
          grad.addColorStop(0.5, `rgba(200,220,255,${a})`);
          grad.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.fillStyle = grad;
          ctx.fillRect(c - len, c - w / 2, len * 2, w);
          const gradV = ctx.createLinearGradient(c, c - len, c, c + len);
          gradV.addColorStop(0, 'rgba(255,255,255,0)');
          gradV.addColorStop(0.5, `rgba(200,220,255,${a})`);
          gradV.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.fillStyle = gradV;
          ctx.fillRect(c - w / 2, c - len, w, len * 2);
        };
        flare(c * 0.95, 3.2, 0.55);
        flare(c * 0.55, 1.6, 0.4);

        // tiny bright core dot
        ctx.fillStyle = 'rgba(255,255,255,0.95)';
        ctx.beginPath();
        ctx.arc(c, c, 4.5, 0, Math.PI * 2);
        ctx.fill();

        const tex = new THREE.CanvasTexture(cv);
        tex.needsUpdate = true;
        return tex;
      }

      const starTex = makeStarTexture();

      // Per-vertex colors: azul core -> morado halo by radius (matches the look)
      const colors = new Float32Array(particleCount * 3);
      const cCore = new THREE.Color('#4C7FFF');
      const cMid = new THREE.Color('#6B8BFF');
      const cHalo = new THREE.Color('#7B61FF');
      const tmp = new THREE.Color();
      for (let i = 0; i < particleCount; i++) {
        const r = rNormArr[i];
        if (r < 0.45) tmp.copy(cCore).lerp(cMid, r / 0.45);
        else tmp.copy(cMid).lerp(cHalo, (r - 0.45) / 0.55);
        colors[i * 3] = tmp.r;
        colors[i * 3 + 1] = tmp.g;
        colors[i * 3 + 2] = tmp.b;
      }
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.12,
        map: starTex,
        vertexColors: true,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
        opacity: 0.95,
      });

      const sphere = new THREE.Points(geometry, material);
      scene.add(sphere);

      // Offset so it frames the hero without sitting behind the headline.
      const isMobileView = !profile.enableMouse;
      if (isMobileView) {
        sphere.position.y = 1.5; // up, behind the badge (not the title)
      } else {
        sphere.position.set(1.7, 1.1, 0); // upper-right on desktop
      }

      // Check user reduced motion preference
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      // GSAP entrance: a slow, emphasized "explosion" so the constellation's
      // shape reads clearly, then settle to a balanced, calmer state.
      if (prefersReducedMotion) {
        sphere.scale.setScalar(1);
      } else {
        // 1) Build-up: scale 0 -> 1.15 (slight overshoot) slowly so the form blooms.
        const scaleObj = { value: 0 };
        sphere.scale.set(0, 0, 0);
        gsap.to(scaleObj, {
          value: 1.15,
          duration: 2.6,
          ease: 'power2.out',
          onUpdate: () => {
            if (sphere) sphere.scale.setScalar(scaleObj.value);
          },
          onComplete: () => {
            // 2) Settle overshoot back to 1.0 (the balanced resting state)
            gsap.to(scaleObj, {
              value: 1.0,
              duration: 0.8,
              ease: 'power1.inOut',
              onUpdate: () => {
                if (sphere) sphere.scale.setScalar(scaleObj.value);
              },
            });
          },
        });

        // 3) Opacity emphasis -> then attenuate to a calm balance.
        // Canvas fades in bright (1.0) during the bloom, then eases to 0.4.
        const canvasOpacity = { value: 0 };
        canvas.style.opacity = '0';
        gsap.to(canvasOpacity, {
          value: 1.0,
          duration: 2.6,
          ease: 'power2.out',
          onUpdate: () => {
            canvas.style.opacity = String(canvasOpacity.value);
          },
          onComplete: () => {
            gsap.to(canvasOpacity, {
              value: 0.4, // balanced, doesn't steal focus from hero text
              duration: 1.4,
              ease: 'power1.inOut',
              onUpdate: () => {
                canvas.style.opacity = String(canvasOpacity.value);
              },
            });
          },
        });
      }

      // IntersectionObserver to pause loop when canvas is out of viewport
      let isVisible = true;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          isVisible = entry.isIntersecting;
        });
      }, { threshold: 0.05 });
      observer.observe(canvas);

      // Mouse Parallax movement target (desktop only)
      const mouseTarget = { x: 0, y: 0 };
      const handleMouseMove = (event) => {
        mouseTarget.x = (event.clientX / window.innerWidth - 0.5) * 1.5;
        mouseTarget.y = -(event.clientY / window.innerHeight - 0.5) * 1.5;
      };

      if (profile.enableMouse && !prefersReducedMotion) {
        window.addEventListener('mousemove', handleMouseMove);
      }

      // Render Loop with FPS Cap
      let lastFrameTime = 0;
      const frameInterval = 1000 / profile.targetFPS;

      const animate = (currentTime) => {
        frameRef.current = requestAnimationFrame(animate);

        if (!isVisible) return;

        const delta = currentTime - lastFrameTime;
        if (delta < frameInterval) return;

        lastFrameTime = currentTime - (delta % frameInterval);

        if (!prefersReducedMotion) {
          // Rotations
          sphere.rotation.y += profile.rotationSpeedY;
          sphere.rotation.x += profile.rotationSpeedX;

          // Mouse parallax
          if (profile.enableMouse) {
            camera.position.x += (mouseTarget.x - camera.position.x) * 0.05;
            camera.position.y += (mouseTarget.y - camera.position.y) * 0.05;
            camera.lookAt(0, 0, 0);
          }
        }

        renderer.render(scene, camera);
      };

      const handleResize = () => {
        if (!containerRef.current) return;
        const w = containerRef.current.clientWidth || window.innerWidth;
        const h = containerRef.current.clientHeight || window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener('resize', handleResize);
      animate(0);

      // Cleanup on component unmount
      return () => {
        initializedRef.current = false;
        observer.disconnect();
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        if (frameRef.current) cancelAnimationFrame(frameRef.current);

        geometry.dispose();
        material.dispose();
        if (starTex) starTex.dispose();
        renderer.dispose();

        if (canvas.parentNode) {
          canvas.parentNode.removeChild(canvas);
        }
      };
    } catch (err) {
      console.error('[ConstellationBg] Error initializing volumetric starfield:', err);
      setError(true);
    }
  }, []);

  if (error) {
    return (
      <div
        className={`absolute inset-0 h-full w-full bg-dab-accent/20 ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}

export default ConstellationBg;
