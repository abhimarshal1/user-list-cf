import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { initialState, reducer } from './reducer';
import { getAllUsers } from '../service/user';

export const UserDataLayer = createContext();

const UserContextProvider = (props) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchUsers = async () => {
        await fetch(getAllUsers)
            .then(response => response.json())
            .then(userData => {
                dispatch({
                    type: 'SET_USERS',
                    payload: {
                        users: userData
                    }
                });
                localStorage.setItem('users', JSON.stringify(userData));
            })
    }

    useEffect(() => {
        if (localStorage.getItem('users')) {
            dispatch({
                type: 'SET_USERS',
                payload: {
                    users: JSON.parse(localStorage.getItem('users'))
                }
            });
        } else {
            fetchUsers();
        }
    }, []);

    return (
        <UserDataLayer.Provider value={[state, dispatch]}>
            {props.children}
        </UserDataLayer.Provider>
    )
}

export const useUserDataLayer = () => useContext(UserDataLayer);

export default UserContextProvider;
