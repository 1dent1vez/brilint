# Diagnóstico de indexación (respuesta de ChatGPT)

## Síntoma reportado

> "Intenté acceder a dabtech.me, pero el sitio no fue indexado correctamente.
> La búsqueda devolvió otros dominios similares y no el tuyo."

## Diagnóstico real

La infraestructura SEO del sitio está **sana**:

- `https://dabtech.me` → `308 Permanent Redirect` a `https://www.dabtech.me/` (apex correcto).
- `www.dabtech.me` responde 200 con título, description y canonical correctos.
- `robots.txt` permite rastreo y apunta al sitemap.
- `sitemap-index.xml` → `sitemap-0.xml` incluye las 13 URLs (home, 3 landings, 9 guías, hub, servicios, aviso).
- Contenido renderizado en el HTML (Astro estático, sin JS necesario).

El problema real: **el dominio tiene ~20 días y Bing (el buscador que alimenta la búsqueda de ChatGPT) solo ha indexado 4 de 13 URLs** (home, servicios, chatbots-edomex, aviso-privacidad). Al hacer una búsqueda amplia, ChatGPT recibió resultados de dominios parecidos porque las URLs nuevas aún no están en el índice de Bing.

## Soluciones aplicadas (rama fix/indexacion-dabtech)

1. **IndexNow (indexación instantánea en Bing)**
   - Clave publicada: `public/0aa69cee3e6341b39d3cff4ffcc6da1a.txt` → se sirve en `https://www.dabtech.me/{clave}.txt` tras el deploy.
   - Script `scripts/indexnow.mjs` + comando `npm run indexnow` para pinguear todas las URLs del sitemap.

2. **Refuerzo de entidad de marca (JSON-LD)**
   - `@id`, `logo`, `sameAs` (Instagram y Facebook reales), `contactPoint` en el `LocalBusiness`.
   - Ayuda a Google/Bing a asociar el dominio con la marca DAB y no con dominios parecidos.

3. **`og:image` absoluto** (consistencia con `twitter:image`).

## Pasos manuales pendientes (requieren tu cuenta)

1. **Merge + deploy** de la rama `fix/indexacion-dabtech` a `main` (Vercel despliega solo).
2. **Ping IndexNow** (después del deploy, para que la clave esté publicada):
   ```bash
   npm run build && npm run indexnow
   ```
3. **Google Search Console** — propiedad `https://www.dabtech.me/`:
   - Enviar `https://www.dabtech.me/sitemap-index.xml`.
   - Solicitar indexación de las 13 URLs (Home, Servicios, 3 landings, 9 guías, hub).
4. **Bing Webmaster Tools** — importar desde GSC o añadir el dominio y enviar el mismo sitemap.

## Por qué ChatGPT verá el sitio después

ChatGPT usa Bing para su navegación. IndexNow acelera el rastreo de Bing a horas (vs semanas).
Con el sitio en el índice de Bing y la entidad de marca reforzada, al pedirle a ChatGPT
"analiza dabtech.me" hará fetch directo de la URL y obtendrá el contenido real.

## Verificación

```bash
# Clave publicada (tras deploy)
curl https://www.dabtech.me/0aa69cee3e6341b39d3cff4ffcc6da1a.txt

# Sitio indexado en DDG/Bing (deberían aparecer más de 4 URLs con el tiempo)
https://html.duckduckgo.com/html/?q=site:dabtech.me
```
