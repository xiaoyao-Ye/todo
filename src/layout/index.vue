<template>
  <div>
    <NavBar />
    <a-button @click="to('/settings')">settings</a-button>
    <a-button @click="to('/login')">login</a-button>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import NavBar from "./components/NavBar.vue"

const router = useRouter()
const to = (path: string) => {
  router.push(path)
}
</script>

<style scoped></style>
