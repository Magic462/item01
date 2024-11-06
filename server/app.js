// server.js
const express = require('express');
 // 引入数据库连接
const db = require('./db/index');
//处理跨域
const cors = require('cors');
//用于解析请求体
const bodyParser = require('body-parser');
//导入评论模块
const comment=require('./router/comment')

const app = express();
// 使用环境变量，如果没有设置则默认为 5000
const PORT = process.env.PORT || 5000;

// 中间件
app.use(cors());
app.use(bodyParser.json());

// 注册评论模块
app.use('/comment', comment)

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});