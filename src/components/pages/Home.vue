<template>
  <div class="home">
    <spinner :active="!loginChecked"></spinner>
    <div v-if="loginChecked">
      <div class="splash">
        <h1>{{ $t('titles.home') }}</h1>
        <p>{{ $t('texts.home') }}</p>
      </div>
      <div class="create-account-login-box">
        <ul class="nav nav-tabs">
          <li :class="{ 'active': currentTab('create-account') }">
            <a href="#" @click.prevent="showTab('create-account')">
              {{ $t('titles.newAccount') }}
            </a>
          </li>
          <li :class="{ 'active': currentTab('login') }">
            <a href="#" @click.prevent="showTab('login')">
              {{ $t('titles.login') }}
            </a>
          </li>
        </ul>
        <div class="tab-content">
          <div :class="{ 'tab-pane': true, 'active': currentTab('create-account') }">
            <new-account-form></new-account-form>
          </div>
          <div :class="{ 'tab-pane': true, 'active': currentTab('login') }">
            <login-form></login-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NewAccountForm, LoginForm, Spinner } from '../pieces'
export default {
  name: 'home',
  components: { NewAccountForm, LoginForm, Spinner },
  data () {
    return {
      tab: 'create-account',
      loginChecked: false
    }
  },
  methods: {
    showTab (tab) {
      this.tab = tab
    },
    currentTab (tab) {
      return this.tab === tab
    }
  },
  created () {
    this.$store.dispatch('checkLogin').then((user) => {
      if (user) {
        this.$router.push({ name: 'dashboard' })
      }
      this.loginChecked = true
    }).catch(() => {
      this.loginChecked = true
    })
  }
}
</script>
