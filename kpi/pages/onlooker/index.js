var util = require('../../utils/util.js')
Page({
  data: {
    activeflag: true
  },
  onLoad: function () {
    
  },
  clickactive: function() {
    this.setData({
      activeflag: !this.data.activeflag
    });
  }
})
