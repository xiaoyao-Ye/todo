const isDark = ref(true)

const toggleTheme = () => {
  isDark.value = !isDark.value
}

const collapsed = ref(false)
function toggleCollapse(e: boolean) {
  collapsed.value = e
}

export { toggleTheme, isDark, collapsed, toggleCollapse }
