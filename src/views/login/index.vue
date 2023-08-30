<template>
  <div>
    login
    <a-button @click="back">back</a-button>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

const back = () => {
  router.back()
}
</script>

<style scoped>
div {
  background-color: var(--n-color);
}
</style>
