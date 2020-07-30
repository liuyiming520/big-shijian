$(function () {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        nickname: function (val) {
            if (val.length > 6) {
                return '昵称长度1~6个字'
            }
        }
    })

    inuserinfo()

    function inuserinfo() {
        $.ajax({
            type: 'GET',
            url: 'http://ajax.frontend.itheima.net/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取失败')
                }
                form.val('formuser', res.data)
            }
        })
    }
    // 重置表单提交
    $('#btnuser').on('click', function (e) {
        e.preventDefault()
        inuserinfo()
    })
    // 表单提交
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: 'http://ajax.frontend.itheima.net/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新失败')
                }
                layer.msg('更新成功')
                window.parent.getUser()
            }
        })
    })
})   