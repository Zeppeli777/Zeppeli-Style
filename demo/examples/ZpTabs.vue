<script setup lang="ts">
import { ZpTabs } from '../../src'
const items = [{ value: 'route', label: '路线' }, { value: 'weather', label: '天气' }]
</script>

<template>
  <ZpTabs label="赛段信息" :items="items">
    <template #route>沿山脊向东。</template>
    <template #weather>晴，西南风。</template>
  </ZpTabs>
</template>
