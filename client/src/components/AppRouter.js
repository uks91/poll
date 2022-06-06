import React, {useContext} from 'react';
import {Context} from "../index";
import {Route, Routes} from "react-router-dom";
import Admin from "../pages/Admin";
import Users from "../pages/Users";
import Poll from "../pages/Poll";
import PollsList from "../pages/PollsList";
import NewPoll from "../pages/NewPoll";

const AppRouter = () => {
    const {userStore} = useContext(Context)
    if (!userStore.isAuth)
        return (
            <Routes>
                <Route path="/login" element={<Admin/>}/>
            </Routes>
        );
    return (
        <Routes>
            <Route path="/admin">
                <Route path="" element={<Admin/>}/>
                <Route path="polls">
                    <Route path="" element={<PollsList/>}/>
                    <Route path="new" element={<NewPoll/>} />
                    <Route path=":id" element={<Poll/>}/>
                </Route>
                <Route path="users" element={<Users/>}/>
            </Route>
            <Route path="/" element={<PollsList/>}/>
            <Route path=":id" element={<Poll/>}/>

        </Routes>
    );
};

export default AppRouter;