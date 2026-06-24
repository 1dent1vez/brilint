import React from 'react';

const colorStyles = {
  amber: {
    bg: 'bg-dab-amber/10',
    border: 'border-dab-amber/30',
    text: 'text-dab-amber',
    line: 'bg-gradient-to-b from-dab-amber/30 to-transparent',
  },
  cyan: {
    bg: 'bg-dab-cyan/10',
    border: 'border-dab-cyan/30',
    text: 'text-dab-cyan',
    line: 'bg-gradient-to-b from-dab-cyan/30 to-transparent',
  },
  rose: {
    bg: 'bg-dab-rose/10',
    border: 'border-dab-rose/30',
    text: 'text-dab-rose',
    line: 'bg-gradient-to-b from-dab-rose/30 to-transparent',
  },
};

interface ProcessStepProps {
  step: number;
  title: string;
  description: string;
  isLast: boolean;
  serviceColor: 'amber' | 'cyan' | 'rose';
}

export default function ProcessStep({ step, title, description, isLast, serviceColor }: ProcessStepProps) {
  const style = colorStyles[serviceColor];

  return (
    <div className="flex gap-4 sm:gap-6 relative">
      <div className="flex flex-col items-center shrink-0">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold border text-sm ${style.bg} ${style.border} ${style.text}`}>
          {step}
        </div>
        {!isLast && (
          <div className={`w-[2px] flex-1 my-2 rounded ${style.line}`} />
        )}
      </div>
      <div className="pb-8">
        <h4 className="font-body text-base sm:text-lg font-bold text-dab-text tracking-normal">
          {title}
        </h4>
        <p className="font-body text-sm text-dab-muted mt-1 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
export { ProcessStep };
