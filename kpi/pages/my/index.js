Page({
  data: {
    userInfo: {},
    scrollFlag: false,
    _index: true
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
  },
  scrollHandler: function(e) {
    console.log(e.detail.scrollTop)
    if(e.detail.scrollTop > 0 && this.data._index) {
      console.log(1)
      this.setData({
        scrollFlag: true,
        _index: false
      });
      
    }else if(e.detail.scrollTop <= 5){
      this.setData({
        scrollFlag: false,
        _index: true
      });
    }
  }
})