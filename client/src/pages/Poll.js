import React, {useContext, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {Context} from "../index";
import {$getPoll, $getPolls} from "../http/pollAPI";
import {observer} from "mobx-react-lite";

const Poll = observer(() => {
    const {id} = useParams()
    const {pollsStore} = useContext(Context)
    // const poll = pollsStore.getPoll(id)

    useEffect(() => {
        $getPoll(id).then(data => {
            let polls = pollsStore.polls
            console.log("Da1ta: ", data)
            const idx = pollsStore.polls.findIndex((value) => {
                return value.id == id
            })
            console.log("found index: ", idx)
        })
    }, [])
    // console.log(poll)
    // console.log(process.env.REACT_APP_API_URL)
    // await $getPoll(id)
    return (
        <div>
            {id}
        </div>
    );
});

export default Poll;