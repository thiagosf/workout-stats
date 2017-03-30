<template>
  <svg :class="cssClasses">
    <use :xlink:href="iconHref"></use>
  </svg>
</template>

<script>
export default {
  name: 'icon',
  props: {
    name: { type: String, required: true }
  },
  computed: {
    cssClasses () {
      return {
        'svg-icon': true,
        [`svg-icon-${this.name}`]: true
      }
    },
    iconHref () {
      return `#icon-${this.name}`
    }
  }
}
</script>
