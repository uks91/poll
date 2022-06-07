import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._users = [
            {
                "id" : 1,
                "name" : "admin"
            },
            {
                "id" : 2,
                "name" : "user1"
            },
        ]

        // this._userIsAdmin = true;
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }

    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }

    get users () {
        return this._users;
    }
}
