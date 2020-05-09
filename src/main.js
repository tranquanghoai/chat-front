// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import App from './App'
import router from './router'
import io from 'socket.io-client'

let baseUrl
if (process.env.NODE_ENV === 'production') {
  baseUrl = 'http://localhost:5000'
} else {
  baseUrl = 'http://localhost:5000'
}

window.io = io
window.baseUrl = baseUrl

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  vuetify
})
