import React, {useContext} from 'react';
import {Button, Container, Nav, Navbar, NavLink} from "react-bootstrap";
import {Context} from "../index";
import {ADMIN_ROUTE, LOGIN_ROUTE} from "../utils/consts";
import {useNavigate} from 'react-router-dom'

const NavBar = () => {
    const {user} = useContext(Context)
    const navigate = useNavigate();
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                {user.isAuth ?
                    <Nav className="m-auto" style={{color: "white"}}>
                        <Button
                            variant={"outline-light"}
                            onClick={() => navigate(ADMIN_ROUTE)}
                        >
                            Админ  панель
                        </Button>
                        <Button
                            variant={"outline-light"}
                            //onClick={() => logOut()}
                            className="ml-2"
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav className="m-auto" style={{color: "white"}}>
                        <Button
                            variant={"outline-light"}
                            onClick={() => navigate(LOGIN_ROUTE)}
                        >
                            Авторизация
                        </Button>
                    </Nav>
                }

            </Container>
        </Navbar>
        // <NavBar>
        //     <Container>
        //         {user.isAuth ?
        //             <Nav className="ml-auto" style={{color: 'white'}}>
        //                 <Button
        //                     variant={"outline-light"}
        //                     // onClick={() => navigate(ADMIN_ROUTE)}
        //                 >
        //                     Админ  панель
        //                 </Button>
        //                 <Button
        //                     variant={"outline-light"}
        //                     //onClick={() => logOut()}
        //                     className="ml-2"
        //                 >
        //                     Выйти
        //                 </Button>
        //             </Nav>
        //             :
        //             <Nav className="ml-auto" style={{color: 'white'}}>
        //                 <Button
        //                     variant={"outline-light"}
        //                     // onClick={() => navigate(LOGIN_ROUTE)}
        //                 >
        //                     Авторизация
        //                 </Button>
        //             </Nav>
        //         }
        //     </Container>
        // </NavBar>
    );
};

export default NavBar;