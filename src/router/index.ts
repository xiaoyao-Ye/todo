import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/todo/list',
    children: [
      { path: '/settings', component: () => import('@/views/settings/index.vue') },
      { path: '/home', component: () => import('@/views/home/index.vue') },
      {
        path: '/todo',
        component: () => import('@/views/todo/Layout.vue'),
        children: [{ path: 'list', component: () => import('@/views/todo/index.vue') }],
      },
    ],
  },
  { path: '/login', component: () => import('@/views/login/index.vue') },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (!token && to.path !== '/login') {
    return next({ path: '/login' })
  }
  next()
})

export { router }
