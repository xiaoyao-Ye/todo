<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { Sign, Todo } from '@/api/todo/api'
import { TOKEN } from '@/constant'
import { ipcRenderer } from 'electron'
import { TodoEntity } from '@/api/todo/typings'
import { NButton } from 'naive-ui'
import { useTodoStore } from '@/stores/todo'

window.$message = useMessage()
const notification = useNotification()

function createNotification(todo: TodoEntity) {
  const n = notification.create({
    title: todo.title,
    content: todo.description,
    meta: `截止时间: ${todo.deadline_at}`,
    closable: false,
    action: () =>
      h(
        NButton,
        {
          text: true,
          type: 'primary',
          onClick: () => n.destroy(),
        },
        { default: () => '已读' },
      ),
  })
}

async function refreshToken() {
  const { token } = await Sign.refreshToken()
  localStorage.setItem(TOKEN, token)
}

const getToken = () => localStorage.getItem(TOKEN)

const isDev = import.meta.env.MODE === 'development'
let socketUrl = isDev ? 'ws://localhost:2048' : 'ws://120.79.135.213:1024'
let socket: WebSocket
let lockReconnect = false
let interval: NodeJS.Timeout | undefined = undefined
let timeout: NodeJS.Timeout | undefined = undefined

const onerror = () => {
  connectSocket()
}

const onclose = () => {
  if (lockReconnect) {
    connectSocket()
  }
}

const onmessage = (e: MessageEvent) => {
  heartbeat()
  const { event, data } = JSON.parse(e.data)
  if (event === 'auth-key') {
    localStorage.setItem('ws-key', data)
    Todo.reRegisterTask()
  } else if (event === 'notification') {
    ipcRenderer.send('notification', data)
    createNotification(data)
  } else if (event === 'auth-fail') {
    console.log('401')
  }
}

const heartbeat = () => {
  clearInterval(interval)
  clearTimeout(timeout)
  interval = setInterval(() => {
    const key = localStorage.getItem('ws-key')
    let data = JSON.stringify({ event: 'ping', data: { key } })
    socket.send(data)
    if (socket.readyState === 3) connectSocket()
    timeout = setTimeout(() => {
      lockReconnect = true
      socket.close(3982, key ?? '')
    }, 2000)
  }, 30000)
}

const connectSocket = () => {
  socket = new WebSocket(socketUrl + '?token=' + getToken())
  socket.onerror = onerror
  socket.onclose = onclose
  socket.onmessage = onmessage
}

if (getToken()) {
  connectSocket()
  refreshToken()
  // 首次进入应用刷新列表
  const todoStore = useTodoStore()
  todoStore.toggleCategory('today')
}

ipcRenderer.on('close', () => {
  lockReconnect = false
  if (socket.readyState !== 3) {
    socket.close(3982, localStorage.getItem('ws-key') ?? '')
  }
})

onUnmounted(() => {
  lockReconnect = false
  if (socket && socket.readyState !== 3) {
    socket.close(3982, localStorage.getItem('ws-key') ?? '')
  }
  clearInterval(interval)
  clearTimeout(timeout)
})
</script>

<style scoped></style>
