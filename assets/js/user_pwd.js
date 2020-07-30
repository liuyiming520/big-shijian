$(function () {
    var form = layui.form

    form.verify({
        pwd: [/^[\S]{6,12}$/, '必须6-12位数切不能有空格'],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新密码不能与旧密码相同'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致'
            }
        }
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: 'http://ajax.frontend.itheima.net/my/updatepwd',
            data: $(this).serialize(),
            success: function (str) {
                if (str.status !== 0) {
                    return layui.layer.msg('原密码不正确')
                }
                layui.layer.msg('更新成功')

                $('.layui-form')[0].reset()

            }
        })
    })
})