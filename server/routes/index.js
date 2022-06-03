const Router = require('express')
const router = new Router()
// const deviceRouter = require('./deviceRouter')
// const userRouter = require('./userRouter')
const pollRouter = require('./pollRouter')
// const typeRouter = require('./typeRouter')

router.use('/polls', pollRouter)
// router.use('/user', userRouter)
// router.use('/brand', brandRouter)
// router.use('/device', deviceRouter)

module.exports = router
