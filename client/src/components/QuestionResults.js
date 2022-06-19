import React from 'react';
import {observer} from "mobx-react-lite";
import {Card, Col, Container, FormControl, FormLabel, Row} from "react-bootstrap";

const QuestionResults = observer (({quest, questionResults}) => {
    let options;

    if (quest.type === 3) {
        options = (
            <Container>
                <Row>Ответы: </Row>
                {questionResults.texts.map(text =>
                    <Row>
                        {text}
                    </Row>
                )}
            </Container>
        )
    }
    else {
        let percents = []
        let totalCount = 0.0
        for (const opt of quest.options) {
            const optId = opt.id
            const res = questionResults.options.find(item => item.optionId === optId)
            const count = res === undefined ? 0 : res.count
            totalCount += count
            percents.push({
                optionId: optId,
                count,
                percent: 0.0
            })
        }

        for (let p of percents) {
            p.percent = p.count * 100.0 / totalCount
        }
        options = (
            <Container>
                {quest.options.map(option =>
                    <Row>
                        <Col>{option.text}</Col>
                        <Col>{percents.find(item => item.optionId == option.id).percent} %</Col>
                    </Row>
                )}
            </Container>
        )
    }
    return (
        <Container>
            <div>
                <div>{quest.text}</div>
                <Card>{options}</Card>
            </div>

        </Container>
    );

});

export default QuestionResults;