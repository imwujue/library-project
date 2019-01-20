
//index.js
//获取应用实例
var app = getApp()
var pp = null
var util = require("../../utils/util.js")

function updateImg(userInfo){
  var session = wx.getStorageSync('sessionID');
  var img = userInfo.avatarUrl;

  wx.request({
    url: 'https://www.biulibiuli.cn/hhlab/user/update_image',
    data: {
      session_id: session,
      avatar: img
    },
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function (res) {
      // success
      var reciveData = res.data;
      console.log(reciveData);

      if(reciveData.state){
        console.log('update user image success');
      } else {
        console.log('update image failed' + reciveData.msg);        
      }


    }
  })
}


function requestUserInfo(that){
    // 拉起获取用户信息的请求
  wx.login({
      success: function (res) {
        console.log(res);
        wx.getUserInfo({
          success: function (res) {
            console.log('成功拉起授权');
            console.log(res);
            // app.globalData.userInfo = res.userInfo
            that.setData({
              userInfo: res.userInfo
            })
          },
          fail : function(){
            console.log('获取用户信息失败')   
            wx.redirectTo({
              url: '/pages/Login/CellPhone',
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
          }
        })
      },
      fail: function(){
        console.log('log in failed')
      }
    })
}

function isUserLogged(){
  // check if the user have authorised the User data

  var userInfo = app.globalData.userInfo;

  if(userInfo){
    return true;
  } else {
    return false;
  }

}

//-------------- end of static functions ------------------


Page({
  data: {
    userInfo: {}
  },

// onLoad get user data
  onLoad: function (res) {
    console.log(res)
    console.log('onLoad')
    //调用应用实例的方法获取全局数据
    typeof pp == Object
    pp = this
    if(isUserLogged()){
      console.log('aready loaded')
      wx.navigateBack({
        
      })
    } else{        
      requestUserInfo(this)
      // that.data.userInfo = app.getUserInfo()
    }
    util.updateUserInfo();
  },



// tap the log with wechat button
  Log_WeChat: function(){
    if(this.data.userInfo != null){

      // if we have the user data, then send the request
      var session = wx.getStorageSync('sessionID');
      session = encodeURIComponent(session);

      var openid = wx.getStorageSync('openID');
      openid = encodeURIComponent(openid);

      wx.request({
        url: 'https://www.biulibiuli.cn/hhlab/login',
        data: {
          session_id : session,
          open_id : openid
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          // success
          var reciveData = res.data;
          console.log(reciveData)
          if(reciveData == 'success'){
            // mark user have logged
            app.globalData.userInfo = pp.data.userInfo;

            updateImg(pp.data.userInfo);

            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000
            })

            wx.navigateBack({

            })
          } else {
            console.log('登录失败')
            wx.showToast({
              title: '登录失败',
              duration: 2000
            })
          }

        },
        fail: function(res) {
          // fail
        },
        complete: function(res) {
          // complete
        }
      })
    } else{
      // we don't have the user data, ask to have the authorization
      wx.redirectTo({
        url: './CellPhone',
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
      // redirectTo CellPhone pages
    }
  },

// log with cell phone number
  Log_Phone: function(tap) {
    wx.redirectTo({
      url: '/pages/Login/CellPhone',
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
  }
  
})
