//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
      obj:{
      },
      commentobj:{

      },
  },

  onLoad: function (e) {
    var that = this;
    wx.request({
      url: 'https://api.douban.com/v2/movie/subject/'+e.id,
      method:'POST',

      header: {
          'content-type': 'application/jsonp',
      },
      success: function(res) {
        wx.setNavigationBarTitle({
          title: res.data.title
        });
        that.setData({
          obj:res.data,
        });
        console.log(that.data.obj);
      }
    });
  }
})
