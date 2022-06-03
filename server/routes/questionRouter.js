const Router = require('express')
const router = new Router()
const questionController = require('../controllers/questionController')

let id_question = 0

// console.log("QuestionRouter@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
// console.log(router.params)

// router.post('/', questionController.create)
// router.get('/', questionController.getAll)
// router.get('/:id', questionController.getOne)

router.get('/', (req, res) => {
    questionController["pollId"] = router.pollId
    return questionController.getAll(req, res)
}
    )

module.exports = router
