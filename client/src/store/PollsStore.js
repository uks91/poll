import {makeAutoObservable} from "mobx";

export default class PollsStore {
    constructor() {
        this._polls = [ ]
        this._pollResults = {}
        makeAutoObservable(this)
    }

    setPolls (polls) {
        this._polls = polls
    }

    get polls () {
        return this._polls
    }

    setPollResults (pollResults) {
        this._pollResults = pollResults
    }

    get pollResults () {
        return this._pollResults
    }
}
