<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import ZpDrawer from './ZpDrawer.vue'
import ZpIcon from './ZpIcon.vue'
const props = defineProps<{
  links: readonly { href: string; label: string; icon?: InstanceType<typeof ZpIcon>['$props']['name'] }[]
  current?: string
  label?: string
  sticky?: boolean
}>()
const open = ref(false)
const nav = ref<HTMLElement>()
let narrow: MediaQueryList
function handleWidth() {
  if (!narrow.matches) open.value = false
}
function restoreDesktopFocus(event: Event) {
  if (narrow.matches) return
  event.preventDefault()
  const links = nav.value?.querySelector('.zp-nav-links')
  const target = links?.querySelector<HTMLElement>('[aria-current]') ?? links?.querySelector('a')
  target?.focus()
}
onMounted(() => {
  narrow = window.matchMedia('(max-width: 680px)')
  narrow.addEventListener('change', handleWidth)
})
onBeforeUnmount(() => narrow?.removeEventListener('change', handleWidth))
watch(() => props.current, () => { open.value = false })
</script>

<template>
  <nav ref="nav" class="zp-nav" :class="{ 'zp-nav-sticky': sticky }" :aria-label="label ?? '主导航'">
    <slot name="brand" />
    <div class="zp-nav-links">
      <a v-for="link in links" :key="link.href" :href="link.href" :aria-current="current === link.href ? 'page' : undefined">
        <ZpIcon v-if="link.icon" :name="link.icon" />{{ link.label }}
      </a>
    </div>
    <slot name="actions" />
    <ZpDrawer v-model:open="open" title="站点导航" @close-auto-focus="restoreDesktopFocus">
      <template #trigger><button class="zp-action zp-nav-trigger" type="button"><ZpIcon name="menu" />菜单</button></template>
      <div class="zp-menu">
        <a v-for="link in links" :key="link.href" :href="link.href" :aria-current="current === link.href ? 'page' : undefined" @click="open = false">
          <ZpIcon v-if="link.icon" :name="link.icon" />{{ link.label }}
        </a>
      </div>
    </ZpDrawer>
  </nav>
</template>
