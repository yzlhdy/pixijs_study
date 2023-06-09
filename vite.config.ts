import path from 'path'
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [vue(),
  Unocss(),
  AutoImport({
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.vue$/,
      /\.vue\?vue/, // .vue
      /\.md$/, // .md
    ],
    imports: ['vue', 'vue-router', 'vue-i18n', {
      '@vueuse/core': [
        'useAsyncState',
        'useInfiniteScroll'
      ],

    }],
    dts: 'src/auto-imports.d.ts',
    dirs: [
      'src/store/modules',
    ]
  }),
  Components({
    // allow auto load markdown components under `./src/components/`
    extensions: ['vue',],
    // allow auto import and register components used in markdown
    include: [/\.vue$/, /\.vue\?vue/,],
    dts: 'src/components.d.ts',

  }),
  ],
})
