// const {Device, DeviceInfo} = require('../models/models')
const ApiError = require('../error/ApiError');
const {Question} = require("../models/models");
// const {Poll} = require("../models/models");

class QuestionController {
    async create(req, res, next) {

    }

    async getAll(req, res) {
        let {poll_id} = req.params
        console.log("adfadvas...............................S")
        console.log(this.question_id)
        // const polls = await Question.findAll(
        //     {
        //         where: {poll_id : this.question_id}
        //     }
        // )
        return res.json({"jj" : 87})
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
