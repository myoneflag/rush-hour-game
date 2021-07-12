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
      gridSize: 6,
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      data: [] as any[],
    },
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    boardHistory: [] as any[],
    score: {
      success: false,
      time: 0,
      moving: 0,
      backLength: 0,
      replaying: false,
    },
    mousePosition: null,
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
    mousePosition: (state) => {
      return state.mousePosition;
    },
  },
  mutations: {
    selectActiveBoard(state, activeBoard) {
      state.activeBoard = { ...activeBoard };
    },
    updateBoardData(state, data) {
      state.activeBoard = {
        ...state.activeBoard,
        data: [...data],
      };
    },
    updateMousePosition(state, data) {
      state.mousePosition = data;
    },
    pushHistory(state, data) {
      switch (data.type) {
        case "piecemove":
          state.score.moving += 1;
          state.score.backLength = 0;
          break;
        case "reset":
          state.score.backLength = 0;
          break;
        case "back":
          state.score.backLength += 1;
          break;
        default:
          break;
      }
      state.boardHistory.push(data);
    },
    clearHistory(state) {
      state.boardHistory = [];
      state.score.success = false;
      state.score.time = 0;
      state.score.moving = 0;
      state.score.backLength = 0;
    },
    endGame(state) {
      state.score.success = true;
    },
  },
  actions: {},
  modules: {},
});
