import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

/* 
  ____ ____ ____ ____ ____ ____
 | A1 | A2 | A3 | A4 | A5 | A6 |
 |____ ____ ____ ____ ____ ____|
 | B1 | B2 | B3 | B4 | B5 | B6 |
 |____ ____ ____ ____ ____ ____|
<  C1 | C2 | C3 | C4 | C5 | C6 |
< ____ ____ ____ ____ ____ ____|
 | D1 | D2 | D3 | D4 | D5 | D6 |
 |____ ____ ____ ____ ____ ____|
 | E1 | E2 | E3 | E4 | E5 | E6 |
 |____ ____ ____ ____ ____ ____|
 | F1 | F2 | F3 | F4 | F5 | F6 |
 |____ ____ ____ ____ ____ ____|
*/

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
      exitDoor: "C1",
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
        exitDoor: state.activeBoard.exitDoor,
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
