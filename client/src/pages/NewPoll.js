import React, {useContext, useState} from 'react';
import {Button, Card, Col, Container, Form, FormControl, Row} from "react-bootstrap";
import QuestionForm from "../components/QuestionForm";
import {observer} from "mobx-react-lite";
import {$createPoll} from "../http/pollAPI";
import jwt_decode from "jwt-decode";
// import {Context} from "../index";
import {useNavigate} from "react-router-dom";
// import {ADMIN_ROUTE} from "../utils/consts";

const NewPoll = observer(() => {
    const [quests, setQuest] = useState([])
    // const {pollStore} = useContext(Context)
    const {navigate} = useNavigate()
    const [pollName, setPollName] = useState("")
    const [pollDescription, setPollDescription] = useState("")

    const token =  jwt_decode(localStorage.token)
    if (token.role != "ADMIN") {
        return (
            <div>Доступ запрещен!</div>
        )
    }
    const addQuest = () => {
        setQuest([...quests, {
            name:"",
            type: 1,
            options: []
        }])
    }

    // const removeQuest = (number) => {
    //
    // }

    const savePoll = async () => {
        await $createPoll({
            name: pollName,
            description: pollDescription,
            questions: quests}).then()
        navigate("../")
    }

    return (
        <Form>
            <Container className="d-flex flex-column mt-2">
                <Form.Label>Название опроса:</Form.Label>
                <FormControl
                    as="textarea"
                    placeholder="Новый опрос"
                    value={pollName}
                    onChange={e => setPollName(e.target.value)}
                />
                <Form.Label className="mt-2">Описание опроса:</Form.Label>
                <FormControl
                    as="textarea"
                    placeholder="Описание опроса"
                    value={pollDescription}
                    onChange={e => setPollDescription(e.target.value) }
                />
                {quests.map((quest, index) =>
                    <Card className="mt-2">
                        <Row xs={2} className="p-2">
                            <Col className="flex-shrink-0 mt-2" style={{width:"5%"}}>{index+1}.</Col>
                            <Col lg><QuestionForm quest={quest}/></Col>
                        </Row>
                    </Card>
                )}
                <Container className="d-flex justify-content-center p-3">
                    <Button onClick={addQuest}>
                        Добавить вопрос
                    </Button>
                    <Button onClick={savePoll} className="ms-2">
                        Сохранить
                    </Button>
                </Container>
            </Container>
        </Form>

    );
});

export default NewPoll;