import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Main",
        component: () => import("@/views/Main.vue"),
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("@/views/Login.vue"),
    },
    {
      path: "/registration",
      name: "Registration",
      component: () => import("@/views/Registration.vue"),
    },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(() => {
    return true;
});

export default router;