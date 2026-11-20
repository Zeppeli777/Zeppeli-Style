<script setup lang="ts">
import { DialogRoot, DialogPortal, DialogOverlay, DialogContent, DialogTitle, DialogTrigger, DialogClose } from 'reka-ui'
import ZpButton from './ZpButton.vue'
import ZpIconButton from './ZpIconButton.vue'
defineProps<{ title: string }>()
const emit = defineEmits<{ closeAutoFocus: [event: Event] }>()
const open = defineModel<boolean>('open', { default: false })
</script>

<template>
  <DialogRoot v-model:open="open">
    <DialogTrigger as-child><slot name="trigger"><ZpButton>{{ title }}</ZpButton></slot></DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="zp-scrim" />
      <DialogContent class="zp-drawer" :aria-describedby="undefined" @close-auto-focus="emit('closeAutoFocus', $event)">
        <header><DialogTitle>{{ title }}</DialogTitle><DialogClose as-child>
          <ZpIconButton icon="close" label="关闭" />
        </DialogClose></header>
        <slot />
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
