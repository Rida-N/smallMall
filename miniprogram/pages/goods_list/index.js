import { request } from "../../request/index";
/**
 * 用户下滑触底后获取新一页数据
 *  1. 判断是否触底 onReachBottom
 *  2. 判断是否还有下一页数据
 *    1. 获取总页数
 *       1. 获取总条数 (total)
 *       2. 获取当前页容量（pagesize）
 *       3. 总页数即：totalPage: Math.ceil(total/pagesize)
 *    2. 判断当前页是否大于等于总页数
 *       1. 获取当前页（pagenum）
 *       2. 比较：pagenum>= totalPage
 *  3. 有下一页数据则继续获取数据
 *    1. queryparams 中的 pagenum++
 *    2. 重新请求
 *    3. 将获取的数据拼接到先前获取的数据list中
 */
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { id: "all", name: "综合" },
      { id: "sales", name: "销量" },
      { id: "prices", name: "价格" },
    ],
    selectedTab: 0,
    goodsList: [],
    defaultImage:
      "https://ww1.sinaimg.cn/large/007rAy9hgy1g24by9t530j30i20i2glm.jpg",
  },

  QueryParams: {
    query: "",
    cid: "",
    pagenum: "1",
    pagesize: "10",
  },

  totalPages: 0,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid;
    this.getGoodList();
  },

  async getGoodList() {
    const res = await request({ url: "/goods/search", data: this.QueryParams });
    const { goods, total } = res;
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize);
    this.setData({
      goodsList: [...this.data.goodsList, ...goods],
    });
    wx.stopPullDownRefresh();
  },

  handleTabItemChange(e) {
    const { index } = e.detail;
    this.setData({
      selectedTab: index,
    });
  },

  onReachBottom() {
    if (this.QueryParams.pagenum < this.totalPages) {
      this.QueryParams.pagenum++;
      this.getGoodList();
      // console.log("%c有其他页","color:green;font-size:100px;background-image:linear-gradient(to right,#0094ff,pink)");
    } else {
      wx.showToast({
        title: "没有下一页了",
      });
      // console.log("%c没有其他页","color:red;font-size:100px;background-image:linear-gradient(to right,#9400ff,pink)");
    }
  },

  onPullDownRefresh() {
    // 清空数据
    this.setData({
      goodsList: [],
    });
    // 重置页码
    this.QueryParams.pagenum = 1;
    // 发送请求
    this.getGoodList();
  },
});
