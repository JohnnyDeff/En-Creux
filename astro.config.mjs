// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.encreux.fr',
  integrations: [
    sitemap({
      // Cette ancienne page redirige vers les sources intégrées à la Note.
      filter: (page) => new URL(page).pathname.replace(/\/$/, '') !== '/notes/tapisserie-de-bayeux/appareil-documentaire',
    }),
  ],
});
