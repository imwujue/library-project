var app = getApp();
var comments = [];
var pp = null
Page({
  data:{
    Storagevisible : 0,
    localover: '../../images/icon/icon_d_arrow_down.png',
    hideText: true,
    hideClass: 'up',
    array:['1分','2分','3分','4分','5分'],
    index:0,
    comment:'',
    moreComments : false,
    ifPrice:false,//判断当前是否查询到价格
    RealtiveReCommand:{},
    ifBorrow : false,//控制当前图书是否只能借阅
    },
   onLoad: function(options) {
    var bookId = options.isbn;
    var unid = options.unid;
    var InfoUrl = 'https://www.biulibiuli.cn/hhlab/book_details';
    var priceUrl = 'https://www.biulibiuli.cn/hhlab/price'
    this.getBookInfo(InfoUrl , bookId , unid);
    this.getPrice(priceUrl, bookId);
    },

    getPrice : function(priceUrl , bookId)
    {
      var that = this;
       wx.request({
         url: priceUrl,
         data: JSON.stringify({ 
           "isbn": bookId
          }),
         header: { "Content-Type": "json"},
         method: 'POST',
         dataType: '',
         success: function(res) {
           console.log(res);
           that.processPrice(res.data);
         },
         fail: function(res) {},
         complete: function(res) {},
       })
    },
    processPrice(data){
      var message;

      if(data.state == true){//状态无误
        var site_prices = data.site_prices;
        this.setData({
         ifPrice : true,
         site_prices:site_prices
        })
      }
      else{
        message = "对不起 ，当前无法查询到该书的价格"
        this.setData({
          ifPrice:false,
          message : message,
        })
      }
      
       
    },

    getBookInfo :function(InfoUrl , bookId ,unid)
    { 
      var session = wx.getStorageSync('sessionID');
      wx.showNavigationBarLoading()
      var that = this;
      wx.request({
         url: InfoUrl ,
     data: {
      "session_id": session,
      "isbn13": bookId
        },
            method: 'POST', 
     header: {
        "Content-Type": "json"
      },
    success: function(res){
      console.log(res);
      if (res.data== "not exist!"){
         wx.showModal({
           title: '',
           content: '不好意思，图书馆里还没有这本书哟',
           showCancel: false,
           success:function(res){
             wx.navigateBack({
               
             })
           }
         })
      }
      else{
        that.processBookData(res.data, bookId, unid);
      }
      
    },
    fail: function(error) {
      // fail
      console.log(error)
    },
    complete: function(res) {
      // complete
    }
      })
 },

    processBookData(data , bookId , unid)
    { 
        var rating = [];
        var authors = [];
        var ImageUrl;
        var bookid;
        var publisher;
        var title;
        var guide_read = '';
        var storage;
        var storage_books=[];
        var Storagevisible;
        var _class;
        var subclass;
        var grade_ave_f;
        var tempCount = 0;
        
        //馆藏信息的预处理修改
        for (var idx in data.storage_books){
          var subject = data.storage_books[idx];
          var book_id = subject.book_id;
          var book_location;
          var comments;
          var info = '';//书刊状态显示
          var option ='';//操作选择
          var color = '#000';
          if (book_id == unid) {//判断当前是否有选中图书
            color = '#f36a5a';
          }
          else{
            color = '#000';
          }

          switch (subject.book_state){
            case '1': info = "暂无此书", option =""; break;
            case '2': info = "已借出", option = ""; break;
            case '3': info = "已预订", option = ""; break;
            case '4': info = "可借", option = "借阅"; tempCount++; break;
          }
          var temp = {
            book_id: subject.book_id,//unid
            book_location: subject.book_location,
            info : info,
            option : option,
            color : color,
          }
          storage_books.push(temp)
        }
        var subclass = data.subclass;
    
        //控制显示预定按钮
        if (tempCount == 0 ){
          this.setData({
            ifBorrow : true,
          })
        }
        else{
          this.setData({
            ifBorrow: false,
          })
        }
       
       //处理评论时间
       comments = data.comments;
       for(var t in comments){
         comments[t].c_time = this.getLocalTime(comments[t].c_time.time);
       }
       if(comments.length>4){
         comments.length = 4;
         this.setData({
           moreComments : true
         })
       }

        var readyData = {
        bookId : bookId,
        Storagevisible : 0,
        rating : data.rating,
        authors : data.author,
        ImageUrl : data.image,
        bookid : data.bookid,
        publisher:data.publisher,
        isbn13: data.isbn13,
        title: data.title,
        guide_read: data.guide_read,
        comments: comments,
        grade_ave_f: data.grade_ave_f,
        storage : data.storage,
        storage_books : storage_books,
        _class:data._class,
        subclass : data.subclass,
        };
     this.setData(readyData);
     var ReCommandUrl = 'https://www.biulibiuli.cn/hhlab/recommend_subclass?subclass='+subclass;
     this.getReCommBooklist(ReCommandUrl, bookId);
     wx.hideNavigationBarLoading();
   },
    
    //评分选择器
    eventChange : function(e){
      this.setData({
        index : e.detail.value
      });
    },
    
    showall: function () {
      var that = this;
      var hide = that.data.hideText;
      var hideClass = that.data.hideClass == 'up' ? 'down' : 'up';
      that.setData({
        hideText: !hide,
        hideClass: hideClass
      })
    },
    getReCommBooklist(ReCommandUrl,bookId)
    {
      wx.showNavigationBarLoading()
      var that = this;
      wx.request({
         url: ReCommandUrl ,
    data: {},
          method: 'GET', 
     header: {
        "Content-Type": "json"
      },
    success: function(res){
      // success
      that.processReCommanBook(res.data,'RealtiveReCommand');
    },
    fail: function(error) {
      // fail
      console.log(error)
    },
    complete: function(res) {
      // complete
    }
      })

    },
    //处理相关推荐书籍信息
    processReCommanBook(BookInfo,settedkey)
    {
      var books = [];
      var readyData = {};
      for (var idx in BookInfo.message) {
      var subject = BookInfo.message[idx];
      var title = subject.title;
      if (title.length > 6) {
          title = title.substring(0, 6) + "...";
        }
        var temp = {
          title: title,
          bookId: subject.isbn13,
          image: subject.image,
          ave: subject.grade_ave_f,
        }
        books.push(temp)
      }
      readyData[settedkey] = {
        books: books
      }

      this.setData(readyData);
      console.log(readyData)
      wx.hideNavigationBarLoading();

    },
   

     viewBookPostImg: function(e) {
        var src = e.currentTarget.dataset.src;
        wx.previewImage({
            current: src, // 当前显示图片的http链接
            urls: [src] // 需要预览的图片http链接列表
        })
    },
 
//查看馆藏信息
  StorageInfo : function(e){
     if(e.currentTarget.dataset.vis == 0){ 
      this.setData({
      Storagevisible : 1
      })
    }
    else{
       this.setData({
      Storagevisible : 0
       })
    }
  },

  //判断当前操作是预定 还是 借阅
  book_option:function(event){
    //先判断用户是否登录
    if (app.globalData.userInfo == null) {
      console.log("user:is not logged")
      wx.navigateTo({
        url: '/pages/Login/LoginMain',
      })

    } 
    else 
    {
        //在判断用户是否完善个人信息
          var addBorrow = wx.getStorageSync('ableToBorrow');
          if(addBorrow){
            var op = event.currentTarget.dataset.op;
            var unid = event.currentTarget.dataset.unid;
            switch (op) {
               case "借阅": this.AddBorrow(unid); break;
              //case "预定": this.preOrder(unid);break;
            }
          }
          //没有权限，需完善个人信息
          else{
            //弹出提醒
            var containerShow = '';
            var page = this;
            wx.showModal({
              content: "您目前还没有完善个人信息，尚不能借书。请在 “我的” -> “个人设置” 中完善个人信息。",     
              showCancel: false,
              confirmText: "确定",
            
            })

          }     
     }
  },

//加入借书栏
  AddBorrow : function(unid){
      var barcode = unid;
      //console.log(Isbn13);
      if (barcode) {
        var session = wx.getStorageSync('sessionID');
        var that = this;
        var dataUrl = "https://www.biulibiuli.cn/hhlab/cartHandler";
        wx.request({
          url: dataUrl,
          data: {
            "operation": "add",
            "session_id": session,
            "barcode": barcode,
          },
          header: {
            'content-type': 'application/json'
          },
          method: 'POST',
          success: function (res) {
            var content;
            if(res.data == 'add success'){
                 content = "加入借书栏成功";
            }else{
              switch(res.data){
                case "The book is in your cart!":
                      content = "该书已加入借书栏";
                      break;
                case "The book has been borrowed!":
                  content = "下手慢了，书已被借走";
                  break;
              }
              
            }
            console.log(res)
            wx.showToast({
              title: content,
              icon: 'success',
              image: '',
              duration: 1500,
              mask: true,
              success: function(res) {},
              fail: function(res) {},
              complete: function(res) {},
            })
          },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
   
  },
  //预定
  preOrder:function(e){
    var isbn13 = e.currentTarget.dataset.bookid;
    var session = wx.getStorageSync('sessionID');
    if (isbn13) {
          wx.request({
            url: 'https://www.biulibiuli.cn/hhlab/reservation/create',
            data: {
              session_id : session,
                isbn : isbn13
            },
            header: {},
            method: 'POST',
            dataType: '',
            success: function(res) {
                 res = res.data;
                if(res.state == true){
                  wx.showToast({
                    title: "预定成功",
                    icon: 'success',
                    image: '',
                    duration: 1500,
                    mask: true,
                    success: function (res) { },
                    fail: function (res) { },
                    complete: function (res) { },
                  })
                }
                else{
                  var content = res.errMsg;
                  wx.showToast({
                    title: content,
                    image: '',
                    duration: 1500,
                    mask: true,
                    success: function (res) { },
                    fail: function (res) { },
                    complete: function (res) { },
                  })
                }
            },
            fail: function(res) {},
            complete: function(res) {},
          })
              
     }
    },
  

  //推荐部分点击封面到书籍到详情页
   onBookTap : function(event)
  {
      var bookId = event.currentTarget.dataset.bookid;
      console.log(bookId);
      wx.navigateTo({
        url: "../bookDetail/bookDetail?isbn=" + bookId + "&&unid=" + null,
      })
  },

  //获取当前输入评论
   bindTextAreaBlur: function (e) {
     this.setData({
       comment : e.detail.value,
     })
   },
   commit:function(e){
     var rate = e.currentTarget.dataset.rate-'0'+1;
     var comment = e.currentTarget.dataset.comment;
     var isbn = e.currentTarget.dataset.isbn;
     var c_time = Date.parse(new Date());
     var that = this;
     c_time = that.getLocalTime(c_time);
     
     //判断用户是否登录
     if (app.globalData.userInfo == null) {
        wx.showModal({
          title: '',
          content: '您目前还没有登录，尚无法评论',
          showCancel:false,
          confirmText:'确定'
        })

     } 
     else{
       var session = wx.getStorageSync('sessionID');
       var new_com ={};
       wx.request({
         url: 'https://www.biulibiuli.cn/hhlab/addComment',
         data: {
           "isbn13":isbn,
           "grade" : rate,
           "comment": comment,
           "session_id": session,
         },
         header: {},
         method: 'POST',
         dataType: '',
         success: function(res) {
           console.log(res.data);
           if (res.data !="faliure") {
             wx.showToast({
               title: "添加成功",
               icon: "success",
               duration: 5000
             });
             new_com = {
               user_name : res.data,
               rate : rate,
               content : comment,
               c_time :c_time,
             }
             that.data.comments.unshift(new_com);//在头部拼接评论
             comments = that.data.comments;
             if(comments.length>4){
               comments.length = 4;
               that.setData({
                 moreComments: true
               })
             }
             else{
               that.setData({
                 moreComments: false
               })
             }
            
             that.setData({
               comments : comments
             })
           } else {
             wx.showToast({
               title: "添加失败",
               icon: "",
               duration: 1500
             });
             console.log(res.data.message);
           }
         },
         fail: function(res) {},
         complete: function(res) {},
       })
     }
   },
   getLocalTime: function (timeStamp) {     
     var date = new Date();
     date.setTime(timeStamp);
     var y = date.getFullYear();
     var m = date.getMonth() + 1;
     m = m < 10 ? ('0' + m) : m;
     var d = date.getDate();
     d = d < 10 ? ('0' + d) : d;
     var h = date.getHours();
     h = h < 10 ? ('0' + h) : h;
     var minute = date.getMinutes();
     var second = date.getSeconds();
     minute = minute < 10 ? ('0' + minute) : minute;
     second = second < 10 ? ('0' + second) : second;
     return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;       
    } ,

   //加载更多评论
   moreComments:function(e){
      wx.navigateTo({
        url: '../moreComments/moreComments?isbn13=' + e.currentTarget.dataset.isbn,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
   },

   to_personalPage:function(e){
       wx.navigateTo({
         url: '../personalPage/personalPage?userid='+e.currentTarget.dataset.user,
         success: function(res) {},
         fail: function(res) {},
         complete: function(res) {},
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