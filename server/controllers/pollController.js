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

const findQuestions = async (pollId) => {
    const questions = await Question.findAll({where: {pollId: pollId}, include: Option})
    return questions
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
                include: {model: Question, include: Option}
            },
        )
        const questions = await findQuestions(pollId)
        // const poll = {
        //
        // }
        // poll.questions = questions

        console.log("poll!!!!", poll)
        return res.json(poll)
        return res.json({
            id: poll.id,
            name: poll.name,
            description: poll.description,
            questions
        })
    }
}

module.exports = new PollController()
