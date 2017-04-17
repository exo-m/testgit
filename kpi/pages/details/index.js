Page({
  data: {
    userInfo: {},
    scrollFlag: false,
    _index: true,
    selectType: true,
    selectNumber: true,
    actionSheetHidden: true,
    types_title: "选择记分类别",
    num_title: "选择分数"

  },
 //点击选择记分类型
 clickTypes:function(){ 
    this.setData({
        selectType: !this.data.selectType,
        selectNumber: true
    });
 },
 mySelecttype:function(e){
  this.setData({
   types_title: e.target.dataset.me,
   selectType:true
  })
 },
 //点击选择分数
 clickNumber:function(){
    this.setData({
        selectNumber: !this.data.selectNumber,
        selectType: true
    });
 },
 mySelectnum:function(e){
  this.setData({
   num_title: e.target.dataset.me,
   selectNumber: true
  })
 },
  onLoad: function () {
    
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
  },
  reword: function() {
    console.log(12)
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  actionSheetChange: function(e) {
    this.setData({
    actionSheetHidden: !this.data.actionSheetHidden
    });
    console.log("点击ation-sheet-cancel，会触发action-sheet绑定的事件。在这里可以通过改变hidden控制菜单的隐藏");
  }
})