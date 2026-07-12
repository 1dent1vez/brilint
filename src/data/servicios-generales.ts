// src/data/servicios-generales.ts
// Catálogo plano de servicios de DAB (fuente: Notion "Servicios DAB — Catálogo").
// Sin categorías ni paquetes: DAB arma los paquetes en la venta según la necesidad de cada cliente.
import { WHATSAPP_URL } from '../config/contact';

export interface ServicioGeneral {
  id: string;
  titulo: string;
  descripcion: string;
  bullet: string;
  ctaHref: string;
}

const mensaje = (nombre: string) =>
  `Hola Dab, quiero informes sobre el servicio: ${nombre}`;

export const serviciosGenerales: ServicioGeneral[] = [
  {
    id: 'asistente-whatsapp',
    titulo: 'Asistente de WhatsApp',
    descripcion: 'Responde y califica leads automáticamente por tu WhatsApp, 24/7.',
    bullet: 'Base del ecosistema: capta y califica sin que estés pegado al celular.',
    ctaHref: WHATSAPP_URL(mensaje('Asistente de WhatsApp')),
  },
  {
    id: 'landing-page',
    titulo: 'Landing page + CTA',
    descripcion: 'Sitio informativo diseñado para convertir: agenda, compra o contacta.',
    bullet: 'Puerta de entrada que convierte curiosos en clientes.',
    ctaHref: WHATSAPP_URL(mensaje('Landing page + CTA')),
  },
  {
    id: 'google-business-profile',
    titulo: 'Google Business Profile',
    descripcion: 'Configuración profesional para aparecer primero en "cerca de mí".',
    bullet: 'Presencia local que te pone en el mapa cuando buscan tu servicio.',
    ctaHref: WHATSAPP_URL(mensaje('Google Business Profile')),
  },
  {
    id: 'instagram-pro',
    titulo: 'Instagram (config pro)',
    descripcion: 'Configuración profesional de tu red principal, lista para crecer.',
    bullet: 'Tu Instagram bien estructurado desde el día uno.',
    ctaHref: WHATSAPP_URL(mensaje('Instagram (config pro)')),
  },
  {
    id: 'agenda-recordatorios',
    titulo: 'Agenda + recordatorios',
    descripcion: 'Agenda automática con recordatorios que reducen los no-shows.',
    bullet: 'Menos citas perdidas, menos tiempo desperdiciado.',
    ctaHref: WHATSAPP_URL(mensaje('Agenda + recordatorios')),
  },
  {
    id: 'asistente-activo',
    titulo: 'Asistente activo (recurrente)',
    descripcion: 'Responde, califica y agenda de forma continua mes a mes.',
    bullet: 'El sistema que sigue funcionando por ti, todos los días.',
    ctaHref: WHATSAPP_URL(mensaje('Asistente activo recurrente')),
  },
  {
    id: 'dashboard-cliente',
    titulo: 'Dashboard del cliente',
    descripcion: 'Módulos de Reportes, Saldo glassbox y Gamificación en vivo.',
    bullet: 'Ves leads, clientas atendidas y el uso real de tu infra.',
    ctaHref: WHATSAPP_URL(mensaje('Dashboard del cliente')),
  },
  {
    id: 'hosting-landing',
    titulo: 'Hosting de landing',
    descripcion: 'Hosting incluido y mantenido dentro del saldo del cliente.',
    bullet: 'Tu sitio siempre arriba, sin que muevas un dedo.',
    ctaHref: WHATSAPP_URL(mensaje('Hosting de landing')),
  },
  {
    id: 'campanas-reenganche',
    titulo: 'Campañas de reenganche',
    descripcion: 'WhatsApp a tus clientas existentes con promos y recordes.',
    bullet: 'Haces que quien ya te compró vuelva.',
    ctaHref: WHATSAPP_URL(mensaje('Campañas de reenganche')),
  },
  {
    id: 'agenda-extra',
    titulo: 'Agenda/recordatorios extra',
    descripcion: 'Agenda o integraciones adicionales según lo que tu negocio necesite.',
    bullet: 'Lo que tu operación pida, lo conectamos.',
    ctaHref: WHATSAPP_URL(mensaje('Agenda/recordatorios extra')),
  },
  {
    id: 'reputacion',
    titulo: 'Reputación (reseña Google)',
    descripcion: 'Pedimos la reseña en Google tras la cita, automáticamente.',
    bullet: 'Más estrellas, más confianza, más clientas nuevas.',
    ctaHref: WHATSAPP_URL(mensaje('Reputación (reseña Google)')),
  },
];
