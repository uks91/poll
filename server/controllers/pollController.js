const {Poll, Question, Option, Submission, Answer} = require('../models/models')
const jwt = require('jsonwebtoken')

const createOptions = async (options, questionId) => {
    for (const item of options) {
        const option = await Option.create({questionId: questionId, text:item})
    }
}

const createQuestions = async (questions, pollId) => {
    for (const item of questions) {
        const question = await Question.create(
            {
                pollId: pollId,
                text: item.name,
                type: item.type
            })
        await createOptions(item.options, question.id)
    }
}

const checkSubmission = async (authorization, pollId) => {
    const userId = jwt.decode(authorization.split(' ')[1], {}).id
    const submission = await Submission.findOne({where: {
            userId,
            pollId
        }})
    return submission != null
}

function QuestionResult (questionId) {
    this.questionId = questionId
    this.options = []
    this.texts = []
    this.increaseOptionCount = function (optionId) {
        let option = this.options.find(item => item.optionId == optionId)
        if (option === undefined) {
            option = new OptionResult(optionId)
            this.options.push(option)
        }
        option.count += 1
    }
}

function OptionResult (optionId) {
    this.optionId = optionId
    this.count = 0
}

function Results () {
    this.questions = []
    this.increase = (questionId, optionId) => {
        let question = this.questions.find(item => item.questionId == questionId)
        if (question === undefined) {
            question = new QuestionResult(questionId)
            this.questions.push(question)
        }
        question.increaseOptionCount(optionId)
    }
    this.addText = (questionId, text) => {
        let question = this.questions.find(item => item.questionId == questionId)
        if (question === undefined) {
            question = new QuestionResult(questionId)
            this.questions.push(question)
        }
        question.texts.push(text)
    }
}

class PollController {

    async create(req, res) {
        const {name, description, questions} = req.body
        const poll = await Poll.create({name, description})
        await createQuestions(questions, poll.id)
        return res.json(poll)
    }

    async getAll(req, res) {
        const polls = await Poll.findAll()
        return res.json(polls)
    }

    async getResults (req, res) {
        const {pollId} = req.params
        let results = new Results()
        const data = await  Submission.findAll ({
            include: {model:Answer, required: true},
            where: {pollId: pollId}
        })

        for (const subm of data) {
            for (const answ of subm.answers) {
                if (answ.optionId == null)
                    results.addText(answ.questionId, answ.text)
                else
                    results.increase (answ.questionId, answ.optionId)
            }
        }
        return res.json(results)
    }

    async getOne(req, res) {
        const {pollId} = req.params
        const token = jwt.decode(req.headers.authorization.split(' ')[1], {})

        if (await checkSubmission(req.headers.authorization, pollId)) {
            return res.json({message: "Опрос уже пройден!"})
        }
        const poll = await Poll.findOne(
            {
                where: {id: pollId},
                include: {model: Question, include: Option}
            },
        )
        return res.json(poll)
    }

    async sendResults (req, res) {
        const {answers} = req.body
        const {pollId} = req.params
        if (await checkSubmission(req.headers.authorization, pollId)) {
            return res.json({message: "Опрос уже пройден!"})
        }
        const token = jwt.decode(req.headers.authorization.split(' ')[1], {})
        if (token.role == "ADMIN") {
            return res.json({message: "Админ не может проходить опросы!"})
        }

        const submission = await Submission.create({
            userId: token.id,
            pollId: pollId,
        })
        for (const answerAndId of answers) {
            const {questionId, answer} = answerAndId
            let obj = {
                submissionId: submission.id,
                questionId,
                text: null,
                optionId: null,
            }
            if (typeof (answer) == "string") {
                obj.text = answer
               await Answer.create (obj)
            }
            else if (typeof (answer) == "number") {
                obj.optionId = answer
                await Answer.create (obj)
            }
            else if (typeof (answer) ==  "object") {
                for (const optionId of answer) {
                    obj.optionId = optionId
                    await Answer.create (obj)
                }
            }
        }
        return res.json({})
    }
}

module.exports = new PollController()
