import React, {useContext} from 'react';
import {useParams} from "react-router-dom";
import {Context} from "../index";

const Poll = () => {
    const {id} = useParams()
    const {pollsStore} = useContext(Context)
    const poll = pollsStore.getPoll(id)
    console.log(poll.pollId, poll.pollName)
    console.log(process.env.REACT_APP_API_URL)
    return (
        <div>
            {id}
        </div>
    );
};

export default Poll;