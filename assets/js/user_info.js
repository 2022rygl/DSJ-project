const form = layui.form
const layer = layui.layer // 获取 表格数据

// 自定义校验规则
form.verify({
  nickname: (val) => {
    if (val.length > 10) return '昵称长度必须在 1 ~ 8 个字符之间！'
  },
  email: [/@/, '邮箱格式错误'],
})
const layer = layui.layer
// 初始化用户信息
const initUserInfo = () => {
  $.ajax({
    type: 'GET',
    url: '/my/userinfo',
    success: (res) => {
      console.log(res)
      const { data, status, message } = res
      if (status !== 0) return layer.msg('获取用户信息失败！')
      if (status !== 0) return layer.msg(message)
      form.val('formUserInfo', res.data)
    },
  })
}

initUserInfo()

$('#resetBtn').click(function (e) {
  e.preventDefault()
  initUserInfo()
})

$('.layui-form').submit(function (e) {
  e.preventDefault()
  $.ajax({
    type: 'POST',
    url: '/my/userinfo',
    data: form.val('formUserInfo'),
    success: (res) => {
      // console.log(res)
      const { data, status, message } = res
      layer.msg(message)
      // 调用父页面渲染函数
      window.parent.getUserInfo()
    },
  })
})
