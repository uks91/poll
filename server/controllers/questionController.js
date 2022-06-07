// const {Device, DeviceInfo} = require('../models/models')
const ApiError = require('../error/ApiError');
const {Question} = require("../models/models");
// const {Poll} = require("../models/models");

class QuestionController {
    async create(req, res, next) {

    }

    async getAll(req, res) {
        let {poll_id} = req.params

        const polls = await Question.findAll(
            {
                where: {pollId : this.pollId}
            }
        )
        return res.json(polls)
    }

    async getOne(req, res) {
        /*const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            },
        )
        return res.json(device)*/
    }
}

module.exports = new QuestionController()
