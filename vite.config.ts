import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import path from 'path'
import { generateSitemap, generateRobots } from './sitemap.config';

const sitemap = {
  name: 'sitemap',
  closeBundle() {
    generateSitemap()
    generateRobots()
  },
}
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr(), sitemap],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
