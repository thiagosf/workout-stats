import Vue from 'vue'
import * as types from './mutation-types'

const state = {
  list: [],
  currentTraining: null
}

const getters = {
  getTrainings: (state) => {
    return state.list
  },
  getCurrentTraining: (state) => {
    return state.currentTraining
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
  loadTraining: ({ commit, rootGetters }, id) => {
    let token = rootGetters.getUser.token
    return Vue.http.get(`trainings/${id}`, { params: { token: token } })
      .then((response) => {
        if (response.body.success) {
          let training = response.body.data
          commit(types.SET_TRAINING, training)
          return training
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
  },
  [types.SET_TRAINING] (state, currentTraining) {
    state.currentTraining = currentTraining
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
