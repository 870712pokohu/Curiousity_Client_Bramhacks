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
  {
    path: '/user/survey',
    name: 'Survey',
    component: () => import('@/views/Survey.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
