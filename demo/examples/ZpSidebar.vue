<script setup lang="ts">
import { ZpSidebar } from '../../src'
import { ref } from 'vue'
const section = ref('map')
const items = [{ value: 'map', label: '路线草图' }, { value: 'journal', label: '勘测记录' }]
</script>

<template>
  <ZpSidebar v-model="section" label="赛程章节" :items="items" />
  <p>{{ section === 'map' ? '沿河谷向东，在浅滩渡河。' : '浅滩水位下降，适合马队通行。' }}</p>
</template>
