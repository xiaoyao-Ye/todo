// uno.config.ts
import { defineConfig, presetWind, presetUno, presetIcons, presetTypography } from 'unocss'
// import presetUno from "@unocss/preset-uno"
// import presetIcons from "@unocss/preset-icons"

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      warn: true,
      // prefix: "i-",
      // extraProperties: {
      //   display: "inline-block",
      //   "vertical-align": "middle",
      // },
    }),
    // ...other presets
    presetTypography(),
  ],
  safelist: [
    'text-base',
    // 创建日期
    'i-carbon:text-line-spacing',
    // 截止日期
    'i-carbon:hourglass',
    // 优先级别
    'i-carbon:increase-level',
    // 个人资料
    'i-carbon:identification',
    // 退出登录
    'i-carbon:ibm-cloud-privileged-access-gateway',
    // 设置
    'i-carbon:settings',
    // 今天做点什么呢
    'i-carbon:ai-status-in-progress',
    // 任务列表
    'i-carbon:report',
    // 这些比较重要
    'i-carbon:star-review',
    // 已完成
    'i-carbon:status-acknowledge',
  ],
  shortcuts: {
    // ..
  },
})
