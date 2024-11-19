const Router = require('koa-router')
const layouthandler = require('../router_handler/layout')

const router = new Router()

router.get('/titbang', layouthandler.titbang)
router.get('/mid', layouthandler.mid)
router.post('/ai', layouthandler.ai)
module.exports = router
