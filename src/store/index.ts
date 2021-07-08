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
    boardConfig: {
      width: 540,
      height: 540,
      gridSize: 6,
      gridLineColor: "#ddd",
    },
    boardData: [
      {
        startAt: "A1",
        cellCount: 3,
        color: "blue",
        isVertical: false,
      },
      {
        startAt: "B1",
        cellCount: 2,
        color: "purple",
        isVertical: true,
      },
      {
        startAt: "A4",
        cellCount: 3,
        color: "gray",
        isVertical: true,
      },
      {
        startAt: "A5",
        cellCount: 2,
        color: "yellow",
        isVertical: true,
      },
      {
        startAt: "A6",
        cellCount: 2,
        color: "green",
        isVertical: true,
      },
      {
        startAt: "C5",
        cellCount: 2,
        color: "red",
        isVertical: false,
      },
      {
        startAt: "D1",
        cellCount: 2,
        color: "forestgreen",
        isVertical: false,
      },
      {
        startAt: "E2",
        cellCount: 2,
        color: "blue",
        isVertical: true,
      },
      {
        startAt: "D3",
        cellCount: 2,
        color: "orange",
        isVertical: true,
      },
      {
        startAt: "F3",
        cellCount: 2,
        color: "yellow",
        isVertical: false,
      },
      {
        startAt: "F5",
        cellCount: 2,
        color: "black",
        isVertical: false,
      },
      {
        startAt: "E5",
        cellCount: 2,
        color: "slategray",
        isVertical: false,
      },
    ],
  },
  getters: {
    boardConfig: (state) => {
      return state.boardConfig;
    },
    boardData: (state) => {
      return state.boardData;
    },
  },
  mutations: {
    updateBoardData(state, boardData) {
      state.boardData = boardData;
    },
    updateBoardConfig(state, boardConfig) {
      state.boardConfig = boardConfig;
    },
  },
  actions: {},
  modules: {},
});
