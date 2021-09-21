let ajaxTimes = 0;
export const request = (params) => {
  ajaxTimes++;
  wx.showLoading({
    title: "加载中",
    mask: true,
  });
  return new Promise((resolve, reject) => {
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
    wx.request({
      ...params,
      url: baseUrl + params.url,
      success: (result) => {
        resolve(result.data.message);
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => {
        ajaxTimes--;
        if (ajaxTimes == 0) {
          // 关闭loading图标
          wx.hideLoading();
        }
      },
    });
  });
};
