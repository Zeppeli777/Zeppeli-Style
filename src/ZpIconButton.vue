<script setup lang="ts">
import ZpButton from './ZpButton.vue'
import ZpIcon from './ZpIcon.vue'
defineProps<{ label: string; icon: InstanceType<typeof ZpIcon>['$props']['name'] }>()
</script>

<template>
  <ZpButton class="zp-icon-button" variant="outline" :aria-label="label" :title="label">
    <ZpIcon :name="icon" />
  </ZpButton>
</template>
