<script setup lang="ts">
import { ref } from 'vue'
import { ZpSteelBall3D } from '../../src'

const ball = ref<InstanceType<typeof ZpSteelBall3D>>()
</script>

<template>
  <ZpSteelBall3D ref="ball" :size="200" />
  <p><button class="zp-action" type="button" @click="ball?.spin()">掷出回旋</button></p>
</template>
