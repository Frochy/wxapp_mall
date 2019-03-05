Page({
  data: {
    category: [{
        name: '果味',
        id: 'fruit'
      },
      {
        name: '蔬菜',
        id: 'fruit'
      },
      {
        name: '炒货',
        id: 'fruit'
      },
      {
        name: '点心',
        id: 'fruit'
      },
      {
        name: '粗茶',
        id: 'vegetables'
      },
      {
        name: '淡饭',
        id: 'vegetables'
      }
    ],
    detail: [],
    curIndex: 0,
    isScroll: false,
    toView: 'fruit'
  },
  onLoad(){
    var self = this
    wx.request({
      url: 'https://api.shinoha.cn/type',
      success(res){
        self.setData({
          category:res.data
        })
      }
    })
  },
  onReady() {
    var self = this;
    wx.request({
      url: 'https://api.shinoha.cn/goods',
      method:'GET',
      data:{
        'type':self.data.category[0].id
      },
      success(res) {
        self.setData({
          detail: res.data
        })
      }
    });

  },
  switchTab(e) {
    const self = this;
    console.log(e)
    this.setData({
      isScroll: true
    })
    wx.request({
      url: 'https://api.shinoha.cn/goods?type=' + e.target.dataset.id,
      success(res) {
        console.log(res)
        self.setData({
          detail: res.data,
          toView: e.target.dataset.id
        })
      }
    })
    setTimeout(function() {
      self.setData({
        toView: e.target.dataset.id,
        curIndex: e.target.dataset.index
      })
    }, 0)
    setTimeout(function() {
      self.setData({
        isScroll: false
      })
    }, 1)

  }

})