import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://127.0.0.1:4391',
    // Software WebGL so the 3D steel ball tests run on machines without a GPU.
    launchOptions: { args: ['--enable-unsafe-swiftshader'] },
  },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 4391 --strictPort',
    url: 'http://127.0.0.1:4391',
  },
})
