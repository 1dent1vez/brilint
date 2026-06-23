import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function MobileNav({ links, cta, ariaLabel, menuAriaLabel }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative md:hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-dab-border bg-dab-surface/90 text-dab-accent transition hover:border-dab-accent/50"
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-controls="mobile-nav-menu"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          {open ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav-menu"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 mt-3 w-[min(88vw,17rem)] rounded-xl border border-dab-border bg-dab-surface/95 p-4 shadow-xl backdrop-blur-md z-50"
            role="menu"
            aria-label={menuAriaLabel}
          >
            <nav className="flex flex-col gap-2">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-xs font-mono uppercase tracking-wider text-dab-muted hover:bg-dab-accent/10 hover:text-dab-accent transition-colors"
                  role="menuitem"
                >
                  {link.label}
                </a>
              ))}

              <div className="mt-2 border-t border-dab-border pt-3">
                <a
                  href={cta.href}
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-dab-accent to-[#608BFF] px-4 py-3 text-xs font-mono font-bold uppercase tracking-wider text-dab-bg shadow-md hover:brightness-110 active:scale-95 transition-all"
                  role="menuitem"
                >
                  {cta.label}
                  {cta.icon === 'arrow_forward' && (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  )}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MobileNav;
