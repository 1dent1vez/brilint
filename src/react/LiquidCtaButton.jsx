import { LiquidGlass } from 'react-liquid-glass-svg';

export default function LiquidCtaButton({
  href,
  children,
  className = '',
  tint = 'rgba(59, 91, 255, 0.18)',
  textClass = 'text-dab-cyan',
  displacementScale = 90,
  turbulenceSeed = 2,
  borderRadius = 16,
}) {
  return (
    <LiquidGlass
      as="a"
      href={href}
      glassBorder
      backdropBlur={4}
      tintColor={tint}
      displacementScale={displacementScale}
      turbulenceSeed={turbulenceSeed}
      borderRadius={borderRadius}
      className={`inline-flex items-center justify-center px-8 py-4 rounded-2xl font-body font-semibold text-base no-underline transition-transform duration-200 hover:scale-[1.03] active:scale-95 ${textClass} ${className}`}
    >
      {children}
    </LiquidGlass>
  );
}
