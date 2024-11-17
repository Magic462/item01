const Router = require('koa-router')

const router = new Router()
const user = require('./user')
// const comment = require('./comment')
<<<<<<< HEAD
const layout = require('./layout')

=======
// const layout = require('./layout')
const layout = require('./layout')
>>>>>>> d8e6586d244baf905e7e4369d6b5c03ff5204d69



// router.use('/comment', comment.routes(), comment.allowedMethods())
router.use('/user', user.routes(), user.allowedMethods())
router.use('/layout', layout.routes(), layout.allowedMethods())
// router.redirect('/', '/layout')
router.use('/mainPart', layout.routes(), layout.allowedMethods())

module.exports = router
