import React, {useState} from 'react';
import {Button, Form, FormControl} from "react-bootstrap";
import QuestionForm from "../components/QuestionForm";

const NewPoll = () => {
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
                <QuestionForm quest={quest}/>
            )}
            <Button onClick={addQuest}>
                Добавить вопрос
            </Button>
            <Button onClick={() => console.log(quests)}>
                test
            </Button>
        </Form>
    );
};

export default NewPoll;