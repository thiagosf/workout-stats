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
      name: 'home',
      component: Pages.Home
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Pages.Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter: function (to, from, next) {
        router.app.$store.dispatch('logout').then(() => {
          router.push({ name: 'home' })
        })
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: 'home',
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
