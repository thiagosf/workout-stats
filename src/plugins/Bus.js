const Bus = {
  version: '1.0.0',
  install: function (Vue, options) {
    Vue.prototype.$bus = new Vue({})
  }
}

export default Bus
