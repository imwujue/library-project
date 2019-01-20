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
var util = require('../../utils/util.js')
Page({
  data:{
    userInfo: null,
    afterLogin: false,
    beforeLogin: true,
    t: '\n',
    char_lt: "<",
    char_gt: ">",
    books:[],
    curNav: 1,
    curIndex: 0,
    cartTotal: 0,
    session_id: null,
    no_more:false,
    color: "#fdc441",

  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    wx.setNavigationBarTitle({
      title: "借书栏",
    })
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
        beforeLogin: false,
      })
      console.log("user:")
      console.log(user)
    }

   
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
   
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
   
    if (app.globalData.userInfo != null) {
      var user = app.globalData.userInfo;
      this.setData({
        userInfo: user,
        afterLogin: true,
        beforeLogin: false,
      })
      var session = wx.getStorageSync('sessionID');
      var that = this;
      var dataUrl = "https://www.biulibiuli.cn/hhlab/cartHandler";
      wx.request({
        url: dataUrl,
        data: {
          "operation": "show",
          "session_id": session,
        },
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          that.processData(res.data)
        },
        fail: function (res) { },
        complete: function (res) { },
      })
         //清除cartTotal
        var cartTotal = 0;
         this.setData({
           cartTotal: cartTotal
         });
    }
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    if (app.globalData.userInfo != null) {
      var user = app.globalData.userInfo;
      this.setData({
        userInfo: user,
        afterLogin: true,
        beforeLogin: false,
      })
      var session = wx.getStorageSync('sessionID');
      var that = this;
      var dataUrl = "https://www.biulibiuli.cn/hhlab/cartHandler";
      wx.request({
        url: dataUrl,
        data: {
          "operation": "show",
          "session_id": session,
        },
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          that.processData(res.data)
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
  
  },
 
  processData: function (BookInfo) {
    var that = this;
   if(BookInfo.length > 0)
   {
     this.setData({
       no_more: false,
     })
     //处理信息 并加载数据
     var books = [];
     var bookId, url, authors, storage, storage_b, subject, title, selected, unid ;
     for (var idx in BookInfo) {
      var subject = BookInfo[idx];
      title = subject.title;
      if (title.length >= 10) {
        title = title.substring(0, 10) + "...";
      }
     
      var temp = {
        title: title,
        unid: subject.barcode,//图书的唯一编号
        bookId: subject.isbn13,
        url: subject.image,
        authors: subject.author,
        storage: subject.storage,
        storage_cb: subject.storage_cb,
        selected : false,
      }
      books.push(temp)
    }
    this.setData({
      books: books
    });
    wx.hideNavigationBarLoading();
   }
    else{
     this.setData({
       no_more: true,
     })
    }
   
  },
 
  selectList(e) {
    var color;
    var cartTotal= this.data.cartTotal;
    const index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
    let books = this.data.books;                    // 获取购物车列表
    const selected = books[index].selected;         // 获取当前商品的选中状态
    if(selected == false)
    {
      cartTotal+=1;
    }
    else{
      cartTotal-=1;
    }
    if(cartTotal > 2 || cartTotal ==0){
       color = "#ddd";
    }
    else {
      color = "#fdc441";
    }
    books[index].selected = !selected;              // 改变状态
    this.setData({
       books: books,
       cartTotal : cartTotal,
       color : color
    });

  },

  deleteList(e) {
    var color;
    var cartTotal = this.data.cartTotal;
    const index = e.currentTarget.dataset.index;
    let books = this.data.books;
    const selected = books[index].selected;         // 获取当前商品的选中状态
        const unid = books[index].unid;
        this.deletfromDatabase(unid);
        if (selected == true)
     {
      cartTotal -= 1;
    }
      if (cartTotal <= 2 && cartTotal > 0) {
        color = "#fdc441";
      }
        else{
          color = "#ddd";
        }
   books.splice(index, 1);  // 删除购物车列表里这个商品
    this.setData({
      books: books,
      cartTotal : cartTotal,
      color : color,
    });

  },
  deletfromDatabase : function(unid){
  var session = wx.getStorageSync('sessionID');
  var that = this;
  var dataUrl = "https://www.biulibiuli.cn/hhlab/cartHandler";
  wx.request({
    url: dataUrl,
    data: {
      "operation": "delete",
      "session_id": session,
      "barcode": unid,
    },
    header: {
      'content-type': 'application/json'
    },
    method: 'POST',
    success: function (res) {
      var content;
      if (res.data != 'delete success') {
        content = "此书不在借书栏里了～,下拉页面刷新看看";
        wx.showToast({
          title: content,
          icon: '',
          image: '',
          duration: 1500,
          mask: true,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
      console.log(res)
    
    },
    fail: function (res) { },
    complete: function (res) { },
  })

},
  CreateOrder : function(e){
    var num = e.currentTarget.dataset.num;
    var books = e.currentTarget.dataset.se_books;
    var that = this;
    var cartTotal = this.data.cartTotal;
    if(num <= 2  && num > 0)
    { 
      var se_books=[];
      var session_id = wx.getStorageSync('sessionID');
      for (var idx in books) {
        if (books[idx].selected == true) {
          //选中状态
          se_books.push(books[idx].unid);
          //之后删除掉在原列表中选中商品
          books.splice(idx, 1);
          cartTotal-=1;//总数减一
        }
      }
      var barcode1, barcode2;
      if (se_books.length == 2) {
        barcode1 = se_books[0];
        barcode2 = se_books[1];
        
      }
      else {
        barcode1 = se_books[0];
      }


      wx.request({
        url: 'https://www.biulibiuli.cn/hhlab/createOrderForm',
        data: {
          "barcode1": barcode1,
          "barcode2": barcode2,
          "session_id": session_id,
        },
        header: {},
        method: 'POST',
        dataType: '',
        success: function (res) {
          if (res.data != "create order form failure") {
            wx.showModal({
              title: "创建成功，请在未完成订单中查看并完成支付",
              content: '',
              showCancel:false,
              confirmText:"好的",
            })
            that.setData({
              books: books,
              cartTotal:cartTotal
            });

          } else {
            wx.showToast({
              title: "创建失败，请稍后再试",
              icon: "",
              duration: 1500
            });
            console.log(res.data.message);
          }
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  
     
  },

  //去往登录页面
  toLogin: function () {
   wx.navigateTo({
      url: '/pages/Login/LoginMain',
    })
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