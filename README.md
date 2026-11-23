# Zeppeli Style

受《Steel Ball Run》杰洛启发的 Vue 3 组件库。首批组件包括铁球、线性图标、导航、抽屉、内容面板、进度条和单系列图表。设计样板保存在 [design-plan.html](design-plan.html)。

## 本地运行

使用 Node.js 22.12+ 和 npm。在项目根目录运行：

```sh
npm ci
npm run dev
```

打开终端给出的地址。首页、设计手记和项目概览可通过导航切换。项目概览可调整进度和切换柱状图、折线图。

## 在另一个 Vue 项目中使用

在使用 Vue 3.5 的项目中安装组件库：

```sh
npm install zeppeli-style
```

按需导入组件，并在应用入口或根组件中引入一次样式：

```vue
<script setup>
import { ZpProgress, ZpPanel } from 'zeppeli-style'
import 'zeppeli-style/style.css'
</script>

<template>
  <ZpPanel background="grid">
    <ZpProgress label="阅读进度" :value="62" />
  </ZpPanel>
</template>
```

用 CSS 自定义属性（如 `--zp-green`、`--zp-purple` 和 `--zp-gold`）覆盖主题色。省略进度值会显示加载状态。图表接受 `{ label, value }` 数组，可设置 `variant="line"`；抽屉支持 `v-model:open` 和 `trigger` 插槽。

## 交互铁球

用 `<ZpSteelBall3D :size="192" />` 展示可拖动的三维铁球，键盘聚焦后可按方向键旋转。组件挂载时按需加载 Three.js；模型或视口发生变化时才重绘。WebGL 不可用时显示 SVG。小图标和进度标记使用 `ZpSteelBall`。

## 博客与项目组件

演示站的「组件目录」（`/#catalog`）可按中文名、Vue 组件名和分类筛选。每个预览旁都提供对应的单文件组件源码。

| 组件 | 用法 |
| --- | --- |
| `ZpSidebar` | 传入目录 `label` 和 `{ value, label, detail?, href? }[]`。用 `v-model` 绑定当前项，`v-model:collapsed` 控制折叠；带 `href` 的项目生成原生链接。 |
| `ZpNav` | 保持原有 `links` 和 `current` 用法，每项可加 `icon`。传入 `sticky` 启用吸顶；`brand`、`actions` 插槽放品牌和额外操作。手机端使用菜单抽屉。 |
| `ZpCheckbox` | `label` 配布尔型 `v-model`；支持 `indeterminate` 和原生复选框属性。 |
| `ZpCheckboxGroup`、`ZpMultiSelect` | 均绑定字符串数组，接受 `label`、`options`（与选择框一致）、`name` 和 `disabled`。前者平铺选项，后者在下拉列表内连续多选。 |
| `ZpCalendar` | 单日月历，使用 `YYYY-MM-DD` 字符串绑定 `v-model`，可选 `min`、`max`（含边界）。周一为每周首日，支持方向键移焦、回车选日。 |
| `ZpButton`、`ZpIconButton` | 按钮默认 `type="button"`，可传 `type="submit"`；`variant="outline"` 为描边样式。纯图标按钮需要 `icon` 和可读的 `label`。 |
| `ZpTextField` | 传入 `label` 和字符串 `v-model`，可传 `error` 关联错误说明。支持 `type="search"` 和原生输入属性。 |
| `ZpSelect` | 传入 `label`、字符串 `v-model` 和 `{ value, label, disabled? }[]` 形式的 `options`。 |
| `ZpEmptyState` | 传入 `title` 和可选的 `description`，默认插槽放恢复操作，如清除筛选。 |
| `ZpBadge` | 默认插槽放标签文字，`tone="gold"` 展示金牙徽章，也可选 `green` 或 `purple`。 |
| `ZpTabs` | 传入 `label` 和 `{ value, label }[]`。每项用同名插槽填充内容，可通过 `v-model` 读取或设置选中项。 |
| `ZpTimeline` | 传入 `label` 和 `items`，每个节点含唯一 `id`、`title`、可选 `detail` 和 `state`（`complete`、`current` 或 `upcoming`）。 |
| `ZpCodeBlock` | 传入纯文本 `code` 和可选标题 `title`。复制受限时，组件选中代码供手动复制。 |

## 验证

- `npm run build` 检查类型并生成组件包与声明文件。
- `npm run build:demo` 生成演示站点，使用 `npm run preview` 预览。
- `npx playwright install chromium` 安装浏览器，`npm test` 运行桌面与移动端交互检查。
