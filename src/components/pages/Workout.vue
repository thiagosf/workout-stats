<template>
  <div class="training">
    <training-box
      :categories="categoryList"
      :trainings="trainingList"
      :item="currentItem"
      v-on:evolutionChange="onEvolutionChange"
      v-on:categoryChange="selectTrainingById"
      v-on:trainingChange="selectTrainingById"
      ></training-box>
  </div>
</template>

<script>
import moment from 'moment'
import { TrainingBox } from '../pieces'

export default {
  name: 'workout',
  components: { TrainingBox },
  head: {
    title () {
      return {
        inner: this.$t('titles.workout')
      }
    }
  },
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
      }, {
        id: 2,
        category: 'Tríceps',
        name: 'Pull over',
        weight: 20,
        lastWeight: 20,
        stats: [{
          weight: 26,
          date: moment().subtract(4, 'day')
        }, {
          weight: 20,
          date: moment().subtract(2, 'day')
        }, {
          weight: 22,
          date: moment().subtract(1, 'day')
        }]
      }, {
        id: 3,
        category: 'Tríceps',
        name: 'Francesa',
        weight: 56,
        lastWeight: 56,
        stats: [{
          weight: 50,
          date: moment().subtract(4, 'day')
        }, {
          weight: 56,
          date: moment().subtract(2, 'day')
        }, {
          weight: 54,
          date: moment().subtract(1, 'day')
        }]
      }]
    }
  },
  computed: {
    currentItem () {
      return this.trainings[this.currentIndex]
    },
    categoryList () {
      return [
        { name: 'Tríceps', id: 1, trainingId: 1 },
        { name: 'Bíceps', id: 2, trainingId: 1 },
        { name: 'Perna', id: 3, trainingId: 1 }
      ]
    },
    trainingList () {
      return [
        { name: 'Supino', id: 1 },
        { name: 'Pull over', id: 2 },
        { name: 'Francesa', id: 3 }
      ]
    }
  },
  methods: {
    onEvolutionChange (data) {
      this.$store.dispatch('setEvolution', data)
    },
    selectTrainingById (id) {
      this.trainings.map((item, index) => {
        if (item.id === parseInt(id)) {
          this.currentIndex = index
        }
      })
    }
  },
  mounted () {
    // fix position swipe on load page
    setTimeout(() => {
      let event = document.createEvent('HTMLEvents')
      event.initEvent('resize', true, true)
      window.dispatchEvent(event)
    }, 300)
  }
}
</script>
