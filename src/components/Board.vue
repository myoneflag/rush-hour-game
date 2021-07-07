<template>
  <div class="board">
    <v-stage :config="configKonva">
      <GridLayer />
      <v-layer>
        <v-group
          :config="{
            x: item.x,
            y: item.y,
            id: `${item.type}-car-${index}`,
            draggable: true,
            dragBoundFunc: function (pos) {
              return item.type === 'long' || item.type === 'vertical'
                ? {
                    x: this.absolutePosition().x,
                    y:
                      pos.y > 540 - (item.type === 'long' ? 270 : 180)
                        ? 540 - (item.type === 'long' ? 270 : 180)
                        : pos.y < 0
                        ? 0
                        : pos.y,
                  }
                : {
                    x: pos.x > 540 - 180 ? 540 - 180 : pos.x < 0 ? 0 : pos.x,
                    y: this.absolutePosition().y,
                  };
            },
          }"
          v-for="(item, index) in boardData"
          :key="index"
          @dragend="(e) => handleDragCar(e, index)"
        >
          <v-image
            :config="{
              x: 0,
              y: 0,
              image: assets[`${item.type}Car`],
              width:
                item.type === 'long' || item.type === 'vertical' ? 90 : 180,
              height:
                item.type === 'long'
                  ? 270
                  : item.type === 'vertical'
                  ? 180
                  : 90,
            }"
            v-if="!!assets[`${item.type}Car`]"
          />
        </v-group>
      </v-layer>
    </v-stage>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import GridLayer from "@/components/GridLayer.vue";

declare interface Assets {
  mainCar: any;
  verticalCar: any;
  horizontalCar: any;
  longCar: any;
}

export default Vue.extend({
  name: "Board",
  components: {
    GridLayer,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      configKonva: {
        width: 540,
        height: 540,
        fill: "white",
      },
      configCircle: {
        x: 100,
        y: 100,
        radius: 70,
        fill: "red",
        stroke: "black",
        strokeWidth: 4,
      },
      assets: {
        mainCar: null,
        verticalCar: null,
        horizontalCar: null,
        longCar: null,
      } as Assets,
      boardData: [
        {
          x: 0,
          y: 0,
          type: "vertical",
        },
        {
          x: 180,
          y: 360,
          type: "horizontal",
        },
        {
          x: 360,
          y: 270,
          type: "long",
        },
        {
          x: 360,
          y: 180,
          type: "main",
        },
      ],
    };
  },
  mounted() {
    Object.keys(this.assets).forEach((key) => {
      const image = new window.Image();
      image.src = `./${key}.png`;
      image.onload = () => {
        this.assets = { ...this.assets, [key]: image };
      };
      image.onerror = (err) => {
        console.log(err);
      };
    });
  },
  methods: {
    handleDragCar(e: any, index: number) {
      console.log(e, index);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.board {
  width: 100%;
  height: 543px;
  margin: 8.5px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 6px;
}
</style>
