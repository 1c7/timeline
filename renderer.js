const { shell } = require('electron')
const { dialog } = require('electron').remote
const os = require('os')
const parser = require('subtitles-parser');
const hotkeys = require('hotkeys-js');

hotkeys('f5', function(event, handler){
  // Prevent the default refresh event under WINDOWS system
  event.preventDefault() 
  alert('you pressed F5!') 
});

hotkeys('ctrl+a,ctrl+b,r,f', function(event,handler) {
  switch(handler.key){
    case "ctrl+a":alert('you pressed ctrl+a!');break;
    case "ctrl+b":alert('you pressed ctrl+b!');break;
    case "r":alert('you pressed r!');break;
    case "f":alert('you pressed f!');break;
  }
});

hotkeys('space', function(event,handler) {
  var el = app.$refs.video_element;
  if (el.paused){
    el.play();
  }else{
    el.pause();
  }
});

var app = new Vue({
  el: '#container',
  data: {
    show_video: false, // 显示视频
    video_file: null, // 视频文件
    video_src: null, // 视频文件地址
    subtitle_file: null, // 字幕文件
    subtitle_array: null, // 字幕内容
    selected_line: null, // 已选中行
    playing: false, //
    time: null, // 当前时间
  },
  created: function () {
    // console.log(this.$refs);
  },
  mounted: function () {
    var that = this;
    var video = this.$refs.video_element;
    video.addEventListener('loadeddata', (event) => {
      console.log('Yay! The readyState just increased to  ' +
        'HAVE_CURRENT_DATA or greater for the first time.');
    });

    video.addEventListener('play', (event) => {
      console.log('开始播放');
      that.playing = true;
    });

    video.addEventListener('pause', (event) => {
      console.log('暂停');
      that.playing = false;
    });

    video.addEventListener('ended', (event) => {
      console.log('到达结尾');
    });

    video.addEventListener('ratechange', (event) => {
      console.log('The playback rate changed.');
    });
    
    video.addEventListener('timeupdate', (event) => {
      that.time = video.currentTime
    });
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
    choose_line(item) {
      // console.log(item);
      console.log(item.id);
      this.selected_line = item.id;
    },
    play_pause() {
      // console.log('asdasd');
      // console.log(this.$refs.video_element)
      // this.$refs.video_element.pause();
      // this.$refs.video_element.play();
    }
  }
})