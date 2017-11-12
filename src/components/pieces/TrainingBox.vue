<template>
  <div class="workout-box">
    <v-touch
      class="category-box"
      v-on:swipeleft="prevSwipe('category')"
      v-on:swiperight="nextSwipe('category')"
      >
      <direction-actions
        v-on:onPrev="prevSwipe('category')"
        v-on:onNext="nextSwipe('category')"
        />
      <p>{{ item.category }}</p>
    </v-touch>
    <v-touch
      class="training-box"
      v-on:swipeleft="prevSwipe('training')"
      v-on:swiperight="nextSwipe('training')"
      >
      <direction-actions
        v-on:onPrev="prevSwipe('training')"
        v-on:onNext="nextSwipe('training')"
        />
      <p>{{ item.name }}</p>
    </v-touch>
    <div class="weight-box">
      <div class="actions-weight">
        <v-touch
          tag="span"
          class="btn btn-plus"
          v-on:tap="addWeight"
          v-on:press="weightInterval('up')"
          v-on:pressup="stopWeightInterval"
          v-on:panend="stopWeightInterval"
          v-on:pancancel="stopWeightInterval"
          v-on:pandown="stopWeightInterval"
          @click.prevent="addWeight"
          @mousedown="weightInterval('up')"
          @mouseup="stopWeightInterval"
          @mouseleave="stopWeightInterval"
          @out="stopWeightInterval"
          >+</v-touch>
        <v-touch
          tag="span"
          class="btn btn-minus"
          v-on:tap="subtractWeight"
          v-on:press="weightInterval('down')"
          v-on:pressup="stopWeightInterval"
          v-on:panend="stopWeightInterval"
          v-on:pancancel="stopWeightInterval"
          v-on:pandown="stopWeightInterval"
          @click.prevent="subtractWeight"
          @mousedown="weightInterval('down')"
          @mouseup="stopWeightInterval"
          @mouseleave="stopWeightInterval"
          @out="stopWeightInterval"
          >-</v-touch>
      </div>
      <p class="weight">{{ item.weight }}</p>
      <p class="weight-each-side" v-if="false">(<span>{{ weightEachSide }}</span>kg cada lado)</p>
    </div>
    <div class="save-training-box">
      <button class="btn btn-primary btn-lg" @click="saveTraining" v-html="$t('actions.saveTraining')" />
    </div>
    <div class="evolution-box">
      <div v-if="false" :class="statsInfoClasses">
        <p>{{ statsInfoText }}</p>
      </div>
      <div class="stats">
        <div v-for="(statsItem, index) in item.stats" :class="statsItemClasses(statsItem, index)">
          <div class="weight"><strong>{{ statsItem.weight }}</strong>kg</div>
          <div class="date">{{ statsDate(statsItem.date) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fecha from 'fecha'
import Icon from './Icon'
import DirectionActions from './DirectionActions'

export default {
  name: 'dashboard',
  components: { Icon, DirectionActions },
  props: {
    item: { type: Object, required: true },
    categories: { type: Array, required: true },
    trainings: { type: Array, required: true }
  },
  computed: {
    weightEachSide () {
      if (this.item.weight > 0) {
        return this.item.weight / 2
      }
    },
    statsInfoText () {
      if (this.item.weight > this.item.lastWeight) {
        return this.$t('dashboard.stats.infoText.up')
      } else if (this.item.weight === this.item.lastWeight) {
        return this.$t('dashboard.stats.infoText.repeat')
      } else {
        return this.$t('dashboard.stats.infoText.down')
      }
    },
    statsInfoClasses () {
      return {
        'stats-info': true,
        'up': this.item.weight > this.item.lastWeight,
        'down': this.item.weight < this.item.lastWeight
      }
    }
  },
  methods: {
    addWeight () {
      this.stopWeightInterval()
      this.item.weight += 1
      this.evolutionChange()
    },
    subtractWeight () {
      this.stopWeightInterval()
      this.item.weight -= 1
      if (this.item.weight < 0) this.item.weight = 0
      this.evolutionChange()
    },
    weightInterval (direction) {
      this.intervalTime = 200
      this.direction = direction
      this.stopWeightInterval()
      this.interval = setTimeout(this.weightIntervalLoop, this.intervalTime)
    },
    weightIntervalLoop () {
      if (this.direction === 'up') {
        this.addWeight()
      } else {
        this.subtractWeight()
      }
      this.intervalTime -= 20
      if (this.intervalTime < 20) this.intervalTime = 20
      this.interval = setTimeout(this.weightIntervalLoop, this.intervalTime)
    },
    stopWeightInterval () {
      clearInterval(this.interval)
    },
    statsItemClasses (item, index) {
      let lastItem = this.item.stats[index - 1]
      return {
        'item': true,
        [`level-${index}`]: true,
        'up': lastItem && item.weight > lastItem.weight,
        'down': lastItem && item.weight < lastItem.weight
      }
    },
    statsDate (date) {
      date = fecha.parse(date, 'YYYY-MM-DD')
      return fecha.format(date, this.$t('dashboard.stats.dateFormat'))
    },
    evolutionChange () {
      this.$emit('evolutionChange', {
        id: this.item.id,
        weight: this.item.weight
      })
    },
    nextSwipe (name) {
      if (name === 'category') {
        this.$emit('categoryChange', 'next')
      } else {
        this.$emit('trainingChange', 'next')
      }
    },
    prevSwipe (name) {
      if (name === 'category') {
        this.$emit('categoryChange', 'prev')
      } else {
        this.$emit('trainingChange', 'prev')
      }
    },
    saveTraining () {
      this.$emit('saveTraining')
    }
  }
}
</script>
