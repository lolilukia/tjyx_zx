Page({
  data: {
    rechargeText: '扫描下方二维码，缴纳30元会费',
    btnText: '完成'
  },
  jumpBack: function () {
    wx.showToast({
      title: '招新完成',
      icon: 'success',
      duration: 1000
    })
  },
})