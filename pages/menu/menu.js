
//menu.js
//获取应用实例
var app = getApp();
Page({
  data: {
    imgUrls:[
    ],
    inputValue:'',
    menuTag:[

    ],

  },
  search:function(e){
      this.setData({
          inputValue:'',
      });
      wx.navigateTo({
        url: '../menulist/menulist?type=search&keyword='+e.detail.value+'&name='+e.detail.value,
      })
  },
  onLoad: function (e) {
      var that = this;
      wx.request({
        url: 'https://api.jisuapi.com/recipe/byclass?appkey=245b31714072866d&classid=224&start=0&num=5',
        method:'POST',
        dataType:"json",
        header: {
            'content-type': 'application/json',
        },
        data:{
          start:0,
          num:5,
        },
        success: function(res) {
          that.setData({
            imgUrls:res.data.result.list,
          });
        }
      });
      wx.request({
        url: 'https://api.jisuapi.com/recipe/class?appkey=245b31714072866d',
        method:'POST',
        dataType:"json",
        header: {
            'content-type': 'application/json',
        },
        success: function(res) {
          that.setData({
            menuTag:res.data.result[4].list,
          });
        }
      });



  }
})
