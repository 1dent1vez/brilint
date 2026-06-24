import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PlanCard from './PlanCard';
import ProcessStep from './ProcessStep';
import type { Plan, Service } from '../../data/services';

const colorStyles = {
  amber: {
    activeTab: 'text-dab-amber border-dab-amber bg-dab-amber/5',
    text: 'text-dab-amber',
    bgSoft: 'bg-dab-amber/10',
    borderSoft: 'border-dab-amber/20',
  },
  cyan: {
    activeTab: 'text-dab-cyan border-dab-cyan bg-dab-cyan/5',
    text: 'text-dab-cyan',
    bgSoft: 'bg-dab-cyan/10',
    borderSoft: 'border-dab-cyan/20',
  },
  rose: {
    activeTab: 'text-dab-rose border-dab-rose bg-dab-rose/5',
    text: 'text-dab-rose',
    bgSoft: 'bg-dab-rose/10',
    borderSoft: 'border-dab-rose/20',
  },
};

interface ServiceTabsProps {
  service: Service;
}

export default function ServiceTabs({ service }: ServiceTabsProps) {
  const [activeTab, setActiveTab] = useState<'planes' | 'incluye' | 'proceso' | 'faq'>('planes');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const style = colorStyles[service.color];

  const tabs = [
    { id: 'planes' as const, label: 'Planes y Precios' },
    { id: 'incluye' as const, label: 'Qué incluye' },
    { id: 'proceso' as const, label: 'Proceso' },
    { id: 'faq' as const, label: 'FAQ' },
  ];

  const handleFaqToggle = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="space-y-8 md:space-y-12">
      {/* Navigation tabs */}
      <div className="flex border-b border-dab-border justify-center overflow-x-auto flex-nowrap hide-scrollbar">
        <div className="flex space-x-1 sm:space-x-4 px-4">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-6 py-3 border-b-2 font-mono text-xs sm:text-sm font-semibold uppercase tracking-[0.05em] transition-all duration-300 whitespace-nowrap focus:outline-none ${
                  isActive
                    ? style.activeTab
                    : 'border-transparent text-dab-muted hover:text-dab-text'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tabs Content */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {/* Tab: Planes */}
            {activeTab === 'planes' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
                {service.tabs.planes.map((plan) => (
                  <div key={plan.id} className="h-full">
                    <PlanCard
                      plan={plan}
                      serviceColor={service.color}
                      serviceName={service.name}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Tab: Qué incluye */}
            {activeTab === 'incluye' && (
              <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
                {/* Deliverables column */}
                <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6">
                  <h4 className="font-body text-lg font-bold text-white flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${style.text} bg-current`} />
                    Entregables incluidos
                  </h4>
                  <ul className="space-y-4">
                    {service.tabs.incluye.deliverables.map((item, idx) => (
                      <li key={idx} className="flex gap-3 text-sm text-dab-muted font-body leading-relaxed">
                        <svg className={`h-5 w-5 shrink-0 ${style.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Support/Added Value column */}
                <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6">
                  <h4 className="font-body text-lg font-bold text-white flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${style.text} bg-current`} />
                    Soporte y Garantía
                  </h4>
                  <ul className="space-y-4">
                    {service.tabs.incluye.support.map((item, idx) => (
                      <li key={idx} className="flex gap-3 text-sm text-dab-muted font-body leading-relaxed">
                        <svg className={`h-5 w-5 shrink-0 ${style.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Tab: Proceso */}
            {activeTab === 'proceso' && (
              <div className="max-w-xl mx-auto px-4">
                {service.tabs.proceso.map((proc, idx) => (
                  <ProcessStep
                    key={proc.step}
                    step={proc.step}
                    title={proc.title}
                    description={proc.description}
                    isLast={idx === service.tabs.proceso.length - 1}
                    serviceColor={service.color}
                  />
                ))}
              </div>
            )}

            {/* Tab: FAQ */}
            {activeTab === 'faq' && (
              <div className="max-w-3xl mx-auto px-4 space-y-4">
                {service.tabs.faq.map((item, idx) => {
                  const isExpanded = expandedFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="glass-card rounded-xl border border-dab-border overflow-hidden transition-all duration-300"
                    >
                      <button
                        onClick={() => handleFaqToggle(idx)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
                      >
                        <span className="font-body font-semibold text-dab-text text-sm sm:text-base pr-4">
                          {item.question}
                        </span>
                        <svg
                          className={`h-5 w-5 text-dab-muted shrink-0 transition-transform duration-300 ${
                            isExpanded ? 'rotate-180 ' + style.text : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      <div
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                          isExpanded ? 'max-h-96 border-t border-dab-border/55' : 'max-h-0'
                        }`}
                      >
                        <div className="px-6 py-4 font-body text-sm text-dab-muted leading-relaxed">
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
export { ServiceTabs };
