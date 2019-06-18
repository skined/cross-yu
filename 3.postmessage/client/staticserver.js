let express = require("express");
let app = express();
app.use(express.static(__dirname));
app.listen(3400, function () {
    console.log("静态服务器已经启动，端口3400");
});
