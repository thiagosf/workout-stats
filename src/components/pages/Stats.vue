<template>
  <div class="stats">
    <spinner :active="loading" :full="false" />
    <h1>{{ $t('titles.stats') }}</h1>
    <div class="stats-button-items" v-for="item in groupedTrainings">
      <h2>{{ item.category }}</h2>
      <div class="row">
        <div class="col-xs-12 col-sm-4" v-for="training in item.trainings">
          <router-link :to="{ name: 'stats-show', params: { id: training.id } }" class="btn btn-lg btn-default">
            <span class="name">{{ training.name }}</span>
            <span class="weight">{{ training.weight }}kg</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Icon, Spinner } from '../pieces'
export default {
  name: 'stats',
  components: { Icon, Spinner },
  computed: {
    ...mapGetters({
      user: 'getUser',
      trainings: 'getTrainings'
    }),
    groupedTrainings () {
      let output = {}
      if (this.trainings) {
        this.trainings.map((item) => {
          if (!output[item.category]) {
            output[item.category] = {
              category: item.category,
              trainings: []
            }
          }
          output[item.category].trainings.push(item)
        })
      }
      return output
    }
  },
  head: {
    title () {
      return {
        inner: this.$t('titles.stats')
      }
    }
  },
  data () {
    return {
      loading: true
    }
  },
  created () {
    this.$store.dispatch('loadTrainings').then(() => {
      this.loading = false
    })
  }
}
</script>
