const {Poll} = require('../models/models')
const ApiError = require('../error/ApiError');

class PollController {
    async create(req, res) {
        const {name, description} = req.body
        const poll = await Poll.create({name, description})
        return res.json(poll)
    }

    async getAll(req, res) {
        const polls = await Poll.findAll()
        return res.json(polls)
    }

    async getOne(req, res) {
        const {pollId} = req.params
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
