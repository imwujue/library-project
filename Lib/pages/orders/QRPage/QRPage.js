// pages/main/index.js
var QR = require("../../../utils/qrcode.js");
var page ;
var timing;
var tap_text;
var t_out;

function count_down() {
  // 倒计时函数
  if (!page.data.on_counting) {
    //如果没有在计时状态的话，启动计时
    console.log('counting start')
    timing = 60
    page.setData({
      on_counting: true
    })
    // console.log('touchend')
    t_out = setInterval(count_down, 1000)
  }

  if (timing == 0) {
    // counting down finished
    clearInterval(t_out)
    page.setData({
      on_counting: false,
    })
    page.refresh();
    return
  } else {
    // 正常计时状态
    timing--
    tap_text = '';
    page.setData({
      button_text: tap_text
    })
  }
}

Page({
  data: {
    /*
    官网说hidden只是简单的控制显示与隐藏，组件始终会被渲染，
    但是将canvas转化成图片走的居然是fail，hidden为false就是成功的
    所以这里手动控制显示隐藏canvas
    */
    maskHidden: true,
    imagePath: '',
    on_counting : false,
    button_text : '正在载入',
    target_url : ''
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options);
    this.setData({
      target_url: decodeURIComponent(options.url)
    })
  },

  onReady: function () {
    //hahha
    page = this;
    this.refresh();
  },

  onShow: function () {

    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
    clearInterval(t_out)
    this.setData({
      on_counting: false,
    })
  },

  onUnload: function () {
    // 页面关闭
    clearInterval(t_out)
    this.setData({
      on_counting: false,
    })
  },
  //适配不同屏幕大小的canvas
  setCanvasSize: function () {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / 686;//不同屏幕下canvas的适配比例；设计稿是750宽
      var width = res.windowWidth / scale;
      var height = width;//canvas画布为正方形
      size.w = width;
      size.h = height;
    } catch (e) {
      // Do something when catch error
      console.log("获取设备信息失败" + e);
    }
    return size;
  },

  createQrCode: function (url, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    QR.qrApi.draw(url, canvasId, cavW, cavH);
    var that = this;
    //二维码生成之后调用canvasToTempImage();延迟3s，否则获取图片路径为空
    var st = setTimeout(function () {
      that.canvasToTempImage();
      clearTimeout(st);
    }, 3000);

  },
  //获取临时缓存照片路径，存入data中
  canvasToTempImage: function () {
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function (res) {
        var tempFilePath = res.tempFilePath;
        console.log(tempFilePath);
        that.setData({
          imagePath: tempFilePath,
        });
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },



  page_return : function(){
    // return button
    wx.navigateBack({})
  },

  riseError : function(){
    // if there is an error
    this.page_return()
  },

  refresh:function (){
    // fresh the qr code

    if (this.data.on_counting){
      return;
    }

    // if the target url is invalid
    if (this.data.target_url.length == 0){
      // if there is not url
      this.riseError();
    }

    // form a new url
    var urlb = this.data.target_url;
    var time = Date.now();
    urlb += '+' + time;
    console.log(urlb);

    var size = this.setCanvasSize();//动态设置画布大小
    // fresh the qrcode
    this.createQrCode(urlb, "mycanvas", size.w, size.h);
    count_down();
  }

})
