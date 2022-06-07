import React, {useState} from 'react';
import {Button, Card, Form, FormControl} from "react-bootstrap";
import QuestionForm from "../components/QuestionForm";
import {observer} from "mobx-react-lite";

const NewPoll = observer(() => {
    const [quests, setQuest] = useState([])

    const addQuest = () => {
        setQuest([...quests, {
            name:"",
            type: 1,
            options: [""]
        }])
    }

    // const removeQuest = (number) => {
    //
    // }

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
            <Button onClick={() => console.log(quests)}>
                test
            </Button>
        </Form>
    );
});

export default NewPoll;