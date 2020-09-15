<template>
  <svg class="Shape" :width="width" :height="height" :viewBox="`0 0 ${width} ${height}`" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0">
      <polyline
        id="baseline"
        :points="points.map(p => p.join(',')).join(' ')"
        fill="none"
        stroke-linejoin="round"
        stroke-linecap="round"
        shape-rendering="geometricPrecision"
      />
    </g>
    <g
      stroke="#35495e"
      stroke-width="5"
    >
      <use v-for="n in corners" xlink:href="#baseline" :transform="getTransform(n)" />
      <use v-for="n in corners" xlink:href="#baseline" :transform="getTransform(n) + ' scale(1,-1)'" />
    </g>
    <g
      stroke="#00c58e"
      stroke-width="1"
    >
      <use v-for="n in corners" xlink:href="#baseline" :transform="getTransform(n)" />
      <use v-for="n in corners" xlink:href="#baseline" :transform="getTransform(n) + ' scale(1,-1)'" />
    </g>
  </svg>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      baseRotation: 0 as Number
    }
  },
  props: {
    points: {
      type: Array,
      default: () => [],
    },
    corners: {
      type: Number,
      default: 10,
    },
    width: {
      type: Number,
      default: 320,
    },
    height: {
      type: Number,
      default: 320,
    },
  },
  watch: {
    corners() {
      this.baseRotation = Math.random() * 20
    },
  },
  methods: {
    getTransform(n: Number) {
      return `translate(${this.width / 2} ${this.height / 2}) rotate(${n * 360 / this.corners + this.baseRotation})`
    }
  },
})
</script>

<style>
.Shape {
  animation: 1s appear;
  margin: auto;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>
