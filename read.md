跨域
jsonp 只支持 get 方法 原理就是 src 引入 js
后端代码
后端需要取到前端传递过来的回调函数名称和参数
app.get("/cors", function(req, res) {
let { cb, wd } = req.query;
res.send(`${cb}({data:"你好"})`);
});
Copy
前端代码
\$.ajax({
url: "http://localhost:3000/cors",
type: "GET",
dataType: "jsonp",
data: {
wd: "你好"
},
jsonp: "cb",
success: function(data) {
console.log(data);
}
});
cors 跨域 跨域资源共享 cross-origin resoure sharing 需要后端配置才可以 可以支持所有方法 简单请求 直接允许 post 和 get 跨域 复杂请求发送的时候 会先发一个预检请求(先问服务器支持不支持发送请求的类型) 预检请求 => OPTIONS
postmessage
data：顾名思义，是传递来的消息 source：发送消息的窗口对象 origin：发送消息窗口的源（协议+主机+端口号） // 确保 a、b 页面能访问
http://localhost:3000/a.html http://localhost:4000/b.html
A 页面引入 B 页面

<iframe id = "frame" src="http://localhost:4000/b.html" frameborder="0" onload="load()"></iframe>

load=()=>{
let frame= document.getElementById('frame');
frame.contentWindow.postMessage('你是好人','http://localhost:4000');
window.onmessage=function(e){
console.log(e.data)
}
}
我是 b 页面

<script>
window.onmessage=function(e){
console.log(e.data);
e.source.postMessage('你是坏人',e.origin)
}
</script>

location.hash
有 a、b、c 三个页面 a、b 同域 c 是单独 a 想访问 c a 给 c 传一个 hash 值 c 把 hash 值传递给 b,b 将结果放到 a 的 hash 值中 c 页面需要动态创建 iframe
let iframe =document.createElement('iframe');
iframe.src ='http://localhost:3000/b.html#youare';
document.body.appendChild(iframe)

# b 页面 放值 window.parent.parent.location.hash =location.hash;

# a 页面监听

window.onhashchange=function(){
console.log(location.hash)
}
window.name
a、b 同一个域名 c 独立
a 获取 c 的数据，a 先引用 c c 把值放在 window.name 上，把 a 的引用地址改到 b
a 页面 firstload 防止死循环

let firstload = true;
function load(){
let frame= document.getElementById('frame');

        if(firstload){
            frame.src ='http://localhost:3000/b.html';
           firstload = false;

        }else{
            console.log(frame.contentWindow.name)
        }

#b 页面
#c 页面
window.name = '你好'
docmument.domain
只适合使用在二级域名的情况
模拟 在 etc/hots 设置二级域名
window hots 目录
c:\windows\system32\drivers\etc
访问的页面
http://a.abc.com:3000/a.html http://b.abc.com:3000/b.html
websoket
前端 一般用 socket.io 进行兼容
let socket = new WebSocket('ws:localhost:3000');
socket.onopen=function(){
socket.send('你好')
}
socket.onmessage=function(e){
console.log(e.data)
}
后端 npm install ws
let express = require('express');
let app = express();
//npm install ws
let Websocket =require('ws');

<!-- 创建websoket服务器 -->

let wss = new Websocket.Server({port:3000})

<!-- 创建连接和发送消息 -->

wss.on('connection',function(ws){
ws.on('message',function(data){
console.log(data)
ws.send('你也好')
})
})
webpack 代理
vue-cli 2.0
config/index.js
proxyTable: {
'/':{
target:'http://localhost:3000',
changeOrigin:true,
pathRewrite:{
'^/':'/'
}
}
}
config/dev.env.js
module.exports = merge(prodEnv, {
NODE_ENV: '"development"',
API_HOST:'/' +需要加 API_HOST
})
vue-cli3.0
在 vue.config.js 里面进行配置
devServer: {
proxy: 'http://localhost:3000'
}
nginx 反向代理

node 中间件代理
