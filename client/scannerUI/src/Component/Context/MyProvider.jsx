// MyProvider.js
import React, { useState } from 'react';
import MyContext from './MyContext';

const MyProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(-1);
    const logIn = () => { setIsLoggedIn(1); }
    const logOut = () => { setIsLoggedIn(0) }

    return (
        <MyContext.Provider value={{ isLoggedIn, logIn, logOut }}>
            {children}
        </MyContext.Provider>
    );
};

export default MyProvider;
