$(function(){
    var layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  //通过上传按钮去触发隐藏区域的上传文本的按钮
  $("#btnChooseImage").on("click",function(){
      $("#file").click()
  })

  //给隐藏区域的上传文本的按钮绑定change事件
  $("#file").on("change",function(e){
      //获取change事件中的target中的files files为伪数组  存放上传的文件
    var filelist = e.target.files
    //通过判断文件数的长度  判断是否上传成功
    if(filelist.length === 0){
        return layer.msg("请选择照片！")
    }
    //上传成功
    //1、拿到用户选择的文件
    var file = e.target.files[0]
    //2、将文件  转换成路径 通过URL的URL.createObjectURL方法
    var newImgURL = URL.createObjectURL(file)
    //将拿到的路径设置为新的头像照片路径 销毁旧的裁剪区域
    $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newImgURL)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域
  })

  //将裁剪后的照片通过“确定”按钮上传至服务器 并重新渲染头像
  $("#btnUpload").on("click",function(){
      //1、为上传的图片创建一个画布容器  并将图片的地址格式转换为base64格式
    var dataURL = $image
    .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
      width: 100,
      height: 100
    })
    .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
  //2、调用接口
  $.ajax({
      method:"POST",
      url:"/my/update/avatar",
      data:{
          avatar:dataURL
      },
      success:function(res){
        if(res.status !== 0){
            return layer.msg("更换图片失败！")
        }
        layer.msg("更换图片成功！")
        window.parent.getUserInfo()
      }
  })

})
})