const layer = layui.layer // 获取 表格数据
const form = layui.form // 获取 表格数据

const initArtCateList = () => {
  $.ajax({
    type: 'GET',
    url: '/my/article/cates',
    data: null,
    success: (res) => {
      console.log(res)
      const { status, message, data } = res
      layer.msg(message)
      if (status !== 0) return layer.msg(message)
      let htmlStr = template('tpl-table', data)
      $('#tb').html(htmlStr)
    },
  })
}
initArtCateList()

$('#addCateBtn').click(function () {
  layer.open({
    type: 1,
    area: ['500px', '250px'],
    title: '添加文章分类',
    content: $('#dialog-add').html(),
  })
})

$('body').on('submit', '#form-add', function (e) {
  e.preventDefault()
  $.ajax({
    type: 'POST',
    url: '/my/article/addcates',
    data: form.val('formAdd'),
    success: (res) => {
      console.log(res)
    },
  })
})
