<template>
  <v-layer>
    <v-circle :config="configCircle"></v-circle>
  </v-layer>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "RushLayer",
  props: {
    msg: String,
  },
  data() {
    return {
      configCircle: {
        x: 100,
        y: 100,
        radius: 70,
        fill: "red",
        stroke: "black",
        strokeWidth: 4,
        draggable: true,
      },
    };
  },
});
</script>
