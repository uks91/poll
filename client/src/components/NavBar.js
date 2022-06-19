import React, {useContext} from 'react';
import {Button, Container, Nav, Navbar, NavLink} from "react-bootstrap";
import {Context} from "../index";
import {ADMIN_ROUTE, LOGIN_ROUTE} from "../utils/consts";
import {useNavigate} from 'react-router-dom'
import {observer} from "mobx-react-lite";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";

const NavBar = observer(() => {
    const {userStore} = useContext(Context)
    const navigate = useNavigate();

    const logOut = () => {
        userStore.setUser({})
        userStore.setIsAuth(false)
        localStorage.token = ""
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container className="">
                <Navbar.Brand>Система интерактивных опросов</Navbar.Brand>
                {userStore.isAuth ?
                    <NavbarCollapse className="m-1 justify-content-end" style={{color: "white"}}>
                        <Button
                            variant={"outline-light"}
                            onClick={() => navigate(ADMIN_ROUTE)}
                        >
                            Админ  панель
                        </Button>
                        <Button
                            variant={"outline-light"}
                            onClick={() => logOut()}
                            className="m-2"
                        >
                            Выйти
                        </Button>
                    </NavbarCollapse>
                    :
                    <NavbarCollapse className="m-auto justify-content-end" style={{color: "white"}}>
                        <Button
                            variant={"outline-light"}
                            onClick={() => navigate(LOGIN_ROUTE)}
                        >
                            Авторизация
                        </Button>
                    </NavbarCollapse>
                }

            </Container>
        </Navbar>
    );
});

export default NavBar;