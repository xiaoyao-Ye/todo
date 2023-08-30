<template>
  <div>
    settings
    <a-button @click="back">back</a-button>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

const back = () => {
  router.back()
}
</script>

<style scoped></style>
