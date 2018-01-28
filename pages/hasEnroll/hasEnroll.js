Page({
  data: {
    hasEnrollSize: 70,
    hasEnrollColor: 'green',
    hasEnrollType: 'success',
    hasEnrollText: '你已参与过招新', 
    rechargeText: '缴纳会费',
    backText: '完成',
  },
  jumpRecharge: function (){
    wx.redirectTo({
      url: '../recharge/recharge'
    })
  },
  jumpBack: function () {
    wx.showToast({
      title: '招新完成',
      icon: 'success',
      duration: 1000
    })
  }
})