<script setup lang="ts">
import { ZpTimeline } from '../../src'
const items = [
  { id: 'start', title: '离开起点', state: 'complete' },
  { id: 'hill', title: '穿过丘陵', state: 'current' },
] as const
</script>

<template>
  <ZpTimeline label="赛段记录" :items="items" />
</template>
