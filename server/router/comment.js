const express = require('express')
const router = express.Router()//创建路由对象

// 导入模块
const commentHandler = require('../router_handler/comment')
router.post('/comment',commentHandler.comment)

// 将路由对象共享出去
module.exports = router