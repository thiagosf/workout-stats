import Vue from 'vue'
import VueResource from 'vue-resource'
import VueCookie from 'vue-cookie'
import VueForm from 'vue-form'
import VueHead from 'vue-head'
import VSwipe from 'vswipe'

import i18n from './helpers/i18n'
import App from './App'
import router from './router'
import store from './store'
import Bus from './plugins/Bus'
import SimpleUi from './plugins/SimpleUi'

const __svg__ = { path: './assets/*.svg' }
require('webpack-svgstore-plugin/src/helpers/svgxhr')(__svg__)

Vue.use(VueResource)
Vue.use(VueCookie)
Vue.use(Bus)
Vue.use(SimpleUi)
Vue.use(VueForm)
Vue.use(VueHead, {
  separator: ' / ',
  complement: 'Training Stats'
})
Vue.use(VSwipe)
Vue.config.productionTip = false

i18n.install()

let apiRoot = 'https://api.trainmore.thiagosf.net'
if (process.env.NODE_ENV === 'development') {
  apiRoot = 'http://api.dev.azk.io'
}

Vue.http.options.root = apiRoot
Vue.router = router
App.store = store
App.router = Vue.router
new Vue(App).$mount('#app')
