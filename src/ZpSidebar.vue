<script setup lang="ts">
import { useId } from 'vue'
const props = defineProps<{
  label: string
  items: readonly { value: string; label: string; detail?: string; href?: string }[]
}>()
const selected = defineModel<string>()
const collapsed = defineModel<boolean>('collapsed', { default: false })
const listId = useId()
</script>

<template>
  <nav class="zp-sidebar" :aria-label="props.label">
    <button type="button" class="zp-sidebar-toggle" :aria-expanded="!collapsed" :aria-controls="listId"
      @click="collapsed = !collapsed">{{ label }}<span aria-hidden="true">{{ collapsed ? '＋' : '−' }}</span></button>
    <ul v-show="!collapsed" :id="listId" :aria-label="label">
      <li v-for="item in items" :key="item.value">
        <component :is="item.href ? 'a' : 'button'" :type="item.href ? undefined : 'button'" :href="item.href"
          :aria-current="selected === item.value ? (item.href ? 'page' : 'true') : undefined"
          @click="selected = item.value">
          <span>{{ item.label }}</span><small v-if="item.detail">{{ item.detail }}</small>
        </component>
      </li>
    </ul>
  </nav>
</template>
