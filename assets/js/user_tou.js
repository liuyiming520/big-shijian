$(function () {
    var layer = layui.layer
    var $image = $('#image')
    var options = {
        aspectRatio: 1,
        preview: '.img-preview'
    }
    $image.cropper(options)

    $('#btnFile').on('click', function () {
        $('#file').click()
    })

    $('#file').on('change', function (e) {
        let fileList = e.target.files
        if (fileList.length === 0) {
            return layer.msg('请选择照片！')
        }

        let file = e.target.files[0]

        let imgURL = URL.createObjectURL(file)

        $image.cropper('destroy').attr('src', imgURL).cropper(options)
    })
    $('#btnQue').on('click', function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')

        $.ajax({
            type: 'post',
            url: 'http://ajax.frontend.itheima.net/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更换头像失败！')
                }
                layer.msg('更换头像成功！')
                window.parent.getUser()
            }

        })
    })
})
