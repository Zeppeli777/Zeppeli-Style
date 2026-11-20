<script setup lang="ts">
import { watchEffect } from 'vue'
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'reka-ui'
const props = defineProps<{ label: string; items: readonly { value: string; label: string }[] }>()
const selected = defineModel<string>()
watchEffect(() => {
  if (!props.items.some(item => item.value === selected.value)) selected.value = props.items[0]?.value
})
</script>

<template>
  <TabsRoot v-if="items.length" v-model="selected" class="zp-tabs">
    <TabsList class="zp-tab-list" :aria-label="label">
      <TabsTrigger v-for="item in items" :key="item.value" :value="item.value">{{ item.label }}</TabsTrigger>
    </TabsList>
    <TabsContent v-for="item in items" :key="item.value" :value="item.value" class="zp-tab-panel">
      <slot :name="item.value" />
    </TabsContent>
  </TabsRoot>
</template>
