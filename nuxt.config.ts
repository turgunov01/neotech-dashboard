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
  ui: {
    notifications: {
      // Show toasts at the top right of the screen
      position: 'top-0 bottom-auto'
    }
  },
  modules: ['nuxt-tiptap-editor', '@nuxt/ui'],
  tiptap: {
    prefix: "Tiptap", //prefix for Tiptap imports, composables not included
  },
})