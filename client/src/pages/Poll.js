import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Context} from "../index";
import {$getPoll, $getPolls, $sendResults} from "../http/pollAPI";
import {observer} from "mobx-react-lite";
import {Button, Card, Container, Form} from "react-bootstrap";
import Question from "../components/Question";
import jwt_decode from "jwt-decode";

const Poll = observer(() => {
    const {id} = useParams()
    const {pollsStore} = useContext(Context)
    let [pollStruct, setPollStruct] = useState({questions:[]})
    const navigate = useNavigate()

    useEffect(() => {
        $getPolls().then(data => {
            pollsStore.setPolls(data)
        })
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
        navigate("../")
    }

    const token =  jwt_decode(localStorage.token)
    if (token.role == "ADMIN") {
        console.log("pollStruct", pollStruct)
        return (
            <div>Администратор не может проходить опросы!</div>
        )
    }

    if (pollStruct.questions == undefined) {
        return (
            <div>Опрос уже пройден!</div>
        )
    }

    return (
        <Form>
            <Container className="d-flex flex-column mt-2">
                {pollStruct.questions.map(quest =>
                    <Card className="mt-2">
                        <Question quest={quest}/>
                    </Card>
                )}
                <Container className="d-flex justify-content-center p-3">
                    <Button onClick={sendResults}>Отправить результаты</Button>
                </Container>
            </Container>
        </Form>
    );
});

export default Poll;