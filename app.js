App({
  data:{
    status:''
  },
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    var self = this
    wx.request({
      url: 'https://api.shinoha.cn/cart?open_id=' + self.globalData.open_id,
      success(res) {        
        self.globalData.cart=res.data
        console.log(self.globalData.cart)
      }
    })
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    hasLogin: false,
    open_id:1,
    requestUrl:'https://api.shinoha.cn/img?position=',
    cart:[]
  }
})
