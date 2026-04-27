import { writeFileSync } from "fs";

const SITEMAP_ROUTES = [
    {url: '/', changefreq: 'weekly', priority: 1.0 as const},
    {url: '/plans', changefreq: 'weekly', priority: 0.5 as const},
];
const HOSTNAME = 'https://skaldly.fr';

export function generateSitemap() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${SITEMAP_ROUTES.map(r => `  <url>
    <loc>${HOSTNAME}${r.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('\n')}
</urlset>`
  writeFileSync('./dist/sitemap.xml', xml)
}

export function generateRobots() {
  const txt = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /dashboard
Disallow: /settings
Disallow: /profile
Disallow: /checkout
Disallow: /topics
Disallow: /subscription

Sitemap: ${HOSTNAME}/sitemap.xml`
  writeFileSync('./dist/robots.txt', txt)
}