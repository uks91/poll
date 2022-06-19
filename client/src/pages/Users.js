import React, {useContext, useEffect} from 'react';
import {Container, Nav, NavLink} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {$getAllUsers} from "../http/userAPI";

const Users = observer (() => {
    const {userStore} = useContext(Context)
    useEffect(() => {
        $getAllUsers().then(data => {
            console.log(data)
            userStore.setUsers(data.users)
        })
    }, [])

    return (
        <Container>
            <Nav className="flex-column">
                {userStore.users.map( user =>
                    <NavLink>{user.login}</NavLink>
                )
                }
            </Nav>
        </Container>
    );
});

export default Users;