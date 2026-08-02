// Script de ping a IndexNow (Bing / ChatGPT / DuckDuckGo)
// Uso:  node scripts/indexnow.mjs [url1 url2 ...]
//       node scripts/indexnow.mjs            -> pingea todas las URLs del sitemap local (dist/sitemap-0.xml)
//
// Requisito: el archivo de clave debe estar publicado en https://www.dabtech.me/{KEY}.txt
// (vive en public/ y se despliega automáticamente con el sitio).

import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE = 'https://www.dabtech.me';
const KEY = '0aa69cee3e6341b39d3cff4ffcc6da1a';

function extractUrlsFromSitemap(filePath) {
  const xml = readFileSync(filePath, 'utf8');
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  return urls;
}

function main() {
  const args = process.argv.slice(2);
  let urls = [];

  if (args.length > 0) {
    urls = args;
  } else {
    // Si no pasan URLs, lee el sitemap compilado
    const sitemapPath = resolve(__dirname, '../dist/sitemap-0.xml');
    urls = extractUrlsFromSitemap(sitemapPath);
    if (urls.length === 0) {
      console.error('No hay URLs. Corre primero `npm run build` o pasa URLs como argumentos.');
      process.exit(1);
    }
  }

  const keyLocation = `${SITE}/${KEY}.txt`;
  const urlList = urls.map((u) => u.replace(/\/$/, ''));

  const body = {
    host: 'www.dabtech.me',
    key: KEY,
    keyLocation,
    urlList,
  };

  console.log(`Pingueando ${urlList.length} URLs a IndexNow (POST)...`);

  fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  })
    .then(async (res) => {
      if (res.ok) {
        console.log(`OK (${res.status}): ${urlList.length} URLs enviadas a IndexNow.`);
      } else {
        const text = await res.text().catch(() => '');
        console.error(`ERROR (${res.status}): ${text || res.statusText}`);
        process.exitCode = 1;
      }
    })
    .catch((err) => {
      console.error('Fallo de red:', err.message);
      process.exitCode = 1;
    });
}

main();
