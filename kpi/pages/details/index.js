Page({
  data: {
    userInfo: {},
    scrollFlag: false,
    _index: true,
    selectType: true,
    selectNumber: true,
    actionSheetHidden: true,
    activeflag: false,
    textflag: false,
    types_title: "选择记分类别",
    num_title: "选择分数",
    textareacon: ""
  },
 //点击选择记分类型
 clickTypes:function(){ 
    this.setData({
        selectType: !this.data.selectType,
        selectNumber: true,
        textflag: true
    });
 },
 mySelecttype:function(e){
  this.setData({
   types_title: e.target.dataset.me,
   selectType:true,
   textflag: false
  })
 },
 //点击选择分数
 clickNumber:function(){
    this.setData({
        selectNumber: !this.data.selectNumber,
        selectType: true,
        textflag: true
    });
 },
 mySelectnum:function(e){
  this.setData({
   num_title: e.target.dataset.me,
   selectNumber: true,
   textflag: false
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
      actionSheetHidden: !this.data.actionSheetHidden,
      activeflag: true
    })
  },
  actionSheethid: function(e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden,
      activeflag: false
    });
  },
  actionSheethid1: function(e) {
    this.setData({
      actionSheetHidden: false
    });
  },
  confirm: function() {
    this.setData({
      actionSheetHidden: true,
      activeflag: false
    });
  },
  remain: function() {
    this.setData({
      types_title: "选择记分类别",
      num_title: "选择分数",
      textareacon: ""
    });
  },
  inputtext: function(e) {
    this.setData({
      textareacon: e.target.value
    })
  }
})