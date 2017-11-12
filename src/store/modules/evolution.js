import Vue from 'vue'
import fecha from 'fecha'
import * as types from './mutation-types'

const state = {
  items: {}
}

const getters = {
}

const actions = {
  setEvolution: ({ commit, rootGetters }, data) => {
    commit(types.SET_EVOLUTION, data)
    const evolution = {
      token: rootGetters.getUser.token,
      training_id: data.id,
      weight: data.weight,
      date: fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
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
