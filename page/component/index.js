var app = getApp()
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
    news:[]
  },
 
  onLoad:function(){
    var self = this
    this.setRotations(self)
    this.setRecommendation(self)
    this.setNewest(self)
  },
  setRotations: function (object) {
    wx.request({
      url: app.globalData.requestUrl + 'rotations',
      success: function (res) {
        object.setData({
          imgUrls: res.data
        })
      }
    })
  },
  setRecommendation(object){
    wx.request({
      url: app.globalData.requestUrl + 'ads',
      success: function (res) {
        object.setData({
          recommendation1: res.data[0].url,
          recommendation2: res.data[1].url,
          recommendation3: res.data[2].url,
        })
      }
    })
  },
  setNewest(object){
    wx.request({
      url: 'https://api.shinoha.cn/goods?newest=1',
      success: function (res) {
        object.setData({
          news: res.data
        })
      }
    })
  }
})