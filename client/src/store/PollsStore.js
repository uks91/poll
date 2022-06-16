import {makeAutoObservable} from "mobx";

export default class PollsStore {
    constructor() {
        this._polls = [ ]
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
