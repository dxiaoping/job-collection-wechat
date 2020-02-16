//获取应用实例
const app = getApp();
const host = app.getHostUrl();
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: app.globalData.isRegister,
    canIUse: wx.canIUse('button.open-type.getUserInfo') //判断小程序的API，回调，参数，组件等是否在当前版本可用
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      userInfo : app.globalData.userInfo,
      hasUserInfo: app.globalData.isRegister
    })
    
  },
  // getUserInfo: function (e) {
  //   var that = this
  //   if (e.detail.userInfo) {
  //     wx.login({
  //       success: function (res) {
  //         if (res.code) {
  //           var code = res.code
  //           wx.getUserInfo({
  //             success: function (res) {

  //               let data = {
  //                 code: code,
  //                 encryptedData: res.encryptedData,
  //                 iv: res.iv,
  //                 signature: res.signature
  //               };
  //               console.log(res);
  //               // request.loadData(that, '/user/checkin', data, function (res) {
  //               //   console.log(res.data)
  //               //   if (res.data.bindInfo == null) {
  //               //     //未绑定账号
  //               //     wx.setStorageSync('isBinded', false)
  //               //   } else {
  //               //     wx.setStorageSync('bindInfo', res.data.bindInfo)
  //               //     wx.setStorageSync('isBinded', true)
  //               //   }

  //               //   wx.setStorageSync('session', res.data.session)
  //               // })
  //             },
  //             fail: function () {
  //               wx.showModal({
  //                 title: '提示',
  //                 content: '授权失败',
  //               })
  //             },
  //             complete: function () {
  //               if (that.data.finalToUrl != '' && that.data.finalToUrl != null) {
  //                 wx.redirectTo({
  //                   url: that.data.finalToUrl,
  //                 })
  //               } else {
  //                 wx.navigateBack()
  //               }
  //             }
  //           })
  //         }
  //       }
  //     })
  //   } else {
  //     //用户按了拒绝按钮
  //     console.log('fail')
  //   }
  // },
  // wxlogin: function() { //获取用户的openID和sessionKey
  //   var that = this;
  //   wx.login({
  //     //获取code 使用wx.login得到的登陆凭证，用于换取openid
  //     success: (res) => {
  //       wx.request({
  //         method: "GET",
  //         url: 'https://xxxwx/wxlogin.do',
  //         data: {
  //           code: res.code,
  //           appId: "appIdSbcx",
  //           appKey: "appKeySbcx"
  //         },
  //         header: {
  //           'content-type': 'application/json' // 默认值
  //         },
  //         success: (res) => {
  //           console.log(res);
  //           that.setData({
  //             sessionKey: res.data.session_key
  //           });
  //         }
  //       });
  //     }
  //   });
  // },
  // getPhoneNumber: function (e) {//点击获取手机号码按钮
  //     var that = this;
  //     wx.checkSession({
  //       success: function () {
  //         console.log(e.detail.errMsg)
  //         console.log(e.detail.iv)
  //         console.log(e.detail.encryptedData)
  //         var ency = e.detail.encryptedData;
  //         var iv = e.detail.iv;
  //         var sessionk = that.data.sessionKey;
  //         if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
  //           that.setData({
  //             modalstatus: true
  //           });
  //         } else {//同意授权
  //           wx.request({
  //             method: "GET",
  //             url: 'https://xxx/wx/deciphering.do',
  //             data: {
  //               encrypdata: ency,
  //               ivdata: iv,
  //               sessionkey: sessionk
  //             },
  //             header: {
  //               'content-type': 'application/json' // 默认值
  //             },
  //             success: (res) => {
  //               console.log("解密成功~~~~~~~将解密的号码保存到本地~~~~~~~~");
  //               console.log(res);
  //               var phone = res.data.phoneNumber;
  //               console.log(phone);
  //             }, fail: function (res) {
  //               console.log("解密失败~~~~~~~~~~~~~");
  //               console.log(res);
  //             }
  //           });
  //         }
  //       },
  //       fail: function () {
  //         console.log("session_key 已经失效，需要重新执行登录流程");
  //         that.wxlogin(); //重新登录
  //       }
  //     });
  //   }

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    //后端解密
    var encry = e.detail.encryptedData;
    var iv = e.detail.iv;
    // var signature = e.detail.signature;
    wx.login({
      success: function(res) {
        console.log("登录时获取的code==========================")
        console.log(res.code)
        let params = {
          code: res.code,
          encry: encry,
          iv: iv
          // signature: signature
        }
        wx.request({
          method: "GET",
          url: host + '/user/register',
          data: params,
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: (res) => {
            console.log("解密成功~~~~~~~将解密的用户信息保存到本地~~~~~~~~");
            console.log(res);
            app.globalData.openid=res.data.data.openid;
            // var phone = res.data.phoneNumber;
            // console.log(phone);
          },
          fail: function(res) {
            console.log("解密失败~~~~~~~~~~~~~");
            console.log(res);
          }
        });
      }
    })



    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  getPhoneNumber: function(e) {
    // wx.login({});
    console.log(e)
    // console.log(e.detail.errMsg)
    // console.log(e.detail.iv)
    // console.log(e.detail.encryptedData)
    console.log(e.detail.phoneNumber)
    // console.log(e.detail.purePhoneNumber)
    // console.log(e.detail.countryCode)
    // console.log(e)
    // let params = {
    //   code: res.code,
    //   encry: encry,
    //   iv: iv
    //   // signature: signature
    // }
    // wx.request({
    //   method: "GET",
    //   url: host + '/user/deciphering',
    //   data: params,
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: (res) => {
    //     console.log("解密成功~~~~~~~将解密的号码保存到本地~~~~~~~~");
    //     console.log(res);
    //     // var phone = res.data.phoneNumber;
    //     // console.log(phone);
    //   },
    //   fail: function (res) {
    //     console.log("解密失败~~~~~~~~~~~~~");
    //     console.log(res);
    //   }
    // });

  },
  onItemClick: function(res) {
    wx.navigateTo({
      url: '../shoucang/shoucang'
    })
  }
})