const {
  app,
  BrowserWindow,
  ipcMain,
} = require('electron')
const path = require('path')
const fs = require('fs')

// 窗口尺寸配置
const WINDOW_CONFIG = {
  width: 1200,
  height: 800,
  minWidth: 1200,
  minHeight: 800
}

let mainWindow;

function createWindow() {
  const isDev = process.env.NODE_ENV === 'development'

  mainWindow = new BrowserWindow({
    ...WINDOW_CONFIG,
    titleBarStyle: 'hidden',
    icon: path.join(__dirname, 'public', 'icon.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      webSecurity: true,
      allowRunningInsecureContent: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // 强制打开开发者工具
  // mainWindow.webContents.openDevTools();

  if (isDev) {
    mainWindow.loadURL('http://localhost:8080')
    mainWindow.webContents.openDevTools()
  } else {
    // 生产环境 - 添加详细的路径检查
    const indexPath = path.join(__dirname, 'dist', 'index.html')
    console.log('📁 尝试加载文件:', indexPath)

    // 检查文件是否存在
    if (fs.existsSync(indexPath)) {
      console.log('✅ index.html 文件存在')
      mainWindow.loadFile(indexPath)
        .then(() => {
          console.log('✅ 页面加载成功')
        })
        .catch(error => {
          console.error('❌ 页面加载失败:', error)
          // 显示错误页面
          showErrorPage(mainWindow, '页面加载失败: ' + error.message)
        })
    } else {
      console.error('❌ index.html 文件不存在')
      // 列出 dist 目录内容
      const distPath = path.join(__dirname, 'dist')
      if (fs.existsSync(distPath)) {
        console.log('📁 dist 目录内容:', fs.readdirSync(distPath))
      } else {
        console.error('❌ dist 目录不存在')
      }
      showErrorPage(mainWindow, 'index.html 文件未找到')
    }
  }

  return mainWindow
}

// 显示错误页面
function showErrorPage(win, message) {
  const errorHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>应用启动错误</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; text-align: center; }
        .error { color: #d63031; margin: 20px 0; }
        .info { color: #666; margin: 10px 0; }
      </style>
    </head>
    <body>
      <h1>应用启动错误</h1>
      <div class="error">${message}</div>
      <div class="info">请检查控制台输出获取详细信息</div>
    </body>
    </html>
  `
  win.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(errorHtml)}`)
}

// 仅保留窗口控制IPC
ipcMain.on('window-minimize', () => {
  BrowserWindow.getFocusedWindow()?.minimize()
})

ipcMain.on('window-maximize', () => {
  const win = BrowserWindow.getFocusedWindow()
  if (win) {
    win.isMaximized() ? win.unmaximize() : win.maximize()
  }
})

ipcMain.on('window-close', () => {
  BrowserWindow.getFocusedWindow()?.close()
})

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})