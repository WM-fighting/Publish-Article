$(function(){
    getUserInfo()

    var layer = layui.layer
    $("#btnLogout").on("click",function(){
        layer.confirm('确定退出吗', {icon: 3, title:'提示'}, function(index){
            //清空本地的token
            localStorage.removeItem("token")
            //跳转到登录页面
            location.href = "/login.html"
            
            layer.close(index);
          });
    })
})
function  getUserInfo(){
    $.ajax({
        method:"GET",
        url:"/my/userinfo",
        //通过本地存储  拿到token
        // headers:{
        //     Authorization:localStorage.getItem("token") || ""
        // },
        success:function(res){
            if(res.status !== 0){
                return layui.layer.msg("获取用户信息失败！")
            }
            //渲染用户的头像
            renderAvatar(res.data)
        },
        //无论成功还是失败  都会调用complete
        // complete:function(res){
        //     console.log(res)
        //     //这个res和success中的res不一样
        //     if(res.responseJSON.status ===1 && res.responseJSON.message === "身份认证失败！"){
        //         //强制清空token
        //         localStorage.removeItem("token")
        //         //不允许跳转到主页面  只能在登录页面
        //         location.href = "/login.html"
        //     }
        // }
    })
}

function  renderAvatar(user){
    //1.获取用户的名称  如果是管理员就获取管理员
    var name = user.nickname || user.username
    //2.渲染页面中的文本  用户名
    $("#welcome").html("欢迎" + name)
    //3.按照是否有头像去渲染头像
    if(user.user_pic !== null){
        $(".layui-nav-img").attr("src",user.user_pic).show()
        $(".text-avatar").hide()
    }
    else{
        $(".layui-nav-img").hide()
        //文本头像的username的第一个字符转成大写
        var first = name[0].toUpperCase()
        $(".text-avatar").html(first).show()
    }
}
