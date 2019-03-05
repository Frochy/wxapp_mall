// page/component/list/list.js
Page({
  data:{
    news:[],
    type:''
  },
  onLoad:function(options){
    var object = this
    this.setData({
      type:options.type
    })
    wx.request({
      url: 'https://api.shinoha.cn/goods?type='+object.data.type,
      success: function (res) {
        object.setData({
          news: res.data
        })
        console.log(object.data.news)
      }
    })
  }
})