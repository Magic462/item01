const express = require('express')
const router = express.Router()//创建路由对象

// 导入模块
const commentHandler = require('../router_handler/comment')

//评论区
router.post('/',commentHandler.comment)

//智小圈


// 将路由对象共享出去
module.exports = router