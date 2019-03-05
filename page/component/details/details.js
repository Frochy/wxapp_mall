// page/component/details/details.js
var app = getApp()
Page({
  data: {
    goods: {},
    num: 1,
    totalNum: 0,
    hasCarts: false,
    curIndex: 0,
    show: false,
    scaleCart: false,
    stock: true
  },
  onLoad: function(options) {
    var self = this
    this.getGoods(self, options.id)
  },

  addCount() {
    let num = this.data.num;
    num++;
    this.setData({
      num: num
    })
  },

  isIn(num) {
    var self=this
    for (var i = 0; i < app.globalData.cart.length; i++) {
      var good1 = self.data.goods.goodId
      var good2 = app.globalData.cart[i].goodId
      if (app.globalData.cart[i].goodId == self.data.goods.goodId) {
        app.globalData.cart[i].param += num
        return true
      }
    }
    return false
  },
  addToCart() {
    const self = this;
    var good = self.data.goods
    const num = this.data.num;
    let total = this.data.totalNum;

    console.log(app.globalData.cart)
    if (!this.isIn(num)) {
      self.setData({
        show: true,
        'goods.param': num
      })
      app.globalData.cart.push(self.data.goods)
    }


    setTimeout(function() {
      self.setData({
        show: false,
        scaleCart: true
      })
      setTimeout(function() {
        self.setData({
          scaleCart: false,
          hasCarts: true,
          totalNum: num + total
        })
      }, 200)
    }, 300)
  },

  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index
    })
  },
  getGoods(self, id) {

    wx.request({
      url: 'https://api.shinoha.cn/goods?good_id=' + id,
      success(res) {
        self.setData({
          goods: res.data,
          stock: parseInt(res.data.count)
        })
        console.log(self.data.goods)
      }
    })
  }
})