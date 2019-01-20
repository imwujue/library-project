var app = getApp()
var pp = null
function requestUserInfo(that) {
  // 拉起获取用户信息的请求
  console.log(that)
  wx.login({
    success: function () {
      wx.getUserInfo({
        success: function (res) {
          console.log('成功拉起授权')
          app.globalData.userInfo = res.userInfo
          that.setData({
            userInfo: res.userInfo
          })
        },
        fail: function () {
          console.log('获取用户信息失败')
          wx.redirectTo({
            url: '/pages/Login/CellPhone',
            success: function (res) {
              // success
            },
            fail: function (res) {
              // fail
            },
            complete: function (res) {
              // complete
            }
          })

        }
      })
    },
    fail: function () {
      console.log('log in failed')
    }
  })
}
Page({
  data: {
    userInfo: null,
    data_null : false,
  },

  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    if (app.globalData.userInfo == null) {
      console.log("user:is not logged")
      wx.navigateTo({
        url: '/pages/Login/LoginMain',
      })

    } else {

      console.log("user:is logged")
      var user = app.globalData.userInfo;
      this.setData({
        userInfo: user,
        afterLogin: true,
      })
      console.log("user:")
      console.log(user)
    }

  },

  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {

    // 生命周期函数--监听页面显示
    if (app.globalData.userInfo != null) {
      var that = this;
      var user = app.globalData.userInfo;
      var sessionID = wx.getStorageSync('sessionID');//获取sessionid
      this.setData({
        userInfo: user,
      })
      //申请用户年终数据
      wx.request({
        url: 'https://www.biulibiuli.cn/hhlab/yearstatement',
        data: {
            session_id : sessionID
        },
        header: {},
        method: 'POST',
        dataType: 'json',
        success: function (res) { 
          console.log(res);
          that.process(res.data);
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }

    
  },
  process:function(data){
    var rank ,amount, sorts;
    console.log(data);
    if(data ==  'failure'){
      this.setData({
        data_null: true,
        
      })
    }
    else{
      rank = data.defeat * 100;
      amount = data.books;
      sorts = data.subclass;
      sorts = app.bookSorts(sorts);

      this.setData({
        data_null : false,
        rank: rank,
        amount: amount,
        sorts: sorts
      })
    }
   
  },
  

  //去往登录页面
 
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})