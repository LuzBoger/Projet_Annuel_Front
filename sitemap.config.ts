import { writeFileSync } from "fs";

const SITEMAP_ROUTES = [
  { url: '/', changefreq: 'weekly', priority: 1.0 as const },
  { url: '/plans', changefreq: 'monthly', priority: 0.8 as const },
  { url: '/contact', changefreq: 'yearly', priority: 0.4 as const },
  { url: '/legal/mentions-legales', changefreq: 'yearly', priority: 0.2 as const },
  { url: '/legal/cgu', changefreq: 'yearly', priority: 0.2 as const },
  { url: '/legal/cgv', changefreq: 'yearly', priority: 0.2 as const },
  { url: '/legal/politique-de-confidentialite', changefreq: 'yearly', priority: 0.2 as const },
  { url: '/legal/politique-de-cookies', changefreq: 'yearly', priority: 0.2 as const },
];
const HOSTNAME = 'https://skaldly.fr';

export function generateSitemap() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${SITEMAP_ROUTES.map(route => `  <url>
      <loc>${HOSTNAME}${route.url}</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <changefreq>${route.changefreq}</changefreq>
      <priority>${route.priority}</priority>
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