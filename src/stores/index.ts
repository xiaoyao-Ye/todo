const isDark = ref(true)

const changeTheme = () => {
  isDark.value = !isDark.value
}

export { changeTheme, isDark }
