import React, {useContext, useEffect} from 'react';
import {Container, ListGroup, Nav, NavLink} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {$getPolls} from "../http/pollAPI";
import {Link} from "react-router-dom";

const PollsList = observer (() => {
    const {pollsStore} = useContext(Context)
    useEffect(() => {
        $getPolls().then(data => {
            pollsStore.setPolls(data)
        })
    }, [])

    return (
        <Container>
            <div className="mt-2">Список опросов: </div>
            <ListGroup as="ol" className="list-group-numbered mt-2">
                {pollsStore.polls.map( (poll, index) =>
                    <ListGroup.Item as="li">
                        <Link to={`polls/${poll.id}`}>{poll.name}</Link>
                    </ListGroup.Item>
                )
                }
            </ListGroup>
        </Container>
    );
});

export default PollsList;