
//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    imgUrls:[
    ],
    inputValue:''
  },
  search:function(e){
      this.setData({
          inputValue:'',
      });
      wx.navigateTo({
        url: '../movielist/movielist?type=search&tag='+e.detail.value
      })
  },
  onLoad: function (e) {
      var that = this;
      wx.request({
        url: 'https://api.douban.com/v2/movie/in_theaters',
        method:'POST',
        dataType:"json",
        header: {
            'content-type': 'application/json',
        },
        data:{
          start:0,
          count:5,
        },
        success: function(res) {
          that.setData({
            imgUrls:res.data.subjects,
          });
          console.log(res.data.subjects);
        }
      })
  }
})
