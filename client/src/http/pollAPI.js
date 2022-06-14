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
    const {data} = await $authHost.get('polls/', {params: {pollId: id}})
    return data
}