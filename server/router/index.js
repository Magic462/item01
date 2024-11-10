const Router = require('koa-router')

const router = new Router()
const user = require('./user')
// const comment = require('./comment')
// const layout = require('./layout')




// router.use('/comment', comment.routes(), comment.allowedMethods())
router.use('/user', user.routes(), user.allowedMethods())
// router.use('/layout', layout.routes(), layout.allowedMethods())
// router.redirect('/', '/layout')

module.exports = router