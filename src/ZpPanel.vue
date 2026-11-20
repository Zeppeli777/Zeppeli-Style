<script setup lang="ts">
withDefaults(defineProps<{ background?: 'paper' | 'grid' }>(), { background: 'paper' })
</script>

<template>
  <div class="zp-panel" :class="{ 'zp-grid': background === 'grid' }"><slot /></div>
</template>
