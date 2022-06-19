import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Container, FormCheck, FormControl, FormLabel} from "react-bootstrap";

const Question = observer (({quest}) => {
    const [textAnswer, setTextAnswer] = useState("")
    let options;
    const setAnswer = (value) => {
        if (quest.type === 2) {
            if (quest.answer == undefined)
                quest.answer = []
            const idx = quest.answer.indexOf(value)
            if (idx == -1)
                quest.answer.push(value)
            else
                quest.answer.splice(idx, 1)
        }
        else {
            quest.answer = value
        }
    }
    if (quest.type === 3) {
        options = (
            <Container>
            <FormLabel>Ответ:</FormLabel>
            <FormControl
                type="textarea"
                value={textAnswer}
                onChange={e => {
                    setTextAnswer(e.target.value)
                    setAnswer(e.target.value)
                }}
            />
        </Container>
        )
    }
    else {
        options = (
            <Container>
                {quest.options.map(option =>
                    <FormCheck
                        type={quest.type === 1 ? 'radio' : 'checkbox'}
                        label={option.text}
                        name={quest.id}
                        key={option.id}
                        onChange={e => setAnswer(option.id)}
                    />
                )}
            </Container>
        )
    }
    return (
        <Container>
            <FormLabel>{quest.text}</FormLabel>
            {options}
        </Container>
    );
});

export default Question;