// src/data/servicios-generales.ts
// Catálogo plano de servicios de DAB (fuente: Notion "Servicios DAB — Catálogo").
// Sin categorías ni paquetes: DAB arma los paquetes en la venta según la necesidad de cada cliente.
// El dashboard NO es servicio individual: pertenece a los agentes y va sujeto a ellos.
import { WHATSAPP_URL } from '../config/contact';

export interface ServicioGeneral {
  id: string;
  titulo: string;
  descripcion: string;
}

const mensaje = (nombre: string) =>
  `Hola Dab, quiero informes sobre el servicio: ${nombre}`;

export const serviciosGenerales: ServicioGeneral[] = [
  {
    id: 'asistente-whatsapp',
    titulo: 'Asistente de WhatsApp',
    descripcion:
      'Responde, califica y agenda 24/7 por tu WhatsApp. Incluye agenda + recordatorios automáticos y tu dashboard de seguimiento en vivo (reportes, saldo glassbox y gamificación).',
  },
  {
    id: 'landing-page',
    titulo: 'Landing page + CTA',
    descripcion:
      'Sitio informativo diseñado para convertir: agenda, compra o contacta. Con hosting incluido y mantenido dentro del saldo.',
  },
  {
    id: 'google-business-profile',
    titulo: 'Google Business Profile',
    descripcion:
      'Configuración profesional para aparecer primero en "cerca de mí" y captar la búsqueda local.',
  },
  {
    id: 'instagram-pro',
    titulo: 'Instagram (config pro)',
    descripcion:
      'Tu red principal lista para crecer: perfil y configuración profesional desde el día uno.',
  },
  {
    id: 'campanas-reenganche',
    titulo: 'Campañas de reenganche',
    descripcion:
      'WhatsApp a tus clientas existentes con promos y recordes para que vuelvan a comprar.',
  },
  {
    id: 'reputacion',
    titulo: 'Reputación (reseña Google)',
    descripcion:
      'Pedimos la reseña en Google tras la cita, automáticamente, para sumar estrellas y confianza.',
  },
  {
    id: 'integraciones-extra',
    titulo: 'Integraciones extra',
    descripcion:
      'Lo que tu operación pida: agenda adicional, conexiones con sistemas que ya uses o automatizaciones a medida.',
  },
];
