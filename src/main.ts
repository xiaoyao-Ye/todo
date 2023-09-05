import { createApp } from "vue"
import "./samples/node-api"
import App from "./App.vue"
import { router } from "./router"
import "virtual:uno.css"
import "@unocss/reset/tailwind.css"
import "@/assets/style/index.css"

const app = createApp(App)
app.use(router)
app.mount("#app").$nextTick(() => {
  postMessage({ payload: "removeLoading" }, "*")
})
