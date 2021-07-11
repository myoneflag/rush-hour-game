import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      email: "grisha97924@gmail.com",
      name: "Artem",
    },
    boardConfig: {
      width: 540,
      height: 540,
      gridSize: 6,
      exitDoor: "C1",
      gridLineColor: "#ddd",
    },
    activeBoard: {
      id: null as null | number,
      gridSize: 1,
      data: [] as any[],
    },
    boardHistory: [] as any[],
    score: {
      success: false,
    },
  },
  getters: {
    userInfo: (state) => {
      return state.user;
    },
    boardConfig: (state) => {
      return {
        ...state.boardConfig,
        id: state.activeBoard.id,
        gridSize: state.activeBoard.gridSize,
      };
    },
    boardData: (state) => {
      return state.activeBoard.data;
    },
    boardHistory: (state) => {
      return state.boardHistory;
    },
    gameScore: (state) => {
      return state.score;
    },
  },
  mutations: {
    selectActiveBoard(state, activeBoard) {
      state.activeBoard = { ...activeBoard };
      state.boardHistory = [];
      state.score.success = false;
    },
    updateBoardData(state, data) {
      state.activeBoard = {
        ...state.activeBoard,
        data: [...data],
      };
    },
    pushHistory(state, data) {
      state.boardHistory.push(data);
    },
    popHistory(state) {
      state.boardHistory.pop();
      state.score.success = false;
    },
    clearHistory(state) {
      state.boardHistory = [];
      state.score.success = false;
    },
  },
  actions: {},
  modules: {},
});
