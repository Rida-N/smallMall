// pages/pay/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalNum: 0,
    totalPrice: 0,
  },

  onShow() {
    const address = wx.getStorageSync("address");
    const cart = wx.getStorageSync("cart").filter((item) => item.checked) || [];

    if (address) {
      this.setData({
        address,
      });
    }

    this.setCart(cart);
  },

  setCart(cart) {
    let totalNum = 0;
    let totalPrice = 0;

    cart.forEach((item) => {
      totalNum += item.num;
      totalPrice += item.goods_price * item.num;
    });

    this.setData({
      cart,
      totalNum,
      totalPrice,
    });
  },
});
