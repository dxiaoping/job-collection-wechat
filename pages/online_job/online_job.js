// pages/index/index.js
const app = getApp();
const host = app.getHostUrl();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobinfo: [], //宣讲信息列表
    loading: false, // 已经发起了上滑加载加载请求，避免上滑后一直请求
    pageNo: 1, // 在载第几页
    isHaveMore: true, //是否还有更多信息  
    pageSize: 30,
    loadingFailed: false, //是否加载失败
    isTimeDesc: true, //是否按时间排序
    dayRange: 0, //未来多少天的数据
    //  导航数据  时间顺序
    navigator: "时间顺序",
    navigatorDown: {
      navigatorDown: ["从早到晚", "从晚到早"],
      navigator: 1
    },
    isDisplayOrderChoice: false, //控制综合下拉框是否显示
    //  导航数据  查询范围
    timeRange: "查询范围",
    timeRangeDown: {
      timeRangeDown: ["全部", "未来2天", "未来3天", "未来5天", "过去40天", "过去5 0天"],
      index: 0
    },
    isDisplayRangeChoice: false, //控制综合下拉框是否显示
    timeRangeColor: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("Loading...");
    let params = {
      pageNo: this.data.pageNo,
      pageSize: this.data.pageSize,
      isTimeDesc: this.data.isTimeDesc,
      dayRange: this.data.dayRange
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

  navigatorShow: function(e) { //导航下拉
    console.log("按下综合键");
    console.log(e);
    if (e.currentTarget.id == "timeOrder") {
      this.setData({
        isDisplayOrderChoice: !this.data.isDisplayOrderChoice,
        isDisplayRangeChoice: false
      })
    } else if (e.currentTarget.id == "timeRange") {
      this.setData({
        isDisplayOrderChoice: false,
        isDisplayRangeChoice: !this.data.isDisplayRangeChoice
      })
    }

  },
  navigatorChoice: function(e) { //下拉选择子项
    console.log(e);
    this.setData({
      pageNo: 1,
      isHaveMore: true
    });
    if (this.data.isDisplayOrderChoice) {
      this.setData({
        navigator: e.currentTarget.dataset.item,
        "navigatorDown.navigator": e.currentTarget.dataset.index,
        isDisplayOrderChoice: false,
      });
      if (e.currentTarget.dataset.index == 0) {
        this.setData({
          isTimeDesc: false
        })
      } else {
        this.setData({
          isTimeDesc: true
        })
      }
    } else if (this.data.isDisplayRangeChoice) {
      this.setData({
        timeRange: e.currentTarget.dataset.item,
        "timerangeDown.index": e.currentTarget.dataset.index,
        isDisplayRangeChoice: false,
      });
      switch (this.data.timerangeDown.index) {
        case 0:
          this.setData({
            dayRange: 0
          })
          break;
        case 1:
          this.setData({
            dayRange : 2
          })
          break;
        case 2:
          this.setData({
            dayRange : 3
          })
          break;
        case 3:
          this.setData({
            dayRange : 5
          })
          break;
        case 4:
          this.setData({
            dayRange: -40
          })
          break;
        case 5:
          this.setData({
            dayRange: -50
          })
          break;
      }
    }

    let params = {
      pageNo: this.data.pageNo,
      pageSize: this.data.pageSize,
      isTimeDesc: this.data.isTimeDesc,
      dayRange:this.data.dayRange
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
  handletouchtart: function(event) { //点击透明背景隐藏下拉
  console.log(event);
    this.setData({
      isDisplayOrderChoice: false
      // brandFlag: false
    })
  },



  /**上拉下载*/
  //请求数据
  getData(isNextPage) {
    let params = {
      pageNo: this.data.pageNo,
      pageSize: this.data.pageSize,
      isTimeDesc: this.data.isTimeDesc,
      dayRange: this.data.dayRange
    }
    this.setData({
      loading: false
    })

    wx.request({
      url: host + '/job/get_jobinfo',
      method: 'GET',
      data: params,
      header: {
        'content-type': 'application/json' // 默认值
      },
      // complete:function(){
      //   console.log("request==============>>>>>>>>>>" + url);
      // },
      success: (res) => {
        if (isNextPage) {
          this.setData({
            jobinfo: this.data.jobinfo.concat(res.data)
          });
        } else {
          this.setData({
            jobinfo: res.data
          });
        }
        // 如果查到的数据量为 0
        if (res.data.length == 0) {
          this.setData({
            isHaveMore: false
          })
        }

        console.log(res.data);
        console.log(res);
      },
      fail: function() {
        this.setData({
          loadingFailed: true
        })
      }
    })
  },

  //到达底部
  scrollToLower: function(e) {
    if (!this.data.loading && this.data.isHaveMore) {
      this.setData({
        loading: true,
        pageNo: this.data.pageNo + 1
      })
      this.getData(true);
    }
    console.log(this.data.pageNo);
  },

})