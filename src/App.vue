<template>
  <div id="app">
    <app-splash v-if="!removedSplash" :active="showSplash"></app-splash>
    <main-header></main-header>
    <main-content>
      <spinner :active="loading" />
      <transition
        :name="transitionName"
        :mode="transitionMode"
        v-on:enter="$defaultEnterTransition"
        >
        <router-view></router-view>
      </transition>
    </main-content>
    <main-footer></main-footer>
  </div>
</template>

<script>
import WebFont from 'webfontloader'
import moment from 'moment'
import { mapGetters } from 'vuex'
import {
  MainHeader,
  MainContent,
  MainFooter,
  AppSplash,
  Spinner
} from './components/pieces'
export default {
  name: 'app',
  components: { MainHeader, MainContent, MainFooter, AppSplash, Spinner },
  created () {
    moment.locale(this.currentLocale.locale)
    WebFont.load({
      google: {
        families: [
          'Changa+One:400,400i',
          'Coda:400,800'
        ]
      }
    })

    setTimeout(() => {
      this.showSplash = false
      setTimeout(() => {
        this.removedSplash = true
      }, 500)
    }, 2000)

    this.$bus.$on('enableFullSpinner', () => {
      this.loading = true
    })
    this.$bus.$on('disableFullSpinner', () => {
      this.loading = false
    })
  },
  computed: {
    ...mapGetters({
      transitionName: 'getTransitionName',
      transitionMode: 'getTransitionMode',
      currentLocale: 'getCurrentLocale'
    })
  },
  data () {
    return {
      showSplash: true,
      removedSplash: false,
      loading: false
    }
  }
}
</script>

<style lang="sass">
@import 'sass/styles'
</style>
