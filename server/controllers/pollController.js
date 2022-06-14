const {Poll, Question, Option} = require('../models/models')
const ApiError = require('../error/ApiError');

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

class PollController {

    async create(req, res) {
        const {name, description, questions} = req.body
        console.log("N@@@@@@@@@@@@@me is ", name)
        const poll = await Poll.create({name, description})
        await createQuestions(questions, poll.id)
        return res.json(poll)
    }

    async getAll(req, res) {
        const polls = await Poll.findAll()
        return res.json(polls)
    }

    async getOne(req, res) {
        const {pollId} = req.params
        console.log("GetOne", pollId)
        const poll = await Poll.findOne(
            {
                where: {id : pollId},
                // include: [{name: DeviceInfo, as: 'info'}]
            },
        )
        return res.json(poll)
    }
}

module.exports = new PollController()
