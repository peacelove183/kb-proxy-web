import Vue from 'vue'
import Vuex from 'vuex'
import repeater from './repeater'
import mock from './mock'
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {repeater,mock},
});

export default store
