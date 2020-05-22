$(document).ready(function() {
  // 表单校验
  $('#form').bootstrapValidator({
    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // 校验字段
    fields: {
      username: {
        validators: {
          // 1.非空
          notEmpty: {
            message: '用户名不能为空'
          },
          // 2.长度
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须在2-6位之间'
          }
        }
      },
      password: {
        validators: {
          // 1.非空
          notEmpty: {
            message: '密码不能为空'
          },
          // 2.长度
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度必须在6-12位之间'
          }
        }
      }
    }
  })

  // 注册表单校验成功事件
  $('#form').on('success.form.bv', function(e) {
    // 阻止浏览器的默认行为,使用ajax提交
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: '/employee/employeeLogin',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function(res) {
        console.log(res)
        if(res.error === 1000) {
          alert('用户名不存在')
        }
        if(res.error === 1001) {
          alert('密码错误')
        }
        if(res.success) {
          // 跳转到首页
          location.href = 'index.html'
        }
      }
    })
  })
})
