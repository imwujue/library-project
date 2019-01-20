// followOrfan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mode : '',
    user : '',
    t : '\n',
    hiddenLoading: false,
    people:[],//储存粉丝或者关注者
    requestUrl: 'https://www.biulibiuli.cn/hhlab/follow',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.mode = options.mode;
    this.data.user = options.userid;
    this.getRequest();

    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

   getRequest : function(){
        var that=this; 
         wx.request({
           url: that.data.requestUrl,
           data: {
             mode: that.data.mode,
             userid: that.data.user,
           },
           header: {},
           method: 'POST',
           dataType: '',
           success: function(res) {
             console.log(res);
             that.processData(res.data);
           },
           fail: function(res) {},
           complete: function(res) {},
         })
   },

   processData:function(data){
       var people = data;
       var that = this;
       var msg;
       console.log(people);
       if(this.data.mode == "show_follow"){
         msg = "全部关注";
       }else{
         msg = "全部粉丝";
       }
       this.setData({
         hiddenLoading: true,
         msg : msg,
         people : people
       });
       
   },
   to_personalPage: function (e) {
     wx.navigateTo({
       url: '../personalPage/personalPage?userid=' + e.currentTarget.dataset.user,
       success: function (res) { },
       fail: function (res) { },
       complete: function (res) { },
     })
   },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})