// pages/settings/recommendation/recommendation.js
var util = require("../../../utils/util.js")
var app = getApp()
Page({
  data:{
    recommendation : false,
    selected_frequence : 0,
    frequence : [
      "",
      "每月一次",
      "两周一次",
      "每周一次",
      "每周两次",
      "每天一次",
    ]
  },

  update : function(){
    var session = wx.getStorageSync('sessionID');
    var freq = wx.getStorageSync('selected_frequence');

    wx.request({
      url: 'https://www.biulibiuli.cn/hhlab/user/recommend',
      data: {
        session_id : session,
        frequence : freq
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success

        console.log(res.data);
        if(res.data.state){
          wx.showToast({
            title: "设置成功",
            icon: "success",
            duration: 5000
          });
        } else {
          wx.showToast({
            title: "设置失败",
            icon: "success",
            duration: 5000
          });
          console.log(res.data.message);
        }

      },
      fail: function (res) {
        // fail
        wx.showToast({
          title: "网络连接失败",
        })
      },
      complete: function (res) {
        // complete
        // wx.hideToast();
      }
    })
  },

  recommendation : function(e){
    // 推荐开关
    this.setData({
      recommendation : e.detail.value,
    });

    if (!this.data.recommendation) {
      // 不打开推荐则将值赋值为0
      this.setData({
        selected_frequence: 0
      })
    } else {
      this.setData({
        selected_frequence: 1
      })
    }

    app.globalData.open_recommendation = this.data.recommendation;
    app.globalData.selected_frequence = this.data.selected_frequence;

    wx.setStorageSync('open_recommendation', this.data.recommendation)
    wx.setStorageSync('selected_frequence', this.data.selected_frequence);

    this.update();
  },

  bindPickerChange : function(e){
    // 推荐频率的选择
    if(e.detail.value == 0){
      e.detail.value = 1;
    }
    this.setData({
      selected_frequence : e.detail.value
    })
    app.globalData.selected_frequence = e.detail.value
    wx.setStorageSync('selected_frequence', this.data.selected_frequence)
    this.update();
  },

  edit_info : function(e){
    wx.navigateTo({
      url: '../../settings/userInfo/userInfo',
      success: function(res){
        // success
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  },

  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      recommendation: wx.getStorageSync('open_recommendation'),
      selected_frequence: wx.getStorageSync('selected_frequence')
    })

    if (!this.data.recommendation){
      // 不打开推荐则将值赋值为0
      this.setData({
        selected_frequence : 0
      })
      wx.setStorage({
        key: 'selected_frequence',
        data: '0',
      })
    }

    util.updateUserInfo();
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    util.updateUserInfo();
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      recommendation: wx.getStorageSync('open_recommendation'),
      selected_frequence: wx.getStorageSync('selected_frequence')
    })

    if (!this.data.recommendation) {
      // 不打开推荐则将值赋值为0
      this.setData({
        selected_frequence: 0
      })
      wx.setStorage({
        key: 'selected_frequence',
        data: '0',
      })
    }
    
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})