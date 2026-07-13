import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { WHATSAPP_URL } from "@/config/contact";
import { FadeIn } from "@/components/animations/FadeIn";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";

interface Faq {
  pregunta: string;
  respuesta: string;
}

interface CategoriaFaq {
  id: string;
  label: string;
  labelCorto: string;
  color: "emerald" | "blue" | "purple" | "indigo";
  faqs: Faq[];
}

interface FaqClientProps {
  categorias: CategoriaFaq[];
  title?: string;
  subtitle?: string;
}

const activeColorClasses = {
  emerald:
    "border-emerald-500/40 bg-emerald-500/10 text-emerald-400 shadow-[0_0_20px_-6px_rgba(16,185,129,0.25)]",
  blue: "border-dab-accent/40 bg-dab-accent/10 text-dab-accent shadow-[0_0_20px_-6px_rgba(76,127,255,0.25)]",
  purple:
    "border-purple-500/40 bg-purple-500/10 text-purple-400 shadow-[0_0_20px_-6px_rgba(168,85,247,0.25)]",
  indigo:
    "border-indigo-500/40 bg-indigo-500/10 text-indigo-400 shadow-[0_0_20px_-6px_rgba(99,102,241,0.25)]",
};

const inactiveTabClasses =
  "liquid-border text-dab-muted hover:text-dab-text hover:border-dab-accent/50";

const baseTabClasses =
  "relative px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-dab-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-dab-bg";

function PlusIcon({ isOpen }: { isOpen: boolean }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.span
      animate={{ rotate: isOpen ? 45 : 0 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3 }}
      className="flex-shrink-0 flex items-center justify-center h-7 w-7 rounded-full liquid-border text-dab-muted"
      aria-hidden="true"
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M6 2v8M2 6h8" />
      </svg>
    </motion.span>
  );
}

