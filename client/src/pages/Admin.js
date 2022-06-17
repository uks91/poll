import React from 'react';
import {Container, Nav, NavLink} from "react-bootstrap";
import jwt_decode from "jwt-decode";

const Admin = () => {
    const token =  jwt_decode(localStorage.token)
    if (token.role != "ADMIN") {
        return (
            <div>Доступ запрещен!</div>
        )
    }
    return (
        <Container>
            <Nav className="flex-column">
                <NavLink href="/admin/polls">Управление опросами</NavLink>
                <NavLink href="/admin/users">Управление пользователями</NavLink>
            </Nav>
        </Container>
    );
};

export default Admin;