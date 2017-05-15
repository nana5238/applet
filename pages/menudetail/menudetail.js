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
      url: 'https://api.jisuapi.com/recipe/detail?appkey=245b31714072866d&id='+e.id,
      method:'POST',
      header: {
          'content-type': 'application/jsonp',
      },
      success: function(res) {
        wx.setNavigationBarTitle({
          title: res.data.result.name
        });
        that.setData({
          obj:res.data.result,
        });

      }
    });
  }
})
