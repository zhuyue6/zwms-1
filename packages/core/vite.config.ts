import { defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import basicSsl from '@vitejs/plugin-basic-ssl'
import config from './config'

export default defineConfig({
  base: config.path,
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: /^@data-warehouse\/(.*)/, replacement: '@data-warehouse/$1/src' },
    ],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.d.ts', '.json'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
      },
    },
  },
  server: {
    host: true,
    port: 8080,
    https: true,
    cors: true,
  },
  plugins: [
    vuePlugin(),
    basicSsl(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
