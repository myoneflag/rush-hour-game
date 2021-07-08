<template>
  <div class="board">
    <v-stage
      :config="{
        width: boardConfig.width,
        height: boardConfig.height,
      }"
    >
      <GridLayer />
      <v-layer>
        <v-group
          :config="{
            x: getPositionOfCar(car).x,
            y: getPositionOfCar(car).y,
            id: `car-${index}`,
            draggable: true,
            dragBoundFunc: function (pos) {
              return car.isVertical
                ? {
                    x: this.absolutePosition().x,
                    y: getBound(pos, car, index),
                  }
                : {
                    x: getBound(pos, car, index),
                    y: this.absolutePosition().y,
                  };
            },
          }"
          v-for="(car, index) in boardData"
          :key="index"
          @dragstart="(e) => handleDraggingCar(e, index)"
          @dragend="(e) => handleDragEndCar(e, index)"
        >
          <v-image
            :config="{
              x: 0,
              y: 0,
              image: getCarImage(car),
              width: car.isVertical
                ? boardConfig.cellWidth
                : car.cellCount * boardConfig.cellWidth,
              height: car.isVertical
                ? car.cellCount * boardConfig.cellHeight
                : boardConfig.cellHeight,
            }"
            v-if="!!getCarImage(car)"
          />
        </v-group>
      </v-layer>
    </v-stage>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import GridLayer from "@/components/GridLayer.vue";

function genCharArray(charA: string, charZ: string) {
  var arr = [],
    i = charA.charCodeAt(0),
    j = charZ.charCodeAt(0);
  for (; i <= j; ++i) {
    arr.push(String.fromCharCode(i).toUpperCase());
  }
  return arr;
}

declare interface Position {
  x: number;
  y: number;
}

export default Vue.extend({
  name: "Board",
  components: {
    GridLayer,
  },
  props: {
    msg: String,
  },
  computed: {
    boardConfig() {
      const data = this.$store.getters.boardConfig;
      return {
        ...data,
        cellWidth: data.width / data.gridSize,
        cellHeight: data.height / data.gridSize,
      };
    },
    boardData() {
      return this.$store.getters.boardData;
    },
  },
  data() {
    return {
      letters: genCharArray("a", "f"),
      assets: {
        blueVerticalCar: null,
        redCar: null,
        orangeCar: null,
        greenCar: null,
      },
      dragging: false,
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
    getStartAtFromPosition(position: Position) {
      const remainX = position.x % this.boardConfig.cellWidth;
      const remainY = position.y % this.boardConfig.cellHeight;
      const colIndex =
        remainX > this.boardConfig.cellWidth / 2
          ? Math.ceil(position.x / this.boardConfig.cellWidth)
          : Math.floor(position.x / this.boardConfig.cellWidth);
      const rowIndex =
        remainY > this.boardConfig.cellHeight / 2
          ? Math.ceil(position.y / this.boardConfig.cellHeight)
          : Math.floor(position.y / this.boardConfig.cellHeight);
      return {
        x: colIndex * this.boardConfig.cellWidth,
        y: rowIndex * this.boardConfig.cellHeight,
        startAt: this.letters[rowIndex] + (colIndex + 1),
      };
    },
    getPositionOfCar(car: any) {
      const rowIndex = this.letters.indexOf(car.startAt.charAt(0));
      const colIndex = parseInt(car.startAt.substring(1)) - 1;
      return {
        x: colIndex * this.boardConfig.cellWidth,
        y: rowIndex * this.boardConfig.cellHeight,
        _x: car.isVertical
          ? (colIndex + 1) * this.boardConfig.cellWidth
          : (colIndex + car.cellCount) * this.boardConfig.cellWidth,
        _y: car.isVertical
          ? (rowIndex + car.cellCount) * this.boardConfig.cellHeight
          : (rowIndex + 1) * this.boardConfig.cellHeight,
      };
    },
    // Get max and min of X
    getRangeX(i: number) {
      const car = this.boardData[i];
      const maxX = [
          this.boardConfig.width - car.cellCount * this.boardConfig.cellWidth,
        ] as number[],
        minX = [0] as number[];
      const pos = this.getPositionOfCar(car);
      this.boardData.forEach((el: any, index: number) => {
        if (i !== index) {
          const { x, y, _x, _y } = this.getPositionOfCar(el);
          if (y <= pos.y && _y > pos.y) {
            if (x <= pos.x) {
              minX.push(_x);
            } else {
              maxX.push(x + pos.x - pos._x);
            }
          }
        }
      });
      return {
        max: Math.min(...maxX),
        min: Math.max(...minX),
      };
    },
    // Get max and min of Y
    getRangeY(i: number) {
      const car = this.boardData[i];
      const maxY = [
          this.boardConfig.height - car.cellCount * this.boardConfig.cellHeight,
        ] as number[],
        minY = [0] as number[];
      const pos = this.getPositionOfCar(car);
      this.boardData.forEach((el: any, index: number) => {
        if (i !== index) {
          const { x, y, _x, _y } = this.getPositionOfCar(el);
          if (x <= pos.x && _x > pos.x) {
            if (y <= pos.y) {
              minY.push(_y);
            } else {
              maxY.push(y + pos.y - pos._y);
            }
          }
        }
      });
      return {
        max: Math.min(...maxY),
        min: Math.max(...minY),
      };
    },
    // Get Bound
    getBound(pos: Position, car: any, index: number) {
      if (car.isVertical) {
        const { max, min } = this.getRangeY(index);
        return pos.y > max ? max : pos.y < min ? min : pos.y;
      } else {
        const { max, min } = this.getRangeX(index);
        return pos.x > max ? max : pos.x < min ? min : pos.x;
      }
    },
    // Drag event
    handleDraggingCar(e: any, index: number) {
      this.dragging = true;
      const newPos = this.getStartAtFromPosition({
        x: e.target.x(),
        y: e.target.y(),
      });
      console.log(newPos);
    },
    handleDragEndCar(e: any, index: number) {
      this.dragging = false;
      const newPos = this.getStartAtFromPosition({
        x: e.target.x(),
        y: e.target.y(),
      });
      this.boardData[index].startAt = newPos.startAt;
      e.target.x(newPos.x);
      e.target.y(newPos.y);
      this.$store.commit("updateBoardData", this.boardData);
    },
    // Get Car Image
    getCarImage(car: any) {
      return car.isVertical
        ? this.assets[`blueVerticalCar`]
        : car.color === "red"
        ? this.assets[`redCar`]
        : this.assets[`greenCar`];
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
  cursor: pointer;
}
</style>
