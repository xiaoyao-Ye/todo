<template>
  <!-- <div class="card w-full flex items-center mb-4 p-4 border rd" @dblclick.self="onShowEdit"
    @click.self="emits('showDetail', todo.id)"> -->
  <div class="card w-full flex items-center mb-4 p-4 border rd" @click.self="customClick">
    <ButtonIcon :icon="isCompleteIcon" @click="toggleComplete" />

    <!-- <span v-if="!showEdit" :class="['px-2 flex-1 n-input--focus', todo.completed_at && 'completed']"
      @dblclick.self="onShowEdit"> -->
    <span v-if="!showEdit" :class="['px-2 flex-1 n-input--focus', todo.completed_at && 'completed']" @click.self="customClick">
      {{ todo.title }}
    </span>
    <n-input
      v-if="showEdit"
      ref="inputRef"
      :class="['mx-2 flex-1', todo.completed_at && 'completed']"
      v-model:value="titleValue"
      type="textarea"
      :autosize="{ minRows: 1 }"
      @blur="onCloseEdit"
      @keyup.enter="onEdit" />

    <ButtonIcon :icon="isCollectIcon" class="justify-self-end" @click="toggleCollect" />

    <n-popconfirm @positive-click="removeTodo">
      <template #trigger>
        <ButtonIcon icon="i-carbon:trash-can" class="justify-self-end ml-2" />
      </template>
      确认删除该项?
    </n-popconfirm>
  </div>
</template>

<script setup lang="ts">
import { Todo } from '@/api/todo/api'
import { TodoEntity } from '@/api/todo/typings'
import { useTodoStore } from '@/stores/todo'
import { formatDate } from '@/utils/date'
import { InputInst } from 'naive-ui/es/input/src/interface'
const message = useMessage()
const todoStore = useTodoStore()
const { todoList, category } = storeToRefs(todoStore)

const props = defineProps<{ todo: TodoEntity; index: number }>()
const emits = defineEmits(['showDetail'])

async function toggleComplete() {
  const completed_at = props.todo.completed_at ? '' : formatDate()
  await Todo.update({ id: props.todo.id! }, { completed_at })
  todoList.value[props.index].completed_at = completed_at
  if ((completed_at && category.value !== 'completed') || (!completed_at && category.value === 'completed')) {
    todoList.value.splice(props.index, 1)
  }
}

const isCompleteIcon = computed(() => {
  return props.todo.completed_at ? 'i-carbon:checkmark-outline' : 'i-carbon:radio-button'
})

async function toggleCollect() {
  const important = !props.todo.important
  await Todo.update({ id: props.todo.id! }, { important })
  todoList.value[props.index].important = important
  category.value === 'important' && todoStore.onRefresh()
}

const isCollectIcon = computed(() => {
  return props.todo.important ? 'i-carbon:star-filled' : 'i-carbon:star'
})

async function removeTodo() {
  await Todo.remove({ id: props.todo.id! })
  todoList.value.splice(props.index, 1)
  message.success('已删除该事项')
  if (todoList.value.length < 10) {
    todoStore.onGetList()
  }
}

const titleValue = ref()
const inputRef = ref<InputInst | null>(null)
const showEdit = ref(false)
function onCloseEdit() {
  showEdit.value = false
  titleValue.value = null
}

const timer = ref<NodeJS.Timeout | null>(null)
// 判断是单击还是双击, 处理对应的逻辑
function customClick() {
  if (timer.value) {
    clearTimeout(timer.value)
    timer.value = null
    onShowEdit()
    return
  }
  timer.value = setTimeout(() => {
    timer.value = null
    // showDetail.value = true;
    emits('showDetail', props.todo.id)
  }, 300)
}
function onShowEdit() {
  titleValue.value = props.todo.title
  showEdit.value = true
  nextTick(() => {
    inputRef.value?.focus()
  })
}

async function onEdit() {
  const title = titleValue.value.replace(/\n/g, '')
  await Todo.update({ id: props.todo.id! }, { title })
  todoList.value[props.index].title = title
  onCloseEdit()
}
</script>

<style lang="scss" scoped>
.card {
  user-select: none;
  /* Standard syntax */
  cursor: pointer;
  background-color: var(--n-card-color);
  border-color: var(--n-divider-color);
  transition:
    color 0.3s var(--n-bezier),
    background-color 0.3s var(--n-bezier),
    box-shadow 0.3s var(--n-bezier),
    border-color 0.3s var(--n-bezier);

  .n-input {
    background-color: transparent;
  }

  :deep(.n-input__border) {
    display: none;
  }

  :deep(.n-input__state-border) {
    display: none;
  }
}

.completed {
  color: var(--n-text-color3);
  text-decoration: line-through;

  :deep(textarea) {
    color: var(--n-text-color3);
    text-decoration: line-through;
  }
}
</style>
