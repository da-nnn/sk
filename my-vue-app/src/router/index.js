// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ScholarshipDetail from '../views/ScholarshipDetail.vue';
import AdminView from '../views/AdminView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/scholarship/:id',
    name: 'ScholarshipDetail',
    component: ScholarshipDetail,
    props: true
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminView
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
