import Vue from 'vue'
import * as types from './mutation-types'

const state = {
  list: []
}

const getters = {
  getTrainings: (state) => {
    return state.list
  }
}

const actions = {
  loadTrainings: ({ commit, rootGetters }) => {
    let token = rootGetters.getUser.token
    return Vue.http.get('trainings', { params: { token: token } })
      .then((response) => {
        if (response.body.success) {
          let trainings = response.body.data
          commit(types.SET_TRAININGS, trainings)
          return trainings
        } else {
          throw new Error(response.body.message)
        }
      })
  },
  saveTrainings: ({ commit, rootGetters }, list) => {
    let trainings = []
    list.map((item) => {
      item.trainings.map((training) => {
        trainings.push({ category: item.name, name: training })
      })
    })
    const token = rootGetters.getUser.token
    const data = {
      token: token,
      trainings: trainings
    }
    return Vue.http.post('trainings/bulk_create', data)
      .then((response) => {
        if (response.body.success) {
          let trainings = response.body.data
          commit(types.SET_TRAININGS, trainings)
          return trainings
        } else {
          throw new Error(response.body.message)
        }
      })
  }
}

const mutations = {
  [types.SET_TRAININGS] (state, list) {
    state.list = list
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
