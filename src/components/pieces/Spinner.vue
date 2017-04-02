<template>
  <div :class="cssClasses">
    <span>
      <span></span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'spinner',
  computed: {
    cssClasses () {
      return {
        'spinner ': true,
        'active ': this.active,
        'full ': this.full
      }
    }
  },
  props: {
    active: { type: Boolean, default: false },
    full: { type: Boolean, default: true }
  }
}
</script>
