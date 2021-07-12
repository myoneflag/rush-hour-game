<template>
  <div class="toolbar">
    <div class="content">
      <button
        class="btn btn-reset"
        @click="handleResetBoard"
        :disabled="
          !boardData.length ||
          !gameScore.moving ||
          !boardHistory.length ||
          gameScore.replaying
        "
      >
        Reset
      </button>
      <button
        class="btn btn-back"
        @click="handleBackBoard"
        :disabled="
          !gameScore.moving || gameScore.success || gameScore.replaying
        "
      >
        Back
      </button>
      <button
        class="btn btn-replay"
        @click="handleReplay"
        :disabled="!gameScore.success || gameScore.replaying"
      >
        Replay
      </button>
      <div class="replay-silder">
        <vue-slider
          v-model="value"
          :data="replayData"
          :data-value="'time'"
          :tooltip="'none'"
          :clickable="false"
          :dragOnClick="false"
          :disabled="!gameScore.success && !gameScore.replaying"
          v-if="replayData.length && boardHistory.length > 1"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { boardList } from "@/constant";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";

export default Vue.extend({
  name: "Toolbar",
  components: {
    VueSlider,
  },
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
    gameScore() {
      return this.$store.getters.gameScore;
    },
  },
  data() {
    return {
      value: 0,
      backAction: false,
      replayData: [],
    };
  },
  methods: {
    handleResetBoard() {
      const activeBoard = boardList.find(
        (board) => board.id === (this as any).boardConfig.id
      );
      if (activeBoard) {
        this.$store.commit("updateBoardData", activeBoard.data);
        if ((this as any).gameScore.success) {
          this.$store.commit("clearHistory");
          this.$store.commit("pushHistory", {
            type: "start",
            id: activeBoard.id,
            timestamp: new Date().getTime(),
          });
        } else {
          this.$store.commit("pushHistory", {
            type: "reset",
            boardData: activeBoard.data,
            timestamp: new Date().getTime(),
          });
        }
      }
    },
    handleBackBoard() {
      const moveHistory = (this as any).boardHistory.filter((e: any) =>
        ["piecemove", "reset", "back"].includes(e.type)
      );
      if (moveHistory.length < 2 + (this as any).gameScore.backLength * 2) {
        const activeBoard = boardList.find(
          (board) => board.id === (this as any).boardConfig.id
        );
        if (activeBoard) {
          this.$store.commit("updateBoardData", activeBoard.data);
          this.$store.commit("pushHistory", {
            type: "back",
            boardData: activeBoard.data,
            timestamp: new Date().getTime(),
          });
        }
      } else {
        const boardData =
          moveHistory[
            moveHistory.length - 2 - (this as any).gameScore.backLength * 2
          ].boardData;
        this.$store.commit("updateBoardData", boardData);
        this.$store.commit("pushHistory", {
          type: "back",
          boardData,
          timestamp: new Date().getTime(),
        });
      }
    },
    handleReplay() {
      const startTime = (this as any).boardHistory[0].timestamp;
      const endTime = (this as any).boardHistory[
        (this as any).boardHistory.length - 1
      ].timestamp;
      const timeHistory = (this as any).boardHistory.map((a: any) => ({
        ...a,
        time: Math.floor((a.timestamp - startTime) / 100) * 100,
      }));
      (this as any).replayData = [];
      this.$nextTick();
      (this as any).replayData = [
        ...new Array(Math.ceil((endTime - startTime) / 100) + 1),
      ]
        .map((_, index) => index * 100)
        .map((time) => {
          return timeHistory.find((e: any) => e.time === time) || { time };
        });
      (this as any).gameScore.success = false;
      (this as any).gameScore.replaying = true;
      const activeBoard = boardList.find(
        (board) => board.id === (this as any).boardConfig.id
      );
      if (activeBoard) {
        this.$store.commit("updateBoardData", activeBoard.data);
      }
      let t = 0;
      let reply = setInterval(() => {
        t += 100;
        const currentItem = (this as any).replayData.find(
          (e: any) => e.time === t
        );
        if (currentItem) {
          (this as any).value = currentItem.time;
          if (currentItem.boardData) {
            this.$store.commit("updateBoardData", currentItem.boardData);
          } else {
            this.$store.commit("updateMousePosition", {
              x: currentItem.x,
              y: currentItem.y,
            });
          }
        }
        if (t > endTime - startTime) {
          clearInterval(reply);
          (this as any).gameScore.success = true;
          (this as any).gameScore.replaying = false;
          (this as any).replayData = [];
        }
      }, 100);
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
.replay-silder {
  margin-bottom: 5px;
}
.btn {
  width: 60px;
  height: 60px;
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
.btn:not(:disabled):active {
  box-shadow: inset 0px 0px 10px 5px #000000;
}
</style>
