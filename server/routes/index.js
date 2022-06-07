const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const pollRouter = require('./pollRouter')

router.use('/polls', pollRouter)
router.use('/user', userRouter)

module.exports = router
