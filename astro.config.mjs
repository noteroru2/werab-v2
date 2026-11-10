import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://xn--c3c3a0aa6cvaf8b9dze.com',
  trailingSlash: 'always',
  output: 'server',
  adapter: cloudflare(),
  build: {
    format: 'directory'
  }
});
