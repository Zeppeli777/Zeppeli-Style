<script setup lang="ts">
import { defineAsyncComponent, ref, onMounted, onUnmounted } from 'vue'
import { ZpNav, ZpPanel, ZpSteelBall, ZpSteelBall3D, ZpProgress, ZpIcon, ZpChart, ZpDrawer } from '../src'
import { ZpBadge, ZpCodeBlock, ZpTabs, ZpTimeline } from '../src'

const ComponentCatalog = defineAsyncComponent(() => import('./ComponentCatalog.vue'))
const links = [
  { href: '#home', label: '首页', icon: 'home' },
  { href: '#journal', label: '设计手记', icon: 'journal' },
  { href: '#project', label: '项目概览', icon: 'flag' },
  { href: '#catalog', label: '组件目录', icon: 'grid' },
] as const
const page = ref(window.location.hash || '#home')
const progress = ref(62)
const projectTabs = [
  { value: 'overview', label: '进度概览' },
  { value: 'stages', label: '赛段日志' },
  { value: 'usage', label: '组件用法' },
]
const stages = [
  { id: 'survey', state: 'complete', title: '路线勘测', detail: '标定起点与补给站，绘制赛道底图。' },
  { id: 'trail', state: 'current', title: '穿过丘陵', detail: '沿着山脊前进，在第二座界碑记录里程。' },
  { id: 'finish', state: 'upcoming', title: '抵达终点', detail: '汇总各段用时，归档本次行程。' },
] as const
const progressExample = '<ZpProgress label="赛段进度" :value="62" />'
const iconExample = '<ZpSteelBall :size="24" label="赛段起点" />'
const chart = ref<'bar' | 'line'>('bar')
const contentsOpen = ref(false)
let pendingSection = ''
function showSection(id: string) {
  pendingSection = id
  contentsOpen.value = false
}
function focusSection(event: Event) {
  if (!pendingSection) return
  event.preventDefault()
  document.getElementById(pendingSection)?.focus()
  pendingSection = ''
}
const weeks = [3, 5, 4, 7].map((value, i) => ({ label: '第' + (i + 1) + '周', value }))
function navigate() {
  page.value = window.location.hash || '#home'
  window.scrollTo(0, 0)
}
onMounted(() => window.addEventListener('hashchange', navigate))
onUnmounted(() => window.removeEventListener('hashchange', navigate))
</script>

<template>
  <div class="site">
    <ZpNav :links="links" :current="page" sticky>
      <template #brand><a class="brand" href="#home"><ZpSteelBall :size="33" /> Zeppeli Style</a></template>
    </ZpNav>
    <main v-if="page === '#journal'" class="journal">
      <a href="#home">← 首页</a>
      <h1>球面上的六道刻线</h1>
      <div class="journal-meta"><ZpBadge tone="purple">设计手记</ZpBadge><i class="checks" aria-hidden="true"></i></div>
      <ZpDrawer v-model:open="contentsOpen" title="文章目录" @close-auto-focus="focusSection">
        <template #trigger><button class="zp-action" type="button">文章目录</button></template>
        <ol><li v-for="section in [{ id: 'groove', text: '从六边形开始' }, { id: 'scale', text: '缩到二十四像素' }]" :key="section.id">
          <button type="button" @click="showSection(section.id)">{{ section.text }}</button>
        </li></ol>
      </ZpDrawer>
      <h2 id="groove" tabindex="-1">从六边形开始</h2>
      <p>杰洛的铁球靠凹槽形成轮廓。我们把正面六边形略微倾斜，再从每个顶点沿球面引出刻线。深绿阴影和窄亮边给出槽口的深度。</p>
      <blockquote>先看轮廓，再看颜色。缩小之后，能留下来的细节才适合成为图标。</blockquote>
      <h2 id="scale" tabindex="-1">缩到二十四像素</h2>
      <p>在封面，铜绿高光可以铺满整个球面。放进进度条，中心刻槽和外沿仍有足够的间距，旁边的数值则给出准确进度。</p>
      <ZpProgress label="样板完成度" :value="progress" />
      <ZpCodeBlock title="Vue · 行内铁球" :code="iconExample" />
    </main>
    <main v-else-if="page === '#project'" class="project">
      <a href="#home">← 首页</a><h1>组件试验台</h1>
      <ZpTabs label="组件试验台" :items="projectTabs">
        <template #overview>
          <div class="cards">
            <ZpPanel><ZpProgress label="赛段进度" :value="progress" />
              <label class="range">调整进度<input v-model.number="progress" type="range" min="0" max="100"></label>
            </ZpPanel>
            <ZpPanel><ZpChart title="每周完成事项" unit="项" :variant="chart" :data="weeks" />
              <button class="zp-action" @click="chart = chart === 'bar' ? 'line' : 'bar'">切换为{{ chart === 'bar' ? '折线图' : '柱状图' }}</button>
            </ZpPanel>
          </div>
        </template>
        <template #stages>
          <ZpPanel><h2 class="log-title"><ZpIcon name="horseshoe" />赛程记录</h2>
            <ZpTimeline label="赛程记录" :items="stages" />
          </ZpPanel>
        </template>
        <template #usage>
          <ZpPanel><h2 class="log-title">在页面中插入进度条</h2>
            <p>从 zeppeli-style 导入 ZpProgress，并在应用入口引入组件库样式。</p>
            <ZpCodeBlock title="Vue · 进度条" :code="progressExample" />
          </ZpPanel>
        </template>
      </ZpTabs>
    </main>
    <ComponentCatalog v-else-if="page === '#catalog'" />
    <main v-else>
      <section class="cover">
        <div class="cover-copy"><h1>Golden<br><em>Spin</em></h1><p>杰洛风格的 Vue 组件库</p>
          <a class="cover-link" href="#project">打开组件试验台 <ZpIcon name="arrow" /></a></div>
        <div class="plate">
          <svg viewBox="0 0 324 200" class="spiral" aria-hidden="true"><path d="M200 0v200m0-76h124m-76 0v76m0-47h76" opacity=".55"/>
            <path d="M0 200A200 200 0 0 1 200 0a124 124 0 0 1 124 124 76 76 0 0 1-76 76 47 47 0 0 1-47-47 29 29 0 0 1 29-29"/>
          </svg>
          <ZpSteelBall3D :size="440" />
          <span class="rotation-hint" aria-hidden="true">拖动旋转 ↔</span>
        </div>
      </section>
      <div class="cards">
        <ZpPanel><ZpBadge tone="gold">精选手记</ZpBadge><h2><a href="#journal">球面上的六道刻线</a></h2>
          <p>从封面插图到阅读进度标记，记录一枚铁球的两种尺度。</p><a href="#journal">阅读设计手记 →</a></ZpPanel>
        <ZpPanel background="grid"><ZpProgress label="组件样板进度示例" :value="progress" />
          <a href="#project">查看图表与进度控件 →</a></ZpPanel>
      </div>
    </main>
    <footer>Zeppeli Style</footer>
  </div>
</template>
