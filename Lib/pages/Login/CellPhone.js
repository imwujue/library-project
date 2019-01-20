var app = getApp();
var page = Object;
var timing = 0;
var tap_text = 'heheh';
// var start_counting = false;
var t_out;

function count_down(){
  // 倒计时函数
  if(!page.data.on_counting){
    //如果没有在计时状态的话，启动计时
    console.log('counting start')
    timing = 60
    page.setData({
      on_counting : true
    })
    // console.log('touchend')
    t_out = setInterval(count_down,1000)
  }

  if(timing == 0){
    // counting down finished
    clearInterval(t_out)
    page.setData({
      on_counting : false,
      button_text: '获取验证码'
    })
    return
  } else {
    // 正常计时状态
    timing--
    tap_text = timing + 's'
    page.setData({
      button_text : tap_text
    })
  }
}
// ------------------------------------------------------------
Page({
  data:{
    button_text: '',
    tap_color:'#9ccb8c',
    focus_cell:true,
    check_code:false,
    check_code_check:false,
    submit_button:true,
    timing: '50',
    on_counting: false,
    is_phoneNumOk : false,
    loading_logo: false,
    tel_num : 0,
    cellPhoneUser : {
      avatarUrl : '../../images/index/avantar.png',
      nickName : '手机用户'
    }
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    // String2
    this.setData({
      button_text: '载入中',
      on_counting: false
    })
  },

  phone_input:function(e){
    // 监听用户的手机号码输入，是否达到有效的11位，否则不亮起发送按钮
    // console.log(e.detail.value.length)
    if(e.detail.value.length == 11){

      var pattern = /^1[3|5|7|8][0-9]\d{8}$/;
      
      if (pattern.test(e.detail.value)) {
        this.setData({
          tap_color: '#449617',
          is_phoneNumOk: true,
          tel_num : e.detail.value
        })
      }

    } else {
      this.setData({
        tap_color:'#9ccb8c',
        is_phoneNumOk : false
      })
    }
  },

  check_code_check:function(input){
    // 检查验证码长度，以及手机号码合法性，成功后亮起提交按钮
    if(input.detail.value.length == 6){
      if(this.data.is_phoneNumOk == true){
        this.setData({
          submit_button : false
        })
        return
      }
    }
    this.setData({
      // disable 按钮
      submit_button : true
    })
  },

  confirm_button:function(touchend){
    // 按下获取验证码按钮
    console.log()
    if(this.data.on_counting){
      // 时间未到，失败
      console.log('is counting ')
      return;
    } else {
      // console.log(this.data.is_phoneNumOk)
      if(this.data.is_phoneNumOk == false){
        // 如果没有输入有效的电话号码，不触发发送按钮
        return
      }

      var session = wx.getStorageSync('sessionID');
      wx.request({
        url: 'https://www.biulibiuli.cn/hhlab/login_bytel',
        data: {
          mode : 1,
          TEL: this.data.tel_num,
          session_id: session
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          // success
          if(res.data == 'success'){
            wx.showToast({
              title: '验证码已发送',
            })
          } else {
            wx.showToast({
              title: '发送失败，请重试',
            })
          }
        },
        fail: function(res) {
          // fail
          wx.showToast({
            title: '网络连接异常',
          })
        },
        complete: function(res) {
          // complete
           count_down();
        }
      })
      this.setData({
        focus_cell:false,
        check_code:true
      })
      count_down();
    }
  },

  return_bc:function(){
    wx.navigateBack({
      
    })
  },

  login:function(e){
    // 提交表单，申请登录
    this.setData({
      loading_logo : true,
      submit_button : true
    })
    console.log(e);

    var session = wx.getStorageSync('sessionID');
    session = encodeURIComponent(session);

    var that = this;

    wx.request({
      url: 'https://www.biulibiuli.cn/hhlab/login_bytel',
      data: {
        mode : '2',
        TEL: e.detail.value.phone_num,
        captchare: e.detail.value.check_code,
        session_id : session
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        if (res.data == 'success'){
          // 验证码验证成功后
          if (app.globalData.userInfo == null){
            var User = that.data.cellPhoneUser;
            User.nickName +=  e.detail.value.phone_num;
            that.setData({
              cellPhoneUser: User
            })
            app.globalData.userInfo = User;
          }

          wx.showToast({
            title: '登录成功',
          });

          wx.navigateBack({
            
          })
        } else {
          console.log(res.data)
        }
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
        that.setData({
          loading_logo: false,
          submit_button: false
        })
      }

    })
    // e.phone_num
    // e.check_code
  },

  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    // String3
    page = this
    this.setData({
      button_text: '获取验证码'
    })
  },

  onShow:function(){
    // 生命周期函数--监听页面显示

    // String4
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
    // String5
  },

  onUnload:function(){
    // 生命周期函数--监听页面卸载
    // String6
  },

  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    // String7
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
    // String8
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})