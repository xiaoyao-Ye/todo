<template>
  <n-message-provider>
    <StarBg />

    <div class="login">
      <div class="nav flex items-center justify-between px-4 h-40px">
        <span class="i-carbon:crop-growth text-xl text-orange-300"></span>
        <n-space justify="end" align="center">
          <ButtonIcon
            :icon="globalStore.isDark ? 'i-carbon:moon' : 'i-carbon:light'"
            class="font-size-4"
            @click="globalStore.toggleTheme" />
          <ToolButton />
        </n-space>
      </div>

      <!-- <div class="title">do</div> -->
      <div class="w-sm fixed right-10% top-50% translate-y--50% px-8 pt-8 rd">
        <div class="my-2 flex justify-center">
          <Blink :paused="blinkPaused" />
        </div>
        <n-form ref="formRef" label-placement="left" :model="form" :rules="rules">
          <n-form-item path="email">
            <n-auto-complete
              v-model:value="form.email"
              :input-props="{ autocomplete: 'disabled' }"
              :options="options"
              clearable
              placeholder="输入邮箱" />
          </n-form-item>
          <n-form-item path="password">
            <n-input
              v-model:value="form.password"
              type="password"
              show-password-on="click"
              clearable
              placeholder="输入密码"
              :minlength="6"
              :maxlength="16"
              @focus="handleFocus"
              @blur="handleBlur"></n-input>
          </n-form-item>
          <n-form-item path="code" v-if="!isSignIn">
            <n-input v-model:value="form.code" placeholder="输入验证码" />
            <n-button class="ml-2" @click="getVerifyCode">
              {{ countDown === 60 ? "获取验证码" : countDown + "s 后重试" }}
            </n-button>
          </n-form-item>
          <n-form-item>
            <n-button class="w-full" @click="handleValidateClick">{{ isSignIn ? "登录" : "注册" }}</n-button>
          </n-form-item>
        </n-form>

        <div class="cursor-pointer inline-block" @click="isSignIn = !isSignIn">{{ isSignIn ? "去注册" : "去登录" }}</div>
      </div>
    </div>
  </n-message-provider>
</template>

<script setup lang="ts">
import ToolButton from "../../layout/components/NavBar/ToolButton.vue"
import { FormInst, useMessage } from "naive-ui"
import { useGlobalStore } from "@/stores"
import { Sign } from "@/api/todo/api"
const globalStore = useGlobalStore()
const message = useMessage()
window.$message = message
const router = useRouter()
const isSignIn = ref(true)

const blinkPaused = ref(false)
function handleFocus() {
  blinkPaused.value = true
}
function handleBlur() {
  blinkPaused.value = false
}

const options = computed(() => {
  const emailSuffix = ["@163.com", "@yeah.net", "@qq.com", "@gmail.com", "@outlook.com", "@126.com"]
  return emailSuffix.map(suffix => {
    const prefix = form.value.email.split("@")[0]
    return {
      label: prefix + suffix,
      value: prefix + suffix,
    }
  })
})
const rules = {
  email: [
    // { required: true, message: "输入邮箱", trigger: "blur" },
    {
      validator: () =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          form.value.email,
        ),
      message: "请输入正确的邮箱",
      trigger: "blur",
    },
  ],
  password: { required: true, message: "输入密码", trigger: "blur" },
  code: { required: true, message: "输入验证码", trigger: "blur" },
}

const form = ref({ email: "yqcyecong@163.com", password: "123456", code: "" })
const formRef = ref<FormInst | null>(null)
async function handleValidateClick(e: MouseEvent) {
  await formRef.value?.validate()

  if (!isSignIn.value) {
    await Sign.signUp(form.value)
    message.success("注册成功")
    isSignIn.value = true
  }
  const { token } = await Sign.signIn(form.value)
  message.success("welcome!")
  localStorage.setItem("token", token)
  router.push("/")
}

async function getVerifyCode() {
  if (countDown.value !== 60) return
  setCountDown()
  if (!form.value.email) return message.warning("请输入邮箱")
  try {
    await Sign.sendVerificationCode({ email: form.value.email })
  } catch (error) {
    console.log(`( error )===============>`, error)
    clearCountDown()
  }
}
// 设置倒计时
const countDown = ref(60)
const timer = ref()
function setCountDown() {
  countDown.value--
  timer.value = setInterval(() => {
    countDown.value--
    if (countDown.value <= 0) {
      clearCountDown()
    }
  }, 1000)
}
function clearCountDown() {
  countDown.value = 60
  clearInterval(timer.value)
}
onUnmounted(() => {
  clearCountDown()
})
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
}

.nav {
  -webkit-user-select: none;
  -webkit-app-region: drag;

  :deep(.n-button) {
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
