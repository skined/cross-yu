///client1用来写接口
let express = require('express')
let app = express()
//携带cookie跨域域名不能使用通配符
let whitelist = ['http://localhost:4100'];
app.use(function (req, res, next) {
    //拿到访问域名
    let origin = req.headers.origin
    console.log(req.headers)
    //所有的请求都会先走中间件  这里的req，和res和下面的req，res是一个
    //允许哪个域访问
    if (whitelist.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
        //设置允许哪个方法跨域
        res.header('Access-Control-Allow-Methods', 'PUT,GET,POST,DELETE,OPTIONS')
        //允许携带哪个请求头跨域
        res.header('Access-Control-Allow-Headers', 'name')
        //允许携带cookie跨域
        res.header('Access-Control-Allow-Credentials', true)
        //设置预检请求存活时间 如果发送了一次请求一段时间内就不再发送请求了时间单位是s
        res.header('Access-Control-Max-Age', 6)
        //设置响应头
        res.header('Access-Control-Expose-Headers', 'name')
        //对于遇见请求直接返回成功
        if (next.method == 'OPTIONS') res.end()
        next();
    }
});

app.put('/cors1', function (req, res) {
    //后端需要取代前端传过来的回调函数和名称
    res.send('1234')
})
app.listen(3300, function () {
    console.log('服务器1启动，端口3300')
})