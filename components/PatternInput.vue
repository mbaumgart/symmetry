<template>
  <svg class="pattern" width="250" height="100" viewBox="-25 -50 200 100" xmlns="http://www.w3.org/2000/svg">
    <polyline
      :points="points.map(p => p.join(',')).join(' ')"
      fill="none"
      stroke="#00c58e"
      stroke-width="2"
      stroke-linejoin="round"
      stroke-linecap="round"
    />
    <circle
      v-for="(pair, i) in points"
      :cx="pair[0]"
      :cy="pair[1]"
      :r="markerRadius"
      fill="#35495e"
    />
    <circle
      v-for="(pair, i) in points"
      :cx="pair[0]"
      :cy="pair[1]"
      :r="markerRadius * 5"
      fill="transparent"
      @mousedown="dragStart"
      @mousemove="dragMove($event, i)"
      @mouseup="dragEnd"
      @mouseleave="dragEnd"
    />
  </svg>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    points: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      dragging: false,
      markerRadius: 3,
    }
  },
  methods: {
    dragStart() {
      this.dragging = true
    },
    dragMove(event: any, i: number) {
      if (this.dragging) {
        const screenMatrix = event.target.getScreenCTM()
        const x = (event.clientX - screenMatrix.e) / screenMatrix.a - this.markerRadius * 0.3
        const y = (event.clientY - screenMatrix.f) / screenMatrix.d - this.markerRadius * 0.3
        const points = [...this.points]
        points[i] = [x, y]
        this.$emit('update', points)
      }
    },
    dragEnd() {
      this.dragging = false
    },
  },
})
</script>

<style>
circle {
  cursor: pointer;
}
</style>
