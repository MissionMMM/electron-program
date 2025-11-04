const {
  contextBridge,
  ipcRenderer
} = require('electron')

// 抑制开发环境的安全警告
if (process.env.NODE_ENV === 'development') {
  const originalWarn = console.warn
  console.warn = function (...args) {
    if (args[0] && typeof args[0] === 'string' && args[0].includes('Electron Security Warning')) {
      return // 忽略 Electron 安全警告
    }
    originalWarn.apply(console, args)
  }
}

// 安全地暴露 API
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electronAPI', {
      minimize: () => ipcRenderer.send('window-minimize'),
      maximize: () => ipcRenderer.send('window-maximize'),
      close: () => ipcRenderer.send('window-close'),
      versions: {
        node: process.versions.node,
        chrome: process.versions.chrome,
        electron: process.versions.electron
      },
      platform: process.platform,
      isDev: process.env.NODE_ENV === 'development',
    })
  } catch (error) {
    console.error('Context bridge failed:', error)
  }
} else {
  window.electronAPI = {
    minimize: () => ipcRenderer.send('window-minimize'),
    maximize: () => ipcRenderer.send('window-maximize'),
    close: () => ipcRenderer.send('window-close'),
    versions: {
      node: process.versions.node,
      chrome: process.versions.chrome,
      electron: process.versions.electron
    },
    platform: process.platform,
    isDev: process.env.NODE_ENV === 'development',
  }
}