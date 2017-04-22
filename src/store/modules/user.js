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
    return Vue.http.post('users/sign_in', { user: data })
      .then((response) => {
        if (response.body.success) {
          let user = response.body.data
          Vue.cookie.set('token', user.token)
          commit(types.LOGIN, user)
          return user
        } else {
          throw new Error(response.body.message)
        }
      })
  },
  checkLogin ({ commit }) {
    let token = Vue.cookie.get('token')
    if (token) {
      let body = { token: token }
      return Vue.http.post('token', body)
        .then((response) => {
          if (response.body.success) {
            let user = response.body.data
            Vue.cookie.set('token', user.token)
            commit(types.SUCCESS_TOKEN, user)
            return user
          } else {
            commit(types.INVALID_TOKEN)
          }
        })
        .catch(() => {
          commit(types.INVALID_TOKEN)
        })
    } else {
      commit(types.INVALID_TOKEN)
    }
  },
  logout ({ commit }) {
    Vue.cookie.delete('token')
    commit(types.LOGOUT)
  },
  createUser ({ commit }, data) {
    return Vue.http.post('users', { user: data })
      .then((response) => {
        if (response.body.success) {
          let user = response.body.data
          Vue.cookie.set('token', user.token)
          commit(types.LOGIN, user)
          return user
        } else {
          throw new Error(response.body.message)
        }
      })
  },
  updateUser ({ commit, rootGetters }, data) {
    const token = rootGetters.getUser.token
    let putData = {
      token: token,
      user: data
    }
    return Vue.http.put('users', putData)
      .then((response) => {
        if (response.body.success) {
          let user = response.body.data
          Vue.cookie.set('token', user.token)
          commit(types.LOGIN, user)
          return user
        } else {
          throw new Error(response.body.message)
        }
      })
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
