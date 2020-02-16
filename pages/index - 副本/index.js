// pages/index/index.js
const app = getApp();
const host = app.getHostUrl();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobinfo: [],
    // 已经发起了加载请求，避免上滑后一直请求
    loading: false,
    pageNo: 1,
    noMore: false,
    pageSize: 30,
    loadingFailed:false,
    isTimeDesc:false,
  //  导航数据  时间顺序
   searchResult: false,
    navigator: "时间顺序",
    navigatorDown: { navigatorDown: ["从早到晚", "从晚到早"], navigator: 0 },
    navigatorFlag: false,//控制综合下拉框是否显示
    navigatorColor: false,
    //  导航数据  查询范围
    timeRange: "查询范围",
    timeRangesDown: { timeRangeDown: ["今天","未来三天", "未来七天"], navigator: 0 },
    timeRangeFlag: false,//控制综合下拉框是否显示
    timeRangeColor: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("Loading...");
    wx.request({
      url: host + '/job/get_jobinfo',
      data: this.data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        this.setData({
          jobinfo: res.data
        });
        console.log(res.data);
        console.log(res);
      }
    })
  },
  // 下拉加载
  onPullDownRefresh: function () {
    console.log("下拉");
    wx.request({
      url: host + '/job/get_jobinfo',
      data: this.data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        this.setData({
          jobinfo: res.data
        });
        console.log(res.data);
        console.log(res);
      }
    })
  },
  navigatorShow: function (e) {//综合下拉
    console.log("按下综合键");
  console.log(e);
    if (this.data.navigatorFlag) {
      this.setData({
        navigatorFlag: !this.data.navigatorFlag,
        brandFlag: false,
      })
    } else {
      this.setData({
        navigatorFlag: !this.data.navigatorFlag,
        brandFlag: false,
      })
    }
  },
  navigatorChoice: function (e) {//综合下拉选择子项
    console.log(e);
    this.setData({
      navigator: e.currentTarget.dataset.item,
      "navigatorDown.navigator": e.currentTarget.dataset.index,
      navigatorFlag: false,
      navigatorColor: true
    });
    if(e.currentTarget.dataset.index==0){
      this.setData({
        isTimeDesc:false
      })
    }else{
      this.setData({
        isTimeDesc: true
      })
    }
    let params = {
      pageNo: this.data.pageNo,
      pageSize: this.data.pageSize,
      isTimeDesc: this.data.isTimeDesc
    }
    wx.request({
      url: host + '/job/get_jobinfo',
      data: params,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        this.setData({
          jobinfo: res.data
        });
        console.log(res.data);
        console.log(res);
      }
    })
    
  },
  handletouchtart: function (event) {//点击透明背景隐藏下拉
    this.setData({
      navigatorFlag: false
      // brandFlag: false
    })
  },

  

  /**上拉下载*/
  //请求数据
  getData(isNextPage) {
    let params = {
      pageNo: this.data.pageNo,
      pageSize: this.data.pageSize
    }
    this.setData({
      loading: false
    })
    
    wx.request({
      url: host + '/job/get_jobinfo',
      method:'GET',
      data: params,
      header: {
        'content-type': 'application/json' // 默认值
      },
      // complete:function(){
      //   console.log("request==============>>>>>>>>>>" + url);
      // },
      success: (res) => {
        if(isNextPage){
          this.setData({
            jobinfo: this.data.jobinfo.concat(res.data)
          });
        }else{
          this.setData({
            jobinfo: res.data
          });
        }
        // 如果查到的数据量为 0
        if(res.data.length == 0){
          this.setData({
            noMore: true
          })
        }
        
        console.log(res.data);
        console.log(res);
      },
      fail: function () {
        this.setData({
          loadingFailed: true
        })
      }
    })
  },

  //到达底部
  scrollToLower: function(e) {
    if (!this.data.loading && !this.data.noMore) {
      this.setData({
        loading: true,
        pageNo: this.data.pageNo + 1
      })
        this.getData(true);
    }
    console.log(this.data.pageNo);
  },
  

})