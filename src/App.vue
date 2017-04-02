<template>
  <div id="app">
    <app-splash v-if="!removedSplash" :active="showSplash"></app-splash>
    <main-header></main-header>
    <main-content>
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
import { mapGetters } from 'vuex'
import { MainHeader, MainContent, MainFooter, AppSplash } from './components/pieces'
export default {
  name: 'app',
  components: { MainHeader, MainContent, MainFooter, AppSplash },
  created () {
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
    }, 5000)
  },
  computed: {
    ...mapGetters({
      transitionName: 'getTransitionName',
      transitionMode: 'getTransitionMode'
    })
  },
  data () {
    return {
      showSplash: true,
      removedSplash: false
    }
  }
}
</script>

<style lang="sass">
@import 'sass/styles'
</style>
