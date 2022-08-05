const layer = layui.layer // 获取 表格数据
const form = layui.form // 获取 表格数据

const initArtCateList = () => {
  $.ajax({
    type: 'GET',
    url: '/my/article/cates',
    data: null,
    success: (res) => {
      // console.log(res)
      const { status, message, data } = res
      layer.msg(message)
      if (status !== 0) return layer.msg(message)
      let htmlStr = template('tpl-table', data)
      $('#tb').html(htmlStr)
    },
  })
}
initArtCateList()
let indexAdd = null
$('#addCateBtn').click(function () {
  indexAdd = layer.open({
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
      const { status, message } = res
      layer.msg(message)
      if (status !== 0) return
      initArtCateList()
      layer.close(indexAdd)
    },
  })
})

let layerEdit = null
$('#tb').on('click', '.btn-edit', function () {
  layerEdit = layer.open({
    // 弹出修改文章分类的弹窗
    type: 1,
    area: ['500px', '250px'],
    title: '修改文章分类',
    content: $('#dialog-edit').html(),
  })
  const id = $(this).attr('data-id')
  $.ajax({
    type: 'GET',
    url: '/my/article/cates/' + id,
    success: (res) => {
      console.log(res)
      const { status, message, data } = res
      if (status !== 0) return layer.msg(message)
      form.val('form-edit', data)
    },
  })
})
$('body').on('submit', '#form-edit', function (e) {
  e.preventDefault()
  $.ajax({
    type: 'POST',
    url: '/my/article/updatecate',
    data: form.val('form-edit'),
    success: (res) => {
      console.log(res)
      const { status, message } = res
      layer.msg(message)
      if (status !== 0) return
      initArtCateList()
      layer.close(layerEdit)
    },
  })
})

$('#tb').on('click', '.btn-delete', function () {
  let id = $(this).attr('data-id')
  layer.confirm('确定删除吗？', { icon: 3, title: '提示' }, function (index) {
    $.ajax({
      type: 'GET',
      url: '/my/article/deletecate/' + id,
      data: null,
      success: (res) => {
        const { status, message } = res
        layer.msg(message)
        if (status !== 0) return
        layer.close(index)
        initArtCateList()
      },
    })
  })
})
