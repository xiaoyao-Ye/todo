import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
  {
    path: "/",
    component: () => import("../layout/index.vue"),
    redirect: "/home",
    children: [{ path: "/home", component: () => import("../views/home/index.vue") }],
  },
  { path: "/login", component: () => import("../views/login/index.vue") },
  { path: "/settings", component: () => import("../views/settings/index.vue") },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})
