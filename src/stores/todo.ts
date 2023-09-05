const category = ref("all")

const toggleCategory = (targetCategory: string) => {
  category.value = targetCategory
}

export { category, toggleCategory }
