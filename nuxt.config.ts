// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  css: ['/assets/scss/style.scss'],
  modules: ['@nuxt/ui', 'nuxt-socket-io'],
  ui: {},
  io: {
    sockets: [
      {
        name: "message-handler-socket",
        url: "http://localhost:5003",
        default: true,

      }
    ],
    server: {}
  }
})