<script setup lang="ts">
defineProps<{ name: 'arrow' | 'menu' | 'close' | 'flag' | 'horseshoe' | 'copy'; label?: string }>()
const paths = {
  copy: 'M8 8h12v13H8z M5 16H3V3h12v2',
  arrow: 'M4 12h15m-6-6 6 6-6 6',
  menu: 'M3 6h18M3 12h18M3 18h18',
  close: 'm5 5 14 14M19 5 5 19',
  flag: 'M5 21V4q4-3 8 0t7 0v9q-4 3-8 0t-7 0',
  horseshoe: 'm5 3 3 2c-6 10-3 14 4 14s10-4 4-14l3-2c8 13 2 19-7 19S-3 16 5 3Z',
}
</script>

<template>
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"
    :role="label ? 'img' : undefined" :aria-label="label" :aria-hidden="label ? undefined : true">
    <path :d="paths[name]" />
  </svg>
</template>
