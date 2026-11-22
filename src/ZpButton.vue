<script setup lang="ts">
import { computed } from 'vue'
import ZpSteelBall from './ZpSteelBall.vue'

defineOptions({ inheritAttrs: false })
const props = withDefaults(defineProps<{
  kind?: 'primary' | 'secondary' | 'gold' | 'ghost' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  /** 已废弃：请改用 kind（outline 等同 secondary） */
  variant?: 'primary' | 'outline'
  type?: 'button' | 'submit' | 'reset'
}>(), { size: 'md', type: 'button' })
const resolvedKind = computed(() => props.kind ?? (props.variant === 'outline' ? 'secondary' : 'primary'))
</script>

<template>
  <button v-bind="$attrs" :type="type" class="zp-action"
    :class="['zp-action-' + resolvedKind, size !== 'md' && 'zp-action-' + size, loading && 'zp-action-loading']"
    :disabled="loading || ($attrs.disabled as boolean | undefined)" :aria-busy="loading || undefined">
    <ZpSteelBall v-if="loading" :size="18" class="zp-spin" />
    <slot />
  </button>
</template>
