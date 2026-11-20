<script setup lang="ts">
import ZpIcon from './ZpIcon.vue'
defineProps<{ title: string; description?: string }>()
</script>

<template>
  <div class="zp-empty">
    <ZpIcon name="horseshoe" />
    <strong>{{ title }}</strong>
    <p v-if="description">{{ description }}</p>
    <slot />
  </div>
</template>
