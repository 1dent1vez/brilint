export interface Metrica {
  valor: string;
  etiqueta: string;
}

export interface CasoExito {
  id: string;
  servicio: 'despierta' | 'crece' | 'domina';
  proyecto: {
    titulo: string;
    tipo: string;
    descripcion: string;
    zona: string;
    url?: string;
    imagen: string; // ruta a /public/portafolio/ o placeholder
    mockup?: string; // ruta a /public/portafolio/ para scroll vertical
  };
  testimonio: {
    nombre: string;
    rol: string;
    mensaje: string;
    esVerificado: boolean;
    badgeLabel: string;
  };
  metricas: Metrica[];
  techStack?: string[];
}

export const casosExito: CasoExito[] = [
  {
    id: 'glam-studio-despierta',
    servicio: 'despierta',
    proyecto: {
      titulo: 'Glam Studio',
      tipo: 'Landing + Chatbot WhatsApp',
      descripcion: 'Landing page promocional con catálogo de servicios de manicura, pestañas y tratamientos estéticos. Chatbot básico que responde horarios, precios y agenda citas automáticamente.',
      zona: 'Metepec',
      url: 'https://glam-studio.vercel.app/',
      imagen: '/portafolio/proyecto-destacado-1.webp',
      mockup: '/portafolio/proyecto-destacado-1-long.webp',
    },
    testimonio: {
      nombre: 'Anahi G.',
      rol: 'Dueña de Glam Studio',
      mensaje: 'Antes respondía todo por WhatsApp sin ningún orden. Con la landing y el chatbot ahora me encuentran fácil, llegan mensajes de clientes nuevos cada semana y yo ya no estoy pegada al celular.',
      esVerificado: true,
      badgeLabel: 'Reseña verificada',
    },
    metricas: [
      { valor: '+40%', etiqueta: 'Mensajes nuevos' },
      { valor: '12 hrs', etiqueta: 'Semanales liberadas' },
      { valor: '7 días', etiqueta: 'Para estar operando' },
    ],
    techStack: ['WhatsApp API', 'Astro', 'Tailwind'],
  },
  {
    id: 'beauty-glam-crece',
    servicio: 'crece',
    proyecto: {
      titulo: 'Beauty & Glam Studio',
      tipo: 'Landing + SEO Local + Ads',
      descripcion: 'Sitio web para salón de estética de alta gama con catálogos de uñas y tratamientos. Optimización de Google Business Profile y configuración inicial de campañas en Meta Ads.',
      zona: 'Metepec',
      url: 'https://beautyandglam-studio.vercel.app/',
      imagen: '/portafolio/proyecto-destacado-2.webp',
      mockup: '/portafolio/proyecto-destacado-2-long.webp',
    },
    testimonio: {
      nombre: 'Mariana R.',
      rol: 'Fundadora de Beauty & Glam',
      mensaje: 'Pasé de depender del boca a boca a tener una lista de espera. La landing no solo se ve profesional, trae clientas que llegan sabiendo exactamente qué servicio quieren.',
      esVerificado: true,
      badgeLabel: 'Reseña verificada',
    },
    metricas: [
      { valor: '+180%', etiqueta: 'Citas agendadas' },
      { valor: '4.9★', etiqueta: 'Google Reviews' },
      { valor: '$3,200', etiqueta: 'Ahorro mensual en ads' },
    ],
    techStack: ['Astro', 'Meta Ads', 'Google Business'],
  },
  {
    id: 'dental-smile-domina',
    servicio: 'domina',
    proyecto: {
      titulo: 'Dental Smile Toluca',
      tipo: 'Ecosistema completo: Web + Chatbot + CRM + Ads',
      descripcion: 'Consultorio dental con landing de 7 secciones, chatbot calificador de urgencias, CRM HubSpot, campañas Meta/Google Ads y dashboard de métricas en tiempo real.',
      zona: 'Toluca',
      imagen: '',
    },
    testimonio: {
      nombre: 'Dra. Fernanda L.',
      rol: 'Directora de Dental Smile',
      mensaje: 'Mi asistente solo atiende los pacientes que el chatbot ya calificó. Sé exactamente cuánto cuesta cada paciente nuevo y por primera vez puedo dormir sin revisar el celular cada hora.',
      esVerificado: true,
      badgeLabel: 'Reseña verificada',
    },
    metricas: [
      { valor: '+291%', etiqueta: 'Pacientes nuevos' },
      { valor: '3.4x', etiqueta: 'ROI primer trimestre' },
      { valor: '68%', etiqueta: 'Tasa de retención' },
    ],
    techStack: ['HubSpot', 'WhatsApp API', 'Meta Ads', 'Google Ads'],
  },
];
