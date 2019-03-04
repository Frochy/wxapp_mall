// page/component/details/details.js
Page({
  data: {
    goods: {
      id: 1,
      image: '/image/goods1.png',
      title: '梨花带雨',
      price: 0.01,
      stock: '有货',
      detail: '这里是梨花带雨详情。',
      parameter: '125g/个',
      service: '不支持退货'
    },
    num: 1,
    totalNum: 0,
    hasCarts: false,
    curIndex: 0,
    show: false,
    scaleCart: false
  },

  addCount() {
    let num = this.data.num;
    num++;
    this.setData({
      num: num
    })
  },

  addToCart() {
    const self = this;
    const num = this.data.num;
    let total = this.data.totalNum;

    self.setData({
      show: true
    })
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
    wx.request({
      url: 'https://api.shinoha.cn',
      complete:function(res){
        console.log(res.data)
        self.setData({
          'goods.title': res.data
        })
      }
    })
  },

  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index
    })
  }

})