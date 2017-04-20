<template>
  <div class="stats">
    <spinner :active="loading" :full="false" />
    <h1 v-if="training">{{ this.training.name }}</h1>
    <router-link :to="{ name: 'stats' }">{{ $t('actions.back') }}</router-link>
    <ul v-if="training">
      <li v-for="evolution in training.limited_evolutions">
        {{ evolution.date }}
        <br>
        {{ evolution.weight }}
        <br>
        {{ evolution.series }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Icon, Spinner } from '../pieces'
export default {
  name: 'stats-show',
  components: { Icon, Spinner },
  computed: {
    ...mapGetters({
      user: 'getUser',
      training: 'getCurrentTraining'
    }),
    title () {
      let title = this.$t('titles.stats')
      if (this.training) {
        title = this.training.name
      }
      return title
    }
  },
  head: {
    title () {
      return {
        inner: this.title
      }
    }
  },
  data () {
    return {
      loading: true
    }
  },
  created () {
    this.$store.dispatch('loadTraining', this.$route.params.id).then((training) => {
      this.loading = false
    })
  }
}
</script>
