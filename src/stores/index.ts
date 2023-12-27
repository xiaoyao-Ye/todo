import { defineStore } from 'pinia'

// export const useGlobalStore = defineStore("global", {
//   state: () => {
//     return { isDark: false, collapsed: false }
//   },
//   actions: {
//     toggleTheme() {
//       this.isDark = !this.isDark
//     },
//     toggleCollapse(e: boolean) {
//       this.collapsed = e
//     },
//   },
// })

const storeSetup = () => {
  const isDark = ref(true)

  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  const collapsed = ref(false)
  function toggleCollapse(e: boolean) {
    collapsed.value = e
  }

  const isMax = ref(false)
  function toggleIsMax(e: boolean) {
    isMax.value = e
  }

  const isHappyWork = ref(false)

  return { isDark, toggleTheme, collapsed, toggleCollapse, isMax, toggleIsMax, isHappyWork }
}

export const useGlobalStore = defineStore('global', storeSetup, {
  persist: true,
})
