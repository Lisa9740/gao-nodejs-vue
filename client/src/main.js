import Vue from 'vue'
import Home from './home.vue'
import Vuetify from "vuetify"

Vue.config.productionTip = false
Vue.use(Vuetify);

new Vue({
  vuetify: new Vuetify(),
  render: h => h(Home),
}).$mount('#app')