<script setup lang="ts">
import { ZpCalendar } from '../../src'
import { ref } from 'vue'
const day = ref('2028-02-28')
</script>

<template>
  <ZpCalendar v-model="day" label="选择赛段日期" min="2028-02-01" max="2028-03-31" />
  <p>赛段日期：{{ day }}</p>
</template>
