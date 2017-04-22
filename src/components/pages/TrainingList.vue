<template>
  <div class="training-list">
    <h1>Lista de treinos</h1>
    <div class="row row-8-padding">
      <div class="col-xs-12">
        <label for="category">Crie uma categoria</label>
      </div>
      <div class="col-xs-8">
        <div class="form-group">
          <input id="category" class="form-control" type="text" ref="category" @keyup.enter="addCategory" placeholder="Digite o nome da categoria">
        </div>
      </div>
      <div class="col-xs-4">
        <button class="btn btn-block btn-primary btn-lg" @click.prevent="addCategory">Criar</button>
      </div>
      <div class="col-xs-12">
        <span class="help">Exemplo: <code>Treino A</code>, <code>Tríceps</code>, <code>Pernas</code></span>
      </div>
    </div>
    <div class="make-with-model-box">
      <p>Ou se preferir use nosso modelo de treinos:</p>
      <button class="btn btn-sm btn-info" @click.prevent="makeWithModel">Usar modelo</button>
    </div>
    <hr>
    <ul class="training-list-edit">
      <li v-for="(item, index) in categories">
        <a href="#" class="btn btn-warning btn-sm" @click.prevent="removeCategory(index)">Remover categoria</a>
        <edit-inline class="edit-inline-category" :value="item.name" :data="[index]" v-on:onSubmit="changeCategory">
          <h2>{{ item.name }}</h2>
        </edit-inline>
        <ul>
          <li v-for="(training, tindex) in item.trainings">
            <div class="row row-8-padding">
              <div class="col-xs-10">
                <edit-inline :value="training" :data="[index, tindex]" v-on:onSubmit="changeTraining">
                  {{ training }}
                </edit-inline>
              </div>
              <div class="col-xs-2">
                <a href="#" class="btn btn-warning btn-sm btn-block" @click.prevent="removeTraining(index, tindex)">x</a>
              </div>
            </div>
          </li>
        </ul>
        <div class="row row-8-padding">
          <div class="col-xs-8">
            <input type="text" class="form-control" ref="training" :data-index="index" @keyup.enter="addTraining(index)" placeholder="Digite o nome do treino">
          </div>
          <div class="col-xs-4">
            <button @click.prevent="addTraining(index)" class="btn btn-primary btn-lg btn-block">Criar</button>
          </div>
        </div>
      </li>
    </ul>
    <button @click.prevent="onSubmit" class="btn btn-success btn-lg btn-block" :disabled="!hasCategories">Salvar configurações</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EditInline } from '../pieces'
export default {
  name: 'training-list',
  components: { EditInline },
  head: {
    title () {
      return {
        inner: this.$t('titles.trainingList')
      }
    }
  },
  data () {
    return {
      categories: [],
      categoryIndexEdit: null,
      trainingIndexEdit: null
    }
  },
  created () {
    this.$bus.$emit('enableFullSpinner')
    this.$store.dispatch('loadTrainings').then(() => {
      this.$bus.$emit('disableFullSpinner')
      let categories = {}
      this.trainings.map((training) => {
        let item
        if (categories[training.category]) {
          item = categories[training.category]
          item.trainings.push(training.name)
        } else {
          item = {
            name: training.category,
            trainings: [training.name]
          }
        }
        categories[training.category] = item
      })
      let output = []
      for (let i in categories) {
        output.push(categories[i])
      }
      this.categories = output
    })
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
    },
    enableCategoryEditMode (index) {
      this.categoryIndexEdit = index
      this.trainingIndexEdit = null
    },
    categoryTitleClasses (index) {
      return {
        'inline-edit-mode': true,
        'active': index === this.categoryIndexEdit && this.trainingIndexEdit === null
      }
    },
    changeCategory (data) {
      let newName = data.value
      let index = data.data[0]
      this.categories.map((item, _index) => {
        if (_index === index) {
          item.name = newName
          this.categoryIndexEdit = null
        }
      })
    },
    enableTrainingEditMode (cindex, index) {
      this.categoryIndexEdit = cindex
      this.trainingIndexEdit = index
    },
    trainingTitleClasses (cindex, index) {
      return {
        'inline-edit-mode': true,
        'active': cindex === this.categoryIndexEdit && index === this.trainingIndexEdit
      }
    },
    changeTraining (data) {
      let newName = data.value
      let cindex = data.data[0]
      let index = data.data[1]
      this.categories = this.categories.map((item, _index) => {
        if (_index === cindex) {
          item.trainings = item.trainings.map((training, tindex) => {
            if (index === tindex) {
              training = newName
              this.categoryIndexEdit = null
              this.trainingIndexEdit = null
            }
            return training
          })
        }
        return item
      })
    },
    makeWithModel () {
      this.categories = [
        {
          name: 'Tríceps',
          trainings: [
            'Supino reto',
            'Supino 45',
            'Supino inclinado'
          ]
        },
        {
          name: 'Bíceps',
          trainings: [
            'Rosca na barra',
            'Rosca alternada',
            'Barra fixa'
          ]
        },
        {
          name: 'Pernas e ombros',
          trainings: [
            'Agachamento',
            'Elevação lateral'
          ]
        }
      ]
    },
    onSubmit () {
      this.$store.dispatch('saveTrainings', this.categories).then(() => {
        this.$router.push({ name: 'dashboard' })
      })
    }
  },
  computed: {
    ...mapGetters({
      trainings: 'getTrainings'
    }),
    hasCategories () {
      return this.categories.length > 0
    }
  }
}
</script>
