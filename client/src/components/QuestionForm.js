import React, {useState} from 'react';
import {Button, Container, FormControl, FormLabel, FormSelect} from "react-bootstrap";
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
        <Container className="p-2">
            <FormLabel>Текст вопроса</FormLabel>
            <FormControl
                as="textarea"
                value={questText}
                onChange={(e) => changeText(e.target.value)}
            />
            <Container className="d-flex align-items-end mt-2">
                <FormLabel className="flex-shrink-0">Тип ответа</FormLabel>
                <FormSelect
                    value={questType}
                    onChange={(e) => changeType(e.target.value)}
                    className="ms-2"
                >
                    <option value="1">С единственным выбором</option>
                    <option value="2">С множественным выбором</option>
                    <option value="3">Текстовый</option>
                </FormSelect>
            </Container>
            {questType < 3 && <FormLabel className="mt-2">Варианты ответа: </FormLabel>}
            {
                questType < 3 &&
                options.map((option, index) =>
                <FormControl
                    type="text"
                    value={option}
                    onChange={(text) => changeOption(text.target.value, index)}
                    className="mt-2"
                />)
            }
            {questType < 3 && <Button onClick={addOption} className="mt-2">+</Button>}
        </Container>
    );
});

export default QuestionForm;