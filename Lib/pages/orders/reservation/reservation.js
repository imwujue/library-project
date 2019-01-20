// pages/orders/reservation/reservation.js
Page({
  data:{ 
    "reservation_orders" : {
      "valid_orders" :[
        // {
        //   "id" : "12312311",
        //   "order_state" : "waiting",
        //   "people_waiting" : 3,
        //   "books" : 
        //     {
        //       "book_title" : "白夜行",
        //       "book_content" : "book_id is 1231234",
        //       "book_img_url" : "http://www.baidu.com/img/bd_logo1.png",
        //       "book_url" : "12321312"
        //     },
        //   "order_info" : [
        //     "订单创建时间： 12039102491",
        //     "订单编号: 123123123123",
        //     "12131231321"
        //   ]
        // },{
        //   "id" : "12312312",
        //   "order_state" : "ready",

        //   "books" : 
        //     {
        //       "book_title" : "白夜行",
        //       "book_content" : "book_id is 1231234",
        //       "book_img_url" : "http://www.baidu.com/img/bd_logo1.png",
        //       "book_url" : "12321312"
        //     },
        //   "order_info" : [
        //     "订单创建时间： 12039102491",
        //     "订单编号: 123123123123",
        //     "12131231321"
        //   ]
        // },{
        //   "id" : "12312312",
        //   "order_state" : "out_of_time",
        //   "books" : 
        //     {
        //       "book_title" : "白夜行",
        //       "book_content" : "book_id is 1231234",
        //       "book_img_url" : "http://www.baidu.com/img/bd_logo1.png",
        //       "book_url" : "12321312"
        //     },
        //   "order_info" : [
        //     "订单创建时间： 12039102491",
        //     "订单编号: 123123123123",
        //     "12131231321"
        //   ]
        // }
      ],
      
    }
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    var session = wx.getStorageSync('sessionID');
    var that = this;
    wx.request({
      url: 'https://www.biulibiuli.cn/hhlab/reservation/get',
      data: {
        session_id: session
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data);
        var result = res.data;
        if (result.state) {
          var tem = that.data.reservation_orders;
          tem.valid_orders = result.content;
          var arr = new Array();

          for(var i = 0; i < tem.valid_orders.length; i++){
            if (tem.valid_orders[i].order_state != 'failed'){
              arr.push(tem.valid_orders[i]);
            }
          }
          
          tem.valid_orders = arr;

          that.setData({
            reservation_orders: tem
          })
        }
      }
    })
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },

  cancleReservation : function(target){

    var orderID = target.target.id;
    var session = wx.getStorageSync('sessionID');
    var that = this;

    wx.showModal({
      title: '提示',
      content: '您确认要取消订单吗？取消后将从预订队列中退出',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
          wx.request({
            url: 'https://www.biulibiuli.cn/hhlab/reservation/update',
            method : 'POST',
            data : {
              session_id : session,
              action : 'cancel',
              order_id : orderID
            },
            success : function(res){
              if(res.data.state){
                wx.showToast({
                  title: '订单取消成功',
                })
              } else {
                wx.showToast({
                  title: '取消失败',
                })
                console.log(res.data.message);
              }
              that.onShow();
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  confirmOrder: function (target) {
    var orderID = target.target.id;
    var that = this;
    var session = wx.getStorageSync('sessionID');
    wx.showModal({
      title: '提示',
      content: '您确认现在确认您的预订吗？确认预订后，将会为您生成借阅订单，您将有20分钟的时间到管理员处处理您的借阅',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
          wx.request({
            url: 'https://www.biulibiuli.cn/hhlab/reservation/update',
            method: 'POST',
            data: {
              session_id: session,
              action: 'confirm',
              order_id: orderID
            },
            success: function (res) {
              if (res.data.state) {
                wx.showModal({
                  title: '提示',
                  content: '订单已成功确认，已为您生成订单，请到未完成订单处查看',
                })
              } else {
                wx.showToast({
                  title: '取消失败',
                })
                console.log(res.data.message);
              }
              that.onShow();              
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  
  deleteOrder : function(target){
    var orderID = target.target.id;
    var that = this;

    var session = wx.getStorageSync('sessionID');
    wx.showModal({
      title: '提示',
      content: '确认要删除您的预订订单吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
          wx.request({
            url: 'https://www.biulibiuli.cn/hhlab/reservation/update',
            method: 'POST',
            data: {
              session_id: session,
              action: 'delete',
              order_id: orderID
            },
            success: function (res) {
              if (res.data.state) {
                wx.showModal({
                  title: '提示',
                  content: '订单已删除',
                })
              } else {
                wx.showToast({
                  title: '删除失败',
                })
                console.log(res.data.message);
              }
              that.onShow();              
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  viewBook : function(e){
    var url = e.target.id;
    url = JSON.parse(url);
    wx.navigateTo({
      url: '/pages/bookDetail/bookDetail?unid=' + null + '&isbn=' + url,
    })

  }
  
})