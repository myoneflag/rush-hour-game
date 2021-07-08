import Vue from "vue";
import Vuex from "vuex";
import { boardList } from "@/constant";

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
      gridLineColor: "#ddd",
    },
    activeBoard: {
      id: null as null | number,
      gridSize: 1,
      data: [] as any[],
    },
    boardHistory: [] as any[],
  },
  getters: {
    userInfo: (state) => {
      return state.user;
    },
    // boardList: () => {
    //   return [...boardList];
    // },
    boardConfig: (state) => {
      return {
        ...state.boardConfig,
        id: state.activeBoard.id,
        gridSize: state.activeBoard.gridSize,
      };
    },
    boardData: (state) => {
      return [...state.activeBoard.data];
    },
    boardHistory: (state) => {
      return state.boardHistory;
    },
  },
  mutations: {
    selectActiveBoard(state, activeBoard) {
      state.activeBoard = { ...activeBoard };
    },
    updateBoardData(state, data) {
      console.log([...boardList][1].data[0].startAt);
      state.activeBoard = {
        ...state.activeBoard,
        data: [...data],
      };
      console.log([...boardList][1].data[0].startAt);
    },
    pushHistory(state, data) {
      state.boardHistory.push(data);
    },
    resetBoard(state) {
      const board = boardList.find(
        (board) => board.id === state.activeBoard.id
      );
      if (board) {
        console.log(board.data[0].startAt, state.activeBoard.data[0].startAt);
        // state.activeBoard.data = [...board.data];
      }
    },
    // backBoard(state) {},
    updateBoardConfig(state, boardConfig) {
      state.boardConfig = boardConfig;
    },
  },
  actions: {},
  modules: {},
});
