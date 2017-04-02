<template>
  <div class="training-box">
    <div class="category-box">
      <p>{{ item.category }}</p>
    </div>
    <div class="training-box">
      <p>{{ item.name }}</p>
    </div>
    <div class="weight-box">
      <a href="#" class="btn btn-success" @mousedown="weightInterval('up')" @mouseup="stopWeightInterval" @click.prevent="addWeight">mais</a>
      <p class="weight">{{ item.weight }}</p>
      <p class="weight-each-side">(<span>{{ weightEachSide }}</span>kg cada lado)</p>
      <a href="#" class="btn btn-warning" @mousedown="weightInterval('down')" @mouseup="stopWeightInterval" @click.prevent="subtractWeight">menos</a>
    </div>
    <div class="evolution-box">
      <div :class="statsInfoClasses">
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
import moment from 'moment'

export default {
  name: 'dashboard',
  props: {
    item: { type: Object, required: true }
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
      this.item.weight += 2
    },
    subtractWeight () {
      this.item.weight -= 2
      if (this.item.weight < 2) this.item.weight = 2
    },
    weightInterval (direction) {
      this.intervalTime = 200
      this.direction = direction
      this.interval = setTimeout(this.item.weightIntervalLoop, this.intervalTime)
    },
    weightIntervalLoop () {
      if (this.direction === 'up') {
        this.addWeight()
      } else {
        this.subtractWeight()
      }
      this.intervalTime -= 20
      if (this.intervalTime < 20) this.intervalTime = 20
      this.interval = setTimeout(this.item.weightIntervalLoop, this.intervalTime)
    },
    stopWeightInterval () {
      clearInterval(this.interval)
    },
    statsItemClasses (item, index) {
      let lastItem = this.item.stats[index - 1]
      return {
        'item': true,
        'up': lastItem && item.weight > lastItem.weight,
        'down': lastItem && item.weight < lastItem.weight
      }
    },
    statsDate (date) {
      return moment(date).format(this.$t('dashboard.stats.dateFormat'))
    }
  }
}
</script>
