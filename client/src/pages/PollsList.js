import React, {useContext, useEffect} from 'react';
import {Container, Nav, NavLink} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {$getPolls} from "../http/pollAPI";

const PollsList = observer (() => {
    const {pollsStore} = useContext(Context)
    useEffect(() => {
        $getPolls().then(data => {
            pollsStore.setPolls(data)
        })
    }, [])

    return (
        <Container>
            <Nav className="flex-column">
                <NavLink href="polls/new">Добавить новый</NavLink>
                {pollsStore.polls.map( poll =>
                    <NavLink href={`polls/${poll.id}`}>{poll.name}</NavLink>
                )
                }
            </Nav>
        </Container>
    );
});

export default PollsList;