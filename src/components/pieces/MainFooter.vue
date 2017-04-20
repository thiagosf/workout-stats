<template>
  <footer class="main-footer">
    <div class="container-fluid">
      <!-- <p v-html="$t('footer.text')"></p> -->
      <icon name="dumbbell" />
    </div>
  </footer>
</template>

<script>
import Icon from './Icon'
export default {
  name: 'main-footer',
  components: { Icon }
}
</script>
