<template>
  <div class="dashboard">
    <training-box :item="currentItem" v-on:evolutionChange="onEvolutionChange"></training-box>
  </div>
</template>

<script>
import moment from 'moment'
import { TrainingBox } from '../pieces'

export default {
  name: 'dashboard',
  components: { TrainingBox },
  data () {
    return {
      currentIndex: 0,
      trainings: [{
        id: 1,
        category: 'Tríceps',
        name: 'Supino',
        weight: 44,
        lastWeight: 44,
        stats: [{
          weight: 42,
          date: moment().subtract(4, 'day')
        }, {
          weight: 44,
          date: moment().subtract(2, 'day')
        }, {
          weight: 46,
          date: moment().subtract(1, 'day')
        }]
      }]
    }
  },
  computed: {
    currentItem () {
      return this.trainings[this.currentIndex]
    }
  },
  methods: {
    onEvolutionChange (data) {
      this.$store.dispatch('setEvolution', data)
    }
  }
}
</script>
