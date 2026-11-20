<script setup lang="ts">
import ZpIcon from './ZpIcon.vue'
import ZpSteelBall from './ZpSteelBall.vue'

defineProps<{
  label: string
  items: readonly {
    id: string
    title: string
    detail?: string
    state: 'complete' | 'current' | 'upcoming'
  }[]
}>()
const states = { complete: '已完成', current: '进行中', upcoming: '待开始' } as const
</script>

<template>
  <ol class="zp-timeline" :aria-label="label">
    <li v-for="item in items" :key="item.id" :data-state="item.state"
      :aria-current="item.state === 'current' ? 'step' : undefined">
      <span class="zp-timeline-marker" aria-hidden="true">
        <ZpSteelBall v-if="item.state === 'current'" :size="25" />
        <ZpIcon v-else-if="item.state === 'complete'" name="flag" />
      </span>
      <div class="zp-timeline-copy">
        <small>{{ states[item.state] }}</small>
        <strong>{{ item.title }}</strong>
        <p v-if="item.detail">{{ item.detail }}</p>
      </div>
    </li>
  </ol>
</template>
