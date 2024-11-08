const express = require('express')
const router = express.Router()//创建路由对象
const userHandler = require('../router_handler/user')

// //导入验证表单数据的中间件
// const expressJoi = require('@escook/express-joi')
// //导入需要验证规则对象
// const { reg_login_schema } = require('../schema/user')

//注册
router.post('/register', userHandler.register)
//登录
router.post('/login', userHandler.login)

module.exports = router