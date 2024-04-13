// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  spaLoadingTemplate: true,
  css: ['~/src/assets/scss/style.scss'],
  vite: {},
  modules: ["nuxt-tiptap-editor"],
  tiptap: {
    prefix: "Tiptap", //prefix for Tiptap imports, composables not included
  },
})