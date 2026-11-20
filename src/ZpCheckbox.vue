<script setup lang="ts">
defineOptions({ inheritAttrs: false })
defineProps<{ label: string; indeterminate?: boolean }>()
const checked = defineModel<boolean>({ default: false })
</script>

<template>
  <label class="zp-check">
    <input v-bind="$attrs" type="checkbox" v-model="checked" :indeterminate="indeterminate ?? false">
    <span>{{ label }}</span>
  </label>
</template>
