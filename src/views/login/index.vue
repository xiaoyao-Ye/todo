<template>
  <n-message-provider>
    <div class="login">
      <!-- <div class="title">do</div> -->
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
    </div>
  </n-message-provider>
</template>

<script setup lang="ts">
import { Sign } from "@/api/todo/api"
import { FormInst, useMessage } from "naive-ui"
const message = useMessage()
const router = useRouter()
// const isSignIn = ref(true)

const rules = {
  username: { required: true, message: "输入邮箱", trigger: "blur" },
  password: { required: true, message: "输入密码", trigger: "blur" },
}

const form = ref({ username: "username", password: "password" })
const formRef = ref<FormInst | null>(null)
async function handleValidateClick(e: MouseEvent) {
  await formRef.value?.validate()
  const res = await Sign.signIn(form.value)
  console.log(`( res )===============>`, res)
  return
  message.success("welcome!")
  localStorage.setItem("token", "token")
  router.push("/")
}
</script>

<style scoped>
.login {
  height: 100vh;
  -webkit-user-select: none;
  -webkit-app-region: drag;

  * {
    -webkit-app-region: no-drag;
    -webkit-user-select: auto;
  }
}

.title {
  /* font-size: 200px;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 20px #fff; */
}
</style>
