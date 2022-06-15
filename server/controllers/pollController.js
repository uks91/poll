const {Poll, Question, Option, Submission, Answer} = require('../models/models')
const ApiError = require('../error/ApiError');
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
    return submission.id != null
}

class PollController {

    async create(req, res) {
        const {name, description, questions} = req.body
        const poll = await Poll.create({name, description})
        await createQuestions(questions, poll.id)
        return res.json(poll)
    }

    async getAll(req, res) {
        console.log("Get All!")
        const polls = await Poll.findAll()
        return res.json(polls)
    }

    async getOne(req, res) {
        const {pollId} = req.params
        console.log("GetOne", pollId)
        const token = jwt.decode(req.headers.authorization.split(' ')[1], {})

        if (token.role == "USER") {

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
        else if (token.role == "ADMIN") {

        }
        return res.json({})
    }

    async sendResults (req, res) {
        const {answers} = req.body
        const {pollId} = req.params
        // console.log(answers)
        if (await checkSubmission(req.headers.authorization, pollId)) {
            return res.json({message: "Опрос уже пройден!"})
        }
        const token = jwt.decode(req.headers.authorization.split(' ')[1], {})
        const submission = await Submission.create({
            userId: token.id,
            pollId: pollId,
        })
        for (const answerAndId of answers) {
            const {questionId, answer} = answerAndId
            console.log("Question: ", questionId)
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
            // else
            //     console.log("answer has typeof " + typeof answer)
        }
        // console.log("Token:", )
        return res.json({})
    }
}

module.exports = new PollController()
