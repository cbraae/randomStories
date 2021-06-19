import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Table from '../views/Table.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Table',
    component: Table
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
