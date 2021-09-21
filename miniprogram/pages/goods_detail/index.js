import { request } from "../../request/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {},
  },

  originGoodsInfo: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { goods_id } = options;
    this.getGoodsDetail(goods_id);
  },

  async getGoodsDetail(goods_id) {
    const goodsObj = await request({
      url: "/goods/detail",
      data: { goods_id },
    });
    this.originGoodsInfo = goodsObj;
    this.setData({
      goodsObj: {
        pics: goodsObj.pics,
        goods_price: goodsObj.goods_price,
        goods_name: goodsObj.goods_name,
        // iphone部分手机 不识别 webp图片格式
        // 如果richtext里有webp格式的图片最好找到后台 让他进行修改
        // 临时自己改 确保后台存在 1.webp => 1.jpg
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, ".jpg"),
      },
    });
  },

  handleImagePreview(e) {
    const current = e.currentTarget.dataset.url;
    const urls = this.originGoodsInfo.pics.map((pic) => pic.pics_mid);
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls, // 需要预览的图片http链接列表
    });
  },

  /**
   * 1. 先获取缓存，判断购物车列表是否存在当前商品
   *    1. 若不存在
   *      1. 当前商品设置num属性，初始值为1
   *      2. 把当前商品加入购物车列表
   *    2. 若存在
   *      1. 获取该商品的num信息，进行++
   * 2.把当前商品信息存入缓存
   *
   */
  handleAddCart() {
    let Cart = wx.getStorageSync("cart") || [];
    let currentGoods = this.originGoodsInfo;
    let targetGoodsIndex = Cart.findIndex(
      (item) => item.goods_id === currentGoods.goods_id
    );
    if (targetGoodsIndex === -1) {
      currentGoods.num = 1;
      currentGoods.checked = true;
      Cart.push(currentGoods);
    } else {
      Cart[targetGoodsIndex].num++;
    }
    wx.setStorageSync("cart", Cart);
    wx.showToast({
      title: "加入购物车成功",
      icon: "success",
      mask: true,
    });
  },
});
