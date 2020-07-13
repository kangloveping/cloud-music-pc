import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../Home.vue'
import Songlist from '../Songlist.vue'
import Album from '../Album.vue'
import Top from '../Top.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home'},
  { path: '/home',component: Home},
  { path: '/list',component: Songlist},
  { path: '/album',component: Album},
  { path: '/top',component: Top},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
