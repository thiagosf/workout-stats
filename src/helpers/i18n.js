import Vue from 'vue'
import VueI18n from 'vue-i18n'
import * as allLocales from '../locales'

export default {
  default: 'pt-BR',
  fallbackLanguage: 'en',
  install () {
    Vue.use(VueI18n)

    this.locales().forEach((item) => {
      Vue.locale(item.locale, allLocales[item.file])
    })

    Vue.config.fallbackLanguage = this.fallbackLanguage
    this.locale(this.default)
  },
  locales (all) {
    const items = [
      {
        name: 'Português',
        locale: 'pt-BR',
        file: 'ptBR',
        enabled: true
      },
      {
        name: 'English',
        locale: 'en',
        file: 'en',
        enabled: true
      }
    ]
    if (!all) {
      return items.filter(item => item.enabled)
    } else {
      return items
    }
  },
  locale (locale) {
    if (locale) {
      Vue.config.lang = locale
    } else {
      return Vue.config.lang
    }
  },
  localeItem (locale) {
    if (!locale) locale = this.default
    return this.locales().filter(item => item.locale === locale).shift()
  },
  defaultLocaleItem () {
    return this.localeItem(this.locale())
  }
}
