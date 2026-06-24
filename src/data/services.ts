export interface Plan {
  id: string;
  name: string;
  price: string;
  description: string;
  popular?: boolean;
  features: string[];
  ctaText: string;
}

export interface Service {
  slug: string;
  name: string;
  icon: string;
  color: 'amber' | 'cyan' | 'rose';
  tagline: string;
  teaser: string;
  badge: string;
  description: string;
  tabs: {
    planes: Plan[];
    incluye: {
      deliverables: string[];
      support: string[];
    };
    proceso: {
      step: number;
      title: string;
      description: string;
    }[];
    faq: {
      question: string;
      answer: string;
      slug?: string;
    }[];
  };
}

export const services: Service[] = [
  {
    slug: 'despierta',
    name: 'Despierta',
    icon: '☀',
    color: 'amber',
    tagline: 'Tu primer chatbot y landing page en 7 días. Sin contrato, sin riesgo.',
    teaser: 'Deja de perder clientas que escriben por WhatsApp y nunca les contestas. En 7 días tu negocio responde solo, agenda citas y nunca olvida un seguimiento.',
    badge: 'PUERTA DE ENTRADA',
    description: 'Automatiza lo repetitivo. Libera tu tiempo para lo que realmente importa. Tus sistemas trabajan mientras tú descansas.',
    tabs: {
      planes: [
        {
          id: 'starter',
          name: 'Despierta',
          price: '$3,500 MXN/mes',
          description: 'Para negocios que quieren dejar de perder clientes hoy',
          features: [
            'Chatbot WhatsApp con 200 conversaciones/mes incluidas',
            '1 automatización simple (recordatorios, FAQ o seguimiento)',
            'Landing page profesional (Hero + 3 secciones)',
            'Integración WhatsApp Business + Google Maps + botón de contacto',
            'SEO técnico básico: metadatos, Search Console, velocidad <2s',
            'Reporte mensual: conversaciones, clicks y citas agendadas',
            'Soporte por WhatsApp con respuesta en <2 horas (L-V 9am-7pm)',
            'Sin contrato. Cancelas cuando quieras. Garantía de 45 días.'
          ],
          ctaText: 'Despierta mi negocio',
        },
        {
          id: 'business',
          name: 'Despierta Pro',
          price: '$7,000 MXN/mes',
          description: 'Para negocios que ya captan y quieren escalar sin fricción',
          popular: true,
          features: [
            'Todo lo de Despierta, escalado',
            'Hasta 1,000 conversaciones WhatsApp/mes (DAB absorbe costo)',
            '3 automatizaciones simultáneas (citas + FAQ + seguimiento)',
            'Dashboard simple de métricas en tiempo real',
            '1 revisión mensual de estrategia con el equipo DAB',
            'Soporte prioritario con respuesta en <1 hora',
            'Upgrade gratis a Crece (Growth) cuando estés listo',
            'Setup fee: $5,000 (3 mensualidades de $1,667 sin intereses)'
          ],
          ctaText: 'Elegir Despierta Pro',
        },
        {
          id: 'enterprise',
          name: 'Despierta Enterprise',
          price: 'Personalizado',
          description: 'Para cadenas o negocios con operaciones complejas',
          features: [
            'Conversaciones ilimitadas en WhatsApp Business API',
            'Automatizaciones ilimitadas + flujos custom',
            'Integraciones con CRM, ERP o sistemas propios',
            'SLA de disponibilidad garantizado',
            'Developer dedicado a tu cuenta',
            'Capacitación presencial para tu equipo',
            'Mantenimiento y optimización continua incluidos',
            'Roadmap tecnológico trimestral personalizado'
          ],
          ctaText: 'Agendar diagnóstico gratuito',
        },
      ],
      incluye: {
        deliverables: [
          'Chatbot WhatsApp configurado y entrenado para tu negocio',
          'Landing page profesional con diseño responsive y carga <2 segundos',
          'Integración nativa con Google Maps, botón de WhatsApp y formularios',
          'SEO técnico completo: estructura semántica, metadatos y registro en Search Console',
          'Documentación de flujos: ves qué hace la IA (Glass Box)',
          'Manual de operación y video tutoriales para tu equipo',
          'Backup y redundancia configurada desde el día 1',
          'Reporte mensual en PDF: conversaciones, clicks y citas agendadas'
        ],
        support: [
          '45 días de garantía: si no ves resultados, rehacemos o devolvemos tu dinero',
          '30 días de ajustes sin costo después de la entrega',
          'Monitoreo activo de errores: sabemos si algo falla antes que tú',
          'Optimización mensual de rendimiento y flujos',
          'Soporte por WhatsApp con respuesta en menos de 2 horas en horario laboral',
          '1 revisión mensual incluida para ajustar estrategia',
          'Upgrade a Crece (Growth) en cualquier momento sin penalización',
          'Cancelación con 15 días de aviso. Entrega de accesos en 7 días hábiles'
        ],
      },
      proceso: [
        {
          step: 1,
          title: 'Diagnóstico gratuito',
          description: 'En 30 minutos descubrimos cuántas clientas pierdes por no contestar WhatsApp a tiempo. Mapeamos tu operación actual y detectamos el primer flujo que más te va a liberar.'
        },
        {
          step: 2,
          title: 'Diseño de tu sistema',
          description: 'Creamos el blueprint de tu chatbot y landing con tus colores, servicios y tono de voz. Tú apruebas antes de que escribamos una sola línea de código.'
        },
        {
          step: 3,
          title: 'Implementación en 7 días',
          description: 'Construimos, integramos y testeamos todo en tu operación real. No interrumpimos tus ventas. Tu chatbot empieza a responder mientras duermes.'
        },
        {
          step: 4,
          title: 'Entrega y optimización',
          description: 'Capacitamos a tu equipo en 30 minutos. Te entregamos documentación, videos y accesos. Ajustamos durante 30 días según cómo tus clientas realmente usan el sistema.'
        },
      ],
      faq: [
        {
          question: '¿Cuánto tiempo tarda estar funcionando?',
          answer: 'Tu chatbot y landing page están captando clientas en 7 días hábiles desde el diagnóstico. No son 2 semanas. No son 30 días. 7 días y tu WhatsApp deja de sonar en silencio.'
        },
        {
          question: '¿Necesito cambiar mis herramientas o aprender algo nuevo?',
          answer: 'No. Usamos WhatsApp Business (que ya tienes), Google Maps (que ya tienes) y hosting gratuito. Tú sigues atendiendo como siempre, solo que ahora el 80% de las preguntas repetitivas se responden solas. Tu equipo aprende en 30 minutos.'
        },
        {
          question: '¿Y si no me convence o no veo resultados?',
          answer: 'Tienes 45 días de garantía. Si no ves más citas agendadas, más respuestas automáticas o más tiempo liberado, rehacemos el sistema o te devolvemos el 100% de tu inversión. Sin contrato, sin letra chica. Cancelas cuando quieras con 15 días de aviso.'
        },
        {
          question: '¿Hay algún costo oculto de herramientas o software?',
          answer: 'Cero. Usamos WhatsApp Business API (1,000 conversaciones gratis), hosting gratuito en Vercel/Netlify, Google Analytics y Search Console (gratis), y automatización con n8n o Make (1,000 operaciones gratis). Si escala más allá de 2,000 conversaciones, nosotros absorbemos el costo o te proponemos upgrade a Crece.'
        },
        {
          question: '¿Qué pasa si mi negocio crece y necesito más?',
          answer: 'Esa es la idea. Despierta es tu puerta de entrada. Cuando estés listo para CRM, campañas pagadas, email marketing o Voice AI, upgradeas a Crece (Growth) pagando solo la diferencia prorrateada. Sin empezar de cero.'
        },
      ],
    },
  },


  {
    slug: 'crece',
    name: 'Crece',
    icon: '↗',
    color: 'cyan',
    tagline: 'Más clientes, menos trabajo, datos que te guían.',
    teaser: 'El único plan que no solo publica por ti, sino que interactúa, califica y convierte mientras tú descansas. Deja de publicar y rezar.',
    badge: 'MÁS ELEGIDO',
    description: 'Escala con estructura. Todo tu ecosistema digital — chatbot, ads, contenido, CRM y email — trabajando en un solo flujo que califica leads automáticamente y solo te pasa los que ya quieren comprar.',
    tabs: {
      planes: [
        {
          id: 'starter',
          name: 'Crece',
          price: '$8,500 MXN/mes',
          description: 'Para negocios que ya captan clientes y quieren escalar sin caos',
          features: [
            'Chatbot IA avanzado: 1,000 conversaciones/mes que califican leads (caliente/tibio/frío)',
            '3 automatizaciones personalizadas: CRM + calendario + email o seguimiento + recordatorios + reactivación',
            'Landing completa: 7 secciones + copywriting persuasivo + A/B testing de headline',
            'Meta Ads + Google Ads: configuración inicial, segmentación por zona, 2 campañas activas',
            'Google Analytics + tracking completo: de click a cita. Reporte de costo por lead',
            'SEO local avanzado: Google Business optimizado, reseñas, publicaciones semanales, tracking de rankings',
            'Contenido para redes: 8 posts/stories por semana con calendario editorial',
            'CRM HubSpot configurado: pipeline de ventas, recordatorios, segmentación (hasta 1,000 contactos gratis)',
            'Email marketing: 2 secuencias (bienvenida + reactivación) con A/B testing',
            'Reporte semanal con métricas de conversión, leads, costos y recomendaciones',
            'Soporte prioritario WhatsApp: respuesta en <2 horas + 30 días de ajustes incluidos',
            'Sin contrato. Cancelas cuando quieras. Garantía de 45 días.'
          ],
          ctaText: 'Hacer crecer mi negocio',
        },
        {
          id: 'business',
          name: 'Crece Pro',
          price: '$12,500 MXN/mes',
          description: 'Para negocios que quieren dominar su zona y no depender del boca a boca',
          popular: true,
          features: [
            'Todo lo de Crece, escalado',
            'Hasta 3,000 conversaciones WhatsApp/mes (DAB absorbe costo de API)',
            '5 automatizaciones simultáneas + flujos de nutrición de leads',
            'Landing + 2 páginas adicionales (servicios, promociones) con copywriting',
            'Gestión continua de Meta Ads + Google Ads: optimización semanal del presupuesto',
            'Dashboard simple de métricas en tiempo real: leads, conversiones, ROI',
            'Contenido para redes: 12 piezas/semana + community management (responder DMs/comentarios)',
            'Email marketing: 4 secuencias + newsletters mensuales',
            '1 revisión estratégica semanal con el equipo DAB',
            'Soporte prioritario con respuesta en <1 hora en horario laboral',
            'Upgrade gratis a Domina (Scale) cuando estés listo',
            'Setup fee: $12,000 MXN (3 mensualidades de $4,000 sin intereses o $10,800 contado con 10% descuento)'
          ],
          ctaText: 'Elegir Crece Pro',
        },
        {
          id: 'enterprise',
          name: 'Crece Enterprise',
          price: 'Personalizado',
          description: 'Para cadenas o negocios con múltiples sucursales',
          features: [
            'Conversaciones ilimitadas en WhatsApp Business API',
            'Automatizaciones ilimitadas + flujos custom por sucursal',
            'Gestión de campañas publicitarias multi-locación',
            'CRM avanzado con integraciones ERP o sistemas propios',
            'Dashboard ejecutivo con métricas consolidadas',
            'Content factory: 20+ piezas/semana + gestión de influencers locales',
            'Email marketing avanzado: segmentación dinámica, automatizaciones complejas',
            'SLA de disponibilidad garantizado',
            'Developer y strategist dedicados a tu cuenta',
            'Workshops presenciales mensuales con tu equipo',
            'Roadmap de crecimiento trimestral personalizado'
          ],
          ctaText: 'Agendar diagnóstico gratuito',
        },
      ],
      incluye: {
        deliverables: [
          'Chatbot IA calificador de leads configurado y entrenado para tu negocio y tono de voz',
          'Landing page completa (7 secciones) con copywriting persuasivo, diseño responsive y carga <1.5 segundos',
          '2 campañas publicitarias activas (Meta Ads + Google Ads) con segmentación quirúrgica por zona',
          'Google Analytics 4 + Google Tag Manager configurados: tracking de conversión completo',
          'SEO local avanzado: optimización de Google Business Profile, estrategia de reseñas, publicaciones semanales',
          'Calendario editorial de contenido: 8 posts/stories por semana con diseño en Canva + copy en Copy.ai + refinamiento humano',
          'CRM HubSpot configurado: pipeline de ventas, automatizaciones internas, recordatorios y segmentación',
          '2 secuencias de email marketing: bienvenida (onboarding) + reactivación (clientes dormidos)',
          'Documentación de flujos y automatizaciones (Glass Box: ves qué hace la IA)',
          'Reporte semanal en PDF con métricas de conversión, leads, costos por adquisición y recomendaciones accionables',
          'Manual de operación y video tutoriales para que tu equipo gestione el día a día sin depender de DAB'
        ],
        support: [
          '45 días de garantía: si no ves más leads calificados, más citas agendadas o más ventas, rehacemos o devolvemos',
          '30 días de ajustes sin costo después de la entrega: optimizamos campañas, flujos y copy según datos reales',
          'Monitoreo activo de campañas y automatizaciones: ajustamos presupuestos y segmentación antes de que pierdas dinero',
          'Optimización semanal de rendimiento: no esperamos al mes para corregir, revisamos cada 7 días',
          'Soporte prioritario por WhatsApp: respuesta en menos de 2 horas en horario laboral (L-V 9am-7pm)',
          '1 revisión estratégica semanal incluida: analizamos números y ajustamos rumbo juntos',
          'Upgrade a Domina (Scale) en cualquier momento sin penalización ni starting over',
          'Cancelación con 15 días de aviso. Entrega de accesos, datos y activos en 7 días hábiles'
        ],
      },
      proceso: [
        {
          step: 1,
          title: 'Auditoría de crecimiento',
          description: 'En 45 minutos descubrimos dónde se te escapan los clientes: ¿falta seguimiento? ¿ads sin segmentar? ¿contenido que no convierte? Mapeamos tu embudo actual y detectamos los 3 puntos de fuga que más dinero te cuestan hoy.'
        },
        {
          step: 2,
          title: 'Blueprint de tu máquina de ventas',
          description: 'Diseñamos el ecosistema completo: chatbot calificador, landing que convierte, ads segmentados, CRM que nutre y email que reactiva. Todo conectado. Todo midiendo. Tú apruebas cada pieza antes de que activemos nada.'
        },
        {
          step: 3,
          title: 'Implementación en 14 días',
          description: 'Construimos, integramos y testeamos cada canal. Tu chatbot empieza a calificar leads. Tus ads empiezan a traer tráfico local. Tu CRM empieza a recordar a las clientas que no volvieron. Todo en 2 semanas, no en 2 meses.'
        },
        {
          step: 4,
          title: 'Optimización semanal permanente',
          description: 'No te dejamos solo. Cada semana revisamos métricas, ajustamos campañas, refinamos copy y escalamos lo que funciona. El 98% de nuestros clientes renuevan porque ven los números crecer cada 7 días.'
        },
      ],
      faq: [
        {
          question: '¿Cuánto debo invertir en publicidad aparte del plan?',
          answer: 'El plan incluye la configuración y gestión de tus campañas, pero el presupuesto de ads va aparte y lo controlas tú. Recomendamos empezar con $3,000-$5,000 MXN/mes en Meta/Google. DAB optimiza cada peso para que no quemes dinero en gente que no está en tu zona. Con el tracking que instalamos, sabrás exactamente cuánto cuesta cada lead y cada cita.'
        },
        {
          question: '¿Realmente necesito CRM, email marketing y contenido para redes? Mi negocio es local.',
          answer: 'Tu negocio local compite contra cadenas con presupuestos millonarios. La única ventaja que tienes es la relación personal. El CRM recuerda el cumpleaños de tu clienta. El email la trae de vuelta cuando no ha venido en 3 meses. El contenido la hace sentir que te conoce antes de pisar tu local. Sin eso, eres invisible. Con eso, eres la opción obvia.'
        },
        {
          question: '¿Y si ya tengo alguien que me "maneja las redes"?',
          answer: 'Perfecto. Nosotros no reemplazamos, conectamos. Tu community manager sube contenido; nosotros le damos el calendario editorial, el copy probado y los leads calificados que llegan desde el chatbot. Muchos de nuestros clientes conservan a su equipo y les damos la estrategia y las herramientas para que su trabajo finalmente se traduzca en ventas medibles.'
        },
        {
          question: '¿Cómo sé que esto funciona y no estoy tirando dinero?',
          answer: 'Tres razones: Primero, 45 días de garantía. Segundo, reporte semanal con números reales: leads generados, costo por lead, citas agendadas, ventas cerradas. Tercero, el 98% de nuestros clientes renuevan después del primer mes. No es magia, es que por primera vez ves en una hoja de Excel cuánto ganas por cada peso que inviertes. Si los números no mejoran, cancelas. Sin contrato, sin letra chica.'
        },
        {
          question: '¿Qué pasa si mi negocio crece más allá de lo que incluye Crece?',
          answer: 'Esa es la meta. Cuando estés listo para Voice AI, automatizaciones ilimitadas, dashboard ejecutivo en tiempo real o estrategia de expansión a otra sucursal, upgradeas a Domina (Scale) pagando solo la diferencia prorrateada. No pierdes nada de lo construido. Tu máquina de ventas simplemente se vuelve más potente.'
        },
      ],
    },
  },


  {
    slug: 'domina',
    name: 'Domina',
    icon: '♔',
    color: 'rose',
    tagline: 'Tu negocio funciona solo, tú decides hacia dónde.',
    teaser: 'Chatbot enterprise, Voice AI que agenda 24/7, automatizaciones ilimitadas y un dashboard que predice tu próximo cliente. Para dueños que ya no operan — dirigen.',
    badge: 'PARA LÍDERES',
    description: 'Transformación total. Sistemas avanzados y ventaja competitiva real en tu mercado. No compitas. Domina.',
    tabs: {
      planes: [
        {
          id: 'starter',
          name: 'Domina',
          price: '$25,000 MXN/mes',
          description: 'Para negocios que ya captan bien y quieren dejar de depender de la dueña para todo',
          features: [
            'Chatbot enterprise WhatsApp: conversaciones ilimitadas, multilenguaje, calificación avanzada con scoring',
            'Voice AI: agente telefónico que responde, agenda y califica 24/7 con voz natural. 500 minutos/mes incluidos',
            'Automatizaciones ilimitadas en plataforma (Make/n8n). 3 diseños de flujos nuevos por mes incluidos. Glass Box: tú puedes crear los tuyos',
            'Sitio web completo + blog + embudos de conversión (awareness → consideration → decision)',
            'Meta Ads + Google Ads: estrategia, configuración y optimización continua. Presupuesto de ads aparte (mínimo $10,000/mes recomendado)',
            'SEO local dominante: posicionamiento #1 en "cerca de mí", competencia monitoreada, backlinks locales, reputación online gestionada',
            'Contenido para redes: 15 posts/stories/reels por semana con calendario editorial',
            'Community reactivo mejorado: responde todo en <1 hora + 2-3 iniciativas proactivas estratégicas por semana',
            'CRM avanzado (HubSpot Starter o Pipedrive): pipeline multi-etapa, automatizaciones de venta, forecasting',
            'Email marketing ilimitado: todas las secuencias que necesites, A/B testing, segmentación avanzada',
            'Dashboard en tiempo real con métricas clave, alertas automáticas y predicciones de leads y ventas',
            '1 reunión de estrategia mensual con especialista certificado: revisión de métricas, ajustes y planificación',
            'Soporte 24/7 por WhatsApp con respuesta en <30 minutos. Manager de cuenta asignado',
            'Sin contrato. Cancelas cuando quieras. Garantía de 60 días. Setup fee: $25,000 MXN (3 mensualidades de $8,333 sin intereses o $22,500 contado con 10% descuento)'
          ],
          ctaText: 'Domina mi mercado',
        },
        {
          id: 'business',
          name: 'Domina Lidera',
          price: '$35,000 MXN/mes',
          description: 'Para negocios que no solo quieren liderar su zona — quieren ser intocables',
          popular: true,
          features: [
            'Todo lo de Domina, escalado',
            'Community proactivo completo: 10+ iniciativas estratégicas por semana, outreach, colaboraciones con influencers locales',
            'Ciberseguridad auditoría: revisión de vulnerabilidades en tu infraestructura digital y protocolos de protección de datos',
            'Business Intelligence + predicciones avanzadas: modelos de IA que predicen tendencias de ventas, estacionalidad y churn antes de que sucedan',
            'App móvil propia (PWA o nativa básica): tu negocio en el bolsillo de tu clienta con notificaciones push y agendamiento nativo',
            'Desarrollos custom complejos: integraciones con ERP, sistemas de inventario, pasarelas de pago específicas o funcionalidades a medida',
            'Hasta 1,000 minutos Voice AI/mes (DAB absorbe costo de excedente hasta 750 minutos adicionales)',
            '5 diseños de flujos nuevos por mes incluidos en automatizaciones',
            '2 reuniones de estrategia mensuales con especialista y 1 workshop presencial trimestral con tu equipo',
            'Soporte 24/7 con SLA garantizado: respuesta en <15 minutos. Escalación directa a fundador si se requiere',
            'Content factory: 20+ piezas/semana + gestión de influencers locales y micro-colaboraciones',
            'Upgrade gratis a Domina Enterprise cuando estés listo para multi-sucursal',
            'Setup fee: $25,000 MXN (mismas facilidades que Domina)'
          ],
          ctaText: 'Elegir Domina Lidera',
        },
        {
          id: 'enterprise',
          name: 'Domina Enterprise',
          price: 'Personalizado',
          description: 'Para cadenas, franquicias o negocios con múltiples sucursales en el Valle de Toluca',
          features: [
            'Conversaciones ilimitadas en WhatsApp Business API + Voice AI ilimitado',
            'Automatizaciones ilimitadas + flujos custom por sucursal con branding y tono de voz específico',
            'Gestión de campañas publicitarias multi-locación con presupuestos independientes y reporting consolidado',
            'CRM avanzado con integraciones ERP, sistemas de inventario y pasarelas de pago propias',
            'Dashboard ejecutivo con métricas consolidadas por sucursal, región y totales. Alertas predictivas',
            'App móvil nativa avanzada con geolocalización, agendamiento por sucursal y programa de lealtad integrado',
            'Equipo dedicado DAB: strategist, developer y community manager asignados exclusivamente a tu marca',
            'Infraestructura tecnológica propia o multi-tenant según tu arquitectura',
            'Roadmap de expansión anual: apertura de nuevas sucursales, penetración de mercados adyacentes, M&A strategy',
            'Board presentations mensuales para stakeholders, inversionistas o franquiciatarios',
            'Ciberseguridad enterprise + cumplimiento normativo (PROFECO, COFEPRIS según sector)',
            'Soporte 24/7 con SLA garantizado y número directo de emergencia'
          ],
          ctaText: 'Agendar diagnóstico ejecutivo',
        },
      ],
      incluye: {
        deliverables: [
          'Chatbot enterprise configurado y entrenado con calificación avanzada de leads (scoring automático caliente/tibio/frío)',
          'Voice AI con voz natural en español/inglés: transcripción, transferencia a humano con contexto completo, agenda 24/7',
          'Automatizaciones ilimitadas en plataforma + 3 diseños de flujos nuevos por mes. Documentación Glass Box: ves y editas lo que hace la IA',
          'Sitio web completo con blog SEO + embudos de conversión de 3 etapas: awareness, consideration, decision',
          'Meta Ads + Google Ads: configuración, segmentación quirúrgica por zona, A/B testing de creativos y audiencias, optimización semanal',
          'SEO local dominante: optimización Google Business Profile, estrategia de reseñas, publicaciones semanales, tracking de rankings vs competencia',
          'Calendario editorial de 15 piezas/semana: posts, stories, reels. Diseño en Canva Pro + copy en Copy.ai + refinamiento humano DAB',
          'Community reactivo mejorado: respuesta <1 hora + 2-3 iniciativas proactivas estratégicas por semana (polls, preguntas, stories interactivas)',
          'CRM HubSpot Starter o Pipedrive: pipeline multi-etapa, automatizaciones de venta, forecasting, segmentación avanzada',
          'Email marketing ilimitado: secuencias de bienvenida, reactivación, carrito abandonado, cumpleaños. A/B testing y segmentación dinámica',
          'Dashboard en tiempo real con Google Data Studio o Metabase: métricas clave, alertas automáticas, predicciones de leads y ventas. Acceso 24/7',
          'Reporte semanal ejecutivo en PDF: métricas de conversión, leads, costos por adquisición, ROI de campañas y recomendaciones accionables',
          'Documentación completa de flujos, automatizaciones, arquitectura de sistemas y manual de operación para tu equipo',
          'Capacitación presencial inicial para tu equipo (hasta 5 personas) + video tutoriales de administración del día a día'
        ],
        support: [
          '60 días de garantía: si no ves resultados medibles (más leads calificados, más citas, más ventas, menos tiempo operativo), rehacemos o devolvemos el 100%',
          'Setup fee de $25,000 MXN: cubre auditoría completa, arquitectura de sistemas, configuración de todos los canales, migración de datos, capacitación y 30 días de soporte intensivo post-entrega',
          '30 días de ajustes sin costo después de la entrega: optimizamos campañas, flujos, copy y segmentación según datos reales de tu operación',
          'Monitoreo activo 24/7 de campañas, chatbot, Voice AI y automatizaciones: ajustamos antes de que pierdas dinero',
          'Optimización semanal permanente: no esperamos al mes. Cada 7 días revisamos números, ajustamos presupuestos y escalamos lo que funciona',
          'Soporte 24/7 por WhatsApp con respuesta en <30 minutos. Manager de cuenta asignado que conoce tu negocio por nombre',
          '1 reunión de estrategia mensual de 1 hora con especialista certificado: revisamos métricas, reajustamos rumbo y planificamos el próximo mes',
          'Upgrade a Domina Lidera o Enterprise en cualquier momento sin penalización ni starting over. Tu ecosistema simplemente se vuelve más potente',
          'Cancelación con 15 días de aviso. Entrega completa de accesos, datos, flujos, documentación y activos en 7 días hábiles'
        ],
      },
      proceso: [
        {
          step: 1,
          title: 'Inmersión estratégica',
          description: 'Dos semanas intensivas donde nos sumergimos en tu negocio, mercado y competencia. Analizamos cada punto de contacto con tu clienta: ¿dónde se te escapan leads? ¿qué hace tu competencia que tú no? ¿cuánto dinero dejas en la mesa cada mes? Salimos con un mapa de guerra claro.'
        },
        {
          step: 2,
          title: 'Arquitectura de dominio',
          description: 'Diseñamos tu ecosistema completo: chatbot enterprise que califica, Voice AI que nunca duerme, ads que traen tráfico local, CRM que nutre, email que reactiva, dashboard que predice. Todo conectado. Todo midiendo. Todo en una sola plataforma que tú controlas. Tú apruebas cada pieza antes de que activemos nada.'
        },
        {
          step: 3,
          title: 'Construcción en 14 días',
          description: 'Implementamos tecnología, automatizaciones, playbooks de ejecución y contenido del primer mes. Tu chatbot empieza a calificar leads. Tu Voice AI empieza a agendar citas mientras duermes. Tus ads empiezan a traer tráfico local calificado. Tu CRM empieza a recordar a las clientas que no volvieron. Todo en 2 semanas, no en 2 meses.'
        },
        {
          step: 4,
          title: 'Dominio y optimización continua',
          description: 'No te dejamos solo. Cada semana optimizamos campañas, refinamos flujos, ajustamos copy y escalamos lo que funciona. Cada mes te sentamos con un especialista a revisar métricas y planificar la siguiente jugada. Mientras tu competencia publica y reza, tú decides con datos. Mientras ellos operan, tú diriges. Eso es dominar.'
        },
      ],
      faq: [
        {
          question: '¿$25,000 pesos al mes no es demasiado para un negocio local?',
          answer: 'Es demasiado si solo quieres "una página web y que posteen en redes". Es una inversión ridícula si tu negocio ya factura $150,000+ al mes y pierdes 20-30% de tu tiempo en operaciones que deberían ser automáticas. Nuestros clientes en Domina recuperan en promedio 15-20 horas semanales de trabajo operativo y ven un 3.4x ROI en el primer trimestre. No estás pagando por herramientas — estás pagando por que tu negocio funcione sin depender de tu presencia física. Eso tiene un valor que se multiplica cada mes.'
        },
        {
          question: '¿Voice AI no suena robótico? ¿Mis clientas no se dan cuenta?',
          answer: 'Usamos Vapi o Bland AI con voces naturales en español neutro o con acento mexicano según prefieras. La transcripción es instantánea, la transferencia a humano lleva todo el contexto de la conversación (nombre, servicio solicitado, horario preferido) y la mayoría de tus clientas ni notan que hablaron con IA. Lo que sí notan es que alguien les contestó a las 11pm un domingo y les agendó la cita. Eso es lo que recordarán.'
        },
        {
          question: '¿Y si ya tengo un equipo de marketing o una agencia que "me maneja las redes"?',
          answer: 'Perfecto. Nosotros no reemplazamos — conectamos y potenciamos. Tu community manager o agencia actual recibe de nosotros el calendario editorial probado, el copy que convierte, los leads calificados que vienen desde el chatbot y los datos de qué contenido genera citas reales. Muchos de nuestros clientes en Domina conservan a su equipo interno y les damos la estrategia, las herramientas y los leads para que su trabajo finalmente se traduzca en ventas medibles. Dejas de pagar por "posts bonitos" y empiezas a pagar por un sistema que vende.'
        },
        {
          question: '¿Qué pasa si después de 6 meses quiero bajar de plan o pausar?',
          answer: 'Sin contrato, sin penalización. Cancelas con 15 días de aviso y te entregamos todos los accesos, datos, flujos y documentación en 7 días. Pero aquí está la verdad: en 6 meses tu operación ya depende del sistema. Tus clientas ya están acostumbradas a que el chatbot les confirme citas. Tu equipo ya no sabe cómo hacer seguimiento manual. Lo más común es que nuestros clientes en Domina no bajan — suben a Lidera o Enterprise porque los números lo justifican. Eso es el verdadero riesgo: no quedarte, sino volverte adicto a los resultados.'
        },
        {
          question: '¿El presupuesto de publicidad va aparte? ¿Cuánto necesito?',
          answer: 'Sí. El plan Domina incluye la configuración, gestión y optimización de tus campañas, pero el presupuesto de ads va aparte y lo controlas tú directamente. Recomendamos mínimo $10,000-$15,000 MXN/mes en Meta Ads + Google Ads para empezar a ver tráfico calificado consistente. Con el tracking que instalamos, sabrás exactamente cuánto cuesta cada lead, cada cita y cada venta. Muchos de nuestros clientes empiezan con $10,000 y escalan a $30,000+ cuando ven que cada peso regresa multiplicado. Tú decides cuánto crecer.'
        },
      ],
    },
  },
];



