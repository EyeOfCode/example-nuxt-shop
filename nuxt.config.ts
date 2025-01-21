// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  // Set i18n
  modules: ['@nuxtjs/i18n', '@pinia/nuxt'],
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en.json'
      },
      {
        code: 'th',
        iso: 'th-TH',
        file: 'th.json'
      }
    ],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'th',
    strategy: 'prefix_and_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
      fallbackLocale: 'th'
    }
  },
  // Set meta
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Nuxt Shop'
    }
  },
  // Set server
  devServer: {
    port: Number(process.env.PORT) || 3000,
    host: process.env.HOST || 'localhost'
  },
  // Set env
  runtimeConfig: {
    // Server-side environment variables
    nodeEnv: process.env.NODE_ENV || 'development',
    version: process.env.VERSION,
    port: Number(process.env.PORT) || 3000,
    host: process.env.HOST || 'localhost',
    // Client-side environment variables
    public: {
      nodeEnv: process.env.NODE_ENV || 'development',
      version: process.env.VERSION,
      port: Number(process.env.PORT) || 3000,
      host: process.env.HOST || 'localhost'
    }
  }
})
