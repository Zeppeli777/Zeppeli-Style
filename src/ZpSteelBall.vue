<script setup lang="ts">
import ballUrl from './assets/steel-ball.svg'
withDefaults(defineProps<{ size?: number; label?: string }>(), { size: 24, label: '' })
</script>

<template>
  <img :src="ballUrl" :width="size" :height="size" :alt="label" class="zp-steel-ball">
</template>
