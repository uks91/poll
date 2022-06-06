import React, {useContext} from 'react';
import {Container, Nav, NavLink} from "react-bootstrap";
import {Context} from "../index";

const Users = () => {
    const {userStore} = useContext(Context)
    return (
        <Container>
            <Nav className="flex-column">
                {userStore.users.map( user =>
                    <NavLink>{user.name}</NavLink>
                )
                }
            </Nav>
        </Container>
    );
};

export default Users;