import Vue from 'vue'
import VueRouter from 'vue-router'
import GroceryList from '../views/GroceryList'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'List',
    component: GroceryList
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to,from, next)=>{
  console.log(`${from.name} => ${to.name}`)
  document.title = `${process.env.VUE_APP_TITLE} - ${to.name}`
  next()
})

export default router
