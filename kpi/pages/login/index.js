var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    name_user: "",
    pass_user: "",
    warningflag: true
  },
  //事件处理函数
  bindSubmit: function() {
    let that = this;
    if(this.data.pass_user == "123456" && this.data.name_user == "andy") {
       wx.switchTab({
        url: '../index/index'
      });
    }else {
      this.setData({
        warningflag: false
      });
      setTimeout(function(){
        that.setData({
          warningflag: true
        })
      },1000);
    }
    // wx.navigateBack();
  },
  EventHandle1: function(e) {
    this.setData({
      name_user: e.detail.value
    })
  },
  EventHandle2: function(e) {
    this.setData({
      pass_user: e.detail.value
    })
  },
  onLoad: function () {
    // console.log('onLoad')
    // var that = this
    // //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })
  }
})