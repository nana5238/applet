//movielist.js
//获取应用实例
var app = getApp();
var page;
var total;
var list;
var getList = function(that,type,page,tag){
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
      dataType:"json",
      header: {
          'content-type': 'application/json',
      },
      data:{
        start:20*page,
        q:tag,
      },
      success: function(res) {
        total = res.data.total;
        for(var i = 0; i < res.data.subjects.length; i++){
            list.push(res.data.subjects[i]);
        }
        that.setData({
          movielist:list,
          hidden:true,
          nomore:true,
          title:res.data.title,
        });
        wx.setNavigationBarTitle({
          title: that.data.title
        });
        page++;
      }
    })
}

Page({
  data: {
    movielist:[],
    title:'',
    type:'',
    tag:'',
    hidden:true,
    nomore:true,
  },
  onPullDownRefresh: function(){
    wx.stopPullDownRefresh();
  },
  bindDownLoad:function(e){
      var that = this;
      page++;
      getList(that,this.data.type,page,this.data.tag);
  },
  onLoad: function (e) {
      list = [];
      page = 0;
      var that = this;
      that.setData({
          type:e.type,
          tag:e.tag,
      });
      getList(that,this.data.type,page,this.data.tag);
  }

})
