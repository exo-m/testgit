/**
 * Created by feng on 2017/2/20.
 */
const config = require('../utils/config.js');
const Promise = require('../utils/es6-promise.min.js');
const cache = require('../utils/storage.js');
const request = require('request.js');
const userInfoUrl = config.baseApiUrl + '/help/GetWeAppUserInfo';

let getToken = function (pras) {
    if (!pras.clientId) {
        return Promise.reject('ClientId不能为空');
    }
    return request.clientCredentials(config.tokenUrl,pras.clientId,pras.secret)
};

let getUserInfoRequest = function (pars) {
    if (!pars.Code) {
        return Promise.reject('Code不能为空');
    }
    if (!pars.EncryptedData) {
        return Promise.reject('EncryptedData不能为空');
    }
    if (!pars.Iv) {
        return Promise.reject('Iv不能为空');
    }
    return request.post(userInfoUrl)
        .needToken(false)
        .send(pars)
        .end()
};

let getUserInfo = function () {
    let promise = new Promise(function (resolve, reject) {
        let cacheUser = cache.getUser();
        if (cacheUser) {
            resolve(cacheUser);
        } else {
            wx.login({
                success: function (loginInfo) {
                    console.dir(loginInfo);
                    wx.getUserInfo({
                        success: function (userInfo) {
                            let info = {
                                Code:loginInfo.code,
                                EncryptedData:userInfo.encryptedData,
                                Iv:userInfo.iv
                            };
                            getUserInfoRequest(info).then(function (result) {
                                if(result.data.unionId){
                                    cache.setUser(result.data);
                                    resolve(result.data);
                                }else{
                                    reject('获取用户信息失败！');
                                }
                            })
                        },
                        fail:function (err) {
                            reject(JSON.stringify(err));
                        }
                    })
                }
            })
        }
    });
    return promise;
};

module.exports = {
    getUserInfo: getUserInfo
};