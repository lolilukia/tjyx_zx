const app = getApp()

Page({
  data: {
    realname: '',
    stunum: '',
    college: '汽车学院',
    phoneNum: '',
    willing: '0',
    returnCode: '',
    array: ['汽车学院', '铁道与城市轨道交通研究院', '经济与管理学院', '交通运输工程学院', '中德学院', '机械工程学院', '电子与信息工程学院', '软件学院', '材料科学与工程学院','艺术与传媒学院','中德工程学院'],
    objectArray: [
      {
        id: 0,
        name: '汽车学院'
      },
      {
        id: 1,
        name: '铁道与城市轨道交通研究院'
      },
      {
        id: 2,
        name: '经济与管理学院'
      },
      {
        id: 3,
        name: '交通运输工程学院'
      },
      {
        id: 4,
        name: '中德学院'
      },
      {
        id: 5,
        name: '机械工程学院'
      },
      {
        id: 6,
        name: '电子与信息工程学院'
      },
      {
        id: 7,
        name: '软件学院'
      },
      {
        id: 8,
        name: '材料科学与工程学院'
      },
      {
        id: 9,
        name: '艺术与传媒学院'
      },
      {
        id: 10,
        name: '中德工程学院'
      }
    ],
    index: 0,
    elements: ['否', '是'],
    objectElements: [
      {
        id: 0,
        name: '否'
      },
      {
        id: 1,
        name: '是'
      }
    ],
    item: 0,
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value,
      college: this.data.array[e.detail.value]
    })
  },
  pickerChange: function (e) {
    this.setData({
      item: e.detail.value,
      willing: e.detail.value
    })
  },
  submitBind: function (e) {
    if (this.data.realname == '' || this.data.stunum == '' || this.data.phoneNum == '') {
      wx.showToast({
        title: '信息不能为空',
        icon: 'loading',
        duration: 1000
      })  
      return;
    }
    else{
      var myreg = /^(((13[0-9]{1})|(14[5|7])|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/; 
      if (this.data.phoneNum.length != 11 || !myreg.test(this.data.phoneNum)){
        wx.showToast({
          title: '手机号填写有误',
          icon: 'loading',
          duration: 1000
        })
        return;
      }
      else if (Number.isNaN(Number(this.data.stunum))){
        wx.showToast({
          title: '学号填写有误',
          icon: 'loading',
          duration: 1000
        })
        return;
      }
    }
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: 'https://www.jdyx.club/tjyx_backend/web/index.php?r=bind/add',
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              realname: that.data.realname,
              stunum: that.data.stunum,
              college: that.data.college,
              phoneNum: that.data.phoneNum,
              willing: that.data.willing
            },
            success: function (result) {
              that.setData({
                returnCode: result.data.state
              });
              console.log(that.data.returnCode)
              //已经填过
              if (that.data.returnCode.indexOf('fail') != -1) {
                wx.redirectTo({
                  url: '../hasEnroll/hasEnroll',
                });
              }
              //成功填写招新信息
              else if (that.data.returnCode.indexOf('success') != -1) {
                /*
                wx.redirectTo({
                  url: '../questionnaire/questionnaire',
                });
                wx.setStorage({
                  key: 'stuNum',
                  data: that.data.stunum
                });
                */
                wx.showToast({
                  title: '招新完成',
                  icon: 'success',
                  duration: 1000
                })
              }
              else {
                console.log(that.data.returnCode);
              }
            }
          })
        }
      }
    });
  },
  inputName: function (e) {
    this.setData({
      realname: e.detail.value
    });
  },
  inputNumber: function (e) {
    this.setData({
      stunum: e.detail.value
    });
  },
  inputPhone: function (e) {
    this.setData({
      phoneNum: e.detail.value
    });
  }
})