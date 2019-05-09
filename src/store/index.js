import Vue from 'vue'
import Vuex from 'vuex'
import repeater from './repeater'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {repeater},
});

export default store
