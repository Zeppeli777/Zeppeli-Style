<script setup lang="ts">
import { ZpSelect } from '../../src'
import { ref } from 'vue'
const terrain = ref('hill')
const options = [{ value: 'hill', label: '丘陵' }, { value: 'sand', label: '沙地' }]
</script>

<template>
  <ZpSelect label="赛段地形" v-model="terrain" :options="options" />
</template>
