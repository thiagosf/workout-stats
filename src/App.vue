<template>
  <div id="app">
    <transition
      :name="transitionName"
      :mode="transitionMode"
      v-on:enter="$defaultEnterTransition"
      >
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import WebFont from 'webfontloader'
import { mapGetters } from 'vuex'
export default {
  name: 'app',
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
