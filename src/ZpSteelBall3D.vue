<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import ZpSteelBall from './ZpSteelBall.vue'
import type { mountBall } from './three/steel-ball'

withDefaults(defineProps<{ size?: number; label?: string }>(), {
  size: 192, label: '带六边形凹槽的铜绿铁球',
})
const canvas = ref<HTMLCanvasElement>()
const ready = ref(false)
let viewer: ReturnType<typeof mountBall> | undefined
let active = false
let pointer: { id: number; x: number; y: number } | undefined
let tap: { x: number; y: number; moved: boolean } | undefined

defineExpose({ spin: (power?: number) => viewer?.spin(power) })

function release() {
  const previous = viewer
  viewer = undefined
  ready.value = false
  pointer = undefined
  previous?.dispose()
}
onMounted(async () => {
  active = true
  try {
    const { mountBall } = await import('./three/steel-ball')
    if (!active || !canvas.value) return
    viewer = mountBall(canvas.value)
    ready.value = true
  } catch {
    release()
  }
})
onBeforeUnmount(() => {
  active = false
  release()
})
function start(event: PointerEvent) {
  if (!viewer || !event.isPrimary || event.button !== 0) return
  canvas.value?.setPointerCapture(event.pointerId)
  pointer = { id: event.pointerId, x: event.clientX, y: event.clientY }
  tap = { x: event.clientX, y: event.clientY, moved: false }
}
function drag(event: PointerEvent) {
  if (!pointer || pointer.id !== event.pointerId) return
  const scale = Math.PI / (canvas.value?.clientWidth || 192)
  viewer?.rotate((event.clientX - pointer.x) * scale, (event.clientY - pointer.y) * scale)
  pointer.x = event.clientX
  pointer.y = event.clientY
  if (tap && Math.hypot(event.clientX - tap.x, event.clientY - tap.y) > 6) tap.moved = true
}
function releaseTap(event: PointerEvent) {
  if (!pointer || pointer.id !== event.pointerId) return
  if (tap && !tap.moved) viewer?.spin()
  tap = undefined
}
function keydown(event: KeyboardEvent) {
  if ((event.key === 'Enter' || event.key === ' ') && viewer) {
    event.preventDefault()
    viewer.spin()
    return
  }
  const steps: Record<string, [number, number]> = {
    ArrowLeft: [-0.18, 0], ArrowRight: [0.18, 0], ArrowUp: [0, -0.18], ArrowDown: [0, 0.18],
  }
  const step = steps[event.key]
  if (!step || !viewer) return
  event.preventDefault()
  viewer.rotate(...step)
}
</script>

<template>
  <span class="zp-ball-view" :style="{ width: size + 'px' }">
    <ZpSteelBall v-if="!ready" :size="size" :label="label" />
    <canvas ref="canvas" :class="{ 'zp-ball-ready': ready }" :tabindex="ready ? 0 : -1"
      :aria-hidden="!ready" role="img" :aria-label="label + '，拖动或按方向键旋转，点按或按回车掷出回旋'"
      @pointerdown="start" @pointermove="drag" @pointerup="releaseTap" @pointercancel="tap = undefined"
      @lostpointercapture="pointer = undefined" @keydown="keydown" @webglcontextlost="release" />
  </span>
</template>

<style>
.zp-ball-view { position: relative; display: inline-block; max-width: 100%; aspect-ratio: 1; vertical-align: middle; }
.zp-ball-view > img, .zp-ball-view > canvas { position: absolute; inset: 0; width: 100%; height: 100%; }
.zp-ball-view > canvas { opacity: 0; pointer-events: none; }
.zp-ball-view > .zp-ball-ready { opacity: 1; pointer-events: auto; cursor: grab; touch-action: none; }
.zp-ball-ready:active { cursor: grabbing; }
.zp-ball-ready:focus-visible { outline: 2px solid var(--zp-gold, gold); outline-offset: 2px; border-radius: 50%; }
</style>
