// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-07-01',
  devtools: { enabled: process.env.NODE_ENV !== 'production' },
  css: ['~/assets/css/main.scss'],
  app: {
    head: {
      title: 'UdagLab',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'UTF-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'author', content: 'Alexander Udag' },
        { name: 'description', content: 'UdagLab — where ideas become experiments.' },
        { name: 'keywords', content: 'UdagLab, projects, experiments, web developer, Alexander Udag' },
        { name: 'theme-color', content: '#0a0a0a' },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap',
        },
      ],
    },
  },
})