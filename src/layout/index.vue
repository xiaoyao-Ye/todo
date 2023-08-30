<template>
  <div>
    <NavBar />
    <n-button @click="to('/settings')">settings</n-button>
    <n-button @click="to('/login')">login</n-button>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import NavBar from "./components/NavBar.vue";

const router = useRouter();
const to = (path: string) => {
  router.push(path);
};
</script>

<style scoped></style>
