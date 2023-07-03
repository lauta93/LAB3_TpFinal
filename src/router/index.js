import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/historial',
    name: 'historial',    
    component: ()=> {
      return import('../views/HistorialView.vue')
    }
  },
  {
    path: '/CompraVenta',
    name: 'CompraVenta',
    component: ()=> {
      return import('../views/CVView.vue')
    }
  },
  {
    path: '/Venta',
    name: 'Venta',
    component: ()=> {
      return import('../views/VentaView.vue')
    }
  },
  {
    path: '/Inversiones',
    name: 'Inversiones',
    component: ()=> {
      return import('../views/InversionesView.vue')
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
