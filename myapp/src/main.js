import Vue from 'vue'
import App from './App.vue'
import 'mylib'
// import 'mytslib'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
