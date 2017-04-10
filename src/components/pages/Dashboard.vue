<template>
  <div class="dashboard">
    <div class="dashboard-button-items">
      <div class="row">
        <div class="col-xs-6 col-sm-4">
          <router-link :to="{ name: 'workout' }" :class="`btn btn-lg btn-primary btn-workout-${user.gender}`">
            <icon :name="`workout-${user.gender}`" />
            {{ $t('actions.workout') }}
          </router-link>
        </div>
        <div class="col-xs-6 col-sm-4">
          <router-link :to="{ name: 'stats' }" class="btn btn-lg btn-primary btn-stats">
            <icon name="stats" />
            {{ $t('actions.stats') }}
          </router-link>
        </div>
        <div class="col-xs-6 col-sm-4">
          <router-link :to="{ name: 'training-list' }" class="btn btn-lg btn-primary btn-training-list">
            <icon name="spreadsheet" />
            {{ $t('actions.trainingList') }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Icon } from '../pieces'
export default {
  name: 'dashboard',
  components: { Icon },
  computed: {
    ...mapGetters({
      user: 'getUser'
    })
  },
  head: {
    title () {
      return {
        inner: this.$t('titles.dashboard')
      }
    }
  }
}
</script>
