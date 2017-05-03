/**
 * Created by feng on 2017/2/20.
 */
const error = {
    show:function (error={}) {
        wx.showModal({
            title: error.title || '错误提示',
            content: error.content || '发生错误，请重试！',
            showCancel:false,
            success: error.success
        })
    }
};

module.exports = {
    error:error
};