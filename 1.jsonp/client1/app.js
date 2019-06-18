///client1用来写接口
let express = require('express')
let app = express()
app.get('/cors', function (req, res) {
    //后端需要取代前端传过来的回调函数和名称
    let { cb, wd } = req.query;
    console.log(req.query)
    res.send(`${cb}({data:'你好'})`)
})
app.listen(3000, function () {
    console.log('服务器1启动，端口3000')
})



