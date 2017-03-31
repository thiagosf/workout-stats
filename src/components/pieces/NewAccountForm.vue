<template>
  <vue-form :state="formstate" v-model="model.formstate" @submit.prevent="sendForm">
    <validate auto-label class="form-group required-field" :class="fieldClassName(formstate.name)">
      <label class="control-label">{{ $t('modules.users.fields.name' )}}</label>
      <input v-model="model.name" name="name" type="text" class="form-control" required>
      <field-messages name="name" show="$submitted">
        <div slot="required">Nome é obrigatório</div>
      </field-messages>
    </validate>
    <validate auto-label class="form-group required-field" :class="fieldClassName(formstate.email)">
      <label class="control-label">{{ $t('modules.users.fields.email' )}}</label>
      <input v-model="model.email" name="email" type="email" class="form-control" required>
      <field-messages name="email" show="$submitted">
        <div slot="required">E-mail é obrigatório</div>
        <div slot="email">E-mail inválido</div>
      </field-messages>
    </validate>
    <validate auto-label class="form-group required-field" :class="fieldClassName(formstate.password)">
      <label class="control-label">{{ $t('modules.users.fields.password' )}}</label>
      <input v-model="model.password" name="password" type="password" class="form-control" required>
      <field-messages name="password" show="$submitted">
        <div slot="required">Digite uma senha</div>
      </field-messages>
    </validate>
    <validate auto-label class="form-group required-field" :class="fieldClassName(formstate.gender)">
      <label class="control-label">
        <input v-model="model.gender" name="gender" type="radio" value="female" required>
        <icon name="female" />
      </label>
      <label class="control-label">
        <input v-model="model.gender" name="gender" type="radio" value="male" required>
        <icon name="male" />
      </label>
      <field-messages name="gender" show="$submitted">
        <div slot="required">Selecione seu sexo</div>
      </field-messages>
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
      model: {
        name: null,
        email: null,
        password: null,
        gender: null
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
      let data = {
        name: this.model.name,
        email: this.model.email,
        password: this.model.password,
        gender: this.model.gender
      }
      this.$store.dispatch('createUser', data).then((user) => {
        console.log(user)
        // this.$router.push({ name: 'dashboard' })
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
