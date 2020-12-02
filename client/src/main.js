import Vue from 'vue'
import Vuetify from "vuetify"
import Layout from './layouts/Layout.vue'
import Routes from './route'
import FlashMessage from '@smartweb/vue-flash-message'

Vue.config.productionTip = false
Vue.use(Vuetify);
Vue.use(FlashMessage);

new Vue({
  vuetify: new Vuetify({}),
  router: Routes,
  render: h => h(Layout),
}).$mount('#app')