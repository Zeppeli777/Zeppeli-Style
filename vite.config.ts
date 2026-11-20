import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => ({
  plugins: [vue()],
  build: mode === 'library' ? {
    lib: { entry: 'src/index.ts', formats: ['es'], fileName: 'index', cssFileName: 'style' },
    rollupOptions: { external: ['vue', 'reka-ui', /^three(?:\/|$)/] },
  } : { outDir: 'demo-dist' },
}))
