<template>
  <div
    class="w-sm fixed right-10% top-50% translate-y--50% px-8 pt-8 rd"
    style="box-shadow: var(--n-box-shadow1); background-color: var(--n-color)">
    <n-form ref="formRef" label-placement="left" :model="form" :rules="rules">
      <n-form-item path="username">
        <n-input v-model:value="form.username" placeholder="输入邮箱" />
      </n-form-item>
      <n-form-item path="password">
        <n-input
          v-model:value="form.password"
          type="password"
          show-password-on="click"
          placeholder="输入密码"
          :minlength="6"
          :maxlength="16"></n-input>
      </n-form-item>
      <n-form-item>
        <n-button class="w-full" @click="handleValidateClick">验证</n-button>
      </n-form-item>
    </n-form>
  </div>
</template>

<script setup lang="ts">
import { FormInst, useMessage } from "naive-ui"
const message = useMessage()
const router = useRouter()

const rules = {
  username: { required: true, message: "输入邮箱", trigger: "blur" },
  password: { required: true, message: "输入密码", trigger: "blur" },
}

const form = ref({ username: "username", password: "password" })
const formRef = ref<FormInst | null>(null)
function handleValidateClick(e: MouseEvent) {
  e.preventDefault()
  formRef.value?.validate(errors => {
    if (errors) {
      console.log(errors)
      message.error("username or password error!")
      return
    }
    message.success("welcome!")
    router.push("/")
  })
}
</script>

<style scoped></style>
