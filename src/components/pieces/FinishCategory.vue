<template>
  <div class="finish-category-box">
    <div class="wrapper">
      <button class="btn btn-primary" @click="$emit('close')">{{ $t('actions.close') }}</button>
      <h1>{{ $t('modules.workout.congratulations') }}</h1>
      <h2
        v-html="$t('modules.workout.youFinishTraining', { category: category })"
        />
      <p>{{ $t('modules.workout.nowGoRest') }}</p>
    </div>
  </div>
</template>

<script>
import Icon from './Icon'
export default {
  name: 'finish-category',
  components: { Icon },
  props: {
    category: String
  }
}
</script>
