import { defineConfig } from "initapi"

export default defineConfig({
  importRequest: 'import { request } from "../index";',
  useRequest: "request",
  outputDir: "./src/api",
  outputType: "TypeScript",
  multipleFiles: false,
  service: {
    todo: {
      // url: "http://43.136.108.102:1024/api-json",
      url: "http://localhost:1024/api-json",
      commonPrefix: "/api/v1",
    },
  },
})
