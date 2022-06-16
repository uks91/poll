import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Context} from "../index";
import {$getPoll, $getPolls, $sendResults} from "../http/pollAPI";
import {observer} from "mobx-react-lite";
import {Button, Card, Form} from "react-bootstrap";
import Question from "../components/Question";
import jwt_decode from "jwt-decode";
// import QuestionForm from "../components/QuestionForm";

const Poll = observer(() => {
    const {id} = useParams()
    const {pollsStore} = useContext(Context)
    // const poll = pollsStore.getPoll(id)
    let [pollStruct, setPollStruct] = useState({questions:[]})
    // const [answers, setAnswer] = useState([])

    useEffect(() => {
        $getPolls().then(data => {
            pollsStore.setPolls(data)
        })
    }, []) // copy from PollsList

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

    const sendResults = async () => {
        let answers = []

        for (let quest of pollStruct.questions) {
            if (quest.answer === undefined) {
                alert("Нужно ответить на все вопросы!")
                return;
            }
            answers.push({questionId: quest.id, answer: quest.answer})
        }
        // console.log(answers)
        await $sendResults({answers}, id)
    }
    // console.log(poll)
    // console.log(process.env.REACT_APP_API_URL)
    // await $getPoll(id)
    const token =  jwt_decode(localStorage.token)
    if (token.role == "ADMIN") {
        console.log("pollStruct", pollStruct)
        return (
            <div>Привет, админ!</div>
        )
    }



    if (pollStruct.questions == undefined) {
        return (
            <div>Опрос уже пройден!</div>
        )
    }

    return (
        <Form>
            {pollStruct.questions.map(quest =>
                // console.log("QQ", quest)
                <Card className="mt-2">
                    <Question quest={quest}/>
                </Card>
            )}
            <Button onClick={sendResults}>Отправить результаты</Button>
        </Form>
    );
});

export default Poll;