<script setup lang="ts">
import { ZpChart } from '../../src'
const weeks = [{ label: '第一周', value: 3 }, { label: '第二周', value: 5 }, { label: '第三周', value: 4 }]
</script>

<template>
  <ZpChart title="每周设计手记" unit="篇" :data="weeks" />
</template>
