<script setup lang="ts">
import { ZpCheckbox } from '../../src'
import { ref } from 'vue'
const pinned = ref(false)
</script>

<template>
  <ZpCheckbox label="置顶这篇手记" v-model="pinned" />
</template>
