import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        additionalData: '@import "./src/globalStyle.less";', // 会在其他的less文件里自动引入
      },
    },
  }
});
