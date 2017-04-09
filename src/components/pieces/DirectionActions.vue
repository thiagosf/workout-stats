<template>
  <div class="direction-actions">
    <a
      href="#"
      class="prev"
      @click="onPrev"
      >
      <icon name="left-arrow" />
    </a>
    <a
      href="#"
      class="next"
      @click="onNext"
      >
      <icon name="right-arrow" />
    </a>
  </div>
</template>

<script>
import Icon from './Icon'
export default {
  name: 'direction-actions',
  components: { Icon },
  methods: {
    onPrev () {
      this.$emit('onPrev')
    },
    onNext () {
      this.$emit('onNext')
    }
  }
}
</script>
