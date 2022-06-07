import React, {useState} from 'react';
import {Button, Card, Form, FormControl} from "react-bootstrap";
import QuestionForm from "../components/QuestionForm";
import {observer} from "mobx-react-lite";

const NewPoll = observer(() => {
    const [quests, setQuest] = useState([])

    const addQuest = () => {
        setQuest([...quests, {
            name:"ююю",
            type: 1,
            options: ["12", "23", "34"]
        }])
    }

    // const removeQuest = (number) => {
    //
    // }

    const savePoll = () => {
        console.log(quests)
    }

    return (
        <Form>
            <Form.Label>Название опроса:</Form.Label>
            <FormControl as="textarea" placeholder="Новый опрос"></FormControl>
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