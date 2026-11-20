<script setup lang="ts">
withDefaults(defineProps<{ tone?: 'green' | 'purple' | 'gold' }>(), { tone: 'green' })
</script>

<template>
  <span class="zp-badge" :class="'zp-badge-' + tone">
    <svg v-if="tone === 'gold'" aria-hidden="true" width="17" height="13" viewBox="0 0 17 13">
      <path d="M1 2q7 2 15-1l-1 8-3 2-3-1-3 2-4-2z" fill="none" stroke="currentColor" stroke-linejoin="round" />
      <path d="m6 3 0 8m5-9-1 8" stroke="currentColor" />
    </svg>
    <slot />
  </span>
</template>
