// page/component/new-pages/cart/cart.js
var app = getApp()
Page({
  data: {
    carts: [], // 购物车列表
    hasList: true, // 列表是否有数据
    totalPrice: 0, // 总价，初始为0
    selectAllStatus: true, // 全选状态，默认全选
    obj: {
      name: "hello"
    },
    open_id: 1,
    cartsNew: []
  },
  onLoad() {
    this.getTotalPrice();
  },
  onShow() {
    var self = this
    this.setData({
      carts: app.globalData.cart
    })
    console.log(this.data.carts)
  },
  onHide() {
    var self = this
    this.setData({
      cartsNew:[]
    })
    for (var i = 0; i < this.data.carts.length; i++) {
      this.data.cartsNew.push({
        goodId: this.data.carts[i].goodId,
        count: this.data.carts[i].param
      })
    }
    wx.request({
      url: 'https://api.shinoha.cn/cart',
      method: 'POST',
      data:{
        'open_id':this.data.open_id,
        'update':this.data.cartsNew
      },
      success(res){
        console.log(res)
      }
    })
  },

  /**
   * 当前商品选中事件
   */
  selectList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    const selected = carts[index].selected;
    carts[index].selected = !selected;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 删除购物车当前商品
   */
  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    carts.splice(index, 1);
    this.setData({
      carts: carts
    });
    if (!carts.length) {
      this.setData({
        hasList: false
      });
    } else {
      this.getTotalPrice();
    }
  },

  /**
   * 购物车全选事件
   */
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;

    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 绑定加数量事件
   */
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].param;
    num = num + 1;
    carts[index].param = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 绑定减数量事件
   */
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    const obj = e.currentTarget.dataset.obj;
    let carts = this.data.carts;
    let num = carts[index].param;
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    carts[index].param = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let carts = this.data.carts; // 获取购物车列表
    let total = 0;
    for (let i = 0; i < carts.length; i++) { // 循环列表得到每个数据
      if (carts[i].selected) { // 判断选中才会计算价格
        total += parseInt(carts[i].param) * parseFloat(carts[i].price); // 所有价格加起来
      }
    }
    this.setData({ // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2)
    });
    ``
  }
})