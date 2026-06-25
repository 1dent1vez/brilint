import { WHATSAPP_URL } from '../config/contact';

export const NAV = {
  brand: 'DAB',
  logoHref: '/',
  links: [
    { label: 'Servicios', href: '/#servicios' },
    { label: 'Cómo lo hacemos', href: '/#proceso' },
    { label: 'Casos', href: '/#muro-confianza' },
    { label: 'Preguntas', href: '/#faq' }
  ],
  cta: {
    label: 'Hablemos',
    href: WHATSAPP_URL('Hola, quiero hablar sobre mi negocio con Dab'),
    icon: 'chat'
  }
};

export const HERO = {
  badge: 'NO TE ADAPTES, EVOLUCIONA.',
  headline: {
    prefix: 'Recupera las ',
    highlight: 'horas',
    suffix: ' que tu negocio te roba cada día'
  },
  subheadline: 'Dejas de ser recepcionista, vendedor y community manager de tu propio negocio. Te devolvemos el tiempo para que enfoques en lo que realmente te hace crecer.',
  ctas: [
    {
      label: 'Hablemos de tu negocio',
      href: '#',
      icon: 'chat',
      variant: 'primary'
    },
    {
      label: 'Ver cómo funciona',
      href: '#proceso',
      icon: 'play_arrow',
      variant: 'ghost'
    }
  ],
  terminal: {
    filename: 'tu_negocio_hoy.log',
    lines: [
      { text: 'Nueva cita agendada: Manicure, mañana 10:00 am', status: 'OK' },
      { text: 'Lead respondido: WhatsApp enviado en 2 min', status: 'OK' },
      { text: 'Recordatorio enviado a 8 clientas para mañana', status: 'OK' }
    ]
  },
  scroll: 'Descubre más'
};
