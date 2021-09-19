import { request } from "../../request/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    leftList: [],
    rightContent: [],
    selectedIndex:0,
    scrollTop:0,
  },

  originData: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let cacheData = wx.getStorageSync("category");
    if(!cacheData||(Date.now()-cacheData.time>1000*10)){
      this.getCategoryData();
    }else{
      this.originData = cacheData.data;
      this.setData({
        leftList: this.originData.map((item) => item.cat_name),
        rightContent:this.originData[0].children
      });
    }
  },
  getCategoryData() {
    request({
      url: "categories",
    }).then((result) => {
      this.originData = result.data.message;
      wx.setStorageSync("category", {time:Date.now(),data:this.originData});
      this.setData({
        leftList: this.originData.map((item) => item.cat_name),
        rightContent:this.originData[0].children
      });
    });
  },
  handleCateTap(e){
    let {index} = e.currentTarget.dataset;
      this.setData({
        selectedIndex:index,
        rightContent:this.originData[index].children,
        scrollTop:0
      })
  }
});
