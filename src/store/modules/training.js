import moment from 'moment'
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
    console.log('loadTrainings', token)
    return []
  },
  loadTrainingsForEdit: ({ commit, rootGetters }) => {
    let token = rootGetters.getUser.token
    console.log('loadTrainingsForEdit', token)
    return []
  },
  saveTrainings: ({ commit }, list) => {
    let output = []
    let i = 0
    list.map((item) => {
      item.trainings.map((training) => {
        output.push({
          id: ++i,
          category: item.name,
          name: training,
          weight: 0,
          lastWeight: 0,
          stats: [{
            weight: 0,
            date: moment().subtract(3, 'day')
          }, {
            weight: 0,
            date: moment().subtract(2, 'day')
          }, {
            weight: 0,
            date: moment().subtract(1, 'day')
          }]
        })
      })
    })
    commit(types.SET_TRAININGS, output)
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
