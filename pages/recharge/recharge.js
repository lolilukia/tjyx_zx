Page({
  data: {
    rechargeText: '点击保存图片，任选其一打开相应APP扫描二维码，缴纳45元会费',
    btnText: '完成',
    saveText: '保存图片',
    alipay: 'https://www.jdyx.club/tjyx_backend/image/alipay.jpg',
    wechat: 'https://www.jdyx.club/tjyx_backend/image/wechat.jpg',
    alisucc: 0,
    wesucc: 0
  },
  jumpBack: function () {
    wx.showToast({
      title: '招新完成',
      icon: 'success',
      duration: 1000
    })
  },
  jumpSave: function () {
    var that = this;
    wx.downloadFile({
      url: that.data.alipay,
      success: function (res) {
        console.log(res)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            that.setData({
              alisucc: 1
            });
          },
          fail: function (res) {
            console.log(res)
          }
        });
      },
      fail: function () {
        console.log(res)
      }
    });
    wx.downloadFile({
      url: that.data.wechat,
      success: function (res) {
        console.log(res)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            if (that.data.alisucc == 1) {
              wx.showToast({
                title: '图片已保存在相册',
                icon: 'success',
                duration: 1000
              })
            }
          },
          fail: function (res) {
            console.log(res)
          }
        });
      }
    });
  }
})