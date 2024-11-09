import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import vuetify from 'vite-plugin-vuetify'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(
      {
        template: {
          transformAssetUrls: {
            
          }
        }
      }
    ),
    vueJsx(),
    vuetify({
      autoImport: true,
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.vue'],
  },
  server: {
    port: 8080,
    proxy: {
      '^/api': {
        target: 'http://localhost:3080', // dev
        changeOrigin: true,
        secure: false,
      },
    }
  },
})
