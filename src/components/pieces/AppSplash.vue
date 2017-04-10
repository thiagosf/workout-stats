<template>
  <div :class="cssClasses">
    <div class="logo-box">
      <div class="wrapper">
        <icon name="dumbbell" />
        <span>{{ $t('mainTitle') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from './Icon'
export default {
  name: 'app-splash',
  components: { Icon },
  computed: {
    cssClasses () {
      return {
        'app-splash': true,
        active: true,
        leave: !this.active
      }
    }
  },
  props: {
    active: { type: Boolean, default: false }
  }
}
</script>
