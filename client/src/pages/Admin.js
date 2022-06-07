import React from 'react';
import {Container, Nav, NavLink} from "react-bootstrap";

const Admin = () => {
    return (
        <Container>
            <Nav className="flex-column">
                <NavLink href="/admin/polls">Polls</NavLink>
                <NavLink href="/admin/users">Users</NavLink>
            </Nav>
        </Container>
    );
};

export default Admin;