import { createRouter, createWebHistory } from "vue-router";

const routes = [
    // {
    //     path: '/',
    //     name: 'LandingPage',
    //     component: () => import('@/views/LandingPage.vue')
    // },
    {
      path: '/admin',
      name: 'AdminPage',
      component: () => import('@/views/AdminPage.vue')
    },
    {
      path: '/user',
      name: 'UserPage',
      component: () => import('@/views/UserPage.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
