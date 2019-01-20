
function http(url, callBack) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      "Content-Type": "json"
    },
    success: function (res) {
      callBack(res.data);
    },
    fail: function (error) {
      console.log(error)
    }
  })
}

function reLogIn(){
  // 调用微信登录，建立第三方session
  wx.login({
    success: function (res) {
      console.log(res);
      if (res.errMsg == 'login:ok') {
        // 如果登录成功，发送到服务器换取session key
        wx.request({
          url: 'https://www.biulibiuli.cn/hhlab/login/create_session',
          method: 'POST',
          data: {
            code: res.code
          },
          success: function (res) {
            console.log(res);
            // 将结果写入到微信本地保存
            if (res.data.state == 'success') {
              wx.setStorageSync('sessionID', res.data.sessionID);
              wx.setStorageSync('openID', res.data.openID);
            } else {
              wx.clearStorageSync('sessionID');
            }
          },
          failed: function () {
            wx.clearStorageSync('sessionID');
          }
        })
      }
    },
    fail: function () {
      wx.clearStorageSync('sessionID');
      console.log('log in failed')
    }
  })
}


function checkLogIn(){

  // 检查微信与服务器的session 是否过期，如果微信过期则重新调用登录
  // 如果服务器过期，则重新创建session
  var session = wx.getStorageSync('sessionID');
  var openid = wx.getStorageSync('openID');

  wx.checkSession({
    success: function () {
      //session 未过期，并且在本生命周期一直有效
      wx.request({
        url: 'https://www.biulibiuli.cn/hhlab/user/check_session',
        method: 'POST',
        data: {
          session_id : session,
          open_id : openid
        },
        success: function (res) {
          console.log(res);
          if (res.data.state) {
            // 请求成功
            
            if (res.data.errMsg == 'expired'){
              console.log('user session expired');

              wx.setStorage({
                key: 'sessionID',
                data: res.data.content,
              })

            } else {
              console.log('user session not expired');
            }


          } else {

            console.log('failed to check session');

          }
        },
        failed: function () {
          // wx.clearStorageSync('sessionID');
        }
      })


    },
    fail: function () {
      //登录态过期
      reLogIn();
    }
  })


}

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}


function updateUserInfo() {
  var session = wx.getStorageSync('sessionID');
  wx.request({
    url: 'https://www.biulibiuli.cn/hhlab/user/info',
    method: 'POST',
    data: {
      session_id: session,
    },

    success: function (res) {
      if (res.data.message == 'success') {
        // success 
        console.log('get info success')
        var net_user = JSON.parse(res.data.user_detail);

        wx.setStorageSync('ableToBorrow', false);

        console.log(net_user);
        if (net_user.phone_num != null) {
          if (net_user.id_num != null) {
            var id = new String(net_user.id_num);
            console.log(id);
            if (id.length != 0 && net_user.id_type != 0) {
              wx.setStorageSync('ableToBorrow', true);
              console.log("able to borrow!");
            }
          }
        }
      } else {
        wx.setStorageSync('ableToBorrow', false);
      }
    },
    fail: function (res) {
      console.log('连接失败')
    }
  })
}

module.exports = {
  updateUserInfo: updateUserInfo,
  formatTime: formatTime,
  http: http,
  checkLogIn : checkLogIn
}

