const { shell } = require('electron')
const { dialog } = require('electron').remote
const os = require('os')
var parser = require('subtitles-parser');

var app = new Vue({
  el: '#container',
  data: {
    show_video: false, // 显示视频
    video_file: null, // 视频文件
    video_src: null, // 视频文件地址
    subtitle_file: null, // 字幕文件
    subtitle_array: null, // 字幕内容
    selected_line: null, // 已选中行
  },
  created: function () {
  },
  methods: {
    choose() {
      if (this.video_src == null) {
        this.$refs.input_video.click();
      }
    },
    change_video() {
      this.video_file = this.$refs.input_video.files
      var file = this.video_file[0]
      var URL = window.URL || window.webkitURL
      var fileURL = URL.createObjectURL(file)
      this.video_src = fileURL
      this.show_video = true
    },
    choose_subtitle() {
      if (this.subtitle_array == null) {
        this.$refs.input_subtitle.click();
      }
    },
    change_subtitle() {
      this.subtitle_file = this.$refs.input_subtitle.files
      var file = this.subtitle_file[0];
      var that = this;

      const reader = new FileReader();
      reader.onload = function (e) {
        var content = e.target.result;
        var data = parser.fromSrt(content);
        that.subtitle_array = data;
      };
      reader.readAsText(file);
    },
    choose_line(item){
      // console.log(item);
      console.log(item.id);
      this.selected_line = item.id;
    },
  }
})