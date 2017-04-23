<template>
  <div class="training-list">
    <h1>{{ $t('titles.trainingList') }}</h1>
    <div class="row row-8-padding">
      <div class="col-xs-12">
        <label for="category">{{ $t('modules.workout.makeCategory') }}</label>
      </div>
      <div class="col-xs-8">
        <div class="form-group">
          <input id="category" class="form-control" type="text" ref="category" @keyup.enter="addCategory" :placeholder="$t('modules.workout.typingCategoryName')">
        </div>
      </div>
      <div class="col-xs-4">
        <button class="btn btn-block btn-primary btn-lg" @click.prevent="addCategory">{{ $t('actions.create') }}</button>
      </div>
      <div class="col-xs-12">
        <span class="help">
          {{ $t('general.example') }}: <code>{{ $t('modules.workout.trainingA') }}</code>, <code>{{ $t('modules.workout.triceps') }}</code>, <code>{{ $t('modules.workout.legs') }}</code>
        </span>
      </div>
    </div>
    <div class="make-with-model-box">
      <p>{{ $t('modules.workout.trainingExampleText') }}</p>
      <button class="btn btn-sm btn-info" @click.prevent="makeWithModel">{{ $t('actions.useModel') }}</button>
    </div>
    <hr>
    <ul class="training-list-edit">
      <li v-for="(item, index) in categories">
        <a href="#" class="btn btn-danger btn-sm" @click.prevent="removeCategory(index)">
          {{ $t('actions.removeCategory')}}
        </a>
        <edit-inline class="edit-inline-category" :value="item.name" :data="[index]" v-on:onSubmit="changeCategory">
          <h2>{{ item.name }}</h2>
        </edit-inline>
        <ul>
          <li v-for="(training, tindex) in item.trainings">
            <div class="row row-8-padding">
              <div class="col-xs-3 center">
                <span class="btn-up" @click.prevent="moveTraining('up', index, tindex)">
                  <icon name="up-arrow" />
                </span>
                <span class="btn-down" @click.prevent="moveTraining('down', index, tindex)">
                  <icon name="down-arrow" />
                </span>
              </div>
              <div class="col-xs-7">
                <edit-inline :value="training.name" :data="[index, tindex]" v-on:onSubmit="changeTraining">
                  {{ training.name }}
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
            <input type="text" class="form-control" ref="training" :data-index="index" @keyup.enter="addTraining(index)" :placeholder="$t('modules.workout.typingTrainingName')">
          </div>
          <div class="col-xs-4">
            <button @click.prevent="addTraining(index)" class="btn btn-primary btn-lg btn-block">
              {{ $t('actions.create') }}
            </button>
          </div>
        </div>
      </li>
    </ul>
    <button @click.prevent="onSubmit" class="btn btn-success btn-lg btn-block" :disabled="!hasCategories">{{ $t('actions.saveSettings') }}</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EditInline, Icon } from '../pieces'
export default {
  name: 'training-list',
  components: { EditInline, Icon },
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
          item.trainings.push({
            current_name: training.name,
            name: training.name
          })
        } else {
          item = {
            current_name: training.category,
            name: training.category,
            trainings: [{
              current_name: training.name,
              name: training.name
            }]
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
        this.categories = this.categories.reverse()
        this.categories.push({
          name: this.$refs.category.value,
          trainings: []
        })
        this.categories = this.categories.reverse()
        this.$refs.category.value = null
      }
      this.$refs.category.focus()
    },
    addTraining (index) {
      if (this.$refs.training[index].value) {
        this.categories = this.categories.map((item, _index) => {
          if (_index === index) {
            item.trainings.push({
              name: this.$refs.training[index].value
            })
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
              training.name = newName
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
          name: this.$t('modules.workout.examples.triceps'),
          trainings: [
            { name: this.$t('modules.workout.examples.benchPress') },
            { name: this.$t('modules.workout.examples.benchPress45') },
            { name: this.$t('modules.workout.examples.inclineBench') }
          ]
        },
        {
          name: this.$t('modules.workout.examples.biceps'),
          trainings: [
            { name: this.$t('modules.workout.examples.barbell') },
            { name: this.$t('modules.workout.examples.alternatingBarbell') },
            { name: this.$t('modules.workout.examples.fixedBar') }
          ]
        },
        {
          name: this.$t('modules.workout.examples.legsAndShoulders'),
          trainings: [
            { name: this.$t('modules.workout.examples.squat') },
            { name: this.$t('modules.workout.examples.lateralLift') }
          ]
        }
      ]
    },
    onSubmit () {
      this.$store.dispatch('saveTrainings', this.categories).then(() => {
        this.$router.push({ name: 'dashboard' })
      })
    },
    moveTraining (direction, index, tindex) {
      let category = this.categories[index]
      if (direction === 'up') {
        if (category.trainings[tindex - 1]) {
          let trainingOne = category.trainings[tindex]
          let trainingTwo = category.trainings[tindex - 1]
          category.trainings[tindex - 1] = trainingOne
          category.trainings[tindex] = trainingTwo
        }
      } else {
        if (category.trainings[tindex + 1]) {
          let trainingOne = category.trainings[tindex]
          let trainingTwo = category.trainings[tindex + 1]
          category.trainings[tindex + 1] = trainingOne
          category.trainings[tindex] = trainingTwo
        }
      }
      this.categories[index] = category
      this.$forceUpdate()
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
