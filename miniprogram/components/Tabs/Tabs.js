// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type: Array,
      value: [],
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectedTab:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabSelected(e) {
      const { index } = e.currentTarget.dataset;
      this.setData({
        selectedTab: index,
      });
      this.triggerEvent("tabItemChange",{index})
    },
  },
});
