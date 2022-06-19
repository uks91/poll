import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from "./store/UserStore";
import PollsStore from "./store/PollsStore";


export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        userStore: new UserStore(),
        pollsStore: new PollsStore(),
    }}>
        <App />
    </Context.Provider>
);
