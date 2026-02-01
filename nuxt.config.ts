// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "nuxt-vuefire", "nuxt-icons"],
  css: ["~/assets/css/main.css"],
  ssr: false,
  vuefire: {
    auth: { enabled: true },
    config: {
      apiKey: "AIzaSyCS78sGrljYxczlWxjLQdJWjQQ4TIHhqR4",
      authDomain: "ambagan-io.firebaseapp.com",
      projectId: "ambagan-io",
      storageBucket: "ambagan-io.firebasestorage.app",
      messagingSenderId: "830413006133",
      appId: "1:830413006133:web:e016c5b0fcb5f668f5187c",
      measurementId: "G-5HELVD9M7J",
    },
  },
});