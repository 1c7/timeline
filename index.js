const { app, BrowserWindow } = require('electron')

function createWindow () {
  // 创建浏览器窗口
  let win = new BrowserWindow({ width: 1570, height: 940 })

  // 然后加载 app 的 index.html.
  win.loadFile('index.html')
}

app.on('ready', createWindow)
