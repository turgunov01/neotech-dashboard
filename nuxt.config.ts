// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  spaLoadingTemplate: true,
  css: ['~/src/assets/scss/style.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/src/assets/scss/colors.scss" as *;'
        }
      }
    }
  },
})