Page({
  data:{
    title:''
  },
  onLoad:function(){
    var that = this
    const wxreq = wx.request({
      url: 'https://api.shinoha.cn/',
      data:{
        text:'123456789'
      },
      success:function(res){
        console.log(res.data)
        that.setData({title:res.data})
      }
    })
  }
})