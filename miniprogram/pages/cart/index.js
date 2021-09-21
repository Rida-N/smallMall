// pages/cart/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalNum: 0,
    totalPrice: 0,
  },

  onShow() {
    const address = wx.getStorageSync("address");
    const cart = wx.getStorageSync("cart") || [];

    if (address) {
      this.setData({
        address,
      });
    }

    this.setCart(cart);
  },

  setCart(cart) {
    let allChecked = !!cart.length;
    let totalNum = 0;
    let totalPrice = 0;

    cart.forEach((item) => {
      if (item.checked) {
        totalNum += item.num;
        totalPrice += item.goods_price * item.num;
      } else {
        allChecked = false;
      }
    });

    this.setData({
      cart,
      allChecked,
      totalNum,
      totalPrice,
    });
  },

  handleChooseAdress() {
    wx.chooseAddress({
      success: (result) => {
        wx.setStorageSync("address", result);
      },
    });
  },

  /**
   * 商品选中变化
   *  1. 获取当前改变状态的商品对象
   *  2. 更新商品的选中状态->取反
   *  3. 更新对应的data和 cache
   *  4. 更新全选状态，总价格，总数量
   */
  handleItemCheckChange(e) {
    const goods_id = e.currentTarget.dataset.id;
    const { cart, totalNum, totalPrice } = this.data;
    let tar = cart.find((item) => item.goods_id === goods_id);
    tar.checked = !tar.checked;
    wx.setStorageSync("cart", cart);
    if (tar.checked) {
      this.setData({
        cart,
        totalNum: totalNum + tar.num,
        totalPrice: totalPrice + tar.num * tar.goods_price,
        allChecked: cart.every((item) => item.checked),
      });
    } else {
      this.setData({
        cart,
        totalNum: totalNum - tar.num,
        totalPrice: totalPrice - tar.num * tar.goods_price,
        allChecked: false,
      });
    }
  },
  /**
   *
   */
  handleAllCheckChange() {
    let { allChecked, cart } = this.data;
    allChecked = !this.data.allChecked;
    cart.map((item) => {
      item.checked = allChecked;
    });
    wx.setStorageSync("cart", cart);
    this.setCart(cart);
  },
});
