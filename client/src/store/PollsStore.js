import {makeAutoObservable} from "mobx";

export default class PollsStore {
    constructor() {
        this._polls = [
            {
                "pollId": 1,
                "pollName": "1",
                // "questions" : [
                //     {
                //         "questionId":1,
                //         "text" : "question11"
                //     },
                //     {
                //         "questionId":2,
                //         "text" : "question12"
                //     },
                // ]

            },

            {
                "pollId": 2,
                "pollName": "2",
                // "questions" : [
                //     {
                //         "questionId":3,
                //         "text" : "question23"
                //     },
                //     {
                //         "questionId":4,
                //         "text" : "question24"
                //     },
                // ]

            },
        ]
        makeAutoObservable(this)
    }

    get polls () {
        return this._polls
    }
}
