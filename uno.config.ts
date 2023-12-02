// uno.config.ts
import { defineConfig, presetWind, presetUno, presetIcons, presetTypography } from "unocss"
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
  shortcuts: {
    // ..
  },
})
