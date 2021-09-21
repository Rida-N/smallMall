// pages/cart/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[]
  },

  onShow(){
    const address=wx.getStorageSync("address");
    
    const cart=wx.getStorageSync("cart")||[];
    if(address){
      this.setData({
        address
      })
    }

    // set cart
    if(cart.length){
      this.setData({cart})
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  handleChooseAdress() {
    wx.chooseAddress({
      success: (result) => {
        wx.setStorageSync("address", result);
      },
    });

  },
});
