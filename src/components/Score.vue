<template>
  <div class="score">
    <div class="content">
      <div class="user-email">
        <input class="input-email" type="email" :value="user.email" />
      </div>
      <div class="select">
        <label for="standard-select">Stage</label>
        <select class="standard-select" @change="handleChangeBoard">
          <option disabled selected>Select Board</option>
          <option :value="board.id" v-for="board in boards" :key="board.id">
            {{ `Level ${board.id} (${board.gridSize} x ${board.gridSize})` }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable  @typescript-eslint/no-explicit-any */
import Vue from "vue";
import { boardList } from "@/constant";

export default Vue.extend({
  name: "Score",
  computed: {
    user() {
      return this.$store.getters.userInfo;
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
    handleChangeBoard(e: any) {
      const activeBoard = this.boards.find(
        (el: any) => el.id.toString() === e.target.value
      );
      this.$store.commit("selectActiveBoard", { ...activeBoard });
      this.$store.commit("clearHistory");
      this.$store.commit("pushHistory", {
        type: "start",
        id: e.target.value,
        timestamp: new Date().getTime(),
      });
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.score {
  width: 100%;
  height: 150px;
  background-color: #989898;
  border-radius: 6px;
  /* box-shadow: inset 0px 0px 20px 2px #2f2f2f; */
}
.content {
  padding: 10px;
}
.input-email {
  padding: 10px;
  margin: 5px;
  outline: none;
}
.standard-select {
  outline: none;
  padding: 10px;
  margin-left: 10px;
}
</style>
