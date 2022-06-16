const Router = require('express')
const router = new Router()
const pollController = require('../controllers/pollController')
// const questionRouter = require("./questionRouter")

router.post('/new', pollController.create)
router.get('/', pollController.getAll)


router.get('/:pollId', pollController.getOne)
router.get('/results/:pollId', pollController.getResults)
router.post('/:pollId', pollController.sendResults)


module.exports = router
