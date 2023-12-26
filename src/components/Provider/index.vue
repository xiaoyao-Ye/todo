<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { Sign } from '@/api/todo/api'
import { TOKEN } from '@/constant'
import { ipcRenderer } from 'electron'

window.$message = useMessage()

async function refreshToken() {
  const { token } = await Sign.refreshToken()
  localStorage.setItem(TOKEN, token)
}

refreshToken()

const getToken = () => localStorage.getItem(TOKEN)

let socketUrl = 'ws://120.79.135.213:1024'
// let socketUrl = 'ws://localhost:2048'
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
  } else if (event === 'notification') {
    ipcRenderer.send('notification', data)
  }
}

const heartbeat = () => {
  clearInterval(interval)
  clearTimeout(timeout)
  interval = setInterval(() => {
    const key = localStorage.getItem('ws-key')
    let data = JSON.stringify({ event: 'ping', data: { key } })
    socket.send(data)
    timeout = setTimeout(() => {
      lockReconnect = true
      socket.close(3982, key ?? '')
    }, 2000)
  }, 30000)
}

const connectSocket = () => {
  socket = new WebSocket(socketUrl)
  socket.onerror = onerror
  socket.onclose = onclose
  socket.onmessage = onmessage
}

if (getToken()) {
  connectSocket()
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
