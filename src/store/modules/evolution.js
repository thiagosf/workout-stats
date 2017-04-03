import * as types from './mutation-types'

const state = {
  items: {}
}

const getters = {
  saveEvolutions: (state) => {
    return setTimeout(() => {
      return true
    }, 2000)
    // return Vue.http.post('evolutions/bulk-create', this.items)
    //   .then((response) => {
    //     if (response.body.success) {
    //       return true
    //     } else {
    //       throw new Error(response.body.message)
    //     }
    //   })
  }
}

const actions = {
  setEvolution: ({ commit }, data) => {
    commit(types.SET_EVOLUTION, data)
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
