const SimpleUi = {
  version: '1.0.0',
  install: function (Vue, options) {
    Vue.prototype.$defaultEnterTransition = function () {
      document.querySelector('body').scrollTop = 0
    }
  }
}

export default SimpleUi
