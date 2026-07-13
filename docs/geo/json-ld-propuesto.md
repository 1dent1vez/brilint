# JSON-LD propuesto (extensión GEO)

## Contexto
El `DefaultLayout.astro` actual ya incluye un `LocalBusiness` básico pero:
- `name: 'Dab'` → debe ser **`DAB`**
- Falta `Service` schema por cada servicio
- Falta `FAQPage` en la sección de FAQs
- Falta `areaServed` como objeto `GeoCircle` o lista de ciudades
- El `telephone` ya es correcto: `+52 1 7223579869`

## 1) LocalBusiness actualizado (en DefaultLayout.astro)

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "DAB",
  "image": "https://www.dabtech.me/og-image.webp",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Metepec",
    "addressRegion": "Estado de México",
    "addressCountry": "MX"
  },
  "areaServed": [
    {"@type": "City", "name": "Toluca"},
    {"@type": "City", "name": "Metepec"},
    {"@type": "City", "name": "Zinacantepec"},
    {"@type": "City", "name": "Lerma"},
    {"@type": "City", "name": "San Mateo Atenco"}
  ],
  "url": "https://www.dabtech.me/",
  "telephone": "+52 1 7223579869",
  "priceRange": "$$",
  "openingHoursSpecification": [
    {"@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "11:00", "closes": "18:00"},
    {"@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday"], "opens": "12:00", "closes": "15:00"}
  ],
  "description": "Agencia de inteligencia artificial y automatización para negocios en Toluca, Metepec y el Valle de Toluca."
}
```

## 2) Service schema (inyectar en cada página geolocalizada)

Ejemplo para /agentes-ia-toluca:

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Agentes de IA para negocios en Toluca",
  "serviceType": "Inteligencia Artificial / Automatización",
  "provider": {"@type": "LocalBusiness", "name": "DAB", "url": "https://www.dabtech.me/"},
  "areaServed": {"@type": "City", "name": "Toluca"},
  "url": "https://www.dabtech.me/agentes-ia-toluca",
  "description": "Diseño e implementación de agentes de IA que atienden, agendan y cierran ventas 24/7 por WhatsApp y web para negocios de Toluca."
}
```

## 3) FAQPage (inyectar en index y páginas)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Necesito saber de tecnología para usar los servicios de DAB?",
      "acceptedAnswer": {"@type": "Answer", "text": "No. DAB diseña, implementa y capacita a tu equipo. Tú usas el sistema y DAB lo mantiene."}
    },
    {
      "@type": "Question",
      "name": "¿Cuánto tarda en estar funcionando mi automatización?",
      "acceptedAnswer": {"@type": "Answer", "text": "Entre 7 días (plan Despierta) y 1-2 semanas (planes Crece/Domina), según integraciones."}
    },
    {
      "@type": "Question",
      "name": "¿En qué zonas trabajan?",
      "acceptedAnswer": {"@type": "Answer", "text": "Toluca, Metepec, Zinacantepec, Lerma y San Mateo Atenco, hasta 2 horas en coche desde Metepec."}
    }
  ]
}
```

## Pendiente (lo decide el dev)
- El FAQClient.tsx renderiza las FAQs en React; para el `FAQPage` schema hay que generar el JSON-LD desde `categoriasFaq` (src/data/faqs.js) en el layout o en un componente server-side. El dev debe mapear `pregunta`→`name` y `respuesta`→`acceptedAnswer`.
