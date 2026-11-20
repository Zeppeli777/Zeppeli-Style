<script setup lang="ts">
import { DialogRoot, DialogPortal, DialogOverlay, DialogContent, DialogTitle, DialogTrigger, DialogClose } from 'reka-ui'
import ZpIcon from './ZpIcon.vue'
defineProps<{ title: string }>()
const emit = defineEmits<{ closeAutoFocus: [event: Event] }>()
const open = defineModel<boolean>('open', { default: false })
</script>

<template>
  <DialogRoot v-model:open="open">
    <DialogTrigger as-child><slot name="trigger"><button class="zp-action" type="button">{{ title }}</button></slot></DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="zp-scrim" />
      <DialogContent class="zp-drawer" :aria-describedby="undefined" @close-auto-focus="emit('closeAutoFocus', $event)">
        <header><DialogTitle>{{ title }}</DialogTitle><DialogClose as-child>
          <button type="button" class="zp-action" aria-label="关闭"><ZpIcon name="close" /></button>
        </DialogClose></header>
        <slot />
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
