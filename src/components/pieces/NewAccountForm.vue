<template>
  <vue-form action="#" :state="formstate" v-model="formstate" @submit.prevent="sendForm">
    <validate auto-label class="form-group required-field" :class="fieldClassName(formstate.name)">
      <label class="control-label">{{ $t('modules.users.fields.name' )}}</label>
      <input v-model="name" name="name" type="text" class="form-control" required>
    </validate>
    <validate auto-label class="form-group required-field" :class="fieldClassName(formstate.email)">
      <label class="control-label">{{ $t('modules.users.fields.email' )}}</label>
      <input v-model="email" name="email" type="email" class="form-control" required>
    </validate>
    <validate auto-label class="form-group required-field" :class="fieldClassName(formstate.password)">
      <label class="control-label">{{ $t('modules.users.fields.password' )}}</label>
      <input v-model="password" name="password" type="password" class="form-control" required>
    </validate>
    <validate auto-label class="form-group required-field" :class="fieldClassName(formstate.gender)">
      <label class="control-label">
        <input v-model="gender" name="gender" type="radio" value="female" required>
        <icon name="female" />
      </label>
      <label class="control-label">
        <input v-model="gender" name="gender" type="radio" value="male" required>
        <icon name="male" />
      </label>
    </validate>
    <div class="submit-box">
      <button class="btn btn-primary">{{ $t('actions.newAccount') }}</button>
    </div>
  </vue-form>
</template>

<script>
import Icon from './Icon'
export default {
  name: 'new-account-form',
  components: { Icon },
  data () {
    return {
      formstate: {},
      name: null,
      email: null,
      password: null,
      gender: null
    }
  },
  methods: {
    fieldClassName: function (field) {
      if (!field) return ''
      if ((field.$touched || field.$submitted) && field.$valid) return 'has-success'
      if ((field.$touched || field.$submitted) && field.$invalid) return 'has-error'
    },
    sendForm () {
      if (this.formstate.$invalid) return
      console.log(this.name)
      console.log(this.email)
      console.log(this.password)
      console.log(this.gender)
    }
  }
}
</script>
