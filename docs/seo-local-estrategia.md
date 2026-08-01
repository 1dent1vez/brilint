# Estrategia SEO local de DAB

## Diagnóstico

La web ya tenía una base técnica sólida: Astro estático, sitemap automático, `robots.txt`, canonicals, páginas de servicio por ubicación y JSON-LD `LocalBusiness`. El principal punto débil era la falta de un hub editorial enlazado desde la navegación y la ausencia de Twitter Cards. También conviene revisar cualquier copy o dato de negocio que no pueda demostrarse antes de publicarlo.

## Arquitectura propuesta

- `/`: marca y servicios principales.
- `/agentes-ia-toluca`: página transaccional para agentes de IA.
- `/automatizacion-metepec`: página transaccional para automatización.
- `/chatbots-edomex`: página transaccional para chatbots.
- `/guias/`: hub editorial que lista todas las guías.
- `/guias/[slug]`: artículos informativos con enlazado interno ("Sigue leyendo") y CTA hacia WhatsApp.

## Artículos (9)

1. `/guias/como-elegir-agencia-digital-toluca` — intención comercial investigativa.
2. `/guias/seo-local-para-negocios-metepec` — intención informativa con salida a diagnóstico.
3. `/guias/automatizar-negocio-valle-toluca` — intención informativa/comercial.
4. `/guias/cuanto-cuesta-una-pagina-web-toluca` — costos reales por tipo de proyecto (palabra clave de alta intención).
5. `/guias/mas-pacientes-para-consultorio-dental-toluca` — vertical salud; llenar agenda sin bajar precios.
6. `/guias/salon-de-belleza-metepec-mas-citas` — vertical belleza/uñas; de seguidores a citas.
7. `/guias/despacho-contable-toluca-automatizar-procesos` — vertical despachos; retención y recolección de documentos.
8. `/guias/chatbot-whatsapp-que-puede-y-no-puede-hacer` — guía honesta anti-humo; genera confianza y autoridad.
9. `/guias/seo-o-publicidad-para-negocio-local` — comparativa de decisión SEO vs Ads.

Los artículos por nicho apuntan a los verticales del mercado objetivo de DAB (salud, belleza, uñas, despachos) y se enlazan entre sí vía el campo `related` para distribuir autoridad interna.

Cada artículo debe responder una necesidad concreta, incluir la ubicación de forma natural, enlazar a una página de servicio y cerrar con una acción medible.

## Plan de 90 días

- **Semanas 1–2:** verificar Google Business Profile, NAP, categorías, zonas servidas, teléfono, horarios, fotografías y reseñas reales.
- **Semanas 3–6:** publicar 1 artículo semanal y conseguir enlaces/citas locales legítimas: cámaras empresariales, directorios relevantes, alianzas y casos de clientes.
- **Semanas 7–12:** crear casos reales por vertical (salud, belleza, despachos, servicios), ampliar FAQs y actualizar los contenidos con datos de Search Console.

## Medición

Configurar Search Console y Analytics/Tag Manager para medir impresiones, clics, llamadas, clics a WhatsApp, formularios y citas. Revisar mensualmente consultas por ciudad y página de destino.

## Reglas editoriales

- No crear páginas casi idénticas cambiando solo el municipio.
- No inventar estadísticas, testimonios, direcciones o resultados.
- Usar ejemplos propios y pruebas verificables.
- Mantener consistentes nombre, teléfono, URL y ubicación.
- Actualizar los artículos cuando cambien servicios, cobertura o procesos.

## Pendientes fuera del código

- Confirmar si DAB tiene una dirección física pública; si no, no añadir una dirección inventada al schema.
- Validar el número de WhatsApp y el perfil de Google Business Profile.
- Enviar el sitemap a Search Console después del despliegue.
- Solicitar indexación de las nuevas URLs.
- Obtener reseñas auténticas describiendo servicio y zona.
