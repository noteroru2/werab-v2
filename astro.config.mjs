import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://xn--c3c3a0aa6cvaf8b9dze.com',
  trailingSlash: 'always',
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  build: {
    format: 'directory'
  }
});
