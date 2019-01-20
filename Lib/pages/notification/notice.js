// pages/notification/notice.js
Page({
  data:{
    messages : [
       {
        "id" : 0,
        "title" : "借书成功",
        "content" : "您于2017-06-30成功创建了订单，请按时还书，祝你阅读愉快",
        "show" : true,  
        "signature" : "嚯哈图书馆",   
        "date" : "2017-6-30"
      }
    ] 
  },
  clear_message:function(tap){
    console.log(tap.target.id)
    var id = tap.target.id
    var list = this.data.messages
    list[id].show = false
    this.setData({
      messages : list
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})