const Router = require('express')
const router = new Router()
const pollController = require('../controllers/pollController')
// const questionRouter = require("./questionRouter")

router.post('/new', pollController.create)
router.get('/', pollController.getAll)

// router.use('/:pollId/questions', (req, res, next) => {
//     questionRouter["pollId"] = req.params["pollId"]
//     next()
//     },
//     questionRouter
// )

router.get('/:pollId', pollController.getOne)


module.exports = router
