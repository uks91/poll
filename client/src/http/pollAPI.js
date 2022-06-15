import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const $createPoll = async (poll) => {
    const {data} = await $authHost.post('polls/new', poll)
}

export const $getPolls = async () => {
    const {data} = await $authHost.get('polls')
    return data;
}

export const $getPoll = async (id) => {
    const {data} = await $authHost.get('polls/' + id)
    return data
}

export const $sendResults = async  (results, id) => {
    const {data} = await $authHost.post('polls/' + id, results)
    return data;
}