import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
   // 强制预构建插件包
  optimizeDeps: {
    include: [
      `monaco-editor/esm/vs/editor/editor.worker`
    ], 
  },
})
