import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Context} from "../index";
import {$getPoll, $getPolls, $getResults} from "../http/pollAPI";
import {observer} from "mobx-react-lite";
import {Card, Container, Form} from "react-bootstrap";
import jwt_decode from "jwt-decode";
import QuestionResults from "../components/QuestionResults";

const PollResults = observer(() => {

    const token =  jwt_decode(localStorage.token)
    if (token.role != "ADMIN") {
        return (
            <div>Вам сюда нельзя :)</div>
        )
    }

    const {id} = useParams()
    const {pollsStore} = useContext(Context)
    let [pollStruct, setPollStruct] = useState({questions:[]})
    let [pollResults, setPollResults] = useState({questions:[]})

    useEffect(() => {
        $getPolls().then(data => {
            pollsStore.setPolls(data)
        })
    }, []) // copy from PollsList

    useEffect(() => {
        $getResults(id).then(data => {
                pollsStore.setPollResults(data)
                setPollResults(data)
            }
        )
    }, [])

    useEffect(() => {
        $getPoll(id).then(data => {
            const idx = pollsStore.polls.findIndex((value) => {
                return value.id == id
            })
            if (idx < 0)
                return
            pollsStore[idx] = data
            setPollStruct(data)
        })
    }, [])

    // console.log("asdasdas", pollResults.questions)

    return (
        <Container>
            {pollStruct.questions.map(quest =>
                <Card className="mt-2">
                    <QuestionResults
                        quest={quest}
                        questionResults={pollResults.questions.find(item => item.questionId == quest.id)}
                    />
                </Card>
            )}

        </Container>
    );
});

export default PollResults;