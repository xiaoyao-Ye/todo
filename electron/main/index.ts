import { app, BrowserWindow, shell, ipcMain, Menu, Tray, Notification } from 'electron'
import { release } from 'node:os'
import { join } from 'node:path'

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.js    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.DIST_ELECTRON = join(__dirname, '..')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL ? join(process.env.DIST_ELECTRON, '../public') : process.env.DIST

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')
let tray: Tray | null = null

async function createWindow() {
  win = new BrowserWindow({
    title: 'Ghosteye todo',
    fullscreenable: false,
    icon: join(process.env.VITE_PUBLIC, 'book.png'),
    width: 1024,
    height: 638,
    // 4:3
    minWidth: 768,
    minHeight: 576,
    // minWidth: 430,
    // minHeight: 600,
    // backgroundColor: "#00000000",
    transparent: true,
    frame: false,
    opacity: 1,
    // titleBarStyle: "hidden",
    // fullscreen: true,
    // titleBarOverlay: true,
    // titleBarOverlay: {
    //   color: "#2f3241",
    //   symbolColor: "#74b1be",
    //   height: 40,
    // },
    webPreferences: {
      // false 将禁止同源策略
      // webSecurity: false,
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  Menu.setApplicationMenu(null)

  // 设置任务栏菜单/图标/hover标题
  tray = new Tray(join(process.env.VITE_PUBLIC, 'book.png'))

  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: '退出',
        click: () => {
          win.webContents.send('close')
          win.destroy()
        },
      },
    ]),
  )
  tray.setToolTip('todo')
  tray.on('click', () => {
    win.show()
    win.focus()
    win.setSkipTaskbar(false)
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    // electron-vite-vue#298
    win.loadURL(url)
    // Open devTool if the app is not packaged
    win.webContents.openDevTools()
  } else {
    win.loadFile(indexHtml)
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
  // win.webContents.on('will-navigate', (event, url) => { }) #344

  // 窗口大小变化
  win.on('resize', () => {
    win.webContents.send('window.maximized', win.isMaximized())
    // win.webContents.send("window.maximized", false)
  })

  win.on('focus', () => {
    win.webContents.send('focus')
  })

  win.on('close', event => {
    win.hide()
    win.setSkipTaskbar(true)
    event.preventDefault()
  })
}

app.whenReady().then(async () => {
  await createWindow()
  // 移除Electron菜单, 好像没效果
  // Menu.setApplicationMenu(null)
})

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// 任务栏右键菜单
// app.setUserTasks([
//   {
//     program: process.execPath,
//     arguments: '--new-window',
//     iconPath: join(process.env.VITE_PUBLIC, 'favicon.ico'),
//     iconIndex: 0,
//     title: 'test',
//     description: 'Create a new window',
//   },
// ])

// New window example arg: new windows url
// ipcMain.handle("open-win", (_, arg) => {
//   const childWindow = new BrowserWindow({
//     webPreferences: {
//       preload,
//       nodeIntegration: true,
//       contextIsolation: false,
//     },
//   })

//   if (process.env.VITE_DEV_SERVER_URL) {
//     childWindow.loadURL(`${url}#${arg}`)
//   } else {
//     childWindow.loadFile(indexHtml, { hash: arg })
//   }
// })
let currentSize = [0, 0]
ipcMain.on('window.pin', event => {
  if (win.isMaximized()) {
    win.unmaximize()
  }
  currentSize = win.getSize()
  win.setAlwaysOnTop(true)
  win.setResizable(false)
  win.setMinimumSize(430, 600)
  win.setSize(430, 600)
  // event.reply('window.pin')
})

ipcMain.on('window.unpin', event => {
  win.setAlwaysOnTop(false)
  win.setResizable(true)
  win.setSize(currentSize[0], currentSize[1])
  win.setMinimumSize(768, 576)
  // event.reply('window.unpin')
})

// 最大化/恢复正常
ipcMain.on('win.changeWinSize', event => {
  if (win.isMaximized()) {
    win.unmaximize()
    // event.reply("window.maximized", false)
  } else {
    win.maximize()
    // event.reply("window.maximized", true)
  }
})

// 最小化
ipcMain.on('win.minimize', () => {
  win.minimize()
})

// 关闭
ipcMain.on('win.close', () => {
  win.close()
  // app.quit()
})

ipcMain.on('win.opacity', (event, val) => {
  win.setOpacity(val / 100)
})
// 设置开机自动启动
// const ex = process.execPath
// // 监听设置开机自启动
// ipcMain.on('set-launch-with-windows', (event, args) => {
//   // 需要在应用打包后，将可执行文件路径写进注册表里。
//   if (app.isPackaged) {
//     //应用是否打包
//     // log.info('是否开机自启动参数:', args)
//     app.setLoginItemSettings({
//       openAtLogin: args,
//       openAsHidden: false,
//       path: ex,
//       args: ['--openAsHidden'],
//     })
//   }
// })

// 将时间戳转化为本地时间

// 接收消息提示 notification
ipcMain.on('notification', (event, todo) => {
  let option = {
    title: todo.title, // 通知标题
    // body: new Date(todo.deadline_at).toLocaleString(), // 内容
    body: todo.deadline_at, // 内容
    icon: join(process.env.VITE_PUBLIC, 'book.png'), // 图标
    // href: "https://www.cnblogs.com/binglicheng/", // 地址
  }
  let notification = new Notification(option)
  notification.show()
  notification.on('click', () => {
    win.show()
    win.focus()
    win.setSkipTaskbar(false)
  })
})
