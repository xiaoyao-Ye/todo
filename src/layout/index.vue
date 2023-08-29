<template>
  <div>
    <button @click="to('/login')">login</button>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const to = (path: string) => {
  router.push(path);
};
</script>

<style scoped></style>
