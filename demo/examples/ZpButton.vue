<script setup lang="ts">
import { ZpButton } from '../../src'
import { ref } from 'vue'
const saved = ref(false)
</script>

<template>
  <div class="button-demo">
    <p>
      <ZpButton :aria-pressed="saved" @click="saved = !saved">{{ saved ? '已收藏' : '收藏手记' }}</ZpButton>
      <ZpButton kind="secondary">次要行动</ZpButton>
      <ZpButton kind="gold">赞助赛事</ZpButton>
      <ZpButton kind="ghost">幽灵按钮</ZpButton>
      <ZpButton kind="dark">夜间行动</ZpButton>
    </p>
    <p>
      <ZpButton size="sm">小号按钮</ZpButton>
      <ZpButton>标准按钮</ZpButton>
      <ZpButton size="lg">大号按钮</ZpButton>
      <ZpButton loading>回转中</ZpButton>
    </p>
  </div>
</template>

<style>
.button-demo p { display: flex; flex-wrap: wrap; gap: .8rem; align-items: center; margin: 0 0 .9rem; }
</style>
