import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      //  如果要是识别当前路径就会跳转到目标地址 , 目标地址
      '/admin': 'http://localhost:3001',
    }
  }
})
