import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/hardware',
    name: 'Hardware',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "hardware" */ '../views/Hardware.vue')
  },
  {
    path: '/dynamic',
    name: 'Dynamic Stats',
    component: () => import( /* webpackChunkName: "dynamic" */ '../views/Dynamic.vue')
  },
  {
    path: '/custom',
    name: 'Custom Dash',
    component: () => import( /* webpackChunkName: "custom" */ '../views/Custom.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router