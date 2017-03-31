<template>
  <div class="home">
    <h1>{{ $t('titles.home') }}</h1>
    <p>{{ $t('texts.home') }}</p>
    <div class="">
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
</template>

<script>
import { NewAccountForm, LoginForm } from '../pieces'
export default {
  name: 'home',
  components: { NewAccountForm, LoginForm },
  data () {
    return {
      tab: 'create-account'
    }
  },
  methods: {
    showTab (tab) {
      this.tab = tab
    },
    currentTab (tab) {
      return this.tab === tab
    }
  }
}
</script>
