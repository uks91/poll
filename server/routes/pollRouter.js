const Router = require('express')
const router = new Router()
const pollController = require('../controllers/pollController')
//const questionController = require("../controllers/deviceController");
let {questionRouter, id_question} = require("./questionRouter")

router.post('/', pollController.create)
router.get('/', pollController.getAll)
router.use('/:id/questions', (req, res) => {
    // console.log(req.params)
    // console.log("vcccbbbbccaa###")
    // res.status(404)
    // // res.render("adfadf")
    // res.json(req.params)
    let {id} = req.params
    id_question = id
    questionRouter(req, res, id);
})

// router.use("/:id/questionss", questionRouter)
router.get('/:id', pollController.getOne)

module.exports = router
