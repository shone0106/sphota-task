import React, { createContext, useState, useContext } from 'react';

// Create a context object
const authContext = createContext();

// Custom hook to use the user context
export const useAuthContext = () => useContext(authContext);

// Provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 

    // Function to update user context
    const updateUser = (newUser) => {
        console.log('updating user')
        setUser(newUser);
    };

    return (
        <authContext.Provider value={{ user, updateUser }}>
            {children}
        </authContext.Provider>
    );
};
