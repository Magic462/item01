// server.js
const express = require('express');
 // 引入数据库连接
const db = require('./db/index');
//处理跨域
const cors = require('cors');
//用于解析请求体
const bodyParser = require('body-parser');
const app = express();
// 使用环境变量，如果没有设置则默认为 5000
const PORT = process.env.PORT || 3007;
// 中间件
app.use(cors());
 

// 使用 body-parser 中间件
app.use(bodyParser.json()); // 解析 JSON 格式的请求体
app.use(bodyParser.urlencoded({ extended: true })); // 解析 URL 编码的请求体




// // 定义根路由
// app.get('/', (req, res) => {
//   res.send('Welcome to the API!');
// });


//导入并使用用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)
//导入评论模块
const comment=require('./router/comment')
// 注册评论模块
app.use('/comment', comment)


//观察日志
app.use((req, res, next) => { console.log(`Request received: ${req.method} ${req.url}`); next(); });

// 404 错误处理
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// 启动服务器
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});