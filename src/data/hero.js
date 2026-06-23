/**
 * Centralized data for Hero and Main Navigation.
 * Extracted from stitch-hero-dab.html.
 */

export const NAV = {
  brand: 'DAB',
  logoHref: '#',
  links: [
    { label: 'AI Agents', href: '#' },
    { label: 'Services', href: '#' },
    { label: 'Process', href: '#' },
    { label: 'Portfolio', href: '#' },
    { label: 'Pricing', href: '#' },
    { label: 'FAQ', href: '#' }
  ],
  cta: {
    label: 'Book Demo',
    href: '#',
    icon: 'arrow_forward'
  }
};

export const HERO = {
  badge: 'AUTONOMOUS AI AGENTS',
  headline: {
    prefix: 'A digital employee that works ',
    highlight: '24/7',
    suffix: ' for your business'
  },
  subheadline: 'AI agents that schedule appointments, capture leads, follow up, and never forget a customer. Without hiring more staff.',
  ctas: [
    {
      label: 'See how it works',
      href: '#',
      icon: 'play_arrow',
      variant: 'primary'
    },
    {
      label: 'Book free demo',
      href: '#',
      icon: 'calendar_today',
      variant: 'ghost'
    }
  ],
  terminal: {
    filename: 'agent_status.log',
    lines: [
      { text: 'Initializing local lead capture...', status: 'OK' },
      { text: 'Syncing CRM datastream...', status: 'OK' },
      { text: 'Awaiting incoming queries...', status: 'pending' }
    ]
  },
  scroll: 'Scroll'
};
