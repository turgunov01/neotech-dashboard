// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  css: ['/assets/scss/style.scss'],
  modules: ['@nuxt/ui'],
  ui: {},
  compatibilityDate: '2024-10-02',
})