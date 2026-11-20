<script setup lang="ts">
import { ZpButton } from '../../src'
import { ref } from 'vue'
const saved = ref(false)
</script>

<template>
  <ZpButton :aria-pressed="saved" @click="saved = !saved">{{ saved ? '已收藏' : '收藏手记' }}</ZpButton>
</template>
