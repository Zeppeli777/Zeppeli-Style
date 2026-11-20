<script setup lang="ts">
import { ZpCheckboxGroup } from '../../src'
import { ref } from 'vue'
const layers = ref(['track'])
const options = [{ value: 'track', label: '路线' }, { value: 'station', label: '补给站' }, { value: 'terrain', label: '地形' }]
</script>

<template>
  <ZpCheckboxGroup v-model="layers" label="地图图层" name="layers" :options="options" />
  <p>已启用 {{ layers.length }} 个图层</p>
</template>
