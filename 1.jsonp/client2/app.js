//client2服务器用来做我们的客户端
let express = require('express')
let app = express()
app.use(express.static(__dirname))
app.listen(4000, function () {
    console.log('服务器2启动，端口4000')
})
