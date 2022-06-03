const Router = require('express')
const router = new Router()
const questionController = require('../controllers/questionController')

let id_question = 0

console.log("QuestionRouter@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
console.log(router.params)

// router.post('/', questionController.create)
router.get('/', questionController.getAll)
// router.get('/:id', questionController.getOne)

module.exports =
    {
        router,
        id_question
    }
