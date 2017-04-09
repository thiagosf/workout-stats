<template>
  <div class="training">
    <training-box
      v-if="currentItem"
      v-on:evolutionChange="onEvolutionChange"
      v-on:categoryChange="categoryChange"
      v-on:trainingChange="trainingChange"
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
        const list = this.trainings.filter((item) => {
          return item.category === currentItem.category
        }).map((item) => {
          return {
            name: item.name,
            id: item.id
          }
        })
        return list
      }
    }
  },
  methods: {
    onEvolutionChange (data) {
      this.$store.dispatch('setEvolution', data)
    },
    categoryChange (direction) {
      for (let index in this.categoryList) {
        let item = this.categoryList[index]
        if (item.name === this.currentItem.category) {
          let maxIndex = this.categoryList.length - 1
          let newIndex = direction === 'next' ? (parseInt(index) + 1) : (parseInt(index) - 1)
          if (newIndex < 0) {
            newIndex = maxIndex
          } else if (newIndex > maxIndex) {
            newIndex = 0
          }
          let newTrainingIndex
          for (let j in this.trainings) {
            if (this.trainings[j].id === this.categoryList[newIndex].trainingId) {
              newTrainingIndex = j
            }
          }
          this.currentIndex = newTrainingIndex
          break
        }
      }
    },
    trainingChange (direction) {
      for (let index in this.trainingList) {
        let item = this.trainingList[index]
        if (item.id === this.currentItem.id) {
          let maxIndex = this.trainingList.length - 1
          let newIndex = direction === 'next' ? (parseInt(index) + 1) : (parseInt(index) - 1)
          if (newIndex < 0) {
            newIndex = maxIndex
          } else if (newIndex > maxIndex) {
            newIndex = 0
          }
          let newTrainingIndex
          for (let j in this.trainings) {
            if (this.trainings[j].id === this.trainingList[newIndex].id) {
              newTrainingIndex = j
            }
          }
          this.currentIndex = newTrainingIndex
          break
        }
      }
    }
  },
  created () {
    this.$store.dispatch('loadTrainings')
  }
}
</script>
