<script setup lang="ts">
defineProps<{ name: keyof typeof paths; label?: string }>()
const paths = {
  home: 'm2 11 10-8 10 8m-17-1v11h5v-7h4v7h5V10',
  journal: 'M3 4h5q3 0 4 2 1-2 4-2h5v15h-5q-3 0-4 2-1-2-4-2H3z M12 6v15',
  grid: 'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',
  search: 'M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-2 5 6 6',
  external: 'M14 3h7v7m-1-6-10 10m0-10H4v16h16v-7',
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
