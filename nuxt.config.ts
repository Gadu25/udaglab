// https://nuxt.com/docs/api/configuration/nuxt-config
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { checkSiteStatuses } from './server/utils/checkSiteStatuses'
import projects from './data/projects'

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
  hooks: {
    'build:before': async () => {
      const urls = projects.filter((p) => p.url).map((p) => p.url)
      try {
        const statuses = await checkSiteStatuses(urls)
        writeFileSync(resolve(process.cwd(), 'public/statuses.json'), JSON.stringify(statuses, null, 2))
        console.log(`[udaglab-status] checked ${urls.length} links`)
      } catch (err) {
        console.warn('[udaglab-status] check failed; continuing without statuses', err)
      }
    },
  },
})