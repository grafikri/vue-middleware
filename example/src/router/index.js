import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import authentication from '../middleware/authentication'
import trace from '../middleware/trace'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      middleware: [trace]
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      middleware: [authentication]
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    // meta: {
    //   middleware: [authentication]
    // }
  },
  
]

const router = new VueRouter({
  routes
})

export default router
