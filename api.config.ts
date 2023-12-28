import { defineConfig } from 'initapi'

export default defineConfig({
  importRequest: 'import { request } from "../index";',
  useRequest: 'request',
  outputDir: './src/api',
  outputType: 'TypeScript',
  multipleFiles: false,
  service: {
    todo: {
      url: 'http://120.79.135.213:1024/api-json',
      commonPrefix: '/api/v1',
    },
  },
})
