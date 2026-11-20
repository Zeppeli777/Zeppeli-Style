<script setup lang="ts">
import { ZpNav } from '../../src'
const links = [{ href: '#home', label: '首页', icon: 'home' }, { href: '#journal', label: '手记', icon: 'journal' }] as const
</script>

<template>
  <ZpNav :links="links" current="#journal" label="预览导航">
    <template #brand>赛程手册</template>
  </ZpNav>
</template>
