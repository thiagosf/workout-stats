<template>
  <div class="account">
    <h1>{{ $t('titles.myAccount') }}</h1>
    <edit-account-form :user="user" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Icon, EditAccountForm } from '../pieces'
export default {
  name: 'account',
  components: { Icon, EditAccountForm },
  computed: {
    ...mapGetters({
      user: 'getUser'
    })
  },
  head: {
    title () {
      return {
        inner: this.$t('titles.myAccount')
      }
    }
  }
}
</script>
