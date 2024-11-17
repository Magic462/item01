const Router = require('koa-router')
const layouthandler = require('../router_handler/layout')

const router = new Router()

router.get('/titbang', layouthandler.titbang)
router.get('/mid')
module.exports = router