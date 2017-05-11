//index.js
//获取应用实例
var app = getApp();
var page = 0;
var total;
var getList = function(that,type,page){

    if(20 * page > total){
      that.setData({
        nomore:false,
        hidden:true
      });
      return;
    }

    that.setData({
        hidden:false,
        nomore:true,
    });
    wx.request({
      url: 'https://api.douban.com/v2/movie/'+type,
      method:'POST',
      header: {
          'content-type': 'application/json',
          "Content-Type":"json"
      },
      data:{
        start:20*page,
      },
      success: function(res) {
        var list = [];
        total = res.data.total;
        console.log(list);
        for(var i = 0; i < res.data.subjects.length; i++){
            list.push(res.data.subjects[i]);
        }
        that.setData({
          movielist:list,
          hidden:true,
          nomore:true,
        })
        page++;
      }
    })
}


Page({
  data: {
    imgUrls:[
      '/images/guidepage/guidepage1.jpg',
      '/images/guidepage/guidepage2.jpg',
    ],
    movielist:[],
    title:'',
    hidden:true,
    nomore:true,
  },
  onPullDownRefresh: function(){
    wx.stopPullDownRefresh();
  },


  onShow:function(){
    //   在页面展示之后先获取一次数据
    var that = this;
    getList(that,"in_theaters",page);
  },
  bindDownLoad:function(){
      var that = this;
      page++;
      getList(that,"in_theaters",page);
  },

  onLoad: function (options) {
  }
})
