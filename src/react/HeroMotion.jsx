import { motion, useReducedMotion } from 'framer-motion';

export function HeroMotion({ children, className = '' }) {
  return <div className={className}>{children}</div>;
}

export function HeroMotionItem({ children, className = '', delay = 0 }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: 'easeOut',
        delay: delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function BadgeMotion({ children, className = '', delay = 0 }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, filter: 'blur(6px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1],
        delay: delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default HeroMotion;
