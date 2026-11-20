<script setup lang="ts">
import { computed, useId } from 'vue'
const props = withDefaults(defineProps<{
  title: string
  unit: string
  data: readonly { label: string; value: number }[]
  variant?: 'bar' | 'line'
}>(), { variant: 'bar' })
const titleId = useId()
const points = computed(() => {
  const rows = props.data.filter(row => Number.isFinite(row.value))
  const low = Math.min(0, ...rows.map(row => row.value))
  const high = Math.max(0, ...rows.map(row => row.value))
  const y = (n: number) => 98 - (n - low) / (high - low || 1) * 88
  const step = 300 / rows.length
  return rows.map((row, index) => ({
    ...row, x: 10 + step * (index + 0.5), y: y(row.value),
    baseline: y(0), width: Math.min(32, step * 0.55),
  }))
})
</script>

<template>
  <figure class="zp-chart" :aria-labelledby="titleId">
    <figcaption :id="titleId">{{ title }} <small>（{{ unit }}）</small></figcaption>
    <template v-if="points.length">
      <svg viewBox="0 0 320 110" aria-hidden="true">
        <path :d="'M5 ' + points[0].baseline + 'h310'" stroke="var(--zp-line, #c7ba9e)" />
        <template v-if="variant === 'line'">
          <polyline :points="points.map(p => p.x + ',' + p.y).join(' ')" fill="none" stroke="currentColor" stroke-width="2" />
          <circle v-for="(p, i) in points" :key="i" :cx="p.x" :cy="p.y" r="3" fill="currentColor" />
        </template>
        <rect v-for="(p, i) in variant === 'bar' ? points : []" :key="i" :x="p.x - p.width / 2"
          :y="Math.min(p.y, p.baseline)" :width="p.width" :height="Math.abs(p.y - p.baseline)" fill="currentColor" />
      </svg>
      <ul><li v-for="(p, i) in points" :key="i">{{ p.label }} <b>{{ p.value }}</b></li></ul>
    </template>
    <p v-else>暂无数据</p>
  </figure>
</template>
