<template>
  <div class="board">
    <v-stage
      :config="{
        width: boardConfig.width,
        height: boardConfig.height,
      }"
      @mousemove="handleMousemove"
    >
      <!-- Grid Layer -->
      <v-layer>
        <v-group
          :config="{
            x: 0,
            y: index * boardConfig.cellWidth,
            id: `vertical-${index}`,
          }"
          v-for="(_, index) in new Array(boardConfig.gridSize)"
          :key="'vertical-line-' + index"
        >
          <v-group
            :config="{
              x: j * boardConfig.cellHeight,
              y: 0,
              id: `horizontal-${j}`,
            }"
            v-for="(_, j) in new Array(boardConfig.gridSize)"
            :key="'vertical-line-' + j"
          >
            <v-image
              :config="{
                x: 0,
                y: 0,
                image: backImg,
                width: boardConfig.cellWidth,
                height: boardConfig.cellHeight,
              }"
              v-if="!!backImg"
            />
          </v-group>
        </v-group>
        <!-- <v-line
          :config="{
            points: [
              0,
              (index + 1) * boardConfig.cellWidth,
              boardConfig.width,
              (index + 1) * boardConfig.cellWidth,
            ],
            stroke: boardConfig.gridLineColor,
            strokeWidth: 1,
            lineCap: 'round',
            lineJoin: 'round',
          }"
          v-for="(_, index) in new Array(boardConfig.gridSize - 1)"
          :key="'vertical-line-' + index"
        />
        <v-line
          :config="{
            points: [
              (index + 1) * boardConfig.cellHeight,
              0,
              (index + 1) * boardConfig.cellHeight,
              boardConfig.height,
            ],
            stroke: boardConfig.gridLineColor,
            strokeWidth: 1,
            lineCap: 'round',
            lineJoin: 'round',
          }"
          v-for="(_, index) in new Array(boardConfig.gridSize - 1)"
          :key="'horizontal-line-' + index"
        /> -->
        <v-rect
          :config="{
            x: 0,
            y: boardConfig.cellHeight * 2,
            width: 5,
            height: boardConfig.cellHeight,
            ...getPositionOfDoor(),
            fill: '#f93c3c',
            shadowBlur: 10,
          }"
        />
      </v-layer>
      <!-- Board Layer -->
      <v-layer>
        <v-group
          :config="{
            x: getPositionOfCar(car).x,
            y: getPositionOfCar(car).y,
            id: `car-${index}`,
            draggable: gameScore.success || gameScore.replaying ? false : true,
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
          :draggable="true"
          v-on:dragend="(e) => handleDragEndCar(e, index)"
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
      <v-layer>
        <v-text
          :config="{
            x: 0,
            y: boardConfig.height / 2,
            width: boardConfig.width,
            fill: '#FFCAA1',
            stroke: 'red',
            strokeWidth: 2,
            align: 'center',
            text: 'Success! Great!',
            fontSize: 48,
            lineHeight: 1,
            fontWeight: 'bolder',
          }"
          v-if="!!gameScore.success"
        />
        <!-- Mouse Pointer -->
        <v-image
          :config="{
            x: mousePosition.x,
            y: mousePosition.y,
            image: pointerImg,
            width: 24,
            height: 28,
          }"
          v-if="
            !!mousePosition &&
            mousePosition.x &&
            mousePosition.y &&
            gameScore.replaying
          "
        />
      </v-layer>
    </v-stage>
  </div>
</template>

<script lang="ts">
/* eslint-disable  @typescript-eslint/no-explicit-any */
import Vue from "vue";

