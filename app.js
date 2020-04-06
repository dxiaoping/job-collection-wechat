App({
  globalData: {
    userInfo: null,
    openid: "",
    sessionKey: "",
    isRegister: false,
    // HOST_URL: "https://ttl317.top/job-collection",
    HOST_URL: "https://www.ttl317.top",
    DEBUG_HOST_URL: "http://localhost:1437",
    // DEBUG: false,
    DEBUG: true,
    LOG: true
  },
  getHostUrl() {
    var that = this
    if (that.globalData.DEBUG) {
      return that.globalData.DEBUG_HOST_URL
    } else {
      return that.globalData.HOST_URL
    }
  },
 
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function(e) {
    let that = this;
    this.login();
    setTimeout(
      this.login,2000
    )
  },
  login:function(){
    if (!(this.globalData.openid == null || this.globalData.openid == "")) {
        console.log("openid不为空，取消二次加载")
        return;
    }
    wx.getSetting({
      success: res => {
        console.log(res.authSetting['scope.userInfo']);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框

          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId

              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              } else {
                console.log(res);
                var encry = res.encryptedData;
                var iv = res.iv;
                wx.login({
                  success: res => {
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
                      url: this.getHostUrl() + '/user/login',
                      data: params,
                      header: {
                        'content-type': 'application/json' // 默认值
                      },
                      success: (res) => {
                        console.log("解密成功~~~~~~~输出登录请求的返回结果~~~~~~~~");
                        console.log(res);
                        console.log("赋值openid");
                      
                        this.globalData.openid = res.data.data.openId;
                        if (res.data.msg == "已注册") {
                          this.globalData.isRegister = true;
                        } else {
                          this.globalData.isRegister = false;
                        }
                      },
                      fail: function (res) {
                        console.log("解密失败~~~~~~~~~~~~~");
                        console.log(res);
                      }
                    });
                  }
                })
              }
            }
          })
        }
      }
    })
  }


})