const { shell } = require('electron')
const { dialog } = require('electron').remote
const os = require('os')


var app = new Vue({
  el: '#container',
  data: {
    a: 1,
    show_video: false,
    files: null,
    video_src: null,
  },
  created: function () {
    console.log('a is: ' + this.a)
  },
  methods: {
    choose() {
      if (this.video_src == null) {
        var inputNode = document.querySelector('input')
        inputNode.click();
      }
    },
    change() {
      this.files = this.$refs.myFiles.files
      var file = this.files[0]
      var URL = window.URL || window.webkitURL
      var fileURL = URL.createObjectURL(file)
      this.video_src = fileURL
      this.show_video = true
    },
  }
})