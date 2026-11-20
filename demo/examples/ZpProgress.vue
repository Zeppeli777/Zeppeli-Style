<script setup lang="ts">
import { ZpProgress } from '../../src'
import { ref } from 'vue'
const progress = ref(62)
</script>

<template>
  <ZpProgress label="阅读进度" :value="progress" />
  <label>调整进度 <input type="range" min="0" max="100" v-model.number="progress"></label>
</template>
