import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

require ('@mdi/font/css/materialdesignicons.min.css')
require ('flag-icon-css/css/flag-icon.min.css')

import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

Vue.use(Buefy)
Vue.use(require('vue-moment'));

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
