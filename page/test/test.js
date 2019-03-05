Page({
  data:{
    status:''
  },
  onLoad:function(){
    var that = this
    const wxreq = wx.request({
      url: 'https://api.shinoha.cn/status',
      success:function(res){
        that.setData({
          status:res.data.status
        })
        console.log(that.data.status)
      }       
    })
  }
})