import { Configuration } from '@nuxt/types';

const config: Configuration = {
  srcDir: './frontend',
  head: {
    title: '☆ NestJS BBS ☆',
    link: [
      {
        rel: 'stylesheet',
        href: 'https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css',
      },
    ],
  },
  server: {
    host: '0.0.0.0',
    port: '5000',
  },
  modules: ['@nuxtjs/axios'],
  axios: {
    baseURL: 'http://localhost:3000',
  },
  buildModules: ['@nuxt/typescript-build'],
};

export default config;
