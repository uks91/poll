import {makeAutoObservable} from "mobx";

export default class PollsStore {
    constructor() {
        this._polls = [
            // {
            //     "pollId": 1,
            //     "pollName": "pollName-1",
            //     "questions" : [
            //         {
            //             "questionId":1,
            //             "text" : "question11"
            //         },
            //         {
            //             "questionId":2,
            //             "text" : "question12"
            //         },
            //     ]
            //
            // },
            //
            // {
            //     "pollId": 2,
            //     "pollName": "pollName-2",
            //     // "questions" : [
            //     //     {
            //     //         "questionId":3,
            //     //         "text" : "question23"
            //     //     },
            //     //     {
            //     //         "questionId":4,
            //     //         "text" : "question24"
            //     //     },
            //     // ]
            //
            // },
        ]
        makeAutoObservable(this)
    }

    setPolls (polls) {
        this._polls = polls
    }

    getPoll (id) {
        return this._polls.find((item) => item.pollId == id)
    }

    get polls () {
        return this._polls
    }
}
