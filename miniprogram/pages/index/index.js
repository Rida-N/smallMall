//Page Object
import { request } from "../../request/index";
Page({
  data: {
    // 轮播图数组
    swiperList: [],
    // 导航数组
    categoryList:[],
    // 楼层数组
    floorList:[],
  },
  //options(Object)
  onLoad: function (options) {
    this.getSwiperList();
    this.getCartegoryList();
    this.getFloorList();
  },

  getSwiperList(){
    request({
      url: "/home/swiperdata",
    }).then((result) => {
      this.setData({
        swiperList: result,
      });
    });
  },

  getCartegoryList(){
    request({
      url: "/home/catitems",
    }).then((result) => {
      this.setData({
        categoryList: result,
      });
    });
  },
  getFloorList(){
    request({
      url: "/home/floordata",
    }).then((result) => {
      this.setData({
        floorList: result,
      });
    });
  },

  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
  onPageScroll: function () {},
  //item(index,pagePath,text)
  onTabItemTap: function (item) {},
});
