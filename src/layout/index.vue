<template>
  <!-- <div>
    <n-button @click="to('/settings')">settings</n-button>
    <n-button @click="to('/login')">login</n-button>
    <router-view></router-view>
  </div> -->

  <div class="h-full">
    <n-layout>
      <n-layout-header bordered class="h-40px">
        <NavBar />
        <!-- <n-menu mode="horizontal"  :options="menuOptions" /> -->
      </n-layout-header>
      <n-layout has-sider>
        <n-layout-sider
          bordered
          show-trigger
          collapse-mode="width"
          :collapsed-width="64"
          :native-scrollbar="false"
          class="h-[calc(100vh-40px)]">
          <!-- :width="240" -->
          <n-menu :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions" />
        </n-layout-sider>
        <n-layout>
          <router-view></router-view>
        </n-layout>
      </n-layout>
      <!-- <n-layout-footer bordered>Footer Footer Footer</n-layout-footer> -->
    </n-layout>
  </div>
</template>

<script setup lang="ts">
import NavBar from "./components/NavBar.vue"

const router = useRouter()
const to = (path: string) => {
  router.push(path)
}

const inverted = ref(true)

function renderIcon(icon: string) {
  return () => h("div", { class: icon })
}

const menuOptions = [
  {
    label: "且听风吟",
    key: "hear-the-wind-sing",
    icon: renderIcon("i-carbon:chart-radial"),
  },
  {
    label: "1973年的弹珠玩具",
    key: "pinball-1973",
    icon: renderIcon("i-carbon:chart-radar"),
    disabled: true,
    children: [
      {
        label: "鼠",
        key: "rat",
      },
    ],
  },
  {
    label: "寻羊冒险记",
    key: "a-wild-sheep-chase",
    disabled: true,
    icon: renderIcon("i-carbon:chart-radial"),
  },
  {
    label: "舞，舞，舞",
    key: "dance-dance-dance",
    icon: renderIcon("i-carbon:chart-radar"),
    children: [
      {
        type: "group",
        label: "人物",
        key: "people",
        children: [
          {
            label: "叙事者",
            key: "narrator",
            icon: renderIcon("i-carbon:chart-radial"),
          },
          {
            label: "羊男",
            key: "sheep-man",
            icon: renderIcon("i-carbon:chart-radar"),
          },
        ],
      },
      {
        label: "饮品",
        key: "beverage",
        icon: renderIcon("i-carbon:chart-radial"),
        children: [
          {
            label: "威士忌",
            key: "whisky",
          },
        ],
      },
      {
        label: "食物",
        key: "food",
        children: [
          {
            label: "三明治",
            key: "sandwich",
          },
        ],
      },
      {
        label: "过去增多，未来减少",
        key: "the-past-increases-the-future-recedes",
      },
    ],
  },
]
</script>

<style scoped></style>
