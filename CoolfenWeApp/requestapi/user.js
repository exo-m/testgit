/**
 * Created by feng on 2017/3/6.
 */
const Promise = require('../utils/es6-promise.min.js');
const config = require('../utils/config.js');
const request = require('request.js');
const getWeAppIndexPageInfoUrl = config.baseApiUrl + '/Transaction/GetWeAppIndexPageInfo';
const getWeAppMerchantDetailUrl = config.baseApiUrl + '/Transaction/GetWeAppMerchantDetail';
const weAppAwardElectricCouponUrl = config.baseApiUrl + '/Transaction/WeAppAwardElectricCoupon';

let getValueRequestPromise = function (url,data) {
    let promise = new Promise(function (resolve, reject){
        request.post(url)
            .send(data)
            .end()
            .then(function (result) {
                if(result.data.ErrorCode==0){
                    resolve(result.data.Value);
                }else{
                    reject(result.data.ErrorMessage[0]);
                }
            });
    });
    return promise;
};

let getWeAppIndexPageInfo = function () {
    return getValueRequestPromise(getWeAppIndexPageInfoUrl);
};

let getWeAppMerchantDetail = function (merchantId) {
    return getValueRequestPromise(getWeAppMerchantDetailUrl,{MerchantId:merchantId});
};

let weAppAwardElectricCoupon = function (activityId) {
    return getValueRequestPromise(weAppAwardElectricCouponUrl,{ActivityId:activityId});
};

module.exports = {
    getWeAppIndexPageInfo: getWeAppIndexPageInfo,
    getWeAppMerchantDetail:getWeAppMerchantDetail,
    weAppAwardElectricCoupon:weAppAwardElectricCoupon,
};