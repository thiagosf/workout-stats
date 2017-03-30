import Vue from 'vue'
import Vuex from 'vuex'
import i18n from './modules/i18n'
import transition from './modules/transition'
import notification from './modules/notification'
import user from './modules/user'
import training from './modules/training'
import evolution from './modules/evolution'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: [
    i18n,
    transition,
    notification,
    user,
    training,
    evolution
  ]
})
