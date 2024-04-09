import { defineConfig } from 'vitest/config'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  test: {
    // ...
  },
  plugins: [
    AutoImport({
      imports: [
        'vue',
        // "vue-router",
        'pinia',
        // {
        //   "naive-ui": ["useDialog", "useMessage", "useNotification", "useLoadingBar"],
        // },
      ],
      dts: './src/auto-imports.d.ts',
    }),
  ],
})
