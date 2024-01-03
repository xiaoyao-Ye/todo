<template>
  <div class="p-4 h-[calc(100vh-40px-var(--g-is-max))] page-bg">
    <div class="pb-4 mb-4 border-b border-[var(--n-divider-color)]">
      <n-page-header subtitle="back" @back="$router.replace('/')"></n-page-header>
    </div>
    <div class="w-xl m-auto">
      <div>开发中</div>
      <div>头像</div>
      <div>密码</div>
      <div>生日</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
