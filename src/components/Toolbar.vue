<template>
  <div class="toolbar">
    <div class="content">
      <button
        class="btn btn-reset"
        @click="handleResetBoard"
        :disabled="!boardData.length"
      >
        Reset
      </button>
      <button
        class="btn btn-back"
        @click="handleBackBoard"
        :disabled="!boardHistory.length"
      >
        Back
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { boardList } from "@/constant";

export default Vue.extend({
  name: "Toolbar",
  computed: {
    boardData() {
      return this.$store.getters.boardData;
    },
    boardHistory() {
      return this.$store.getters.boardHistory;
    },
    boardConfig() {
      return this.$store.getters.boardConfig;
    },
  },
  created() {
    this.boards = boardList;
  },
  data() {
    return {
      boards: [] as any[],
    };
  },
  methods: {
    handleResetBoard() {
      const activeBoard = this.boards.find(
        (board) => board.id === this.boardConfig.id
      );
      this.$store.commit("updateBoardData", activeBoard.data);
    },
    handleBackBoard() {
      this.$store.commit("backBoard");
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.toolbar {
  width: 100%;
  height: 100px;
  background-color: #989898;
  border-radius: 6px;
  /* box-shadow: inset 0px 0px 20px 2px #2f2f2f; */
}
.content {
  padding: 10px;
}
.btn {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: none;
  outline: none;
  cursor: pointer;
  box-shadow: inset 0px 0px 10px 2px #000000;
  margin: 0 20px;
}
.btn:not(:disabled):hover {
  box-shadow: inset 0px 0px 20px 5px #000000;
}
</style>
