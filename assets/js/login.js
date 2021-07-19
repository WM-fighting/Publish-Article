$(function(){
    //注册和登录切换
    $("#link-reg").on("click",function(){
        console.log(111)
        $(".login-box").hide()
        $(".reg-box").show()
    });
    $("#link-login").on("click",function(){
        console.log(2222)
        $(".reg-box").hide()
        $(".login-box").show()
    });
    //表单验证
    var form = layui.form
    var layer = layui.layer
    form.verify({
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ],
        //两次密码不一致的校验
        repwd:function(value){
            var pass = $(".reg-box [name=password]").val()
            if(pass !==value){
                return "两次密码不一致！"
            }

        }
      });
      $("#form-reg").on("submit",function(e){
        e.preventDefault();
        var data = {
            username:$(".reg-box [name=username]").val(),
            password:$(".reg-box [name=password]").val()
        }
        $.post(
            "/api/reguser",
            data,
            function(res){
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                layer.msg('注册成功！');
                $("#link-login").click()
            }
        )
      });
       $("#form-login").submit(function(e){
            e.preventDefault()
            $.post("/api/login",
                    $(this).serialize(),
                    function(res){
                    if(res.status !== 0){
                        return layer.msg("登录失败！")
                    }
                    layer.msg("登录成功！")
                    console.log(res)
                    localStorage.setItem("token",res.token)
                    location.href = "/index.html"
                }
                )
       })     
})