import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/chatRoom",
      name: "home",
      component: () => import("@/views/ChatRoom.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/ChatLogin.vue"),
    },
    {
      path: "/",
      redirect: {
        name: "login",
      },
    },
  ]
})

export default router
