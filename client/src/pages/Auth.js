import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Button, Card, Col, Container, Form, FormControl, FormLabel, Nav, NavItem, NavLink, Row} from "react-bootstrap";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {Link, useLocation} from "react-router-dom";

const Auth = observer (() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [login, setLogin] = useState("")
    const [pass, setPass] = useState("")
    const [repPass, setRepPass] = useState("")

    const changePass = (passText, control) => {
        if (isLogin)
        {
            setPass(passText)
            return;
        }
        if (control == 0)
            setPass(passText)
        else if (control == 1)
            setRepPass(passText)
    }

    const btnClick = () => {
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
                <Form>
                    <FormControl
                        className="mt-3"
                        placeholder="Введите ваш логин..."
                        onChange={e => setLogin(e.target.value)}
                    />
                    <FormControl
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        // type="password"
                        onChange={e => changePass(e.target.value, 0) }
                    />
                    {!isLogin &&
                        <FormControl
                            className="mt-3"
                            placeholder="Повторите пароль..."
                            // type="password"
                            onChange={e => changePass(e.target.value, 1) }
                        />
                    }
                    {!isLogin &&
                        <FormLabel
                            className="alert-danger mt-3"
                            hidden={pass === repPass}
                        >Пароли не равны</FormLabel>
                    }
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ?
                            <div>
                                Нет аккаунта? <Link to={REGISTRATION_ROUTE}>Зарегистрируйся!</Link>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <Link to={LOGIN_ROUTE}>Войдите!</Link>
                            </div>
                        }
                        <Button
                            disabled={(!isLogin && pass !== repPass) }
                            onClick={btnClick}
                        >
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;