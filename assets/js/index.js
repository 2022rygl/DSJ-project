// 获取用户基本信息
const getUserInfo = () => {
  $.ajax({
    type: 'GET',
    url: '/my/userinfo',
    data: null,
    success: (res) => {
      console.log(res)
      const { data, status, message } = res
      renderAvatar(data)
      if (res.status !== 0) return layer.msg(message)
    },
  })
}
const renderAvatar = (data) => {
  // 获取用户名字
  let name = data.nickname || data.username
  // 设置欢迎文本
  $('#welcome').html(`欢迎 ${name}`)
  // 按需渲染用户头像
  if (data.user_pic !== null) {
    // 渲染图片头像
    $('.layui-nav-img').attr('src', data.user_pic).show()
    $('.text-avatar').hide()
  } else {
    // 渲染文本头像
    $('.layui-nav-img').hide()
    let firstName = name[0].toUpperCase()
    $('.text-avatar').html(firstName)
  }
}

// 退出登录
$('#btnLogout').click(() => {
  layui.layer.confirm(
    '确定退出登录？',
    { icon: 3, title: '' },
    function (index) {
      // 清空本地存储里面的 token
      localStorage.removeItem('token')
      // 重新跳转到登录页面
      location.href = '/login.html'
    }
  )
})
getUserInfo()
