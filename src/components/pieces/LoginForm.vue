<template>
  <form action="#" @submit.prevent="sendForm">
    <div class="form-group">
      <label>{{ $t('modules.users.fields.email' )}}</label>
      <input v-model="email" name="email" type="email" class="form-control">
    </div>
    <div class="form-group">
      <label>{{ $t('modules.users.fields.password' )}}</label>
      <input v-model="password" name="password" type="password" class="form-control">
    </div>
    <div class="submit-box">
      <button class="btn btn-primary">{{ $t('actions.login') }}</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'login-form',
  data () {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    sendForm () {
      console.log(this.email)
      console.log(this.password)
    }
  }
}
</script>
