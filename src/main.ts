import { createApp } from "vue"
import "./samples/node-api"
import App from "./App.vue"
import { router } from "./router"
import "@unocss/reset/tailwind.css"
import "virtual:uno.css"

const app = createApp(App)
app.use(router)
app.mount("#app").$nextTick(() => {
  postMessage({ payload: "removeLoading" }, "*")
})
