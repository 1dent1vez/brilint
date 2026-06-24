// src/data/metricas.js
export const metricas = [
  {
    id: 'clientes-perdidos',
    numero: 40,
    sufijo: '%',
    label: 'CLIENTES PERDIDOS',
    colorLabel: 'rose',        // 'rose' | 'amber' | 'cyan'
    titulo: 'Se pierden por falta de seguimiento',
    descripcion: 'Cuatro de cada diez clientes potenciales nunca regresan porque no reciben respuesta inmediata o seguimiento estructurado tras su primera interacción.',
    solucion: {
      icono: 'smart_toy',        // Material Symbol name
      label: 'Recuperación Activa',
      texto: 'Agente de IA que recuerda, persigue y cierra 24/7.'
    },
    layout: 'izquierda',       // 'izquierda' | 'derecha'
    offset: 'lg:-translate-x-8'  // offset asimétrico solo en desktop
  },
  {
    id: 'crecimiento-perdido',
    numero: 20,
    sufijo: '%',
    label: 'CRECIMIENTO PERDIDO',
    colorLabel: 'amber',
    titulo: 'Sin herramientas digitales, no escala',
    descripcion: 'El 20% de crecimiento que podrías tener se evapora en fricciones operativas. Los sistemas manuales limitan el volumen de transacciones que puedes manejar simultáneamente.',
    solucion: {
      icono: 'query_stats',
      label: 'Solución Escalable',
      texto: 'Landing + campañas que convierten automáticamente.'
    },
    layout: 'derecha',
    offset: 'lg:translate-x-12'
  },
  {
    id: 'tiempo-robado',
    numero: 5,
    sufijo: 'HRS',
    label: 'TIEMPO ROBADO',
    colorLabel: 'rose',
    titulo: 'Al día respondiendo WhatsApp, agendando y recordando',
    descripcion: 'El dueño del negocio se convierte en recepcionista, perdiendo horas valiosas en tareas repetitivas de bajo valor en lugar de enfocarse en la estrategia y crecimiento.',
    solucion: {
      icono: 'schedule',
      label: 'Automatización Operativa',
      texto: '5 horas devueltas para que enfoques en liderar.'
    },
    layout: 'izquierda',
    offset: '-translate-x-8'
  }
];

export const metricasHeader = {
  label: 'La Brecha',
  titulo: 'Donde los buenos negocios se estancan',
  descripcion: 'La brecha entre el potencial de tu negocio y la realidad operativa. Identificamos los puntos de fuga donde la inteligencia artificial autónoma puede recuperar valor inmediato.'
};
