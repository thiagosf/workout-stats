<template>
  <div class="stats">
    <h1>Estatísticas</h1>
    {{ trainings }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Icon } from '../pieces'
export default {
  name: 'stats',
  components: { Icon },
  computed: {
    ...mapGetters({
      user: 'getUser',
      trainings: 'getTrainings'
    })
  },
  head: {
    title () {
      return {
        inner: this.$t('titles.stats')
      }
    }
  },
  created () {
    this.$store.dispatch('loadTrainings')
  }
}
</script>
