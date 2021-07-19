//ajax在遇到$.ajax  $.post $.get请求时   会自动调用
$.ajaxPrefilter(function(options){
    options.url = "http://api-breakingnews-web.itheima.net" + options.url

//为有token的请求  统一设置 header
if(options.url.indexOf("/my/") !== -1){
    options.headers = {
        Authorization:localStorage.getItem("token") || ""
    }
} 
options.complete =function(res){
    
    //这个res和success中的res不一样
    if(res.responseJSON.status ===1 && res.responseJSON.message === "身份认证失败！"){
        //强制清空token
        localStorage.removeItem("token")
        //不允许跳转到主页面  只能在登录页面
        location.href = "/login.html"
    }
}



})