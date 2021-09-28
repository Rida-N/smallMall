export const showModal = ({content}) => {
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

export const showToast = ({title}) => {
  return new Promise((res, rej) => {
    wx.showToast({
      title,
      icon: "none",
      success: (result) => {
        res(result);
      },
      fail: (err) => {
        rej(err);
      },
    });
  });
};

