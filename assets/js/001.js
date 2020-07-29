$(function () {
    // 点击切换跳转注册
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 自定义表单规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须8到16位，且不能出现空格'],
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致! '
            }
        }
    })

    // 监听注册表单提交
    $('#form_reg').on('submit', function (e) {
        // 阻止表单跳转
        e.preventDefault()
        // 发起ajax的post请求
        $.post('http://ajax.frontend.itheima.net/api/reguser',
            {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            function (str) {
                if (str.status !== 0) {
                    // return console.log(str.message);
                    // 创建提示
                    return layer.msg(str.message)
                }
                // console.log('注册成功');
                // 创建提示
                layer.msg('注册成功!')
                // 模拟注册成功的点击行为
                $('#link_login').click()
            })
    })
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            url: 'http://ajax.frontend.itheima.net/api/login',
            type: 'POST',
            data: $(this).serialize(),
            success: function (str) {
                if (str.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')

                // 存token字符串 重要 存本地
                localStorage.setItem('token', str.token)

                location.href = '/index.html'
            }
        })
    })
})