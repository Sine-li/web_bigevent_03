// 入口函数
$(function () {
    // 1、按需切换登录与注册页面
    $('.toReg').on('click', function () {
        $('.reg-box').show();
        $('.login-box').hide();
    });
    $('.toLogin').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    });

    // 2、自定义校验规则
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须在6-12位之间，且不能包括空格'
        ],
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    // 3、用户注册
    $('#form-reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form-reg [name=username]').val(),
                password: $('#form-reg [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg('注册成功')
                // 模拟人点击登录
                $('.toLogin').click();
            }
        })
    })

    // 4、用户登录
    $('#form-login').on('submit',function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url : '/api/login',
            data : $(this).serialize(),
            success :function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)  
                // console.log(res);
                localStorage.setItem('token',res.token),
                console.log(res);
                // location.href = '/index.html '
            }
        })
    })
})