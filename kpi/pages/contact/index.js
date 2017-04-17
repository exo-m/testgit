Page({
    data: {
        inputShowed: false,
        inputVal: "",
        showflag1: false,
        showflag2: false
    },
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
        this.setData({
            inputShowed: false,
            inputVal: ""
        });
    },
    clearInput: function () {
        this.setData({
            inputVal: ""
        });
    },
    inputTyping: function (e) {
        this.setData({
            inputVal: e.detail.value
        });
    },
    clickshow1: function() {
        this.setData({
            showflag1: !this.data.showflag1
        });
    },
    clickshow2: function() {
        this.setData({
            showflag2: !this.data.showflag2
        });
    }
});