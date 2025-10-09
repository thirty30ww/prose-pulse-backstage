import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import * as path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools()
  ],
  resolve: {
    alias: {
      // 🔥 关键修复：让 @/ 指向 auth-matrix 的 src，这样 auth-matrix 文件中的 @/ 导入就能正确解析
      '@': path.resolve(__dirname, '../auth-matrix/frontend/src'),
      // 指向auth-matrix的源码
      '@auth-matrix': path.resolve(__dirname, '../auth-matrix/frontend/src'),
      // backstage 自己的源码别名
      '@backstage': path.resolve(__dirname, 'src')
    }
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 改成你的后端端口
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
