import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

function getDeviceProfile() {
  if (typeof window === 'undefined') {
    return {
      particleCount: 1200,
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
    particleCount: (isMobile || isLowPower || saveData) ? 450 : 1200,
    dpr: isMobile ? 1 : Math.min(window.devicePixelRatio, 2),
    targetFPS: isMobile ? 30 : 60,
    rotationSpeedY: isMobile ? 0.0008 : 0.0012,
    rotationSpeedX: isMobile ? 0.0004 : 0.0006,
    enableMouse: !isMobile,
    resolutionScale: isMobile ? 0.75 : 1,
  };
}

const vertexShader = `
  attribute float aOpacity;
  attribute float aSize;
  varying float vOpacity;
  varying float vDepth;
  varying float vY;

  uniform float uTime;
  uniform float uPixelRatio;

  void main() {
    vOpacity = aOpacity;
    vY = position.y;
    
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vDepth = -mvPosition.z;
    
    // Attenuate size based on distance, scaled by 1200.0 for visible halftone points
    gl_PointSize = aSize * uPixelRatio * (1200.0 / -mvPosition.z);
    
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying float vOpacity;
  varying float vDepth;
  varying float vY;

  uniform vec3 uColorBlue;
  uniform vec3 uColorPurple;
  uniform float uMaxDepth;

  void main() {
    // Perfect circle shape
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) discard;
    
    // Vertical gradient mix based on original Y position (-2.5 to 2.5)
    float yFactor = (vY + 2.5) / 5.0;
    vec3 finalColor = mix(uColorBlue, uColorPurple, clamp(yFactor, 0.0, 1.0));
    
    // Proper depth fade: brighter at the front (closer, depth ~2.5), transparent at the back (depth ~7.5)
    float depthFade = 1.0 - smoothstep(2.5, uMaxDepth, vDepth);
    float alpha = vOpacity * depthFade * 0.85;
    
    // Soft edge
    float softEdge = 1.0 - smoothstep(0.3, 0.5, dist);
    
    gl_FragColor = vec4(
      finalColor, 
      alpha * softEdge
    );
  }
`;

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

      // Particle Sphere (Halftone effect)
      const particleCount = profile.particleCount;
      const positions = new Float32Array(particleCount * 3);
      const opacities = new Float32Array(particleCount);
      const sizes = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        // Spherical distribution via golden ratio / Fibonacci
        const phi = Math.acos(-1 + (2 * i) / particleCount);
        const theta = Math.sqrt(particleCount * Math.PI) * phi;

        const radius = 2.5;
        positions[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
        positions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
        positions[i * 3 + 2] = radius * Math.cos(phi);

        opacities[i] = 0.8;
        sizes[i] = Math.random() * 0.05 + 0.02;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('aOpacity', new THREE.BufferAttribute(opacities, 1));
      geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uPixelRatio: { value: profile.dpr },
          uColorBlue: { value: new THREE.Color('#4C7FFF') },
          uColorPurple: { value: new THREE.Color('#7B61FF') },
          uMaxDepth: { value: 7.5 }
        },
        transparent: true,
        depthWrite: false
      });

      const sphere = new THREE.Points(geometry, material);
      scene.add(sphere);

      // Check user reduced motion preference
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      // GSAP scale entrance animation
      if (prefersReducedMotion) {
        sphere.scale.setScalar(1);
      } else {
        const scaleObj = { value: 0 };
        sphere.scale.set(0, 0, 0);
        gsap.to(scaleObj, {
          value: 1,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: () => {
            if (sphere) {
              sphere.scale.setScalar(scaleObj.value);
            }
          }
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

        // Update uTime uniform
        material.uniforms.uTime.value = currentTime * 0.001;

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
        renderer.dispose();

        if (canvas.parentNode) {
          canvas.parentNode.removeChild(canvas);
        }
      };
    } catch (err) {
      console.error('[ConstellationBg] Error initializing custom Three.js halftone sphere:', err);
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