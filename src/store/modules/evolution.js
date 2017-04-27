import Vue from 'vue'
import moment from 'moment'
import * as types from './mutation-types'

const state = {
  items: {}
}

const getters = {
}

let timeout = []
const actions = {
  setEvolution: ({ commit, rootGetters }, data) => {
    commit(types.SET_EVOLUTION, data)
    clearInterval(timeout[data.id])
    timeout[data.id] = setTimeout(() => {
      const evolution = {
        token: rootGetters.getUser.token,
        training_id: data.id,
        weight: data.weight,
        date: moment(),
        series: data.series || 3
      }
      Vue.http.post('evolutions/save_or_update', evolution)
        .then((response) => {
          if (response.body.success) {
            return true
          } else {
            throw new Error(response.body.message)
          }
        })
    }, 1000)
  }
}

const mutations = {
  [types.SET_EVOLUTION] (state, { id, weight }) {
    state.items[id] = weight
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
