<template>
  <div>
    <select>
      <option
        v-for="board in boards"
        :key="board.id"
        :value="board.id"
      >
        {{ board.name }}
      </option>
    </select>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      boards: [
        {
          id: '001',
          name: 'Board 1',
          dimensions: 6,
        }
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