function genCharArray(charA: string, charZ: string): Array<string> {
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
  computed: {
    boardConfig() {
      const data = this.$store.getters.boardConfig;
      const width = Math.min(data.width, window.innerWidth - 50);
      return {
        ...data,
        width,
        height: width,
        cellWidth: width / data.gridSize,
        cellHeight: width / data.gridSize,
      };
    },
    boardData() {
      return this.$store.getters.boardData;
    },
    gameScore() {
      return this.$store.getters.gameScore;
    },
    mousePosition() {
      return this.$store.getters.mousePosition;
    },
  },
  data() {
    return {
      letters: genCharArray("a", "f"),
      assets: {
        greencarEW: null, // green
        orangecarEW: null, // orange
        bluecarEW: null, // light blue
        pinkcarEW: null, // pink
        purplecarEW: null, // purple
        lgreencarEW: null, // light green
        blackcarEW: null, // black
        yellowcarEW: null, // yellow
        graycarEW: null, // gray

        greencarNS: null,
        orangecarNS: null,
        bluecarNS: null,
        pinkcarNS: null,
        purplecarNS: null,
        lgreencarNS: null,
        blackcarNS: null,
        yellowcarNS: null, // yellow
        graycarNS: null, // gray

        yellowlorryEW: null, // yellow
        purplelorryEW: null, // purple
        bluelorryEW: null, // blue
        greenlorryEW: null, // green

        yellowlorryNS: null,
        purplelorryNS: null,
        bluelorryNS: null,
        greenlorryNS: null,

        redcarEW: null, // red
      },
      backImg: null as any,
      pointerImg: null as any,
      dragging: false,
    };
  },
  mounted() {
    Object.keys(this.assets).forEach((key) => {
      const image = new window.Image();
      image.src = `./${key}.gif`;
      image.onload = () => {
        this.assets = { ...this.assets, [key]: image };
      };
      image.onerror = () => {
        console.log(image.src);
      };
    });
    const image = new window.Image();
    image.src = `./TrafficJam.png`;
    image.onload = () => {
      this.backImg = image;
    };
    const pointer = new window.Image();
    pointer.src = `./pointer.png`;
    pointer.onload = () => {
      this.pointerImg = pointer;
    };
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
    getPositionOfDoor() {
      var exitPosIndices = this.getRowColIndices(this.boardConfig.exitDoor);

      const rowIndex = exitPosIndices.row;
      const colIndex = exitPosIndices.col;

      if (colIndex === 0) {
        return {
          x: 0,
          y: rowIndex * this.boardConfig.cellHeight,
          isVertical: false,
        };
      }
      if (colIndex === this.boardConfig.gridSize - 1) {
        return {
          x: this.boardConfig.width,
          y: rowIndex * this.boardConfig.cellHeight,
          width: -5,
          isVertical: false,
          oppr: true,
        };
      } else {
        if (rowIndex === 0) {
          return {
            x: colIndex * this.boardConfig.cellWidth,
            y: 0,
            width: this.boardConfig.cellWidth,
            height: 5,
            isVertical: true,
          };
        } else if (rowIndex === this.boardConfig.gridSize - 1) {
          return {
            x: colIndex * this.boardConfig.cellWidth,
            y: this.boardConfig.height,
            width: this.boardConfig.cellWidth,
            height: -5,
            isVertical: true,
            oppr: true,
          };
        } else {
          return {
            x: colIndex * this.boardConfig.cellWidth,
            y: rowIndex * this.boardConfig.cellHeight,
            isVertical: false,
          };
        }
      }
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
    getRowColIndices(positionString: string): any {
      const rowIndex = this.letters.indexOf(positionString.charAt(0));
      const colIndex = parseInt(positionString.substring(1)) - 1;
      return {
        row: rowIndex,
        col: colIndex,
      };
    },
    // Drag event
    handleDragEndCar(e: any, index: number) {
      this.dragging = false;
      const newPos = this.getStartAtFromPosition({
        x: e.target.x(),
        y: e.target.y(),
      });
      // Todo: change const store value?
      localStorage.setItem("activeBoard", JSON.stringify(this.boardData));
      const boardData = JSON.parse(localStorage.getItem("activeBoard") || "[]");
      localStorage.removeItem("activeBoard");

      if (boardData[index].startAt === newPos.startAt) {
        e.target.x(newPos.x);
        e.target.y(newPos.y);
      } else {
        boardData[index].startAt = newPos.startAt;
        this.$store.commit("updateBoardData", boardData);
        this.$store.commit("pushHistory", {
          type: "piecemove",
          index,
          startAt: newPos.startAt,
          boardData,
          timestamp: new Date().getTime(),
        });
      }
      // Success Game
      var exitPosIndices = this.getRowColIndices(this.boardConfig.exitDoor);
      var newPosIndices = this.getRowColIndices(newPos.startAt);

      // display bug on exit door... so red car width=1
      const redCarWidth = 1;

      if (
        !!this.getPositionOfDoor().isVertical ===
          !!boardData[index].isVertical &&
        exitPosIndices.row === newPosIndices.row &&
        exitPosIndices.col - redCarWidth === newPosIndices.col
      ) {
        this.$store.commit("endGame");
      }
    },

    // Get Car Image
    getCarImage(car: any): any {
      const keys = Object.keys(this.assets);
      const images = Object.values(this.assets);

      var orientation = car.isVertical ? "NS" : "EW";
      var vehicleType = car.cellCount == 2 ? "car" : "lorry";
      var assetName = car.color + vehicleType + orientation;
      var index = keys.indexOf(assetName);
      return images[index];
    },
    handleMousemove(e: any) {
      if (this.gameScore.success || this.gameScore.replaying) return;
      this.$store.commit("pushHistory", {
        type: "mousemove",
        x: e.evt.layerX,
        y: e.evt.layerY,
        timestamp: new Date().getTime(),
      });
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.board {
  width: 100%;
  max-width: 100%;
  height: 543px;
  margin: 8.5px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #cccccc;
  border-radius: 6px;
  cursor: pointer;
}
@media only screen and (max-width: 543px) {
  .board {
    height: calc(100vw - 50px);
  }
}
</style>
