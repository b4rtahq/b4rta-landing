import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.b4rta.co',
  integrations: [sitemap()],
  output: 'static'
});
