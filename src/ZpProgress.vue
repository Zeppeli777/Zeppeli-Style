<script setup lang="ts">
import { computed } from 'vue'
import ZpSteelBall from './ZpSteelBall.vue'
const props = defineProps<{ label: string; value?: number }>()
const percent = computed(() => Number.isFinite(props.value)
  ? Math.min(100, Math.max(0, props.value!))
  : undefined)
</script>

<template>
  <div class="zp-progress" role="progressbar" :aria-label="label"
    :aria-valuenow="percent" aria-valuemin="0" aria-valuemax="100">
    <div class="zp-progress-label"><span>{{ label }}</span><b>{{ percent === undefined ? '加载中' : percent + '%' }}</b></div>
    <div class="zp-track">
      <div class="zp-fill" :class="{ 'zp-loading': percent === undefined }" :style="{ width: (percent ?? 30) + '%' }">
        <ZpSteelBall :size="22" />
      </div>
    </div>
  </div>
</template>
