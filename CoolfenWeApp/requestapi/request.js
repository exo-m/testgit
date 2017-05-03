/**
 * Created by feng on 2017/2/14.
 */
const config = require('../utils/config.js');
const Promise = require('../utils/es6-promise.min.js');
const base64 = require('../utils/base64.js');
const cache = require('../utils/storage.js');
const message = require('../utils/message.js');

// module.exports = function (api, path, params) {
//     return new Promise((resolve, reject) => {
//         wx.request({
//             url: `${api}/${path}`,
//             data: Object.assign({}, params),
//             header: { 'Content-Type': 'json' },
//             success: resolve,
//             fail: reject
//         })
//     })
// }

/**
 * [request description]
 * @param  {[type]} method [description]
 * @param  {[type]} url    [description]
 * @param  {[type]} data   [description]
 * @param  {[type]} header [description]
 * @return {[type]}        [description]
 */
let request = function (method, url, data, header) {
    if (typeof method === 'object') {
        url = method.url;
        data = method.data;
        header = method.header;
        method = method.method;
        needToken = true;
    }
    let req = {}, def = {
        header: function (name, value) {
            if (value) req.header[name] = value;
            else req.header = name;
            return def;
        },
        query: function (name, value) {
            if (value) req.data[name] = value;
            else req.data = name;
            return def;
        },
        send: function (name, value) {
            if (value) req.data[name] = value;
            else req.data = name;
            return def;
        },
        needToken:function (value) {
            req.needToken = value;
            return def;
        },
        use: function (middleware) {
            req = middleware.call(def, req);
            return def;
        },
        clientCredentials: function (tokenUrl, clientId, secret) {
            req.url = tokenUrl || config.tokenUrl;
            req.needToken = false;
            req.method = "POST";
            req.header = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + base64.encode(clientId + ':' + secret),
            };
            req.data = {grant_type: 'client_credentials'};
            return def;

        },
        end: function (callback, done) {
            if(!req.refreshed && req.needToken){
                return refreshToken(Object.assign({},req));
            } else {
                let p = new Promise(function (resolve, reject) {
                    if (!callback) {
                        wx.showNavigationBarLoading();
                        callback = function (err, res) {
                            wx.hideNavigationBarLoading();
                            if (err) return reject(err);
                            else resolve(res);
                        };
                    }
                });
                if(!req.header){
                    if(req.needToken){
                        let token = cache.getToken();
                        let tokenHeader = {'Authorization': `${token.token_type} ${token.access_token}`};
                        req.header = tokenHeader;
                    }else{
                        req.header = {};
                    }

                }
                if (!req.header['Content-Type']) {
                    req.header['Content-Type'] = 'application/json';
                }
                req.complete = done;
                req.fail = callback;
                req.success = callback.bind(req, null);
                wx.request(req);
                return p;
            }

        },
        retry:function (reqPars) {
            req = reqPars;
            req.refreshed = true;
            return this.end();
        }
    };

    ['get', 'post', 'put', 'delete'].forEach(function (method) {
        def[method] = (function () {
            return function (url) {
                req = {
                    method: method,
                    url: url,
                    header: null,
                    data: {},
                    needToken : true,
                };
                return def;
            };
        })();

    });

    function refreshToken(pars) {
        let p = new Promise(function (resolve, reject) {
            let token = cache.getToken();
            if (!token || token.exires_date < new Date()) {
                def.clientCredentials(config.tokenUrl, cache.getUser().unionId, config.appGuid)
                    .end()
                    .then(function(result){
                        if (result.data.access_token) {
                            cache.setToken(result.data);
                        }
                        resolve(def.retry(pars))
                    })
                    .catch(reject)
            }else{
                resolve(def.retry(pars));
            }
        });
        return p;
    }

    function refreshTokenTest(method) {
        let p = new Promise(function (resolve, reject) {
            resolve(method());
        });
        return p;
    }

    return def;
};

module.exports = new request();