Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchResult: false,
    screen: "综合",
    screenDown: { screenDown: ["综合", "价格升序", "价格降序"], screen: 0 },
    screenFlag: false,//控制综合下拉框是否显示
    screenColor: false,
    brandFlag: false,
    brandDown: [
      { name: '火星人', value: '火星人' },
      { name: '美达', value: '美达', checked: 'true' },
      { name: 'DFSD', value: 'DFSD' },
      { name: 'WANGJIAL', value: 'WANGJIAL' },
      { name: '东方', value: '东方' },
      { name: '火星人（marssenna）', value: '火星人（marssenna）' },
      { name: '大学新村', value: '大学新村' },
      { name: '大学新村', value: '大学新村' },
      { name: '大学新村', value: '大学新村' },
      { name: '大学新村大学新村大学新村大学新村', value: '大学新村大学新村大学新村大学新村' },
    ],
    brand: 0,
    brandColor: false,//控制品牌下拉框是否显示
    brandText: "品牌",
    salesColor: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  screenShow: function () {//综合下拉
    if (this.data.screenFlag) {
      this.setData({
        screenFlag: !this.data.screenFlag,
        // brandFlag: false,
      })
    }
    else {
      this.setData({
        screenFlag: !this.data.screenFlag,
        // brandFlag: false,
      })
    }
  },
  screenChoice: function (e) {//综合下拉选择子项
    console.log(e)
    this.setData({
      screen: e.currentTarget.dataset.item,
      "screenDown.screen": e.currentTarget.dataset.index,
      screenFlag: false,
      screenColor: true
    })
  },
  handletouchtart: function (event) {//点击透明背景隐藏下拉
    console.log("点击空白退出筛选");
    this.setData({
      screenFlag: false,
      brandFlag: false
    })
  },

  brandShow: function () {//品牌下拉
    if (this.data.brandFlag) {
      this.setData({
        brandFlag: !this.data.brandFlag,
        screenFlag: false,
      })
    } else {
      this.setData({
        brandFlag: !this.data.brandFlag,
        screenFlag: false,
      })
    }
  },
  radioChange: function (e) {//品牌选择
    console.log(e)
    this.setData({
      brandText: e.detail.value,
      brandFlag: false,
      brandColor: true
    })
  },
  salesNumber: function () {//销量
    if (this.data.salesColor) {
      this.setData({
        salesColor: "",
        screenFlag: false,
        brandFlag: false,
      })
    } else {
      this.setData({
        salesColor: "#F46458",
        screenFlag: false,
        brandFlag: false,
      })
    }

  },
})
