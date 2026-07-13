import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

// Solo mensajes, intercalados cliente/bot. Cada uno arranca como "escribiendo…"
// y la MISMA burbuja crece hasta convertirse en el mensaje (typing desaparece).
const SCRIPT = [
  { who: 'client', text: 'Hola, ¿me podrían agendar un facial para el jueves?' },
  { who: 'bot', text: '¡Hola! Con gusto. Tengo disponible 4:00 pm o 5:30 pm, ¿cuál le acomoda?' },
  { who: 'client', text: '¿El facial incluye limpieza profunda?' },
  { who: 'bot', text: 'Sí, incluye limpieza profunda, hidratación y masaje relajante. Queda en manos de la especialista.' },
  { who: 'client', text: 'Perfecto, entonces el de 5:30 por favor' },
  { who: 'bot', text: 'Listo, le aparto el jueves 5:30 pm. Le envío un recordatorio de su cita.' },
  { who: 'client', text: 'Muchas gracias' },
  { who: 'bot', text: 'Es un placer. Mientras usted disfruta su tratamiento, nosotros confirmamos por usted. Quedamos atentos.' },
  { who: 'client', text: '¿Me pueden avisar si tienen promoción para volver?' },
  { who: 'bot', text: 'Claro que sí. Le enviaremos una al mes por WhatsApp. ¿Desea que la anote para avisarle?' },
];

const TYPING_MS = 1200; // dura el "escribiendo…" antes de crecer al mensaje
const STEP_MS = 850;    // pausa tras el mensaje antes del siguiente

const TypingDots = ({ dotClass }) => (
  <div className="flex items-center gap-1 py-0.5">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className={`block h-1.5 w-1.5 rounded-full ${dotClass}`}
        animate={{ y: [0, -3, 0], opacity: [0.35, 1, 0.35] }}
        transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
      />
    ))}
  </div>
);

const ChatBubble = ({ who, text, typing }) => {
  const isClient = who === 'client';
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className={`flex ${isClient ? 'justify-start' : 'justify-end'}`}
    >
      {/* Misma burbuja: crece de "escribiendo…" al mensaje */}
      <motion.div
        layout
        className={
          isClient
            ? 'max-w-[85%] rounded-2xl rounded-tl-sm bg-white/5 border border-dab-border/20 px-3.5 py-2.5'
            : 'max-w-[85%] rounded-2xl rounded-tr-sm bg-[#25D366]/15 border border-[#25D366]/30 px-3.5 py-2.5'
        }
      >
        <AnimatePresence mode="wait" initial={false}>
          {typing ? (
            <motion.div
              key="typing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center"
            >
              <TypingDots dotClass={isClient ? 'bg-dab-muted' : 'bg-[#25D366]'} />
            </motion.div>
          ) : (
            <motion.p
              key="msg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-body text-[13px] text-dab-text"
            >
              {text}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default function ChatDemo() {
  const reduce = useReducedMotion();
  const rootRef = useRef(null);
  const inViewRef = useRef(false);
  const [inView, setInView] = useState(false);
  const [started, setStarted] = useState(reduce);
  const [steps, setSteps] = useState(
    reduce ? SCRIPT.map((m, i) => ({ id: i, who: m.who, text: m.text, typing: false })) : []
  );
  const [done, setDone] = useState(reduce);

  // Visibilidad real de la tarjeta: solo anima mientras está en viewport.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        setInView(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Arranca la primera vez que entra en viewport.
  useEffect(() => {
    if (reduce) return;
    if (inView && !started) setStarted(true);
  }, [inView, started, reduce]);

  // Secuencia: avanza SOLO mientras inView; se pausa al salir de la sección.
  useEffect(() => {
    if (!started || reduce || done) return;
    let cancelled = false;
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    const waitIfHidden = async () => {
      while (!inViewRef.current && !cancelled) {
        await wait(250);
      }
    };
    const run = async () => {
      for (let i = 0; i < SCRIPT.length; i++) {
        if (cancelled) return;
        await waitIfHidden(); // pausa si el usuario scrolleó fuera
        if (cancelled) return;
        const msg = SCRIPT[i];
        setSteps((prev) => [...prev, { id: i, who: msg.who, text: msg.text, typing: true }]);
        await wait(TYPING_MS);
        if (cancelled) return;
        await waitIfHidden();
        if (cancelled) return;
        setSteps((prev) => prev.map((s) => (s.id === i ? { ...s, typing: false } : s)));
        await wait(STEP_MS);
      }
      if (!cancelled) setDone(true);
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [started, reduce, done]);

  return (
    <div ref={rootRef} className="mt-14 w-full liquid-surface rounded-3xl p-4 sm:p-5 shadow-[0_0_30px_rgba(123,97,255,0.12)]">
      {/* Header estilo chat */}
      <div className="flex items-center gap-3 mb-3 pb-3 border-b border-dab-border/20">
        <div className="h-9 w-9 rounded-full flex items-center justify-center text-[#25D366] bg-[#25D366]/15">
          <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.464 3.489" />
          </svg>
        </div>
        <div className="leading-tight">
          <p className="text-dab-text font-body font-semibold text-sm">DAB · Asistente IA</p>
          <p className="text-dab-muted font-body text-[11px]">responde al instante</p>
        </div>
        <span className="ml-auto h-2 w-2 rounded-full bg-[#25D366] shadow-[0_0_8px_#25D366]"></span>
      </div>

      {/* Conversación */}
      <div className="space-y-2.5 min-h-[180px]">
        {!started && !reduce && (
          <p className="font-mono text-[11px] text-dab-muted/60 text-center pt-6 animate-pulse">
            ↓ desliza para ver la demo en vivo
          </p>
        )}

        <AnimatePresence initial={false}>
          {steps.map((s) => (
            <ChatBubble key={s.id} who={s.who} text={s.text} typing={s.typing} />
          ))}
        </AnimatePresence>

        {started && !done && !reduce && (
          <p className="font-mono text-[10px] text-dab-muted/50 text-center pt-1">demo en vivo…</p>
        )}
      </div>
    </div>
  );
}
