export const showModal = (content) => {
  return new Promise((res, rej) => {
    wx.showModal({
      title: "提示",
      content,
      success: (result) => {
        res(result);
      },
      fail: (err) => {
        rej(err);
      },
    });
  });
};
