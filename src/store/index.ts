import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    boardConfig: {
      width: 540,
      height: 540,
      gridSize: 6,
    },
  },
  mutations: {},
  actions: {},
  modules: {},
});
