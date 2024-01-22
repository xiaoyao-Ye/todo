<template>
  <n-drawer
    v-model:show="active"
    @update:show="onChange"
    display-directive="show"
    :width="width"
    placement="right"
    to="#variable"
    :style="drawerStyle">
    <n-drawer-content title="详情">
      <n-scrollbar class="px-8">
        <n-form class="pt-4" ref="formRef" label-placement="top" :model="form" :rules="rules" :label-width="80">
          <n-form-item path="title" label="标题">
            <n-input v-model:value="form.title" clearable placeholder="输入标题" />
          </n-form-item>
          <n-form-item path="description" label="详细描述">
            <n-input v-model:value="form.description" placeholder="详细描述" type="textarea" size="small" :autosize="autosize" />
          </n-form-item>
          <n-form-item path="deadline_at" label="截止时间">
            <n-date-picker
              v-model:formatted-value="form.deadline_at"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              clearable
              class="w-full" />
          </n-form-item>
          <n-form-item path="completed_at" label="完成时间">
            <n-date-picker
              v-model:formatted-value="form.completed_at"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              clearable
              class="w-full" />
          </n-form-item>
          <n-form-item path="priority" label="优先级">
            <n-radio-group v-model:value="form.priority" name="radiogroup">
              <n-radio-button v-for="item in radioOptions" :key="item.value" :value="item.value">
                {{ item.label }}
              </n-radio-button>
            </n-radio-group>
          </n-form-item>
          <n-form-item path="today" label="是否添加到今日任务">
            <n-switch :round="false" v-model:value="form.today" />
          </n-form-item>
          <n-form-item path="important" label="是否添加到重要任务">
            <n-switch :round="false" v-model:value="form.important" />
          </n-form-item>
          <n-form-item>
            <n-space class="w-full" align="center" justify="space-between">
              <n-button class="w-52" @click="onDelete">删除</n-button>
              <n-button class="w-52" @click="onSubmit">提交</n-button>
            </n-space>
          </n-form-item>
        </n-form>
      </n-scrollbar>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { FormInst } from 'naive-ui'
import { Todo } from '@/api/todo/api'
import { TodoEntity } from '@/api/todo/typings'
import { useTodoStore } from '@/stores/todo'
import { useGlobalStore } from '@/stores'
const todoStore = useTodoStore()
const { todoList } = storeToRefs(todoStore)

const props = defineProps<{ modelValue: boolean; id: number | undefined }>()
const emits = defineEmits(['update:modelValue'])
const width = computed(() => (useGlobalStore().isPin ? 280 : 502))

const radioOptions = [
  { label: '低', value: 1 },
  { label: '中', value: 2 },
  { label: '高', value: 3 },
]
const autosize = { minRows: 3, maxRows: 5 }
const drawerStyle = {
  top: `calc(var(--g-is-max) / 2)`,
  bottom: `calc(var(--g-is-max) / 2)`,
  right: `calc(var(--g-is-max) / 2)`,
  borderRadius: `var(--g-radius)`,
}

const active = ref(false)
watchEffect(() => {
  active.value = props.modelValue
  if (props.modelValue) getDetails()
})
const onChange = (value: boolean) => {
  emits('update:modelValue', value)
}

const rules = {
  title: { required: true, trigger: 'blur', message: '请输入标题' },
}
const formRef = ref<FormInst | null>(null)
const form = ref({ priority: 2 }) as Ref<TodoEntity>
async function getDetails() {
  const data = await Todo.findOne({ id: props.id! })
  Object.assign(form.value, data)
}

async function onDelete() {
  await Todo.remove({ id: props.id! })
  window.$message.success('删除成功')
  const index = todoList.value.findIndex(item => item.id === props.id)
  todoList.value.splice(index, 1)
  emits('update:modelValue', false)
}
async function onSubmit() {
  await formRef.value?.validate()
  const query = {
    title: form.value.title,
    description: form.value.description,
    today: form.value.today,
    important: form.value.important,
    priority: form.value.priority,
    completed_at: form.value.completed_at,
    deadline_at: form.value.deadline_at,
  }
  await Todo.update({ id: props.id! }, query)
  window.$message.success('更新成功')
  const index = todoList.value.findIndex(item => item.id === props.id)
  todoList.value[index] = form.value
  emits('update:modelValue', false)
}
</script>

<style lang="scss" scoped>
:deep(.n-drawer-body-content-wrapper) {
  padding: 0 !important;
}
</style>
