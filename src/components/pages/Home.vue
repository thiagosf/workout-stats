<template>
  <div class="home">
    <main-header></main-header>
    <main-content>
      <h1>{{ $t('titles.home') }}</h1>
      <p>{{ $t('texts.home') }}</p>
      <div class="">
        <ul class="nav nav-tabs">
          <li class="active"><a href="#create-account">{{ $t('titles.newAccount') }}</a></li>
          <li><a href="#login">{{ $t('titles.login') }}</a></li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane active" id="create-account">
            <new-account-form></new-account-form>
          </div>
          <div class="tab-pane" id="login">
            <login-form></login-form>
          </div>
        </div>
      </div>
    </main-content>
  </div>
</template>

<script>
import { MainHeader, MainContent, NewAccountForm, LoginForm } from '../pieces'
export default {
  name: 'home',
  components: { MainHeader, MainContent, NewAccountForm, LoginForm },
  head: {
    title: {
      inner: 'Train More'
    }
  }
}
</script>
