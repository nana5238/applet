//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    imgUrls: [
      '/images/guidepage/guidepage2.jpg',
      '/images/guidepage/guidepage1.jpg',
    ]
  },
  onReady: function (e) {
    wx.hideNavigationBarLoading();
  },
  bindViewTap(){
    wx.switchTab({
      url: '../index/index'
    })
  },

})
