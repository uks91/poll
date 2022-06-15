import React, {useContext, useState} from 'react';
import {Button, Card, Form, FormControl} from "react-bootstrap";
import QuestionForm from "../components/QuestionForm";
import {observer} from "mobx-react-lite";
import {$createPoll} from "../http/pollAPI";
// import {Context} from "../index";
// import {useNavigate} from "react-router-dom";
// import {ADMIN_ROUTE} from "../utils/consts";

const NewPoll = observer(() => {
    const [quests, setQuest] = useState([])
    // const {pollStore} = useContext(Context)
    // const {navigate} = useNavigate()
    const [pollName, setPollName] = useState("")
    const [pollDescription, setPollDescription] = useState("")

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
    }

    return (
        <Form>
            <Form.Label>Название опроса:</Form.Label>
            <FormControl
                as="textarea"
                placeholder="Новый опрос"
                value={pollName}
                onChange={e => setPollName(e.target.value)}
            />
            <Form.Label>Описание опроса:</Form.Label>
            <FormControl
                as="textarea"
                placeholder="Описание опрос"
                value={pollDescription}
                onChange={e => setPollDescription(e.target.value) }
            />
            {quests.map(quest =>
                <Card className="mt-2">
                    <QuestionForm quest={quest}/>
                </Card>
            )}
            <Button onClick={addQuest}>
                Добавить вопрос
            </Button>
            <Button onClick={savePoll}>
                Сохранить
            </Button>
        </Form>
    );
});

export default NewPoll;