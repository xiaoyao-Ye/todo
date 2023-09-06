import { createApp } from "vue"
import { createPersistedState } from "pinia-plugin-persistedstate"
import { createPinia } from "pinia"
import App from "./App.vue"
import "./samples/node-api"
import { router } from "./router"
import "virtual:uno.css"
import "@unocss/reset/tailwind.css"
import "@/assets/style/index.css"

const config = createPersistedState()
const pinia = createPinia()
pinia.use(config)

const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount("#app").$nextTick(() => {
  postMessage({ payload: "removeLoading" }, "*")
})
