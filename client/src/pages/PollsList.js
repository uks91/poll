import React, {useContext} from 'react';
import {Container, Nav, NavLink} from "react-bootstrap";
import {Context} from "../index";

const PollsList = () => {
    const {pollsStore} = useContext(Context)
    return (
        <Container>
            <Nav className="flex-column">
                <NavLink href="polls/new">Добавить новый</NavLink>
                {pollsStore.polls.map( poll =>
                    <NavLink href={`polls/${poll.pollId}`}>{poll.pollName}</NavLink>
                )
                }
            </Nav>
        </Container>
    );
};

export default PollsList;