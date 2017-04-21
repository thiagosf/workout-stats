<template>
  <div class="stats">
    <spinner :active="loading" :full="false" />
    <div class="back-title-box" v-if="training">
      <router-link class="btn btn-info btn-sm" :to="{ name: 'stats' }">
        {{ $t('actions.back') }}
      </router-link>
    </div>
    <h1 v-if="training">
      {{ this.training.name }}
    </h1>
    <div id="training-chart"></div>
    <ul v-if="false">
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
import Chartkick from 'chartkick'
import moment from 'moment'
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
      this.mountChart()
    })
  },
  methods: {
    mountChart () {
      let chartData = {}
      this.training.limited_evolutions.map((item) => {
        let key = moment(item.date).format('DD/MM/YY')
        chartData[key] = item.weight
      })
      /* eslint-disable */
      new Chartkick.LineChart('training-chart', chartData, {
        colors: ['#b00', '#666'],
        label: this.$t('stats.weight')
      })
    }
  }
}
</script>
