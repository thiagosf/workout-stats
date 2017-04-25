<template>
  <div class="stats">
    <div class="back-title-box" v-if="training">
      <router-link class="btn btn-info btn-sm" :to="{ name: 'stats' }">
        {{ $t('actions.back') }}
      </router-link>
    </div>
    <h1 v-if="training">
      {{ this.training.name }}
    </h1>
    <div :class="currentWeightClasses" v-if="currentWeight">
      <h2>
        {{ currentWeight }}<span>kg</span>
      </h2>
      <p>{{ $t('stats.currentWeight') }}</p>
    </div>
    <div v-if="!currentWeight">
      <p>{{ $t('stats.withoutStats') }}</p>
    </div>
    <div id="training-chart"></div>
  </div>
</template>

<script>
import Chartkick from 'chartkick'
import moment from 'moment'
import { mapGetters } from 'vuex'
import { Icon } from '../pieces'
export default {
  name: 'stats-show',
  components: { Icon },
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
    },
    currentWeightClasses () {
      return {
        'current-weight-stats': true,
        'up': this.evolutionDirection('up'),
        'down': this.evolutionDirection('down')
      }
    },
    currentWeight () {
      if (this.training && this.training.limited_evolutions) {
        const lastIndex = this.training.limited_evolutions.length - 1
        const lastEvolution = this.training.limited_evolutions[lastIndex]
        if (lastEvolution) {
          return lastEvolution.weight
        }
      }
    }
  },
  head: {
    title () {
      return {
        inner: this.title
      }
    }
  },
  created () {
    this.$bus.$emit('enableFullSpinner')
    this.$store.dispatch('loadTraining', this.$route.params.id).then((training) => {
      this.$bus.$emit('disableFullSpinner')
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
      if (Object.keys(chartData).length > 1) {
        this.chart = new Chartkick.LineChart('training-chart', chartData, {
          colors: ['#f4511e', '#ccc'],
          label: this.$t('stats.weight')
        })
      }
    },
    evolutionDirection (direction) {
      if (this.training && this.training.limited_evolutions) {
        const lastIndex = this.training.limited_evolutions.length - 1
        const penultimateIndex = this.training.limited_evolutions.length - 2
        const lastEvolution = this.training.limited_evolutions[lastIndex]
        const penultimateEvolution = this.training.limited_evolutions[penultimateIndex]
        if (direction === 'up') {
          if (!penultimateEvolution || penultimateEvolution.weight < lastEvolution.weight) {
            return true
          }
        } else {
          if (penultimateEvolution && penultimateEvolution.weight > lastEvolution.weight) {
            return true
          }
        }
      }
      return false
    }
  },
  destroyed () {
    if (this.chart) {
      this.chart.chart.destroy()
    }
  }
}
</script>
