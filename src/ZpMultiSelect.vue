<script setup lang="ts">
import { computed, useId } from 'vue'
import { SelectRoot, SelectTrigger, SelectPortal, SelectContent, SelectViewport, SelectItem, SelectItemText, SelectItemIndicator } from 'reka-ui'
const props = defineProps<{
  label: string
  options: readonly { value: string; label: string; disabled?: boolean }[]
  placeholder?: string
  name?: string
  disabled?: boolean
}>()
const selected = defineModel<string[]>({ default: () => [] })
const labels = computed(() => props.options.filter(item => selected.value.includes(item.value)).map(item => item.label))
const id = useId()
</script>

<template>
  <div class="zp-field">
    <label :id="id + '-label'" :for="id">{{ label }}</label>
    <SelectRoot multiple v-model="selected" :name="name" :disabled="disabled">
      <SelectTrigger :id="id" class="zp-multi-trigger" :aria-labelledby="id + '-label ' + id + '-value'">
        <span :id="id + '-value'">{{ labels.join('、') || placeholder || '请选择' }}</span><span aria-hidden="true">▾</span>
      </SelectTrigger>
      <SelectPortal><SelectContent class="zp-options" position="popper" :side-offset="4" :collision-padding="8" :aria-label="label" aria-multiselectable="true">
        <SelectViewport>
          <SelectItem v-for="item in options" :key="item.value" :value="item.value" :disabled="item.disabled">
            <SelectItemText>{{ item.label }}</SelectItemText><SelectItemIndicator aria-hidden="true">✓</SelectItemIndicator>
          </SelectItem>
          <span v-if="!options.length" class="zp-options-empty">暂无选项</span>
        </SelectViewport>
      </SelectContent></SelectPortal>
    </SelectRoot>
  </div>
</template>
