import * as types from './mutation-types'

const state = {
  notification: {
    message: null,
    type: null
  }
}

const getters = {
  getNotification: (state) => {
    return {
      message: state.notification.message,
      type: state.notification.type
    }
  }
}

const actions = {
  notify: ({ commit }, notification) => {
    commit(types.NOTIFY, notification)
  }
}

const mutations = {
  [types.NOTIFY] (state, notification) {
    Object.assign(state.notification, notification)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
