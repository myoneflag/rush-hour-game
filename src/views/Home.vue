<template>
  <div class="home">
    <div class="container">
      <Score />
      <Board msg="Welcome to Your Vue.js + TypeScript App" />
      <Toolbar />
    </div>
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
  </div>
</template>

<script lang="ts">
/* eslint-disable  @typescript-eslint/no-explicit-any */
import Vue from "vue";
import Board from "@/components/Board.vue"; // @ is an alias to /src
import Score from "@/components/Score.vue";
import Toolbar from "@/components/Toolbar.vue";

export default Vue.extend({
  name: "Home",
  components: {
    Board,
    Score,
    Toolbar,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  width: 100%;
  /* min-height: 100vh; */
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
}
.container {
  width: 543px;
  display: flex;
  flex-direction: column;
  background-color: grey;
  border-radius: 20px;
  box-shadow: inset 0px 0px 20px 2px #2f2f2f;
  padding: 20px;
}
@media only screen and (max-width: 543px) {
  .home {
    height: 100vh;
  }
  .container {
    border-radius: 0px;
    height: calc(100% - 40px);
  }
}
</style>
