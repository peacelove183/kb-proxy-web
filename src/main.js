// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Quasar from './plugins/quasar'
import store from './store'
import '../static/css/import_css'
import Validate from './plugins/vuelidate'

Vue.config.productionTip = false

/* eslint-disable no-new */
const app = ({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
[Quasar,Validate].forEach(plugin => plugin({
  app,
  router,
  store,
  Vue
}))

export const vm = new Vue(app)
