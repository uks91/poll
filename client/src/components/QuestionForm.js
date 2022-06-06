import React, {useState} from 'react';
import {Button, Container, FormControl, FormLabel, FormSelect, FormText} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const QuestionForm = observer (({quest}) => {
    const [options, setOption] = useState(quest.options)
    const [questText, setQuestText] = useState(quest.name)
    const [questType, setQuestType] = useState(quest.type)

    const changeOption = (text, index) => {
        setOption(options.map((opt,i) => i===index ? text : opt))
        quest.options = options
    }

    const addOption = () => {
        setOption([...options, ""])
    }

    const changeText = (text) => {
        setQuestText(text)
        quest.name = text
    }

    const changeType = (t) => {
        setQuestType(t)
        quest.type = t
    }

    return (
        <Container>
            <FormLabel>Название вопроса</FormLabel>
            <FormControl
                as="textarea"
                value={questText}
                onChange={(e) => changeText(e.target.value)}
            />
            <FormLabel>Текст вопроса</FormLabel>
            <FormSelect
                value={questType}
                onChange={(e) => changeType(e.target.value)}
            >
                <option value="1">Один</option>
                <option value="2">Много</option>
                <option value="3">Текст</option>
            </FormSelect>
            {
                questType < 3 &&
                options.map((option, index) =>
                <FormControl
                    type="text"
                    value={option}
                    onChange={(text) => changeOption(text.target.value, index)}
                />)

            }
            {questType < 3 && <Button onClick={addOption}>+</Button>}
        </Container>
    );
});

export default QuestionForm;