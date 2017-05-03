/**
 * Created by feng on 2017/2/21.
 */
function getToken() {
    return wx.getStorageSync('token');
}

function setToken(token) {
    let now = new Date();
    token.exires_date = now.getTime()+token.expires_in*1000;
    wx.setStorageSync('token', token);
}

function getUser() {
    return wx.getStorageSync('user');
}

function setUser(user) {
    wx.setStorageSync('user', user);
}

module.exports = {
    getToken:getToken,
    setToken:setToken,
    getUser:getUser,
    setUser:setUser
};