var app = getApp()
var util = require('../../utils/util.js')
Page({
  data:{
    books: {},
    navigateTitle: "",
    requestUrl: "",
    totalCount: 0,
    isEmpty: true,
    hiddenLoading:false,
    disabledRemind:false,
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
      var sortId = options.sid;
      var sortTitle = options.tt;
      var dataUrl = 'https://www.biulibiuli.cn/hhlab/search_book?mode=1&key=' + sortId;
      this.data.navigateTitle = sortTitle;
      wx.setNavigationBarTitle({
      title: sortTitle,
    })
      this.data.requestUrl = dataUrl;
      util.http(dataUrl, this.processData)
  },
 
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
     wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
   
  },
  onPullDownRefresh: function(event) {
    // 页面相关事件处理函数--监听用户下拉动作
    var refreshUrl = this.data.requestUrl;
    this.data.books = {};
    this.data.isEmpty = true;
    this.data.totalCount = 0;
    util.http(refreshUrl, this.processData)
    wx.showNavigationBarLoading();
   
  },
  onReachBottom: function(event) {
    // 页面上拉触底事件的处理函数

    //之后在和后台交互的时候连接加参数
     var totalCount = this.data.totalCount //当前加载的数量
     var nextUrl = this.data.requestUrl + "beginindex=" + totalCount;
     util.http(nextUrl, this.processData);
     wx.showNavigationBarLoading(); 
  },
  processData:function(BookInfo)
  { 
    console.log(BookInfo);
    var books = [];
    //没有更多啦
    if (BookInfo.length <= 0) {
      var _this = this;
      if (!_this.data.disabledRemind) {
        _this.setData({
          disabledRemind: true
        });
        setTimeout(function () {
          _this.setData({
            disabledRemind: false
          });
        }, 2000);
      }
    }
    for (var idx in BookInfo) {
      var subject = BookInfo[idx];
      var bookId, url, authors, storage, storage_b, subject, title;
      title = subject.title;
      if (title.length > 6) {
        title = title.substring(0, 6) + "...";
      }
      var temp = {
        authors: subject.author,
        storage: subject.storage,
        storage_cb: subject.storage_cb,
        title: title,
        bookId: subject.isbn13,
        image: subject.image,
        ave: subject.grade_ave_f,
      }
      books.push(temp)
    }
    var totalBooks = {}

    //如果要绑定新加载的数据，那么需要同旧有的数据合并在一起
    if (!this.data.isEmpty) {
      totalBooks = this.data.books.concat(books);
    }
    else {
      totalBooks = books;
      this.data.isEmpty = false;
    }
    this.setData({
      books: totalBooks
    });
    this.data.totalCount += 20;
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh()
    this.setData({
      hiddenLoading:true
    })  
  },
   onBookTap : function(event)
  {
      var bookId = event.currentTarget.dataset.bookid;
      console.log(bookId);
      wx.navigateTo({
        url: "../bookDetail/bookDetail?isbn=" + bookId + "&&unid=" + null,
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