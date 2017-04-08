<template>
  <div class="training-list">
    <h1>Lista de treinos</h1>
    <input type="text" ref="category" @keyup.enter="addCategory">
    <button @click.prevent="addCategory">Criar</button>
    <hr>
    <ul>
      <li v-for="(item, index) in categories">
        <a href="#" @click.prevent="removeCategory(index)">remover</a>
        <h2>{{ item.name }}</h2>
        <ul>
          <li v-for="(training, tindex) in item.trainings">
            <a href="#" @click.prevent="removeTraining(index, tindex)">remover</a>
            {{ training }}
          </li>
        </ul>
        <input type="text" ref="training" :data-index="index" @keyup.enter="addTraining(index)">
        <button @click.prevent="addTraining(index)">Criar</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'training-list',
  head: {
    title () {
      return {
        inner: this.$t('titles.trainingList')
      }
    }
  },
  data () {
    return {
      categories: []
    }
  },
  methods: {
    addCategory () {
      if (this.$refs.category.value) {
        this.categories.push({
          name: this.$refs.category.value,
          trainings: []
        })
        this.$refs.category.value = null
      }
      this.$refs.category.focus()
    },
    addTraining (index) {
      if (this.$refs.training[index].value) {
        this.categories = this.categories.map((item, _index) => {
          if (_index === index) {
            item.trainings.push(this.$refs.training[index].value)
            this.$refs.training[index].value = null
            this.$refs.training[index].focus()
          }
          return item
        })
      }
    },
    removeCategory (index) {
      this.categories.splice(index, 1)
    },
    removeTraining (cindex, index) {
      this.categories = this.categories.map((item, _index) => {
        if (_index === cindex) {
          item.trainings.splice(index, 1)
        }
        return item
      })
    }
  }
}
</script>
