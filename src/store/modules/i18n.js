import * as types from './mutation-types'
import { i18n } from '../../helpers'

const state = {
  i18n: {
    current: i18n.defaultLocaleItem(),
    locales: i18n.locales()
  }
}

const getters = {
  getCurrentLocale: (state) => {
    return state.i18n.current
  },
  getLocales: (state) => {
    return state.i18n.locales.map((item) => {
      return Object.assign({}, item, {
        active: item.locale === state.i18n.current.locale
      })
    })
  }
}

const actions = {
  setLocale: ({ commit }, locale) => {
    commit(types.SET_LOCALE, locale)
    i18n.locale(locale)
  }
}

const mutations = {
  [types.SET_LOCALE] (state, locale) {
    state.i18n.current = i18n.localeItem(locale)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
