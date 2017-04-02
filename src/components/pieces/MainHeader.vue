<template>
  <header class="main-header">
    <div class="container">
      <nav v-if="loggedIn">
        <ul>
          <li>
            <router-link :to="{ name: 'logout' }">{{ $t('actions.logout') }}</router-link>
          </li>
        </ul>
      </nav>
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
      user: 'getUser',
      loggedIn: 'loggedIn'
    })
  }
}
</script>
