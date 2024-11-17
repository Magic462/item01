<<<<<<< HEAD
// const Router = require('koa-router')
// const userHandler = require('../router_handler/layout')

// const router = new Router()
// //ai
// router.post('/ai', userHandler.ai)

// module.exports = router
=======
const Router = require('koa-router')
const layouthandler = require('../router_handler/layout')

const router = new Router()

router.get('/titbang', layouthandler.titbang)
router.get('/mid')
module.exports = router
>>>>>>> d8e6586d244baf905e7e4369d6b5c03ff5204d69
