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

export default HeroMotion;
