import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { fechUserToken } from '../../redux/UserSlice';

const PrivateRoute = (props) => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dataredux = useSelector((state) => state.userisaccess)

    useEffect(() => {
        if (window.location.pathname !== '/login')
            dispatch(fechUserToken())
    }, [])

    if (dataredux.isLoading === true) {
        return (
            <p>Loading .....</p>
        )
    } else {
        if (dataredux && dataredux.isAuthenticated === true) {
            return (
                <Routes>
                    <Route path="/" element={props.component} />
                </Routes>
            );
        }
        else {
            return <Navigate to="/login" replace />
        }
    }


};

export default PrivateRoute;