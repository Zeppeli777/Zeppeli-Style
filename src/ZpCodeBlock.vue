<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import ZpIcon from './ZpIcon.vue'

const props = withDefaults(defineProps<{ code: string; title?: string }>(), { title: '代码示例' })
const codeNode = ref<HTMLElement>()
const message = ref('')
let attempt = 0
let timer: ReturnType<typeof setTimeout> | undefined

function reset() {
  attempt++
  clearTimeout(timer)
  message.value = ''
}
watch(() => props.code, reset)
onBeforeUnmount(reset)

async function copy() {
  reset()
  const current = attempt
  try {
    await navigator.clipboard.writeText(props.code)
    if (attempt !== current) return
    message.value = '已复制'
  } catch {
    if (attempt !== current || !codeNode.value) return
    const range = document.createRange()
    range.selectNodeContents(codeNode.value)
    const selection = window.getSelection()
    selection?.removeAllRanges()
    selection?.addRange(range)
    message.value = '请手动复制'
  }
  timer = setTimeout(reset, 3200)
}
</script>

<template>
  <figure class="zp-code-block">
    <figcaption>
      <span>{{ title }}</span>
      <button type="button" @click="copy"><ZpIcon name="copy" />复制代码</button>
    </figcaption>
    <pre tabindex="0" :aria-label="title"><code ref="codeNode">{{ code }}</code></pre>
    <span class="zp-copy-feedback" role="status">{{ message }}</span>
  </figure>
</template>
