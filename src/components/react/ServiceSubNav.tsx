import React from 'react';

const colorStyles = {
  amber: {
    activeText: 'text-dab-amber border-dab-amber/30 bg-dab-amber/10',
    indicator: 'bg-dab-amber',
  },
  cyan: {
    activeText: 'text-dab-cyan border-dab-cyan/30 bg-dab-cyan/10',
    indicator: 'bg-dab-cyan',
  },
  rose: {
    activeText: 'text-dab-rose border-dab-rose/30 bg-dab-rose/10',
    indicator: 'bg-dab-rose',
  },
};

interface ServiceSubNavProps {
  activeSlug: 'despierta' | 'crece' | 'domina';
}

export default function ServiceSubNav({ activeSlug }: ServiceSubNavProps) {
  const items = [
    { slug: 'despierta', name: 'Despierta', color: 'amber' as const, label: 'Automatización' },
    { slug: 'crece', name: 'Crece', color: 'cyan' as const, label: 'Estrategia' },
    { slug: 'domina', name: 'Domina', color: 'rose' as const, label: 'Transformación' },
  ];

  return (
    <div className="sticky top-[72px] z-40 w-full glass-subnav border-b border-dab-border">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-12 py-3">
        <div className="flex items-center justify-center gap-4 overflow-x-auto flex-nowrap hide-scrollbar">
          {items.map((item) => {
            const isActive = item.slug === activeSlug;
            const style = colorStyles[item.color];
            return (
              <a
                key={item.slug}
                href={`/servicios/${item.slug}`}
                className={`relative px-4 py-2 rounded-lg border text-sm font-semibold tracking-wide transition-all duration-300 shrink-0 flex items-center gap-2 ${
                  isActive
                    ? `${style.activeText}`
                    : 'text-dab-muted border-transparent hover:text-dab-text hover:bg-white/5'
                }`}
              >
                <span>{item.name}</span>
                <span className="text-[10px] opacity-60 uppercase tracking-wider hidden sm:inline">
                  • {item.label}
                </span>
                {isActive && (
                  <span className={`absolute bottom-[-13px] left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-t-full ${style.indicator}`} />
                )}
              </a>
            );
          })}
        </div>
      </div>
      <style>{`
        .glass-subnav {
          background: rgba(5, 6, 10, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
      `}</style>
    </div>
  );
}
export { ServiceSubNav };
