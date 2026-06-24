/**
 * Centralized data for Hero and Main Navigation.
 * Extracted from stitch-hero-dab.html.
 */

export const NAV = {
  brand: 'DAB',
  logoHref: '#',
  links: [
    { label: 'Servicios', href: '#' },
    { label: 'Cómo lo hacemos', href: '#' },
    { label: 'Casos', href: '#' },
    { label: 'Precios', href: '#' },
    { label: 'Preguntas', href: '#' }
  ],
  cta: {
    label: 'Hablemos',
    href: '#',
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
      href: '#',
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
