//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    imgUrls: [
      '/images/guidepage/guidepage1.jpg',
      '/images/guidepage/guidepage2.jpg',
    ]
  },
  onReady: function (e) {
    wx.hideNavigationBarLoading();
  },
  bindViewTap(){
    console.log(1);
    wx.switchTab({
      url: '../index/index'
    })
  },

})
