<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'primary' | 'outline'
  type?: 'button' | 'submit' | 'reset'
}>(), { variant: 'primary', type: 'button' })
</script>

<template>
  <button :type="type" class="zp-action" :class="{ 'zp-action-outline': variant === 'outline' }"><slot /></button>
</template>
