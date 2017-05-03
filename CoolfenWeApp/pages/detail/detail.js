//logs.js
const util = require('../../utils/util.js');
const user = require('../../requestapi/user');
let mid;
let app = getApp();
Page({
    data: {
        // Merchant:{
        //     Id:'001',
        //     Name:'杨国福麻辣烫',
        //     Address:'武昌区中南路傅家坡汽车客运站旁',
        //     Telephone:'12345678901',
        //     Avg:12,
        //     ImageUrl:app.waitingImgBase64,
        // },
        // Points:374,
        // Tickets:[
        //     {Type:'代金券',Money:2,MinimumMoney:0.01,ExpireDate:util.formatDate(new Date(),'yyyy-MM-dd'),imgClass:'vouchers-small'},
        //     {Type:'现金券',Money:2,MinimumMoney:0.01,ExpireDate:'2017-01-20',imgClass:'cash-coupons-small'},
        //     {Type:'红包',Money:2,MinimumMoney:0.01,ExpireDate:'2017-01-20',imgClass:'red-envelopes-small'}
        // ],
        // MoreMerchants:[
        //     {Id:'001',MerchantName:'杨国福麻辣烫',Type:'代金券',Money:2,MinimumMoney:0.01,ExpireDate:'2017-01-20',imgClass:'vouchers-big'},
        //     {Id:'002',MerchantName:'酷分',Type:'现金券',Money:2,MinimumMoney:0.01,ExpireDate:'2017-01-20',imgClass:'cash-coupons-big'},
        // ]
    },
    onReady: function () {

    },
    onLoad: function (option) {
        let that = this;
        mid=option.mid;
        wx.setNavigationBarTitle({title: '加载中...'});
        user.getWeAppMerchantDetail(option.mid).then(function (info) {
            wx.setNavigationBarTitle({title: info.Merchant.Name});
            info.Tickets.forEach(function (t) {
                t.ExpireDate = util.formatDate(new Date(t.ExpireDate),'yyyy-MM-dd');
                if (t.Type == '现金券') {
                    t.imgClass = 'cash-coupons-small';
                } else if (t.Type == '代金券') {
                    t.imgClass = 'vouchers-small';
                } else if (t.Type == '红包') {
                    t.imgClass = 'red-envelopes-small';
                } else if (t.Type == '折扣券') {
                    t.imgClass = 'discount-coupons-small';
                }
            });
            info.MoreMerchants.forEach(function (t) {
                t.ExpireDate = util.formatDate(new Date(t.ExpireDate),'yyyy-MM-dd');
                if (t.Type == '现金券') {
                    t.imgClass = 'cash-coupons-big';
                } else if (t.Type == '代金券') {
                    t.imgClass = 'vouchers-big';
                } else if (t.Type == '红包') {
                    t.imgClass = 'red-envelopes-big';
                } else if (t.Type == '折扣券') {
                    t.imgClass = 'discount-coupons-big';
                }
            });
            that.setData(info);

        }).catch(function (err) {
            console.dir(err);
        })
    },
    goRule:function () {
        wx.navigateTo({
            url: '../rule/rule'
        })
    },
    receive:function (e) {
        let that = this;
        let clickIndex = e.target.dataset.index;
        let item = this.data.MoreMerchants[clickIndex];
        user.weAppAwardElectricCoupon(item.ActivityId).then(function (data) {
            app.store.emit('receiveElectricCoupon',{});
            if(mid == item.MerchantId){
                that.data.MoreMerchants.splice(clickIndex,1);
                that.data.Tickets.unshift(item);
                that.setData({
                    MoreMerchants:that.data.MoreMerchants,
                    Tickets:that.data.Tickets
                })
            }else{
                item.received = true;
                that.setData({
                    MoreMerchants:that.data.MoreMerchants
                })
            }
        }).catch(function (err) {
           console.dir(err);
        });
    },
    imageErrorHandler: function (e) {
        this.setData({'Merchant.ImageUrl': app.waitingImgBase64});
    },
});
