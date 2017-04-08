<template>
  <div class="workout">
    <div class="category-box">
      <swipe-actions
        v-on:onPrev="prevSwipe('categorySwipe')"
        v-on:onNext="prevSwipe('categorySwipe')"
        />
      <swipe ref="categorySwipe" :options="categorySwipeOptions">
        <swipe-item v-for="item in categories" :key="item.id" :data-id="item.trainingId">
          <p>{{ item.name }}</p>
        </swipe-item>
      </swipe>
    </div>
    <div class="training-box">
      <swipe-actions
        v-on:onPrev="prevSwipe('trainingSwipe')"
        v-on:onNext="prevSwipe('trainingSwipe')"
        />
      <swipe ref="trainingSwipe" :options="trainingSwipeOptions">
        <swipe-item v-for="item in trainings" :key="item.id" :data-id="item.id">
          <p>{{ item.name }}</p>
        </swipe-item>
      </swipe>
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
import Icon from './Icon'
import SwipeActions from './SwipeActions'

export default {
  name: 'dashboard',
  components: { Icon, SwipeActions },
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
      this.item.weight += 2
      this.evolutionChange()
    },
    subtractWeight () {
      this.item.weight -= 2
      if (this.item.weight < 2) this.item.weight = 2
      this.evolutionChange()
    },
    weightInterval (direction) {
      this.intervalTime = 200
      this.direction = direction
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
      return moment(date).format(this.$t('dashboard.stats.dateFormat'))
    },
    evolutionChange () {
      this.$emit('evolutionChange', {
        id: this.item.id,
        weight: this.item.weight
      })
    },
    nextSwipe (name) {
      this.$refs[name].next()
    },
    prevSwipe (name) {
      this.$refs[name].prev()
    }
  },
  data () {
    return {
      categorySwipeOptions: {
        callback: (index, slide) => {
          this.$emit('categoryChange', slide.dataset.id)
        }
      },
      trainingSwipeOptions: {
        callback: (index, slide) => {
          this.$emit('trainingChange', slide.dataset.id)
        }
      }
    }
  }
}
</script>
