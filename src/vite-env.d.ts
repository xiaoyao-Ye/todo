/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface Indexable {
  [key: string]: any
}

interface Window {
  $message: MessageApiInjection
}
