<script setup lang="ts">
import { ZpTextField } from '../../src'
import { ref } from 'vue'
const title = ref('丘陵赛段')
</script>

<template>
  <ZpTextField label="赛段名称" v-model="title" :error="title.trim() ? '' : '请输入赛段名称'" required />
</template>
