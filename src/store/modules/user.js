import Vue from 'vue'
import * as types from './mutation-types'

const state = {
  user: {}
}

const getters = {
  getUser (state) {
    return state.user
  },
  loggedIn (state) {
    return !!state.user.id
  }
}

const actions = {
  auth ({ commit }, data) {
    let user = Object.assign({}, data, { id: 1, name: 'Fulano', email: 'fulano@domain.com', token: '123', gender: 'male' })
    Vue.cookie.set('token', user.token)
    commit(types.LOGIN, user)
    return user
    // return Vue.http.post('auth/login', data)
    //   .then((response) => {
    //     if (response.body.success) {
    //       let user = response.body.data
    //       commit(types.LOGIN, user)
    //       return user
    //     } else {
    //       throw new Error(response.body.message)
    //     }
    //   })
  },
  checkLogin ({ commit }) {
    let token = Vue.cookie.get('token')
    if (token) {
      let user = { id: 1, name: 'Fulano', email: 'fulano@domain.com', token: '123', gender: 'male' }
      Vue.cookie.set('token', user.token)
      commit(types.SUCCESS_TOKEN, user)
      return user
    //   let body = { token: token }
    //   Vue.http.post('auth/token', body)
    //     .then((response) => {
    //       if (response.body.success) {
    //         let user = response.body.data
    //         Vue.cookie.set('token', user.token)
    //         commit(types.SUCCESS_TOKEN, user)
    //         return user
    //       } else {
    //         commit(types.INVALID_TOKEN)
    //       }
    //     })
    //     .catch(() => {
    //       commit(types.INVALID_TOKEN)
    //     })
    // } else {
    //   commit(types.INVALID_TOKEN)
    }
  },
  logout ({ commit }) {
    Vue.cookie.delete('token')
    commit(types.LOGOUT)
  },
  createUser ({ commit }, data) {
    let user = Object.assign({}, data, { id: 1, token: '123' })
    Vue.cookie.set('token', user.token)
    commit(types.LOGIN, user)
    return user
  }
}

const mutations = {
  [types.LOGIN] (state, user) {
    state.user = user
  },
  [types.SUCCESS_TOKEN] (state, user) {
    state.user = user
  },
  [types.INVALID_TOKEN] (state, user) {
    state.user = {}
  },
  [types.LOGOUT] (state) {
    state.user = {}
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
