import React from 'react';
import { WHATSAPP_URL } from '../../config/contact';
import type { Plan } from '../../data/services';

const colorStyles = {
  amber: {
    border: 'border-dab-amber/50',
    text: 'text-dab-amber',
    bgSoft: 'bg-dab-amber/10',
    borderSoft: 'border-dab-amber/20',
    hoverBorder: 'hover:border-dab-amber/40',
    glow: 'shadow-[0_0_30px_rgba(245,158,11,0.15)]',
    btnPopular: 'bg-gradient-to-r from-dab-amber to-amber-600 hover:brightness-110 text-black shadow-[0_0_20px_rgba(245,158,11,0.3)]',
    badge: 'bg-dab-amber/10 text-dab-amber border-dab-amber/30',
  },
  cyan: {
    border: 'border-dab-cyan/50',
    text: 'text-dab-cyan',
    bgSoft: 'bg-dab-cyan/10',
    borderSoft: 'border-dab-cyan/20',
    hoverBorder: 'hover:border-dab-cyan/40',
    glow: 'shadow-[0_0_30px_rgba(34,211,238,0.15)]',
    btnPopular: 'bg-gradient-to-r from-dab-cyan to-cyan-500 hover:brightness-110 text-black shadow-[0_0_20px_rgba(34,211,238,0.3)]',
    badge: 'bg-dab-cyan/10 text-dab-cyan border-dab-cyan/30',
  },
  rose: {
    border: 'border-dab-rose/50',
    text: 'text-dab-rose',
    bgSoft: 'bg-dab-rose/10',
    borderSoft: 'border-dab-rose/20',
    hoverBorder: 'hover:border-dab-rose/40',
    glow: 'shadow-[0_0_30px_rgba(244,63,94,0.15)]',
    btnPopular: 'bg-gradient-to-r from-dab-rose to-rose-600 hover:brightness-110 text-white shadow-[0_0_20px_rgba(244,63,94,0.3)]',
    badge: 'bg-dab-rose/10 text-dab-rose border-dab-rose/30',
  },
};

interface PlanCardProps {
  plan: Plan;
  serviceColor: 'amber' | 'cyan' | 'rose';
  serviceName: string;
}

export default function PlanCard({ plan, serviceColor, serviceName }: PlanCardProps) {
  const style = colorStyles[serviceColor];
  const isPopular = plan.popular;

  // Create WhatsApp message link
  const message = `Hola Dab, me interesa agendar mi diagnóstico gratuito y consultar el plan ${plan.name} para el servicio de ${serviceName}.`;
  const href = WHATSAPP_URL(message);

  return (
    <div
      className={`glass-card rounded-2xl p-6 sm:p-8 flex flex-col h-full transition-all duration-300 relative ${
        isPopular
          ? `${style.border} ${style.glow} scale-[1.02] z-10`
          : `border-dab-border hover:border-dab-accent/30`
      }`}
    >
      {isPopular && (
        <span className={`absolute top-0 right-6 transform -translate-y-1/2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${style.badge}`}>
          MÁS POPULAR
        </span>
      )}

      <div className="space-y-4 flex-1">
        <div>
          <h4 className="font-body text-xl font-bold tracking-tight text-dab-text">
            {plan.name}
          </h4>
          <p className="font-body text-xs text-dab-muted mt-1 leading-normal">
            {plan.description}
          </p>
        </div>

        <div className="flex items-baseline gap-1 py-2 border-y border-dab-border/50">
          <span className="font-body text-4xl font-extrabold tracking-tight text-white leading-none">
            {plan.price}
          </span>
        </div>

        <ul className="font-body space-y-3 text-sm text-dab-muted leading-relaxed">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className={`mt-[6px] h-1.5 w-1.5 rounded-full shrink-0 ${style.bgSoft} border ${style.borderSoft} ${style.text} flex items-center justify-center`} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <a
          href={href}
          className={`w-full font-body text-[14px] font-bold py-3 px-6 rounded-lg leading-none active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${
            isPopular
              ? style.btnPopular
              : 'border border-dab-border text-dab-text hover:border-dab-accent/40 hover:bg-white/5 shadow-sm'
          }`}
        >
          <span>{plan.ctaText}</span>
          <svg className="h-4 w-4 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  );
}
export { PlanCard };
