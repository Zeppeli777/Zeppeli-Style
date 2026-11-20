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

在本仓库运行 `npm run build` 和 `npm pack`，然后在使用 Vue 3.5 的项目中运行 `npm install <压缩包路径>`。

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

## 验证

- `npm run build` 检查类型并生成组件包与声明文件。
- `npm run build:demo` 生成演示站点，使用 `npm run preview` 预览。
- `npx playwright install chromium` 安装浏览器，`npm test` 运行桌面与移动端交互检查。
