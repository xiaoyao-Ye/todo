import { createApp } from "vue"
import "./samples/node-api"
import App from "./App.vue"
import { router } from "./router"
import "ant-design-vue/dist/reset.css"

const app = createApp(App)
app.use(router)
app.mount("#app").$nextTick(() => {
  postMessage({ payload: "removeLoading" }, "*")
})
