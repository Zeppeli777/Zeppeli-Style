<script setup lang="ts">
import { ref } from 'vue'
import ZpDrawer from './ZpDrawer.vue'
import ZpIcon from './ZpIcon.vue'
defineProps<{ links: readonly { href: string; label: string }[]; current?: string; label?: string }>()
const open = ref(false)
</script>

<template>
  <nav class="zp-nav" :aria-label="label ?? '主导航'">
    <slot name="brand" />
    <div class="zp-nav-links">
      <a v-for="link in links" :key="link.href" :href="link.href" :aria-current="current === link.href ? 'page' : undefined">{{ link.label }}</a>
    </div>
    <ZpDrawer v-model:open="open" title="站点导航">
      <template #trigger><button class="zp-action zp-nav-trigger" type="button"><ZpIcon name="menu" />菜单</button></template>
      <div class="zp-menu">
        <a v-for="link in links" :key="link.href" :href="link.href" :aria-current="current === link.href ? 'page' : undefined" @click="open = false">{{ link.label }}</a>
      </div>
    </ZpDrawer>
  </nav>
</template>
