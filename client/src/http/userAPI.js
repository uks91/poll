import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const $registration = async (login, password) => {
    const {data} = await $host.post('user/registration', {login, password})
    console.log(data)
    console.log(jwt_decode(data.token))
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const $login = async (login, password) => {
    const {data} = await $host.post('user/login', {login, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const $check = async () => {
    const {data} = await $authHost.get('user/auth' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const $getAllUsers = async (login, password) => {
    const {data} = await $host.get('user')
    console.log("Users", data)
    return data
}