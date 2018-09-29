request = {
    header: {
        from: 'pc',//标识请求来源
        token: 'xxxx'//最新的token,理论上每次都会变，要求前端要每次更新，用最新的token去请求
    },
    data: {//最外层一定是object，其它格式要往里放

    }
}
response = {
    header: {
        code:'0000',//用来表示几种前端需要辨识分别对待，作出与用户不同的交互。
        status: 'success',//取值为success或者failure，成功为success，失败failure
        errMsg: '',//如果status是failure，则这里一定要有说明内容
        token: 'xxxx'//最新的token,理论上每次都会变，要求前端要每次更新，用最新的token去请求
    },
    data: {//最外层一定是object，其它格式要往里放

    }
}
code=[
    '0000',//成功
    '0001',//没有权限
    '0002',//请求数据格式错误
    '0003',//请求数据缺失
    '0004',//token无效
]