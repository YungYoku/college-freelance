import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import Login from '../views/login.vue'
import Registration from '../views/registration.vue'

const routes: Array<RouteRecordRaw> = [
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/registration",
      name: "Registration",
      component: Registration,
    },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
    if (to.path === '/') return '/login'

    return true;
});

export default router;