Welcome to applet!
===================
> **Note:**

> - 接口域名需要在微信公众平台配置；
> - 请求接口header配置时，会对请求回来的json做反义；
> - 页面加载 有loading组件，文档里没写；
> - 数据为数组形式，选择删除不同的数据用splice方法，会出现问题，从小往后删除， 这个方法会返回新的数组，索引就会对不上，会删除错误；
解决办法，倒序删除就可以避免这种问题
```
       for (var i =  某数据长度 -1 ; i >= 0; i--) {
          
      }
```
> - 多项选择器，选中项发生改变时就会触发 bindchange 事件，返回一个选中项的数组值e.detail.value；
    判断是否被选中改变其状态：   
    
```
    <checkbox-group bindchange="checkboxChange">
      <label class="checkbox" wx:for="{{list}}">
        <checkbox value="{{index}}" checked="{{item.selected}}"/>{{item.title}}
      </label>
    </checkbox-group>

    //先将其转为字符串以逗号分割
    var str = e.detail.value.join(",")
    //遍历数据，判断已选择的值里是否包含；包含说明selected 为真；否则为假
    for(var i = 0 ;i < this.data.list.length;i++){
        if(str.indexOf(i) >= 0){
            this.data.list[i].selected = true;
        }else{
            this.data.list[i].selected = false;
        }
    }

```
> - 数据缓存到本地；注意重点，先判断本地是否储存到值，没有储存值为undefined ，设置wx.setStorage；
    如果有，就直接将数据追加进去；
    最后统一在把他缓存到本地；
    
```
    //定义变量值，获取储缓存到本地的数据
    var listdata;
    wx.getStorage({
        key: 'list',
        success: function(res) {
            listdata = res.data;
        }
    });
    
    
    //input输入内容回车处理；

       if(this.data.list == undefined){
           var that = this;
           wx.setStorage({
               key:"list",
               data:[{"title":e.detail.value,"selected":false}],
           });
           this.setData({
               list: [{"title":e.detail.value,"selected":false}],
               text:"",
           });
    
       }else{
           this.data.list.push({title:e.detail.value,selected:false});
           this.setData({
               list: this.data.list,
               text:"",
           });
       }
       
       wx.setStorage({key:"list", data:this.data.list});
          
```

