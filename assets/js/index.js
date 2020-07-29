$(function () {
    getUser()

    let layer = layui.layer
    $('#tui').on('click', function () {
        layer.confirm('真的要退出吗?', { icon: 3, title: '噔噔噔噔' }, function (index) {
            // 清空本地存储
            localStorage.removeItem('token')
            // 跳转页面
            location.href = '/login.html'

            layer.close(index)
        })
    })
})
// 获取用户信息
function getUser() {
    $.ajax({
        type: 'GET',
        url: 'http://ajax.frontend.itheima.net/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (str) {
            if (str.status !== 0) {

                return layui.layer.msg('获取用户信息失败!')
            }
            renderAvatar(str.data)
        },
        // complete: function (sty) {
            
        // }

    })
}
function renderAvatar(u) {
    var name = u.username || u.nickname
    console.log(u);
    $('#welCome').html('欢迎&nbsp;' + name)
    if (u.user_pic !== null) {
        $('.layui-nav-img').attr('src', user_pic).show()
    } else {
        $('.layui-nav-img').hide()
        var fl = name[0].toUpperCase()
        $('.text-avatar').html(fl).show()
    }
}