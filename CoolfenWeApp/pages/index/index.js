// const Promise = require('../../utils/es6-promise.min.js');
const auth = require('../../requestapi/auth');
const user = require('../../requestapi/user');
let app = getApp();
let pageSize = 10;
let currentPage = 0;
let fontLength = 8;
let merchants = [];
Page({
    data: {
        Merchants: [],
        Points: 0,
        Tickets: [],
        Times: 0,
        TotalSave: 0,
        UseCoupons: 0,
        UsePoints: 0,
        hasMore: false
    },
    onLoad: function () {
        console.log('onLoad');
        let that = this;
        auth.getUserInfo().then(function (info) {
            console.log('getUserInfo');
            that.getInfo();
        });
        app.store.on('receiveElectricCoupon', function (par) {
            that.getInfo();
        });
    },
    loadMore: function () {
        if (currentPage >= Math.ceil(merchants.length / pageSize)) {
            this.setData({hasMore: false});
        }else{
            this.setData({Merchants: merchants.slice(0, pageSize * ++currentPage)});
            if (currentPage >= Math.ceil(merchants.length / pageSize)){
                this.setData({hasMore: false});
            }
        }
    },
    imageErrorHandler: function (e) {
        let errorImgIndex = e.target.dataset.index;
        let item = this.data.Merchants[errorImgIndex];
        item.ImageUrl = app.waitingImgBase64;
        this.setData({Merchants: this.data.Merchants});
    },
    goDetail:function (e) {
        let mid = e.currentTarget.dataset.mid;
        wx.navigateTo({
            url: '../detail/detail?mid='+mid
        })
    },
    getInfo:function(){
        let that = this;
        user.getWeAppIndexPageInfo().then(function (data) {
            console.log('getWeAppIndexPageInfo');
            // data.Tickets = [
            //     {Type:'现金券',Money:5,Merchant:'商家一'},
            //     {Type:'代金券',Money:5,Merchant:'商家二'},
            //     {Type:'红包',Money:5.5,Merchant:'商家三'},
            //     {Type:'折扣券',Money:8,Merchant:'商家四'}
            // ];
            data.Tickets.forEach(function (t) {
                if(t.Merchant.length > fontLength){
                    t.Merchant = t.Merchant.substring(0,fontLength-2)+'...'
                }
                if (t.Type == '现金券') {
                    t.imgClass = 'cash-coupons';
                } else if (t.Type == '代金券') {
                    t.imgClass = 'vouchers';
                } else if (t.Type == '红包') {
                    t.imgClass = 'red-envelopes';
                } else if (t.Type == '折扣券') {
                    t.imgClass = 'discount-coupons';
                }
            });
            data.Merchants.forEach(function (m) {
                m.TicketsLabel = m.Tickets.map(function (t) {
                    let quantifier = t.Type != '折扣券' ? '元' : '折';
                    return t.Money + quantifier + t.Type;
                }).join(' / ');
            });
            merchants = data.Merchants;
            that.setData({
                // Merchants: data.Merchants,
                Points: data.Points,
                Tickets: data.Tickets,
                Times: data.Times,
                TotalSave: data.TotalSave.toFixed(2),
                UseCoupons: data.UseCoupons.toFixed(2),
                UsePoints: data.UsePoints.toFixed(2),
                hasMore: merchants.length>pageSize
            });
            that.loadMore();
        }).catch(function (err) {
            console.dir(err);
        })
    }
});
