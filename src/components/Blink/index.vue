<template>
  <div class="face" :class="{ paused }">
    <div class="eye"></div>
    <div class="eye"></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  paused: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss" scoped>
.face {
  display: flex;
  align-items: center;
  justify-content: center;
  // width: 42px;
  // padding-top: 8px;
  padding: 0 13px 4px;
  height: 30px;
  // background-color: #292b2c;
  // background-color: #2e2f31;
  background-color: rgba(255, 255, 255, 0.1);
  // border: 1px solid #2c2d2f;
  border: 1px solid #363639;
  border-radius: 8px;

  // &:hover .eye {
  //   animation-play-state: paused;
  // }
}

.paused {
  .eye {
    animation-play-state: paused;
    max-height: 1px;
  }
}

.eye {
  width: 4px;
  height: 8px;
  border-radius: 2px;
  // background-color: #4d4e50;
  background-color: #8c8c8e;
  animation: blink 4s infinite;

  &:last-child {
    margin-left: 6px;
  }
}

@keyframes blink {
  0%,
  100% {
    height: 8px;
  }

  10% {
    height: 8px;
  }

  16% {
    height: 1px;
  }

  22% {
    height: 8px;
  }

  // ----
  44% {
    height: 8px;
  }

  50% {
    height: 1px;
  }

  56% {
    height: 8px;
  }

  // ----

  60% {
    height: 8px;
  }

  66% {
    height: 1px;
  }

  72% {
    height: 8px;
  }
}
</style>
