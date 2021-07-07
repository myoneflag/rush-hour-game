<template>
  <v-layer>
    <v-line
      :config="{
        points: [0, (index + 1) * gap, 540, (index + 1) * gap],
        stroke: lineColor,
        strokeWidth: 1,
        lineCap: 'round',
        lineJoin: 'round',
      }"
      v-for="(_, index) in gridData"
      :key="'vertical-line-' + index"
    />
    <v-line
      :config="{
        points: [(index + 1) * gap, 0, (index + 1) * gap, 540],
        stroke: lineColor,
        strokeWidth: 1,
        lineCap: 'round',
        lineJoin: 'round',
      }"
      v-for="(_, index) in gridData"
      :key="'horizontal-line-' + index"
    />
    <v-rect
      :config="{
        x: 0,
        y: gap * 2,
        width: 5,
        height: gap,
        fill: 'red',
        shadowBlur: 10,
      }"
    />
  </v-layer>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "GridLayer",
  props: {
    msg: String,
  },
  data() {
    return {
      gridData: [0, 1, 2, 3, 4],
      gap: 90,
      lineColor: "#ddd",
    };
  },
});
</script>
