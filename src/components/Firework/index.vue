<template>
  <canvas
    id="canvas"
    style="width: 100%; height: 100%; top: 0; left: 0; z-index: 99999; position: fixed; pointer-events: none"></canvas>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/stores'

let balls: Ball[] = []
let longPressed = false
let longPress: NodeJS.Timeout
let multiplier = 0
let width: number, height: number
let origin: { x: number; y: number }
let normal: { x: number; y: number }
let ctx: CanvasRenderingContext2D | null
const colors = ['#F73859', '#14FFEC', '#00E0FF', '#FF99FE', '#FAF15D']
let canvas: HTMLCanvasElement

function randBetween(min: number, max: number) {
  return Math.floor(Math.random() * max) + min
}

class Ball {
  x: number
  y: number
  angle: number
  multiplier: number
  vx: number
  vy: number
  r: number
  color: string

  constructor(x = origin.x, y = origin.y) {
    this.x = x
    this.y = y
    this.angle = Math.PI * 2 * Math.random()
    if (longPressed == true) {
      this.multiplier = randBetween(14 + multiplier, 15 + multiplier)
    } else {
      this.multiplier = randBetween(6, 12)
    }
    this.vx = (this.multiplier + Math.random() * 0.5) * Math.cos(this.angle)
    this.vy = (this.multiplier + Math.random() * 0.5) * Math.sin(this.angle)
    this.r = randBetween(8, 12) + 3 * Math.random()
    this.color = colors[Math.floor(Math.random() * colors.length)]
  }
  update() {
    this.x += this.vx - normal.x
    this.y += this.vy - normal.y
    normal.x = (-2 / window.innerWidth) * Math.sin(this.angle)
    normal.y = (-2 / window.innerHeight) * Math.cos(this.angle)
    this.r -= 0.3
    this.vx *= 0.9
    this.vy *= 0.9
  }
}

let ripples: Ripple[] = []
class Ripple {
  x: number
  y: number
  radius: number
  maxRadius: number
  color: string
  lifespan: number
  maxLifespan: number
  speed: number = 4

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this.radius = 0
    this.maxRadius = Math.max(window.innerWidth, window.innerHeight)
    this.color = useGlobalStore().isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)'
    this.lifespan = 0
    this.maxLifespan = 50 // 设置波纹的生命周期为60帧
  }

  update() {
    this.radius += this.speed
    this.lifespan++
    this.speed *= 0.98 // 每帧将速度增加5%
  }

  shouldRemove() {
    return this.radius >= this.maxRadius || this.lifespan >= this.maxLifespan
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save()
    const str = useGlobalStore().isDark ? 'rgba(255, 255, 255' : 'rgba(0, 0, 0'
    ctx.strokeStyle = `${str}, ${1 - this.lifespan / this.maxLifespan})`
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.stroke()
    ctx.restore()
  }
}

function addRipple(x: number, y: number) {
  const ripple = new Ripple(x, y)
  ripples.push(ripple)
}

function updateSize() {
  canvas.width = window.innerWidth * 2
  canvas.height = window.innerHeight * 2
  canvas.style.width = window.innerWidth + 'px'
  canvas.style.height = window.innerHeight + 'px'
  ctx!.scale(2, 2)
  width = canvas.width = window.innerWidth
  height = canvas.height = window.innerHeight
  origin = {
    x: width / 2,
    y: height / 2,
  }
  normal = {
    x: width / 2,
    y: height / 2,
  }
}

function pushBalls(count = 1, x = origin.x, y = origin.y) {
  for (let i = 0; i < count; i++) {
    balls.push(new Ball(x, y))
  }
}

function onMouseDown(e: MouseEvent) {
  pushBalls(randBetween(10, 20), e.clientX, e.clientY)
  addRipple(e.clientX, e.clientY)
  // document.body.classList.add('is-pressed')
  longPress = setTimeout(() => {
    // document.body.classList.add('is-longpress')
    longPressed = true
  }, 500)
  cancelAnimationFrame(animationFrameId)
  loop()
}

function onMouseUp(e: MouseEvent) {
  clearInterval(longPress)
  if (longPressed == true) {
    // document.body.classList.remove('is-longpress')
    pushBalls(randBetween(50 + Math.ceil(multiplier), 100 + Math.ceil(multiplier)), e.clientX, e.clientY)
    addRipple(e.clientX, e.clientY)
    longPressed = false
  }
  // document.body.classList.remove('is-pressed')
  cancelAnimationFrame(animationFrameId)
  loop()
}

let animationFrameId: number

function loop() {
  if (!ctx) return
  ctx.fillStyle = 'rgba(255, 255, 255, 0)'
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i]
    if (b.r < 0) continue
    ctx.fillStyle = b.color
    ctx.beginPath()
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2, false)
    ctx.fill()
    b.update()
  }
  for (let i = 0; i < ripples.length; i++) {
    const ripple = ripples[i]
    ripple.update()
    if (ripple.shouldRemove()) {
      ripples.splice(i, 1)
      i--
    } else {
      ripple.draw(ctx!)
    }
  }
  if (longPressed == true) {
    multiplier += 0.2
  } else if (!longPressed && multiplier >= 0) {
    multiplier -= 0.4
  }
  removeBall()
  // requestAnimationFrame(loop)
  if (balls.length > 0 || ripples.length > 0) animationFrameId = requestAnimationFrame(loop)
}

function removeBall() {
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i]
    if (b.x + b.r < 0 || b.x - b.r > width || b.y + b.r < 0 || b.y - b.r > height || b.r < 0) {
      balls.splice(i, 1)
    }
  }
}

function clickEffect() {
  if (canvas.getContext && window.addEventListener) {
    ctx = canvas.getContext('2d')
    updateSize()
    window.addEventListener('resize', updateSize, false)
    // loop()
    window.addEventListener('mousedown', onMouseDown, false)
    window.addEventListener('mouseup', onMouseUp, false)
  } else {
    console.log('canvas or addEventListener is unsupported!')
  }
}
onMounted(() => {
  canvas = document.getElementById('canvas') as HTMLCanvasElement
  clickEffect()
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSize)
  window.removeEventListener('mousedown', onMouseDown)
  window.removeEventListener('mouseup', onMouseUp)
})
</script>

<style>
/* .is-pressed {
  cursor: pointer;
} */
</style>
