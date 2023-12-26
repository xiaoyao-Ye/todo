import { defineConfig } from 'initapi'

export default defineConfig({
  importRequest: 'import { request } from "../index";',
  useRequest: 'request',
  outputDir: './src/api',
  outputType: 'TypeScript',
  multipleFiles: false,
  service: {
    todo: {
      url: 'http://localhost:2048/api-json',
      commonPrefix: '/api/v1',
    },
  },
})
