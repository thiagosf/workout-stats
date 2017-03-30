import Vue from 'vue'
import Router from 'vue-router'
import * as Pages from '@/components/pages'
import store from '../store'

Vue.use(Router)

const router = new Router({
  hashbang: false,
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Pages.Home
      // ,
      // meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: 'signin',
        query: { redirect: to.name, params: JSON.stringify(to.params) }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
