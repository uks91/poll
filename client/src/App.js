import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import NavBar from "./components/NavBar";
import AppRouter from "./components/AppRouter";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {$check} from "./http/userAPI";

const App = observer (() => {
    const {userStore} = useContext(Context)
    useEffect(() => {
        $check().then(data => {
                userStore.setUser(true)
                userStore.setIsAuth(true)
            }
        )
    })
    return (
        <BrowserRouter>
            <NavBar/>
            <AppRouter/>
        </BrowserRouter>
    );
})

export default App;
