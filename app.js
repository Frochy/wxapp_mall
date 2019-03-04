App({
  data:{
    status:''
  },
  onLaunch: function () {
    var self = this
    wx.request({      
      url: 'https://api.shinoha.cn/status',
      success:function(res){}
    })
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    hasLogin: false
  }
})
