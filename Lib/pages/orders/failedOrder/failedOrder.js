// pages/orders/unfinishedOrder/unfinishedOrder.js
Page({
  data: {
    "orders": [

    ]
  },

  refresh : function(){
    var that = this;
    var session = wx.getStorageSync("sessionID");
    wx.showLoading({
      title: '正在载入',
    })
    wx.request({
      url: 'https://www.biulibiuli.cn/hhlab/showOrderForm',
      method: 'POST',
      data: {
        session_id: session,
        mode: '2'
      },
      success: function (res) {
        //  console.log(res.data);
        wx.hideLoading();
        that.coverte(res.data);
      }
    })
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

    
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    this.refresh();
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },

  coverte: function (data) {
    var array = new Array();
    var j = 0;
    for (var i = 0; i < data.length; i++) {
      console.log(data[i]);
      var order = {
        "id": data[i].orderid,
        "order_state": '',
        "books": new Array(),
        "order_info": [
          "订单编号： " + data[i].orderid,
          "订单创建时间： " + data[i].ordertime,
        ]
      }
      switch (data[i].orderstate) {
        case 1: order.order_state = 'dn-confirmed'; break;
        case 2: order.order_state = 'dn-paid'; break;
        case 3: order.order_state = 'on-going'; break;
        case 5: order.order_state = 'failed'; break;
        case 4: order.order_state = 'finished'; break;
      }
      // console.log(this.bookGenerate(data[i].books, data[i].book_tot));
      order.books = this.bookGenerate(data[i].books, data[i].book_tot);
      // console.log(order);
      if (order.order_state != 'finished') {
        array[j] = order;
        j++;
      }
    }
    this.setData({
      orders: array
    })

  },


  bookGenerate: function (arr, n) {
    var array = new Array();
    for (var i = 0; i < arr.length; i++) {
      var e = arr[i];
      if (e.book.title.length > 9) {
        e.book.title = e.book.title.substring(0, 9) + "...";
      }
      var book = {
        "book_title": e.book.title,
        "book_content": "图书条码号：" + e.book.barcode,
        "book_img_url": e.book.image,
        "book_url": "{\"isbn13\" : \"" + e.book.isbn13 + "\", \"barcode\" : \"" + e.barcode + "\"}"
      };
      array[i] = book;
      // console.log(book);
    }
    return array;
  },

  showQRcode: function (e) {
    console.log(e);
    var url = e.target.id;
    url = encodeURIComponent(url);
    wx.navigateTo({
      url: '../QRPage/QRPage?url=' + url,
    })
  },

  check_book: function (e) {
    console.log(e);
    var url = e.target.id;
    url = JSON.parse(url);
    wx.navigateTo({
      url: '/pages/bookDetail/bookDetail?unid=' + url.barcode + '&isbn=' + url.isbn13,
    })
  },

  deleteOrder: function (e) {
    var order_id = e.target.id;
    var session = wx.getStorageSync('sessionID');
    console.log("delete order");
    wx.showModal({
      title: '删除订单',
      content: '您确认要删除该订单吗？删除后不可复原',
      success: function (res) {
        if (res.confirm) {
          console.log('删除订单');
          wx.request({
            // wx.request({
            url: 'https://www.biulibiuli.cn/hhlab/OFchangeState',
            data: {
              newState: 'delete',
              orderid: order_id,
              session_id: session
            },
            method: 'POST',
            success: function (res) {
              
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000
              })
            },
            fail: function (res) { console.log('no net connect') },
            complete: function (res) { },
          })
        } else if (res.cancel) {

        }
      }
    })
  },

  toPay: function (e) {
    var order_id = e.target.id;
    var session = wx.getStorageInfoSync('sessionID');
    var that = this;
    wx.request({
      url: 'https://www.biulibiuli.cn/hhlab/OFchangeState',
      method: 'POST',
      data: {
        newState: 'pay',
        orderid: order_id,
        session_id : session
      },
      success: function (res) {
        var ret = JSON.parse(res.data);

        if (!ret.state) {
          wx.showToast({
            title: '支付失败',
          });
        } else {
          wx.showToast({
            title: '支付成功',
          });
        }
        console.log(ret.log);
        this.refresh();        
      }
    })

  }
})
