const Router = require('koa-router')
const layouthandler = require('../router_handler/layout')

const router = new Router()

router.get('/titbang', layouthandler.titbang)
router.get('/mid', layouthandler.mid)
router.get('/chatRoomHistory', layouthandler.chatRoomHistory)
router.post('/ai', layouthandler.ai)
router.post('/getChatHistory', layouthandler.getChatHistory)
router.post('/clearChatHistory', layouthandler.clearChatHistory)
router.post('/upload', layouthandler.upload)
module.exports = router
