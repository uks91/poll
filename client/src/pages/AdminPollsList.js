import React, {useContext, useEffect} from 'react';
import {Button, Card, Col, Container, ListGroup, Nav, NavItem, NavLink, Row} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {$getPolls} from "../http/pollAPI";
import {Link, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE} from "../utils/consts";

const AdminPollsList = observer (() => {
    const {pollsStore} = useContext(Context)
    const navigate = useNavigate();
    useEffect(() => {
        $getPolls().then(data => {
            pollsStore.setPolls(data)
        })
    }, [])

    return (
        <Container>
            <Button
                variant={"outline"}
                onClick={() => navigate("new")}
            >
                Добавить новый опрос
            </Button>
            <ListGroup as="ol" className="list-group-numbered">
                {pollsStore.polls.map( (poll, index) =>
                    <ListGroup.Item as="li">
                        <Link to={`${poll.id}`}>{poll.name}</Link>
                    </ListGroup.Item>
                )
                }
            </ListGroup>
        </Container>
    );
});

export default AdminPollsList;