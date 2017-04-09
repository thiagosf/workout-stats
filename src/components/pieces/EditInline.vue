<template>
  <div :class="cssClasses" @click="enableEditMode">
    <div class="text">
      <slot />
    </div>
    <div class="input">
      <form action="#" @submit.prevent="onSubmit">
        <div class="row row-8-padding">
          <div class="col-xs-8">
            <input class="form-control" type="text" v-model="input" ref="editInput">
          </div>
          <div class="col-xs-4">
            <button class="btn btn-block btn-primary btn-lg" type="submit">Ok</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'edit-inline',
  props: {
    value: [String, Number],
    data: Array
  },
  data () {
    return {
      editModel: false,
      input: this.value
    }
  },
  computed: {
    cssClasses (index) {
      return {
        'inline-edit-mode': true,
        'active': this.editModel
      }
    }
  },
  methods: {
    onSubmit () {
      this.$emit('onSubmit', {
        value: this.input,
        data: this.data
      })
      this.editModel = false
    },
    enableEditMode () {
      this.editModel = true
      setTimeout(() => {
        this.$refs.editInput.focus()
      }, 100)
    }
  }
}
</script>
