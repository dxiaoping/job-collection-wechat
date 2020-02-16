// pages/jobdetail/jobdetail.js
let wxparse = require("../../wxParse/wxParse.js");
const app = getApp();
const host = app.getHostUrl();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobId: -1,
    jobDetail: null,
    talkInfo: "",
    talkDetail: "",
    // companyDetail: "",
    companyDetail: "",
    isShouCang: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.jobId = options.id;
    const that = this;
    // wxml传递的参数
    console.log(options);
    console.log(app.globalData.openid);

    wx.request({
      url: host + '/job/get_job_detail',
      data: {
        id: options.id,
        openid: app.globalData.openid
      },
      success: (res) => {
        console.log(res);
        if(res.data.msg=='已收藏'){
          this.setData({
            isShouCang:true
          })
        }else{
          this.setData({
            isShouCang: false
          })
        }
          this.setData({
            jobDetail: res.data.data,
            talkInfo: res.data.data.talkInfo,
            talkDetail: res.data.data.talkDetail,
            companyDetail: res.data.data.companyDetail,

          })
        wxparse.wxParse('talkInfos', 'html', this.data.talkInfo, this, 5);
        wxparse.wxParse('talkDetails', 'html', this.data.talkDetail, this, 5);
        wxparse.wxParse('companyDetails', 'html', this.data.companyDetail, this, 5);
        // console.log(res.data.companyDetail + '公司详情');

      }
    });

  },
  changeShouCang: function(e) {
    console.log("收藏时的数据变化");
    console.log(this.data.jobId);
    console.log(app.globalData.openid);
    this.setData({
      isShouCang: !this.data.isShouCang
    })
    console.log(this.data.isShouCang);
    let params = {
      openid: app.globalData.openid,
      jobId: this.data.jobId,
      isShouCang: this.data.isShouCang
    }
    wx.request({
      url: host + '/job/shoucang',
      data: params,
      success: (res) => {

      }
    });

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载(页面退出)
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})