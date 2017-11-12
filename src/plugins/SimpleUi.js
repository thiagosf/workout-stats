const SimpleUi = {
  version: '1.0.0',
  install: function (Vue, options) {
    Vue.prototype.$defaultEnterTransition = function () {
      document.querySelector('body').scrollTop = 0
    }
    Vue.mixin({
      methods: {
        addBodyClass (className) {
          let body = document.querySelector('body')
          body.classList.add(className)
        },
        removeBodyClass (className) {
          let body = document.querySelector('body')
          body.classList.remove(className)
        },
        setTheme (theme) {
          this.setBackgroundColorTheme(theme)
        },
        setBackgroundColorTheme (color) {
          this.removeTheme()
          let prefix = 'theme-'
          this.addBodyClass(`${prefix}${color}`)
        },
        removeTheme () {
          let prefix = 'theme-'
          let classList = document.querySelector('body').className.split(' ')
          classList.map((name) => {
            if (name.toString().indexOf(prefix) > -1) {
              this.removeBodyClass(name)
            }
          })
        }
      }
    })
  }
}

export default SimpleUi
