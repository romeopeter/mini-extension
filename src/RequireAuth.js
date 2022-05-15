import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from './redux/hooks';

export default function RequireAuth({ children }) {

    const { isLoggedIn } = useAppSelector(state => state.auth);

    return isLoggedIn === true ? (
        children
    ) : (<Navigate to="/" />);
};
