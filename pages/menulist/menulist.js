//movielist.js
//获取应用实例
var app = getApp();
var page;
var total;
var list;
var getList = function(that,type,page,tag,cid){
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
      url:'https://api.jisuapi.com/recipe/'+type+'?appkey=245b31714072866d&classid='+cid+'&keyword='+tag,
      method:'POST',
      dataType:"json",
      data:{
          start:20*page,
          num:20
      },
      success: function(res) {
        total = res.data.num;
        for(var i = 0; i < res.data.result.list.length; i++){
            list.push(res.data.result.list[i]);
        }
        that.setData({
          movielist:list,
          hidden:true,
          nomore:true,
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
    cid:'',
    hidden:true,
    nomore:true,
  },
  onPullDownRefresh: function(){
    wx.stopPullDownRefresh();
  },
  bindDownLoad:function(e){
      var that = this;
      page++;
      getList(that,this.data.type,page,this.data.tag,this.data.cid);
  },
  onLoad: function (e) {
      list = [];
      page = 0;
      var that = this;
      that.setData({
          type:e.type,
          tag:e.keyword,
          cid:e.id
      });
      wx.setNavigationBarTitle({
          title: e.name,
      });

      getList(that,this.data.type,page,this.data.tag,this.data.cid);
  }

})
