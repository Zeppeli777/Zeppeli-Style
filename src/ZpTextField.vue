<script setup lang="ts">
import { useId } from 'vue'
defineOptions({ inheritAttrs: false })
const props = defineProps<{
  label: string
  id?: string
  type?: 'text' | 'search' | 'email' | 'url' | 'password' | 'tel'
  error?: string
}>()
const model = defineModel<string>()
const instanceId = useId()
</script>

<template>
  <div class="zp-field">
    <label :for="id ?? instanceId">{{ label }}</label>
    <input v-bind="$attrs" :id="id ?? instanceId" v-model="model" :type="props.type ?? 'text'"
      :aria-invalid="error ? true : $attrs['aria-invalid'] as boolean | undefined"
      :aria-describedby="[$attrs['aria-describedby'], error && (id ?? instanceId) + '-error'].filter(Boolean).join(' ') || undefined">
    <small v-if="error" :id="(id ?? instanceId) + '-error'" class="zp-field-error">{{ error }}</small>
  </div>
</template>
