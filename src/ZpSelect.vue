<script setup lang="ts">
import { useId } from 'vue'
defineOptions({ inheritAttrs: false })
defineProps<{ label: string; id?: string; options: readonly { value: string; label: string; disabled?: boolean }[] }>()
const model = defineModel<string>()
const instanceId = useId()
</script>

<template>
  <div class="zp-field">
    <label :for="id ?? instanceId">{{ label }}</label>
    <select :id="id ?? instanceId" v-bind="$attrs" v-model="model">
      <option v-for="item in options" :key="item.value" :value="item.value" :disabled="item.disabled">{{ item.label }}</option>
    </select>
  </div>
</template>
