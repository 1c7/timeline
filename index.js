const { app, BrowserWindow, globalShortcut } = require('electron')

require('electron-reload')(__dirname);

function createWindow() {
  // 创建浏览器窗口
  let win = new BrowserWindow({
    width: 1570, height: 940,
    // backgroundColor: '#202020' 
    webPreferences: {
      nodeIntegration: true, // 要加这个不然 render 里面 index.html 的 require 没用
      webSecurity: false, // 为了本地播放视频
    }
  })

  // 然后加载 app 的 index.html.
  win.loadFile('index.html')
  // 开发者工具
  win.webContents.openDevTools()
}

app.on('ready', () => {
  createWindow();
  // 快捷键
  // globalShortcut.register('CommandOrControl+Y', () => {
  //   console.log('s'); // 这个是在命令行，而不是 devtools 里
  // })
})
