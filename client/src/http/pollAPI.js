import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const $createPoll = async (poll) => {
    const {data} = await $authHost.post('polls/new', poll)
}