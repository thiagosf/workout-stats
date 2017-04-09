<template>
  <div class="training">
    <training-box
      v-if="currentItem"
      v-on:evolutionChange="onEvolutionChange"
      v-on:categoryChange="selectTrainingById"
      v-on:trainingChange="selectTrainingById"
      :categories="categoryList"
      :trainings="trainingList"
      :item="currentItem"
      ></training-box>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
      currentIndex: 0
    }
  },
  computed: {
    ...mapGetters({
      trainings: 'getTrainings'
    }),
    currentItem () {
      return this.trainings[this.currentIndex]
    },
    categoryList () {
      if (this.trainings && this.trainings.length > 0) {
        let output = []
        let lastCategory = null
        this.trainings.map((item) => {
          if (lastCategory !== item.category) {
            lastCategory = item.category
            output.push({
              name: item.category,
              id: item.id,
              trainingId: item.id
            })
          }
        })
        return output
      }
    },
    trainingList () {
      let currentItem = this.currentItem
      if (this.trainings && this.trainings.length > 0) {
        return this.trainings.filter((item) => {
          return item.category === currentItem.category
        }).map((item) => {
          return {
            name: item.name
          }
        })
      }
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
  created () {
    this.$store.dispatch('loadTrainings')
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