function FaqItem({
  faq,
  index,
  categoryId,
  color,
  categoryLabel,
  isOpen,
  onToggle,
}: {
  faq: Faq;
  index: number;
  categoryId: string;
  color: CategoriaFaq["color"];
  categoryLabel: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const shouldReduceMotion = useReducedMotion();
  const answerId = `faq-answer-${categoryId}-${index}`;

  return (
    <motion.div
      whileHover={shouldReduceMotion ? undefined : { y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn(
        "rounded-2xl liquid-surface overflow-hidden transition-colors duration-300",
        isOpen
          ? "border-dab-accent/40 shadow-dab-soft"
          : "hover:border-dab-accent/40"
      )}
    >
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={answerId}
          className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none focus-visible:bg-dab-surface/80"
        >
          <span className="flex items-center gap-3 min-w-0">
            <span
              className={cn(
                "flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-mono font-bold",
                activeColorClasses[color]
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-body text-base font-semibold text-dab-text leading-snug">
              {faq.pregunta}
            </span>
          </span>
          <PlusIcon isOpen={isOpen} />
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={answerId}
            initial={shouldReduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0">
              <div className="border-t border-dab-border/40 pt-3">
                <p className="font-body text-sm text-dab-muted leading-relaxed mb-4">
                  {faq.respuesta}
                </p>

                <a
                  href={WHATSAPP_URL(
                    `Hola, tengo una duda sobre ${categoryLabel}: ${faq.pregunta}`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-2 text-xs font-medium text-dab-accent hover:text-cyan-400 transition-colors"
                >
                  <PulseDot />
                  ¿Te quedó alguna duda? Escríbenos
                  <svg
                    className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function PulseDot() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.span
      animate={shouldReduceMotion ? {} : { scale: [1, 1.2, 1] }}
      transition={{
        repeat: Infinity,
        duration: 1.5,
        ease: "easeInOut",
      }}
      className="w-1.5 h-1.5 rounded-full bg-emerald-500"
      aria-hidden="true"
    />
  );
}

export function FaqClient({ categorias, title, subtitle }: FaqClientProps) {
  const [activeTab, setActiveTab] = useState(categorias[0]?.id ?? "");
  const [openFaq, setOpenFaq] = useState<string | null>(
    categorias[0] ? `${categorias[0].id}-0` : null
  );
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const isInitialRender = useRef(true);
  const shouldReduceMotion = useReducedMotion();

  const activeCategory = categorias.find((c) => c.id === activeTab) ?? categorias[0];

  useEffect(() => {
    if (activeCategory && openFaq === null) {
      setOpenFaq(`${activeCategory.id}-0`);
    }
  }, [activeCategory, openFaq]);

  useEffect(() => {
    if (activeCategory) {
      setOpenFaq(`${activeCategory.id}-0`);
    }
  }, [activeTab]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const tabs = categorias.map((c) => c.id);
    const currentIndex = tabs.indexOf(activeTab);

    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        setActiveTab(tabs[(currentIndex + 1) % tabs.length]);
        break;
      case "ArrowLeft":
        e.preventDefault();
        setActiveTab(tabs[(currentIndex - 1 + tabs.length) % tabs.length]);
        break;
      case "Home":
        e.preventDefault();
        setActiveTab(tabs[0]);
        break;
      case "End":
        e.preventDefault();
        setActiveTab(tabs[tabs.length - 1]);
        break;
    }
  };

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    tabRefs.current[activeTab]?.focus();
  }, [activeTab]);

  const toggleFaq = (faqId: string) => {
    setOpenFaq((current) => (current === faqId ? null : faqId));
  };

  return (
    <div className="space-y-10 md:space-y-12">
      <FadeIn direction="up" delay={0}>
        <div className="mb-10 md:mb-12 text-center px-3 sm:px-2 space-y-3 md:space-y-4">
          {title && (
            <h2 className="font-body font-bold text-2xl md:text-3xl tracking-tight leading-[1.15]">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="font-body text-base text-dab-muted max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </FadeIn>

      {categorias.length > 1 && (
        <FadeIn direction="up" delay={0.1}>
          <div
            className="flex flex-wrap gap-2 justify-center"
            role="tablist"
            aria-label="Filtrar preguntas por servicio"
            onKeyDown={handleKeyDown}
          >
            {categorias.map((cat) => {
              const isActive = activeTab === cat.id;

              return (
                <button
                  key={cat.id}
                  ref={(el) => {
                    tabRefs.current[cat.id] = el;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${cat.id}`}
                  id={`tab-${cat.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveTab(cat.id)}
                  className={cn(baseTabClasses, isActive ? activeColorClasses[cat.color] : inactiveTabClasses)}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 rounded-full bg-current opacity-[0.08]"
                      transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 28 }}
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10 hidden sm:inline">{cat.label}</span>
                  <span className="relative z-10 sm:hidden">{cat.labelCorto}</span>
                </button>
              );
            })}
          </div>
        </FadeIn>
      )}

      <div className="relative min-h-[300px]">
        <AnimatePresence mode="wait">
          {activeCategory && (
            <motion.div
              key={activeCategory.id}
              id={`panel-${activeCategory.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeCategory.id}`}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="space-y-3"
            >
              <StaggerContainer staggerDelay={0.08} className="space-y-3">
                {activeCategory.faqs.map((faq, faqIndex) => {
                  const faqId = `${activeCategory.id}-${faqIndex}`;

                  return (
                    <StaggerItem key={faqId}>
                      <FaqItem
                        faq={faq}
                        index={faqIndex}
                        categoryId={activeCategory.id}
                        color={activeCategory.color}
                        categoryLabel={activeCategory.label}
                        isOpen={openFaq === faqId}
                        onToggle={() => toggleFaq(faqId)}
                      />
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <FadeIn direction="up" delay={0.3}>
        <div className="text-center pt-4">
          <p className="font-body text-sm text-dab-muted/70">
            ¿Tu pregunta no está aquí?{" "}
            <a
              href={WHATSAPP_URL("Hola, tengo una pregunta que no vi en las FAQs")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dab-accent hover:text-cyan-400 transition-colors font-medium"
            >
              Contáctanos por WhatsApp →
            </a>
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
