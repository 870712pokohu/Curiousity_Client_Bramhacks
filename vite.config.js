import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import vuetify from 'vite-plugin-vuetify'

const userGroup = process.env.USER_GROUP || 'user';

let port;

switch(userGroup){
  case 'user':
    port = 3000;
    console.log('User group is user');
    break;
  case 'admin':
    port = 3001;
    console.log('User group is admin');
    break;
  default:
    port = 3000;
    break;
}

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
    port: port,
  },
})
