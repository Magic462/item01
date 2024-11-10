const Router = require('koa-router')

const router = new Router()
const list = require('./list')
const home = require('./comment')
const layout = require('./layout')



router.use('/comment', list.routes(), list.allowedMethods())
router.use('/user', home.routes(), home.allowedMethods())
router.use('/layout', layout.routes(), layout.allowedMethods())
router.redirect('/', '/layout')

module.exports = router