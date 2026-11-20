<script setup lang="ts">
defineProps<{
  label: string
  options: readonly { value: string; label: string; disabled?: boolean }[]
  name?: string
  disabled?: boolean
}>()
const selected = defineModel<string[]>({ default: () => [] })
</script>

<template>
  <fieldset class="zp-check-group" :disabled="disabled">
    <legend>{{ label }}</legend>
    <label v-for="item in options" :key="item.value" class="zp-check">
      <input type="checkbox" v-model="selected" :name="name" :value="item.value" :disabled="item.disabled">
      <span>{{ item.label }}</span>
    </label>
  </fieldset>
</template>
