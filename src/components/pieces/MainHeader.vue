<template>
  <header class="main-header">
    <div class="container-fluid">
      <div class="logo-box">
        <icon name="dumbbell" />
        <span>Training Stats</span>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import Icon from './Icon'
export default {
  name: 'main-header',
  components: { Icon },
  computed: {
    ...mapGetters({
      user: 'getUser'
    })
  }
}
</script>
