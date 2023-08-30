<template>
  <div>
    settings
    <n-button @click="back">back</n-button>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const back = () => {
  router.back();
};
</script>

<style scoped></style>
