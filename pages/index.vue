<template>
  <div class="container">
    <div>
      <PatternInput :points="points" @update="updatePoints" />
      <br />
      <input type="range" min="3" max="30" v-model="corners">
      <br />
      <Shape :points="points" :corners="parseInt(corners)" />
      <h1 class="title">
        symmetry
      </h1>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      // points: [[0,0], [15,8], [25,8], [50,-10], [70,40], [150,0]],
      points: [[0,0], [30,0], [60,0], [90,0], [120,0], [150,0]],
      corners: '10' as String,
    }
  },
  methods: {
    updatePoints(points: Array<Array<number>>) {
      this.points = points
    },
  },
})
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #edf2f7;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
