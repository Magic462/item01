const Router = require('koa-router')

const router = new Router()
const user = require('./user')
const layout = require('./layout')




router.use('/user', user.routes(), user.allowedMethods())

router.use('/mainPart', layout.routes(), layout.allowedMethods())

module.exports = router
