export function renderIcon(icon: string) {
  return () => h('div', { class: `i-${icon} text-base` })
}
