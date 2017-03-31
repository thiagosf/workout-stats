<template>
  <div id="app">
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
import { MainHeader, MainContent, MainFooter } from './components/pieces'
export default {
  name: 'app',
  components: { MainHeader, MainContent, MainFooter },
  created () {
    WebFont.load({
      google: {
        families: [
          'Changa+One:400,400i',
          'Coda:400,800'
        ]
      }
    })
  },
  computed: {
    ...mapGetters({
      transitionName: 'getTransitionName',
      transitionMode: 'getTransitionMode'
    })
  }
}
</script>

<style lang="sass">
@import 'sass/styles'
</style>
