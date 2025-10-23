import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import * as path from "node:path";
import { AUTH_MATRIX_PATHS } from './src/config/paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools()
  ],
  resolve: {
    alias: {
      // @/services 映射到 shared-api 的 services
      '@/services': path.resolve(__dirname, '../shared-api/src/services'),
      // 让 @/ 指向 auth-matrix 的 src，这样 auth-matrix 文件中的 @/ 导入就能正确解析
      '@': path.resolve(__dirname, AUTH_MATRIX_PATHS.SRC),
      // 指向auth-matrix的源码
      '@auth-matrix': path.resolve(__dirname, AUTH_MATRIX_PATHS.SRC),
      // backstage 自己的源码别名
      '@backstage': path.resolve(__dirname, 'src'),
      // shared-api 别名
      'shared-api': path.resolve(__dirname, '../shared-api/src'),
    }
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 后端端口
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
