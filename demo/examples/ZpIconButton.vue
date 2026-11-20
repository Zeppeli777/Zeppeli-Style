<script setup lang="ts">
import { ZpIconButton } from '../../src'
import { ref } from 'vue'
const flagged = ref(false)
</script>

<template>
  <ZpIconButton icon="flag" :label="flagged ? '取消标记' : '标记赛段'" :aria-pressed="flagged" @click="flagged = !flagged" />
  <span aria-live="polite">{{ flagged ? '已标记' : '尚未标记' }}</span>
</template>
