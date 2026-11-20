<script setup lang="ts">
import { computed, nextTick, ref, type Component } from 'vue'
import { ZpBadge, ZpButton, ZpCodeBlock, ZpEmptyState, ZpIconButton, ZpSelect, ZpSidebar, ZpTextField } from '../src'

const groups = ['操作与反馈', '导航', '内容与数据', '图标与装饰'] as const
const entries = [
  ['ZpProgress', '铁球进度条', '操作与反馈'],
  ['ZpButton', '按钮', '操作与反馈'],
  ['ZpIconButton', '图标按钮', '操作与反馈'],
  ['ZpTextField', '文本输入框', '操作与反馈'],
  ['ZpSelect', '选择框', '操作与反馈'],
  ['ZpCheckbox', '复选框', '操作与反馈'],
  ['ZpCheckboxGroup', '复选框组', '操作与反馈'],
  ['ZpMultiSelect', '下拉多选框', '操作与反馈'],
  ['ZpCalendar', '日历', '内容与数据'],
  ['ZpSidebar', '侧边栏', '导航'],
  ['ZpEmptyState', '空状态', '操作与反馈'],
  ['ZpNav', '导航栏', '导航'],
  ['ZpDrawer', '抽屉', '导航'],
  ['ZpTabs', '标签页', '导航'],
  ['ZpPanel', '内容面板', '内容与数据'],
  ['ZpChart', '图表', '内容与数据'],
  ['ZpTimeline', '赛段时间线', '内容与数据'],
  ['ZpCodeBlock', '代码块', '内容与数据'],
  ['ZpBadge', '徽章', '图标与装饰'],
  ['ZpIcon', '线性图标', '图标与装饰'],
  ['ZpSteelBall', '铁球图标', '图标与装饰'],
  ['ZpSteelBall3D', '三维铁球', '图标与装饰'],
] as const
const examples = import.meta.glob<Component>('./examples/*.vue', { eager: true, import: 'default' })
const sources = import.meta.glob<string>('./examples/*.vue', { eager: true, query: '?raw', import: 'default' })
const options = [{ value: '', label: '全部分类' }, ...groups.map(label => ({ value: label, label }))]
const query = ref('')
const group = ref('')
const chosen = ref('ZpProgress')
const filtered = computed(() => {
  const term = query.value.trim().toLowerCase()
  return entries.filter(([name, label, category]) =>
    (!group.value || group.value === category) && (name + ' ' + label).toLowerCase().includes(term))
})
const current = computed(() => filtered.value.find(([name]) => name === chosen.value) ?? filtered.value[0])
const sidebarItems = computed(() => filtered.value.map(([value, label]) => ({ value, label, detail: value })))
const path = computed(() => current.value ? './examples/' + current.value[0] + '.vue' : '')
const snippet = computed(() => sources[path.value]?.replace("from '../../src'", "from 'zeppeli-style'\nimport 'zeppeli-style/style.css'") ?? '')
const filters = ref<HTMLElement>()
function resetFilters() {
  query.value = ''
  group.value = ''
  nextTick(() => filters.value?.querySelector('input')?.focus())
}
</script>

<template>
  <main class="catalog">
    <h1>组件目录</h1>
    <div ref="filters" class="catalog-filters" role="search" aria-label="筛选组件">
      <ZpTextField v-model="query" type="search" label="搜索组件" placeholder="中文名称或组件名" />
      <ZpSelect v-model="group" label="分类" :options="options" />
      <ZpIconButton icon="close" label="清除筛选" :disabled="!query && !group" @click="resetFilters" />
    </div>
    <p class="catalog-count" role="status">{{ filtered.length }} 个组件</p>
    <div v-if="current" class="catalog-layout">
      <ZpSidebar label="组件列表" :items="sidebarItems" :model-value="current[0]"
        @update:model-value="chosen = $event ?? ''" />
      <section class="catalog-detail" aria-labelledby="catalog-title">
        <div class="catalog-heading"><h2 id="catalog-title">{{ current[1] }}</h2><ZpBadge tone="purple">{{ current[2] }}</ZpBadge></div>
        <div class="catalog-preview"><component :is="examples[path]" :key="path" /></div>
        <ZpCodeBlock :title="current[0] + ' · Vue'" :code="snippet" />
      </section>
    </div>
    <ZpEmptyState v-else title="没有符合条件的组件" description="可更换关键词，或清除筛选查看全部组件。">
      <ZpButton @click="resetFilters">显示全部组件</ZpButton>
    </ZpEmptyState>
  </main>
</template>

<style>
.catalog { padding-top: 1.5rem; }
.catalog-filters { display: grid; grid-template-columns: minmax(0, 24rem) minmax(8rem, 12rem) auto; align-items: end; justify-content: start; gap: .7rem; }
.catalog-count { margin: 1.25rem 0 .65rem; color: var(--zp-brown); font-size: .9rem; }
.catalog-layout { display: grid; grid-template-columns: minmax(12rem, .75fr) minmax(0, 2fr); border-block: 1px solid var(--zp-line); }
.catalog-layout > .zp-sidebar { border-right: 1px solid var(--zp-line); }
@media (min-width: 681px) {
  .catalog-layout:has(> .zp-sidebar > [aria-expanded='false']) { grid-template-columns: 8rem minmax(0, 1fr); }
}
.catalog-detail { min-width: 0; padding: 1.25rem clamp(.8rem, 3vw, 2rem); }
.catalog-heading { display: flex; flex-wrap: wrap; align-items: center; gap: .75rem; margin-bottom: 1rem; }
.catalog-heading h2 { margin: 0; font-size: 1.65rem; }
.catalog-preview { padding: 1.25rem; background: #fff9eb; border: 1px solid var(--zp-line); }
.catalog-preview > .zp-icon-button { margin-right: .5rem; }
.catalog-preview > svg + svg { margin-left: .7rem; }
@media (max-width: 680px) {
  .catalog-filters { grid-template-columns: minmax(0, 1fr) auto; }
  .catalog-filters > .zp-field:first-child { grid-column: 1 / -1; }
  .catalog-layout { grid-template-columns: minmax(0, 1fr); }
  .catalog-layout > .zp-sidebar { border-right: 0; border-bottom: 1px solid var(--zp-line); }
  .catalog-detail { padding: 1rem 0; }
}
</style>
