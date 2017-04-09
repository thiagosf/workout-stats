<template>
  <div class="direction-actions">
    <span class="prev" @click="onPrev">
      <icon name="left-arrow" />
    </span>
    <span class="next" @click="onNext">
      <icon name="right-arrow" />
    </span>
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
