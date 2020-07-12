import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../Home.vue'
import Songlist from '../Songlist.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/home',component: Home},
  { path: '/list',component: Songlist},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
