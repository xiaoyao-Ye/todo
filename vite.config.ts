import { rmSync } from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron-renderer'
import pkg from './package.json'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import UnoCSS from 'unocss/vite'

const resolve = (PATH: string) => {
  return path.resolve(__dirname, PATH)
}

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  rmSync('dist-electron', { recursive: true, force: true })

  const isServe = command === 'serve'
  const isBuild = command === 'build'
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG

  return {
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
    plugins: [
      UnoCSS(),
      vue(),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'pinia',
          {
            'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
          },
        ],
        dts: './src/auto-imports.d.ts',
      }),
      Components({
        dts: './src/components.d.ts',
        resolvers: [
          NaiveUiResolver(),
          // AntDesignVueResolver({s
          //   importStyle: false,
          // }),
        ],
      }),
      electron([
        {
          // Main-Process entry file of the Electron App.
          entry: 'electron/main/index.ts',
          onstart(options) {
            if (process.env.VSCODE_DEBUG) {
              console.log(/* For `.vscode/.debug.script.mjs` */ '[startup] Electron App')
            } else {
              options.startup()
            }
          },
          vite: {
            build: {
              sourcemap,
              minify: isBuild,
              outDir: 'dist-electron/main',
              rollupOptions: {
                external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
              },
            },
          },
        },
        {
          entry: 'electron/preload/index.ts',
          onstart(options) {
            // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete,
            // instead of restarting the entire Electron App.
            options.reload()
          },
          vite: {
            build: {
              sourcemap: sourcemap ? 'inline' : undefined, // #332
              minify: isBuild,
              outDir: 'dist-electron/preload',
              rollupOptions: {
                external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
              },
            },
          },
        },
      ]),
      // Use Node.js API in the Renderer-process
      renderer(),
    ],
    // server:
    //   process.env.VSCODE_DEBUG &&
    //   (() => {
    //     // const url = new URL(pkg.debug.env.VITE_DEV_SERVER_URL)
    //     return {
    //       // host: url.hostname,
    //       // port: +url.port,
    //       proxy: {
    //         "/api": {
    //           target: "http://43.136.108.102:1024",
    //           changeOrigin: true,
    //           // rewrite: path => path.replace(/^\/api\/v1/, ""),
    //         },
    //       },
    //     }
    //   })(),
    server: {
      proxy: {
        '/api': {
          // target: "http://43.136.108.102:1024",
          // target: 'http://120.79.135.213:1024',
          target: 'http://localhost:2048',
          changeOrigin: true,
          // rewrite: path => path.replace(/^\/api\/v1/, ""),
        },
      },
    },
    clearScreen: false,
  }
})
