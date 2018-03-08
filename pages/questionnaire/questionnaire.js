const app = getApp()

Page({
  data: {
    year: '',
    aim: '',
    willingness: '',
    teaching: '',
    activity: '',
    stuNum: '',
    returnCode: '',
    yearsexp: [
      { name: 0, value: '一年以下'},
      { name: 1, value: '1-3年' },
      { name: 2, value: '3-5年' },
      { name: 3, value: '五年以上' },
    ],
    purpose: [
      { name: 0, value: '锻炼身体'},
      { name: 1, value: '提高羽毛球水平' },
      { name: 2, value: '找约球的小伙伴' },
    ],
    willing: [
      { name: 0, value: '是'},
      { name: 1, value: '否' },
    ],
    hope: [
      { name: 0, value: '选某个教练进行训练'},
      { name: 1, value: '分层级/项目跟不同教练训练' },
    ],
  },
  radioChange: function (e) {
    this.setData({
      year: e.detail.value
    })
  },
  checkboxChange: function (e) {
    this.setData({
      aim: e.detail.value.join(",")
    })
  },
  willChange: function (e) {
    this.setData({
      willingness: e.detail.value
    })
  },
  hopeChange: function (e) {
    this.setData({
      teaching: e.detail.value
    })
  },
  bindInput: function (e) {
    this.setData({
      activity: e.detail.value
    })
  },
  submitBind: function (e) {
    var that = this;
    wx.getStorage({
      key: 'stuNum',
      success: function(res) {
        that.setData({
          stuNum: res.data
        });
        wx.request({
          url: 'https://www.jdyx.club/tjyx_backend/web/index.php?r=survey/survey',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            stunum: that.data.stuNum,
            yearsexp: that.data.year,
            purpose: that.data.aim,
            willing: that.data.willingness,
            hope: that.data.teaching,
            advise: that.data.activity
          },
          success: function (result) {
            that.setData({
              returnCode: result.data.state,
            });
            if (that.data.returnCode.indexOf('success') != -1) {
              wx.redirectTo({
                url: '../recharge/recharge',
              });
            }
            else {
              console.log(that.data.returnCode);
            }
          }
        })
      },
    })
  }
})