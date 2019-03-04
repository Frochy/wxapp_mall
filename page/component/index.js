Page({
  data: {
    imgUrls: [],
    recommendation1: '',//推荐1
    recommendation2: '',//推荐2
    recommendation3: '',//推荐3
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
        
  },
  onLoad:function(){
    var self = this
    wx.request({
      url: 'https://api.shinoha.cn/rotations',
      success:function(res){
        self.setData({
          'imgUrls[0].url':res.data[0].url,
          'imgUrls[1].url': res.data[1].url,
          'imgUrls[2].url': res.data[2].url,
        })
      }
    })
    wx.request({
      url: 'https://api.shinoha.cn/ads',
      success:function(res){
        self.setData({
          recommendation1:res.data[0].url,
          recommendation2: res.data[1].url,
          recommendation3: res.data[2].url,
        })               
      }
    })
    wx.request({
      url: 'https://api.shinoha.cn/list',
      success:function(res){
        console.log(res)
      }
    })
  }
})