import Vue from 'vue'
import App from './App.vue'
import VueSeamlessRolling from './lib/index.js'

Vue.config.productionTip = false
Vue.use(VueSeamlessRolling)
new Vue({
  render: h => h(App),
}).$mount('#app')
