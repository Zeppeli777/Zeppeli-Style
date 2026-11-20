<script setup lang="ts">
import { ZpNav } from '../../src'
const links = [{ href: '#home', label: '首页' }, { href: '#journal', label: '手记' }]
</script>

<template>
  <ZpNav :links="links" label="预览导航">
    <template #brand>赛程手册</template>
  </ZpNav>
</template>
