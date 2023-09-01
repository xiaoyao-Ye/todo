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
          :collapsed="collapsed"
          @update:collapsed="toggleCollapse"
          class="h-[calc(100vh-40px)]">
          <Sider />
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
import NavBar from "./components/NavBar/index.vue"
import Sider from "./components/Sider/index.vue"
import { collapsed, toggleCollapse } from "@/stores"
</script>

<style scoped></style>
