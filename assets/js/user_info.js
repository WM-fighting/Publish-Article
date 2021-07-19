$(function(){
    var form = layui.form
    // var layer =layui.layer

    form.verify({
       nickname: function(value){
        if(value.length > 6){
            return "昵称长度必须在1~6个字符之间！"
        }
       }
    })
//获取用户的信息  渲染到表单中
    initUserInfo()

    //重置表单时  保存用户名
    $("#btnReset").on("click",function(e){
        //阻止默认的提交行为
        e.preventDefault()
        //再次调用一下initUserInfo()  重新渲染表单
        initUserInfo()
        
    })

    $(".layui-form").on("submit",function(e){
        e.preventDefault()
        $.ajax({
            method:"POST",
            url:"/my/userinfo",
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg("更新用户信息失败！")
                }
                layer.msg("更新用户信息成功!")
                window.parent.getUserInfo()
            }
        })
    })


})

//初始化用户基本信息
function initUserInfo(){
    var form = layui.form
    $.ajax({
        method:"GET",
        url:"/my/userinfo",
        success:function(res){
        //   console.log(res)  
        if(res.status !== 0){
            return  layer.msg("获取用户信息失败")
        }
        form.val("initUserInfo",res.data)
        }
    })
}