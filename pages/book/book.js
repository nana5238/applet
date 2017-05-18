//book.js
//获取应用实例
var app = getApp();

var listdata ;

function contains(arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
};



wx.getStorage({
    key: 'list',
    success: function(res) {
        listdata = res.data;
    }
});

Page({
  data: {
    userInfo: {},
    selectedAllStatus:false,
    list:listdata,
    clearshow:false,
    text:"",
    flag:true,
    placeholderText:"What needs to be done?",
  },

  onLoad: function () {
    var that = this;
    app.getUserInfo(function(userInfo){
      that.setData({
        userInfo:userInfo
      })
    });
    that.setData({
        list:listdata
    });



  },

  //选中
  checkboxChange:function(e){
       var str = e.detail.value.join(",");
       var arrNum = [];
       for(var j = 0;j < e.detail.value.length; j++){
           arrNum.push(Number(e.detail.value[j]));
       }

       for(var i = 0 ;i < this.data.list.length;i++){
           if(contains(arrNum, i)){
               this.data.list[i].selected = true;
           }else{
               this.data.list[i].selected = false;
           }
       }

       if(e.detail.value.length == 0){
           this.setData({
               clearshow: false,
           });
       }else{
           this.setData({
               clearshow: true,
           });
       }

      if(e.detail.value.length == this.data.list.length){
          this.setData({
              selectedAllStatus: true,
          });
      }else{
          this.setData({
              selectedAllStatus: false,
          });
      }

       this.setData({
           list: this.data.list,
       });

  },
  //全选和反选
  bindSelectAll:function(e) {
      for (var i = 0; i < this.data.list.length; i++) {
          this.data.list[i].selected = !this.data.selectedAllStatus;
      }
      this.setData({
          list: this.data.list,
          selectedAllStatus: !this.data.selectedAllStatus,
          clearshow:!this.data.selectedAllStatus,
      });
  },
  //clear  删除事件
  bindClearTap:function(){
      for (var i =  this.data.list.length -1 ; i >= 0; i--) {
          if(this.data.list[i].selected == true){
              this.data.list.splice(i,1);
          }
          this.setData({
              list: this.data.list,
              clearshow:false,
          });
          wx.setStorage({key:"list", data:this.data.list});
      }
  },

  bindSubmitText:function(e){
      if(this.data.list == undefined){
          var that = this;
          wx.setStorage({
              key:"list",
              data:[{"title":e.detail.value,"selected":false}],
          });
          this.setData({
              text:"",
              list: [{"title":e.detail.value,"selected":false}],
          });

      }else{
          this.data.list.push({title:e.detail.value,selected:false});
          this.setData({
              text:"",
              list: this.data.list,
          });
      }
      wx.setStorage({key:"list", data:this.data.list});

  }

})
