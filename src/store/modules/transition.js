import * as types from './mutation-types'

const state = {
  transitionName: 'scale-out',
  transitionMode: 'out-in',
  transitionNames: [
    'fade-left',
    'fade-right',
    'scale-out',
    'scale-in'
  ]
}

const getters = {
  getTransitionName: (state) => {
    return state.transitionName
  },
  getTransitionNames: (state) => {
    return state.transitionNames
  },
  getTransitionMode: (state) => {
    return state.transitionMode
  }
}

const actions = {
  setTransitionName: ({ commit }, transitionName) => {
    commit(types.TRANSITION_NAME, transitionName)
  },
  setTransitionMode: ({ commit }, transitionMode) => {
    commit(types.TRANSITION_MODE, transitionMode)
  }
}

const mutations = {
  [types.TRANSITION_NAME] (state, transitionName) {
    state.transitionName = transitionName
  },
  [types.TRANSITION_MODE] (state, transitionMode) {
    state.transitionMode = transitionMode
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
