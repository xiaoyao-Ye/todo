<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { TOKEN } from '@/constant'
import { ipcRenderer } from 'electron'

window.$message = useMessage()

const getToken = () => localStorage.getItem(TOKEN)

// let socketUrl = 'ws://120.79.135.213:2048'
let socketUrl = 'ws://localhost:2048'
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
  console.log(`( event )===============>`, event)
  console.log(`( data )===============>`, data)
  if (event === 'auth-key') {
    localStorage.setItem('ws-key', data)
  } else if (event === 'notification') {
    console.log('notification')
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

// // const eventSource = new EventSource('http://120.79.135.213:1024/api/sse')
// const eventSource = ref<EventSource>()
//   // eventSource.value = new EventSource('/api/v1/sse?token=' + getToken())
//   eventSource.value = new EventSource('/api/v1/sse')
//   eventSource.value.onmessage = ({ data }) => {
//     console.log(`( data )===============>${new Date().toLocaleString()}`, data)
//     // const message = document.createElement('li')
//     // message.innerText = 'New message: ' + data
//     // document.body.appendChild(message)
//   }

// onUnmounted(() => {
//   eventSource.value?.close()
// })
</script>

<style scoped></style>
