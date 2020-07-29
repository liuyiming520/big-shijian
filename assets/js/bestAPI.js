$.ajaxPrefilter(function (opthons) {
    // opthons.url = 'http://ajax.frontend.itheima.net' + opthons.url



    // 有权接口的简化
    if (opthons.url.indexOf('/my/') !== -1) {
        opthons.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    opthons.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 清空缓存
            localStorage.removeItem('token')
            // 跳转页面
            location.href = '/login.html'
        }
    }
})