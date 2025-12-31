
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 因为您的仓库名字是 exe，所以这里要写成 /exe/
export default defineConfig({
  plugins: [react()],
  base: '/exe/', 
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.VITE_GEMINI_API_KEY || '')
  },
  build: {
    outDir: 'dist',
  }
});
