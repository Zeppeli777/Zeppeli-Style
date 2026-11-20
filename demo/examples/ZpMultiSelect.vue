<script setup lang="ts">
import { ZpMultiSelect } from '../../src'
import { ref } from 'vue'
const tags = ref(['route'])
const options = [
  { value: 'route', label: '路线' }, { value: 'supply', label: '补给' },
  { value: 'weather', label: '天气' }, { value: 'closed', label: '已封存', disabled: true },
]
</script>

<template>
  <ZpMultiSelect label="记录标签" v-model="tags" :options="options" name="tags" />
</template>
