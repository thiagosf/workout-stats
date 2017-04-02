<template>
  <div class="dashboard">
    <div class="category-box">
      <p>Tríceps</p>
    </div>
    <div class="training-box">
      <p>Supino reto</p>
    </div>
    <div class="weight-box">
      <a href="#" class="btn btn-success" @mousedown="weightInterval('up')" @mouseup="stopWeightInterval" @click.prevent="addWeight">mais</a>
      <p class="weight">{{ weight }}</p>
      <p class="weight-each-side">(<span>{{ weightEachSide }}</span>kg cada lado)</p>
      <a href="#" class="btn btn-warning" @mousedown="weightInterval('down')" @mouseup="stopWeightInterval" @click.prevent="subtractWeight">menos</a>
    </div>
    <div class="evolution-box">
    </div>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  data () {
    return {
      weight: 46
    }
  },
  computed: {
    weightEachSide () {
      if (this.weight > 0) {
        return this.weight / 2
      }
    }
  },
  methods: {
    addWeight () {
      this.weight += 2
    },
    subtractWeight () {
      this.weight -= 2
      if (this.weight < 2) this.weight = 2
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
    }
  }
}
</script>
