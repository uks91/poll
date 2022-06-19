import React, {useContext} from 'react';
import {Context} from "../index";
import {Route, Routes, Navigate, NavLink} from "react-router-dom";
import Admin from "../pages/Admin";
import Users from "../pages/Users";
import Poll from "../pages/Poll";
import PollsList from "../pages/PollsList";
import NewPoll from "../pages/NewPoll";
import Auth from "../pages/Auth";
import {observer} from "mobx-react-lite";
import AdminPollsList from "../pages/AdminPollsList";
import PollResults from "../pages/PollResults";

const AppRouter = observer(() => {
    const {userStore} = useContext(Context)
    if (!userStore.isAuth)
        return (
            <Routes>
                <Route path="/login" element={<Auth/>}/>
                <Route path="/registration" element={<Auth/>}/>}
                <Route path="*" element={
                    <div>
                        Чтобы просмотреть эту страницу, необходимо <a href="/login">авторизоваться</a>
                    </div>}
                />
            </Routes>
        );
    return (
        <Routes>
            <Route path="/admin">
                <Route path="" element={<Admin/>}/>
                <Route path="polls">
                    <Route path="" element={<AdminPollsList/>}/>
                    <Route path="new" element={<NewPoll/>} />
                    <Route path=":id" element={<PollResults/>}/>
                </Route>
                <Route path="users" element={<Users/>}/>
            </Route>
            <Route path="/" element={<PollsList/>}/>
            <Route path="polls/:id" element={<Poll/>}/>

        </Routes>
    );
});

export default AppRouter;