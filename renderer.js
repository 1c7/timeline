const { shell } = require('electron')
const { dialog } = require('electron').remote
const os = require('os')

const file = document.getElementById('open-file')
file.addEventListener('click', (event) => {
  console.log(os.homedir())
  var path = os.homedir() + '/Desktop/'
  // shell.openItem(path)
  // 这个只是打开一个目录而已，不是选择文件

  // 打开文件
  // dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'multiSelections'] }, (filename)=>{
  dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] }
    ]
  }, (filename) => {
    console.log(filename[0])
  })
})