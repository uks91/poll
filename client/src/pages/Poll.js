import React, {useContext} from 'react';
import {useParams} from "react-router-dom";
import {Context} from "../index";
import {$getPoll} from "../http/pollAPI";
import {observer} from "mobx-react-lite";

const Poll = observer(() => {
    const {id} = useParams()
    const {pollsStore} = useContext(Context)
    const poll = pollsStore.getPoll(id)
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