//router/index.js
import { createRouter, createWebHistory   } from "vue-router";
import { useAuthStore } from "../stores/AuthStore";
import { useManagerStore } from "../stores/manager";


const routes = [
  {
    path: "/",
    redirect: '/Board',
    meta: { requiresAuth: true },
  },
  {
    path: "/Registration",
    name: "Registration",
    component: () => import("../components/User/RegistrationForm.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/Board",
    name: "Board",
    component: () => import("../components/Kanban/Kanban.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/Mail",
    name: "Mail",
    component: () => import("../components/Mail/Mail.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/Calendar",
    name: "Calendar",
    component: () => import("../components/Calendar/Calendar.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/AuthForm",
    name: "AuthForm",
    component: () => import("../components/AuthForm.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/Logout",
    name: "Logout",
    beforeEnter: (to, from, next) => {
      const AuthStore = useAuthStore();
      const managerStore = useManagerStore();
      const response = AuthStore.logout()
      if (!AuthStore.isLoggedIn) {
        managerStore.hideOverlay();
        window.location.replace('/AuthForm')
      } else {
        router.push('/Logout')
      }
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/Board',
  },
];

const router = createRouter({ 
  history: createWebHistory (),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const AuthStore = useAuthStore();
  const managerStore = useManagerStore();
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    try {
      const checkResult = await AuthStore.checkLoginState();
      if (AuthStore.isLoggedIn && checkResult) {
        next();
      } else {
        managerStore.hideOverlay()
        next({ name: "AuthForm" });
      }
    } catch (error) {
      managerStore.hideOverlay()
      console.log("Ошибка навигации", error);
      next({ name: "AuthForm" });
    }
  } else {
    next();
  }
});


export default router;


