<template>
  <vue-form :state="formstate" v-model="model.formstate" @submit.prevent="sendForm">
    <validate auto-label class="form-group required-field" :class="fieldClassName(formstate.email)">
      <label class="control-label">{{ $t('modules.users.fields.email' )}}</label>
      <input v-model="model.email" name="email" type="email" class="form-control" required>
      <field-messages class="errors-list" name="email" show="$submitted">
        <div slot="required">{{ $t('modules.users.validations.typeYourEmail') }}</div>
        <div slot="email">{{ $t('modules.users.validations.invalidEmail') }}</div>
      </field-messages>
    </validate>
    <validate auto-label class="form-group required-field" :class="fieldClassName(formstate.password)">
      <label class="control-label">{{ $t('modules.users.fields.password' )}}</label>
      <input v-model="model.password" name="password" type="password" class="form-control" required>
      <field-messages class="errors-list" name="password" show="$submitted">
        <div slot="required">{{ $t('modules.users.validations.typeYourPassword') }}</div>
      </field-messages>
    </validate>
    <div class="submit-box">
      <button class="btn btn-primary btn-lg btn-block" :disabled="sending">{{ $t('actions.login') }}</button>
    </div>
    <div :class="messageClasses">{{ message }}</div>
  </vue-form>
</template>

<script>
export default {
  name: 'login-form',
  data () {
    return {
      formstate: {},
      model: {
        email: null,
        password: null
      },
      message: null,
      sending: false
    }
  },
  computed: {
    messageClasses () {
      return {
        'form-result': true,
        'alert': true,
        'alert-danger': true,
        'active': this.message
      }
    }
  },
  methods: {
    fieldClassName (field) {
      if (!field) return ''
      if ((field.$touched || field.$submitted) && field.$valid) return 'has-success'
      if ((field.$touched || field.$submitted) && field.$invalid) return 'has-error'
    },
    sendForm () {
      if (this.formstate.$invalid) return
      this.sending = true
      let data = {
        email: this.model.email,
        password: this.model.password
      }
      this.message = null
      this.$store.dispatch('auth', data).then((user) => {
        this.$router.push({ name: 'dashboard' })
      }).catch((error) => {
        this.sending = false
        this.message = error.body.message || this.$t('internalServerError')
      })
    }
  }
}
</script>
