// pages/cart/index.js

import { showModal } from "../../utlis/asyncWx";

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

  /**
   * 购物车商品增减
   *  1. 取得目标商品
   *  2. 对目标商品num进行相应操作
   *  3. 如果num为0则弹窗确认是否删除
   *     1. 如果是，就删除该商品
   *     2. 否则停止num-1（保留num=1）
   *  4. 改动totalNum和totalPrice，并存入data
   *  5. 把改动后的目标商品 存入data和cache
   */
  async handleNumEdit(e) {
    let { id, operation } = e.currentTarget.dataset;
    operation = Number(operation);
    let { cart, totalNum, totalPrice } = this.data;
    let tarIndex = cart.findIndex((item) => item.goods_id === id);
    let tar = cart[tarIndex];
    const updateNumEdit = () => {
      if (tar.checked) {
        totalNum += operation;
        totalPrice += operation * tar.goods_price;
      }
      this.setData({
        cart,
        totalNum,
        totalPrice,
        allChecked: cart.length && cart.every((item) => item.checked),
      });
      wx.setStorageSync("cart", cart);
    };
    if (tar.num === 1 && operation === -1) {
      let res = await showModal("您是否要删除？");
      if (res.confirm) {
        cart.splice(tarIndex, 1);
        updateNumEdit();
      }
    } else {
      tar.num += operation;
      updateNumEdit();
    }
  },
});
